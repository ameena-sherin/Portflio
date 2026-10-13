import React from 'react';
import { X, ExternalLink, Github, Figma, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#14142c] via-[#0d0d1e] to-[#070710] border border-lavender-500/30 rounded-3xl p-5 sm:p-8 shadow-2xl shadow-purple-950/70 z-10 my-8">
        {/* Glow accents */}
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-accentPink-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/15 transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex flex-col gap-2 mb-6 pr-10">
          <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase text-lavender-400">
            <span className="px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/30 text-purple-300">
              PROJECT {project.number}
            </span>
            <span>• {project.type.toUpperCase()}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-lavender-200/90 font-mono">
            {project.subtitle}
          </p>
        </div>

        {/* Project Preview Image inside 3D Frame */}
        <div className="relative w-full aspect-video max-h-[380px] rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl mb-8 group">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/80">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-lavender-400" />
              Verified Case Study
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
              Interactive Preview
            </span>
          </div>
        </div>

        {/* Project Story & Tech Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Project Overview
              </h4>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                Key Deliverables & Innovations
              </h4>
              <ul className="flex flex-col gap-2">
                {project.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Tech & Metrics */}
          <div className="flex flex-col gap-5">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono bg-navy-900/80 border border-lavender-500/25 text-lavender-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.metrics && (
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                  Core Metrics
                </h4>
                <div className="flex flex-col gap-2">
                  {project.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs font-mono"
                    >
                      <span className="text-slate-400">{m.label}:</span>
                      <span className="text-lavender-200 font-bold">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-3">
            {project.figmaUrl && (
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wide flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-transform hover:scale-105 active:scale-95"
              >
                <Figma className="w-4 h-4" />
                <span>VIEW IN FIGMA</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-slate-100 hover:text-white border border-white/15 hover:border-lavender-400/50 font-semibold text-xs tracking-wide flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md"
              >
                <Github className="w-4 h-4 text-lavender-400" />
                <span>GITHUB REPOSITORY</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-accentPink-500/20 hover:bg-accentPink-500/30 border border-accentPink-500/40 text-accentPink-200 font-semibold text-xs tracking-wide flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <span>LIVE DEMO</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-mono transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
