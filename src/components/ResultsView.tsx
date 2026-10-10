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
  Linkedin,
  X,
  CheckCircle2
} from 'lucide-react';
import { DiagnosticResult, UserContact } from '../types/diagnostic';
import { TRUST_MANIFESTO } from '../data/diagnosticData';
import { WhatsAppIcon } from './WhatsAppIcon';
import trinaFounderFallback from '../assets/images/trina-teo-founder.jpg';

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
  const [copiedLinkedInPost, setCopiedLinkedInPost] = useState(false);
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

  const linkedInPostText = `I just benchmarked our workforce scaling readiness using the Talent R.A.D.A.R.™ Diagnostic by Ascend Marché.

📊 Our Scaling Archetype: ${archetype.title}
⭐ Readiness Index: ${overallScore}/100 (${archetype.readinessBand})
🎯 Priority Bottleneck: ${topPriorityIssues[0]?.area || 'Workforce Architecture'}
💡 Executive Finding: "${archetype.tagline}"

Key Takeaway: Hiring solves headcounts, but workforce architecture solves consistent execution.

Diagnose your organization's scaling readiness here:
${sharePayload.url}

#AscendMarche #TalentRADAR #FractionalCHRO #StrategicHR #WorkforceArchitecture #ExecutiveLeadership`;

  const handleLinkedInShare = () => {
    // Copy the formatted post draft to clipboard automatically
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(linkedInPostText);
        setCopiedLinkedInPost(true);
      }
    } catch {
      // Fallback silently if clipboard permissions are restricted
    }

    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(sharePayload.url)}`;
    if (typeof window !== 'undefined') {
      window.open(linkedInUrl, '_blank', 'noopener,noreferrer,width=650,height=650');
    }
    setShareStatus('LinkedIn opened');
    setTimeout(() => {
      setShareStatus(null);
      setCopiedLinkedInPost(false);
    }, 4500);
  };

  const handleCopyLinkedInPost = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(linkedInPostText);
      setCopiedLinkedInPost(true);
      setTimeout(() => setCopiedLinkedInPost(false), 3000);
    }
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
      {/* Print-Only Executive Header */}
      <div className="hidden print:block mb-8 pb-4 border-b-2 border-[#D4AF37]">
        <div className="flex items-center justify-between pb-3">
          <div>
            <h1 className="text-2xl font-normal font-heading text-[#141651] tracking-wide">
              ASCEND MARCHÉ
            </h1>
            <p className="text-xs uppercase tracking-widest text-[#8C6D1F] font-label-btn">
              Strategic HR Leadership · Accelerating Transformation
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xs uppercase tracking-wider font-label-btn text-[#8C6D1F] block">
              Diagnostic Summary
            </span>
            <span className="text-xs font-label-btn text-[#141651]">
              CONFIDENTIAL EXECUTIVE BRIEF
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 pt-3 border-t border-[rgba(212,175,55,0.30)] text-xs">
          <div>
            <span className="text-3xs uppercase tracking-wider text-[#5E6088] block">Organization</span>
            <span className="font-semibold text-[#141651]">{contact?.companyName || 'Leadership Assessment'}</span>
          </div>
          <div>
            <span className="text-3xs uppercase tracking-wider text-[#5E6088] block">Executive Contact</span>
            <span className="text-[#141651]">{contact?.firstName || 'Confidential Prospect'}</span>
          </div>
          <div>
            <span className="text-3xs uppercase tracking-wider text-[#5E6088] block">Team Stage</span>
            <span className="text-[#141651]">{contact?.headcountTier ? `${contact.headcountTier} Headcount` : 'Scaling Growth'}</span>
          </div>
          <div>
            <span className="text-3xs uppercase tracking-wider text-[#5E6088] block">Date Generated</span>
            <span className="text-[#141651]">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Top Banner / Executive Summary Card */}
      <div className="bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] p-6 sm:p-10 space-y-8 print-avoid-break">
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

        {/* Quick Report Actions Toolbar - Screen Only */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 pb-4 border-b border-[rgba(212,175,55,0.20)] print:hidden">
          <span className="text-2xs font-label-btn text-[#5E6088]">
            Confidential Executive Workforce Diagnostic
          </span>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-label-btn btn-main cursor-pointer flex items-center gap-1.5"
              title="Print clean executive diagnostic summary report or save to PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[#FFFEFA]" />
              <span>Print Result</span>
            </button>
            <button
              onClick={handleLinkedInShare}
              className="px-4 py-2 text-xs font-label-btn btn-secondary-light cursor-pointer flex items-center gap-1.5"
              title="Share diagnostic summary on LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>Share on LinkedIn</span>
            </button>
            <button
              onClick={handleWebShare}
              className="px-4 py-2 text-xs font-label-btn btn-secondary-light cursor-pointer flex items-center gap-2"
              title="Share results via Web Share API, Email, or Messaging"
            >
              <Share2 className="w-3.5 h-3.5 text-[#141651]" />
              <span>{shareStatus || 'Share Results'}</span>
            </button>
          </div>
        </div>

        {/* Executive Summary Prose */}
        <div className="space-y-4 print-avoid-break">
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

          {/* Dedicated LinkedIn Archetype Social Share Block */}
          <div className="p-5 sm:p-6 bg-[#141651] text-[#FFFEFA] border border-[#E0C46A]/40 rounded-none flex flex-col md:flex-row md:items-center justify-between gap-5 print:hidden shadow-md">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-[#0A66C2] fill-current" />
                <span className="text-2xs font-label-btn text-[#D4AF37] uppercase tracking-wider">
                  Social Share · Leadership Network
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-heading font-normal text-[#FFFEFA]">
                Share your "{archetype.title}" archetype on LinkedIn
              </h3>
              <p className="text-xs text-[#DCDBE1] font-light leading-relaxed">
                Benchmark your readiness score ({overallScore}/100) with your founder network and prompt high-value peer discussion on workforce architecture.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handleCopyLinkedInPost}
                className="px-4 py-2.5 text-xs font-label-btn btn-secondary-dark flex items-center justify-center gap-2 cursor-pointer transition-all"
                title="Copy formatted post draft with archetype insights"
              >
                <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{copiedLinkedInPost ? 'Draft Copied!' : 'Copy Post Draft'}</span>
              </button>

              <button
                type="button"
                onClick={handleLinkedInShare}
                className="px-5 py-2.5 text-xs font-label-btn bg-[#0A66C2] hover:bg-[#084e96] text-white flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm font-medium group"
                title="Share your R.A.D.A.R. archetype directly on LinkedIn"
              >
                <Linkedin className="w-4 h-4 fill-current text-white" />
                <span>Share on LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Pillars Breakdown & Peer Benchmarks */}
        <div className="space-y-4 pt-4 border-t border-[rgba(212,175,55,0.30)] print-avoid-break">
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
                className="p-5 rounded-none border border-[rgba(212,175,55,0.30)] bg-[#FFFEFA] space-y-3 print-avoid-break"
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
                  <div className="w-full bg-[rgba(212,175,55,0.15)] h-2 rounded-none overflow-hidden relative print-progress-bar">
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
        <div className="space-y-4 pt-4 border-t border-[rgba(212,175,55,0.30)] print-avoid-break">
          <h2 className="text-xs font-label-btn text-[#D4AF37]">
            Top Priority Friction Areas Identified From Your Inputs
          </h2>

          <div className="space-y-3">
            {topPriorityIssues.map((issue, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print-avoid-break"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print-avoid-break">
        {/* Immediate DIY Action - Navy Section */}
        <div className="p-6 sm:p-8 bg-[#141651] text-[#FFFEFA] rounded-none border border-[#E0C46A]/40 space-y-5 flex flex-col justify-between print-clean-card print-avoid-break">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-label-btn text-[#D4AF37] print-gold-subtext">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Immediate DIY Action Plan (Implement This Week)</span>
            </div>
            <h3 className="text-2xl font-normal font-heading text-[#FFFEFA]">
              {archetype.immediateAction.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#DCDBE1] font-light leading-relaxed print-muted-text">
              {archetype.immediateAction.description}
            </p>
          </div>

          <div className="p-4 bg-[#141651] rounded-none border border-[#E0C46A]/30 text-xs text-[#DCDBE1] space-y-1 print:bg-white print:border-[rgba(212,175,55,0.4)]">
            <span className="text-[#D4AF37] block font-label-btn text-2xs print-gold-subtext">
              Immediate Deliverable:
            </span>
            <p className="leading-snug font-light">{archetype.immediateAction.deliverable}</p>
          </div>
        </div>

        {/* Critical Blind Spot & Risk Warning - Light Section */}
        <div className="p-6 sm:p-8 bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] rounded-none space-y-5 flex flex-col justify-between print-avoid-break">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-label-btn text-[#5E6088] print-gold-subtext">
              <AlertCircle className="w-4 h-4 text-[#D4AF37]" />
              <span>Critical Blind Spot & Cost of Misstep</span>
            </div>
            <h3 className="text-2xl font-normal font-heading text-[#141651]">
              {archetype.criticalBlindSpot.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#5E6088] font-light leading-relaxed print-muted-text">
              {archetype.criticalBlindSpot.warning}
            </p>
          </div>

          <div className="p-4 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] text-xs text-[#141651] space-y-1 print:border-[rgba(212,175,55,0.4)]">
            <span className="text-[#D4AF37] block font-label-btn text-2xs print-gold-subtext">
              Preventative Rule:
            </span>
            <p className="leading-snug font-light">{archetype.criticalBlindSpot.preventativeStep}</p>
          </div>
        </div>
      </div>

      {/* Recommended Next Step & Fractional Model Fit */}
      <div className="p-6 sm:p-8 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] space-y-6 print-avoid-break">
        <div className="space-y-2">
          <span className="text-xs font-label-btn text-[#D4AF37] print-gold-subtext">
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

        {/* Ethical Non-Coercive Call-To-Action Zone - Dark Navy block (Screen Only) */}
        <div className="p-6 sm:p-8 bg-[#141651] text-[#FFFEFA] rounded-none border border-[#E0C46A]/40 space-y-6 print:hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={typeof window !== 'undefined' ? (localStorage.getItem('trina_founder_photo') || '/images/trina-teo-founder.jpg') : '/images/trina-teo-founder.jpg'}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = trinaFounderFallback;
                }}
                alt="Trina Teo - Fractional CHRO & Strategic HR Leadership"
                className="w-14 h-14 rounded-none object-cover object-top border border-[#D4AF37] bg-[#080E2F]"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xs font-label-btn text-[#D4AF37]">
                    Executive Consultation
                  </span>
                  <span className="text-3xs font-label-btn px-2 py-0.5 border border-[#D4AF37]/40 text-[#DCDBE1]">
                    OnceHub Priority Booking
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-normal font-heading text-[#FFFEFA]">
                  Would you like to interpret these results together?
                </h3>
                <p className="text-xs sm:text-sm text-[#DCDBE1] font-light">
                  Book a confidential 30-minute conversation with Trina Teo via OnceHub with personal welcome message and direct calendar confirmation. No pitch, no sales reps.
                </p>
              </div>
            </div>
            
            {/* Direct Primary Action Buttons: Calendar Booking & WhatsApp */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <a
                href="https://go.oncehub.com/TalentRadarDiagnostic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 text-xs btn-main cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#FFFEFA]" />
                <span>Book Your Talent R.A.D.A.R. Diagnostic Conversation</span>
              </a>
              <a
                href="https://wa.me/6596852943?text=Hi%20Trina%2C%20I%20have%20completed%20the%20Talent%20R.A.D.A.R.%E2%84%A2%20diagnostic%20and%20would%20like%20to%20connect%20regarding%20workforce%20priorities."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 text-xs bg-[#25D366] hover:bg-[#20ba5a] text-[#0A2619] font-medium cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 transition-colors shadow-xs"
                title="Tap to connect and chat directly with Trina on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current text-[#0A2619]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="pt-5 border-t border-[rgba(212,175,55,0.30)] flex flex-wrap items-center justify-between gap-4 text-xs font-label-btn text-[#DCDBE1]">
            <div className="flex items-center gap-6 flex-wrap">
              <button
                onClick={handlePrint}
                className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Print clean executive diagnostic summary report or save to PDF"
              >
                <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Print Result</span>
              </button>
              <button
                onClick={handleLinkedInShare}
                className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Share on LinkedIn</span>
              </button>
              <a
                href="https://wa.me/6596852943?text=Hi%20Trina%2C%20I%20have%20completed%20the%20Talent%20R.A.D.A.R.%E2%84%A2%20diagnostic%20and%20would%20like%20to%20connect%20regarding%20workforce%20priorities."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#25D366] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp (+65 9685 2943)</span>
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

      {/* Radical Trust & Transparency Accordion Section (Screen Only) */}
      <div className="bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] p-6 sm:p-8 space-y-6 print:hidden">
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

      {/* Lead Magnet Engineering Bar: Strategy Blueprint & Follow-Up Generator (Screen Only) */}
      <div className="p-6 bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] rounded-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
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

      {/* Print-Only Executive Sign-off & Advisory Summary Footer */}
      <div className="hidden print:block mt-8 pt-6 border-t-2 border-[#D4AF37] print-avoid-break text-xs space-y-4">
        <div className="flex items-start justify-between gap-8">
          <div className="space-y-2 max-w-lg">
            <span className="text-3xs uppercase tracking-wider font-label-btn text-[#8C6D1F] block">
              Strategic Advisory & Implementation
            </span>
            <h4 className="text-base font-normal font-heading text-[#141651]">
              About Ascend Marché
            </h4>
            <p className="text-xs text-[#4A4D73] leading-relaxed">
              Ascend Marché provides fractional CHRO leadership and strategic workforce architecture for founders, CEOs, and growing organizations. We connect business objectives directly to people decisions, organizational design, and high-performance capability.
            </p>
          </div>
          <div className="text-right space-y-1 shrink-0 border-l border-[rgba(212,175,55,0.30)] pl-6">
            <span className="text-3xs uppercase tracking-wider font-label-btn text-[#8C6D1F] block">
              Advisor Contact
            </span>
            <p className="text-xs font-semibold text-[#141651]">Trina Teo</p>
            <p className="text-2xs text-[#5E6088]">Fractional CHRO & Strategic HR Advisor</p>
            <p className="text-2xs text-[#141651]">WhatsApp: +65 9685 2943</p>
            <p className="text-2xs text-[#141651]">engage@ascendmarche.com</p>
            <p className="text-2xs text-[#8C6D1F]">www.ascendmarche.com</p>
          </div>
        </div>

        <div className="pt-4 border-t border-[rgba(212,175,55,0.20)] flex items-center justify-between text-3xs text-[#5E6088]">
          <span>Ascend Marché Talent R.A.D.A.R.™ Framework · Strictly Confidential Executive Report</span>
          <span>© {new Date().getFullYear()} Ascend Marché. All rights reserved.</span>
        </div>
      </div>

      {/* Share Results Dialog (Web Share API Fallback & Direct Channels) */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-[#141651]/80 backdrop-blur-xs flex items-center justify-center p-4 print:hidden">
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

            {/* Direct Channel Buttons: LinkedIn, Email, WhatsApp */}
            <div className="space-y-2.5">
              {/* LinkedIn Share Card */}
              <div className="p-3 border border-[rgba(212,175,55,0.40)] bg-[rgba(212,175,55,0.04)] space-y-2">
                <button
                  type="button"
                  onClick={handleLinkedInShare}
                  className="w-full flex items-center justify-between text-xs font-label-btn text-[#141651] hover:text-[#0A66C2] cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                    <span>Share Directly on LinkedIn</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#5E6088]" />
                </button>
                <button
                  type="button"
                  onClick={handleCopyLinkedInPost}
                  className="w-full text-left text-3xs text-[#5E6088] hover:text-[#141651] pt-1 border-t border-[rgba(212,175,55,0.20)] flex items-center justify-between cursor-pointer"
                >
                  <span>{copiedLinkedInPost ? '✓ Post text copied to clipboard!' : 'Copy formatted LinkedIn post draft'}</span>
                  <Copy className="w-3 h-3 text-[#D4AF37]" />
                </button>
              </div>

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
