import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Lock, X } from 'lucide-react';
import { UserContact } from '../types/diagnostic';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (contact: UserContact) => void;
  onSkip: () => void;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onSkip
}) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [headcountTier, setHeadcountTier] = useState<UserContact['headcountTier']>('51-120');
  const [phoneOrWhatsApp, setPhoneOrWhatsApp] = useState('');
  const [errors, setErrors] = useState<{ email?: string; firstName?: string }>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; firstName?: string } = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      newErrors.email = 'Valid work email is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      firstName: firstName.trim(),
      email: email.trim(),
      companyName: companyName.trim() || 'Your Organization',
      headcountTier,
      phoneOrWhatsApp: phoneOrWhatsApp.trim() || undefined
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141651]/80 backdrop-blur-xs">
      <div className="bg-[#FFFEFA] rounded-none max-w-lg w-full p-6 sm:p-8 border border-[rgba(212,175,55,0.30)] relative animate-fadeIn space-y-6">
        <button
          onClick={onSkip}
          className="absolute top-4 right-4 p-1.5 text-[#5E6088] hover:text-[#141651] transition-colors cursor-pointer"
          title="Skip to results"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-label-btn text-[#5E6088]">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[#D4AF37]">Diagnosis Complete</span>
            <span aria-hidden="true" className="text-[#D4AF37]/40">·</span>
            <span>Un-Gated Report</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-normal text-[#141651] font-heading">
            Personalize Your Executive Report
          </h3>
          <p className="text-xs sm:text-sm text-[#5E6088] font-light leading-relaxed">
            Enter your details to generate your customized readiness report and benchmark comparison against peer companies at your scale.
          </p>
        </div>

        {/* Ethical Transparency Note */}
        <div className="p-4 bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] rounded-none flex items-start gap-3 text-xs text-[#5E6088] font-light">
          <Lock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#141651] font-label-btn mr-1">No spam, no cold calls:</strong>
            We respect executive inboxes. You will receive your personalized analysis and follow-up resources. No high-pressure sales reps.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-label-btn text-[#141651] mb-1.5">
                First Name *
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (errors.firstName) setErrors({ ...errors, firstName: undefined });
                }}
                placeholder="e.g. Sarah"
                className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-none border ${
                  errors.firstName ? 'border-[#5E6088]' : 'border-[rgba(212,175,55,0.30)]'
                } bg-[#FFFEFA] text-[#141651] font-light focus:outline-none focus:border-[#D4AF37]`}
              />
              {errors.firstName && (
                <p className="text-[#5E6088] text-2xs font-label-btn mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-label-btn text-[#141651] mb-1.5">
                Work Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="sarah@company.com"
                className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-none border ${
                  errors.email ? 'border-[#5E6088]' : 'border-[rgba(212,175,55,0.30)]'
                } bg-[#FFFEFA] text-[#141651] font-light focus:outline-none focus:border-[#D4AF37]`}
              />
              {errors.email && (
                <p className="text-[#5E6088] text-2xs font-label-btn mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-label-btn text-[#141651] mb-1.5">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Acme Tech"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-none border border-[rgba(212,175,55,0.30)] bg-[#FFFEFA] text-[#141651] font-light focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-label-btn text-[#141651] mb-1.5">
                Current Headcount Tier
              </label>
              <select
                value={headcountTier}
                onChange={(e) => setHeadcountTier(e.target.value as UserContact['headcountTier'])}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-none border border-[rgba(212,175,55,0.30)] bg-[#FFFEFA] text-[#141651] font-light focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="20-50">20–50 Employees (Early Scale)</option>
                <option value="51-120">51–120 Employees (Mid Scale)</option>
                <option value="121-250">121–250 Employees (Expansion)</option>
                <option value="250+">250+ Employees (Enterprise)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-label-btn text-[#141651] mb-1.5">
              WhatsApp or Direct Mobile <span className="text-[#5E6088] font-light">(Optional for direct audio note)</span>
            </label>
            <input
              type="tel"
              value={phoneOrWhatsApp}
              onChange={(e) => setPhoneOrWhatsApp(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-none border border-[rgba(212,175,55,0.30)] bg-[#FFFEFA] text-[#141651] font-light focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="pt-2 space-y-3">
            {/* Main button first */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 text-xs btn-main cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>Generate My Personalized Report</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Secondary option */}
            <button
              type="button"
              onClick={onSkip}
              className="w-full py-2.5 text-xs text-[#5E6088] hover:text-[#141651] font-label-btn transition-colors cursor-pointer"
            >
              Or skip and view assessment results directly on screen →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
