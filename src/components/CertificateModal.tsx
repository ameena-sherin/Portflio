import React from 'react';
import { X, Award, CheckCircle2, Calendar, MapPin, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { Internship, CertificationItem } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  internship?: Internship | null;
  certification?: CertificationItem | null;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  internship,
  certification,
}) => {
  if (!isOpen || (!internship && !certification)) return null;

  const title = internship
    ? internship.certificateDetails.title
    : certification?.title;
  const issuer = internship
    ? internship.certificateDetails.issuer
    : certification?.issuer;
  const period = internship
    ? internship.certificateDetails.period
    : 'Verified Credential';
  const description = internship
    ? internship.certificateDetails.description
    : certification?.description;
  const skills = internship
    ? internship.certificateDetails.skillsLearned
    : certification?.skills || [];
  const category = internship ? 'Internship Credential' : certification?.category;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#14142b] via-[#0d0d1e] to-[#080812] border border-lavender-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/60 z-10 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-accentPink-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Frame Content */}
        <div className="relative border border-lavender-500/20 rounded-2xl p-6 sm:p-8 bg-black/40 backdrop-blur-md">
          {/* Top Emblem */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-lavender-600 to-accentPink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-lavender-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Credential • {category}
                </span>
                <h3 className="text-xl font-bold text-white font-display mt-0.5">
                  {issuer}
                </h3>
              </div>
            </div>
          </div>

          {/* Certificate Title */}
          <div className="mb-6">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
              Presented to:
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-lavender-200 to-accentPink-200 font-display">
              AMEENA SHERIN
            </div>
            <div className="text-sm text-lavender-300 font-mono mt-1">
              B.Tech Computer Science Engineering • Creative UI/UX Designer
            </div>
          </div>

          {/* Awarded Subject */}
          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 mb-6">
            <div className="text-xs font-mono text-lavender-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-accentPink-400" />
              Course / Program Title:
            </div>
            <div className="text-lg font-bold text-white font-display">
              {title}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Timeline & Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5">
              <Calendar className="w-4 h-4 text-lavender-400 shrink-0" />
              <span>Timeline: {period}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Status: Authenticated & Completed</span>
            </div>
          </div>

          {/* Skills Acquired */}
          {skills && skills.length > 0 && (
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                Key Competencies & Modules:
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 border border-purple-500/30 text-lavender-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer Validation Signature */}
          <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Record ID: AS-CERT-{Math.floor(Math.random() * 89999 + 10000)}</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
