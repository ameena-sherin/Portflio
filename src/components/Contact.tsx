import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Github, Linkedin, Instagram, Sparkles, Heart, AlertCircle, Loader2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('sending');
    setErrorMessage('');

    try {
      // Using Web3Forms — free, no signup required for basic use
      // To receive messages at your email, replace the access_key below
      // with your own from https://web3forms.com (it's free!)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // Replace with your Web3Forms access key
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Portfolio Contact from ${formData.name}`,
          message: formData.message,
          from_name: 'Ameena Sherin Portfolio',
          to: PERSONAL_INFO.links.emailRaw,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 5000);
      } else {
        throw new Error(result.message || 'Something went wrong');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(
        err?.message || 'Failed to send message. Please try email directly.'
      );
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  // Fallback: open mailto if form fails
  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(formData.subject || 'Portfolio Inquiry');
    const body = encodeURIComponent(
      `Hi Ameena,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
    );
    window.open(
      `mailto:${PERSONAL_INFO.links.emailRaw}?subject=${subject}&body=${body}`,
      '_self'
    );
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.links.emailRaw);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-16 sm:py-24 md:py-32 flex flex-col justify-between border-t border-white/5 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-900/15 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-accentPink-500/10 rounded-full blur-[110px] sm:blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full z-20">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="flex items-center gap-2.5 text-xs font-mono font-semibold tracking-widest uppercase text-lavender-400 mb-3">
            <span className="w-6 h-[1.5px] bg-lavender-400" />
            <span>06 // INITIATE COLLABORATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-black text-white tracking-tight leading-tight mb-3 sm:mb-4">
            LET'S CREATE
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-lavender-200 via-purple-300 to-accentPink-300">
              SOMETHING.
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed">
            Have an idea, project, collaboration or opportunity? Let's connect.
          </p>
        </div>

        {/* Contact Grid: Details on Left, Interactive Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start mb-16 sm:mb-24">
          
          {/* Left Column: Direct Info & Social */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
            
            {/* Email Card */}
            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-black/45 border border-white/10 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-purple-500/10 border border-purple-500/25 text-lavender-400">
                  <Mail className="w-4 sm:w-5 h-4 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Direct Email
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white font-mono truncate">
                    {PERSONAL_INFO.links.emailRaw}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 pt-3 border-t border-white/10 text-xs font-mono">
                <a
                  href={PERSONAL_INFO.links.email}
                  className="px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors"
                >
                  Open Mail
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                >
                  {copiedEmail ? '✓ Copied!' : 'Copy Address'}
                </button>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-black/45 border border-white/10 backdrop-blur-xl shadow-xl flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-pink-500/10 border border-pink-500/25 text-accentPink-400 shrink-0">
                <MapPin className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div>
                <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Location
                </div>
                <div className="text-sm sm:text-base font-bold text-white font-display">
                  {PERSONAL_INFO.location}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-mono mt-0.5">
                  Available for Remote &amp; On-Site Sprints
                </div>
              </div>
            </div>

            {/* Social Links Pill Card */}
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-black/45 border border-white/10 backdrop-blur-xl shadow-xl">
              <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-3 sm:mb-4">
                Connect on Social Networks
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                <a
                  href={PERSONAL_INFO.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white text-xs font-mono transition-transform hover:scale-105 active:scale-95"
                >
                  <Github className="w-4 h-4 text-lavender-400" />
                  <span>GitHub</span>
                </a>

                <a
                  href={PERSONAL_INFO.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white text-xs font-mono transition-transform hover:scale-105 active:scale-95"
                >
                  <Linkedin className="w-4 h-4 text-sky-400" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={PERSONAL_INFO.links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white text-xs font-mono transition-transform hover:scale-105 active:scale-95"
                >
                  <Instagram className="w-4 h-4 text-accentPink-400" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-7 md:p-9 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#14142a] via-[#0d0d1e] to-[#080812] border border-lavender-500/30 shadow-2xl shadow-purple-950/50 backdrop-blur-2xl">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-display mb-1">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-5 sm:mb-6 font-mono">
                Fill in your details and I'll respond within 24 hours.
              </p>

              {status === 'success' ? (
                <div className="p-5 sm:p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-start gap-3 animate-slideUp">
                  <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm sm:text-base">Message Sent Successfully!</div>
                    <div className="text-xs sm:text-sm text-emerald-400/80 mt-1">
                      Thank you for reaching out, {formData.name}! I'll get back to you within 24 hours.
                    </div>
                  </div>
                </div>
              ) : status === 'error' ? (
                <div className="flex flex-col gap-3 animate-slideUp">
                  <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-sm">Couldn't Send Message</div>
                      <div className="text-xs text-red-400/80 mt-1">
                        {errorMessage}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleMailtoFallback}
                    className="w-full py-3 rounded-xl bg-purple-600/20 border border-purple-500/30 text-lavender-200 font-mono font-semibold text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-purple-600/30 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>SEND VIA EMAIL APP INSTEAD</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
                  {/* Name & Email in a row on larger screens */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-[10px] sm:text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5 sm:mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-black/50 border border-white/10 focus:border-lavender-400 focus:outline-none text-white text-sm font-sans placeholder-slate-500 transition-colors"
                        disabled={status === 'sending'}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5 sm:mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. sarah@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-black/50 border border-white/10 focus:border-lavender-400 focus:outline-none text-white text-sm font-sans placeholder-slate-500 transition-colors"
                        disabled={status === 'sending'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5 sm:mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. UI/UX Collaboration, Project Inquiry..."
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-black/50 border border-white/10 focus:border-lavender-400 focus:outline-none text-white text-sm font-sans placeholder-slate-500 transition-colors"
                      disabled={status === 'sending'}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5 sm:mb-2">
                      Message / Project Scope *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your product, interface concept, or collaboration..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-black/50 border border-white/10 focus:border-lavender-400 focus:outline-none text-white text-sm font-sans placeholder-slate-500 transition-colors resize-none"
                      disabled={status === 'sending'}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full mt-1 sm:mt-2 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 via-lavender-600 to-accentPink-600 hover:from-purple-500 hover:to-accentPink-500 text-white font-mono font-semibold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-purple-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin-fast" />
                        <span>SENDING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SEND MESSAGE</span>
                      </>
                    )}
                  </button>

                  {/* Alternative: Direct email link */}
                  <div className="text-center pt-2">
                    <span className="text-[10px] sm:text-xs text-slate-500 font-mono">
                      Or email me directly at{' '}
                      <a
                        href={PERSONAL_INFO.links.email}
                        className="text-lavender-400 hover:text-lavender-300 underline underline-offset-2"
                      >
                        {PERSONAL_INFO.links.emailRaw}
                      </a>
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Section 11: Final Character Animation & Thank You Banner */}
        <div className="pt-12 sm:pt-16 pb-8 sm:pb-10 border-t border-white/10 flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-lavender-300 text-[10px] sm:text-xs font-mono mb-4">
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-accentPink-400" />
            <span>Interactive 3D Experience Complete</span>
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-black text-white tracking-tight leading-tight mb-3">
            THANK YOU
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-lavender-200 via-purple-300 to-accentPink-300">
              FOR VISITING.
            </span>
          </h3>

          <div className="text-lg sm:text-xl md:text-2xl font-bold font-display text-white mt-2">
            AMEENA SHERIN
          </div>

          <div className="text-xs sm:text-sm font-mono text-lavender-300 mt-1">
            A Creative UI/UX Designer
          </div>

          <p className="text-[10px] sm:text-xs text-slate-500 font-mono mt-6 sm:mt-8">
            Designed &amp; Developed with React, TypeScript &amp; Three.js • © 2026 Ameena Sherin
          </p>
        </div>

      </div>
    </section>
  );
};
