import React from 'react';
import { X, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { TRUST_MANIFESTO } from '../data/diagnosticData';
import advisorImg from '../assets/images/chro_advisor_portrait_1791268736069.jpg';

interface TrustManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartDiagnostic: () => void;
}

export const TrustManifestoModal: React.FC<TrustManifestoModalProps> = ({
  isOpen,
  onClose,
  onStartDiagnostic
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141651]/80 backdrop-blur-xs">
      <div className="bg-[#FFFEFA] rounded-none max-w-xl w-full p-6 sm:p-8 border border-[rgba(212,175,55,0.30)] relative animate-fadeIn space-y-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#5E6088] hover:text-[#141651] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-2xs font-label-btn text-[#D4AF37]">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>Radical Transparency</span>
          </div>
          <h3 className="text-2xl font-normal font-heading text-[#141651]">
            Why This Assessment Is Free & What Happens Next
          </h3>
          <p className="text-xs text-[#5E6088] font-light">
            A promise to founders and CEOs regarding sales pressure, privacy, and integrity.
          </p>
        </div>

        {/* Manifesto Cards */}
        <div className="space-y-3">
          {TRUST_MANIFESTO.map((item, idx) => (
            <div
              key={idx}
              className="p-5 bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] rounded-none space-y-1.5 text-xs"
            >
              <h4 className="font-heading font-normal text-base text-[#141651] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{item.title}</span>
              </h4>
              <p className="text-[#5E6088] leading-relaxed pl-6 font-light">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Advisor Sign-off - Dark Navy Card */}
        <div className="p-5 bg-[#141651] text-[#FFFEFA] rounded-none border border-[#E0C46A]/40 flex items-center gap-4">
          <img
            src={advisorImg}
            alt="Trina Teo - Fractional CHRO & Strategic HR Leadership"
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-none object-cover border border-[#D4AF37] shrink-0"
          />
          <div className="space-y-0.5 text-xs">
            <p className="font-heading font-normal text-base text-[#FFFEFA]">Trina Teo — Fractional CHRO</p>
            <p className="text-[#DCDBE1] font-light">
              Ascend Marché Strategic HR Leadership · "We connect business priorities to people decisions. Diagnostics come first."
            </p>
          </div>
        </div>

        {/* Action - Main button first */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            onClick={() => {
              onClose();
              onStartDiagnostic();
            }}
            className="px-6 py-2.5 text-xs btn-main cursor-pointer"
          >
            Start Diagnostic
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs btn-secondary-light cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
