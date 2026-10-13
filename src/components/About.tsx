import React from 'react';
import { Palette, Figma, Globe, Database, Cpu, Cloud, Sparkles, MapPin, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  const visualDisciplines = [
    {
      name: "UI Design",
      desc: "Human-centered interfaces, typography systems, and interaction flow",
      icon: Palette,
      badge: "Design",
      color: "from-pink-500/20 to-purple-500/20 border-pink-500/30 text-pink-300"
    },
    {
      name: "Figma",
      desc: "Design tokens, atomic component libraries, and interactive prototyping",
      icon: Figma,
      badge: "Core Tool",
      color: "from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-300"
    },
    {
      name: "Web Development",
      desc: "Responsive frontend layouts, HTML5, modern CSS, and JavaScript logic",
      icon: Globe,
      badge: "Engineering",
      color: "from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-300"
    },
    {
      name: "Data Analytics",
      desc: "Transforming datasets into actionable dashboards with Power BI & DAX",
      icon: Database,
      badge: "Analytics",
      color: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-300"
    },
    {
      name: "AI & Innovation",
      desc: "Generative AI paradigms, prompt engineering, and intelligent user flows",
      icon: Cpu,
      badge: "Next-Gen",
      color: "from-violet-500/20 to-fuchsia-500/20 border-violet-500/30 text-violet-300"
    },
    {
      name: "Cloud Solutions",
      desc: "Cloud deployment foundations, scalability, and service architectures",
      icon: Cloud,
      badge: "Infrastructure",
      color: "from-teal-500/20 to-emerald-500/20 border-teal-500/30 text-teal-300"
    }
  ];

  return (
    <section id="about" className="relative min-h-screen py-16 sm:py-24 md:py-32 flex items-center border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Exact Bio, and Clean Visual Elements (Width 7 cols, leaving right 5 cols for 3D character) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Overline */}
            <div className="flex items-center gap-2.5 text-xs font-mono font-semibold tracking-widest uppercase text-lavender-400 mb-3">
              <span className="w-6 h-[1.5px] bg-lavender-400" />
              <span>01 // THE STORY &amp; VISION</span>
            </div>

            {/* Section Heading: ABOUT ME */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-tight mb-6 sm:mb-8">
              ABOUT
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-lavender-200 via-purple-300 to-accentPink-300">
                ME
              </span>
            </h2>

            {/* Exact User Requested Bio Text */}
            <div className="relative pl-4 sm:pl-6 border-l-2 border-lavender-500/40 mb-8 sm:mb-10">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 font-light leading-relaxed mb-3 sm:mb-4">
                "I'm Ameena Sherin, a B.Tech Computer Science Engineering student with a strong interest in UI/UX design, software development, data analytics, cloud technologies and AI."
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-lavender-100 font-light leading-relaxed">
                "I enjoy turning ideas into simple, useful and visually engaging digital experiences. I'm continuously learning, building projects and improving my design and technical skills."
              </p>
            </div>

            {/* Meta Tags: Location & College */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono text-slate-300 mb-8 sm:mb-10">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <GraduationCap className="w-3.5 h-3.5 text-lavender-400" />
                <span>AWH Engineering College • Class of 2028</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5 text-accentPink-400" />
                <span>Kozhikode, Kerala, India</span>
              </div>
            </div>

            {/* Small Visual Elements Grid (UI Design, Figma, Web Development, Data Analytics, AI, Cloud) */}
            <div className="w-full">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-lavender-400" />
                <span>Creative &amp; Technical Disciplines</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                {visualDisciplines.map((item, i) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-black/40 hover:bg-white/[0.06] border border-white/10 hover:border-lavender-500/40 transition-all duration-300 group shadow-md"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-xl bg-gradient-to-tr ${item.color} border shadow-sm`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 group-hover:text-lavender-300">
                          {item.badge}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white font-display mb-1 group-hover:text-lavender-200">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-light leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Reserved for the 3D Character who smoothly slides right during scroll */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center min-h-[500px] pointer-events-none" />

        </div>
      </div>
    </section>
  );
};
