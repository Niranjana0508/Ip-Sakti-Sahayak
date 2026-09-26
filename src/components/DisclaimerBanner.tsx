import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2.5 text-xs text-amber-900 flex items-center justify-center gap-2 shadow-xs">
      <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
      <span className="font-medium text-amber-950">Statutory Notice:</span>
      <span>
        IP-SAKTI Sahayak provides informational guidance and statutory navigation for Ayurveda researchers and innovators. 
        It does <strong>NOT constitute formal legal advice</strong>. Official determinations must be made by the appropriate statutory authority (IP India, Ministry of Ayush, or National Biodiversity Authority).
      </span>
    </div>
  );
};
