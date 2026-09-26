import React, { useState, useEffect } from 'react';
import {
  DocumentRecord,
  AuditLogEntry
} from '../types';
import {
  getDocumentsApi,
  addDocumentApi,
  deleteDocumentApi,
  getAuditLogsApi
} from '../services/api';
import {
  FileText,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Download,
  Calendar,
  Building2,
  Tag,
  CheckCircle2,
  Sparkles,
  BarChart3
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'documents' | 'audit' | 'add'>('documents');
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [auditData, setAuditData] = useState<{
    logs: AuditLogEntry[];
    summary: any;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  // Add document form state
  const [newDoc, setNewDoc] = useState({
    title: '',
    organization: 'Ministry of Ayush',
    jurisdiction: 'india',
    category: 'Patents',
    actOrRule: '',
    sectionArticle: '',
    officialUrl: 'https://ayush.gov.in',
    content: '',
    keywords: ''
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [docs, logs] = await Promise.all([
        getDocumentsApi(),
        getAuditLogsApi()
      ]);
      setDocuments(docs);
      setAuditData(logs);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.title || !newDoc.content || !newDoc.actOrRule) {
      alert('Please fill all mandatory fields.');
      return;
    }

    try {
      await addDocumentApi(newDoc);
      alert('Document added to RAG knowledge base successfully!');
      setNewDoc({
        title: '',
        organization: 'Ministry of Ayush',
        jurisdiction: 'india',
        category: 'Patents',
        actOrRule: '',
        sectionArticle: '',
        officialUrl: 'https://ayush.gov.in',
        content: '',
        keywords: ''
      });
      setActiveTab('documents');
      loadData();
    } catch (err: any) {
      console.error(err);
      alert('Failed to add document.');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to retire "${title}" from the knowledge base?`)) {
      try {
        await deleteDocumentApi(id);
        loadData();
      } catch (err) {
        alert('Failed to delete document.');
      }
    }
  };

  const exportAuditLogJson = () => {
    if (!auditData) return;
    const blob = new Blob([JSON.stringify(auditData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `IP-SAKTI-AuditLogs-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-stone-100 text-stone-800 border border-stone-300">
                Governance & Knowledge Management
              </span>
            </div>
            <h2 className="text-lg font-bold text-stone-900 mt-1 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600" />
              <span>Statutory Knowledge Base & DPDP Audit Governance</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Curate authoritative gazettes, audit retrieval fidelity and confidence metrics, and inspect the human escalation review queue.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('documents')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'documents'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Knowledge Base ({documents.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'audit'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Audit Trail ({auditData?.logs.length || 0})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('add')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 ${
                activeTab === 'add'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Gazette / Doc</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Knowledge Documents List */}
      {activeTab === 'documents' && (
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Active Authoritative Statutory Documents ({documents.length})
            </h3>
            <span className="text-[11px] text-stone-400">Strictly grounded in verified gazettes</span>
          </div>

          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-4 bg-stone-50 border border-stone-200/80 rounded-xl hover:border-amber-300 transition-colors text-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm">{doc.title}</span>
                      <span className="px-2 py-0.5 rounded-md bg-stone-200 text-stone-700 font-mono text-[10px]">
                        {doc.actOrRule} &bull; {doc.sectionArticle}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-stone-500 text-[11px] mt-1">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        <span>{doc.organization}</span>
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Effective: {doc.effectiveDate}</span>
                      </span>
                      <span>&bull;</span>
                      <span className="uppercase font-semibold text-amber-700">
                        {doc.jurisdiction}
                      </span>
                      <span>&bull;</span>
                      <span className="text-stone-400">Ver: {doc.version}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={doc.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200"
                      title="Open source link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDelete(doc.id, doc.title)}
                      className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                      title="Retire document"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-stone-600 line-clamp-2 leading-relaxed bg-white p-2 rounded-lg border border-stone-100">
                  {doc.content}
                </p>

                {doc.keywords && doc.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {doc.keywords.map((kw, idx) => (
                      <span key={idx} className="bg-stone-200/60 text-stone-600 px-2 py-0.5 rounded-md text-[10px]">
                        #{kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Audit Logs & Quality Metrics */}
      {activeTab === 'audit' && auditData && (
        <div className="space-y-4">
          {/* Summary Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
              <span className="text-stone-400 block mb-1 font-medium">Total RAG Queries</span>
              <span className="text-2xl font-bold text-stone-900">{auditData.summary.totalQueries}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
              <span className="text-stone-400 block mb-1 font-medium">Avg Confidence</span>
              <span className="text-2xl font-bold text-emerald-700">{auditData.summary.averageConfidence}%</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
              <span className="text-stone-400 block mb-1 font-medium">High Confidence</span>
              <span className="text-2xl font-bold text-emerald-600">{auditData.summary.highConfidence}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
              <span className="text-stone-400 block mb-1 font-medium">Escalated Queries</span>
              <span className="text-2xl font-bold text-rose-600">{auditData.summary.escalated}</span>
            </div>
          </div>

          {/* Audit Logs List */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                DPDP-Compliant Query Audit Log ({auditData.logs.length})
              </h3>
              <button
                type="button"
                onClick={exportAuditLogJson}
                className="text-xs text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Audit JSON</span>
              </button>
            </div>

            <p className="text-[11px] text-stone-500">
              *Logs store purely timestamp, question topic, cited statutory titles, and confidence scores for audit fidelity. In strict compliance with India's Digital Personal Data Protection (DPDP) Act 2023, no user identity, IP address, or private personal data is logged.
            </p>

            <div className="space-y-2.5">
              {auditData.logs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900">"{log.query}"</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        log.confidenceLevel === 'high'
                          ? 'bg-emerald-100 text-emerald-800'
                          : log.confidenceLevel === 'moderate'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {log.confidenceLevel.toUpperCase()} ({log.confidenceScore}%)
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500">
                    <span>🕒 {new Date(log.timestamp).toLocaleString()}</span>
                    <span>&bull;</span>
                    <span className="uppercase font-semibold">📍 {log.jurisdiction}</span>
                    <span>&bull;</span>
                    <span>Sources: {log.retrievedDocTitles.join(', ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Add Document Form */}
      {activeTab === 'add' && (
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 border-b border-stone-100 pb-2">
            Ingest New Statutory Provision / Circular / Gazette
          </h3>

          <form onSubmit={handleAddDocument} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Document Title *</label>
                <input
                  type="text"
                  value={newDoc.title}
                  onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                  placeholder="e.g. GSR 465(E) - Ayush Aahar Regulatory Framework 2022"
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Issuing Organization *</label>
                <input
                  type="text"
                  value={newDoc.organization}
                  onChange={(e) => setNewDoc({ ...newDoc, organization: e.target.value })}
                  placeholder="e.g. Ministry of Ayush / FSSAI / IP India"
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Statutory Act or Rule *</label>
                <input
                  type="text"
                  value={newDoc.actOrRule}
                  onChange={(e) => setNewDoc({ ...newDoc, actOrRule: e.target.value })}
                  placeholder="e.g. Drugs and Cosmetics Act, 1940"
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Section / Rule / Article</label>
                <input
                  type="text"
                  value={newDoc.sectionArticle}
                  onChange={(e) => setNewDoc({ ...newDoc, sectionArticle: e.target.value })}
                  placeholder="e.g. Rule 158B or Section 3(p)"
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Jurisdiction</label>
                <select
                  value={newDoc.jurisdiction}
                  onChange={(e) => setNewDoc({ ...newDoc, jurisdiction: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                >
                  <option value="india">India</option>
                  <option value="international">International</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Official Government URL</label>
              <input
                type="url"
                value={newDoc.officialUrl}
                onChange={(e) => setNewDoc({ ...newDoc, officialUrl: e.target.value })}
                placeholder="https://ayush.gov.in/..."
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Keywords (comma-separated)</label>
              <input
                type="text"
                value={newDoc.keywords}
                onChange={(e) => setNewDoc({ ...newDoc, keywords: e.target.value })}
                placeholder="e.g. ashwagandha, export, GMP, clinical proof"
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Statutory Full Content / Text *</label>
              <textarea
                value={newDoc.content}
                onChange={(e) => setNewDoc({ ...newDoc, content: e.target.value })}
                placeholder="Paste the official gazette clause or regulatory rule text..."
                rows={4}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-5 rounded-xl transition-colors text-xs flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Publish to RAG Vector Index</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
