import React, { useState, useRef } from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, FileText, Upload, Crop, X } from 'lucide-react';
import heroImg from '../assets/images/hero_executive_advisory_1791268696498.jpg';
import trinaFounderFallback from '../assets/images/trina-teo-founder.jpg';
import { FAQ } from './FAQ';
import { TalentRadarOrbit } from './TalentRadarOrbit';
import { ImageCropperModal } from './ImageCropperModal';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoSrc, setPhotoSrc] = useState<string>(() => {
    return localStorage.getItem('trina_founder_photo') || '/images/trina-teo-founder.jpg';
  });
  const [imgError, setImgError] = useState(false);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [isPhotoMenuOpen, setIsPhotoMenuOpen] = useState(false);
  const [rawImageForCrop, setRawImageForCrop] = useState<string>('');

  // Enable photo adjustment menu on the owner's device or if admin param is set
  const [isAdmin] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true' || urlParams.get('edit') === 'true') {
      localStorage.setItem('ascend_admin_mode', 'true');
      return true;
    }
    return localStorage.getItem('ascend_admin_mode') === 'true' || !!localStorage.getItem('trina_founder_photo');
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setRawImageForCrop(dataUrl);
      setIsCropperOpen(true);
    };
    reader.readAsDataURL(file);
    // Reset file input value so re-selecting same file works
    e.target.value = '';
  };

  const handleCropComplete = async (croppedDataUrl: string) => {
    localStorage.setItem('trina_founder_photo', croppedDataUrl);
    setPhotoSrc(croppedDataUrl);
    setImgError(false);
    setIsCropperOpen(false);

    try {
      await fetch('/api/upload-founder-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl: croppedDataUrl })
      });
    } catch (err) {
      console.warn('Backend save notice', err);
    }
  };

  const handleOpenCropperForExisting = () => {
    setRawImageForCrop(photoSrc);
    setIsCropperOpen(true);
  };

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
        <div className="relative rounded-none overflow-hidden border border-[rgba(212,175,55,0.30)] bg-[#141651] min-h-[260px] sm:min-h-[300px] p-6 sm:p-10 flex flex-col justify-end">
          <img
            src={heroImg}
            alt="Executive Boardroom and Workforce Advisory"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity filter brightness-90 contrast-105 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141651] via-[#141651]/80 to-[#141651]/40 pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-3 text-[#FFFEFA]">
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

      {/* Radical Trust Guarantee Section */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-[#0C1645] border border-[rgba(212,175,55,0.40)] rounded-none overflow-hidden text-[#FFFEFA] shadow-xl">
          <div className="flex flex-col md:flex-row items-stretch">
            {/* Executive Authentic Portrait */}
            <div className="w-full md:w-72 lg:w-80 flex-shrink-0 bg-[#080E2F] flex flex-col items-center justify-center p-6 sm:p-8 border-b md:border-b-0 md:border-r border-[rgba(212,175,55,0.25)]">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              {!imgError ? (
                <div
                  className={`relative border border-[#D4AF37]/60 shadow-xl overflow-hidden bg-[#080E2F] ${
                    isAdmin ? 'cursor-pointer group' : ''
                  }`}
                  onClick={() => {
                    if (isAdmin) setIsPhotoMenuOpen(true);
                  }}
                  title={isAdmin ? 'Tap to adjust or update photo' : undefined}
                >
                  <img
                    src={photoSrc}
                    alt="Trina Teo — Fractional CHRO"
                    onError={() => {
                      if (photoSrc !== trinaFounderFallback) {
                        setPhotoSrc(trinaFounderFallback);
                      } else {
                        setImgError(true);
                      }
                    }}
                    className="w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 object-cover object-center"
                  />
                  {isAdmin && (
                    <div className="absolute inset-0 bg-[#080E2F]/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-xs text-[#D4AF37] p-2 text-center pointer-events-none">
                      <Crop className="w-5 h-5 mb-1 text-[#D4AF37]" />
                      <span className="font-label-btn text-2xs">Tap to Adjust / Crop</span>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  onClick={() => {
                    if (isAdmin) fileInputRef.current?.click();
                  }}
                  className={`w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 flex flex-col items-center justify-center border border-[#D4AF37]/60 shadow-xl bg-[#080E2F] text-center p-4 space-y-1.5 ${
                    isAdmin ? 'cursor-pointer hover:border-[#D4AF37]' : ''
                  }`}
                >
                  <div className="w-10 h-10 rounded-none border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-heading text-lg">
                    TT
                  </div>
                  <span className="font-heading text-sm text-[#FFFEFA]">Trina Teo</span>
                  <span className="text-3xs uppercase tracking-wider text-[#D4AF37] font-label-btn">
                    Fractional CHRO
                  </span>
                </div>
              )}
            </div>

            {/* Right: Quote and Identity Block */}
            <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              {/* Quote Block */}
              <div className="space-y-3">
                <span className="font-heading text-3xl sm:text-4xl text-[#D4AF37] leading-none block select-none">
                  “
                </span>
                <p className="text-sm sm:text-base text-[#DCDBE1] font-light leading-relaxed font-body">
                  Your diagnostic shows your current setup is scaling smoothly, that is a great outcome too. If it uncovers structural drag, you receive an immediate DIY action plan you can implement this week with zero external costs.
                </p>
              </div>

              {/* Horizontal Divider */}
              <div className="w-full h-px bg-[rgba(212,175,55,0.25)]" />

              {/* Identity & Action Block */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                <div className="space-y-2">
                  {/* Gold accent bar */}
                  <div className="w-8 h-0.5 bg-[#D4AF37]" />

                  {/* Name and Fractional CHRO */}
                  <h4 className="text-xl sm:text-2xl font-normal text-[#FFFEFA] font-heading tracking-tight leading-snug">
                    Trina Teo — <span className="text-[#FFFEFA]">Fractional CHRO</span>
                  </h4>

                  {/* Aligned: Ascend Marché | Strategic HR Leadership and Singapore & Global */}
                  <div className="text-xs sm:text-sm text-[#DCDBE1] font-light space-y-0.5">
                    <p className="font-medium text-[#FFFEFA]">Ascend Marché | Strategic HR Leadership</p>
                    <p className="text-[#D4AF37] font-label-btn tracking-wider uppercase text-2xs">
                      Singapore & Global
                    </p>
                  </div>
                </div>

                {/* Primary Button */}
                <div className="flex-shrink-0">
                  <button
                    onClick={onStart}
                    className="w-full sm:w-auto px-7 py-3 text-xs btn-main cursor-pointer inline-flex items-center justify-center gap-2 font-medium group"
                  >
                    <span>LAUNCH DIAGNOSTIC</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <FAQ />

      {/* Image Cropper & Framing Modal */}
      <ImageCropperModal
        isOpen={isCropperOpen}
        imageSrc={rawImageForCrop}
        onClose={() => setIsCropperOpen(false)}
        onCropComplete={handleCropComplete}
      />

      {/* Founder Portrait Management Modal (Owner Only) */}
      {isPhotoMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080E2F]/85 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-sm bg-[#0C1645] border border-[rgba(212,175,55,0.40)] p-6 text-[#FFFEFA] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[rgba(212,175,55,0.25)] pb-3">
              <h4 className="font-heading text-base text-[#FFFEFA]">Founder Portrait Options</h4>
              <button
                type="button"
                onClick={() => setIsPhotoMenuOpen(false)}
                className="text-[#DCDBE1] hover:text-[#FFFEFA] p-1 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-[#DCDBE1] font-light">
              Adjust your portrait framing or upload a different executive photograph.
            </p>
            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsPhotoMenuOpen(false);
                  handleOpenCropperForExisting();
                }}
                className="w-full py-2.5 px-4 text-xs font-label-btn btn-secondary-dark flex items-center justify-center gap-2 cursor-pointer"
              >
                <Crop className="w-4 h-4 text-[#D4AF37]" />
                <span>Adjust / Re-Crop Framing</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsPhotoMenuOpen(false);
                  fileInputRef.current?.click();
                }}
                className="w-full py-2.5 px-4 text-xs font-label-btn btn-main flex items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Upload New Photograph</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
