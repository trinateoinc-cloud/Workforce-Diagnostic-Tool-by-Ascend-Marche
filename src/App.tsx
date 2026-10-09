import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroView } from './components/HeroView';
import { QuestionView } from './components/QuestionView';
import { ResultsView } from './components/ResultsView';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { BookingModal } from './components/BookingModal';
import { StrategyBlueprintModal } from './components/StrategyBlueprintModal';
import { FollowUpGeneratorModal } from './components/FollowUpGeneratorModal';
import { TrustManifestoModal } from './components/TrustManifestoModal';
import {
  DIAGNOSTIC_QUESTIONS,
  calculateDiagnosticResult,
  STRATEGY_BLUEPRINT
} from './data/diagnosticData';
import { UserResponses, UserContact, DiagnosticResult } from './types/diagnostic';
import { ShieldCheck, BookOpen, Calendar, Mail, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'hero' | 'question' | 'results'>('hero');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<UserResponses>({});
  const [contact, setContact] = useState<UserContact | undefined>(undefined);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);

  // Modals state
  const [isLeadCaptureOpen, setIsLeadCaptureOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isBlueprintOpen, setIsBlueprintOpen] = useState(false);
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(false);
  const [isTrustOpen, setIsTrustOpen] = useState(false);

  // Start the 8-question flow
  const handleStartDiagnostic = () => {
    setCurrentQuestionIndex(0);
    setResponses({});
    setView('question');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Preview a realistic sample report immediately
  const handleViewSample = () => {
    const sampleResponses: UserResponses = {
      1: '1a', // Rapid headcount expansion
      2: '2b', // Stretched mid-level HR generalist
      3: '3a', // Founders are the perpetual bottleneck
      4: '4b', // High performers overburdened
      5: '5b', // Unclear which roles to redesign for AI
      6: '6a', // Heavy executive drain (10-20 hrs/week)
      7: '7a', // Costly mis-hires & flight risk
      8: '8b'  // Flexible/Fractional CHRO
    };
    const sampleContact: UserContact = {
      firstName: 'Alex',
      email: 'alex@growthscale.io',
      companyName: 'Vanguard Media Labs',
      headcountTier: '51-120',
      phoneOrWhatsApp: '+1 (555) 234-5678'
    };

    setResponses(sampleResponses);
    setContact(sampleContact);
    const calculated = calculateDiagnosticResult(sampleResponses, sampleContact);
    setDiagnosticResult(calculated);
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (optionId: string) => {
    const qId = DIAGNOSTIC_QUESTIONS[currentQuestionIndex].id;
    setResponses((prev) => ({
      ...prev,
      [qId]: optionId
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Finished all 8 questions -> prompt optional lead capture
      setIsLeadCaptureOpen(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLeadCaptureSubmit = (submittedContact: UserContact) => {
    setContact(submittedContact);
    setIsLeadCaptureOpen(false);
    const calculated = calculateDiagnosticResult(responses, submittedContact);
    setDiagnosticResult(calculated);
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSkipLeadCapture = () => {
    setIsLeadCaptureOpen(false);
    const calculated = calculateDiagnosticResult(responses);
    setDiagnosticResult(calculated);
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setView('hero');
    setCurrentQuestionIndex(0);
    setResponses({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentQ = DIAGNOSTIC_QUESTIONS[currentQuestionIndex];
  const selectedOptionId = currentQ ? responses[currentQ.id] : undefined;

  return (
    <div className="min-h-screen bg-[#FFFEFA] text-[#141651] flex flex-col font-body font-light">
      {/* Top Bar with Top Bar Contract */}
      <Header
        onStartDiagnostic={handleStartDiagnostic}
        onOpenBlueprint={() => setIsBlueprintOpen(true)}
        onOpenManifesto={() => setIsTrustOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
        hasStarted={view !== 'hero'}
        onReset={handleReset}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6">
        {view === 'hero' && (
          <HeroView
            onStart={handleStartDiagnostic}
            onViewSample={handleViewSample}
            onOpenManifesto={() => setIsTrustOpen(true)}
          />
        )}

        {view === 'question' && currentQ && (
          <QuestionView
            question={currentQ}
            currentIndex={currentQuestionIndex}
            totalQuestions={DIAGNOSTIC_QUESTIONS.length}
            selectedOptionId={selectedOptionId}
            onSelectOption={handleSelectOption}
            onNext={handleNextQuestion}
            onPrev={handlePrevQuestion}
          />
        )}

        {view === 'results' && diagnosticResult && (
          <ResultsView
            result={diagnosticResult}
            contact={contact}
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenFollowUpModal={() => setIsFollowUpOpen(true)}
            onOpenBlueprint={() => setIsBlueprintOpen(true)}
            onRetake={handleStartDiagnostic}
          />
        )}
      </main>

      {/* Quiet, Professional Executive Footer */}
      <footer className="mt-20 border-t border-[rgba(212,175,55,0.30)] bg-[#FFFEFA] py-10 text-[#5E6088] text-xs print:hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-heading font-normal text-xl text-[#141651]">
                Ascend Marché
              </span>
              <span aria-hidden="true" className="text-[#D4AF37]/50">·</span>
              <span className="text-[#5E6088] font-light">Strategic HR Leadership · Accelerating Transformation</span>
            </div>

            {/* Direct Executive Contact Emails */}
            <div className="flex items-center gap-4 text-xs font-label-btn text-[#141651]">
              <a
                href="mailto:engage@ascendmarche.com"
                className="hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                engage@ascendmarche.com
              </a>
              <span aria-hidden="true" className="text-[#D4AF37]/50">·</span>
              <a
                href="mailto:trina@ascendmarche.com"
                className="hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                trina@ascendmarche.com
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-[rgba(212,175,55,0.20)] flex flex-wrap items-center justify-between gap-6 text-xs font-label-btn text-[#5E6088]">
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="https://www.ascendmarche.com/#radar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#141651] transition-colors cursor-pointer"
              >
                Talent R.A.D.A.R.™
              </a>
              <button
                onClick={() => setIsTrustOpen(true)}
                className="hover:text-[#141651] transition-colors cursor-pointer"
              >
                Trust Manifesto
              </button>
              <button
                onClick={() => setIsBlueprintOpen(true)}
                className="hover:text-[#141651] transition-colors cursor-pointer"
              >
                Methodology
              </button>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="hover:text-[#141651] transition-colors cursor-pointer"
              >
                Discuss Priorities
              </button>
            </div>

            <span className="text-[#5E6088]/60 font-light normal-case">
              © {new Date().getFullYear()} Ascend Marché. All rights reserved.
            </span>
          </div>
        </div>
      </footer>

      {/* Modals & Dialogs */}
      <div className="print:hidden">
        <LeadCaptureModal
          isOpen={isLeadCaptureOpen}
          onClose={() => setIsLeadCaptureOpen(false)}
          onSubmit={handleLeadCaptureSubmit}
          onSkip={handleSkipLeadCapture}
        />

        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          contact={contact}
          archetypeTitle={diagnosticResult?.archetype.title}
          overallScore={diagnosticResult?.overallScore}
          priorityFocus={diagnosticResult?.topPriorityIssues[0]?.area}
        />

        <StrategyBlueprintModal
          isOpen={isBlueprintOpen}
          onClose={() => setIsBlueprintOpen(false)}
        />

        {diagnosticResult && (
          <FollowUpGeneratorModal
            isOpen={isFollowUpOpen}
            onClose={() => setIsFollowUpOpen(false)}
            result={diagnosticResult}
            contact={contact}
          />
        )}

        <TrustManifestoModal
          isOpen={isTrustOpen}
          onClose={() => setIsTrustOpen(false)}
          onStartDiagnostic={handleStartDiagnostic}
        />
      </div>
    </div>
  );
}
