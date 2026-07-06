/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { MapPin, Phone, Mail, Building, Send, CheckCircle, Clock, Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface LocationsSectionProps {
  currentLang: Language;
}

export default function LocationsSection({ currentLang }: LocationsSectionProps) {
  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    branch: 'berlin',
    msg: ''
  });
  const [success, setSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.msg) return;
    
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setContactForm({ name: '', email: '', branch: 'berlin', msg: '' });
    }, 4500);
  };

  return (
    <section className="py-12 sm:py-16 text-[#E0E0E0] font-sans border-t border-white/10 bg-transparent animate-fadeIn" id="locations-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Intro with Scroll Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-bold font-mono text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/20 px-3 py-1 rounded-sm uppercase tracking-[0.2em]">
            Operational Footprint
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight mt-4 text-white">
            {t.locationsTitle}
          </h2>
          <p className="text-sm text-white/50 mt-2 font-sans">
            {t.locationsSubtitle}
          </p>
        </motion.div>

        {/* Bento Grid layout for Offices with scroll animations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-16">
          
          {/* Berlin Office Detail Card */}
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-12 gap-0 overflow-hidden bg-[#111111] border border-white/10 rounded-sm shadow-2xl relative group hover:border-[#C5A059]/30 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-[#C5A059] z-10"></div>
            
            <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-[10px] font-mono uppercase tracking-widest font-bold px-2.5 py-1 rounded-sm">
                    European HQ
                  </span>
                </div>
                
                <h3 className="text-xl font-serif text-white mb-2 flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#C5A059]" />
                  Berlin Operations Center
                </h3>
                
                <p className="text-xs text-white/40 leading-relaxed font-mono mb-4">
                  Symeonstraße 10, 12279 Berlin, Germany
                </p>

                <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-6 font-sans">
                  {t.berlinSEOText}
                </p>

                <div className="space-y-2.5 text-xs text-white/50 font-mono">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C5A059]/70" />
                    <span>TEL: <a href="tel:+493052014930" className="text-white/70 hover:text-[#C5A059]">+49 (0) 30 5201 4930</a></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#C5A059]/70" />
                    <span>EMAIL: <a href="mailto:berlin@kocakint.com" className="text-white/70 hover:text-[#C5A059]">berlin@kocakint.com</a></span>
                  </div>
                  <div className="flex items-center gap-2 text-[#C5A059] text-[11px] pt-1 font-sans">
                    <Clock className="w-4 h-4" />
                    <span>09:00 - 18:00 (CET) • Mon - Fri</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/30">
                <span className="text-[#C5A059] font-bold uppercase tracking-wider">Schengen Customs hub</span>
              </div>
            </div>

            {/* Berlin Cover Image side */}
            <div className="sm:col-span-5 relative h-48 sm:h-auto min-h-[220px] overflow-hidden bg-[#0A0A0A]">
              <img 
                src="https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&w=800&q=80" 
                alt="Berlin Twilight" 
                className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#111111] via-transparent to-transparent"></div>
              {/* Overlay elements */}
              <div className="absolute bottom-4 right-4 font-mono text-[9px] bg-black/80 px-2 py-1 rounded-sm border border-white/10 text-[#C5A059]/80 flex items-center gap-1">
                <Globe className="w-3 h-3 animate-spin" style={{ animationDuration: '20s' }} />
                <span>52.5200° N, 13.4050° E</span>
              </div>
            </div>
          </motion.div>

          {/* Dubai Office Detail Card */}
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-12 gap-0 overflow-hidden bg-[#111111] border border-white/10 rounded-sm shadow-2xl relative group hover:border-[#C5A059]/30 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-[#C5A059] z-10"></div>
            
            <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-[10px] font-mono uppercase tracking-widest font-bold px-2.5 py-1 rounded-sm">
                    Middle East & Asia HQ
                  </span>
                </div>
                
                <h3 className="text-xl font-serif text-white mb-2 flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#C5A059]" />
                  Dubai Regional Hub
                </h3>
                
                <p className="text-xs text-white/40 leading-relaxed font-mono mb-4">
                  Business Bay, One Central Tower, Dubai, UAE
                </p>

                <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-6 font-sans">
                  {t.dubaiSEOText}
                </p>

                <div className="space-y-2.5 text-xs text-white/50 font-mono">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C5A059]/70" />
                    <span>TEL: <a href="tel:+97143952840" className="text-white/70 hover:text-[#C5A059]">+971 (0) 4 395 2840</a></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#C5A059]/70" />
                    <span>EMAIL: <a href="mailto:dubai@kocakint.com" className="text-white/70 hover:text-[#C5A059]">dubai@kocakint.com</a></span>
                  </div>
                  <div className="flex items-center gap-2 text-[#C5A059] text-[11px] pt-1 font-sans">
                    <Clock className="w-4 h-4" />
                    <span>08:30 - 17:30 (GST) • Mon - Fri</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/30">
                <span className="text-[#C5A059] font-bold uppercase tracking-wider">GCC Customs Union hub</span>
              </div>
            </div>

            {/* Dubai Cover Image side */}
            <div className="sm:col-span-5 relative h-48 sm:h-auto min-h-[220px] overflow-hidden bg-[#0A0A0A]">
              <img 
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80" 
                alt="Dubai Skyline" 
                className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#111111] via-transparent to-transparent"></div>
              {/* Overlay elements */}
              <div className="absolute bottom-4 right-4 font-mono text-[9px] bg-black/80 px-2 py-1 rounded-sm border border-white/10 text-[#C5A059]/80 flex items-center gap-1">
                <Globe className="w-3 h-3 animate-spin" style={{ animationDuration: '20s' }} />
                <span>25.2048° N, 55.2708° E</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Global Branch Inquiry Form with scroll animation */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="bg-[#111111] border border-white/10 rounded-sm p-6 sm:p-8" 
          id="locations-contact"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-5 space-y-4">
              <h3 className="text-lg sm:text-xl font-serif text-white tracking-tight">
                {t.contactTitle}
              </h3>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-sans">
                Connect directly with our regional trade officers or hardware architects. Selected branch receives your message within our localized secure data pipeline.
              </p>
              <div className="text-xs font-mono text-white/30 space-y-1">
                <p>• Berlin office: complies with GDPR strict standard.</p>
                <p>• Dubai office: DMCC corporate routing compliance.</p>
              </div>
            </div>

            <div className="md:col-span-7">
              {success ? (
                <div className="bg-[#111111] border border-[#C5A059]/30 text-[#C5A059] p-6 rounded-sm text-center space-y-2 animate-fadeIn">
                  <CheckCircle className="w-10 h-10 text-[#C5A059] mx-auto" />
                  <p className="text-sm font-serif uppercase tracking-wider font-bold">Message Transmitted Safely</p>
                  <p className="text-xs text-white/60 max-w-sm mx-auto font-sans">{t.contactSuccess}</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input 
                      type="text" 
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder={t.contactPlaceholderName}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C5A059]"
                    />
                    <input 
                      type="email" 
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder={t.contactPlaceholderEmail}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C5A059]"
                    />
                    <select 
                      value={contactForm.branch}
                      onChange={(e) => setContactForm({ ...contactForm, branch: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-3 text-white/80 focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value="berlin">Branch: Berlin, Germany</option>
                      <option value="dubai">Branch: Dubai, UAE</option>
                    </select>
                  </div>
                  
                  <textarea
                    rows={4}
                    required
                    value={contactForm.msg}
                    onChange={(e) => setContactForm({ ...contactForm, msg: e.target.value })}
                    placeholder={t.contactPlaceholderMessage}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C5A059] font-sans"
                  />

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#C5A059] hover:bg-[#b08e4f] text-black font-semibold text-xs uppercase tracking-widest py-3 px-8 rounded-sm transition-all shadow-md flex items-center justify-center gap-1.5 active:translate-y-0.5 cursor-pointer"
                  >
                    <span>{t.contactSubmitBtn}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
