import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';
import heroImg from '../assets/images/hero_executive_advisory_1791268696498.jpg';
import advisorImg from '../assets/images/chro_advisor_portrait_1791268736069.jpg';
import { FAQ } from './FAQ';
import { TalentRadarOrbit } from './TalentRadarOrbit';

interface HeroViewProps {
  onStart: () => void;
  onViewSample: () => void;
  onOpenManifesto: () => void;
}

export const HeroView: React.FC<HeroViewProps> = ({
  onStart,
  onViewSample,
  onOpenManifesto
}) => {
  return (
    <div className="py-8 sm:py-14 space-y-16">
      {/* Hero Header Block */}
      <div className="max-w-4xl mx-auto text-center space-y-6 px-4">
        {/* Subtle metadata eyebrow - zero-pill discipline */}
        <div className="flex items-center justify-center gap-2 text-xs font-label-btn text-[#5E6088]">
          <span className="text-[#D4AF37]">Talent R.A.D.A.R.™ Diagnostic</span>
          <span aria-hidden="true" className="text-[#D4AF37]/40">·</span>
          <span>CEOs & Founders (20–250 Team Size)</span>
          <span aria-hidden="true" className="text-[#D4AF37]/40">·</span>
          <span>4-Minute Diagnostic</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-[#141651] font-heading tracking-normal leading-[1.15]">
          Is Your Workforce Ready for Your Next Stage of Growth?
        </h1>

        <p className="text-base sm:text-xl text-[#141651] max-w-2xl mx-auto font-light leading-relaxed">
          When companies scale, restructure, or adopt AI, informal HR reaches its operational limit.
          Diagnose whether your organization is carrying hidden people friction before it impacts runway and delivery.
        </p>

        {/* Action button cluster - Main button ALWAYS first */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-3.5 text-xs btn-main cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>Begin Talent R.A.D.A.R.™ Diagnostic</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          
          <button
            onClick={onViewSample}
            className="w-full sm:w-auto px-7 py-3.5 text-xs btn-secondary-light cursor-pointer flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-[#D4AF37]" />
            <span>Preview Sample Report</span>
          </button>
        </div>

        {/* Micro Trust Indicators */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-[#5E6088] font-body">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            Strictly 8 Questions
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            Instant Un-Gated Results
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            Zero Hard Selling
          </span>
          <button
            onClick={onOpenManifesto}
            className="text-[#141651] underline underline-offset-4 hover:text-[#D4AF37] font-medium transition-colors cursor-pointer"
          >
            Why is this free?
          </button>
        </div>
      </div>

      {/* Embedded Talent R.A.D.A.R.™ Orbit Component */}
      <div className="max-w-5xl mx-auto px-4">
        <TalentRadarOrbit onStartDiagnostic={onStart} />
      </div>

      {/* Featured Visual & Problem-Solving Bento Banner */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative rounded-none overflow-hidden border border-[rgba(212,175,55,0.30)] bg-[#141651] aspect-[16/8] sm:aspect-[16/7]">
          <img
            src={heroImg}
            alt="Executive Boardroom and Workforce Advisory"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141651] via-[#141651]/60 to-transparent flex flex-col justify-end p-6 sm:p-10 text-[#FFFEFA]">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-label-btn text-[#D4AF37]">
                Ascend Marché Strategic HR Leadership
              </span>
              <h2 className="text-xl sm:text-3xl font-normal text-[#FFFEFA] font-heading leading-snug">
                "Hiring solves headcounts. Workforce architecture solves consistent execution."
              </h2>
              <p className="text-xs sm:text-sm text-[#DCDBE1] font-light leading-relaxed">
                Most companies with 20–250 employees don't need a $350k full-time CHRO yet. But they cannot afford to run on ad-hoc payroll administration while navigating high-stakes growth and AI redesign.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The 5 Silent Bottlenecks Diagnosed via R.A.D.A.R. */}
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-label-btn text-[#D4AF37]">
            What This Diagnostic Evaluates
          </span>
          <h3 className="text-2xl sm:text-3xl font-normal text-[#141651] font-heading">
            The 5 Critical Pressure Points of Scaling Teams
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-6 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] space-y-3">
            <span className="text-xs font-label-btn text-[#D4AF37]">01. Capability Gap</span>
            <h4 className="text-xl font-normal text-[#141651] font-heading">HR Lagging Growth</h4>
            <p className="text-xs leading-relaxed text-[#5E6088] font-light">
              Your people team executes transactional payroll and contracts, but lacks executive org design judgment when tough trade-offs emerge.
            </p>
          </div>

          <div className="p-6 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] space-y-3">
            <span className="text-xs font-label-btn text-[#D4AF37]">02. Role Ambiguity</span>
            <h4 className="text-xl font-normal text-[#141651] font-heading">Founder Decision Drag</h4>
            <p className="text-xs leading-relaxed text-[#5E6088] font-light">
              Unclear decision boundaries force everyday escalations back onto the founders' desks, stealing critical hours from product and revenue.
            </p>
          </div>

          <div className="p-6 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] space-y-3">
            <span className="text-xs font-label-btn text-[#D4AF37]">03. Performance Disparity</span>
            <h4 className="text-xl font-normal text-[#141651] font-heading">Payroll vs. Output Friction</h4>
            <p className="text-xs leading-relaxed text-[#5E6088] font-light">
              Headcount has increased, yet delivery consistency remains uneven. High performers shoulder the burden while underperformance is tolerated.
            </p>
          </div>

          <div className="p-6 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] space-y-3">
            <span className="text-xs font-label-btn text-[#D4AF37]">04. AI Workforce Transformation</span>
            <h4 className="text-xl font-normal text-[#141651] font-heading">Unclear Role Evolution</h4>
            <p className="text-xs leading-relaxed text-[#5E6088] font-light">
              Generative AI is shifting daily workflows, but leadership lacks a blueprint for which roles to redesign, augment, or phase out.
            </p>
          </div>

          <div className="p-6 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] space-y-3 md:col-span-2 lg:col-span-2">
            <span className="text-xs font-label-btn text-[#D4AF37]">05. Senior Leadership Dilemma</span>
            <h4 className="text-xl font-normal text-[#141651] font-heading">Senior Judgment Without Enterprise Overhead</h4>
            <p className="text-xs leading-relaxed text-[#5E6088] font-light">
              You need board-level talent strategy and objective coaching for your managers, but cannot justify a full-time $350,000 executive overhead.
            </p>
          </div>
        </div>
      </div>

      {/* CEO Testimonials & Executive Proof */}
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[rgba(212,175,55,0.30)] pb-4">
          <div>
            <span className="text-xs font-label-btn text-[#D4AF37]">
              Executive Feedback
            </span>
            <h3 className="text-2xl sm:text-3xl font-normal text-[#141651] font-heading">
              Clarity From Peer CEOs & Founders
            </h3>
          </div>
          <p className="text-xs text-[#5E6088] font-body">
            Anonymous insights from leadership teams scaling through 20–250 headcount
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quote 1 */}
          <div className="p-6 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] flex flex-col justify-between space-y-4">
            <p className="text-sm text-[#141651] leading-relaxed font-heading font-normal italic">
              "We were convinced we had a recruitment problem. This diagnostic made us realize our real bottleneck was muddy decision rights. The DACI matrix alone saved me 12 hours of weekly firefighting."
            </p>
            <div className="pt-4 border-t border-[rgba(212,175,55,0.20)] space-y-1">
              <p className="text-xs font-label-btn text-[#141651]">Founder & CEO</p>
              <div className="flex items-center gap-2 text-2xs text-[#5E6088]">
                <span>B2B Enterprise SaaS</span>
                <span aria-hidden="true">·</span>
                <span>80 headcount</span>
                <span aria-hidden="true">·</span>
                <span>Series B</span>
              </div>
            </div>
          </div>

          {/* Quote 2 */}
          <div className="p-6 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] flex flex-col justify-between space-y-4">
            <p className="text-sm text-[#141651] leading-relaxed font-heading font-normal italic">
              "Our board was urging us to hire a $350k full-time CHRO. Taking this gave us the conviction that we were 18 months too early for that. A fractional model solved our middle-manager calibration at a fraction of the payroll cost."
            </p>
            <div className="pt-4 border-t border-[rgba(212,175,55,0.20)] space-y-1">
              <p className="text-xs font-label-btn text-[#141651]">Co-Founder & CEO</p>
              <div className="flex items-center gap-2 text-2xs text-[#5E6088]">
                <span>HealthTech Platform</span>
                <span aria-hidden="true">·</span>
                <span>45 headcount</span>
                <span aria-hidden="true">·</span>
                <span>Series A</span>
              </div>
            </div>
          </div>

          {/* Quote 3 */}
          <div className="p-6 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] flex flex-col justify-between space-y-4">
            <p className="text-sm text-[#141651] leading-relaxed font-heading font-normal italic">
              "We had spent 6 months worrying about how AI would impact our operational delivery without taking action. The role redesign breakdown in this assessment gave us a concrete plan for our engineering and client ops teams within one afternoon."
            </p>
            <div className="pt-4 border-t border-[rgba(212,175,55,0.20)] space-y-1">
              <p className="text-xs font-label-btn text-[#141651]">Chief Executive Officer</p>
              <div className="flex items-center gap-2 text-2xs text-[#5E6088]">
                <span>Tech-Enabled Logistics</span>
                <span aria-hidden="true">·</span>
                <span>135 headcount</span>
                <span aria-hidden="true">·</span>
                <span>Profitable Scale</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Radical Trust Guarantee Section - Dark Navy Section */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="p-6 sm:p-10 bg-[#141651] border border-[#E0C46A]/40 rounded-none space-y-6 text-[#FFFEFA]">
          <div className="flex items-center gap-3">
            <div className="p-2 border border-[#D4AF37] text-[#D4AF37]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-normal text-[#FFFEFA] font-heading">
                Our High-Trust Conversion Philosophy
              </h4>
              <p className="text-xs font-label-btn text-[#D4AF37]">
                Radical transparency before you ever decide to talk to us.
              </p>
            </div>
          </div>
          <p className="text-sm sm:text-base text-[#DCDBE1] font-light leading-relaxed">
            "You may not need professional help yet. This tool is designed to help you objectively understand your workforce stage before deciding what to do next. If your diagnostic shows your current setup is scaling smoothly, that is a great outcome too. If it uncovers structural drag, you receive an immediate DIY action plan you can implement this week with zero external costs."
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[rgba(212,175,55,0.30)] pt-6">
            <div className="flex items-center gap-3">
              <img
                src={advisorImg}
                alt="Trina Teo - Fractional CHRO & Strategic HR Leadership"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-none object-cover border border-[#D4AF37]"
              />
              <div className="text-xs space-y-0.5">
                <p className="font-heading font-normal text-[#FFFEFA] text-base">
                  Trina Teo — Fractional CHRO
                </p>
                <p className="text-[#DCDBE1] font-light">
                  Ascend Marché Strategic HR Leadership · Singapore & Global
                </p>
              </div>
            </div>
            {/* Main button first */}
            <div className="flex items-center gap-3">
              <button
                onClick={onStart}
                className="px-6 py-3 text-xs btn-main cursor-pointer"
              >
                Launch Diagnostic
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <FAQ />
    </div>
  );
};
