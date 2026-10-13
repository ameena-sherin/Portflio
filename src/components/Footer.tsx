import React, { useState, useEffect } from 'react';
import { ArrowUp, Heart, Sparkles, MapPin, Clock } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      // Calculate IST time (Kozhikode, Kerala)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-white/5 bg-navy-950/80 text-xs text-slate-400 font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Identity & College */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2 text-white font-semibold font-display text-sm">
              <span>{PERSONAL_INFO.name}</span>
              <span className="text-lavender-400">•</span>
              <span className="text-lavender-300 font-normal font-sans text-xs">
                Portfolio 2026 – 2028
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
              <MapPin className="w-3 h-3 text-accentPink-400" />
              <span>AWH Engineering College • Kozhikode, Kerala</span>
            </div>
          </div>

          {/* Center: Live Local Time in Kozhikode */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-white/5 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-lavender-400" />
            <span className="text-slate-300">Kozhikode, Kerala (IST):</span>
            <span className="text-lavender-200 font-bold">{localTime || '10:15 PM'}</span>
          </div>

          {/* Right: Back to Top & Tech Note */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-slate-400 text-[11px]">
              Built with React, Three.js & Tailwind
            </span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-navy-900 hover:bg-navy-850 text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1 group"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              <span className="text-[11px] font-sans">Top</span>
            </button>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-[10px] text-slate-400">
          © {new Date().getFullYear()} Ameena Sherin. Designed with intentional typography and interactive engineering.
        </div>
      </div>
    </footer>
  );
};
