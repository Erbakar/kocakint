/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Clock, MapPin, Phone, Mail, Globe2, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import LuxuryLogo from './LuxuryLogo';

interface FooterProps {
  currentLang: Language;
  onOpenStaticPage: (page: 'privacy' | 'terms' | 'imprint') => void;
}

export default function Footer({ currentLang, onOpenStaticPage }: FooterProps) {
  const t = translations[currentLang];
  const isRTL = t.dir === 'rtl';

  const [times, setTimes] = useState({
    berlin: '',
    dubai: ''
  });

  useEffect(() => {
    const updateTimes = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };

      try {
        const berlinTime = new Date().toLocaleTimeString('en-US', { ...options, timeZone: 'Europe/Berlin' });
        const dubaiTime = new Date().toLocaleTimeString('en-US', { ...options, timeZone: 'Asia/Dubai' });
        setTimes({ berlin: berlinTime, dubai: dubaiTime });
      } catch (err) {
        // Fallback if system doesn't support specific timezones
        const now = new Date();
        setTimes({
          berlin: now.toLocaleTimeString('en-US', options),
          dubai: now.toLocaleTimeString('en-US', options)
        });
      }
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  // Structural JSON-LD schema for SEO & GEO compliance
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Conglomerate",
    "name": "Kocakint",
    "url": "https://kocakint.com",
    "logo": "https://kocakint.com/assets/logo.png",
    "description": "Kocakint.com - Leading Global Hub for Software Architecture, Strategic International Trade, and Premium Automotive Brokerage.",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+49 (0) 30 5201 4930",
        "contactType": "European Operations - Berlin",
        "areaServed": "EU",
        "availableLanguage": ["German", "English", "Turkish"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+971 (0) 4 395 2840",
        "contactType": "Middle East & Asia - Dubai",
        "areaServed": "GCC",
        "availableLanguage": ["Arabic", "English", "Turkish"]
      }
    ],
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Symeonstraße 10",
        "addressLocality": "Berlin",
        "postalCode": "12279",
        "addressCountry": "Germany"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Business Bay, One Central Tower",
        "addressLocality": "Dubai",
        "addressRegion": "Dubai",
        "addressCountry": "United Arab Emirates"
      }
    ]
  };

  return (
    <footer className="bg-[#050505] border-t border-white/10 text-white/70 py-8 px-4 sm:px-6 lg:px-8 font-sans" id="kocakint-footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <LuxuryLogo size={36} />
              <div className="flex flex-col">
                <span className="text-lg font-serif uppercase tracking-widest">
                  <span className="text-white font-extrabold">KOCAK</span>
                  <span className="text-[#C5A059] font-light">INT</span>
                </span>
                <span className="text-[8px] text-white/40 tracking-wider font-mono">BERLIN &bull; DUBAI</span>
              </div>
              <span className="text-[10px] bg-[#C5A059]/10 text-[#C5A059] px-2 py-0.5 rounded-sm border border-[#C5A059]/25 uppercase tracking-wider font-semibold self-center ml-2">GLOBAL HUB</span>
            </div>
            <p className="text-xs leading-relaxed text-white/50 max-w-sm">
              {t.tagline}
            </p>
            <div className="space-y-1 pt-1">
              <div className="flex items-center gap-2 text-xs text-[#C5A059]">
                <Globe2 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="tracking-widest">kocakint.com</span>
              </div>
            </div>
          </div>

          {/* Regional Office Coordinates */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C5A059]">{t.activeOffices}</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Berlin Office */}
              <div className="bg-[#111111] p-3.5 rounded-sm border border-white/10 hover:border-white/20 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#C5A059]" /> Berlin, DE
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[10px] text-[#C5A059] bg-[#C5A059]/10 px-1.5 py-0.5 rounded">
                    <Clock className="w-3 h-3 animate-spin" style={{ animationDuration: '8s' }} />
                    {times.berlin || 'Loading...'}
                  </span>
                </div>
                <p className="text-[11px] text-white/40 mb-2 font-mono">Symeonstraße 10, 12279 Berlin</p>
                <div className="flex flex-col gap-1 text-[11px]">
                  <a href="tel:+493052014930" className="hover:text-[#C5A059] text-white/60 transition-all">
                    +49 (0) 30 5201 4930
                  </a>
                </div>
              </div>

              {/* Dubai Office */}
              <div className="bg-[#111111] p-3.5 rounded-sm border border-white/10 hover:border-white/20 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#C5A059]" /> Dubai, UAE
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[10px] text-[#C5A059] bg-[#C5A059]/10 px-1.5 py-0.5 rounded">
                    <Clock className="w-3 h-3 animate-spin" style={{ animationDuration: '8s' }} />
                    {times.dubai || 'Loading...'}
                  </span>
                </div>
                <p className="text-[11px] text-white/40 mb-2 font-mono">Business Bay, One Central, Dubai</p>
                <div className="flex flex-col gap-1 text-[11px]">
                  <a href="tel:+97143952840" className="hover:text-[#C5A059] text-white/60 transition-all">
                    +971 (0) 4 395 2840
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Lower Banner */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-white/40 text-center sm:text-left" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <span>&copy; {new Date().getFullYear()} {t.brandName}. {t.footerRights}</span>
            <span className="hidden sm:inline text-white/10">|</span>
            <span className="flex items-center gap-1 justify-center sm:justify-start">
              {currentLang === 'de' ? 'Entwickelt von' : currentLang === 'ar' ? 'تم التطوير بواسطة' : 'Developed by'}{' '}
              <a 
                href="https://data212.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#C5A059] hover:text-[#e0b96e] transition-colors font-semibold inline-flex items-center gap-0.5 underline decoration-[#C5A059]/30 hover:decoration-[#C5A059]"
              >
                data212
              </a>
            </span>
          </div>
          <div className="flex items-center gap-6 text-white/40" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <button onClick={() => onOpenStaticPage('privacy')} className="hover:text-[#C5A059] transition-colors text-xs font-medium cursor-pointer bg-transparent border-none p-0 outline-none">
              {currentLang === 'de' ? 'Datenschutzerklärung' : currentLang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </button>
            <button onClick={() => onOpenStaticPage('terms')} className="hover:text-[#C5A059] transition-colors text-xs font-medium cursor-pointer bg-transparent border-none p-0 outline-none">
              {currentLang === 'de' ? 'Allgemeine Geschäftsbedingungen' : currentLang === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
            </button>
            <button onClick={() => onOpenStaticPage('imprint')} className="hover:text-[#C5A059] transition-colors text-xs font-medium cursor-pointer bg-transparent border-none p-0 outline-none">
              {currentLang === 'de' ? 'Impressum' : currentLang === 'ar' ? 'بيانات الناشر' : 'Imprint / Impressum'}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
