import React from 'react';
import { Calendar, MapPin, Award, CheckCircle2, Terminal, Shield, Sparkles, ExternalLink } from 'lucide-react';
import { INTERNSHIPS } from '../data/portfolioData';
import { Internship } from '../types';

interface InternshipsProps {
  onSelectInternship: (internship: Internship) => void;
}

export const Internships: React.FC<InternshipsProps> = ({ onSelectInternship }) => {
  return (
    <section
      id="internships"
      className="relative min-h-screen py-16 sm:py-24 md:py-32 flex items-center border-t border-white/5 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-accentPink-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and Internship Cards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Overline */}
            <div className="flex items-center gap-2.5 text-xs font-mono font-semibold tracking-widest uppercase text-lavender-400 mb-3">
              <span className="w-6 h-[1.5px] bg-lavender-400" />
              <span>02 // PROFESSIONAL INDUSTRY EXPERIENCES</span>
            </div>

            {/* Section Heading: MY INTERNSHIPS */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-tight mb-4">
              MY
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-lavender-200 via-purple-300 to-accentPink-300">
                INTERNSHIPS
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-400 font-light max-w-xl mb-10 leading-relaxed">
              Hands-on technical internships bridging core programming fundamentals with systems security in enterprise and technology park environments.
            </p>

            {/* Internship List */}
            <div className="flex flex-col gap-6 w-full">
              {INTERNSHIPS.map((internship) => {
                const isPython = internship.id === 'internship-01';
                const Icon = isPython ? Terminal : Shield;

                return (
                  <div
                    key={internship.id}
                    className="group relative p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-black/50 hover:bg-[#121226]/80 border border-white/10 hover:border-lavender-500/40 transition-all duration-300 shadow-xl shadow-purple-950/20 backdrop-blur-md"
                  >
                    {/* Corner Number */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-3 sm:pb-4 mb-4 sm:mb-5 gap-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/25 text-lavender-300 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5 text-lavender-400" />
                        </div>
                        <div>
                          <span className="text-[11px] font-mono tracking-widest uppercase text-lavender-400">
                            INTERNSHIP {internship.number}
                          </span>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white font-display">
                            {internship.company}
                          </h3>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300">
                        {internship.duration}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h4 className="text-base sm:text-lg font-bold text-lavender-200 font-display mb-2">
                      {internship.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-light">
                      {internship.description}
                    </p>

                    {/* Timeline & Location Metadata */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs font-mono text-slate-300">
                      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5">
                        <Calendar className="w-4 h-4 text-lavender-400 shrink-0" />
                        <span>{internship.period}</span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5">
                        <MapPin className="w-4 h-4 text-accentPink-400 shrink-0" />
                        <span>{internship.location}</span>
                      </div>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      {internship.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-purple-500/10 border border-purple-500/20 text-lavender-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* VIEW CERTIFICATE Button */}
                    <button
                      onClick={() => onSelectInternship(internship)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono font-semibold text-xs tracking-wide shadow-lg shadow-purple-600/25 transition-all hover:scale-105 active:scale-95"
                    >
                      <Award className="w-4 h-4 text-lavender-200" />
                      <span>VIEW CERTIFICATE</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Workstation 3D Stage (Open area for 3D desk, ultrawide monitor & typing avatar) */}
          <div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center min-h-[520px] pointer-events-none">
            {/* Informational UI Badge overlaid on the 3D Workstation view */}
            <div className="p-4 rounded-2xl bg-black/60 border border-lavender-500/30 backdrop-blur-xl text-left pointer-events-auto shadow-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-lavender-300 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-accentPink-400" />
                <span>Creative Workstation &amp; Code Lab</span>
              </div>
              <p className="text-[11px] font-mono text-slate-400">
                Ameena at her dual-screen setup designing UI/UX architectures and coding software modules.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
