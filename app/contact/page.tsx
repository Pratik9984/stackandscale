"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "c6e93123-fd49-4c99-bb4e-0e899425a7fc",
          subject: `New Freelance Lead from ${formData.name}`,
          name: formData.name,
          phone: formData.phone,
          email: formData.email || "Not provided",
          message: formData.message || "Not provided",
        }),
      });
      const textData = await response.text();
      try {
        const result = JSON.parse(textData);
        if (result.success) {
          setStatus('success');
          setFormData({ name: '', email: '', phone: '', message: '' });
          setTimeout(() => setStatus('idle'), 6000);
        } else {
          setStatus('idle');
          alert("Something went wrong. Please try again.");
        }
      } catch {
        setStatus('idle');
        alert("Your local network blocked the request. Try a mobile hotspot.");
      }
    } catch {
      setStatus('idle');
      alert("Network connection error. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#080B12] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900&family=Playfair+Display:wght@700;900&display=swap');

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes checkmark {
          from { stroke-dashoffset: 40; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(96,165,250,0.2); }
          50% { box-shadow: 0 0 40px rgba(96,165,250,0.4); }
        }

        .shimmer-text {
          background: linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6, #60a5fa);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .animate-fade-up { animation: fadeUp 0.6s ease-out forwards; }
        .animate-fade-up-1 { animation: fadeUp 0.6s ease-out 0.1s forwards; opacity: 0; }
        .animate-fade-up-2 { animation: fadeUp 0.6s ease-out 0.2s forwards; opacity: 0; }
        .animate-fade-up-3 { animation: fadeUp 0.6s ease-out 0.3s forwards; opacity: 0; }
        .animate-slide-down { animation: slideDown 0.3s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-float { animation: float 5s ease-in-out infinite; }

        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .input-field {
          width: 100%;
          padding: 14px 18px;
          border-radius: 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: white;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .input-field::placeholder { color: rgba(255,255,255,0.25); }
        .input-field:focus {
          border-color: rgba(96,165,250,0.6);
          background: rgba(96,165,250,0.06);
          box-shadow: 0 0 0 3px rgba(96,165,250,0.1);
        }
        .input-field:hover:not(:focus) {
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.06);
        }

        .glow-button {
          transition: all 0.25s ease;
        }
        .glow-button:hover {
          box-shadow: 0 0 30px rgba(96,165,250,0.45);
          transform: translateY(-1px);
        }
        .glow-button:active { transform: translateY(0); }

        .contact-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          transition: border-color 0.25s, background 0.25s, transform 0.25s;
        }
        .contact-card:hover {
          border-color: rgba(96,165,250,0.25);
          background: rgba(96,165,250,0.05);
          transform: translateY(-3px);
        }

        .checkmark-path {
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          animation: checkmark 0.5s ease-out 0.3s forwards;
        }
      `}</style>

      {/* ─── NAV ─────────────────────────────────────── */}
      <header className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        scrolled ? 'bg-[#080B12]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'bg-transparent'
      }`}>
        <nav className="flex items-center justify-between px-5 py-4 max-w-7xl mx-auto">
          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer group">
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-blue-600 shadow-lg" style={{ boxShadow: '0 0 16px rgba(96,165,250,0.5)' }}>
                <img src="/icon.png" alt="Stack&Scale" className="w-full h-full object-cover" />
              </div>
              <span className="font-black text-xl tracking-tight">
                Stack<span className="text-blue-400">&Scale</span>
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <a href="/#services" className="hover:text-white transition-colors">Services</a>
            <a href="/#offer" className="hover:text-white transition-colors">Special Offer</a>
            <Link href="/contact">
              <span className="text-blue-400 font-bold">Contact</span>
            </Link>
          </div>

          <button className="md:hidden p-2 text-white/60 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen
              ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
          </button>
        </nav>

        {isMenuOpen && (
          <div className="animate-slide-down md:hidden bg-[#0D1117]/95 backdrop-blur-xl border-b border-white/10 py-5 px-6 flex flex-col gap-1 text-sm font-medium">
            <a href="/#services" onClick={() => setIsMenuOpen(false)} className="text-white/60 hover:text-white py-3 border-b border-white/5 transition-colors">Services</a>
            <a href="/#offer" onClick={() => setIsMenuOpen(false)} className="text-white/60 hover:text-white py-3 border-b border-white/5 transition-colors">Special Offer</a>
            <span className="text-blue-400 font-bold py-3">Contact</span>
          </div>
        )}
      </header>

      {/* ─── HERO HEADING ────────────────────────────── */}
      <section className="relative pt-36 pb-16 px-5 grid-bg overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-300 text-xs font-bold uppercase tracking-widest mb-7">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            Get in Touch
          </div>
          <h1 className="animate-fade-up-1 text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            Let's build something
            <br />
            <span className="shimmer-text">great together.</span>
          </h1>
          <p className="animate-fade-up-2 text-lg text-white/50 max-w-xl leading-relaxed font-light">
            Whether you're launching a new brand, revamping an old site, or need digital strategy advice — we're here.
          </p>
        </div>
      </section>

      {/* ─── MAIN CONTENT ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 pb-24 relative z-10">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          {/* ── Left: Contact Info ── */}
          <div className="lg:col-span-2 animate-fade-up-2 space-y-5">

            {/* Email */}
            <a href="mailto:hello.stackandscale@gmail.com" className="contact-card flex items-center gap-5 p-5 group">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Email</p>
                <p className="text-white font-semibold text-sm group-hover:text-blue-400 transition-colors break-all">hello.stackandscale@gmail.com</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/918421526195" target="_blank" rel="noopener noreferrer" className="contact-card flex items-center gap-5 p-5 group">
              <div className="w-11 h-11 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              </div>
              <div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">WhatsApp</p>
                <p className="text-white font-semibold text-sm group-hover:text-green-400 transition-colors">+91 84215 26195</p>
              </div>
            </a>

            {/* Hours */}
            <div className="contact-card flex items-center gap-5 p-5">
              <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Hours</p>
                <p className="text-white font-semibold text-sm">Mon – Sat, 9 AM – 6 PM IST</p>
              </div>
            </div>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/stack__and__scale"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card flex items-center gap-5 p-5 group"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-white" style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899, #f97316)', boxShadow: '0 4px 15px rgba(236,72,153,0.25)' }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </div>
              <div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Instagram</p>
                <p className="text-white font-semibold text-sm group-hover:text-pink-400 transition-colors">@stack__and__scale</p>
              </div>
            </a>

            {/* Response time note */}
            <div className="flex items-center gap-3 px-1 pt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <p className="text-white/35 text-sm">We typically respond within a few hours.</p>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="lg:col-span-3 animate-fade-up-3">
            <div className="relative bg-white/[0.03] border border-white/8 rounded-3xl p-7 sm:p-10 overflow-hidden">
              {/* Corner accent */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* ── Success State ── */}
              {status === 'success' && (
                <div className="animate-scale-in absolute inset-0 bg-[#080B12]/97 rounded-3xl flex flex-col items-center justify-center z-20 px-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path className="checkmark-path" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Message Sent!</h3>
                  <p className="text-white/50 leading-relaxed">Thanks for reaching out. We'll get back to you shortly.</p>
                </div>
              )}

              <h2 className="text-xl font-bold text-white mb-8 relative z-10">Send us a message</h2>

              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                {/* Name + Phone row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/50 text-xs font-bold uppercase tracking-wider mb-2.5" htmlFor="name">
                      Name <span className="text-blue-400">*</span>
                    </label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      className="input-field"
                      id="name"
                      type="text"
                      placeholder="Your name or company"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs font-bold uppercase tracking-wider mb-2.5" htmlFor="phone">
                      Phone <span className="text-blue-400">*</span>
                    </label>
                    <input
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      className="input-field"
                      id="phone"
                      type="tel"
                      placeholder="+91 00000 00000"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white/50 text-xs font-bold uppercase tracking-wider mb-2.5" htmlFor="email">
                    Email <span className="text-white/25 font-normal normal-case tracking-normal">(optional)</span>
                  </label>
                  <input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    className="input-field"
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white/50 text-xs font-bold uppercase tracking-wider mb-2.5" htmlFor="message">
                    Tell us about your project <span className="text-white/25 font-normal normal-case tracking-normal">(optional)</span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    className="input-field resize-none"
                    style={{ height: '130px' }}
                    id="message"
                    placeholder="What are your goals or ideas? Any timeline in mind?"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="glow-button w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 group text-base"
                >
                  {status === 'submitting' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </>
                  )}
                </button>

                <p className="text-white/25 text-xs text-center pt-1">
                  No spam. We'll only reach out about your project.
                </p>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────── */}
      <footer className="bg-[#050710] border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-sm">
          <span className="font-black text-xl text-white">Stack<span className="text-blue-400">&Scale</span></span>
          <span>© {new Date().getFullYear()} Stack&Scale. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <a href="mailto:hello.stackandscale@gmail.com" className="hover:text-white transition-colors">Email</a>
            <a href="https://wa.me/918421526195" className="hover:text-white transition-colors">WhatsApp</a>
            <a href="https://www.instagram.com/stack__and__scale" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </main>
  );
}