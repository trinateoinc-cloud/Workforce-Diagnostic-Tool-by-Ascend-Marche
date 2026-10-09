import React, { useState } from 'react';
import {
  Calendar,
  ShieldCheck,
  Sparkles,
  Printer,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  FileText,
  Mail,
  Copy,
  Check,
  AlertCircle,
  Share2,
  ExternalLink,
  X
} from 'lucide-react';
import { DiagnosticResult, UserContact } from '../types/diagnostic';
import { TRUST_MANIFESTO } from '../data/diagnosticData';
import advisorImg from '../assets/images/chro_advisor_portrait_1791268736069.jpg';

interface ResultsViewProps {
  result: DiagnosticResult;
  contact?: UserContact;
  onOpenBooking: () => void;
  onOpenFollowUpModal: () => void;
  onOpenBlueprint: () => void;
  onRetake: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  contact,
  onOpenBooking,
  onOpenFollowUpModal,
  onOpenBlueprint,
  onRetake
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [shareStatus, setShareStatus] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [expandedManifesto, setExpandedManifesto] = useState<number | null>(null);

  const { overallScore, archetype, pillars, topPriorityIssues } = result;

  const handlePrint = () => {
    window.print();
  };

  const sharePayload = {
    title: `Ascend Marché Talent R.A.D.A.R.™ Diagnostic: ${archetype.title}`,
    text: `Workforce Diagnostic Results for ${contact?.companyName || 'our organisation'}: ${archetype.title} (Readiness Score: ${overallScore}/100 — ${archetype.readinessBand}). Priority focus: ${topPriorityIssues[0]?.area || 'Workforce Architecture'}.`,
    url: typeof window !== 'undefined' ? window.location.href : 'https://ascendmarche.com'
  };

