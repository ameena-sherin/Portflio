import React, { useRef } from 'react';
import { Award, ShieldCheck, ChevronLeft, ChevronRight, ExternalLink, Sparkles } from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { CertificationItem } from '../types';

interface CertificationsProps {
  onSelectCertification: (cert: CertificationItem) => void;
}

export const Certifications: React.FC<CertificationsProps> = ({ onSelectCertification }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 380;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="certifications"
      className="relative min-h-screen py-24 sm:py-32 border-t border-white/5 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full z-20">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-mono font-semibold tracking-widest uppercase text-lavender-400 mb-3">
              <span className="w-6 h-[1.5px] bg-lavender-400" />
              <span>05 // CREDENTIALS &amp; MILESTONES</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-tight">
              CERTIFICATIONS
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-lavender-200 via-purple-300 to-accentPink-300">
                &amp; LEARNING
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              13 Verified Credentials
            </span>
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Clean 3D Horizontal Certificate Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              onClick={() => onSelectCertification(cert)}
              className="shrink-0 w-[300px] sm:w-[360px] snap-start group relative p-6 rounded-3xl bg-[#0d0d1c]/90 hover:bg-[#15152a] border border-white/10 hover:border-lavender-500/40 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-xl hover:shadow-purple-950/60 hover:-translate-y-1.5 backdrop-blur-xl"
            >
              {/* Top Row: Issuer & Emblem */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/25 text-lavender-300 group-hover:scale-110 transition-transform">
                    <Award className="w-5 h-5 text-lavender-400" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-slate-300">
                    {cert.category}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-lavender-300 uppercase tracking-wider mb-1">
                  {cert.issuer}
                </div>

                <h3 className="text-lg font-bold text-white font-display tracking-tight group-hover:text-lavender-200 transition-colors mb-3 leading-snug">
                  {cert.title}
                </h3>

                <p className="text-xs text-slate-400 font-light leading-relaxed mb-5 line-clamp-3">
                  {cert.description}
                </p>
              </div>

              {/* Bottom Tags & Click Prompt */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cert.skills.slice(0, 3).map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-lavender-300 group-hover:text-white transition-colors">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>View Credential</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
