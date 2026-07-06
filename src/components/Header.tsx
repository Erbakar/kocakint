/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ActiveSection, Language } from '../types';
import { translations } from '../translations';
import { Globe, Settings, ShieldAlert, Menu, X, Landmark, Cpu, Car, Home, Sparkles, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
  isAdminLoggedIn: boolean;
  onLogout: () => void;
}

export default function Header({
  currentLang,
  onLangChange,
  activeSection,
  onSectionChange,
  isAdminLoggedIn,
  onLogout
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const t = translations[currentLang];
  const isRTL = t.dir === 'rtl';

  const navItems = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'software', label: t.navSoftware, icon: Cpu },
    { id: 'trade', label: t.navTrade, icon: Landmark },
    { id: 'automotive', label: t.navAutomotive, icon: Car },
    { id: 'carcare', label: t.navCarCare, icon: Sparkles },
    { id: 'rental', label: t.navRental, icon: Key }
  ] as const;

  const handleNavClick = (sectionId: ActiveSection) => {
    onSectionChange(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 text-white shadow-xl" id="kocakint-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand area */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')} id="header-brand-logo">
            <div className="w-10 h-10 border-2 border-[#C5A059] flex items-center justify-center rotate-45 mr-1 ml-1 transition-transform hover:rotate-135 duration-500">
              <span className="-rotate-45 font-serif text-xl font-bold text-[#C5A059]">K</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif tracking-widest uppercase text-white font-medium">
                {t.brandName}
              </span>
              <span className="text-[9px] font-mono tracking-[0.25em] text-[#C5A059] uppercase">
                berlin &bull; dubai
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }} id="desktop-nav">
            <div className="flex items-center space-x-1 lg:space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? 'text-[#C5A059]'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabGlow"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A059]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <IconComponent className="w-3.5 h-3.5 opacity-80" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Language Switcher */}
            <div className={`flex items-center border-l border-white/15 pl-4 ml-4 ${isRTL ? 'border-r border-l-0 pr-4 mr-4 border-white/15' : ''}`} style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }} id="lang-switcher">
              <Globe className="w-4 h-4 text-white/30 mr-2 ml-2" />
              <div className="flex gap-3 text-[11px] font-bold">
                {(['en', 'de', 'ar', 'tr'] as const).map((lang) => (
                  <button
                    key={lang}
                    id={`lang-btn-${lang}`}
                    onClick={() => onLangChange(lang)}
                    className={`uppercase tracking-widest cursor-pointer transition-all ${
                      currentLang === lang
                        ? 'text-[#C5A059]'
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Admin status indicator badge */}
            {isAdminLoggedIn && (
              <div className="flex items-center gap-2 bg-[#111111] border border-[#C5A059]/30 text-[#C5A059] px-3 py-1.5 rounded text-xs font-mono ml-4 animate-fadeIn" id="admin-badge">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></span>
                Admin
                <button 
                  onClick={onLogout} 
                  className="hover:underline text-[10px] text-white/60 ml-1 font-sans border-l border-white/15 pl-1.5"
                >
                  Logout
                </button>
              </div>
            )}
          </nav>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center gap-3">
            {/* Simple Mobile Lang Trigger */}
            <div className="flex gap-2.5 px-3 py-1 bg-[#111] rounded border border-white/10">
              {(['en', 'de', 'ar', 'tr'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLangChange(lang)}
                  className={`text-[10px] font-bold uppercase transition-all ${
                    currentLang === lang
                      ? 'text-[#C5A059]'
                      : 'text-white/40'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/60 hover:text-white rounded hover:bg-[#111]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0A0A0A] border-t border-white/10 px-4 py-4"
            id="mobile-drawer"
          >
            <div className="space-y-2 flex flex-col">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-item-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-3 rounded text-xs uppercase tracking-widest transition-all duration-200 flex items-center gap-3 ${
                      isActive
                        ? 'bg-[#111111] text-[#C5A059] border-l-2 border-[#C5A059]'
                        : 'text-white/60 hover:text-white hover:bg-[#111111]/50'
                    }`}
                    style={{ textAlign: isRTL ? 'right' : 'left', flexDirection: isRTL ? 'row-reverse' : 'row' }}
                  >
                    <IconComponent className="w-4 h-4 opacity-75" />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {isAdminLoggedIn && (
                <div className="flex items-center justify-between bg-[#111] border border-[#C5A059]/20 text-[#C5A059] p-3 rounded text-xs font-mono mt-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></span>
                    Admin Active
                  </div>
                  <button onClick={onLogout} className="bg-red-950/40 text-red-200 px-2 py-1 rounded text-[10px] hover:bg-red-900/50">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
