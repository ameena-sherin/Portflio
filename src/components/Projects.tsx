import React, { useRef, useState } from 'react';
import { ExternalLink, Github, Figma, ChevronLeft, ChevronRight, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeTiltIndex, setActiveTiltIndex] = useState<number | null>(null);
  const [tiltStyles, setTiltStyles] = useState<{ [key: number]: { rx: number; ry: number } }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rx = ((y - centerY) / centerY) * -9; // Max 9 deg tilt
    const ry = ((x - centerX) / centerX) * 9;

    setActiveTiltIndex(index);
    setTiltStyles((prev) => ({ ...prev, [index]: { rx, ry } }));
  };

  const handleMouseLeave = (index: number) => {
    setActiveTiltIndex(null);
    setTiltStyles((prev) => ({ ...prev, [index]: { rx: 0, ry: 0 } }));
  };

  const scrollGallery = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 440;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="work" className="relative min-h-screen py-24 sm:py-32 border-t border-white/5 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-accentPink-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full z-20">
        
        {/* Section Header with Horizontal Gallery Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-mono font-semibold tracking-widest uppercase text-lavender-400 mb-3">
              <span className="w-6 h-[1.5px] bg-lavender-400" />
              <span>03 // PORTFOLIO CASE STUDIES</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-tight">
              MY
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-lavender-200 via-purple-300 to-accentPink-300">
                WORK
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              Scroll or use navigation &rarr;
            </span>
            <button
              onClick={() => scrollGallery('left')}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              aria-label="Scroll project gallery left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollGallery('right')}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              aria-label="Scroll project gallery right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal 3D Project Gallery Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto pb-8 pt-4 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PROJECTS.map((project, index) => {
            const tilt = tiltStyles[index] || { rx: 0, ry: 0 };
            const isHovered = activeTiltIndex === index;

            return (
              <div
                key={project.id}
                className="shrink-0 w-[320px] sm:w-[440px] md:w-[480px] snap-start"
                style={{ perspective: 1200 }}
              >
                {/* 3D Tilted Card Body */}
                <div
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  onClick={() => onSelectProject(project)}
                  style={{
                    transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(${isHovered ? 20 : 0}px)`,
                    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                  }}
                  className={`group relative flex flex-col rounded-3xl p-6 sm:p-7 bg-[#0e0e1e]/90 border border-white/10 transition-all duration-300 shadow-2xl backdrop-blur-xl cursor-pointer ${
                    isHovered
                      ? 'border-lavender-500/50 shadow-purple-950/80 shadow-2xl scale-[1.02]'
                      : 'hover:border-white/20'
                  }`}
                >
                  {/* Subtle top ambient glow inside card */}
                  <div className="absolute top-0 right-0 w-44 h-44 bg-purple-600/15 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-600/25 transition-colors" />

                  {/* Card Header: Number & Type */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-accentPink-400">
                      {project.number}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-slate-300">
                      {project.type}
                    </span>
                  </div>

                  {/* Project Screenshot inside Premium 3D Frame */}
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-lg mb-5 group-hover:border-lavender-500/40 transition-colors">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Floating badge over preview */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-lavender-300" />
                        <span>Interactive Case Study</span>
                      </span>
                      <span className="text-lavender-300 group-hover:translate-x-1 transition-transform">
                        Explore &rarr;
                      </span>
                    </div>
                  </div>

                  {/* Project Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight group-hover:text-lavender-200 transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-5 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-purple-500/10 border border-purple-500/20 text-lavender-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 rounded-lg text-[10px] font-mono bg-white/5 text-slate-400">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="text-xs font-mono font-semibold text-lavender-300 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <span>VIEW PROJECT</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.figmaUrl && (
                        <a
                          href={project.figmaUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-xl bg-white/5 hover:bg-purple-600/30 text-slate-300 hover:text-white border border-white/10 transition-colors"
                          title="Open Figma file"
                        >
                          <Figma className="w-4 h-4" />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-colors"
                          title="Open GitHub repo"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
