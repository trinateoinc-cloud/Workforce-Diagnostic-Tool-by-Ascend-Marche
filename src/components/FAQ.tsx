import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Lock, ShieldCheck, DollarSign, Users, Briefcase } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  highlightIcon: React.ElementType;
}

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('privacy');

  const faqs: FAQItem[] = [
    {
      id: 'privacy',
      question: 'What happens to my data? Is my assessment confidential?',
      answer: 'Your responses and organizational context are strictly confidential. We never sell, rent, or share your data with recruiters, advertisers, or third-party vendors. Your inputs are used solely to calculate your readiness scores and generate your tailored benchmark report. If you choose to book an interpretation session, your results simply serve as the baseline agenda for our confidential discussion.',
      highlightIcon: Lock
    },
    {
      id: 'cost',
      question: 'Is this diagnostic really 100% free? Are there hidden catches or fees?',
      answer: 'Yes, it is completely free with zero hidden charges. You receive your complete readiness score, 4-pillar breakdown, peer benchmark comparison, and immediate DIY action deliverable right on screen without any payment required. We offer this because we believe CEOs should understand their root organizational problem before deciding whether to spend capital fixing it. If this framework gives you clarity to solve it internally, you win. If you later determine you need senior advisory, you know where to find us.',
      highlightIcon: DollarSign
    },
    {
      id: 'definition',
      question: 'What is a "Fractional CHRO", and how does it differ from a full-time hire or HR consultant?',
      answer: 'A Fractional CHRO is a seasoned Chief Human Resources Officer who embeds directly into your executive leadership team for a fraction of the week (typically 1–2 days/week or strategic project sprints). Unlike traditional consultants who deliver slide decks from the outside, a Fractional CHRO owns outcomes, advises the CEO, leads org design, and coaches managers. Unlike a full-time executive ($350k+ salary plus heavy equity), a fractional model gives you Fortune-500 talent strategy at roughly 25%–35% of the annual cash commitment.',
      highlightIcon: Briefcase
    },
    {
      id: 'existing_hr',
      question: 'What if we already have an internal HR Manager or Generalist?',
      answer: 'That is the ideal setup for a Fractional CHRO. Your internal HR manager excels at day-to-day employee operations, onboarding, benefits, and payroll. The Fractional CHRO steps in to provide senior executive cover: designing compensation bands, restructuring cross-functional teams, preparing for board meetings, and mentoring your HR manager to grow into a more senior leader.',
      highlightIcon: Users
    },
    {
      id: 'sales_pressure',
      question: 'Will I be pressured into a sales call after taking this?',
      answer: 'Never. There are no automated cold calling sequences or aggressive sales reps. You can review your entire diagnostic analysis on-screen, download a PDF summary for your co-founders, or close the page. The optional 30-minute interpretation call is strictly driven by your preference if you want a second pair of eyes on your organization.',
      highlightIcon: ShieldCheck
    }
  ];

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-xs font-label-btn text-[#5E6088]">
          <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[#D4AF37]">Clarity & Answers</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-normal text-[#141651] font-heading">
          Frequently Asked Questions
        </h3>
        <p className="text-xs sm:text-sm text-[#5E6088] font-light max-w-xl mx-auto">
          Everything you need to know about our methodology, privacy standards, and the fractional advisory model.
        </p>
      </div>

      <div className="space-y-3 pt-2">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          const Icon = faq.highlightIcon;
          return (
            <div
              key={faq.id}
              className={`rounded-none border transition-all ${
                isOpen
                  ? 'bg-[#FFFEFA] border-[#D4AF37]'
                  : 'bg-[#FFFEFA] border-[rgba(212,175,55,0.30)] hover:border-[#D4AF37]'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(faq.id)}
                className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-1.5 rounded-none shrink-0 mt-0.5 border ${
                      isOpen
                        ? 'bg-[#141651] text-[#FFFEFA] border-[#141651]'
                        : 'bg-transparent text-[#D4AF37] border-[rgba(212,175,55,0.30)]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-base sm:text-lg font-normal text-[#141651] font-heading leading-snug">
                    {faq.question}
                  </span>
                </div>
                <div className="text-[#D4AF37] shrink-0 mt-1">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#141651]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#D4AF37]" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5E6088] font-light leading-relaxed border-t border-[rgba(212,175,55,0.15)] pl-12 sm:pl-14">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
