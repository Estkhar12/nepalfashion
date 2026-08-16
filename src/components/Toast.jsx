import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

export const Toast = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0B192C] text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 animate-slideUp">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
      <span className="text-xs sm:text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white p-1 ml-2 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