  const handleWebShare = async () => {
    // Check if the Web Share API is available in this browser/device
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(sharePayload);
        setShareStatus('Shared!');
        setTimeout(() => setShareStatus(null), 3000);
      } catch (err: unknown) {
        // If aborted/cancelled by user, do nothing; if permission denied or iframe blocked, open fallback modal
        if ((err as Error)?.name !== 'AbortError') {
          setShowShareModal(true);
        }
      }
    } else {
      // Graceful fallback to channel options modal (Email, LinkedIn, WhatsApp, Copy Link)
      setShowShareModal(true);
    }
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(`${sharePayload.title}\n${sharePayload.text}\n\n${sharePayload.url}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Restyled to use ONLY brand kit palette (Navy, Gold, Muted Navy) - NO red/amber/green
  const getPillarBarColor = (score: number) => {
    if (score >= 68) return 'bg-[#D4AF37]';
    if (score >= 48) return 'bg-[#141651]';
    return 'bg-[#5E6088]';
  };

  const getPillarBadgeStyle = (score: number) => {
    if (score >= 68) return 'text-[#D4AF37] border-[#D4AF37] bg-transparent';
    if (score >= 48) return 'text-[#141651] border-[#141651] bg-transparent';
    return 'text-[#5E6088] border-[#5E6088] bg-transparent';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-12">
      {/* Top Banner / Executive Summary Card */}
      <div className="bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] p-6 sm:p-10 space-y-8">
        {/* Unboxed Metadata Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[rgba(212,175,55,0.30)]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-label-btn text-[#5E6088]">
              <span className="text-[#D4AF37]">Talent R.A.D.A.R.™ Diagnostic Report</span>
              <span aria-hidden="true" className="text-[#D4AF37]/40">·</span>
              <span>Ascend Marché</span>
              <span aria-hidden="true" className="text-[#D4AF37]/40">·</span>
              <span>{contact?.companyName || 'Organization Analysis'}</span>
              <span aria-hidden="true" className="text-[#D4AF37]/40">·</span>
              <span>{contact?.headcountTier ? `${contact.headcountTier} Team Size` : 'Scaling Stage'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-normal text-[#141651] font-heading tracking-normal">
              {archetype.title}
            </h1>
            <p className="text-sm sm:text-base font-normal font-heading text-[#5E6088] italic">
              "{archetype.tagline}"
            </p>
          </div>

          {/* Overall Readiness Score Dial */}
          <div className="flex items-center sm:flex-col items-end gap-3 sm:gap-2 bg-[#FFFEFA] sm:bg-transparent p-4 sm:p-0 rounded-none border sm:border-0 border-[rgba(212,175,55,0.30)]">
            <div className="text-right">
              <span className="text-3xs uppercase font-label-btn text-[#5E6088] block">
                R.A.D.A.R. Readiness Index
              </span>
              <div className="text-3xl sm:text-5xl font-normal text-[#141651] font-heading">
                {overallScore}<span className="text-xl text-[#5E6088] font-light">/100</span>
              </div>
            </div>
            <div className="text-xs font-label-btn px-3 py-1 rounded-none border border-[#D4AF37] text-[#141651]">
              {archetype.readinessBand}
            </div>
          </div>
        </div>

        {/* Quick Report Actions Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 pb-4 border-b border-[rgba(212,175,55,0.20)]">
          <span className="text-2xs font-label-btn text-[#5E6088]">
            Confidential Executive Workforce Diagnostic
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={handleWebShare}
              className="px-4 py-2 text-xs font-label-btn btn-main cursor-pointer flex items-center gap-2"
              title="Share results via Web Share API, Email, LinkedIn, or Messaging"
            >
              <Share2 className="w-3.5 h-3.5 text-[#FFFEFA]" />
              <span>{shareStatus || 'Share Results'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-label-btn btn-secondary-light cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-[#5E6088]" />
              <span>Save / Print PDF</span>
            </button>
          </div>
        </div>

        {/* Executive Summary Prose */}
        <div className="space-y-4">
          <h2 className="text-xs font-label-btn text-[#D4AF37]">
            Executive Appraisal
          </h2>
          <p className="text-base sm:text-lg text-[#141651] leading-relaxed font-light">
            {archetype.executiveSummary}
          </p>
          <div className="p-5 bg-[#FFFEFA] border-l-2 border-l-[#D4AF37] border-t border-r border-b border-[rgba(212,175,55,0.30)] rounded-none text-xs sm:text-sm text-[#141651] leading-relaxed">
            <strong className="text-[#141651] font-label-btn mr-1.5">Root Diagnosis:</strong>
            <span className="font-light">{archetype.primaryDiagnosis}</span>
          </div>
        </div>

        {/* 4 Pillars Breakdown & Peer Benchmarks */}
        <div className="space-y-4 pt-4 border-t border-[rgba(212,175,55,0.30)]">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-label-btn text-[#D4AF37]">
              Workforce Architecture Pillars vs. Industry Benchmarks
            </h2>
            <span className="text-2xs text-[#5E6088] font-label-btn hidden sm:inline">
              Calibrated against {contact?.headcountTier || '51-120'} peer companies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Object.entries(pillars).map(([key, pillar]) => (
              <div
                key={key}
                className="p-5 rounded-none border border-[rgba(212,175,55,0.30)] bg-[#FFFEFA] space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-normal font-heading text-[#141651]">{pillar.name}</h3>
                  <span
                    className={`text-2xs font-label-btn px-2.5 py-0.5 rounded-none border ${getPillarBadgeStyle(
                      pillar.score
                    )}`}
                  >
                    {pillar.status}
                  </span>
                </div>

                {/* Score vs Benchmark bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-label-btn">
                    <span className="text-[#141651]">{pillar.score}% Score</span>
                    <span className="text-[#5E6088]">
                      Peer Benchmark: {pillar.industryBenchmark}%
                    </span>
                  </div>
                  <div className="w-full bg-[rgba(212,175,55,0.15)] h-2 rounded-none overflow-hidden relative">
                    {/* Benchmark tick marker */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-[#141651] z-10"
                      style={{ left: `${pillar.industryBenchmark}%` }}
                      title={`Industry Benchmark: ${pillar.industryBenchmark}%`}
                    />
                    <div
                      className={`h-full rounded-none transition-all duration-500 ${getPillarBarColor(
                        pillar.score
                      )}`}
                      style={{ width: `${pillar.score}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs text-[#5E6088] font-light leading-relaxed">{pillar.assessment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top 1-3 Priority Friction Points */}
        <div className="space-y-4 pt-4 border-t border-[rgba(212,175,55,0.30)]">
          <h2 className="text-xs font-label-btn text-[#D4AF37]">
            Top Priority Friction Areas Identified From Your Inputs
          </h2>

          <div className="space-y-3">
            {topPriorityIssues.map((issue, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-none border border-[#D4AF37] text-[#D4AF37] text-2xs font-label-btn flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-label-btn text-[#5E6088]">
                      {issue.area}
                    </span>
                  </div>
                  <h3 className="text-lg font-normal font-heading text-[#141651]">{issue.observedSymptom}</h3>
                  <p className="text-xs text-[#5E6088] font-light leading-relaxed">{issue.microSolution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Immediate DIY Action & Blind Spot Guidance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Immediate DIY Action - Navy Section */}
        <div className="p-6 sm:p-8 bg-[#141651] text-[#FFFEFA] rounded-none border border-[#E0C46A]/40 space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-label-btn text-[#D4AF37]">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Immediate DIY Action Plan (Implement This Week)</span>
            </div>
            <h3 className="text-2xl font-normal font-heading text-[#FFFEFA]">
              {archetype.immediateAction.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#DCDBE1] font-light leading-relaxed">
              {archetype.immediateAction.description}
            </p>
          </div>

          <div className="p-4 bg-[#141651] rounded-none border border-[#E0C46A]/30 text-xs text-[#DCDBE1] space-y-1">
            <span className="text-[#D4AF37] block font-label-btn text-2xs">
              Immediate Deliverable:
            </span>
            <p className="leading-snug font-light">{archetype.immediateAction.deliverable}</p>
          </div>
        </div>

        {/* Critical Blind Spot & Risk Warning - Light Section */}
        <div className="p-6 sm:p-8 bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] rounded-none space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-label-btn text-[#5E6088]">
              <AlertCircle className="w-4 h-4 text-[#D4AF37]" />
              <span>Critical Blind Spot & Cost of Misstep</span>
            </div>
            <h3 className="text-2xl font-normal font-heading text-[#141651]">
              {archetype.criticalBlindSpot.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#5E6088] font-light leading-relaxed">
              {archetype.criticalBlindSpot.warning}
            </p>
          </div>

          <div className="p-4 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] text-xs text-[#141651] space-y-1">
            <span className="text-[#D4AF37] block font-label-btn text-2xs">
              Preventative Rule:
            </span>
            <p className="leading-snug font-light">{archetype.criticalBlindSpot.preventativeStep}</p>
          </div>
        </div>
      </div>

      {/* Recommended Next Step & Fractional Model Fit */}
      <div className="p-6 sm:p-8 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-label-btn text-[#D4AF37]">
            Strategic Direction
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal font-heading text-[#141651]">
            Recommended Next Step For Your Executive Team
          </h2>
          <p className="text-sm text-[#5E6088] font-light leading-relaxed">
            {archetype.strategicRecommendation}
          </p>
        </div>

        <div className="p-5 bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] rounded-none space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-label-btn text-[#141651]">
              Optimal HR Operating Model:
            </span>
          </div>
          <p className="text-base font-normal font-heading text-[#141651]">
            {archetype.suggestedFractionalModel}
          </p>
          <p className="text-xs text-[#5E6088] font-light">
            Allows high-growth companies to access Fortune-500 talent strategy and senior org design at roughly 25–35% of a full-time CHRO package.
          </p>
        </div>

        {/* Ethical Non-Coercive Call-To-Action Zone - Dark Navy block */}
        <div className="p-6 sm:p-8 bg-[#141651] text-[#FFFEFA] rounded-none border border-[#E0C46A]/40 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={advisorImg}
                alt="Trina Teo - Fractional CHRO & Strategic HR Leadership"
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-none object-cover border border-[#D4AF37]"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xs font-label-btn text-[#D4AF37]">
                    Executive Consultation
                  </span>
                  <span className="text-3xs font-label-btn px-2 py-0.5 border border-[#D4AF37]/40 text-[#DCDBE1]">
                    Google Calendar Synced
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-normal font-heading text-[#FFFEFA]">
                  Would you like to interpret these results together?
                </h3>
                <p className="text-xs sm:text-sm text-[#DCDBE1] font-light">
                  Book a confidential 30-minute conversation with Trina Teo. Schedule directly into your Google Calendar with automated Google Meet video invite. No pitch, no sales reps.
                </p>
              </div>
            </div>
            
            {/* Main button first */}
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-7 py-3.5 text-xs btn-main cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#FFFEFA]" />
              <span>Schedule via Google Calendar</span>
            </button>
          </div>

          <div className="pt-5 border-t border-[rgba(212,175,55,0.30)] flex flex-wrap items-center justify-between gap-4 text-xs font-label-btn text-[#DCDBE1]">
            <div className="flex items-center gap-6">
              <button
                onClick={handlePrint}
                className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Save / Print PDF Brief</span>
              </button>
              <a
                href="https://wa.me/6596852943?text=Hi%20Trina%2C%20I%20completed%20the%20Talent%20R.A.D.A.R.%E2%84%A2%20Diagnostic%20and%20would%20like%20to%20discuss%20our%20workforce%20priorities."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>WhatsApp Trina (+65 9685 2943)</span>
              </a>
              <button
                onClick={handleWebShare}
                className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{shareStatus || 'Share Results'}</span>
              </button>
            </div>

            <button
              onClick={onRetake}
              className="text-[#DCDBE1] hover:text-[#D4AF37] underline underline-offset-4 cursor-pointer"
            >
              Re-run Diagnostic with different scenario
            </button>
          </div>
        </div>
      </div>

      {/* Radical Trust & Transparency Accordion Section */}
      <div className="bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="text-2xl font-normal font-heading text-[#141651]">
            Radical Transparency & Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {TRUST_MANIFESTO.map((item, idx) => {
            const isExpanded = expandedManifesto === idx;
            return (
              <div
                key={idx}
                className="border border-[rgba(212,175,55,0.30)] rounded-none overflow-hidden transition-all bg-[#FFFEFA]"
              >
                <button
                  onClick={() => setExpandedManifesto(isExpanded ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 bg-[#FFFEFA] hover:bg-[#FFFEFA] cursor-pointer"
                >
                  <span className="text-base font-normal font-heading text-[#141651]">{item.title}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#141651]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
                  )}
                </button>
                {isExpanded && (
                  <div className="p-5 bg-[#FFFEFA] border-t border-[rgba(212,175,55,0.20)] text-xs sm:text-sm text-[#5E6088] font-light leading-relaxed">
                    {item.text}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lead Magnet Engineering Bar: Strategy Blueprint & Follow-Up Generator */}
      <div className="p-6 bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] rounded-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-label-btn text-[#D4AF37]">
            Advisor & Marketer Toolkit
          </span>
          <p className="text-xs text-[#5E6088] font-light">
            Inspect the underlying 10-step Lead Magnet Strategy, Scoring Matrix, or generate personalized follow-up templates for this prospect.
          </p>
        </div>

        {/* Main button first, second button second */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBlueprint}
            className="px-5 py-2.5 text-xs btn-main cursor-pointer flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Strategy Blueprint</span>
          </button>
          <button
            onClick={onOpenFollowUpModal}
            className="px-5 py-2.5 text-xs btn-secondary-light cursor-pointer flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Follow-Up Generator</span>
          </button>
        </div>
      </div>

      {/* Share Results Dialog (Web Share API Fallback & Direct Channels) */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-[#141651]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFEFA] border border-[rgba(212,175,55,0.40)] max-w-md w-full p-6 sm:p-8 space-y-6 text-[#141651] relative shadow-2xl">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-[#5E6088] hover:text-[#141651] cursor-pointer"
              aria-label="Close share dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-label-btn text-[#D4AF37]">
                Ascend Marché Diagnostic
              </span>
              <h3 className="text-xl sm:text-2xl font-normal font-heading text-[#141651]">
                Share Your Diagnostic Results
              </h3>
              <p className="text-xs text-[#5E6088] font-light leading-relaxed">
                Easily share this executive readiness report with your co-founders, board members, or executive leadership team.
              </p>
            </div>

            {/* Direct Channel Buttons: Email, LinkedIn, Messaging */}
            <div className="space-y-2.5">
              {/* Email */}
              <a
                href={`mailto:?subject=${encodeURIComponent(sharePayload.title)}&body=${encodeURIComponent(
                  `${sharePayload.text}\n\nReview the full diagnostic report here:\n${sharePayload.url}`
                )}`}
                className="w-full p-3 border border-[rgba(212,175,55,0.30)] hover:border-[#D4AF37] hover:bg-[rgba(212,175,55,0.06)] flex items-center justify-between transition-colors text-xs font-label-btn text-[#141651]"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                  <span>Share via Email</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#5E6088]" />
              </a>

              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(sharePayload.url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-3 border border-[rgba(212,175,55,0.30)] hover:border-[#D4AF37] hover:bg-[rgba(212,175,55,0.06)] flex items-center justify-between transition-colors text-xs font-label-btn text-[#141651]"
              >
                <div className="flex items-center gap-2.5">
                  <Share2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Share on LinkedIn</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#5E6088]" />
              </a>

              {/* WhatsApp / Messaging Apps */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `${sharePayload.title} — ${sharePayload.text} ${sharePayload.url}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-3 border border-[rgba(212,175,55,0.30)] hover:border-[#D4AF37] hover:bg-[rgba(212,175,55,0.06)] flex items-center justify-between transition-colors text-xs font-label-btn text-[#141651]"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                  <span>Share via WhatsApp / Messaging</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#5E6088]" />
              </a>

              {/* Copy Brief & Link */}
              <button
                type="button"
                onClick={handleCopyShareLink}
                className="w-full p-3 border border-[rgba(212,175,55,0.30)] hover:border-[#D4AF37] hover:bg-[rgba(212,175,55,0.06)] flex items-center justify-between transition-colors text-xs font-label-btn text-[#141651] cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  {copiedLink ? <Check className="w-4 h-4 text-[#D4AF37]" /> : <Copy className="w-4 h-4 text-[#D4AF37]" />}
                  <span>{copiedLink ? 'Copied to Clipboard!' : 'Copy Summary & Link'}</span>
                </div>
                <span className="text-3xs text-[#5E6088]">One-Click</span>
              </button>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 text-xs font-label-btn btn-secondary-light cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
