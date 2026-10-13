import React, { useState } from 'react';
import { CAREER_JOURNEY } from '../data/portfolioData';
import { Calendar, Flag, Sparkles, CheckCircle2, ChevronRight, Milestone, GraduationCap } from 'lucide-react';

export const Journey: React.FC = () => {
  const [activeYearIndex, setActiveYearIndex] = useState<number>(2); // Default to current year 2026

  const activeMilestone = CAREER_JOURNEY[activeYearIndex];

  return (
    <section id="journey" className="relative py-24 sm:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-widest uppercase text-lavender-400 mb-3">
            <span className="w-6 h-[1px] bg-lavender-400"></span>
            <span>06 // Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            Academic & Career <span className="gradient-text-accent">Journey</span>.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl font-light">
            A progressive roadmap tracking technical evolution from foundational scripting to graduation and software engineering.
          </p>
        </div>

        {/* Interactive Year Selector Stepper (Desktop Horizontal / Mobile Responsive) */}
        <div className="relative mb-12">
          {/* Connecting track line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-navy-800 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {CAREER_JOURNEY.map((item: any, idx: number) => {
              const isSelected = activeYearIndex === idx;
              return (
                <button
                  key={item.year}
                  onClick={() => setActiveYearIndex(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 relative group ${
                    isSelected
                      ? 'bg-navy-800/90 border-lavender-400 shadow-xl shadow-lavender-500/10 -translate-y-1'
                      : 'bg-navy-950/70 border-white/10 hover:border-lavender-500/40 hover:bg-navy-900/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xl font-display font-extrabold transition-colors ${
                        isSelected ? 'gradient-text-accent' : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {item.year}
                    </span>
                    {item.isMilestoneYear ? (
                      <GraduationCap className="w-5 h-5 text-accentPink-400" />
                    ) : (
                      <Milestone className={`w-4 h-4 ${isSelected ? 'text-lavender-400' : 'text-slate-400'}`} />
                    )}
                  </div>
                  <div className="text-xs font-semibold text-slate-200 line-clamp-1 mb-1">
                    {item.title}
                  </div>
                  <div className="text-[10px] font-mono text-lavender-300/70">
                    Click to view details
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Journey Detail Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden shadow-2xl">
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-lavender-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl sm:text-5xl font-display font-extrabold gradient-text-accent">
                  {activeMilestone.year}
                </span>
                {activeMilestone.isMilestoneYear ? (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-accentPink-500/20 text-accentPink-300 border border-accentPink-500/30">
                    Target Graduation Year
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-lavender-500/20 text-lavender-300 border border-lavender-500/30">
                    Milestone Year
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                {activeMilestone.title}
              </h3>

              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-6">
                {activeMilestone.description}
              </p>

              {/* Focus themes pills */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-slate-400">
                  Key Themes & Accomplishments:
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeMilestone.keyThemes.map((theme: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-900/90 border border-white/5 text-xs text-lavender-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-lavender-400" />
                      <span>{theme}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Card / Roadmap Visual */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-navy-950/80 border border-white/5 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4 text-xs font-mono text-slate-400">
                <span>STATUS MONITOR</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ON TRACK
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Institution:</span>
                  <span className="text-white font-medium">AWH Engineering College</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Degree:</span>
                  <span className="text-white font-medium">B.Tech in CSE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Graduation Target:</span>
                  <span className="text-lavender-300 font-mono font-bold">2028</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Primary Objective:</span>
                  <span className="text-accentPink-300 font-medium">Software Developer</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-center text-xs text-slate-400 font-mono">
                Continuous Learning & Engineering Growth
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
