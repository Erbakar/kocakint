/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, RentalCar } from '../types';
import { translations } from '../translations';
import { 
  Shield, 
  User, 
  Calendar, 
  Gauge, 
  Zap, 
  Sparkles, 
  Car, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  DollarSign, 
  HelpCircle, 
  Heart,
  Check,
  MapPin,
  Briefcase,
  Sliders,
  Award
} from 'lucide-react';

interface CarRentalSectionProps {
  currentLang: Language;
  rentals: RentalCar[];
}

export default function CarRentalSection({ currentLang, rentals }: CarRentalSectionProps) {
  const isRTL = currentLang === 'ar';

  // 2. States for Renting Interaction
  const [activeTab, setActiveTab] = useState<'all' | 'sports' | 'suv' | 'luxury'>('all');
  const [driverPreference, setDriverPreference] = useState<'with' | 'without'>('without');
  const [selectedCarId, setSelectedCarId] = useState<string>(rentals[0]?.id || 'ferrari-f8');
  const [rentalDays, setRentalDays] = useState<number>(3);
  const [vipAirportService, setVipAirportService] = useState<boolean>(true);
  const [unlimitedMileage, setUnlimitedMileage] = useState<boolean>(false);
  const [bookingInquirySent, setBookingInquirySent] = useState<boolean>(false);

  // Form Fields
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCity, setClientCity] = useState<'Berlin' | 'Dubai'>('Berlin');

  // Filter cars
  const filteredCars = rentals.filter(car => {
    if (activeTab === 'all') return true;
    return car.category === activeTab;
  });

  // Selected Car Data
  const activeCar = rentals.find(car => car.id === selectedCarId) || rentals[0];

  // Price Calculations
  const basePricePerDay = activeCar ? activeCar.dailyPrice : 0;
  const driverExtraCost = driverPreference === 'with' ? 200 : 0;
  const vipAddonCost = vipAirportService ? 150 : 0;
  const unlimitedMileageCost = unlimitedMileage ? 100 : 0;

  const dailyTotal = basePricePerDay + driverExtraCost + unlimitedMileageCost;
  const grandTotal = (dailyTotal * rentalDays) + vipAddonCost;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingInquirySent(true);
    setTimeout(() => {
      setBookingInquirySent(false);
      setClientName('');
      setClientPhone('');
      setClientEmail('');
    }, 5000);
  };

  return (
    <section className="text-[#E0E0E0] font-sans bg-transparent" id="car-rental-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Department Intro Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold font-mono text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/20 px-3 py-1 rounded-sm uppercase tracking-[0.2em]">
            {currentLang === 'de' ? 'KOCAKINT ULTRA-LUXUS VERMIETUNG' : currentLang === 'ar' ? 'قسم خدمات النخبة لتأجير السيارات الفاخرة' : currentLang === 'tr' ? 'KOCAKINT PRESTİJ VE EGZOTİK KİRALIK FİLO' : 'Kocakint Prestige & Exotic Rental Fleet'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif tracking-tight mt-3 text-white">
            {currentLang === 'de' ? 'Exklusive Luxusautovermietung' : currentLang === 'ar' ? 'تأجير السيارات الرياضية والفاخرة الفارهة' : currentLang === 'tr' ? 'Prestijli Otomotiv Kiralama Hizmetleri' : 'Prestige Automotive Rental Services'}
          </h2>
          <p className="text-sm text-white/50 mt-2 font-sans">
            {currentLang === 'de' 
              ? 'Wählen Sie aus unserer handverlesenen Kollektion an Supersportwagen und Luxus-SUVs. Verfügbar zur Selbstfahrt oder mit professionellem Chauffeurservice.' 
              : currentLang === 'ar' 
              ? 'مجموعة منتقاة من السيارات الرياضية الخارقة وسيارات الدفع الرباعي الفاخرة. متوفرة بخدمات القيادة الذاتية أو خدمة سائق خاص مخصصة للملوك والوفود الدبلوماسية.' 
              : currentLang === 'tr'
              ? 'Süper arabalar ve seçkin SUV\'lardan oluşan özenle seçilmiş filomuz. Kendi sürüşünü yapmak isteyen meraklılar için veya profesyonel çok dilli şoförlerimizle özel hizmetinizdedir.'
              : 'Our hand-picked fleet of hyper-exclusive supercars and elite SUVs. Available for self-drive enthusiasts or customized with professional multi-lingual chauffeurs.'}
          </p>
        </div>

        {/* Global Standard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#111111] p-5 rounded-sm border border-white/10 flex items-start gap-4">
            <div className="p-3 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 rounded-sm shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-serif text-white uppercase tracking-wider font-bold mb-1">
                {currentLang === 'de' ? 'Vollkaskoversicherung' : currentLang === 'ar' ? 'تأمين شامل بدون رسوم إضافية' : currentLang === 'tr' ? 'Kapsamlı Elit Güvence' : 'Comprehensive Elite Cover'}
              </h4>
              <p className="text-xs text-white/40 leading-relaxed font-sans">
                {currentLang === 'de' 
                  ? 'Alle Fahrzeuge sind vollkaskoversichert mit minimalem Selbstbehalt und freigegeben für transnationale Transitstrecken.' 
                  : currentLang === 'ar' 
                  ? 'جميع السيارات الفاخرة مؤمن عليها تأميناً شاملاً لضمان راحة بالك المطلقة.' 
                  : currentLang === 'tr'
                  ? 'Schengen ülkeleri ve BAE genelinde mutlak koruma sağlayan, sıfır muafiyetli tam kasko sigortası dahildir.'
                  : 'Zero-deductible comprehensive insurance coverage included with absolute legal protection across Schengen states & UAE.'}
              </p>
            </div>
          </div>

          <div className="bg-[#111111] p-5 rounded-sm border border-white/10 flex items-start gap-4">
            <div className="p-3 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 rounded-sm shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-serif text-white uppercase tracking-wider font-bold mb-1">
                {currentLang === 'de' ? 'Chauffeurservice' : currentLang === 'ar' ? 'سائقون متعددو اللغات ذوو خبرة' : currentLang === 'tr' ? 'Profesyonel Şoförler' : 'Professional Chauffeurs'}
              </h4>
              <p className="text-xs text-white/40 leading-relaxed font-sans">
                {currentLang === 'de' 
                  ? 'Erfahrene, mehrsprachige Chauffeure mit höchster Diskretion für diplomatischen Schutz und VIP-Transport.' 
                  : currentLang === 'ar' 
                  ? 'خدمات مرافقة دبلوماسية رفيعة المستوى وسائقون يتقنون لغات متعددة ومدربون بأعلى معايير البروتوكول.' 
                  : currentLang === 'tr'
                  ? 'Kapsamlı diplomatik protokol eğitimi ve lüks ağırlama uzmanlığına sahip, sertifikalı, çok dilli profesyonel şoförler.'
                  : 'Highly certified multi-lingual executive drivers with extensive diplomatic protocol training and luxury hospitality expertise.'}
              </p>
            </div>
          </div>

          <div className="bg-[#111111] p-5 rounded-sm border border-white/10 flex items-start gap-4">
            <div className="p-3 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 rounded-sm shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-serif text-white uppercase tracking-wider font-bold mb-1">
                {currentLang === 'de' ? 'Direktlieferung' : currentLang === 'ar' ? 'توصيل مباشر فوري' : currentLang === 'tr' ? 'Adrese & Havalimanına Doğrudan Teslimat' : 'Direct Airside Delivery'}
              </h4>
              <p className="text-xs text-white/40 leading-relaxed font-sans">
                {currentLang === 'de' 
                  ? 'Wir liefern Ihr Fahrzeug direkt an Ihren Ankunftshafen (z. B. BER Berlin-Brandenburg oder DXB Dubai International).' 
                  : currentLang === 'ar' 
                  ? 'نوفر خدمة تسليم واستلام السيارة مباشرة عند مهبط الطائرة أو فندق إقامتك الفاخر.' 
                  : currentLang === 'tr'
                  ? 'Seçtiğiniz egzotik aracı doğrudan Berlin veya Dubai\'deki VIP havalimanı terminallerine veya lüks konutlara teslim ediyoruz.'
                  : 'We deliver your selected exotic directly to VIP airport terminals or luxury residences in Berlin or Dubai.'}
              </p>
            </div>
          </div>
        </div>

        {/* Categories Tab and Quick Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
            {(['all', 'sports', 'suv', 'luxury'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-1.5 px-3.5 text-xs rounded-sm border font-mono uppercase tracking-widest transition-all font-bold cursor-pointer shrink-0 ${
                  activeTab === tab 
                    ? 'bg-[#C5A059] text-black border-[#C5A059]' 
                    : 'bg-[#111111] text-white/60 border-white/10 hover:border-white/20'
                }`}
              >
                {tab === 'all' && (currentLang === 'de' ? 'Gesamte Flotte' : currentLang === 'ar' ? 'الكل' : currentLang === 'tr' ? 'Tüm Filo' : 'All Fleet')}
                {tab === 'sports' && (currentLang === 'de' ? 'Supersportwagen' : currentLang === 'ar' ? 'سيارات رياضية خارقة' : currentLang === 'tr' ? 'Egzotik Spor Arabalar' : 'Sports Exotics')}
                {tab === 'suv' && (currentLang === 'de' ? 'Luxus SUVs' : currentLang === 'ar' ? 'دفع رباعي فاخر' : currentLang === 'tr' ? 'Prestijli SUV\'lar' : 'Prestige SUVs')}
                {tab === 'luxury' && (currentLang === 'de' ? 'Chauffeur-Klasse' : currentLang === 'ar' ? 'الصالون الفاخر' : currentLang === 'tr' ? 'Lüks Sedanlar' : 'Luxury Saloons')}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 bg-[#111111] p-1 border border-white/10 rounded-sm">
            <button
              onClick={() => setDriverPreference('without')}
              className={`py-1 px-3 text-[10px] font-mono rounded-sm transition-all uppercase tracking-wider font-bold cursor-pointer ${
                driverPreference === 'without' ? 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30' : 'text-white/40 border border-transparent hover:text-white'
              }`}
            >
              {currentLang === 'de' ? 'Selbstfahrer (Şoförsüz)' : currentLang === 'ar' ? 'قيادة ذاتية (بدون سائق)' : currentLang === 'tr' ? 'Şoförsüz' : 'Self-Drive'}
            </button>
            <button
              onClick={() => setDriverPreference('with')}
              className={`py-1 px-3 text-[10px] font-mono rounded-sm transition-all uppercase tracking-wider font-bold cursor-pointer ${
                driverPreference === 'with' ? 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30' : 'text-white/40 border border-transparent hover:text-white'
              }`}
            >
              {currentLang === 'de' ? 'Chauffeurservice (Şoförlü)' : currentLang === 'ar' ? 'مع سائق خاص (شوفير)' : currentLang === 'tr' ? 'Şoförlü' : 'With Driver'}
            </button>
          </div>
        </div>

        {/* Dynamic Grid of Cars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredCars.map((car) => {
            const isDriverValid = driverPreference === 'with' ? car.availableWithDriver : car.availableWithoutDriver;
            return (
              <div 
                key={car.id} 
                className={`bg-[#111111] border rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                  selectedCarId === car.id ? 'border-[#C5A059] shadow-[0_4px_30px_rgba(197,160,89,0.04)]' : 'border-white/10'
                } ${!isDriverValid ? 'opacity-50 hover:opacity-75' : ''}`}
              >
                <div>
                  {/* Photo area */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent"></div>
                    
                    {/* Badge Category */}
                    <span className="absolute top-4 left-4 bg-black/80 border border-white/10 text-white/80 text-[8px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-sm">
                      {car.brand}
                    </span>

                    {/* Price Tag */}
                    <span className="absolute bottom-4 right-4 bg-black/90 border border-[#C5A059]/30 text-[#C5A059] text-xs font-mono px-3 py-1 rounded-sm font-bold">
                      €{car.dailyPrice} <span className="text-[9px] font-normal text-white/50">/{currentLang === 'de' ? 'Tag' : currentLang === 'ar' ? 'يوم' : 'Day'}</span>
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-serif text-white tracking-tight flex items-center justify-between">
                      <span>{car.name}</span>
                      <span className="text-xs font-sans text-white/40 font-normal">{car.brand}</span>
                    </h3>
                    <p className="text-xs text-white/50 mt-2 line-clamp-2 leading-relaxed">
                      {car.description[currentLang] || car.description['en']}
                    </p>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-2 gap-3 mt-5 border-t border-white/5 pt-4">
                      <div className="flex items-center gap-1.5 text-xs text-white/60">
                        <Zap className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span className="font-mono text-[11px]">{car.specs.power}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-white/60">
                        <Gauge className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span className="font-mono text-[11px]">0-100: {car.specs.acceleration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-white/60">
                        <Car className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span className="font-sans text-[10px] text-white/40 truncate">{car.specs.engine}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-white/60">
                        <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span className="font-mono text-[11px]">Vmax: {car.specs.topSpeed}</span>
                      </div>
                    </div>

                    {/* Status Restrictions */}
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-white/30 uppercase">{currentLang === 'de' ? 'Fahrermodus' : currentLang === 'ar' ? 'نظام السائق' : 'Chauffeur Options'}</span>
                      <div className="flex gap-2">
                        <span className={`px-1.5 py-0.5 rounded-sm border ${car.availableWithoutDriver ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' : 'border-red-500/20 text-red-400 bg-red-500/5'}`}>
                          {currentLang === 'de' ? 'Selbstfahrt' : 'Self'}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded-sm border ${car.availableWithDriver ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' : 'border-red-500/20 text-red-400 bg-red-500/5'}`}>
                          {currentLang === 'de' ? 'Chauffeur' : 'Driver'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 pt-0">
                  {!isDriverValid ? (
                    <div className="w-full text-center bg-red-950/20 border border-red-500/20 text-red-400 text-[10px] font-mono py-2 rounded-sm uppercase tracking-wider">
                      {currentLang === 'de' ? 'In dieser Kombination nicht verfügbar' : currentLang === 'ar' ? 'غير متوفر مع خيار السائق المحدد' : 'Not Available in chosen driver mode'}
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedCarId(car.id);
                        const element = document.getElementById('rental-calculator-section');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className={`w-full py-2 px-4 text-xs font-mono uppercase tracking-widest rounded-sm transition-all font-bold cursor-pointer ${
                        selectedCarId === car.id 
                          ? 'bg-[#C5A059] text-black border border-[#C5A059]' 
                          : 'bg-white/5 hover:bg-[#C5A059] text-white hover:text-black border border-white/10 hover:border-[#C5A059]'
                      }`}
                    >
                      {selectedCarId === car.id 
                        ? (currentLang === 'de' ? 'Ausgewählt' : currentLang === 'ar' ? 'محدد حالياً' : 'Currently Selected') 
                        : (currentLang === 'de' ? 'Fahrzeug Auswählen' : currentLang === 'ar' ? 'حجز وتفاصيل' : 'Select Car & Configure')}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Realtime Corporate Booking Engine & Configurator */}
        <div id="rental-calculator-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Form Side (Left) */}
          <div className="lg:col-span-7 bg-[#111111] border border-white/10 rounded-sm p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="border-b border-white/10 pb-3 mb-6">
                <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block font-bold">REGISTRY NO: PRE_LCR_2026</span>
                <h3 className="text-lg font-serif text-white tracking-tight flex items-center gap-2 mt-1">
                  <Sliders className="w-5 h-5 text-[#C5A059]" />
                  {currentLang === 'de' ? 'Exklusive Buchungskonfiguration' : currentLang === 'ar' ? 'تخصيص شروط العقد وحساب التكلفة' : 'Configure Bespoke Rental Schedule'}
                </h3>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono text-white/40 block mb-1.5 font-bold uppercase">
                      {currentLang === 'de' ? 'Vollständiger Name' : currentLang === 'ar' ? 'الاسم بالكامل' : 'Full Corporate Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder={currentLang === 'de' ? 'z. B. Dr. Adrian Meyer' : currentLang === 'ar' ? 'مثال: عبد الله آل مكتوم' : 'e.g., Adrian Meyer'}
                      className="w-full bg-[#0A0A0A] border border-white/10 focus:border-[#C5A059] rounded-sm py-2 px-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-white/40 block mb-1.5 font-bold uppercase">
                      {currentLang === 'de' ? 'Übergabe-Standort' : currentLang === 'ar' ? 'موقع التسليم والاستلام' : 'Delivery Destination Hub'}
                    </label>
                    <select
                      value={clientCity}
                      onChange={(e) => setClientCity(e.target.value as 'Berlin' | 'Dubai')}
                      className="w-full bg-[#0A0A0A] border border-white/10 focus:border-[#C5A059] rounded-sm py-2 px-3 text-xs text-white focus:outline-none transition-colors font-mono"
                    >
                      <option value="Berlin">Berlin Airport & City Hub (Germany)</option>
                      <option value="Dubai">Dubai Marina & Airport Gateway (UAE)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono text-white/40 block mb-1.5 font-bold uppercase">
                      {currentLang === 'de' ? 'E-Mail-Adresse' : currentLang === 'ar' ? 'البريد الإلكتروني للشركة' : 'Business Email'}
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="corporate@kocakint-group.com"
                      className="w-full bg-[#0A0A0A] border border-white/10 focus:border-[#C5A059] rounded-sm py-2 px-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-white/40 block mb-1.5 font-bold uppercase">
                      {currentLang === 'de' ? 'Telefonnummer' : currentLang === 'ar' ? 'رقم الهاتف (مع رمز الدولة)' : 'Phone Number (with Country Code)'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+49 170 1234567 or +971 50..."
                      className="w-full bg-[#0A0A0A] border border-white/10 focus:border-[#C5A059] rounded-sm py-2 px-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Duration Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[10px] font-mono text-white/40 block font-bold uppercase">
                      {currentLang === 'de' ? 'Mietdauer (Tage)' : currentLang === 'ar' ? 'مدة الحجز (بالأيام)' : 'Rental Duration (Days)'}
                    </label>
                    <span className="text-xs font-mono font-bold text-[#C5A059]">{rentalDays} {currentLang === 'de' ? 'Tage' : currentLang === 'ar' ? 'أيام' : 'Days'}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={rentalDays}
                    onChange={(e) => setRentalDays(Number(e.target.value))}
                    className="w-full accent-[#C5A059] bg-[#0A0A0A] h-1.5 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-white/30 mt-1">
                    <span>1 Day</span>
                    <span>1 Week</span>
                    <span>2 Weeks</span>
                    <span>1 Month (30 Days)</span>
                  </div>
                </div>

                {/* Exclusive Corporate Add-ons */}
                <div className="bg-[#0A0A0A] p-4 rounded-sm border border-white/5 space-y-3">
                  <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block font-bold">
                    {currentLang === 'de' ? 'Zusatzoptionen für Geschäftskunden' : currentLang === 'ar' ? 'خيارات إضافية مخصصة للوفود الدبلوماسية' : 'Diplomatic & Executive Enhancements'}
                  </span>
                  
                  <label className="flex items-center justify-between cursor-pointer group text-xs text-white/70 hover:text-white">
                    <span className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={vipAirportService} 
                        onChange={(e) => setVipAirportService(e.target.checked)}
                        className="rounded bg-[#111111] border-white/10 text-[#C5A059] focus:ring-0 w-4 h-4 cursor-pointer"
                      />
                      <span>{currentLang === 'de' ? 'Flughafen VIP Meet & Greet (+€150 einmalig)' : currentLang === 'ar' ? 'استقبال كبار الشخصيات VIP في المطار (+١٥٠ يورو)' : 'VIP Terminal Meet & Greet (+€150 flat)'}</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#C5A059] opacity-70 group-hover:opacity-100">Airport VIP Lounge</span>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer group text-xs text-white/70 hover:text-white">
                    <span className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={unlimitedMileage} 
                        onChange={(e) => setUnlimitedMileage(e.target.checked)}
                        className="rounded bg-[#111111] border-white/10 text-[#C5A059] focus:ring-0 w-4 h-4 cursor-pointer"
                      />
                      <span>{currentLang === 'de' ? 'Unbegrenzte Kilometer (+€100/Tag)' : currentLang === 'ar' ? 'كيلومترات مفتوحة غير محدودة (+١٠٠ يورو/يوم)' : 'Unlimited Mileage (+€100/day)'}</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#C5A059] opacity-70 group-hover:opacity-100">Absolute Freedom</span>
                  </label>
                </div>

                {bookingInquirySent ? (
                  <div className="bg-[#152010] border border-emerald-500/30 text-emerald-400 text-xs py-3.5 px-4 rounded-sm flex items-center gap-3 font-sans justify-center animate-pulse">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                    <div className="text-left" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                      <span className="block font-bold">
                        {currentLang === 'de' ? 'Exklusive Anfrage übermittelt!' : currentLang === 'ar' ? 'تم إرسال طلب الحجز الدبلوماسي بنجاح!' : 'Executive Request Transmitted Successfully!'}
                      </span>
                      <span className="text-[10px] text-white/50 block">
                        {currentLang === 'de' 
                          ? 'Ihr persönlicher Kundenbetreuer wird Sie innerhalb von 15 Minuten kontaktieren.' 
                          : currentLang === 'ar' 
                          ? 'سيقوم منسق كبار الشخصيات بالتواصل معك لإرسال تأكيد الحجز خلال ١٥ دقيقة.' 
                          : 'Our senior fleet manager will contact you within 15 minutes with the verified itinerary.'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-[#C5A059] hover:bg-[#b08e4f] text-black font-semibold text-xs uppercase tracking-widest py-3 px-4 rounded-sm transition-all flex items-center justify-center gap-1.5 font-sans cursor-pointer active:translate-y-0.5"
                  >
                    <span>
                      {currentLang === 'de' ? 'Mietvertrag Unverbindlich Anfragen' : currentLang === 'ar' ? 'طلب عرض تسعير وحجز رسمي' : 'Transmit VIP Rental Application'}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </button>
                )}
              </form>
            </div>
            
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/30">
              <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-[#C5A059]" /> DEKRA CERTIFIED FLEET</span>
              <span>24/7 ROADSIDE SECURITY ASSIST</span>
            </div>
          </div>

          {/* Realtime Estimate Dashboard (Right) */}
          <div className="lg:col-span-5 bg-[#0D0D0D] border border-white/10 rounded-sm p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-full blur-2xl"></div>
            
            <div>
              <div className="border-b border-white/10 pb-3 mb-6">
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">
                  {currentLang === 'de' ? 'Zusammenfassung' : currentLang === 'ar' ? 'تفاصيل الفاتورة التقديرية' : 'Real-Time Pricing Ledger'}
                </span>
                <h4 className="text-base font-serif text-[#C5A059] tracking-tight mt-0.5">
                  {activeCar.brand} {activeCar.name}
                </h4>
              </div>

              {/* Miniature Car Snapshot */}
              <div className="aspect-[16/8] rounded-sm overflow-hidden border border-white/5 bg-black mb-6 relative">
                <img 
                  src={activeCar.image} 
                  alt={activeCar.name} 
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <span className="absolute bottom-2 left-2 bg-[#C5A059] text-black font-mono text-[9px] font-bold px-2 py-0.5 rounded-sm">
                  {activeCar.specs.power}
                </span>
              </div>

              {/* Breakdown Ledger lines */}
              <div className="space-y-3 font-mono text-xs border-b border-white/5 pb-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-white/40">{currentLang === 'de' ? 'Basis-Tagesmiete' : currentLang === 'ar' ? 'قيمة الإيجار اليومي الأساسي' : 'Base Daily Rate'}</span>
                  <span className="text-white font-medium">€{basePricePerDay.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">{currentLang === 'de' ? 'Fahrermodus' : currentLang === 'ar' ? 'نوع السائق المحدد' : 'Driver Status'}</span>
                  <span className="text-white font-medium">
                    {driverPreference === 'with' ? 'Chauffeur (+€200)' : 'Self-Drive (€0)'}
                  </span>
                </div>
                {unlimitedMileage && (
                  <div className="flex justify-between">
                    <span className="text-white/40">{currentLang === 'de' ? 'Unbegrenzte KM' : currentLang === 'ar' ? 'مسافات غير محدودة' : 'Unlimited Mileage'}</span>
                    <span className="text-[#C5A059] font-medium">+€100 / Day</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-white/40">{currentLang === 'de' ? 'Mietzeitraum' : currentLang === 'ar' ? 'مدة العقد' : 'Rental Duration'}</span>
                  <span className="text-white font-medium">{rentalDays} {currentLang === 'de' ? 'Tage' : currentLang === 'ar' ? 'أيام' : 'Days'}</span>
                </div>
                {vipAirportService && (
                  <div className="flex justify-between">
                    <span className="text-white/40">{currentLang === 'de' ? 'VIP Flughafen-Lounge' : currentLang === 'ar' ? 'استقبال كبار الشخصيات' : 'VIP Meet & Greet'}</span>
                    <span className="text-[#C5A059] font-medium">+€150</span>
                  </div>
                )}
              </div>

              {/* Total Calculation */}
              <div className="bg-[#111111] p-4 rounded-sm border border-white/5 text-center">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block mb-1">
                  {currentLang === 'de' ? 'Geschätzter Gesamtpreis' : currentLang === 'ar' ? 'إجمالي قيمة العقد التقديرية' : 'Estimated Total Contract Value'}
                </span>
                <span className="text-3xl font-serif text-white tracking-tight font-bold">
                  €{grandTotal.toLocaleString()}
                </span>
                <p className="text-[9px] text-white/40 mt-1.5 leading-relaxed font-sans">
                  {currentLang === 'de' 
                    ? 'Inkl. 19% MwSt., Vollkaskoversicherung und freier Lieferung an den Übergabe-Hub.' 
                    : currentLang === 'ar' 
                    ? 'شامل لضريبة القيمة المضافة والتأمين الفاخر والتوصيل المباشر.' 
                    : 'Includes VAT, comprehensive zero-deductible insurance, and direct regional delivery.'}
                </p>
              </div>
            </div>

            {/* Quality Standard Badging */}
            <div className="mt-8 border-t border-white/10 pt-4">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block font-bold mb-2">
                {currentLang === 'de' ? 'UNSERE QUALITÄTSGARANTIE' : currentLang === 'ar' ? 'ضمان جودة الأسطول لدى كوكاكينت' : 'Our Prestige Guarantee'}
              </span>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2 text-[11px] text-white/50">
                  <Check className="w-3 h-3 text-[#C5A059] shrink-0" />
                  <span>{currentLang === 'de' ? 'Kein Modell älter als 12 Monate' : currentLang === 'ar' ? 'أحدث موديلات سيارات لا تتجاوز ١٢ شهراً من تاريخ الصنع' : 'All vehicles are less than 12 months in service'}</span>
                </li>
                <li className="flex items-center gap-2 text-[11px] text-white/50">
                  <Check className="w-3 h-3 text-[#C5A059] shrink-0" />
                  <span>{currentLang === 'de' ? '24/7 Mechanischer & Sicherheits-Notdienst' : currentLang === 'ar' ? 'دعم فني وأمني على الطريق متوفر ٢٤ ساعة طوال أيام الأسبوع' : '24/7 mechanical & security roadside support'}</span>
                </li>
                <li className="flex items-center gap-2 text-[11px] text-white/50">
                  <Check className="w-3 h-3 text-[#C5A059] shrink-0" />
                  <span>{currentLang === 'de' ? 'Vollständige Fahrzeugreinigung & Desinfektion' : currentLang === 'ar' ? 'تطهير طبي كامل للسيارة وحماية PPG قبل التسليم' : 'Full sanitization & micro-detailing prior to hand-over'}</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
