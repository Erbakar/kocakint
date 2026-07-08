/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ActiveSection, Language } from '../types';
import { translations } from '../translations';
import { Clock, MapPin, Phone, Mail, Globe2, ArrowUpRight, Cpu, Landmark, Car, Sparkles, Key } from 'lucide-react';
import LuxuryLogo from './LuxuryLogo';

interface FooterProps {
  currentLang: Language;
  onOpenStaticPage: (page: 'privacy' | 'terms' | 'imprint') => void;
  onSectionChange?: (section: ActiveSection) => void;
}

export default function Footer({ currentLang, onOpenStaticPage, onSectionChange }: FooterProps) {
  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

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
      } catch {
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

  const divisions = [
    { id: 'software' as const, label: t.navSoftware, icon: Cpu },
    { id: 'trade' as const, label: t.navTrade, icon: Landmark },
    { id: 'automotive' as const, label: t.navAutomotive, icon: Car },
    { id: 'carcare' as const, label: t.navCarCare, icon: Sparkles },
    { id: 'rental' as const, label: t.navRental, icon: Key },
  ];

  const handleNav = (section: ActiveSection) => {
    if (onSectionChange) {
      onSectionChange(section);
    } else {
      window.location.hash = section === 'home' ? '' : `#${section}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-white/10 text-white/70 pt-16 pb-8 px-4 sm:px-6 lg:px-8 font-sans" id="kocakint-footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">
          {/* Brand */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <LuxuryLogo size={40} />
              <div className="flex flex-col">
                <span className="text-xl font-serif uppercase tracking-widest">
                  <span className="text-white font-extrabold">KOCAK</span>
                  <span className="text-[#C5A059] font-light">INT</span>
                </span>
                <span className="text-[9px] text-white/40 tracking-wider font-mono uppercase">Berlin · Dubai</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              {t.tagline}
            </p>
            <div className="flex items-center gap-2 text-sm text-[#C5A059]">
              <Globe2 className="w-4 h-4" />
              <span className="tracking-wide">kocakint.com</span>
            </div>
          </div>

          {/* Divisions */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C5A059] mb-5">
              {currentLang === 'de' ? 'Geschäftsbereiche' : currentLang === 'ar' ? 'قطاعات الأعمال' : currentLang === 'tr' ? 'İş Kolları' : 'Business Divisions'}
            </h3>
            <ul className="space-y-3">
              {divisions.map((div) => {
                const Icon = div.icon;
                return (
                  <li key={div.id}>
                    <button
                      onClick={() => handleNav(div.id)}
                      className="flex items-center gap-2.5 text-sm text-white/50 hover:text-[#C5A059] transition-colors group w-full cursor-pointer bg-transparent border-none p-0"
                      style={{ flexDirection: isRTL ? 'row-reverse' : 'row', textAlign: isRTL ? 'right' : 'left' }}
                    >
                      <Icon className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
                      <span>{div.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Berlin Office */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C5A059] mb-5">
              {currentLang === 'de' ? 'Europa · Berlin' : currentLang === 'ar' ? 'أوروبا · برلين' : currentLang === 'tr' ? 'Avrupa · Berlin' : 'Europe · Berlin'}
            </h3>
            <div className="corp-card p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C5A059]" /> Berlin, DE
                </span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded">
                  <Clock className="w-3 h-3" />
                  {times.berlin || '—'}
                </span>
              </div>
              <p className="text-xs text-white/40 font-mono">Symeonstraße 10, 12279 Berlin</p>
              <a href="tel:+493052014930" className="flex items-center gap-2 text-xs text-white/60 hover:text-[#C5A059] transition-colors">
                <Phone className="w-3.5 h-3.5" /> +49 (0) 30 5201 4930
              </a>
              <a href="mailto:berlin@kocakint.com" className="flex items-center gap-2 text-xs text-white/60 hover:text-[#C5A059] transition-colors">
                <Mail className="w-3.5 h-3.5" /> berlin@kocakint.com
              </a>
            </div>
          </div>

          {/* Dubai Office */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C5A059] mb-5">
              {currentLang === 'de' ? 'Naher Osten · Dubai' : currentLang === 'ar' ? 'الشرق الأوسط · دبي' : currentLang === 'tr' ? 'Orta Doğu · Dubai' : 'Middle East · Dubai'}
            </h3>
            <div className="corp-card p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C5A059]" /> Dubai, UAE
                </span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded">
                  <Clock className="w-3 h-3" />
                  {times.dubai || '—'}
                </span>
              </div>
              <p className="text-xs text-white/40 font-mono">Business Bay, One Central, Dubai</p>
              <a href="tel:+97143952840" className="flex items-center gap-2 text-xs text-white/60 hover:text-[#C5A059] transition-colors">
                <Phone className="w-3.5 h-3.5" /> +971 (0) 4 395 2840
              </a>
              <a href="mailto:dubai@kocakint.com" className="flex items-center gap-2 text-xs text-white/60 hover:text-[#C5A059] transition-colors">
                <Mail className="w-3.5 h-3.5" /> dubai@kocakint.com
              </a>
            </div>
          </div>
        </div>

        {/* Lower Banner */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-5 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-white/40 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} {t.brandName}. {t.footerRights}</span>
            <span className="hidden sm:inline text-white/10">|</span>
            <span>
              {currentLang === 'de' ? 'Entwickelt von' : currentLang === 'ar' ? 'تم التطوير بواسطة' : currentLang === 'tr' ? 'Geliştirici' : 'Developed by'}{' '}
              <a
                href="https://data212.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C5A059] hover:text-[#e0b96e] transition-colors font-semibold"
              >
                data212
              </a>
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 text-white/40">
            <button
              onClick={() => { window.location.hash = '#admin'; }}
              className="hover:text-[#C5A059] text-white/30 border border-white/10 hover:border-[#C5A059]/30 rounded-sm px-3 py-1.5 text-[10px] font-mono transition-all uppercase cursor-pointer"
            >
              {currentLang === 'de' ? 'Admin-Bereich' : currentLang === 'ar' ? 'بوابة المشرف' : currentLang === 'tr' ? 'Yönetici Girişi' : 'Admin Portal'}
            </button>
            <button onClick={() => onOpenStaticPage('privacy')} className="hover:text-[#C5A059] transition-colors cursor-pointer bg-transparent border-none p-0">
              {currentLang === 'de' ? 'Datenschutz' : currentLang === 'ar' ? 'الخصوصية' : currentLang === 'tr' ? 'Gizlilik' : 'Privacy'}
            </button>
            <button onClick={() => onOpenStaticPage('terms')} className="hover:text-[#C5A059] transition-colors cursor-pointer bg-transparent border-none p-0">
              {currentLang === 'de' ? 'AGB' : currentLang === 'ar' ? 'الشروط' : currentLang === 'tr' ? 'Şartlar' : 'Terms'}
            </button>
            <button onClick={() => onOpenStaticPage('imprint')} className="hover:text-[#C5A059] transition-colors cursor-pointer bg-transparent border-none p-0">
              {currentLang === 'de' ? 'Impressum' : currentLang === 'ar' ? 'بيانات الناشر' : currentLang === 'tr' ? 'Künye' : 'Imprint'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
