"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#080B12] text-white overflow-x-hidden relative" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900;1,9..40,300&family=Playfair+Display:wght@700;900&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes borderRotate {
          from { --angle: 0deg; }
          to { --angle: 360deg; }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float2 { animation: float2 8s ease-in-out infinite 1s; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-fade-up { animation: fadeUp 0.7s ease-out forwards; }
        .animate-fade-up-delay-1 { animation: fadeUp 0.7s ease-out 0.15s forwards; opacity: 0; }
        .animate-fade-up-delay-2 { animation: fadeUp 0.7s ease-out 0.3s forwards; opacity: 0; }
        .animate-fade-up-delay-3 { animation: fadeUp 0.7s ease-out 0.45s forwards; opacity: 0; }
        .animate-slide-down { animation: slideDown 0.3s ease-out forwards; }
        .animate-ping-slow { animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }

        .shimmer-text {
          background: linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6, #60a5fa);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 60px -10px rgba(96, 165, 250, 0.15);
        }

        .noise-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        .glow-blue {
          box-shadow: 0 0 40px rgba(96, 165, 250, 0.25), 0 0 80px rgba(96, 165, 250, 0.1);
        }
        .glow-button:hover {
          box-shadow: 0 0 30px rgba(96, 165, 250, 0.5);
        }

        .grid-bg {
          background-image: 
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .service-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(96,165,250,0.3), transparent, rgba(167,139,250,0.2));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .whatsapp-btn {
          animation: float2 4s ease-in-out infinite;
        }
      `}</style>

      {/* Cursor glow follower */}
      <div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 opacity-[0.06] blur-[80px] bg-blue-500 transition-all duration-300"
        style={{ left: mousePos.x - 192, top: mousePos.y - 192 }}
      />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918421526195"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-2xl shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
        style={{ boxShadow: '0 8px 32px rgba(37,211,102,0.4)' }}
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

      {/* Navigation */}
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#080B12]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <nav className="flex items-center justify-between px-5 py-4 max-w-7xl mx-auto">
          <Link href="/">
            <div className="flex items-center gap-2.5 group cursor-pointer">
              <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center bg-blue-600 shadow-lg" style={{ boxShadow: '0 0 16px rgba(96,165,250,0.5)' }}>
                <img src="/icon.png" alt="Stack&Scale" className="w-full h-full object-cover" />
              </div>
              <span className="font-black text-xl tracking-tight text-white">
                Stack<span className="text-blue-400">&Scale</span>
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <a href="#services" className="hover:text-white transition-colors duration-200">Services</a>
            <a href="#offer" className="hover:text-white transition-colors duration-200">Special Offer</a>
            <Link href="/contact">
              <button className="ml-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-500 transition-all duration-200 glow-button">
                Contact Us
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-white/60 hover:text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </nav>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="animate-slide-down md:hidden bg-[#0D1117]/95 backdrop-blur-xl border-b border-white/10 py-5 px-6 flex flex-col gap-1 text-sm font-medium">
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-white/60 hover:text-white py-3 border-b border-white/5 transition-colors">Services</a>
            <a href="#offer" onClick={() => setIsMenuOpen(false)} className="text-white/60 hover:text-white py-3 border-b border-white/5 transition-colors">Special Offer</a>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
              <span className="block text-blue-400 font-bold py-3">Contact Us →</span>
            </Link>
          </div>
        )}
      </header>

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pt-24 pb-16 overflow-hidden noise-bg grid-bg">
        
        {/* Background orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/15 rounded-full blur-[80px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Floating decorative elements */}
        <div className="animate-float absolute top-24 right-[10%] w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hidden lg:flex items-center justify-center">
          <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
        </div>
        <div className="animate-float2 absolute bottom-32 left-[8%] w-14 h-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hidden lg:flex items-center justify-center">
          <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
        </div>
        <div className="animate-float absolute top-40 left-[12%] w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 hidden lg:block" />
        <div className="animate-float2 absolute bottom-40 right-[15%] w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 hidden lg:block" />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-xs font-semibold text-blue-300 uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
            </span>
            Ready to launch your business online
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up-delay-1 text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.95]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            We Help Brands
            <br />
            <span className="shimmer-text">Dominate Online.</span>
          </h1>

          <p className="animate-fade-up-delay-2 text-lg sm:text-xl text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            More than a website — a complete digital ecosystem. Custom-built, blazing-fast, and engineered to turn visitors into loyal customers.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <button className="glow-button w-full sm:w-auto bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl text-base hover:bg-blue-500 transition-all duration-300 flex items-center justify-center gap-2 group">
                Start Your Project
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </Link>
            <a href="#offer">
              <button className="w-full sm:w-auto bg-white/5 border border-white/10 text-white font-semibold px-8 py-4 rounded-2xl text-base hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
                View Special Offer
              </button>
            </a>
          </div>

          {/* Social proof strip */}
          <div className="mt-14 flex items-center justify-center gap-8 text-white/30 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              Next.js Powered
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Performance First
            </div>
            <div className="w-px h-4 bg-white/10 hidden sm:block" />
            <div className="items-center gap-2 hidden sm:flex">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              SEO Optimized
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────────── */}
      <section id="services" className="py-24 sm:py-32 relative bg-[#080B12]">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">

          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <p className="text-blue-400 text-sm font-bold uppercase tracking-[0.2em] mb-4">What We Do</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Everything to{' '}
              <span className="shimmer-text">launch and grow.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              We don't just write code. We build complete digital ecosystems that drive real traffic and generate real revenue.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                ),
                color: "blue",
                title: "Custom Web Development",
                desc: "Lightning-fast, responsive websites built with Next.js — designed pixel-perfect on any device and engineered to scale as you grow.",
                tag: "Next.js · TypeScript"
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                ),
                color: "indigo",
                title: "SEO & Digital Marketing",
                desc: "Technical SEO deep-dives and marketing strategies that get you found on Google and convert curious clicks into paying clients.",
                tag: "SEO · Growth · Analytics"
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                ),
                color: "violet",
                title: "Brand Identity",
                desc: "A cohesive, professional visual identity that builds instant trust — from typography and color systems to a UX that converts.",
                tag: "Design · UX · Branding"
              }
            ].map(({ icon, color, title, desc, tag }) => {
              const colorMap: Record<string, { bg: string; text: string; border: string; tagBg: string }> = {
                blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", tagBg: "bg-blue-500/10 text-blue-400" },
                indigo: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20", tagBg: "bg-indigo-500/10 text-indigo-400" },
                violet: { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20", tagBg: "bg-violet-500/10 text-violet-400" }
              };
              const c = colorMap[color];
              return (
                <div key={title} className={`service-card relative p-7 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] card-hover`}>
                  <div className={`w-12 h-12 ${c.bg} ${c.text} rounded-xl flex items-center justify-center mb-6 border ${c.border}`}>
                    {icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                  <p className="text-white/50 leading-relaxed text-sm mb-6">{desc}</p>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${c.tagBg}`}>{tag}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FOUNDING CLIENT OFFER ────────────────────────── */}
      <section id="offer" className="py-24 sm:py-32 bg-[#050710] relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080B12] via-[#050710] to-[#050710]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs uppercase tracking-widest mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
            Limited Launch Offer — 3 Spots Only
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Become a{' '}
            <span className="shimmer-text">Founding Partner.</span>
          </h2>

          <p className="text-lg text-white/50 mb-14 max-w-2xl mx-auto leading-relaxed">
            We're launching our freelance agency and taking on our first three clients at a heavily discounted rate. You get premium, dedicated service for a fraction of standard agency cost.
          </p>

          {/* Card */}
          <div className="relative bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-12 text-left overflow-hidden card-hover">
            {/* Corner glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold text-white">The "First Client" Advantage</h3>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold">
                <span className="text-2xl font-black">3</span> spots left
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              {[
                { emoji: "🎯", title: "VIP Attention", desc: "Your brand gets 100% of our time and code. No cutting corners, ever." },
                { emoji: "⚡", title: "Premium Tech Stack", desc: "Custom Next.js site optimized for Google rankings and mobile performance." },
                { emoji: "💰", title: "Portfolio Pricing", desc: "High-end digital presence at a fraction of standard agency rates." }
              ].map(({ emoji, title, desc }) => (
                <div key={title} className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-blue-500/20 transition-colors duration-300">
                  <div className="text-3xl mb-3">{emoji}</div>
                  <h4 className="font-bold text-white mb-2 text-sm">{title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-8 border-t border-white/5">
              <p className="text-white/40 text-sm">
                Once these 3 spots are filled, this pricing is gone forever.
              </p>
              <Link href="/contact">
                <button className="glow-button w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group text-sm">
                  Claim This Offer
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA / CONNECT ────────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-[#080B12] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-blue-600/8 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left */}
            <div className="text-center lg:text-left">
              <p className="text-blue-400 text-sm font-bold uppercase tracking-[0.2em] mb-5">Let's Build Together</p>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to transform your{' '}
                <span className="shimmer-text">digital presence?</span>
              </h2>
              <p className="text-white/50 text-lg mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Skip the generic templates. Let's build a blazing-fast, custom-coded asset that actually grows your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/contact">
                  <button className="glow-button w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group">
                    Start a Project
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </Link>
                <a href="mailto:hello.stackandscale@gmail.com">
                  <button className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300">
                    Email Us Directly
                  </button>
                </a>
              </div>
            </div>

            {/* Right: Instagram card */}
            <div className="w-full max-w-md mx-auto lg:ml-auto">
              <a
                href="https://www.instagram.com/stack__and__scale?igsh=MWZwbWExb3hkdDdpeQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative p-[1.5px] rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899, #f97316)' }}>
                  <div className="bg-[#0D1117] rounded-[22px] p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0" style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899, #f97316)' }}>
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">@stack__and__scale</p>
                        <p className="text-white/40 text-sm">Follow us on Instagram</p>
                      </div>
                    </div>
                    <p className="text-white/50 leading-relaxed mb-6 text-sm">
                      Digital strategy insights, behind-the-scenes content, and updates from the team. Let's connect.
                    </p>
                    <div className="flex items-center font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300" style={{ color: '#ec4899' }}>
                      Open Instagram
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                  </div>
                </div>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────── */}
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