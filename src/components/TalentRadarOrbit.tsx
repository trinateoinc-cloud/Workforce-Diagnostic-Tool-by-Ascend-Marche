import React, { useState } from 'react';
import { ArrowRight, Code, Copy, Check } from 'lucide-react';

interface TalentRadarOrbitProps {
  onStartDiagnostic?: () => void;
  interactive?: boolean;
}

export const RADAR_DIMENSIONS = [
  {
    letter: 'R',
    title: 'Redesign Work',
    subtitle: 'Jobs, workflows, accountability and Human + AI collaboration.',
    tag: 'Workflow Architecture',
    cx: 220,
    cy: 65,
    angle: '-90deg'
  },
  {
    letter: 'A',
    title: 'Acquire Capability',
    subtitle: 'Talent, skills, redeployment, partners and technology required to close capability gaps.',
    tag: 'Strategic Talent',
    cx: 367.4,
    cy: 172.1,
    angle: '-18deg'
  },
  {
    letter: 'D',
    title: 'Develop People',
    subtitle: 'Leadership, future skills, career pathways and change capability.',
    tag: 'Leadership Bench',
    cx: 311.1,
    cy: 345.4,
    angle: '54deg'
  },
  {
    letter: 'A',
    title: 'Accelerate Execution',
    subtitle: 'Ownership, milestones, governance and adoption.',
    tag: 'Decision Velocity',
    cx: 128.9,
    cy: 345.4,
    angle: '126deg'
  },
  {
    letter: 'R',
    title: 'Realise Results',
    subtitle: 'Measure and sustain workforce, productivity and business outcomes.',
    tag: 'Enterprise Value',
    cx: 72.6,
    cy: 172.1,
    angle: '198deg'
  }
];

