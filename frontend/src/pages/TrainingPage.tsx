import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../lib/api';

const simulations = [
  {
    id: 1,
    title: "The Urgent IT Patch",
    sender: "it-support@comapny-global.net",
    subject: "CRITICAL: Install Security Patch Immediately",
    content: "Our systems detected a vulnerability on your machine. Click the link below to install the mandatory update within 1 hour or your network access will be revoked.",
    isPhishing: true,
    reasoning: "The domain 'comapny-global.net' contains a typo and the urgent/threatening tone is a classic phishing indicator."
  },
  {
    id: 2,
    title: "Internal HR Benefits",
    sender: "hr@company.com",
    subject: "Q2 Benefits Enrollment Open",
    content: "Hi team, please review the updated benefits package for Q2 on the internal employee portal. No immediate action required unless you wish to change your plan.",
    isPhishing: false,
    reasoning: "This is a standard internal communication from a legitimate company domain with a non-threatening tone."
  },
  {
    id: 3,
    title: "Suspicious PDF Attachment",
    sender: "invoice@billing-department.com",
    subject: "Unpaid Invoice #88219",
    content: "Dear Customer, your payment is overdue. Please find the attached PDF invoice for the outstanding balance of $1,240.50. High penalty fees apply if unpaid by EOD.",
    isPhishing: true,
    reasoning: "Generic salutation ('Dear Customer') and high-pressure financial threats regarding an unexpected invoice are high-risk indicators."
  }
];

const TrainingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastChoice, setLastChoice] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentSim = simulations[currentIndex];

  const handleChoice = async (choiceIsPhishing: boolean) => {
    setLastChoice(choiceIsPhishing);
    const isCorrect = choiceIsPhishing === currentSim.isPhishing;
    if (isCorrect) setScore(s => s + 1);
    
    setShowFeedback(true);
  };

  const nextSim = () => {
    setShowFeedback(false);
    if (currentIndex < simulations.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true);
      submitScore();
    }
  };

  const submitScore = async () => {
    try {
      const finalScore = Math.round((score / simulations.length) * 100);
      await api.post('/scans/update_score', { score: finalScore });
    } catch (err) {
      console.error("Failed to update score", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
      {/* Header */}
      <section className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Neural Academy / Training</span>
              <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(93,230,255,0.6)] animate-agent-pulse" />
           </div>
           <h1 className="text-4xl font-headline font-black tracking-tighter">Phishing Simulator</h1>
           <p className="text-on-surface-variant text-sm font-light mt-1">Test your threat detection capabilities in an isolated neural environment.</p>
        </div>
        <div className="bg-surface-container-low px-6 py-3 rounded-xl border border-outline-variant/10 flex flex-col items-center">
           <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Session Score</span>
           <span className="text-2xl font-black text-primary">{score} / {simulations.length}</span>
        </div>
      </section>

      {!completed ? (
        <div className="relative">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-surface-container-high rounded-full mb-10 overflow-hidden">
             <motion.div 
               className="h-full bg-secondary" 
               initial={{ width: 0 }}
               animate={{ width: `${((currentIndex + 1) / simulations.length) * 100}%` }}
             />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="neural-card overflow-hidden"
            >
              {/* Simulator Terminal */}
              <div className="bg-surface-container-highest p-4 px-6 border-b border-outline-variant/10 flex items-center justify-between">
                 <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-error" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-tertiary" />
                 </div>
                 <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">Inbound Communication Module</span>
              </div>

              <div className="p-8 lg:p-12">
                <div className="mb-10 space-y-4">
                  <div className="flex items-center gap-4 border-b border-outline-variant/5 pb-4">
                     <span className="text-xs font-bold text-on-surface-variant w-20">FROM:</span>
                     <span className="text-sm font-mono text-secondary">{currentSim.sender}</span>
                  </div>
                  <div className="flex items-center gap-4 border-b border-outline-variant/5 pb-4">
                     <span className="text-xs font-bold text-on-surface-variant w-20">SUBJECT:</span>
                     <span className="text-sm font-bold text-on-surface">{currentSim.subject}</span>
                  </div>
                </div>

                <div className="bg-surface-container-low/40 p-8 rounded-xl border border-outline-variant/5 mb-10 min-h-[160px]">
                   <p className="text-lg font-light leading-relaxed text-on-surface italic">"{currentSim.content}"</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 no-print">
                   <button 
                     disabled={showFeedback}
                     onClick={() => handleChoice(true)}
                     className={`flex-1 py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-3 transition-all ${
                       showFeedback ? 'bg-surface-container-high text-on-surface-variant opacity-50' : 'bg-error/10 text-error border border-error/30 hover:bg-error hover:text-on-error'
                     }`}
                   >
                     <span className="material-symbols-outlined">report_problem</span>
                     FLAG AS PHISHING
                   </button>
                   <button 
                     disabled={showFeedback}
                     onClick={() => handleChoice(false)}
                     className={`flex-1 py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-3 transition-all ${
                       showFeedback ? 'bg-surface-container-high text-on-surface-variant opacity-50' : 'bg-tertiary/10 text-tertiary border border-tertiary/30 hover:bg-tertiary hover:text-on-tertiary'
                     }`}
                   >
                     <span className="material-symbols-outlined">check_circle</span>
                     MARK AS SAFE
                   </button>
                </div>
              </div>

              {/* Feedback Overlay */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    className={`border-t-4 ${lastChoice === currentSim.isPhishing ? 'border-tertiary bg-tertiary/5' : 'border-error bg-error/5'}`}
                  >
                    <div className="p-8 lg:p-12">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="material-symbols-outlined text-3xl">
                           {lastChoice === currentSim.isPhishing ? 'verified' : 'cancel'}
                        </span>
                        <h3 className="text-xl font-bold tracking-tight">
                           {lastChoice === currentSim.isPhishing ? 'Correct Synthesis' : 'Signature Mismatch'}
                        </h3>
                      </div>
                      <p className="text-on-surface-variant text-base font-light leading-relaxed mb-8">{currentSim.reasoning}</p>
                      <button 
                        onClick={nextSim}
                        className="bg-on-surface text-background px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
                      >
                         <span>CONTINUE ANALYTICS</span>
                         <span className="material-symbols-outlined">arrow_forward</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="neural-card p-12 text-center"
        >
          <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-8">
             <span className="material-symbols-outlined text-5xl text-secondary">workspace_premium</span>
          </div>
          <h2 className="text-4xl font-headline font-black tracking-tighter mb-4">Protocol Fully Decoded</h2>
          <p className="text-on-surface-variant text-lg font-light mb-10">Your final synchronization score is <span className="text-primary font-bold">{Math.round((score/simulations.length)*100)}%</span></p>
          <div className="flex justify-center gap-4">
             <button onClick={() => window.location.reload()} className="bg-surface-container-highest px-8 py-3 rounded-xl text-sm font-bold border border-outline-variant/10">REPLAY SESSION</button>
             <Link to="/dashboard" className="bg-primary text-on-primary px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-primary/20">RETURN TO COMMAND HUB</Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TrainingPage;
