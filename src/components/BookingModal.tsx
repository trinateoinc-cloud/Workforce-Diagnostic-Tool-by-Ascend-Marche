import React, { useState } from 'react';
import { Calendar, CheckCircle2, X, MessageSquare, ShieldCheck, ExternalLink, Clock, Sparkles } from 'lucide-react';
import advisorImg from '../assets/images/chro_advisor_portrait_1791268736069.jpg';
import { UserContact } from '../types/diagnostic';
import { GoogleCalendarScheduler } from './GoogleCalendarScheduler';

// Dedicated OnceHub booking URL for Talent R.A.D.A.R.™ Diagnostic
export const ONCEHUB_BOOKING_URL = 'https://go.oncehub.com/TalentRadarDiagnostic';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact?: UserContact;
  archetypeTitle?: string;
  overallScore?: number;
  priorityFocus?: string;
  customBookingUrl?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  contact,
  archetypeTitle,
  overallScore,
  priorityFocus,
  customBookingUrl = ONCEHUB_BOOKING_URL
}) => {
  const [activeTab, setActiveTab] = useState<'google-calendar' | 'oncehub'>('google-calendar');
  const [onceHubView, setOnceHubView] = useState<'overview' | 'embedded'>('overview');

  if (!isOpen) return null;

  // Build OnceHub URL with tracking & prefill parameters
  const buildOnceHubUrl = () => {
    try {
      const url = new URL(customBookingUrl);
      if (contact?.firstName) {
        url.searchParams.set('Name', contact.firstName.trim());
      }
      if (contact?.email) {
        url.searchParams.set('Email', contact.email);
      }
      if (contact?.companyName) {
        url.searchParams.set('Company', contact.companyName);
      }
      url.searchParams.set('source', 'talent_radar_diagnostic');
      if (archetypeTitle) {
        url.searchParams.set('archetype', archetypeTitle);
      }
      return url.toString();
    } catch {
      return customBookingUrl;
    }
  };

  const onceHubUrl = buildOnceHubUrl();

  const handleLaunchOnceHub = () => {
    window.open(onceHubUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141651]/80 backdrop-blur-xs">
      <div className="bg-[#FFFEFA] rounded-none max-w-2xl w-full p-6 sm:p-8 border border-[rgba(212,175,55,0.30)] relative animate-fadeIn shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#5E6088] hover:text-[#141651] transition-colors cursor-pointer"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          {/* Header & Advisor Identity */}
          <div className="flex items-start gap-4">
            <img
              src={advisorImg}
              alt="Trina Teo - Fractional CHRO & Strategic HR Leadership"
              referrerPolicy="no-referrer"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-none object-cover border border-[#D4AF37] shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-2xs font-label-btn text-[#D4AF37]">
                  Talent R.A.D.A.R.™ Session
                </span>
                <span className="text-3xs font-label-btn px-2 py-0.5 rounded-none border border-[rgba(212,175,55,0.40)] text-[#141651] bg-[#FFFEFA]">
                  Google Calendar Enabled
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-normal font-heading text-[#141651]">
                30-Minute Priorities Calibration
              </h3>
              <p className="text-xs text-[#5E6088] font-light">
                With Trina Teo — Fractional CHRO | Ascend Marché Strategic HR Leadership
              </p>
            </div>
          </div>

          {/* Conversation Agenda & Anti-Sales Promise */}
          <div className="p-5 bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] rounded-none space-y-3">
            <h4 className="text-xs font-label-btn text-[#141651] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              What We Will Cover (Zero Hard Sell)
            </h4>
            <ul className="text-xs text-[#5E6088] space-y-2 font-light list-disc list-inside leading-relaxed">
              <li>
                <strong className="text-[#141651] font-medium mr-1">Interpret your diagnosis:</strong>
                Review your {archetypeTitle ? `"${archetypeTitle}"` : 'workforce'} findings against benchmark peer scaling companies.
              </li>
              <li>
                <strong className="text-[#141651] font-medium mr-1">Immediate DIY fix:</strong>
                Flesh out the 1 priority workforce action your team can implement internally this week.
              </li>
              <li>
                <strong className="text-[#141651] font-medium mr-1">Honest options analysis:</strong>
                Evaluate whether your stage calls for a full-time hire, a fractional CHRO, or simply enabling your existing managers.
              </li>
            </ul>
          </div>

          {/* Attendee Context Bar */}
          {contact && (
            <div className="p-3.5 bg-[rgba(212,175,55,0.06)] border-l-2 border-l-[#D4AF37] border-t border-r border-b border-[rgba(212,175,55,0.20)] text-xs text-[#141651] flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="font-label-btn mr-1.5">Booking For:</span>
                <span className="font-light">{contact.firstName} ({contact.email})</span>
              </div>
              {contact.companyName && (
                <span className="text-2xs font-label-btn text-[#5E6088]">
                  {contact.companyName}
                </span>
              )}
            </div>
          )}

          {/* Booking Channel Navigation Tabs */}
          <div className="flex border-b border-[rgba(212,175,55,0.30)]">
            <button
              type="button"
              onClick={() => setActiveTab('google-calendar')}
              className={`flex-1 py-2.5 text-xs font-label-btn transition-colors cursor-pointer border-b-2 flex items-center justify-center gap-2 ${
                activeTab === 'google-calendar'
                  ? 'border-[#D4AF37] text-[#141651] font-medium'
                  : 'border-transparent text-[#5E6088] hover:text-[#141651]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Google Calendar (Direct Sync)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('oncehub')}
              className={`flex-1 py-2.5 text-xs font-label-btn transition-colors cursor-pointer border-b-2 flex items-center justify-center gap-2 ${
                activeTab === 'oncehub'
                  ? 'border-[#D4AF37] text-[#141651] font-medium'
                  : 'border-transparent text-[#5E6088] hover:text-[#141651]'
              }`}
            >
              <span>OnceHub Calendar Link</span>
              <ExternalLink className="w-3 h-3 text-[#5E6088]" />
            </button>
          </div>

          {/* Tab 1: Google Calendar Direct Scheduler */}
          {activeTab === 'google-calendar' && (
            <GoogleCalendarScheduler
              contact={contact}
              archetypeTitle={archetypeTitle}
              overallScore={overallScore}
              priorityFocus={priorityFocus}
            />
          )}

          {/* Tab 2: OnceHub Integration */}
          {activeTab === 'oncehub' && (
            <div>
              {onceHubView === 'embedded' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[rgba(212,175,55,0.20)]">
                    <span className="text-xs font-label-btn text-[#141651]">
                      Live OnceHub Calendar
                    </span>
                    <button
                      type="button"
                      onClick={() => setOnceHubView('overview')}
                      className="text-2xs font-label-btn text-[#D4AF37] hover:underline cursor-pointer"
                    >
                      Back to overview
                    </button>
                  </div>

                  <div className="w-full h-[450px] border border-[rgba(212,175,55,0.30)] bg-white">
                    <iframe
                      src={onceHubUrl}
                      title="OnceHub Booking Calendar"
                      className="w-full h-full border-0"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-5 bg-[#141651] text-[#FFFEFA] rounded-none border border-[#E0C46A]/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-label-btn text-[#D4AF37]">
                        <Clock className="w-4 h-4 text-[#D4AF37]" />
                        <span>Live OnceHub Booking · 30-Minute Strategy Session</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#DCDBE1] font-light leading-relaxed">
                      Select a live date & time directly from Trina’s public calendar. You will receive an immediate confirmation and calendar invitation.
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <button
                        type="button"
                        onClick={handleLaunchOnceHub}
                        className="flex-1 py-3.5 px-5 text-xs btn-main cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-4 h-4 text-[#FFFEFA]" />
                        <span>Open Live OnceHub Calendar</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#FFFEFA]" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setOnceHubView('embedded')}
                        className="py-3.5 px-4 text-xs btn-secondary-dark cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        <span>View Calendar Here</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Alternate Contact Options */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-label-btn text-[#5E6088] border-t border-[rgba(212,175,55,0.20)]">
            <a
              href="https://wa.me/6596852943?text=Hi%20Trina%2C%20I%20completed%20the%20Talent%20R.A.D.A.R.%E2%84%A2%20Diagnostic%20and%20would%20like%20to%20discuss%20our%20workforce%20priorities."
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Prefer WhatsApp? (+65 9685 2943)</span>
            </a>

            <div className="flex items-center gap-3">
              <span className="text-[#5E6088]">Email:</span>
              <a
                href={`mailto:engage@ascendmarche.com?cc=trina@ascendmarche.com&subject=Talent%20R.A.D.A.R.%20Diagnostic%20Follow-Up&body=Hi%20Trina%2C%0A%0AI%20completed%20the%20Talent%20R.A.D.A.R.%20Diagnostic%20for%20${encodeURIComponent(contact?.companyName || 'our company')}%20and%20would%20like%20to%20review%20our%20workforce%20priorities.`}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                engage@ascendmarche.com
              </a>
              <span aria-hidden="true" className="text-[#D4AF37]/40">·</span>
              <a
                href={`mailto:trina@ascendmarche.com?subject=Talent%20R.A.D.A.R.%20Diagnostic%20Follow-Up&body=Hi%20Trina%2C%0A%0AI%20completed%20the%20Talent%20R.A.D.A.R.%20Diagnostic%20for%20${encodeURIComponent(contact?.companyName || 'our company')}%20and%20would%20like%20to%20review%20our%20workforce%20priorities.`}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                trina@ascendmarche.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
