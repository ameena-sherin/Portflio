import React from 'react';
import { X, Printer, GraduationCap, Briefcase, Award, Code2, MapPin, Mail, Github, Linkedin } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, INTERNSHIPS, CERTIFICATIONS, TECH_STACK } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-[#0e0e1e] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto text-left max-h-[92vh] flex flex-col">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080812]/95 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-lavender-300">
              CURRICULUM VITAE // AMEENA_SHERIN.PDF
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-slate-200 border border-white/10 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-lavender-400" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 text-slate-200 text-sm print:p-0 print:text-black">
          
          {/* Header */}
          <div className="border-b border-white/10 pb-6 print:border-black">
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white print:text-black">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-sm font-medium text-lavender-300 print:text-gray-800 mt-1">
              {PERSONAL_INFO.rolePrefix} {PERSONAL_INFO.roleTitle}
            </p>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {PERSONAL_INFO.supportingRoles.join(' • ')}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-slate-400 font-mono print:text-gray-700">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-lavender-400 print:hidden" />
                {PERSONAL_INFO.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-lavender-400 print:hidden" />
                {PERSONAL_INFO.links.emailRaw}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Github className="w-3.5 h-3.5 text-lavender-400 print:hidden" />
                github.com/ameena-sherin
              </span>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-lavender-400 font-semibold mb-3 flex items-center gap-2 print:text-black">
              <GraduationCap className="w-4 h-4 print:hidden" />
              <span>Education</span>
            </h2>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 print:bg-transparent print:border-black">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-white print:text-black">
                    Bachelor of Technology in Computer Science &amp; Engineering
                  </h3>
                  <p className="text-xs text-slate-300 print:text-gray-800">
                    AWH Engineering College, Kozhikode, Kerala
                  </p>
                </div>
                <span className="text-xs font-mono text-lavender-300 font-semibold print:text-black">
                  Class of 2028
                </span>
              </div>
            </div>
          </div>

          {/* Internships & Work Experience */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-lavender-400 font-semibold mb-3 flex items-center gap-2 print:text-black">
              <Briefcase className="w-4 h-4 print:hidden" />
              <span>Industry Internships</span>
            </h2>
            <div className="space-y-3">
              {INTERNSHIPS.map((exp) => (
                <div key={exp.id} className="p-4 rounded-xl bg-black/40 border border-white/5 print:border-gray-300">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <span className="font-bold text-white text-sm print:text-black">{exp.title}</span>
                      <span className="text-slate-400 text-xs block print:text-gray-700">{exp.company} • {exp.location}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 print:text-black">{exp.period}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-light print:text-gray-800 mt-1">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-lavender-400 font-semibold mb-3 flex items-center gap-2 print:text-black">
              <Award className="w-4 h-4 print:hidden" />
              <span>Featured Portfolio Projects</span>
            </h2>
            <div className="space-y-3">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-black/40 border border-white/5 print:border-gray-300">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-white text-sm print:text-black">{proj.title}</span>
                    <span className="text-[11px] font-mono text-lavender-300 print:text-gray-700">
                      {proj.technologies.slice(0, 4).join(' • ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-light print:text-gray-800">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Technologies */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-lavender-400 font-semibold mb-3 flex items-center gap-2 print:text-black">
              <Code2 className="w-4 h-4 print:hidden" />
              <span>Tech Stack &amp; Design Competencies</span>
            </h2>
            <div className="flex flex-wrap gap-2 text-xs">
              {TECH_STACK.map((item) => (
                <span
                  key={item.id}
                  className="px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-lavender-200 font-mono"
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-lavender-400 font-semibold mb-3 flex items-center gap-2 print:text-black">
              <Award className="w-4 h-4 print:hidden" />
              <span>Certifications &amp; Achievements (13 Verified)</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.id} className="p-2.5 rounded-lg bg-black/40 border border-white/5 print:border-gray-300">
                  <span className="font-semibold text-white block print:text-black">{cert.title}</span>
                  <span className="text-[11px] text-slate-400 print:text-gray-700">{cert.issuer}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
