import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
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
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Neural Academy / Exercise</span>
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
           </div>
           <h1 className="text-4xl font-headline font-black tracking-tighter text-on-surface">Phishing Simulator</h1>
           <p className="text-on-surface-variant text-sm font-medium mt-1">Test your pattern recognition in a safe, neural sandbox.</p>
        </div>
        <div className="bg-white border border-outline px-6 py-3 rounded-2xl shadow-sm flex flex-col items-center">
           <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">Session Accuracy</span>
           <span className="text-2xl font-black text-primary">{Math.round((score / simulations.length) * 100)}%</span>
        </div>
      </section>

      {!completed ? (
        <div className="relative">
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full mb-10 overflow-hidden">
             <motion.div 
               className="h-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.3)]" 
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
              className="neural-card overflow-hidden bg-white shadow-xl shadow-gray-200/50"
            >
              {/* Simulator Header */}
              <div className="bg-gray-50 p-4 px-8 border-b border-outline flex items-center justify-between">
                 <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-error" />
                    <div className="w-2.5 h-2.5 rounded-full bg-warning" />
                    <div className="w-2.5 h-2.5 rounded-full bg-success" />
                 </div>
                 <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Communication Hub Module</span>
              </div>

              <div className="p-8 lg:p-12">
                <div className="mb-10 space-y-4">
                  <div className="flex items-center gap-4 border-b border-outline pb-4">
                     <span className="text-[10px] font-black text-on-surface-variant w-20 uppercase tracking-widest">From:</span>
                     <span className="text-sm font-bold text-primary">{currentSim.sender}</span>
                  </div>
                  <div className="flex items-center gap-4 border-b border-outline pb-4">
                     <span className="text-[10px] font-black text-on-surface-variant w-20 uppercase tracking-widest">Subject:</span>
                     <span className="text-sm font-black text-on-surface">{currentSim.subject}</span>
                  </div>
                </div>

                <div className="bg-background p-8 rounded-2xl border border-outline/50 mb-10 min-h-[160px] relative">
                   <span className="absolute top-4 right-6 text-[10px] font-black text-primary/20 uppercase tracking-[0.3em]">Encrypted Payload</span>
                   <p className="text-lg font-medium leading-relaxed text-on-surface-variant italic">"{currentSim.content}"</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 no-print">
                   <button 
                     disabled={showFeedback}
                     onClick={() => handleChoice(true)}
                     className={`flex-1 py-4 px-6 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
                       showFeedback ? 'bg-gray-100 text-gray-400' : 'bg-error/5 text-error border border-error/20 hover:bg-error hover:text-white'
                     }`}
                   >
                     <span className="material-symbols-outlined">report_problem</span>
                     Flag as Phishing
                   </button>
                   <button 
                     disabled={showFeedback}
                     onClick={() => handleChoice(false)}
                     className={`flex-1 py-4 px-6 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
                       showFeedback ? 'bg-gray-100 text-gray-400' : 'bg-success/5 text-success border border-success/20 hover:bg-success hover:text-white'
                     }`}
                   >
                     <span className="material-symbols-outlined">check_circle</span>
                     Mark as Safe
                   </button>
                </div>
              </div>

              {/* Feedback Overlay */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    className={`border-t-4 ${lastChoice === currentSim.isPhishing ? 'border-success bg-success/[0.02]' : 'border-error bg-error/[0.02]'}`}
                  >
                    <div className="p-8 lg:p-12">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`material-symbols-outlined text-3xl ${lastChoice === currentSim.isPhishing ? 'text-success' : 'text-error'}`}>
                           {lastChoice === currentSim.isPhishing ? 'verified' : 'cancel'}
                        </span>
                        <h3 className="text-xl font-black tracking-tight text-on-surface">
                           {lastChoice === currentSim.isPhishing ? 'Pattern Recognized' : 'Synthesis Misalignment'}
                        </h3>
                      </div>
                      <p className="text-on-surface-variant text-base font-medium leading-relaxed mb-8">{currentSim.reasoning}</p>
                      <button 
                        onClick={nextSim}
                        className="bg-primary text-white px-10 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all flex items-center gap-2"
                      >
                         <span>Next Exercise</span>
                         <span className="material-symbols-outlined text-lg">arrow_forward</span>
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
          className="bg-white p-16 rounded-3xl border border-outline shadow-2xl text-center"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
             <span className="material-symbols-outlined text-4xl text-primary animate-bounce">workspace_premium</span>
          </div>
          <h2 className="text-4xl font-headline font-black tracking-tighter text-on-surface mb-2">Academy Protocol Complete</h2>
          <p className="text-on-surface-variant text-lg font-medium mb-10">Neural detection capabilities synchronized at <span className="text-primary font-black">{Math.round((score/simulations.length)*100)}%</span> proficiency.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button onClick={() => window.location.reload()} className="bg-gray-50 px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border border-outline hover:bg-gray-100 transition-colors">Re-run Session</button>
             <Link to="/dashboard" className="bg-primary text-white px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all">Return to Command Hub</Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TrainingPage;