export const TalentRadarOrbit: React.FC<TalentRadarOrbitProps> = ({
  onStartDiagnostic,
  interactive = true
}) => {
  const [selectedDimension, setSelectedDimension] = useState<number>(0);
  const [showEmbedSnippet, setShowEmbedSnippet] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  const activeDim = RADAR_DIMENSIONS[selectedDimension];

  const embedCode = `<iframe 
  src="${typeof window !== 'undefined' ? window.location.origin : 'https://ascendmarche-radar.run.app'}" 
  width="100%" 
  height="900" 
  style="border:none; max-width:1100px; margin:0 auto; display:block;" 
  title="Talent R.A.D.A.R.™ Diagnostic - Ascend Marché">
</iframe>`;

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2200);
  };

  return (
    <div className="w-full bg-[#141651] text-[#FFFEFA] border border-[#E0C46A]/40 rounded-none p-6 sm:p-10 space-y-8">
      {/* Top Header */}
      <div className="max-w-3xl mx-auto text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs font-label-btn text-[#D4AF37]">
          <span>Ascend Marché Methodology</span>
          <span aria-hidden="true" className="text-[#D4AF37]/50">·</span>
          <span>The 5 Core Dimensions</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-normal font-heading text-[#FFFEFA]">
          Talent R.A.D.A.R.™ Framework
        </h2>
        <p className="text-xs sm:text-sm text-[#DCDBE1] font-light leading-relaxed max-w-2xl mx-auto">
          Talent R.A.D.A.R.™ is not merely an HR assessment tool. It is how Ascend Marché connects business priorities to the work, capability and people decisions that drive growth.
        </p>
      </div>

      {/* Restructured: Smaller Radar Centered Above */}
      <div className="flex flex-col items-center justify-center py-2">
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 select-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 440 440"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Talent R.A.D.A.R. framework diagram"
          >
            <defs>
              <radialGradient id="radarCenterGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#141651" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Concentric Gold Rings */}
            <g fill="none" stroke="#D4AF37">
              <circle cx="220" cy="220" r="200" strokeOpacity="0.2" strokeWidth="1" />
              <circle cx="220" cy="220" r="155" strokeOpacity="0.32" strokeWidth="1" />
              <circle cx="220" cy="220" r="108" strokeOpacity="0.45" strokeWidth="1" />
              <circle cx="220" cy="220" r="60" strokeOpacity="0.65" strokeWidth="1.2" />
              {/* Radial Crosshairs */}
              <line x1="220" y1="20" x2="220" y2="420" strokeOpacity="0.15" strokeWidth="1" />
              <line x1="20" y1="220" x2="420" y2="220" strokeOpacity="0.15" strokeWidth="1" />
              <line x1="78" y1="78" x2="362" y2="362" strokeOpacity="0.08" strokeWidth="1" />
              <line x1="78" y1="362" x2="362" y2="78" strokeOpacity="0.08" strokeWidth="1" />
            </g>

            {/* Radar Sweeping Beam (CSS Animated) */}
            <g className="animate-spin" style={{ transformOrigin: '220px 220px', animationDuration: '14s' }}>
              <path
                d="M220 220 L220 25 A195 195 0 0 1 317.5 51.1 Z"
                fill="#D4AF37"
                fillOpacity="0.12"
              />
              <line
                x1="220"
                y1="220"
                x2="220"
                y2="25"
                stroke="#D4AF37"
                strokeOpacity="0.6"
                strokeWidth="1.6"
              />
            </g>

            {/* Central Glowing Disk */}
            <circle cx="220" cy="220" r="58" fill="url(#radarCenterGlow)" />
            <circle cx="220" cy="220" r="48" fill="#141651" stroke="#D4AF37" strokeWidth="1.2" />

            {/* Radar Nodes (R - A - D - A - R) */}
            {RADAR_DIMENSIONS.map((dim, idx) => {
              const isSelected = selectedDimension === idx;
              return (
                <g
                  key={idx}
                  transform={`translate(${dim.cx}, ${dim.cy})`}
                  onClick={() => setSelectedDimension(idx)}
                  className="cursor-pointer group"
                >
                  {/* Pulsing ring on active */}
                  {isSelected && (
                    <circle
                      r="34"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                      strokeOpacity="0.8"
                      className="animate-spin"
                      style={{ transformOrigin: '0 0', animationDuration: '8s' }}
                    />
                  )}

                  <circle
                    r="27"
                    fill={isSelected ? '#D4AF37' : '#141651'}
                    stroke="#D4AF37"
                    strokeWidth={isSelected ? '2.4' : '1.6'}
                    className="transition-all duration-200 group-hover:stroke-width-2"
                  />
                  <text
                    y="9"
                    textAnchor="middle"
                    fontFamily="Sorts Mill Goudy, Georgia, serif"
                    fontWeight="400"
                    fontSize="26"
                    fill={isSelected ? '#141651' : '#FFFEFA'}
                    className="select-none"
                  >
                    {dim.letter}
                  </text>
                </g>
              );
            })}

            {/* Central Emblem Text */}
            <g
              fontFamily="Sorts Mill Goudy, Georgia, serif"
              textAnchor="middle"
              fill="#FFFEFA"
              fontWeight="400"
              className="select-none pointer-events-none"
            >
              <text x="220" y="215" fontSize="21" letterSpacing="2">
                TALENT
              </text>
              <text x="220" y="238" fontSize="15" letterSpacing="3" fill="#D4AF37">
                R.A.D.A.R.™
              </text>
            </g>
          </svg>
        </div>
        <span className="text-3xs font-label-btn text-[#DCDBE1]/70 mt-2">
          Select any dimension below or node above to inspect details
        </span>
      </div>

      {/* 5 Dimensions Aligned Across The Page (Full Words Visible, No Squeezing) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-[rgba(212,175,55,0.30)] pb-2">
          <p className="text-xs font-label-btn text-[#D4AF37]">
            Then, Five Dimensions
          </p>
          <p className="text-2xs font-label-btn text-[#DCDBE1]">
            Redesign · Acquire · Develop · Accelerate · Realise
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {RADAR_DIMENSIONS.map((dim, idx) => {
            const isSelected = selectedDimension === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedDimension(idx)}
                className={`p-4 text-left border rounded-none transition-all cursor-pointer flex flex-col justify-between space-y-3.5 ${
                  isSelected
                    ? 'border-[#D4AF37] bg-[rgba(212,175,55,0.12)] ring-1 ring-[#D4AF37]'
                    : 'border-[rgba(212,175,55,0.30)] bg-[#141651] hover:border-[#D4AF37]/80 hover:bg-[rgba(212,175,55,0.05)]'
                }`}
              >
                {/* Top: Letter sits at the start of Dimension Title */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-7 h-7 flex items-center justify-center font-heading font-normal text-lg rounded-none border shrink-0 ${
                        isSelected
                          ? 'bg-[#D4AF37] text-[#141651] border-[#D4AF37]'
                          : 'bg-transparent text-[#D4AF37] border-[rgba(212,175,55,0.50)]'
                      }`}
                    >
                      {dim.letter}
                    </span>
                    <h3 className="text-base sm:text-lg font-normal font-heading text-[#FFFEFA] leading-snug">
                      {dim.title}
                    </h3>
                  </div>

                  {/* Dimension Description */}
                  <p className="text-xs text-[#DCDBE1] font-light leading-relaxed">
                    {dim.subtitle}
                  </p>
                </div>

                {/* Bottom: Workflow Architecture tag underneath */}
                <div className="pt-2 border-t border-[rgba(212,175,55,0.20)] flex items-center justify-between">
                  <span className="text-3xs font-label-btn text-[#D4AF37] tracking-wider uppercase">
                    {dim.tag}
                  </span>
                  <span className="text-3xs font-label-btn text-[#DCDBE1]/60">
                    0{idx + 1}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Strategic Chain from ascendmarche.com */}
      <div className="p-4 bg-[#141651] border border-[rgba(212,175,55,0.30)] rounded-none space-y-2">
        <span className="text-3xs font-label-btn text-[#D4AF37] block">
          Ascend Marché Transformation Chain
        </span>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-2xs sm:text-xs font-label-btn text-[#DCDBE1]">
          <span className="text-[#FFFEFA]">Business Priorities</span>
          <span className="text-[#D4AF37]">→</span>
          <span className="text-[#FFFEFA]">Diagnose & Align</span>
          <span className="text-[#D4AF37]">→</span>
          <span className="text-[#D4AF37] font-semibold">Talent R.A.D.A.R.™</span>
          <span className="text-[#D4AF37]">→</span>
          <span className="text-[#FFFEFA]">Transformation</span>
          <span className="text-[#D4AF37]">→</span>
          <span className="text-[#D4AF37] font-semibold">Results</span>
        </div>
      </div>

      {/* Call to Action Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-[rgba(212,175,55,0.20)]">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {onStartDiagnostic && (
            <button
              onClick={onStartDiagnostic}
              className="px-6 py-3 text-xs btn-main cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Launch R.A.D.A.R. Diagnostic</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setShowEmbedSnippet(!showEmbedSnippet)}
            className="px-5 py-3 text-xs btn-secondary-dark cursor-pointer flex items-center justify-center gap-2"
          >
            <Code className="w-4 h-4 text-[#D4AF37]" />
            <span>{showEmbedSnippet ? 'Hide Embed Code' : 'Embed on Website'}</span>
          </button>
        </div>

        <a
          href="https://www.ascendmarche.com/#radar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-label-btn text-[#DCDBE1] hover:text-[#D4AF37] transition-colors flex items-center justify-center gap-1.5"
        >
          <span>View on ascendmarche.com/#radar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Website Embed Snippet Drawer */}
      {showEmbedSnippet && (
        <div className="p-5 bg-[#141651] border border-[#E0C46A]/40 rounded-none space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-label-btn text-[#FFFEFA]">
                Embed Talent R.A.D.A.R.™ Into ascendmarche.com
              </h4>
              <p className="text-xs text-[#DCDBE1] font-light">
                Paste this responsive iframe directly into your CMS or HTML page at https://www.ascendmarche.com/#radar
              </p>
            </div>
            <button
              onClick={handleCopyEmbed}
              className="px-4 py-2 text-2xs font-label-btn btn-secondary-dark cursor-pointer flex items-center gap-1.5"
            >
              {copiedEmbed ? <Check className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />}
              <span>{copiedEmbed ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
          <pre className="p-3 bg-[#141651] border border-[rgba(212,175,55,0.30)] text-3xs font-mono text-[#DCDBE1] overflow-x-auto whitespace-pre-wrap rounded-none">
            {embedCode}
          </pre>
        </div>
      )}
    </div>
  );
};
