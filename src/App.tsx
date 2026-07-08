/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Language, ActiveSection, CarListing, RentalCar, CarCarePricing } from './types';
import { translations } from './translations';
import { initialVehicles, initialRentals, initialCarCarePrices } from './initialData';

import Header from './components/Header';
import Footer from './components/Footer';
import SoftwareSection from './components/SoftwareSection';
import TradeSection from './components/TradeSection';
import AutomotiveSection from './components/AutomotiveSection';
import AdminPanel from './components/AdminPanel';
import LocationsSection from './components/LocationsSection';
import CarCareSection from './components/CarCareSection';
import CarRentalSection from './components/CarRentalSection';
import StaticPagesModal from './components/StaticPagesModal';
import CorporateSections from './components/CorporateSections';

import { Cpu, Landmark, Car, ArrowUpRight, ShieldCheck, Sparkles, ChevronDown, Key, Building2, Globe2, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PageHeroProps {
  image: string;
  deptLabel: string;
  title: string;
  description: string;
  isRTL: boolean;
  highlights?: string[];
}

function PageHero({ image, deptLabel, title, description, isRTL, highlights = [] }: PageHeroProps) {
  return (
    <div className="relative h-80 sm:h-[440px] w-full overflow-hidden rounded-sm border border-white/10 mb-10 flex flex-col justify-end bg-[#0A0A0A]">
      <img 
        src={image} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/30"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-[#0A0A0A]/20 to-transparent"></div>
      
      <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-4xl" style={{ textAlign: isRTL ? 'right' : 'left' }}>
        <span className="inline-block text-xs font-mono uppercase text-[#C5A059] tracking-[0.2em] font-semibold mb-4 bg-[#C5A059]/10 border border-[#C5A059]/20 px-3 py-1 rounded-sm">
          {deptLabel}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-tight font-medium mb-4">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-white/60 max-w-2xl leading-relaxed font-sans">
          {description}
        </p>
        {highlights.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-6" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            {highlights.map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 text-xs text-white/70 bg-white/5 border border-white/10 px-3 py-1.5 rounded-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');
  const [listings, setListings] = useState<CarListing[]>([]);
  const [rentals, setRentals] = useState<RentalCar[]>([]);
  const [carCarePrices, setCarCarePrices] = useState<CarCarePricing>(initialCarCarePrices);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [activeStaticPage, setActiveStaticPage] = useState<'privacy' | 'terms' | 'imprint' | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Load state databases from localStorage on startup, fallback to high-end initial data
  useEffect(() => {
    // 1. Vehicle Listings - Ultra resilient parsing and migration
    const saved = localStorage.getItem('kocakint_listings_db');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const migrated = parsed.map(car => {
            const hasImageUrls = Array.isArray(car.imageUrls);
            const hasDescriptionObj = car.description && typeof car.description === 'object';
            return {
              ...car,
              id: car.id || `car-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              title: car.title || 'Untitled Luxury Asset',
              make: car.make || 'Custom',
              model: car.model || 'Spec',
              year: Number(car.year) || new Date().getFullYear(),
              price: Number(car.price) || 0,
              currency: car.currency || 'EUR',
              mileage: car.mileage || '0 km',
              fuelType: car.fuelType || 'Gasoline',
              transmission: car.transmission || 'Automatic',
              imageUrl: car.imageUrl || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
              imageUrls: hasImageUrls ? car.imageUrls : [car.imageUrl || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'],
              status: car.status === 'sold' ? 'sold' : 'available',
              description: hasDescriptionObj ? car.description : {
                en: car.description || car.title || '',
                de: car.description || car.title || '',
                ar: car.description || car.title || '',
                tr: car.description || car.title || ''
              },
              specs: Array.isArray(car.specs) ? car.specs : []
            };
          });
          setListings(migrated);
          localStorage.setItem('kocakint_listings_db', JSON.stringify(migrated));
        } else {
          setListings(initialVehicles);
          localStorage.setItem('kocakint_listings_db', JSON.stringify(initialVehicles));
        }
      } catch (e) {
        console.error("Resilient load failed, falling back to original assets:", e);
        setListings(initialVehicles);
        localStorage.setItem('kocakint_listings_db', JSON.stringify(initialVehicles));
      }
    } else {
      setListings(initialVehicles);
      localStorage.setItem('kocakint_listings_db', JSON.stringify(initialVehicles));
    }

    // 2. Rental Fleet
    const savedRentals = localStorage.getItem('kocakint_rentals_db');
    if (savedRentals) {
      try {
        setRentals(JSON.parse(savedRentals) as RentalCar[]);
      } catch (e) {
        setRentals(initialRentals);
      }
    } else {
      setRentals(initialRentals);
      localStorage.setItem('kocakint_rentals_db', JSON.stringify(initialRentals));
    }

    // 3. Car Care Prices
    const savedCarCare = localStorage.getItem('kocakint_carcare_prices_db');
    if (savedCarCare) {
      try {
        setCarCarePrices(JSON.parse(savedCarCare) as CarCarePricing);
      } catch (e) {
        setCarCarePrices(initialCarCarePrices);
      }
    } else {
      setCarCarePrices(initialCarCarePrices);
      localStorage.setItem('kocakint_carcare_prices_db', JSON.stringify(initialCarCarePrices));
    }

    // Recover admin session if active
    const adminActive = sessionStorage.getItem('kocakint_admin_session');
    if (adminActive === 'true') {
      setIsAdminLoggedIn(true);
    }

    // Hash & Pathname routing listener for direct access (e.g. /admin or /#admin)
    const handleHashChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#admin' || hash === '#/admin' || path === '/admin' || path.endsWith('/admin')) {
        setActiveSection('admin');
      } else if (hash === '#software' || path === '/software' || path.endsWith('/software')) {
        setActiveSection('software');
      } else if (hash === '#trade' || path === '/trade' || path.endsWith('/trade')) {
        setActiveSection('trade');
      } else if (hash === '#automotive' || path === '/automotive' || path.endsWith('/automotive')) {
        setActiveSection('automotive');
      } else if (hash === '#carcare' || path === '/carcare' || path.endsWith('/carcare')) {
        setActiveSection('carcare');
      } else if (hash === '#rental' || path === '/rental' || path.endsWith('/rental')) {
        setActiveSection('rental');
      } else if (hash === '#home' || !hash) {
        setActiveSection('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Force play ambient video when home page is active
  useEffect(() => {
    if (activeSection === 'home' && videoRef.current) {
      const playVideo = async () => {
        try {
          if (videoRef.current) {
            videoRef.current.muted = true;
            await videoRef.current.play();
          }
        } catch (err) {
          console.log('Autoplay forced playback helper triggered:', err);
        }
      };
      playVideo();
      // Schedule a second attempt to bypass initial react mounting lock
      const timer = setTimeout(playVideo, 800);
      return () => clearTimeout(timer);
    }
  }, [activeSection]);

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

  // Sync rentals changes back to localStorage
  const saveRentals = (updatedRentals: RentalCar[]) => {
    setRentals(updatedRentals);
    localStorage.setItem('kocakint_rentals_db', JSON.stringify(updatedRentals));
  };

  // Add rental car
  const handleAddRental = (newRentalData: Omit<RentalCar, 'id'>) => {
    const newRental: RentalCar = {
      id: `rental-${Date.now()}`,
      ...newRentalData
    };
    const updated = [newRental, ...rentals];
    saveRentals(updated);
  };

  // Update rental car
  const handleUpdateRental = (updatedRental: RentalCar) => {
    const updated = rentals.map((r) => (r.id === updatedRental.id ? updatedRental : r));
    saveRentals(updated);
  };

  // Delete rental car
  const handleDeleteRental = (id: string) => {
    const confirmDelete = window.confirm(
      currentLang === 'de' 
        ? 'Sind Sie sicher, dass Sie dieses Mietfahrzeug löschen möchten?' 
        : currentLang === 'ar'
        ? 'هل أنت متأكد من رغبتك في حذف هذه السيارة المستأجرة؟'
        : 'Are you sure you want to delete this rental car?'
    );
    if (confirmDelete) {
      const updated = rentals.filter((r) => r.id !== id);
      saveRentals(updated);
    }
  };

  // Save Car Care prices
  const handleUpdateCarCarePrices = (updatedPrices: CarCarePricing) => {
    setCarCarePrices(updatedPrices);
    localStorage.setItem('kocakint_carcare_prices_db', JSON.stringify(updatedPrices));
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
      color: 'border-white/10 hover:border-[#3b82f6]/40',
      badgeColor: 'bg-[#3b82f6]/10 text-[#60a5fa] border border-[#3b82f6]/20',
      accent: '#3b82f6',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      tag: '01 / SYSTEM ARCHITECTURE',
      services: ['Enterprise SaaS', 'AI / ML Integration', 'Cloud Infrastructure']
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
      color: 'border-white/10 hover:border-[#f59e0b]/40',
      badgeColor: 'bg-[#f59e0b]/10 text-[#fbbf24] border border-[#f59e0b]/20',
      accent: '#f59e0b',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      tag: '02 / SINO-GERMAN & ARAB RELATIONS',
      services: ['Customs Clearance', 'Freight Logistics', 'Trade Compliance']
    },
    {
      id: 'automotive' as const,
      icon: Car,
      title: t.navAutomotive, // "Automotive Listings"
      subtitle: 'Berlin ⇄ Dubai Sourcing',
      desc: currentLang === 'de'
        ? 'Direktbezug aus Deutschland, Exportlogistik und Luxusfahrzeugvermittlung.'
        : currentLang === 'ar'
        ? 'تأمين مباشر للسيارات الفاخرة، والواسطة، وخدمات النقل العابرة للقارات.'
        : 'Tier-1 German auto sourcing, luxury fleet brokerage, and unified GCC-EU shipping coordination.',
      color: 'border-white/10 hover:border-[#C5A059]/40',
      badgeColor: 'bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20',
      accent: '#C5A059',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      tag: '03 / PRESTIGE AUTOMOTIVE LEDGER',
      services: ['Vehicle Sourcing', 'Import / Export', 'Fleet Brokerage']
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
      color: 'border-white/10 hover:border-[#10b981]/40',
      badgeColor: 'bg-[#10b981]/10 text-[#34d399] border border-[#10b981]/20',
      accent: '#10b981',
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80',
      tag: '04 / NANOTECH COATINGS & DETAIL',
      services: ['PPF Protection', 'Ceramic Coating', 'Premium Detailing']
    },
    {
      id: 'rental' as const,
      icon: Key,
      title: t.navRental,
      subtitle: 'Elite Prestige Fleet',
      desc: currentLang === 'de'
        ? 'Exklusive Vermietung von Supersportwagen und Luxus-SUVs mit oder ohne Chauffeur.'
        : currentLang === 'ar'
        ? 'تأجير السيارات الرياضية الفارهة وسيارات الدفع الرباعي الفاخرة مع خيار القيادة الذاتية أو سائق خاص.'
        : 'Elite sports exotics and commanding prestige SUVs. Sourced globally, available for self-drive or executive chauffeur.',
      color: 'border-white/10 hover:border-[#8b5cf6]/40',
      badgeColor: 'bg-[#8b5cf6]/10 text-[#a78bfa] border border-[#8b5cf6]/20',
      accent: '#8b5cf6',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      tag: '05 / EXOTIC TRANSIT MANAGEMENT',
      services: ['Supercar Rental', 'Chauffeur Service', 'Event Fleet']
    }
  ];

  const renderDivisionFooter = (currentId: string) => {
    const nextDivs = [
      { id: 'home', title: t.navHome, desc: currentLang === 'de' ? 'Zurück zur Startseite.' : currentLang === 'ar' ? 'العودة إلى الصفحة الرئيسية.' : 'Return to corporate consortium hub.' },
      { id: 'software', title: t.navSoftware, desc: currentLang === 'de' ? 'Maßgeschneiderte Software und KI-Engineering.' : currentLang === 'ar' ? 'برمجيات مخصصة وهندسة الذكاء الاصطناعي.' : 'Custom enterprise software and AI engineering.' },
      { id: 'trade', title: t.navTrade, desc: currentLang === 'de' ? 'Internationale Beziehungen & Außenhandel.' : currentLang === 'ar' ? 'العلاقات الدولية والتجارة والامتثال.' : 'Seamless transnational logistics & compliance.' },
      { id: 'automotive', title: t.navAutomotive, desc: currentLang === 'de' ? 'Fahrzeugvermittlung & Import-Export.' : currentLang === 'ar' ? 'وساطة السيارات الفاخرة واللوجستيات.' : 'Premium German & GCC vehicle sourcing.' },
      { id: 'carcare', title: t.navCarCare, desc: currentLang === 'de' ? 'Fahrzeugpflege & Lackschutz-Zentrum.' : currentLang === 'ar' ? 'العناية بالسيارات وحماية الطلاء.' : 'Prestige detailing & PPF shield services.' },
      { id: 'rental', title: t.navRental, desc: currentLang === 'de' ? 'Exklusive Sportwagen-Vermietung.' : currentLang === 'ar' ? 'تأجير السيارات الرياضية والفاخرة.' : 'Prestige exotic rentals & chauffeured transit.' }
    ].filter(item => item.id !== currentId).slice(0, 3);

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
              {/* Hero Banner */}
              <div className="relative min-h-[85vh] flex items-center overflow-hidden border-b border-white/10" id="hero-banner">
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <video
                    ref={videoRef}
                    src="/videos/hero-video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-55"
                    onCanPlay={(e) => {
                      e.currentTarget.play().catch((err) => console.log('Video autoplay failed:', err));
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-[#0A0A0A]/70 pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/40 pointer-events-none"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20 sm:py-28">
                  <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 bg-[#111111]/80 backdrop-blur-sm border border-white/10 rounded-sm px-4 py-2 text-xs font-mono text-[#C5A059] mb-8 uppercase tracking-widest">
                      <Building2 className="w-4 h-4" />
                      <span>Berlin & Dubai · Est. 2009</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-white leading-[1.1] mb-6">
                      {t.heroTitle}
                    </h1>

                    <p className="text-base sm:text-lg text-white/65 leading-relaxed font-sans max-w-2xl mb-10">
                      {t.heroSubtitle}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mb-12">
                      <a
                        href="#divisions-overview"
                        className="bg-[#C5A059] hover:bg-[#b08e4f] text-black font-semibold text-xs uppercase tracking-widest py-3.5 px-10 rounded-sm transition-all shadow-lg"
                      >
                        {t.exploreDivisions}
                      </a>
                      <a
                        href="#locations-section"
                        className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-xs uppercase tracking-widest py-3.5 px-10 rounded-sm transition-all"
                      >
                        {t.getInTouch}
                      </a>
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm text-white/50">
                      <div className="flex items-center gap-2">
                        <Globe2 className="w-4 h-4 text-[#C5A059]" />
                        <span>EU & GCC Operations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#C5A059]" />
                        <span>5 Business Divisions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                        <span>ISO · GDPR · DMCC</span>
                      </div>
                    </div>
                  </div>
                </div>

                <a href="#corporate-stats" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/30 hover:text-[#C5A059] transition-colors">
                  <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
                  <ChevronDown className="w-5 h-5 animate-scroll-hint" />
                </a>
              </div>

              {/* Corporate content sections */}
              <CorporateSections currentLang={currentLang} onSectionChange={handleSectionChange} />

              {/* Corporate Divisions */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-b border-white/5" id="divisions-overview">
                <div className="mb-16">
                  <span className="section-label">Corporate Portfolio</span>
                  <div className="gold-accent-line" />
                  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                    <div>
                      <h2 className="section-title">Kocakint Business Divisions</h2>
                      <p className="section-subtitle mt-4">
                        {currentLang === 'de' 
                          ? 'Fünf spezialisierte Geschäftsbereiche unter einem Dach — von Enterprise-Software bis zur Premium-Automobilvermittlung.' 
                          : currentLang === 'ar' 
                          ? 'خمسة قطاعات أعمال متخصصة تحت سقف واحد — من برمجيات المؤسسات إلى وساطة السيارات الفاخرة.' 
                          : currentLang === 'tr'
                          ? 'Tek çatı altında beş uzmanlaşmış iş kolu — kurumsal yazılımdan premium otomotiv brokerliğine.'
                          : 'Five specialized business divisions under one roof — from enterprise software to premium automotive brokerage.'}
                      </p>
                    </div>
                    <div className="flex items-center gap-6 text-sm shrink-0">
                      <div className="text-center">
                        <p className="corp-stat-value text-2xl">5</p>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">Divisions</p>
                      </div>
                      <div className="w-px h-10 bg-white/10" />
                      <div className="text-center">
                        <p className="corp-stat-value text-2xl">2</p>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">Hubs</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {divisionFeatures.map((div, idx) => {
                    const DivIcon = div.icon;
                    const isEven = idx % 2 === 0;
                    return (
                      <motion.div 
                        key={div.id}
                        id={`division-card-${div.id}`}
                        onClick={() => handleSectionChange(div.id)}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="group corp-card corp-card-hover overflow-hidden cursor-pointer grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 md:min-h-[380px]"
                      >
                        <div className={`md:col-span-5 lg:col-span-5 relative h-64 md:h-full overflow-hidden bg-[#0A0A0A] ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                           <img 
                            src={div.image} 
                            alt={div.title}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                            referrerPolicy="no-referrer"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#111111] via-[#111111]/30 to-transparent ${isEven ? '' : 'md:bg-gradient-to-l'}`}></div>
                          <div className="absolute top-0 left-0 w-full h-1 transition-all duration-500" style={{ backgroundColor: div.accent }}></div>
                          <div className="absolute bottom-5 left-5 font-mono text-[10px] tracking-widest bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-sm border border-white/10 text-white/70">
                            {div.tag}
                          </div>
                        </div>

                        <div className={`md:col-span-7 lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between ${isEven ? 'md:order-2' : 'md:order-1'}`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
                          <div>
                            <div className="flex items-center gap-3 mb-5" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                              <div className="p-3 rounded-sm bg-[#0A0A0A] border border-white/10">
                                <DivIcon className="w-5 h-5" style={{ color: div.accent }} />
                              </div>
                              <span className="text-xs font-mono tracking-wider uppercase font-semibold" style={{ color: div.accent }}>{div.subtitle}</span>
                            </div>
                            
                            <h3 className="text-2xl sm:text-3xl font-serif text-white group-hover:text-[#C5A059] transition-colors mb-4">
                              {div.title}
                            </h3>
                            
                            <p className="text-sm text-white/55 leading-relaxed mb-6">
                              {div.desc}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                              {div.services.map((service, sIdx) => (
                                <span key={sIdx} className="text-xs text-white/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-sm">
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-5 border-t border-white/10">
                            <span className="text-xs font-semibold text-[#C5A059] uppercase tracking-wider group-hover:translate-x-1 transition-transform inline-flex items-center gap-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                              {currentLang === 'de' ? 'Portal betreten' : currentLang === 'ar' ? 'دخول البوابة' : currentLang === 'tr' ? 'Portala Git' : 'Enter Division Portal'}
                              <ArrowUpRight className="w-4 h-4" />
                            </span>
                            <span className="text-[10px] font-mono text-white/25 uppercase">0{idx + 1}</span>
                          </div>
                        </div>
                      </motion.div>
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

              {/* Elegant Section Hero Image */}
              <PageHero 
                image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80"
                deptLabel={
                  currentLang === 'de' ? 'Abteilung 01 · Berlin Tech Hub' :
                  currentLang === 'ar' ? 'القسم ٠١ · مركز برلين للتكنولوجيا' :
                  currentLang === 'tr' ? 'Bölüm 01 · Berlin Teknoloji Merkezi' :
                  'Division 01 · Berlin Tech Hub'
                }
                title={t.navSoftware}
                description={
                  currentLang === 'de' ? 'Führende Softwarearchitektur, tiefgehende KI-Modellintegrationen und hochperformante, ausfallsichere Cloud-Infrastrukturen.' :
                  currentLang === 'ar' ? 'الريادة في بنيات البرمجيات للمؤسسات، نماذج الذكاء الاصطناعي، وتكامل البنى السحابية القوية.' :
                  'Enterprise-grade software architectures, specialized AI/ML model deployment, and highly resilient cloud orchestration.'
                }
                highlights={['GDPR Compliant', '99.99% SLA', 'AI / ML Ready']}
                isRTL={isRTL}
              />

              <div className="corp-card p-6 sm:p-10">
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

              {/* Elegant Section Hero Image */}
              <PageHero 
                image="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80"
                deptLabel={
                  currentLang === 'de' ? 'Abteilung 02 · Internationale Beziehungen' :
                  currentLang === 'ar' ? 'القسم ٠٢ · العلاقات الدولية' :
                  currentLang === 'tr' ? 'Bölüm 02 · Uluslararası İlişkiler' :
                  'Division 02 · International Relations'
                }
                title={t.navTrade}
                description={
                  currentLang === 'de' ? 'Zertifizierter Außenhandel, Zollabfertigung und interkontinentale Lieferketten für nahtlose transnationale Logistik.' :
                  currentLang === 'ar' ? 'تسهيل التجارة العالمية المتوافقة مع شنغن، التخليص الجمركي الدبلوماسي الآمن، وممرات الشحن متعددة الوسائط عالية الكفاءة.' :
                  'Schengen-compliant global trade facilitation, secure diplomatic customs clearance, and high-efficiency multimodal shipping corridors.'
                }
                highlights={['€82M+ Volume', 'Schengen ⇄ GCC', '12 Global Ports']}
                isRTL={isRTL}
              />

              <div className="corp-card p-6 sm:p-10">
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

              {/* Elegant Section Hero Image */}
              <PageHero 
                image="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=80"
                deptLabel={
                  currentLang === 'de' ? 'Abteilung 03 · Fahrzeugbeschaffung' :
                  currentLang === 'ar' ? 'القسم ٠٣ · تأمين أساطيل السيارات الفاخرة' :
                  currentLang === 'tr' ? 'Bölüm 03 · Araç Tedarik' :
                  'Division 03 · Prestige Fleet Acquisitions'
                }
                title={t.navAutomotive}
                description={
                  currentLang === 'de' ? 'Direktbezug aus Deutschland, Exportlogistik und Luxusfahrzeugvermittlung optimiert für GCC- und EU-Spezifikationen.' :
                  currentLang === 'ar' ? 'تأمين عابر للقارات لأساطيل السيارات الألمانية الفاخرة، والسيارات الرياضية النادرة، والتنسيق الجمركي بين الاتحاد الأوروبي والخليج العربي.' :
                  'Continental sourcing of premium German automotive fleets, luxury exotic sports cars, and customs coordination for EU-GCC corridors.'
                }
                highlights={['German Sourcing', 'EU ⇄ GCC Transit', 'Premium Fleet']}
                isRTL={isRTL}
              />

              <div className="corp-card p-6 sm:p-10">
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

              {/* Elegant Section Hero Image */}
              <PageHero 
                image="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1600&q=80"
                deptLabel={
                  currentLang === 'de' ? 'Abteilung 04 · Lackschutz-Laboratorien' :
                  currentLang === 'ar' ? 'القسم ٠٤ · مختبرات حماية الطلاء' :
                  currentLang === 'tr' ? 'Bölüm 04 · Boya Koruma Laboratuvarları' :
                  'Division 04 · Prestige Shield Labs'
                }
                title={t.navCarCare}
                description={
                  currentLang === 'de' ? 'Chirurgisch präzise Montage von Lackschutzfolie (PPF) und hydrophobe High-Gloss PPG Glaskeramik-Versiegelung der nächsten Generation.' :
                  currentLang === 'ar' ? 'تطبيق أفلام حماية الطلاء (PPF) ذات المعالجة الذاتية ودروع السيراميك والزجاج المائي PPG عالية اللمعان والمقاومة للمياه.' :
                  'Surgical-grade Paint Protection Film (PPF) application and next-generation high-gloss PPG hydrophobic glass/ceramic armor.'
                }
                highlights={['Self-Healing PPF', 'Ceramic Coating', 'Premium Detailing']}
                isRTL={isRTL}
              />

              <div className="corp-card p-6 sm:p-10">
                <CarCareSection currentLang={currentLang} pricingData={carCarePrices} />
              </div>

              {/* Portal Footer Navigator */}
              {renderDivisionFooter('carcare')}
            </motion.div>
          )}

          {activeSection === 'rental' && (
            <motion.div
              key="rental"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              id="rental-page-view"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
            >
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-xs font-mono mb-8 text-white/40" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <button onClick={() => handleSectionChange('home')} className="hover:text-white transition-colors">{t.navHome.toUpperCase()}</button>
                <span>/</span>
                <span className="text-[#C5A059]">{t.navRental.toUpperCase()}</span>
              </div>

              {/* Elegant Section Hero Image */}
              <PageHero 
                image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80"
                deptLabel={
                  currentLang === 'de' ? 'Abteilung 05 · Prestige-Vermietung' :
                  currentLang === 'ar' ? 'القسم ٠٥ · تأجير السيارات الفارهة' :
                  currentLang === 'tr' ? 'Bölüm 05 · Lüks Araç Kiralama' :
                  'Division 05 · Prestige Fleet Rentals'
                }
                title={t.navRental}
                description={
                  currentLang === 'de' ? 'Erleben Sie unübertroffene Leistung und exquisite Ingenieurskunst mit unserer Flotte modernster Supersportwagen und Luxus-SUVs.' :
                  currentLang === 'ar' ? 'استمتع بأعلى مستويات الرفاهية والأداء الخارق مع أسطولنا الحصري من السيارات الرياضية الخارقة وسيارات الدفع الرباعي الفاخرة.' :
                  'Experience unrivaled high-performance and exquisite automotive engineering with our hand-selected fleet of supercars and elite luxury SUVs.'
                }
                highlights={['Supercar Fleet', 'Chauffeur Service', 'Self-Drive Available']}
                isRTL={isRTL}
              />

              <div className="corp-card p-6 sm:p-10">
                <CarRentalSection currentLang={currentLang} rentals={rentals} />
              </div>

              {/* Portal Footer Navigator */}
              {renderDivisionFooter('rental')}
            </motion.div>
          )}

          {activeSection === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
            >
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-xs font-mono mb-8 text-white/40" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <button onClick={() => handleSectionChange('home')} className="hover:text-white transition-colors">{t.navHome.toUpperCase()}</button>
                <span>/</span>
                <span className="text-[#C5A059]">ADMIN LEDGER GATEWAY</span>
              </div>

              {/* Elegant Section Hero Image */}
              <PageHero 
                image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80"
                deptLabel={
                  currentLang === 'de' ? 'Kern-Infrastruktur · Sicherheitsregister' :
                  currentLang === 'ar' ? 'البنية التحتية · سجل الأمان' :
                  currentLang === 'tr' ? 'Altyapı · Güvenlik Kaydı' :
                  'Core Infrastructure · Security Registry'
                }
                title="Consortium Registry Control"
                description={
                  currentLang === 'de' ? 'Anmeldung für autorisiertes Personal erforderlich. Operations-Dashboard zum Veröffentlichen, Synchronisieren oder Archivieren von Fahrzeugen.' :
                  currentLang === 'ar' ? 'مطلوب صلاحيات الموظفين المعتمدين فقط. لوحة تحكم لإضافة وتعديل وحذف أصول السيارات للكونسورتيوم.' :
                  'Authorized personnel credentials required. Operations dashboard to publish, synchronize, or archive corporate vehicle assets.'
                }
                highlights={['Secure Access', 'Asset Management', 'Multi-Division']}
                isRTL={isRTL}
              />

              <AdminPanel
                currentLang={currentLang}
                listings={listings}
                onAddCar={handleAddCar}
                onUpdateCar={handleUpdateCar}
                onDeleteCar={handleDeleteCar}
                rentals={rentals}
                onAddRental={handleAddRental}
                onUpdateRental={handleUpdateRental}
                onDeleteRental={handleDeleteRental}
                carCarePrices={carCarePrices}
                onUpdateCarCarePrices={handleUpdateCarCarePrices}
                isLoggedIn={isAdminLoggedIn}
                onLoginSuccess={handleAdminLogin}
                onLogout={handleAdminLogout}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Dynamic Footer Component */}
      <Footer currentLang={currentLang} onOpenStaticPage={(page) => setActiveStaticPage(page)} onSectionChange={handleSectionChange} />

      {/* Static Info Legal Pages */}
      <StaticPagesModal
        isOpen={!!activeStaticPage}
        page={activeStaticPage}
        onClose={() => setActiveStaticPage(null)}
        currentLang={currentLang}
      />
    </div>
  );
}
