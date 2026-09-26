import React, { useState } from 'react';
import { submitEscalationApi } from '../services/api';
import {
  X,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

interface HumanEscalationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  initialContext?: string;
  jurisdiction: string;
}

export const HumanEscalationModal: React.FC<HumanEscalationModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  initialContext = '',
  jurisdiction
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [userNotes, setUserNotes] = useState(initialContext);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketResult, setTicketResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !email.trim()) {
      alert('Please provide your query and contact email.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitEscalationApi({
        query,
        jurisdiction,
        userNotes,
        contactEmail: email
      });
      setTicketResult(res);
    } catch (err: any) {
      alert('Failed to submit escalation ticket.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative space-y-4">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-stone-900">
              Request Human Legal & Ayush Regulatory Escalation
            </h3>
            <p className="text-xs text-stone-500">
              Hand off complex, low-confidence, or multi-jurisdiction matters to verified IP attorneys and Ayush regulatory consultants.
            </p>
          </div>
        </div>

        {ticketResult ? (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-emerald-950 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Escalation Dossier Transmitted!</span>
            </div>
            <p>
              Your query brief has been indexed under Reference ID: <strong className="font-mono">{ticketResult.ticket?.id}</strong>.
            </p>
            <p className="text-[11px] text-emerald-800">
              An Ayush IPR specialist will review your statutory references and respond to <strong>{email}</strong> within 1-2 business days.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 rounded-xl text-xs"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                Your Specific Legal / Regulatory Inquiry *
              </label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe your formulation, patents barrier, or licensing obstacle..."
                rows={3}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-rose-500 resize-none"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                Applicant Notes & Specific Queries
              </label>
              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Optional notes regarding previous patent examiner objections, SBB intimations, or target export countries..."
                rows={2}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-rose-500 resize-none"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                Contact Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="innovator@startup.in"
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-rose-500"
                required
              />
            </div>

            <div className="text-[11px] text-stone-400 italic flex items-center gap-1.5 pt-1">
              <ShieldAlert className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>
                Submission creates a triage brief. All communications are confidential and non-binding.
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl transition-colors text-xs flex items-center justify-center gap-1.5 shadow-xs"
            >
              {isSubmitting ? (
                <span>Generating Escalation Dossier...</span>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Submit Escalation Brief</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
