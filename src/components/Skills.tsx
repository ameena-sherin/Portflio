import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Terminal, Globe, BarChart2, Wrench, Palette, Sparkles, Check, ArrowRight } from 'lucide-react';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<{
    name: string;
    category: string;
    level: string;
    description: string;
  }>({
    name: 'Python',
    category: 'Programming',
    level: 'Core',
    description: 'Applied scripting, data analysis with Pandas, and algorithmic problem solving.'
  });

  const categoryIcons: Record<string, React.ReactNode> = {
    Programming: <Terminal className="w-4 h-4 text-purple-400" />,
    Web: <Globe className="w-4 h-4 text-indigo-400" />,
    Data: <BarChart2 className="w-4 h-4 text-accentPink-400" />,
    Tools: <Wrench className="w-4 h-4 text-amber-400" />,
    Design: <Palette className="w-4 h-4 text-lavender-400" />,
  };

  const filteredCategories = selectedCategory === 'All'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter((c: any) => c.category === selectedCategory);

  return (
    <section id="skills" className="relative py-24 sm:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-widest uppercase text-lavender-400 mb-3">
              <span className="w-6 h-[1px] bg-lavender-400"></span>
              <span>02 // Technical Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Skills & <span className="gradient-text-accent">Tooling</span>.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl font-light">
              Grounded in fundamentals, backed by real projects and certifications. No arbitrary percentages.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-navy-900/80 border border-white/10 w-fit">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === 'All'
                  ? 'bg-lavender-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              All Skills
            </button>
            {SKILL_CATEGORIES.map((cat: any) => (
              <button
                key={cat.category}
                onClick={() => setSelectedCategory(cat.category)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
                  selectedCategory === cat.category
                    ? 'bg-lavender-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Layout: Skills Interactive Grid + Active Skill Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Skill Groups & Cards */}
          <div className="lg:col-span-8 space-y-8">
            {filteredCategories.map((catGroup: any) => (
              <div
                key={catGroup.category}
                className="p-6 rounded-3xl bg-navy-900/50 border border-white/5 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-xl bg-navy-800/80 border border-white/10">
                      {categoryIcons[catGroup.category]}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {catGroup.category}
                      </h3>
                      <p className="text-xs text-slate-400 font-light">
                        {catGroup.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-lavender-300/70">
                    {catGroup.skills.length} competencies
                  </span>
                </div>

                {/* Skill Pills / Interactive Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {catGroup.skills.map((skill: any) => {
                    const isSelected = activeSkill.name === skill.name;
                    return (
                      <div
                        key={skill.name}
                        onMouseEnter={() =>
                          setActiveSkill({
                            name: skill.name,
                            category: catGroup.category,
                            level: skill.level,
                            description: skill.description,
                          })
                        }
                        onClick={() =>
                          setActiveSkill({
                            name: skill.name,
                            category: catGroup.category,
                            level: skill.level,
                            description: skill.description,
                          })
                        }
                        className={`group cursor-pointer p-3.5 rounded-2xl border transition-all duration-200 relative overflow-hidden ${
                          isSelected
                            ? 'bg-navy-800/90 border-lavender-400 shadow-md shadow-lavender-500/10 -translate-y-0.5'
                            : 'bg-navy-950/60 border-white/5 hover:border-lavender-500/30 hover:bg-navy-850/80 hover:-translate-y-0.5'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-bold text-white group-hover:text-lavender-200 transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-lavender-300 border border-white/5">
                            {skill.level}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2 font-light leading-relaxed">
                          {skill.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Active Skill Inspector Dossier */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 relative overflow-hidden shadow-xl">
              {/* Subtle ambient gradient */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-lavender-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-lavender-400" />
                  <span>Interactive Inspector</span>
                </span>
                <span className="text-[11px] font-mono text-lavender-300 bg-lavender-500/10 px-2 py-0.5 rounded-md border border-lavender-500/20">
                  {activeSkill.category}
                </span>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-display font-extrabold text-white mb-1">
                  {activeSkill.name}
                </div>
                <div className="text-xs font-mono text-lavender-400">
                  Proficiency Classification: {activeSkill.level}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-navy-950/70 border border-white/5 mb-6 text-sm text-slate-300 font-light leading-relaxed">
                <span className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Application Scope</span>
                {activeSkill.description}
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tested in academic & self-directed builds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Version controlled and documented on GitHub</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>No synthetic bars — purely project validated</span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">Hover any skill to inspect</span>
                <span className="text-xs text-lavender-300 font-medium">Ameena Sherin</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
