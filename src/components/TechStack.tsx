import React, { useState } from 'react';
import { Sparkles, Code2, Layers, Cpu, X } from 'lucide-react';
import { TECH_STACK } from '../data/portfolioData';
import { TechStackItem } from '../types';

export const TechStack: React.FC = () => {
  const [hoveredTech, setHoveredTech] = useState<TechStackItem | null>(TECH_STACK[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const categories = ['All', 'Design', 'Languages', 'Frontend', 'Data & BI', 'DevOps'];

  const filteredTech = selectedCategory === 'All'
    ? TECH_STACK
    : TECH_STACK.filter((t) => t.category === selectedCategory);

  const handleTechSelect = (tech: TechStackItem) => {
    setHoveredTech(tech);
    // On touch / small screens, show the detail card as a bottom-sheet style popup
    if (window.innerWidth < 1024) {
      setMobileDetailOpen(true);
    }
  };

  return (
    <section
      id="techstack"
      className="relative min-h-screen py-16 sm:py-24 md:py-32 flex items-center border-t border-white/5 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-purple-900/10 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full z-20">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-mono font-semibold tracking-widest uppercase text-lavender-400 mb-3">
              <span className="w-6 h-[1.5px] bg-lavender-400" />
              <span>04 // INTERACTIVE 3D SKILL CLUSTER</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-tight">
              MY
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-lavender-200 via-purple-300 to-accentPink-300">
                TECH STACK
              </span>
            </h2>
          </div>

          {/* Filter Pills — horizontally scrollable on mobile */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-x-auto no-scrollbar shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Display Grid with Floating Interactive 3D Spheres */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Interactive 3D Sphere Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5">
            {filteredTech.map((tech, idx) => {
              const isSelected = hoveredTech?.id === tech.id;

              return (
                <div
                  key={tech.id}
                  onMouseEnter={() => setHoveredTech(tech)}
                  onClick={() => handleTechSelect(tech)}
                  className={`group relative p-3 sm:p-5 rounded-2xl sm:rounded-3xl bg-black/40 hover:bg-[#15152a] border transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer min-h-[110px] sm:min-h-[140px] shadow-lg ${
                    isSelected
                      ? 'border-lavender-400 bg-[#161630] shadow-purple-900/60 scale-105'
                      : 'border-white/10 hover:border-lavender-500/30 hover:scale-[1.03]'
                  }`}
                >
                  {/* Floating 3D Glowing Orb Visual */}
                  <div className="relative w-10 sm:w-12 h-10 sm:h-12 rounded-full mb-2 sm:mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {/* Glowing outer aura */}
                    <div
                      className="absolute inset-0 rounded-full blur-md opacity-40 group-hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: tech.color }}
                    />
                    {/* 3D Sphere body with radial gradient */}
                    <div
                      className="relative w-8 sm:w-10 h-8 sm:h-10 rounded-full border border-white/30 flex items-center justify-center text-white font-bold text-[10px] sm:text-xs shadow-inner"
                      style={{
                        background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${tech.color} 55%, #0a0a14 100%)`,
                        boxShadow: `0 0 15px ${tech.color}40`,
                      }}
                    >
                      {tech.name.substring(0, 2)}
                    </div>
                  </div>

                  {/* Tech Name */}
                  <span className="text-[11px] sm:text-sm font-bold text-white font-display tracking-wide group-hover:text-lavender-200">
                    {tech.name}
                  </span>

                  <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 mt-0.5 sm:mt-1">
                    {tech.category}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Technology Inspection Card — desktop only */}
          <div className="lg:col-span-4 hidden lg:block">
            {hoveredTech ? (
              <div className="relative p-7 rounded-3xl bg-gradient-to-b from-[#161630] via-[#0f0f22] to-[#090914] border border-lavender-500/40 shadow-2xl shadow-purple-950/70 backdrop-blur-2xl">
                {/* Top ambient highlight */}
                <div
                  className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-30 pointer-events-none"
                  style={{ backgroundColor: hoveredTech.color }}
                />

                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-lavender-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-accentPink-400" />
                    {hoveredTech.badge}
                  </span>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold text-white"
                    style={{ backgroundColor: `${hoveredTech.color}30`, borderColor: hoveredTech.color, borderWidth: 1 }}
                  >
                    {hoveredTech.category}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-display font-black text-lg shadow-xl"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${hoveredTech.color} 65%, #050510 100%)`,
                      boxShadow: `0 0 20px ${hoveredTech.color}60`,
                    }}
                  >
                    {hoveredTech.name.substring(0, 3)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white font-display tracking-tight">
                      {hoveredTech.name}
                    </h3>
                    <div className="text-xs font-mono text-slate-400">
                      Discipline: {hoveredTech.category}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 mb-6">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    Applied Practice &amp; Mastery:
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-light">
                    {hoveredTech.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-white/10">
                  <span>Interactive Parallax Active</span>
                  <span className="text-emerald-400">● In Production</span>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-black/40 border border-white/10 text-center text-slate-400 text-xs font-mono">
                Hover over any technology sphere to inspect details.
              </div>
            )}
          </div>

        </div>

        {/* Mobile Detail Bottom Sheet */}
        {mobileDetailOpen && hoveredTech && (
          <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setMobileDetailOpen(false)}>
            <div
              className="w-full max-w-lg rounded-t-3xl bg-gradient-to-b from-[#161630] to-[#0a0a18] border-t border-lavender-500/30 p-5 sm:p-6 shadow-2xl animate-slideUp"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-display font-black text-sm shadow-lg"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${hoveredTech.color} 65%, #050510 100%)`,
                    }}
                  >
                    {hoveredTech.name.substring(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white font-display">
                      {hoveredTech.name}
                    </h3>
                    <div className="text-[10px] font-mono text-slate-400">{hoveredTech.category} • {hoveredTech.badge}</div>
                  </div>
                </div>
                <button
                  onClick={() => setMobileDetailOpen(false)}
                  className="p-2 rounded-xl bg-white/10 text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-light">
                {hoveredTech.description}
              </p>
              <div className="mt-4 w-10 h-1 rounded-full bg-white/10 mx-auto" />
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
