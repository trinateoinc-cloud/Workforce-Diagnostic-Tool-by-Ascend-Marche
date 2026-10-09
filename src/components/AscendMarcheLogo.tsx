import React from 'react';
import ascendLogoImg from '../assets/ascend_logo.png';

interface AscendMarcheLogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'lockup';
  color?: 'gold' | 'ivory' | 'navy';
  subtitle?: string;
  subtitleColor?: string;
  showSubtitle?: boolean;
}

export const AscendMarcheLogo: React.FC<AscendMarcheLogoProps> = ({
  className = '',
  variant = 'lockup',
  color = 'gold',
  subtitle = 'Strategic HR Leadership',
  subtitleColor,
  showSubtitle = true
}) => {
  // Off-white for dark navigation bar (#FFFEFA) or muted navy for light backgrounds (#5E6088)
  const resolvedSubtitleColor =
    subtitleColor || (color === 'navy' ? '#5E6088' : '#FFFEFA');

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 shrink-0 ${className}`}>
      {/* Official Ascend Marché Brand Logo */}
      <img
        src={ascendLogoImg}
        alt="Ascend Marché — Accelerating Transformation"
        className="w-auto h-9 sm:h-11 max-w-[100px] sm:max-w-[125px] object-contain shrink-0 select-none"
        width={129}
        height={88}
        loading="eager"
      />

      {/* Navigation Subtitle Lockup: single line, whitespace-nowrap, off-white, no spill */}
      {variant !== 'mark' && showSubtitle && subtitle && (
        <div className="hidden sm:flex items-center border-l border-[rgba(212,175,55,0.35)] pl-3 shrink-0 text-left">
          <span
            className="text-xs sm:text-sm font-label-btn tracking-wider uppercase font-medium leading-none select-none whitespace-nowrap"
            style={{ color: resolvedSubtitleColor }}
          >
            {subtitle}
          </span>
        </div>
      )}
    </div>
  );
};

