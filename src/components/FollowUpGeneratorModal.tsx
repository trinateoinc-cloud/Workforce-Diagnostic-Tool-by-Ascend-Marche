import React, { useState } from 'react';
import { X, Copy, Check, Mail, MessageSquare, Send, Sparkles } from 'lucide-react';
import { DiagnosticResult, UserContact } from '../types/diagnostic';

interface FollowUpGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: DiagnosticResult;
  contact?: UserContact;
}

export const FollowUpGeneratorModal: React.FC<FollowUpGeneratorModalProps> = ({
  isOpen,
  onClose,
  result,
  contact
}) => {
  const [activeTab, setActiveTab] = useState<'email' | 'whatsapp' | 'linkedin'>('email');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const { generatedFollowUp, archetype } = result;

  const activeText =
    activeTab === 'email'
      ? generatedFollowUp.emailBody
      : activeTab === 'whatsapp'
      ? generatedFollowUp.whatsAppBody
      : generatedFollowUp.linkedInBody;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const recipientEmail = contact?.email || '';
  const emailMailto = `mailto:${recipientEmail}?subject=${encodeURIComponent(
    generatedFollowUp.subject
  )}&body=${encodeURIComponent(generatedFollowUp.emailBody)}`;

  const whatsAppPhone = contact?.phoneOrWhatsApp?.replace(/[^0-9]/g, '') || '';
  const whatsAppUrl = whatsAppPhone
    ? `https://wa.me/${whatsAppPhone}?text=${encodeURIComponent(generatedFollowUp.whatsAppBody)}`
    : `https://wa.me/?text=${encodeURIComponent(generatedFollowUp.whatsAppBody)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141651]/80 backdrop-blur-xs">
      <div className="bg-[#FFFEFA] rounded-none max-w-2xl w-full p-6 sm:p-8 border border-[rgba(212,175,55,0.30)] relative animate-fadeIn space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#5E6088] hover:text-[#141651] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-2xs font-label-btn text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Behavioral Follow-Up Generator (Step 10)</span>
          </div>
          <h3 className="text-2xl font-normal font-heading text-[#141651]">
            Personalized Follow-Up Conversation
          </h3>
          <p className="text-xs text-[#5E6088] font-light">
            Automatically tuned to the prospect’s diagnosed archetype (
            <span className="text-[#141651] font-medium">{archetype.title}</span>) with zero sales-pitch pushiness.
          </p>
        </div>

        {/* Channel Segmented Control */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setActiveTab('email')}
            className={`py-2.5 px-3 text-xs font-label-btn rounded-none border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'email'
                ? 'bg-[#141651] text-[#FFFEFA] border-[#141651]'
                : 'bg-[#FFFEFA] text-[#5E6088] border-[rgba(212,175,55,0.30)] hover:border-[#D4AF37] hover:text-[#141651]'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`py-2.5 px-3 text-xs font-label-btn rounded-none border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'whatsapp'
                ? 'bg-[#141651] text-[#FFFEFA] border-[#141651]'
                : 'bg-[#FFFEFA] text-[#5E6088] border-[rgba(212,175,55,0.30)] hover:border-[#D4AF37] hover:text-[#141651]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
          <button
            onClick={() => setActiveTab('linkedin')}
            className={`py-2.5 px-3 text-xs font-label-btn rounded-none border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'linkedin'
                ? 'bg-[#141651] text-[#FFFEFA] border-[#141651]'
                : 'bg-[#FFFEFA] text-[#5E6088] border-[rgba(212,175,55,0.30)] hover:border-[#D4AF37] hover:text-[#141651]'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </button>
        </div>

        {/* Message Preview Box */}
        <div className="space-y-2">
          {activeTab === 'email' && (
            <div className="p-3 bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] rounded-none text-xs text-[#5E6088] font-light">
              <strong className="text-[#141651] font-label-btn mr-1.5">Subject:</strong>
              {generatedFollowUp.subject}
            </div>
          )}

          <div className="relative">
            <textarea
              readOnly
              rows={9}
              value={activeText}
              className="w-full p-4 text-xs sm:text-sm bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] rounded-none font-body text-[#141651] font-light leading-relaxed resize-none focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 px-3 py-1.5 text-2xs font-label-btn btn-secondary-light cursor-pointer flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Action Buttons - Main button first */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-2xs text-[#5E6088] font-light">
            Recipient: <span className="font-medium text-[#141651]">{contact?.firstName || 'Prospect'}</span> ({contact?.email || 'unregistered'})
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {activeTab === 'email' && (
              <a
                href={emailMailto}
                className="w-full sm:w-auto px-5 py-2.5 text-xs btn-main cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Open Mail Client</span>
              </a>
            )}
            {activeTab === 'whatsapp' && (
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 text-xs btn-main cursor-pointer flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Launch WhatsApp</span>
              </a>
            )}
            <button
              onClick={handleCopy}
              className="w-full sm:w-auto px-5 py-2.5 text-xs btn-secondary-light cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Copy to Clipboard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
