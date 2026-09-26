import React, { useState, useEffect, useRef } from 'react';
import {
  Jurisdiction,
  SupportedLanguage,
  ChatMessage,
  RAGResponse
} from '../types';
import { sendChatMessage } from '../services/api';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  Download,
  UserCheck,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface ChatAssistantProps {
  jurisdiction: Jurisdiction;
  language: SupportedLanguage;
  onRequestEscalation: (query: string, context?: string) => void;
}

const DEMO_QUESTIONS = [
  {
    title: 'New Formulation Patent',
    query: 'I developed a new Ayurvedic formulation. Can I patent it?',
    jurisdiction: 'india' as Jurisdiction
  },
  {
    title: 'USA Export Considerations',
    query: 'I want to sell my Ayurvedic herbal product in the USA. What should I consider?',
    jurisdiction: 'international' as Jurisdiction
  },
  {
    title: 'Traditional Knowledge vs Invention',
    query: 'Is this formulation traditional knowledge or a new invention?',
    jurisdiction: 'india' as Jurisdiction
  },
  {
    title: 'Trademark Considerations',
    query: 'What are the trademark considerations for my Ayurveda brand?',
    jurisdiction: 'india' as Jurisdiction
  },
  {
    title: 'ABS Obligations',
    query: 'Does using an Indian biological resource create ABS obligations?',
    jurisdiction: 'india' as Jurisdiction
  },
  {
    title: 'Indian Patent Law vs TRIPS',
    query: 'What is the difference between Indian patent law and TRIPS?',
    jurisdiction: 'international' as Jurisdiction
  }
];

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  jurisdiction,
  language,
  onRequestEscalation
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      content: 'Namaste. Welcome to IP-SAKTI Sahayak, your multilingual, RAG-grounded AI assistant for Intellectual Property Rights and regulatory compliance in Ayurveda. Ask any question regarding patents, classical vs proprietary medicines, trademarks, biological diversity/ABS, TKDL, or international export guidelines.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      jurisdiction,
      language
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Voice recognition setup (Web Speech API)
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      // Map language code for recognition
      const langMap: Record<SupportedLanguage, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        kn: 'kn-IN',
        ml: 'ml-IN',
        bn: 'bn-IN',
        mr: 'mr-IN'
      };
      recognition.lang = langMap[language] || 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(prev => prev ? `${prev} ${transcript}` : transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [language]);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Voice recognition is not supported in this browser. Please use standard keyboard input.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Mic start error:', err);
        setIsListening(false);
      }
    }
  };

  // Text to speech playback
  const speakText = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (queryToSend?: string) => {
    const text = (queryToSend || inputQuery).trim();
    if (!text || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const assistantMsgId = `assistant-${Date.now()}`;

    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      jurisdiction,
      language
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryToSend) setInputQuery('');
    setIsLoading(true);

    try {
      const ragResponse: RAGResponse = await sendChatMessage(text, jurisdiction, language);

      const assistantMsg: ChatMessage = {
        id: assistantMsgId,
        sender: 'assistant',
        content: ragResponse.directAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        jurisdiction,
        language,
        ragResponse
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: assistantMsgId,
        sender: 'assistant',
        content: "I encountered an error retrieving reliable statutory information. Please try again or request human assistance.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        jurisdiction,
        language,
        error: err?.message || 'Network error'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyAnswerToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadLegalDossier = (msg: ChatMessage) => {
    if (!msg.ragResponse) return;
    const r = msg.ragResponse;
    const content = `================================================================================
IP-SAKTI SAHAYAK - AYURVEDA IPR & REGULATORY BRIEF
Generated: ${new Date().toLocaleString()}
Jurisdiction: ${r.applicableJurisdiction.toUpperCase()}
Category: ${r.applicableCategory}
Confidence Level: ${r.confidence.level.toUpperCase()} (${r.confidence.score}%)
================================================================================

1. DIRECT ANSWER:
${r.directAnswer}

2. DETAILED STATUTORY EXPLANATION:
${r.detailedExplanation}

3. RECOMMENDED ACTIONABLE NEXT STEPS:
${r.recommendedNextSteps.map((s, idx) => `[${idx + 1}] ${s}`).join('\n')}

4. STATUTORY & REGULATORY SOURCES CITED:
${r.sources.map((s, idx) => `[${idx + 1}] ${s.title}
    Authority: ${s.organization}
    Section/Rule: ${s.sectionArticle}
    Date: ${s.documentDate || 'N/A'}
    Official Portal: ${s.officialUrl}
    Relevant Quote: "${s.quote}"`).join('\n\n')}

5. STATUTORY DISCLAIMER:
${r.disclaimer}
================================================================================
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `IP-SAKTI-Brief-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] max-w-5xl mx-auto p-2 sm:p-4 gap-3">
      
      {/* Active Jurisdiction & Mode Status Header */}
      <div className="flex items-center justify-between bg-stone-100 border border-stone-200 px-4 py-2 rounded-xl text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-stone-700">Active Jurisdiction:</span>
          {jurisdiction === 'india' ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold border border-amber-300">
              🇮🇳 India (Ayush, IP India, NBA, FSSAI)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-semibold border border-emerald-300">
              🌎 International (WIPO, TRIPS, Nagoya, US FDA, EU THMPD)
            </span>
          )}
        </div>
        <div className="hidden sm:flex items-center gap-2 text-stone-500 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>RAG Knowledge Base Active & Source-Grounded</span>
        </div>
      </div>

      {/* Chat Messages Feed */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4 rounded-xl">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const r = msg.ragResponse;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-4xl rounded-2xl p-4 sm:p-5 shadow-xs text-sm ${
                  isUser
                    ? 'bg-amber-600 text-white rounded-br-none'
                    : 'bg-white text-stone-800 border border-stone-200/90 rounded-bl-none'
                }`}
              >
                {/* Header info */}
                <div className="flex items-center justify-between gap-3 mb-2.5 pb-2 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs">
                      {isUser ? 'Innovator / Researcher' : 'IP-SAKTI Sahayak AI'}
                    </span>
                    <span className="text-[10px] text-stone-400">{msg.timestamp}</span>
                  </div>

                  {!isUser && r && (
                    <div className="flex items-center gap-2">
                      {/* Dynamic Confidence Badge */}
                      <div
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 border ${
                          r.confidence.level === 'high'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : r.confidence.level === 'moderate'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-rose-50 text-rose-800 border-rose-300'
                        }`}
                        title={r.confidence.rationale}
                      >
                        {r.confidence.level === 'high' && <ShieldCheck className="w-3 h-3 text-emerald-600" />}
                        {r.confidence.level === 'moderate' && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                        {r.confidence.level === 'low' && <ShieldAlert className="w-3 h-3 text-rose-600" />}
                        <span>
                          {r.confidence.level === 'high' ? '🟢 High Confidence' : r.confidence.level === 'moderate' ? '🟡 Moderate Confidence' : '🔴 Low Confidence'} ({r.confidence.score}%)
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Main Content */}
                {isUser ? (
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                ) : r ? (
                  <div className="space-y-4">
                    {/* 1. Direct Answer */}
                    <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-3 text-stone-900">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block mb-1">
                        Direct Regulatory Assessment
                      </span>
                      <p className="font-medium leading-relaxed">{r.directAnswer}</p>
                    </div>

                    {/* 2. Detailed Explanation */}
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                        Statutory Analysis & Framework
                      </span>
                      <div className="text-stone-700 leading-relaxed whitespace-pre-wrap text-[13px] bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                        {r.detailedExplanation}
                      </div>
                    </div>

                    {/* 3. Applicable Tags */}
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-md bg-stone-200/70 text-stone-700 font-medium">
                        📍 {r.applicableJurisdiction}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-stone-200/70 text-stone-700 font-medium">
                        📂 {r.applicableCategory}
                      </span>
                      {r.priorArtNote && (
                        <span className="px-2.5 py-1 rounded-md bg-orange-100 text-orange-800 font-medium border border-orange-200">
                          🔍 {r.priorArtNote}
                        </span>
                      )}
                    </div>

                    {/* 4. Actionable Next Steps */}
                    {r.recommendedNextSteps && r.recommendedNextSteps.length > 0 && (
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                          Recommended Actionable Steps
                        </span>
                        <ul className="space-y-1.5 text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-100">
                          {r.recommendedNextSteps.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2">
                              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                                {sIdx + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 5. Authoritative Source Citations */}
                    {r.sources && r.sources.length > 0 && (
                      <div className="border-t border-stone-200 pt-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
                          Authoritative Sources Cited ({r.sources.length})
                        </span>
                        <div className="space-y-2">
                          {r.sources.map((s, idx) => (
                            <div
                              key={idx}
                              className="bg-stone-50 border border-stone-200/80 rounded-lg p-2.5 text-xs hover:border-amber-400 transition-colors"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                                    <span className="text-amber-700 font-bold">[{idx + 1}]</span>
                                    <span>{s.title}</span>
                                  </div>
                                  <div className="text-stone-500 text-[11px] mt-0.5">
                                    {s.organization} &bull; <strong className="text-stone-700">{s.sectionArticle}</strong>
                                    {s.documentDate && ` &bull; ${s.documentDate}`}
                                  </div>
                                </div>
                                <a
                                  href={s.officialUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-amber-700 hover:text-amber-900 p-1 rounded-md hover:bg-amber-50 shrink-0"
                                  title="View official government document"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                              {s.quote && (
                                <p className="text-stone-600 text-[11px] italic mt-1.5 border-l-2 border-amber-400 pl-2">
                                  "{s.quote}"
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Disclaimer */}
                    <div className="text-[11px] text-stone-400 italic pt-1 border-t border-stone-100 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{r.disclaimer}</span>
                    </div>

                    {/* Action Bar for AI Response */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => speakText(msg.id, `${r.directAnswer}. ${r.detailedExplanation}`)}
                          className="px-2.5 py-1 rounded-md border border-stone-200 text-stone-600 hover:bg-stone-100 flex items-center gap-1"
                          title="Listen to audio speech"
                        >
                          {speakingMsgId === msg.id ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                              <span className="text-rose-600 font-medium">Stop Audio</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-stone-600" />
                              <span>Listen 🔊</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => copyAnswerToClipboard(msg.id, `${r.directAnswer}\n\n${r.detailedExplanation}`)}
                          className="px-2.5 py-1 rounded-md border border-stone-200 text-stone-600 hover:bg-stone-100 flex items-center gap-1"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => downloadLegalDossier(msg)}
                          className="px-2.5 py-1 rounded-md border border-stone-200 text-stone-600 hover:bg-stone-100 flex items-center gap-1"
                          title="Download complete legal brief text dossier"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Brief</span>
                        </button>
                      </div>

                      {/* Escalation Button */}
                      <button
                        type="button"
                        onClick={() => onRequestEscalation(messages[messages.indexOf(msg) - 1]?.content || 'Ayurveda IPR Query', r.directAnswer)}
                        className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-all ${
                          r.escalationRecommended
                            ? 'bg-rose-600 text-white hover:bg-rose-700 animate-pulse'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300'
                        }`}
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Request Human Assistance</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="flex items-start">
            <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-none p-4 max-w-md shadow-xs space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold">
                <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
                <span>Searching curated knowledge base & verifying citations...</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-3 bg-stone-200 rounded-sm w-3/4 animate-pulse"></div>
                <div className="h-3 bg-stone-200 rounded-sm w-full animate-pulse"></div>
                <div className="h-3 bg-stone-200 rounded-sm w-5/6 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Demo Scenarios Carousel */}
      {messages.length <= 2 && (
        <div className="pt-1">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>SIH 2026 Recommended Demo Queries:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
            {DEMO_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q.query)}
                className="text-left text-xs bg-white hover:bg-amber-50/70 border border-stone-200 hover:border-amber-300 rounded-lg p-2 transition-all group"
              >
                <div className="font-semibold text-stone-800 group-hover:text-amber-900 flex items-center justify-between">
                  <span>{q.title}</span>
                  <span className="text-[10px] text-stone-400">
                    {q.jurisdiction === 'india' ? '🇮🇳 IN' : '🌎 INTL'}
                  </span>
                </div>
                <div className="text-[11px] text-stone-500 truncate mt-0.5">
                  "{q.query}"
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form Bar */}
      <div className="bg-white border border-stone-200 rounded-2xl p-2 sm:p-2.5 shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          {/* Voice Input Mic Button */}
          <button
            id="voice-input-mic-btn"
            type="button"
            onClick={toggleVoiceInput}
            className={`p-2.5 rounded-xl border transition-all ${
              isListening
                ? 'bg-rose-500 text-white border-rose-600 animate-pulse ring-2 ring-rose-300'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
            title={isListening ? 'Listening... click to stop' : 'Click to speak question (Voice Input)'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input */}
          <input
            id="chat-query-input-field"
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={
              isListening
                ? 'Listening to your voice input...'
                : jurisdiction === 'india'
                ? 'Ask about Indian Ayurveda IPR, Section 3(p), classical vs PPM, ABS...'
                : 'Ask about TRIPS, WIPO, US FDA DSHEA, EU THMPD, export guidelines...'
            }
            className="flex-1 bg-stone-50 border-0 focus:ring-0 text-sm text-stone-900 placeholder:text-stone-400 px-3 py-2 rounded-xl focus:outline-hidden"
            disabled={isLoading}
          />

          {/* Clear Button */}
          {inputQuery && (
            <button
              type="button"
              onClick={() => setInputQuery('')}
              className="p-1.5 text-stone-400 hover:text-stone-600"
              title="Clear input"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Send Button */}
          <button
            id="chat-submit-send-btn"
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
