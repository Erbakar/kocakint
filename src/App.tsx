/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, ActiveSection, CarListing } from './types';
import { translations } from './translations';
import { initialVehicles } from './initialData';

import Header from './components/Header';
import Footer from './components/Footer';
import SoftwareSection from './components/SoftwareSection';
import TradeSection from './components/TradeSection';
import AutomotiveSection from './components/AutomotiveSection';
import AdminPanel from './components/AdminPanel';
import LocationsSection from './components/LocationsSection';
import CarCareSection from './components/CarCareSection';

import { Cpu, Landmark, Car, ArrowUpRight, ShieldCheck, Sparkles, Star, Anchor, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');
  const [listings, setListings] = useState<CarListing[]>([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Load listings from localStorage on startup, fallback to high-end initialVehicles
  useEffect(() => {
    const saved = localStorage.getItem('kocakint_listings_db');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CarListing[];
        const needsUpdate = parsed.some(car => !car.imageUrls || car.imageUrls.length < 5);
        if (needsUpdate) {
          setListings(initialVehicles);
          localStorage.setItem('kocakint_listings_db', JSON.stringify(initialVehicles));
        } else {
          setListings(parsed);
        }
      } catch (e) {
        setListings(initialVehicles);
      }
    } else {
      setListings(initialVehicles);
      localStorage.setItem('kocakint_listings_db', JSON.stringify(initialVehicles));
    }

    // Recover admin session if active
    const adminActive = sessionStorage.getItem('kocakint_admin_session');
    if (adminActive === 'true') {
      setIsAdminLoggedIn(true);
    }

    // Hash routing listener for direct access (e.g. /#admin)
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin' || hash === '#/admin') {
        setActiveSection('admin');
      } else if (hash === '#software') {
        setActiveSection('software');
      } else if (hash === '#trade') {
        setActiveSection('trade');
      } else if (hash === '#automotive') {
        setActiveSection('automotive');
      } else if (hash === '#carcare') {
        setActiveSection('carcare');
      } else if (hash === '#home' || !hash) {
        setActiveSection('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Sync listings changes back to localStorage
  const saveListings = (updatedListings: CarListing[]) => {
    setListings(updatedListings);
    localStorage.setItem('kocakint_listings_db', JSON.stringify(updatedListings));
  };

  // Add listing
  const handleAddCar = (newCarData: Omit<CarListing, 'id'>) => {
    const newCar: CarListing = {
      id: `car-${Date.now()}`,
      ...newCarData
    };
    const updated = [newCar, ...listings];
    saveListings(updated);
  };

  // Update listing (and mark as Sold toggle)
  const handleUpdateCar = (updatedCar: CarListing) => {
    const updated = listings.map((car) => (car.id === updatedCar.id ? updatedCar : car));
    saveListings(updated);
  };

  // Delete listing
  const handleDeleteCar = (id: string) => {
    const confirmDelete = window.confirm(
      currentLang === 'de' 
        ? 'Sind Sie sicher, dass Sie dieses Inserat löschen möchten?' 
        : currentLang === 'ar'
        ? 'هل أنت متأكد من رغبتك في حذف هذا الإعلان؟'
        : 'Are you sure you want to delete this listing from the ledger?'
    );
    if (confirmDelete) {
      const updated = listings.filter((car) => car.id !== id);
      saveListings(updated);
    }
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    sessionStorage.setItem('kocakint_admin_session', 'true');
    setActiveSection('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('kocakint_admin_session');
    setActiveSection('home');
  };

  const handleSectionChange = (section: ActiveSection) => {
    setActiveSection(section);
    window.location.hash = section === 'home' ? '' : `#${section}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = translations[currentLang];
  const isRTL = t.dir === 'rtl';

  // Division highlights for the Home Page
  const divisionFeatures = [
    {
      id: 'software' as const,
      icon: Cpu,
      title: t.navSoftware, // "Software Technologies"
      subtitle: 'Berlin, Germany Hub',
      desc: currentLang === 'de' 
        ? 'Führende Softwarearchitektur, künstliche Intelligenz und hochskalierbare Cloud-Infrastrukturen.'
        : currentLang === 'ar'
        ? 'الريادة في بنيات البرمجيات للمؤسسات، نماذج الذكاء الاصطناعي، وتكامل البنى السحابية القوية.'
        : 'Leading enterprise software design, deep machine learning integration, and high-performance cloud mesh systems.',
      color: 'border-white/10 hover:border-[#C5A059]/40',
      badgeColor: 'bg-[#C5A059]/10 text-[#C5A059]'
    },
    {
      id: 'trade' as const,
      icon: Landmark,
      title: t.navTrade, // "International Relations"
      subtitle: 'Schengen ⇄ GCC Logistics',
      desc: currentLang === 'de'
        ? 'Zertifizierter Außenhandel, Zollabfertigung und interkontinentale Lieferketten.'
        : currentLang === 'ar'
        ? 'إدارة التوريد والجمارك واللوجستيات عبر الحدود بين الاتحاد الأوروبي ودول مجلس التعاون الخليجي.'
        : 'Sovereign-cleared foreign commerce, multimodal freight routing, and trade compliance brokerage.',
      color: 'border-white/10 hover:border-[#C5A059]/40',
      badgeColor: 'bg-[#C5A059]/10 text-[#C5A059]'
    },
    {
      id: 'automotive' as const,
      icon: Car,
      title: t.navAutomotive, // "Automotive Listings"
      subtitle: 'Berlin ⇄ Dubai Sourcing',
      desc: currentLang === 'de'
        ? 'Direktbezug aus Deutschland, Exportlogistik und Luxusfahrzeugvermittlung.'
        : currentLang === 'ar'
        ? 'تأمين مباشر للسيارات الفاخرة، والوساطة، وخدمات النقل العابرة للقارات.'
        : 'Tier-1 German auto sourcing, luxury fleet brokerage, and unified GCC-EU shipping coordination.',
      color: 'border-white/10 hover:border-[#C5A059]/40',
      badgeColor: 'bg-[#C5A059]/10 text-[#C5A059]'
    },
    {
      id: 'carcare' as const,
      icon: Sparkles,
      title: t.navCarCare, // "Car Care"
      subtitle: 'Premium Protection',
      desc: currentLang === 'de'
        ? 'Präziser Lackschutz, hochmoderne PPF-Folierung und ultra-schonende Handwäsche für Luxusfahrzeuge.'
        : currentLang === 'ar'
        ? 'حماية طلاء فائقة الدقة، غسيل يدوي ممتاز، وتركيب أفلام PPF الذاتية المعالجة لأرقى السيارات.'
        : 'Surgical-grade self-healing Paint Protection Film (PPF) wraps and ultra-premium detailing workflows.',
      color: 'border-white/10 hover:border-[#C5A059]/40',
      badgeColor: 'bg-[#C5A059]/10 text-[#C5A059]'
    }
  ];

  const renderDivisionFooter = (currentId: string) => {
    const nextDivs = [
      { id: 'home', title: t.navHome, desc: currentLang === 'de' ? 'Zurück zur Startseite.' : currentLang === 'ar' ? 'العودة إلى الصفحة الرئيسية.' : 'Return to corporate consortium hub.' },
      { id: 'software', title: t.navSoftware, desc: currentLang === 'de' ? 'Maßgeschneiderte Software und KI-Engineering.' : currentLang === 'ar' ? 'برمجيات مخصصة وهندسة الذكاء الاصطناعي.' : 'Custom enterprise software and AI engineering.' },
      { id: 'trade', title: t.navTrade, desc: currentLang === 'de' ? 'Internationale Beziehungen & Außenhandel.' : currentLang === 'ar' ? 'العلاقات الدولية والتجارة والامتثال.' : 'Seamless transnational logistics & compliance.' },
      { id: 'automotive', title: t.navAutomotive, desc: currentLang === 'de' ? 'Fahrzeugvermittlung & Import-Export.' : currentLang === 'ar' ? 'وساطة السيارات الفاخرة واللوجستيات.' : 'Premium German & GCC vehicle sourcing.' }
    ].filter(item => item.id !== currentId);

    return (
      <div className="mt-16 pt-12 border-t border-white/10" id="division-footer-nav">
        <h4 className="text-xs font-mono text-[#C5A059] uppercase tracking-widest mb-6 font-bold text-center">
          {currentLang === 'de' ? 'Kocakint Konsortium Navigieren' : currentLang === 'ar' ? 'تصفح كوكاكينت كونسورتيوم' : 'Navigate Kocakint Consortium'}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {nextDivs.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSectionChange(item.id as ActiveSection)}
              className="bg-[#111111] hover:bg-[#151515] border border-white/10 hover:border-[#C5A059]/30 rounded-sm p-5 text-left transition-all group flex flex-col justify-between cursor-pointer"
              style={{ textAlign: isRTL ? 'right' : 'left' }}
            >
              <div>
                <span className="text-[10px] font-mono text-white/40 group-hover:text-[#C5A059]/80 transition-colors uppercase font-bold">
                  {currentLang === 'de' ? 'Erkunden' : currentLang === 'ar' ? 'استكشاف' : 'Explore'}
                </span>
                <h5 className="text-sm font-serif text-white group-hover:text-[#C5A059] mt-1 transition-colors">{item.title}</h5>
                <p className="text-xs text-white/40 mt-1 font-sans leading-relaxed">{item.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-[#C5A059] mt-4 opacity-60 group-hover:opacity-100 transition-opacity" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <span>{currentLang === 'de' ? 'Portal ansehen' : currentLang === 'ar' ? 'عرض البوابة' : 'View Portal'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'} 
      className={`min-h-screen bg-[#0A0A0A] text-[#E0E0E0] flex flex-col justify-between selection:bg-[#C5A059] selection:text-black ${
        isRTL ? 'font-serif' : 'font-sans'
      }`}
      id="kocakint-root"
    >
      {/* Dynamic Header Component */}
      <Header
        currentLang={currentLang}
        onLangChange={setCurrentLang}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogout={handleAdminLogout}
      />

      {/* Main Content Router */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {activeSection === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              id="home-page-view"
            >
              {/* Hero Banner Grid */}
              <div className="relative py-16 sm:py-24 overflow-hidden border-b border-white/10" id="hero-banner">
                {/* Dynamic futuristic grid background design */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50"></div>
                <div className="absolute top-20 left-10 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                  
                  {/* Small tag */}
                  <div className="inline-flex items-center gap-1.5 bg-[#111111] border border-white/10 rounded-full px-3.5 py-1 text-xs font-mono text-[#C5A059] mb-6">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-spin" style={{ animationDuration: '10s' }} />
                    <span>Berlin • Dubai Corporate Consortium</span>
                  </div>

                  {/* Main Header */}
                  <h1 className="text-4xl sm:text-6xl font-serif tracking-normal text-white max-w-4xl mx-auto leading-[1.15]">
                    {t.heroTitle}
                  </h1>

                  <p className="text-base sm:text-lg text-white/60 mt-6 max-w-2xl mx-auto leading-relaxed font-sans">
                    {t.heroSubtitle}
                  </p>

                  {/* Actions row */}
                  <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                    <a
                      href="#divisions-overview"
                      className="bg-[#C5A059] hover:bg-[#b08e4f] text-black font-semibold text-xs uppercase tracking-widest py-3 px-8 rounded-sm transition-all shadow-md active:translate-y-0.5"
                    >
                      {t.exploreDivisions}
                    </a>
                    <a
                      href="#locations-section"
                      className="bg-transparent hover:bg-white/5 border border-white/20 text-white font-semibold text-xs uppercase tracking-widest py-3 px-8 rounded-sm transition-all flex items-center gap-1.5"
                    >
                      <span>{t.getInTouch}</span>
                    </a>
                  </div>

                </div>
              </div>

              {/* Dynamic Corporate Divisions Grid */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-b border-white/5" id="divisions-overview">
                <div className="text-center max-w-xl mx-auto mb-16">
                  <span className="text-xs font-bold font-mono text-[#C5A059] uppercase tracking-[0.2em] block mb-2">Corporate Portfolio</span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">Kocakint Business Divisions</h2>
                  <p className="text-xs text-white/50 mt-2">
                    {currentLang === 'de' 
                      ? 'Wählen Sie einen Geschäftsbereich aus, um das jeweilige Portal zu betreten.' 
                      : currentLang === 'ar' 
                      ? 'اختر قطاعاً تجارياً للدخول إلى البوابة المخصصة له.' 
                      : 'Select a business division below to enter its dedicated operational portal.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {divisionFeatures.map((div) => {
                    const DivIcon = div.icon;
                    return (
                      <div 
                        key={div.id}
                        id={`division-card-${div.id}`}
                        onClick={() => handleSectionChange(div.id)}
                        className="group bg-[#111111] border border-white/10 hover:border-[#C5A059]/40 rounded-sm p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_4px_30px_rgba(197,160,89,0.03)] cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            <div className="p-3.5 rounded-sm bg-[#0A0A0A] border border-white/10 text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-black group-hover:border-[#C5A059] transition-all duration-300">
                              <DivIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold">{div.subtitle}</span>
                          </div>
                          
                          <h3 className="text-xl font-serif text-white group-hover:text-[#C5A059] transition-colors mb-4">
                            {div.title}
                          </h3>
                          
                          <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-sans mb-8">
                            {div.desc}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-mono text-[#C5A059] tracking-wider uppercase font-semibold group-hover:translate-x-1.5 transition-transform" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          <span>{currentLang === 'de' ? 'Portal betreten' : currentLang === 'ar' ? 'دخول البوابة' : 'Enter Division Portal'}</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Geographic Office Locations block in Home */}
              <LocationsSection currentLang={currentLang} />

            </motion.div>
          )}

          {activeSection === 'software' && (
            <motion.div
              key="software"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              id="software-page-view"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
            >
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-xs font-mono mb-8 text-white/40" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <button onClick={() => handleSectionChange('home')} className="hover:text-white transition-colors">{t.navHome.toUpperCase()}</button>
                <span>/</span>
                <span className="text-[#C5A059]">{t.navSoftware.toUpperCase()}</span>
              </div>

              {/* Dedicated Page View Content */}
              <div className="bg-[#111111]/30 border border-white/5 rounded-sm p-4 sm:p-8 backdrop-blur-sm shadow-2xl">
                <SoftwareSection currentLang={currentLang} />
              </div>

              {/* Portal Footer Navigator */}
              {renderDivisionFooter('software')}
            </motion.div>
          )}

          {activeSection === 'trade' && (
            <motion.div
              key="trade"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              id="trade-page-view"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
            >
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-xs font-mono mb-8 text-white/40" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <button onClick={() => handleSectionChange('home')} className="hover:text-white transition-colors">{t.navHome.toUpperCase()}</button>
                <span>/</span>
                <span className="text-[#C5A059]">{t.navTrade.toUpperCase()}</span>
              </div>

              {/* Dedicated Page View Content */}
              <div className="bg-[#111111]/30 border border-white/5 rounded-sm p-4 sm:p-8 backdrop-blur-sm shadow-2xl">
                <TradeSection currentLang={currentLang} />
              </div>

              {/* Portal Footer Navigator */}
              {renderDivisionFooter('trade')}
            </motion.div>
          )}

          {activeSection === 'automotive' && (
            <motion.div
              key="automotive"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              id="automotive-page-view"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
            >
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-xs font-mono mb-8 text-white/40" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <button onClick={() => handleSectionChange('home')} className="hover:text-white transition-colors">{t.navHome.toUpperCase()}</button>
                <span>/</span>
                <span className="text-[#C5A059]">{t.navAutomotive.toUpperCase()}</span>
              </div>

              {/* Dedicated Page View Content */}
              <div className="bg-[#111111]/30 border border-white/5 rounded-sm p-4 sm:p-8 backdrop-blur-sm shadow-2xl">
                <AutomotiveSection currentLang={currentLang} listings={listings} />
              </div>

              {/* Portal Footer Navigator */}
              {renderDivisionFooter('automotive')}
            </motion.div>
          )}

          {activeSection === 'carcare' && (
            <motion.div
              key="carcare"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              id="carcare-page-view"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
            >
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-xs font-mono mb-8 text-white/40" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <button onClick={() => handleSectionChange('home')} className="hover:text-white transition-colors">{t.navHome.toUpperCase()}</button>
                <span>/</span>
                <span className="text-[#C5A059]">{t.navCarCare.toUpperCase()}</span>
              </div>

              {/* Dedicated Page View Content */}
              <div className="bg-[#111111]/30 border border-white/5 rounded-sm p-4 sm:p-8 backdrop-blur-sm shadow-2xl">
                <CarCareSection currentLang={currentLang} />
              </div>

              {/* Portal Footer Navigator */}
              {renderDivisionFooter('carcare')}
            </motion.div>
          )}

          {activeSection === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <AdminPanel
                currentLang={currentLang}
                listings={listings}
                onAddCar={handleAddCar}
                onUpdateCar={handleUpdateCar}
                onDeleteCar={handleDeleteCar}
                isLoggedIn={isAdminLoggedIn}
                onLoginSuccess={handleAdminLogin}
                onLogout={handleAdminLogout}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Dynamic Footer Component */}
      <Footer currentLang={currentLang} />
    </div>
  );
}
