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

import { Cpu, Landmark, Car, ArrowUpRight, ShieldCheck, Sparkles, Star, Anchor, ChevronDown, Key, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PageHeroProps {
  image: string;
  deptLabel: string;
  title: string;
  description: string;
  isRTL: boolean;
}

function PageHero({ image, deptLabel, title, description, isRTL }: PageHeroProps) {
  return (
    <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-sm border border-white/10 mb-8 flex flex-col justify-end p-6 sm:p-10 bg-[#0A0A0A]">
      <img 
        src={image} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover opacity-25 hover:scale-105 transition-transform duration-10000 ease-out"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/30 to-transparent"></div>
      
      <div className="relative z-10 text-left" style={{ textAlign: isRTL ? 'right' : 'left' }}>
        <span className="text-[10px] font-mono uppercase text-[#C5A059] tracking-[0.25em] font-extrabold block mb-2">
          {deptLabel}
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif text-white leading-tight font-normal">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-white/50 mt-2 font-sans max-w-2xl leading-relaxed">
          {description}
        </p>
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((err) => console.log('Video play error:', err));
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

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
            setIsVideoPlaying(true);
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
      tag: '01 / SYSTEM ARCHITECTURE'
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
      tag: '02 / SINO-GERMAN & ARAB RELATIONS'
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
      tag: '03 / PRESTIGE AUTOMOTIVE LEDGER'
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
      tag: '04 / NANOTECH COATINGS & DETAIL'
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
      tag: '05 / EXOTIC TRANSIT MANAGEMENT'
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
              {/* Hero Banner Grid */}
              <div className="relative py-16 sm:py-24 overflow-hidden border-b border-white/10" id="hero-banner">
                {/* Ambient luxury automotive video loop background */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <video
                    ref={videoRef}
                    src="/videos/hero-video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-50 transition-opacity duration-1000"
                    onCanPlay={(e) => {
                      e.currentTarget.play().catch((err) => console.log('Video autoplay failed:', err));
                    }}
                  />
                  {/* Overlay shadow gradient to maintain text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/35 to-[#0A0A0A] pointer-events-none"></div>
                </div>

              

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

                <div className="space-y-12 sm:space-y-16">
                  {divisionFeatures.map((div, idx) => {
                    const DivIcon = div.icon;
                    const isEven = idx % 2 === 0;
                    return (
                      <motion.div 
                        key={div.id}
                        id={`division-card-${div.id}`}
                        onClick={() => handleSectionChange(div.id)}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="group bg-[#111111] border border-white/10 hover:border-white/20 rounded-sm overflow-hidden transition-all duration-500 hover:shadow-[0_12px_45px_rgba(0,0,0,0.8)] cursor-pointer grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 md:h-[350px] lg:h-[350px]"
                      >
                        {/* Image Column */}
                        <div className={`md:col-span-6 lg:col-span-6 relative h-64 sm:h-80 md:h-full lg:h-full overflow-hidden bg-[#0A0A0A] ${isEven ? 'md:order-1 lg:order-1' : 'md:order-2 lg:order-2'}`}>
                           <img 
                            src={div.image} 
                            alt={div.title}
                            className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-85 transition-all duration-1000 ease-out group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          {/* Rich linear mask for transitions */}
                          <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r lg:bg-gradient-to-r from-[#111111] via-transparent to-transparent ${isEven ? 'md:bg-gradient-to-r lg:bg-gradient-to-r' : 'md:bg-gradient-to-l lg:bg-gradient-to-l'}`}></div>
                          
                          {/* Accent Glow Line inside the image */}
                          <div className="absolute top-0 left-0 w-full h-1 lg:w-1 lg:h-full transition-all duration-500" style={{ backgroundColor: div.accent }}></div>
                          
                          {/* Floating Badge Tag */}
                          <div className="absolute bottom-4 left-4 font-mono text-[9px] tracking-widest bg-black/80 px-2.5 py-1.5 rounded-sm border border-white/10 text-white/50 group-hover:text-white transition-colors">
                            {div.tag}
                          </div>
                        </div>

                        {/* Text Details Column */}
                        <div className={`md:col-span-6 lg:col-span-6 p-6 sm:p-10 md:p-10 lg:p-10 flex flex-col justify-between h-full ${isEven ? 'md:order-2 lg:order-2' : 'md:order-1 lg:order-1'}`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
                          <div>
                            <div className="flex items-center gap-3 mb-6" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                              <div 
                                className="p-3 rounded-sm bg-[#0A0A0A] border border-white/10 transition-all duration-500 group-hover:scale-115 text-white/70"
                                style={{ 
                                  '--hover-accent': div.accent 
                                } as React.CSSProperties}
                              >
                                <DivIcon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: div.accent }} />
                              </div>
                              <div>
                                <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold block" style={{ color: div.accent }}>{div.subtitle}</span>
                                <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Division operational node</span>
                              </div>
                            </div>
                            
                            <h3 className="text-2xl sm:text-3xl font-serif text-white group-hover:text-[#C5A059] transition-colors mb-4 tracking-tight">
                              {div.title}
                            </h3>
                            
                            <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-sans mb-8">
                              {div.desc}
                            </p>
                          </div>

                          <div className="flex items-center gap-2.5 text-xs font-mono text-[#C5A059] tracking-widest uppercase font-bold group-hover:translate-x-2 transition-transform" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                            <span>{currentLang === 'de' ? 'Portal betreten' : currentLang === 'ar' ? 'دخول البوابة' : 'Enter Division Portal'}</span>
                            <ArrowUpRight className="w-4 h-4 text-[#C5A059]" />
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
                  currentLang === 'de' ? 'ABTEILUNG 01 // BERLINER TECH HUB' :
                  currentLang === 'ar' ? 'القسم ٠١ // مركز برلين للتكنولوجيا' :
                  'DEPT_01 // BERLIN TECH HUB'
                }
                title={t.navSoftware}
                description={
                  currentLang === 'de' ? 'Führende Softwarearchitektur, tiefgehende KI-Modellintegrationen und hochperformante, ausfallsichere Cloud-Infrastrukturen.' :
                  currentLang === 'ar' ? 'الريادة في بنيات البرمجيات للمؤسسات، نماذج الذكاء الاصطناعي، وتكامل البنى السحابية القوية.' :
                  'Enterprise-grade software architectures, specialized AI/ML model deployment, and highly resilient cloud orchestration.'
                }
                isRTL={isRTL}
              />

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

              {/* Elegant Section Hero Image */}
              <PageHero 
                image="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80"
                deptLabel={
                  currentLang === 'de' ? 'ABTEILUNG 02 // INTERNATIONALE BEZIEHUNGEN & SCHENGEN' :
                  currentLang === 'ar' ? 'القسم ٠٢ // العلاقات الدولية وممر شنغن' :
                  'DEPT_02 // INTERNATIONAL RELATIONS & SCHENGEN GATEWAY'
                }
                title={t.navTrade}
                description={
                  currentLang === 'de' ? 'Zertifizierter Außenhandel, Zollabfertigung und interkontinentale Lieferketten für nahtlose transnationale Logistik.' :
                  currentLang === 'ar' ? 'تسهيل التجارة العالمية المتوافقة مع شنغن، التخليص الجمركي الدبلوماسي الآمن، وممرات الشحن متعددة الوسائط عالية الكفاءة.' :
                  'Schengen-compliant global trade facilitation, secure diplomatic customs clearance, and high-efficiency multimodal shipping corridors.'
                }
                isRTL={isRTL}
              />

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

              {/* Elegant Section Hero Image */}
              <PageHero 
                image="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=80"
                deptLabel={
                  currentLang === 'de' ? 'ABTEILUNG 03 // EXKLUSIVE FAHRZEUG-BESCHAFFUNG' :
                  currentLang === 'ar' ? 'القسم ٠٣ // تأمين أساطيل السيارات الفاخرة' :
                  'DEPT_03 // PRESTIGE FLEET ACQUISITIONS'
                }
                title={t.navAutomotive}
                description={
                  currentLang === 'de' ? 'Direktbezug aus Deutschland, Exportlogistik und Luxusfahrzeugvermittlung optimiert für GCC- und EU-Spezifikationen.' :
                  currentLang === 'ar' ? 'تأمين عابر للقارات لأساطيل السيارات الألمانية الفاخرة، والسيارات الرياضية النادرة، والتنسيق الجمركي بين الاتحاد الأوروبي والخليج العربي.' :
                  'Continental sourcing of premium German automotive fleets, luxury exotic sports cars, and customs coordination for EU-GCC corridors.'
                }
                isRTL={isRTL}
              />

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

              {/* Elegant Section Hero Image */}
              <PageHero 
                image="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1600&q=80"
                deptLabel={
                  currentLang === 'de' ? 'ABTEILUNG 04 // LACKSCHUTZ-LABORATORIEN' :
                  currentLang === 'ar' ? 'القسم ٠٤ // مختبرات حماية الطلاء الفاخر' :
                  'DEPT_04 // PRESTIGE SHIELD LABS'
                }
                title={t.navCarCare}
                description={
                  currentLang === 'de' ? 'Chirurgisch präzise Montage von Lackschutzfolie (PPF) und hydrophobe High-Gloss PPG Glaskeramik-Versiegelung der nächsten Generation.' :
                  currentLang === 'ar' ? 'تطبيق أفلام حماية الطلاء (PPF) ذات المعالجة الذاتية ودروع السيراميك والزجاج المائي PPG عالية اللمعان والمقاومة للمياه.' :
                  'Surgical-grade Paint Protection Film (PPF) application and next-generation high-gloss PPG hydrophobic glass/ceramic armor.'
                }
                isRTL={isRTL}
              />

              {/* Dedicated Page View Content */}
              <div className="bg-[#111111]/30 border border-white/5 rounded-sm p-4 sm:p-8 backdrop-blur-sm shadow-2xl">
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
                  currentLang === 'de' ? 'ABTEILUNG 05 // EXKLUSIVE PRESTIGE-VERMIETUNG' :
                  currentLang === 'ar' ? 'القسم ٠٥ // أسطول تأجير السيارات الفارهة للمحترفين' :
                  'DEPT_05 // PRESTIGE FLEET RENTALS'
                }
                title={t.navRental}
                description={
                  currentLang === 'de' ? 'Erleben Sie unübertroffene Leistung und exquisite Ingenieurskunst mit unserer Flotte modernster Supersportwagen und Luxus-SUVs.' :
                  currentLang === 'ar' ? 'استمتع بأعلى مستويات الرفاهية والأداء الخارق مع أسطولنا الحصري من السيارات الرياضية الخارقة وسيارات الدفع الرباعي الفاخرة.' :
                  'Experience unrivaled high-performance and exquisite automotive engineering with our hand-selected fleet of supercars and elite luxury SUVs.'
                }
                isRTL={isRTL}
              />

              {/* Dedicated Page View Content */}
              <div className="bg-[#111111]/30 border border-white/5 rounded-sm p-4 sm:p-8 backdrop-blur-sm shadow-2xl">
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
                  currentLang === 'de' ? 'KERN-INFRASTRUKTUR // SICHERHEITSREGISTER' :
                  currentLang === 'ar' ? 'البنية التحتية الأساسية // سجل الأمان المغلق' :
                  'CORE INFRASTRUCTURE // SECURITY LEDGER'
                }
                title="Consortium Registry Control"
                description={
                  currentLang === 'de' ? 'Anmeldung für autorisiertes Personal erforderlich. Operations-Dashboard zum Veröffentlichen, Synchronisieren oder Archivieren von Fahrzeugen.' :
                  currentLang === 'ar' ? 'مطلوب صلاحيات الموظفين المعتمدين فقط. لوحة تحكم لإضافة وتعديل وحذف أصول السيارات للكونسورتيوم.' :
                  'Authorized personnel credentials required. Operations dashboard to publish, synchronize, or archive corporate vehicle assets.'
                }
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
      <Footer currentLang={currentLang} onOpenStaticPage={(page) => setActiveStaticPage(page)} />

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
