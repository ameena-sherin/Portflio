import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { Briefcase, Calendar, CheckCircle, Sparkles, Building2 } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-24 sm:py-32 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-widest uppercase text-lavender-400 mb-3">
            <span className="w-6 h-[1px] bg-lavender-400"></span>
            <span>04 // Experience & Internships</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Work & <span className="gradient-text-accent">Practical Experience</span>.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl font-light">
            Hands-on internships, industry programs, and technical collaborative engagements.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-lavender-500/20 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {EXPERIENCES.map((exp: any, index: number) => (
            <div key={exp.id} className="relative group">
              
              {/* Timeline Node Icon */}
              <div
                className={`absolute -left-[35px] sm:-left-[51px] top-1.5 w-8 h-8 rounded-full border flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                  exp.isCurrent
                    ? 'bg-lavender-600 border-lavender-300 text-white shadow-lg shadow-lavender-600/30'
                    : 'bg-navy-900 border-lavender-500/40 text-lavender-300'
                }`}
              >
                {exp.isCurrent ? (
                  <Sparkles className="w-4 h-4 animate-spin-slow" />
                ) : (
                  <Briefcase className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Experience Card */}
              <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-lavender-500/40 transition-all duration-300 shadow-lg group-hover:-translate-y-0.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display group-hover:text-lavender-200 transition-colors">
                      {exp.company}
                    </h3>
                    <div className="text-sm font-medium text-lavender-300">
                      {exp.role}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-navy-950/80 border border-white/10 text-slate-300">
                      <Calendar className="w-3 h-3 text-lavender-400" />
                      <span>{exp.period}</span>
                    </span>
                    {exp.isCurrent && (
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        Present
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-5">
                  {exp.description}
                </p>

                {/* Skills/Tags */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                  {exp.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono text-lavender-200 bg-lavender-500/10 border border-lavender-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
