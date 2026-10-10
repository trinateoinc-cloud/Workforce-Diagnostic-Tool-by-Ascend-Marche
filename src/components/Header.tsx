import React, { useState } from 'react';
import { ShieldCheck, BookOpen, Menu, X, ArrowUpRight, Calendar } from 'lucide-react';
import { AscendMarcheLogo } from './AscendMarcheLogo';

interface HeaderProps {
  onStartDiagnostic: () => void;
  onOpenBlueprint: () => void;
  onOpenManifesto: () => void;
  onOpenBooking: () => void;
  hasStarted: boolean;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onStartDiagnostic,
  onOpenBlueprint,
  onOpenManifesto,
  onOpenBooking,
  hasStarted,
  onReset
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#141651] border-b border-[rgba(212,175,55,0.30)] print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Element & Off-White Subtitle */}
        <button
          onClick={onReset}
          className="text-left group flex items-center focus:outline-none cursor-pointer shrink-0"
          aria-label="Ascend Marché Strategic HR Leadership - Return to home"
        >
          <AscendMarcheLogo
            variant="lockup"
            color="gold"
            subtitle="Strategic HR Leadership"
            subtitleColor="#FFFEFA"
          />
        </button>

        {/* Zone 2: Navigation Links (Clean, No-Spill, whitespace-nowrap) */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 text-xs font-label-btn text-[#DCDBE1] whitespace-nowrap">
          <button
            onClick={hasStarted ? onReset : onStartDiagnostic}
            className="hover:text-[#D4AF37] transition-colors whitespace-nowrap cursor-pointer"
          >
            Talent R.A.D.A.R.™
          </button>
          <button
            onClick={onOpenManifesto}
            className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>Trust & Transparency</span>
          </button>
          <button
            onClick={onOpenBlueprint}
            className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>Methodology</span>
          </button>
          <a
            href="https://go.oncehub.com/TalentRadarDiagnostic"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>Book Your Talent R.A.D.A.R. Diagnostic Conversation</span>
          </a>
          <a
            href="https://www.ascendmarche.com/#radar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer"
          >
            <span>ascendmarche.com</span>
            <ArrowUpRight className="w-3 h-3 text-[#D4AF37] shrink-0" />
          </a>
        </nav>

        {/* Zone 3: Primary Action & Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onStartDiagnostic}
            className="px-4 py-2.5 sm:px-5 sm:py-2.5 text-xs font-label-btn btn-main whitespace-nowrap shrink-0 cursor-pointer"
          >
            {hasStarted ? 'Restart Diagnostic' : 'Start Diagnostic'}
          </button>

          {/* Mobile/Tablet Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#DCDBE1] hover:text-[#D4AF37] border border-[rgba(212,175,55,0.30)] transition-colors cursor-pointer shrink-0"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#141651] border-t border-[rgba(212,175,55,0.30)] px-4 sm:px-6 py-4 shadow-xl">
          <div className="flex flex-col space-y-2 text-xs font-label-btn text-[#DCDBE1]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                hasStarted ? onReset() : onStartDiagnostic();
              }}
              className="text-left py-2 hover:text-[#D4AF37] transition-colors cursor-pointer border-b border-[rgba(212,175,55,0.15)]"
            >
              Talent R.A.D.A.R.™ Tool
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenManifesto();
              }}
              className="text-left py-2 hover:text-[#D4AF37] transition-colors flex items-center gap-2 cursor-pointer border-b border-[rgba(212,175,55,0.15)]"
            >
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              Trust & Transparency
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBlueprint();
              }}
              className="text-left py-2 hover:text-[#D4AF37] transition-colors flex items-center gap-2 cursor-pointer border-b border-[rgba(212,175,55,0.15)]"
            >
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              Methodology & Scoring Logic
            </button>
            <a
              href="https://go.oncehub.com/TalentRadarDiagnostic"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2 hover:text-[#D4AF37] transition-colors flex items-center gap-2 cursor-pointer border-b border-[rgba(212,175,55,0.15)]"
            >
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Book Your Talent R.A.D.A.R. Diagnostic Conversation</span>
            </a>
            <a
              href="https://www.ascendmarche.com/#radar"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#D4AF37] transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>Visit ascendmarche.com</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

