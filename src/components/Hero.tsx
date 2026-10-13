import React from 'react';
import { ArrowDown, Mail, FileText, Sparkles, Code2, Palette, Database } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden"
    >
      {/* Ambient background glows — reduced size on mobile */}
      <div className="absolute top-1/4 left-0 sm:left-1/5 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-purple-900/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 sm:right-1/5 w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] bg-accentPink-500/10 rounded-full blur-[110px] sm:blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[350px] sm:w-[700px] h-[200px] sm:h-[300px] bg-lavender-600/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto w-full z-20 min-h-[calc(100vh-140px)] flex flex-col justify-between">
        
        {/* Top spacer */}
        <div className="h-2 sm:h-4" />

        {/* Cinematic Split Typography with Center 3D Space */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center py-4 sm:py-12">
          
          {/* Left Column: Hello! I'm AMEENA SHERIN */}
          <div className="lg:col-span-5 flex flex-col items-start text-left z-20">
            {/* Status Beacon */}
            <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/5 border border-lavender-500/20 backdrop-blur-md mb-4 sm:mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono font-medium text-lavender-200">
                Available for UI/UX &amp; Creative Projects
              </span>
            </div>

            {/* Overline Greeting (in soft lavender/purple) */}
            <p className="text-sm sm:text-base md:text-lg font-mono font-semibold tracking-wide text-lavender-300 uppercase mb-2 flex items-center gap-2.5">
              <span className="w-6 sm:w-8 h-[2px] bg-gradient-to-r from-lavender-400 to-purple-500 rounded-full" />
              HELLO! I'M
            </p>

            {/* Large Bold Typography: AMEENA SHERIN */}
            <h1 className="text-[2.75rem] leading-[0.92] sm:text-6xl md:text-7xl xl:text-8xl font-display font-extrabold tracking-tight text-white mb-4 sm:mb-6">
              AMEENA
              <span className="block mt-1 bg-gradient-to-r from-white via-lavender-100 to-accentPink-300 bg-clip-text text-transparent">
                SHERIN
              </span>
            </h1>

            {/* Supporting Student & Developer Presentation */}
            <div className="flex flex-col gap-1 sm:gap-1.5 text-xs sm:text-sm font-mono text-slate-400 mb-6 sm:mb-8 border-l-2 border-lavender-500/30 pl-3 sm:pl-3.5">
              <div className="text-slate-200 font-medium">
                B.Tech Computer Science Engineering Student
              </div>
              <div className="text-lavender-300/80">
                Aspiring Software Developer
              </div>
            </div>

            {/* Action Buttons: VIEW MY WORK, CONTACT ME, DOWNLOAD RESUME */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
              <button
                onClick={() => scrollTo('work')}
                className="group relative px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-lavender-600 to-accentPink-600 hover:from-purple-500 hover:to-accentPink-500 text-white font-semibold text-xs sm:text-sm font-mono tracking-wider flex items-center justify-center gap-2 sm:gap-2.5 shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>VIEW MY WORK</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="group relative px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm font-mono tracking-wider border border-white/15 hover:border-lavender-400/50 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-md"
              >
                <Mail className="w-4 h-4 text-lavender-400 group-hover:text-accentPink-400 transition-colors" />
                <span>CONTACT ME</span>
              </button>

              <button
                onClick={onOpenResume}
                className="group relative px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-navy-900/80 hover:bg-navy-800 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm font-mono tracking-wider border border-white/10 hover:border-lavender-400/40 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 hidden sm:flex"
                title="Download or inspect resume"
              >
                <FileText className="w-4 h-4 text-lavender-400" />
                <span>RESUME</span>
              </button>
            </div>
          </div>

          {/* Center Column: Open Area reserved for the 3D Character Avatar in ThreeWorldCanvas */}
          <div className="lg:col-span-2 hidden lg:flex items-center justify-center min-h-[460px] pointer-events-none" />

          {/* Right Column: A Creative UI/UX DESIGNER */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end text-left lg:text-right z-20 mt-6 lg:mt-0">
            {/* Overline Role (in soft lavender/purple) */}
            <p className="text-sm sm:text-base md:text-lg font-mono font-semibold tracking-wide text-lavender-300 uppercase mb-2 flex items-center gap-2.5">
              <span>A CREATIVE</span>
              <span className="w-8 h-[2px] bg-gradient-to-l from-lavender-400 to-purple-500 rounded-full hidden lg:block" />
            </p>

            {/* 3D Ghosted Layered Typography for UI/UX (Inspired by reference "DEVELOPER") */}
            <div className="relative leading-[0.88] select-none">
              <span className="text-[2.75rem] sm:text-6xl md:text-7xl xl:text-8xl font-display font-extrabold tracking-tight text-stroke-purple block">
                UI/UX
              </span>
              <span className="text-[2.75rem] sm:text-6xl md:text-7xl xl:text-8xl font-display font-extrabold tracking-tight text-white block mt-[-0.18em]">
                DESIGNER
              </span>
            </div>

            {/* Philosophy quote */}
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-sm mt-4 sm:mt-6 leading-relaxed">
              "Crafting intuitive, human-centered digital experiences that blend aesthetic elegance with functional clarity."
            </p>

            {/* Interactive Domain Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-4 sm:mt-6 lg:justify-end">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-500/10 border border-purple-500/20 text-lavender-200 text-xs font-mono">
                <Palette className="w-3.5 h-3.5 text-accentPink-400" />
                <span>Product Design</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-xs font-mono">
                <Code2 className="w-3.5 h-3.5 text-lavender-400" />
                <span>Interactive Frontend</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-200 text-xs font-mono">
                <Database className="w-3.5 h-3.5 text-sky-400" />
                <span>Analytics &amp; BI</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Scroll Prompt */}
        <div
          onClick={() => scrollTo('about')}
          className="flex flex-col items-center justify-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer mx-auto pb-4 pt-4 sm:pt-6"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
            Scroll to begin continuous story
          </span>
          <div className="w-4 h-7 rounded-full border border-slate-600 flex justify-center p-1">
            <div className="w-1 h-1.5 bg-lavender-400 rounded-full animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  );
};
