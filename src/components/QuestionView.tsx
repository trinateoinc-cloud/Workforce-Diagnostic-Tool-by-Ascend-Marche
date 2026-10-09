import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Info, Sparkles } from 'lucide-react';
import { Question } from '../types/diagnostic';

interface QuestionViewProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionId,
  onSelectOption,
  onNext,
  onPrev
}) => {
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const remainingQuestions = totalQuestions - (currentIndex + 1);
  const estimatedMinutesLeft = Math.max(1, Math.ceil(remainingQuestions * 0.5));
  const selectedOption = question.options.find((opt) => opt.id === selectedOptionId);

  // Keyboard navigation support (keys 1-4, Enter to proceed)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (question.options[idx]) {
          onSelectOption(question.options[idx].id);
        }
      } else if (e.key === 'Enter' && selectedOptionId) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question, selectedOptionId, onSelectOption, onNext]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Top Header & Visual Progress Bar Section */}
      <div className="space-y-4 bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] p-4 sm:p-5 rounded-none shadow-xs">
        {/* Category & Status Metric Line */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-label-btn">
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37] tracking-wider uppercase font-medium">
              {question.categoryLabel}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-[#5E6088]">
            <span className="text-[#141651] font-medium">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span aria-hidden="true" className="text-[#D4AF37]/50">·</span>
            <span className="text-[#D4AF37] font-medium">
              {remainingQuestions === 0
                ? 'Final Question'
                : `${remainingQuestions} remaining (~${estimatedMinutesLeft} min)`}
            </span>
            <span aria-hidden="true" className="text-[#D4AF37]/50">·</span>
            <span className="text-[#141651]">
              {progressPercent}% Complete
            </span>
          </div>
        </div>

        {/* 8-Segment Visual Step Indicator */}
        <div className="space-y-1.5">
          <div className="grid grid-cols-8 gap-1.5 sm:gap-2">
            {Array.from({ length: totalQuestions }).map((_, idx) => {
              const isCompleted = idx < currentIndex;
              const isCurrent = idx === currentIndex;

              return (
                <div key={idx} className="flex flex-col space-y-1">
                  {/* Segment Bar Block */}
                  <div
                    className={`h-2.5 sm:h-3 rounded-none transition-all duration-300 relative border ${
                      isCompleted
                        ? 'bg-[#D4AF37] border-[#D4AF37]'
                        : isCurrent
                        ? 'bg-[#141651] border-[#D4AF37] ring-1 ring-[#D4AF37]'
                        : 'bg-[rgba(212,175,55,0.10)] border-[rgba(212,175,55,0.25)]'
                    }`}
                    title={`Question ${idx + 1} of ${totalQuestions}`}
                  >
                    {isCurrent && (
                      <div className="absolute inset-0 bg-[#D4AF37]/25 animate-pulse" />
                    )}
                  </div>

                  {/* Step Number Pip */}
                  <div className="text-center">
                    <span
                      className={`text-3xs font-label-btn block leading-none ${
                        isCompleted
                          ? 'text-[#D4AF37] font-medium'
                          : isCurrent
                          ? 'text-[#141651] font-bold'
                          : 'text-[#5E6088]/60'
                      }`}
                    >
                      {idx + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Continuous Micro Progress Track */}
          <div className="w-full bg-[rgba(212,175,55,0.15)] h-1 rounded-none overflow-hidden">
            <div
              className="bg-[#D4AF37] h-full rounded-none transition-all duration-400 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Block */}
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#141651] font-heading leading-snug">
          {question.questionText}
        </h2>
        <div className="flex items-start gap-3 text-xs sm:text-sm text-[#5E6088] bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] rounded-none p-4">
          <Info className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="leading-relaxed font-light">
            <strong className="text-[#141651] font-medium font-label-btn mr-1.5">Executive Context:</strong>
            {question.contextNote}
          </p>
        </div>
      </div>

      {/* Answer Options (Radio cards) */}
      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onSelectOption(option.id)}
              className={`w-full text-left p-4 sm:p-5 rounded-none border transition-all relative group flex items-start gap-4 cursor-pointer ${
                isSelected
                  ? 'bg-[#141651] text-[#FFFEFA] border-[#D4AF37]'
                  : 'bg-[#FFFEFA] text-[#141651] border-[rgba(212,175,55,0.30)] hover:border-[#D4AF37]'
              }`}
            >
              {/* Option Number / Badge */}
              <div
                className={`w-7 h-7 rounded-none text-xs font-label-btn flex items-center justify-center shrink-0 transition-colors mt-0.5 border ${
                  isSelected
                    ? 'bg-[#D4AF37] text-[#141651] border-[#D4AF37]'
                    : 'bg-transparent text-[#5E6088] border-[rgba(212,175,55,0.30)] group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]'
                }`}
              >
                {idx + 1}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3
                    className={`text-base sm:text-lg font-normal font-heading ${
                      isSelected ? 'text-[#FFFEFA]' : 'text-[#141651]'
                    }`}
                  >
                    {option.label}
                  </h3>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  )}
                </div>
                <p
                  className={`text-xs sm:text-sm leading-relaxed font-light ${
                    isSelected ? 'text-[#DCDBE1]' : 'text-[#5E6088]'
                  }`}
                >
                  {option.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Micro-Insight Callout - Dark Navy card with gold border */}
      {selectedOption && (
        <div className="p-5 bg-[#141651] border border-[#E0C46A]/40 rounded-none space-y-1.5 text-[#FFFEFA] animate-fadeIn">
          <div className="flex items-center gap-1.5 text-xs font-label-btn text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Diagnostic Insight</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-[#DCDBE1] font-light">
            {selectedOption.microInsight}
          </p>
        </div>
      )}

      {/* Navigation Buttons - The main button always comes first */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-[rgba(212,175,55,0.30)]">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`px-5 py-3 text-xs btn-secondary-light cursor-pointer flex items-center justify-center gap-2 ${
            currentIndex === 0
              ? 'opacity-30 pointer-events-none'
              : ''
          }`}
        >
          <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
          <span>Previous</span>
        </button>

        <div className="flex items-center justify-end gap-3">
          <span className="hidden sm:inline text-xs text-[#5E6088] font-label-btn">
            [1-4] or [Enter]
          </span>
          <button
            onClick={onNext}
            disabled={!selectedOptionId}
            className={`px-7 py-3 text-xs btn-main cursor-pointer flex items-center justify-center gap-2 ${
              !selectedOptionId
                ? 'opacity-40 pointer-events-none'
                : ''
            }`}
          >
            <span>{currentIndex === totalQuestions - 1 ? 'Analyze Results' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
