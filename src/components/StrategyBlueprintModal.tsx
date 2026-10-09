import React, { useState } from 'react';
import { X, BookOpen, CheckCircle2, Target } from 'lucide-react';
import { DIAGNOSTIC_QUESTIONS, ARCHETYPES, STRATEGY_BLUEPRINT, TRUST_MANIFESTO } from '../data/diagnosticData';

interface StrategyBlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StrategyBlueprintModal: React.FC<StrategyBlueprintModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'questions' | 'scoring' | 'archetypes' | 'trust'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141651]/80 backdrop-blur-xs">
      <div className="bg-[#FFFEFA] rounded-none max-w-4xl w-full h-[90vh] flex flex-col border border-[rgba(212,175,55,0.30)] relative animate-fadeIn overflow-hidden">
        {/* Top Header - Dark Navy header */}
        <div className="p-6 border-b border-[rgba(212,175,55,0.30)] flex items-center justify-between shrink-0 bg-[#141651] text-[#FFFEFA]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-2xs font-label-btn text-[#D4AF37]">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              <span>Conversion Strategy & Architecture Blueprint</span>
            </div>
            <h3 className="text-2xl font-normal font-heading text-[#FFFEFA]">
              Interactive Lead Magnet Framework
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#DCDBE1] hover:text-[#FFFEFA] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 border-b border-[rgba(212,175,55,0.30)] flex gap-6 overflow-x-auto shrink-0 bg-[#FFFEFA] text-xs font-label-btn text-[#5E6088]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#D4AF37] text-[#141651]'
                : 'border-transparent hover:text-[#141651]'
            }`}
          >
            1. Strategy & Positioning
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`py-4 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'questions'
                ? 'border-[#D4AF37] text-[#141651]'
                : 'border-transparent hover:text-[#141651]'
            }`}
          >
            2. Questions & Micro-Solutions (8)
          </button>
          <button
            onClick={() => setActiveTab('scoring')}
            className={`py-4 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'scoring'
                ? 'border-[#D4AF37] text-[#141651]'
                : 'border-transparent hover:text-[#141651]'
            }`}
          >
            3. Scoring & Decision Logic
          </button>
          <button
            onClick={() => setActiveTab('archetypes')}
            className={`py-4 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'archetypes'
                ? 'border-[#D4AF37] text-[#141651]'
                : 'border-transparent hover:text-[#141651]'
            }`}
          >
            4. The 4 Result Archetypes
          </button>
          <button
            onClick={() => setActiveTab('trust')}
            className={`py-4 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'trust'
                ? 'border-[#D4AF37] text-[#141651]'
                : 'border-transparent hover:text-[#141651]'
            }`}
          >
            5. Trust & CTAs
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 bg-[#FFFEFA]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] space-y-1.5">
                  <span className="text-2xs font-label-btn text-[#D4AF37] block">
                    Lead Magnet Title
                  </span>
                  <p className="text-xl font-normal font-heading text-[#141651]">{STRATEGY_BLUEPRINT.name}</p>
                  <p className="text-xs text-[#5E6088] italic font-light">"{STRATEGY_BLUEPRINT.tagline}"</p>
                </div>
                <div className="p-5 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] space-y-1.5">
                  <span className="text-2xs font-label-btn text-[#D4AF37] block">
                    Target Executive Audience
                  </span>
                  <p className="text-xs text-[#141651] font-light leading-relaxed">{STRATEGY_BLUEPRINT.audience}</p>
                </div>
              </div>

              {/* JTBD callout - Dark Navy */}
              <div className="p-6 bg-[#141651] text-[#FFFEFA] rounded-none border border-[#E0C46A]/40 space-y-2">
                <div className="flex items-center gap-2 text-2xs font-label-btn text-[#D4AF37]">
                  <Target className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>The Core JTBD (Job-to-Be-Done)</span>
                </div>
                <p className="text-sm sm:text-base font-normal font-heading leading-relaxed italic text-[#DCDBE1]">
                  "{STRATEGY_BLUEPRINT.jtbd}"
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-label-btn text-[#141651]">
                  The 5 Core Problems Being Diagnosed
                </h4>
                <div className="space-y-2.5">
                  {STRATEGY_BLUEPRINT.problemsSolved.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] rounded-none text-xs flex items-start gap-3.5"
                    >
                      <span className="w-6 h-6 rounded-none border border-[#D4AF37] text-[#D4AF37] font-label-btn flex items-center justify-center shrink-0">
                        0{idx + 1}
                      </span>
                      <p className="text-[#141651] font-light leading-relaxed">{p}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] rounded-none text-xs space-y-2">
                <strong className="text-[#D4AF37] block font-label-btn text-2xs">
                  Problem → Micro-Solution → Bait Logic
                </strong>
                <p className="leading-relaxed text-[#5E6088] font-light">
                  {STRATEGY_BLUEPRINT.conversionPsychology}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="space-y-6">
              <p className="text-xs text-[#5E6088] font-light">
                8 carefully designed questions uncover context, pain, urgency, and desired state without feeling like an interrogation.
              </p>

              <div className="space-y-5">
                {DIAGNOSTIC_QUESTIONS.map((q) => (
                  <div
                    key={q.id}
                    className="p-5 bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] rounded-none space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xs font-label-btn text-[#D4AF37]">
                        {q.categoryLabel}
                      </span>
                      <span className="text-2xs text-[#5E6088] font-label-btn">Question {q.id} of 8</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-normal font-heading text-[#141651]">{q.questionText}</h4>
                    <p className="text-2xs text-[#5E6088] italic bg-[#FFFEFA] p-3 rounded-none border border-[rgba(212,175,55,0.20)] font-light">
                      Context Note: {q.contextNote}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {q.options.map((opt) => (
                        <div
                          key={opt.id}
                          className="p-3.5 bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] rounded-none text-xs space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <strong className="text-[#141651] text-xs font-heading font-normal">
                              {opt.label}
                            </strong>
                            <span className="text-3xs font-label-btn text-[#D4AF37]">
                              {opt.keyRiskTag}
                            </span>
                          </div>
                          <p className="text-2xs text-[#5E6088] font-light">{opt.description}</p>
                          <p className="text-3xs text-[#141651] pt-1.5 border-t border-[rgba(212,175,55,0.15)] font-light">
                            Micro-Insight: {opt.microInsight}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'scoring' && (
            <div className="space-y-6">
              <div className="p-5 bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] rounded-none space-y-2 text-xs text-[#141651]">
                <h4 className="font-heading font-normal text-xl text-[#141651]">Transparent Multi-Pillar Scoring Engine</h4>
                <p className="text-[#5E6088] font-light">
                  Every answer option assigns points across 4 distinct organizational pillars (0–25 points per question). Total scores are normalized to 0–100%:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] text-center">
                    <span className="text-2xs text-[#5E6088] font-label-btn block">Pillar 1</span>
                    <strong className="text-[#141651] font-heading font-normal text-sm">HR Architecture</strong>
                  </div>
                  <div className="p-2 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] text-center">
                    <span className="text-2xs text-[#5E6088] font-label-btn block">Pillar 2</span>
                    <strong className="text-[#141651] font-heading font-normal text-sm">Org Clarity & Speed</strong>
                  </div>
                  <div className="p-2 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] text-center">
                    <span className="text-2xs text-[#5E6088] font-label-btn block">Pillar 3</span>
                    <strong className="text-[#141651] font-heading font-normal text-sm">AI & Tech Transition</strong>
                  </div>
                  <div className="p-2 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] text-center">
                    <span className="text-2xs text-[#5E6088] font-label-btn block">Pillar 4</span>
                    <strong className="text-[#141651] font-heading font-normal text-sm">Executive Bandwidth</strong>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-label-btn text-[#141651]">
                  Branching & Archetype Mapping Rules
                </h4>
                <div className="p-5 bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] rounded-none space-y-3 text-xs text-[#5E6088] font-light">
                  <p>
                    <strong className="text-[#141651] font-label-btn mr-1">Rule 1 (AI Lag):</strong>
                    If AI Readiness &lt; 45% and is lowest pillar → Maps to <em>The AI & Workflow Transformation Lag</em>.
                  </p>
                  <p>
                    <strong className="text-[#141651] font-label-btn mr-1">Rule 2 (Founder Bottleneck):</strong>
                    If Org Clarity &lt; 50% OR Executive Bandwidth &lt; 48% → Maps to <em>The Founder-Centric Scaling Bottleneck</em>.
                  </p>
                  <p>
                    <strong className="text-[#141651] font-label-btn mr-1">Rule 3 (Execution Plateau):</strong>
                    If HR Architecture &lt; 55% with Org Clarity &ge; 50% → Maps to <em>The Accountability & Execution Plateau</em>.
                  </p>
                  <p>
                    <strong className="text-[#141651] font-label-btn mr-1">Rule 4 (Proactive Scale):</strong>
                    If Overall Score &ge; 68% across all pillars → Maps to <em>The High-Potential Proactive Foundation</em>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'archetypes' && (
            <div className="space-y-5">
              {Object.values(ARCHETYPES).map((arch) => (
                <div
                  key={arch.id}
                  className="p-6 bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] rounded-none space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-normal font-heading text-[#141651]">{arch.title}</h4>
                    <span className="text-2xs font-label-btn px-2.5 py-1 rounded-none border border-[#D4AF37] text-[#141651]">
                      {arch.readinessBand}
                    </span>
                  </div>
                  <p className="text-xs text-[#5E6088] italic font-light">"{arch.tagline}"</p>
                  <p className="text-xs sm:text-sm text-[#141651] leading-relaxed font-light">{arch.executiveSummary}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                    <div className="p-4 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] space-y-1">
                      <strong className="text-[#D4AF37] text-2xs font-label-btn block">
                        Immediate Action: {arch.immediateAction.title}
                      </strong>
                      <p className="text-2xs text-[#5E6088] font-light">{arch.immediateAction.description}</p>
                    </div>
                    <div className="p-4 bg-[#FFFEFA] rounded-none border border-[rgba(212,175,55,0.30)] space-y-1">
                      <strong className="text-[#141651] text-2xs font-label-btn block">
                        Blind Spot: {arch.criticalBlindSpot.title}
                      </strong>
                      <p className="text-2xs text-[#5E6088] font-light">{arch.criticalBlindSpot.warning}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'trust' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-label-btn text-[#141651]">
                  Radical Transparency Commitments (Anti-SaaS Slop)
                </h4>
                <div className="space-y-3">
                  {TRUST_MANIFESTO.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-[#FFFEFA] border border-[rgba(212,175,55,0.30)] rounded-none space-y-1.5 text-xs"
                    >
                      <h5 className="font-heading font-normal text-base text-[#141651] flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                        {item.title}
                      </h5>
                      <p className="text-[#5E6088] leading-relaxed font-light">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-[#141651] text-[#FFFEFA] rounded-none border border-[#E0C46A]/40 space-y-3 text-xs">
                <h4 className="font-heading font-normal text-xl text-[#FFFEFA]">Low-Pressure Conversion Architecture</h4>
                <p className="text-[#DCDBE1] leading-relaxed font-light">
                  Instead of pushing immediate pricing, the prospect is presented with 3 ethical choices:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-[#DCDBE1] font-light">
                  <li><strong className="text-[#FFFEFA] font-medium mr-1">Yes:</strong> Book a 30-minute interpretation conversation (zero sales pitch).</li>
                  <li><strong className="text-[#FFFEFA] font-medium mr-1">Save:</strong> Print or download full executive PDF brief with DIY steps.</li>
                  <li><strong className="text-[#FFFEFA] font-medium mr-1">Casual:</strong> Send a quick direct WhatsApp query for a voice note reply.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[rgba(212,175,55,0.30)] flex items-center justify-end bg-[#FFFEFA] shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs btn-main cursor-pointer"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
