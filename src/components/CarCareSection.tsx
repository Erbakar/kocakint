/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Sparkles, ShieldCheck, Droplet, Layers, HelpCircle, ArrowUpRight, CheckCircle2, Car, BadgePercent, ShieldAlert, Waves, Star, ChevronRight } from 'lucide-react';

interface CarCareSectionProps {
  currentLang: Language;
}

export default function CarCareSection({ currentLang }: CarCareSectionProps) {
  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  // Interactive Price Estimator State
  const [vehicleType, setVehicleType] = useState<'sedan' | 'suv' | 'sport'>('sedan');
  const [serviceSelected, setServiceSelected] = useState<'ppf' | 'detailing' | 'wash'>('ppf');
  const [inquirySent, setInquirySent] = useState(false);
  const [carName, setCarName] = useState('');

  const pricingData = {
    sedan: { ppf: 2900, detailing: 750, wash: 120 },
    suv: { ppf: 3400, detailing: 890, wash: 150 },
    sport: { ppf: 3200, detailing: 950, wash: 180 }
  };

  const currentPrice = pricingData[vehicleType][serviceSelected];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setCarName('');
    }, 4000);
  };

  const servicesData = [
    {
      id: 'wash' as const,
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80',
      title: {
        en: 'VIP Multi-Stage Auto Wash',
        de: 'VIP Mehrstufen-Handwäsche',
        ar: 'غسيل السيارات متعدد المراحل الفاخر'
      },
      badge: {
        en: 'Decontamination & Wash',
        de: 'Dekontamination & Pflege',
        ar: 'تنظيف عميق وتطهير'
      },
      desc: {
        en: 'Bespoke hand wash using ph-neutral premium shampoos and ionized water. Complete multi-stage road salt, iron, and tar decontamination.',
        de: 'Maßgeschneiderte Handwäsche mit pH-neutralen Premium-Shampoos und ionisiertem Wasser. Vollständige Entfernung von Straßensalz, Flugrost und Teer.',
        ar: 'غسيل يدوي مخصص باستخدام شامبو فائق الجودة متوازن الحموضة ومياه متأينة. إزالة كاملة للأملاح والحديد والقطران.'
      },
      features: {
        en: ['24-Step Scratch-Free Protocol', 'Clay-bar Paint Smoothing', 'Wheel Barrel & Caliper Cleaning', 'Premium Leather Vacuum & Wipe'],
        de: ['24-Stufen kratzfreie Handwäsche', 'Lackreinigung mit Knete', 'Felgenbett- & Bremssattelreinigung', 'Lederabsaugung & Pflege'],
        ar: ['بروتوكول غسيل آمن من ٢٤ خطوة', 'تنظيف السطح بالطين الخاص', 'تنظيف العجلات والمكابح بعمق', 'تفريغ هواء داخلي مجهري للمقاعد']
      },
      icon: Waves,
      priceEstimate: '€120 - €180'
    },
    {
      id: 'detailing' as const,
      image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80',
      title: {
        en: 'Ultra-Premium Detailing',
        de: 'Ultra-Premium Aufbereitung',
        ar: 'التفصيل واستعادة اللمعان الفائق'
      },
      badge: {
        en: 'Defect Correction',
        de: 'Lackkorrektur & Politur',
        ar: 'تصحيح عيوب الطلاء'
      },
      desc: {
        en: 'Multi-stage machine paint correction to eliminate 99% of micro-scratches and swirls. Complete restoration of deep gloss and premium surface clarity.',
        de: 'Mehrstufige maschinelle Lackkorrektur zur Beseitigung von 99% aller Mikrokratzer. Vollständige Wiederherstellung von Tiefenglanz und Brillanz.',
        ar: 'تصحيح عيوب طلاء السيارات متعدد المراحل لإزالة ٩٩٪ من الخدوش الدقيقة والدوائر. استعادة كاملة للمعان العميق والوضوح الخارجي.'
      },
      features: {
        en: ['3-Stage Paint Correction', 'Rotary Swirl Elimination', 'Alcantara & Nappa Conditioning', 'Engine Bay Cosmetic Detailing'],
        de: ['3-stufige Maschinenpolitur', 'Beseitigung aller Swirl-Marken', 'Alcantara- & Nappa-Pflege', 'Motorraum-Kosmetikreinigung'],
        ar: ['تصحيح الطلاء بثلاث مراحل', 'إزالة الدوائر والبهتان بالكامل', 'ترطيب جلد النابا والألكانتارا', 'تنظيف تجميلي وتفصيلي لحجرة المحرك']
      },
      icon: Sparkles,
      priceEstimate: '€750 - €950'
    },
    {
      id: 'ppf' as const,
      image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=800&q=80',
      title: {
        en: 'PPF & PPG Paint Protection Glass Coatings',
        de: 'PPF & PPG Lackschutz & Glaskeramik',
        ar: 'أفلام الحماية PPF وطلاء الزجاج PPG'
      },
      badge: {
        en: 'Surgical Protection Shield',
        de: 'Chirurgischer Schutzpanzer',
        ar: 'درع الحماية الجراحي المتقدم'
      },
      desc: {
        en: 'Sovereign Paint Protection Film (PPF) application combined with advanced PPG Paint Protection Glass 9H high-durability hydrophobic ceramic coatings.',
        de: 'Aufbringung von Premium-Lackschutzfolie (PPF) kombiniert mit modernsten, hochbeständigen hydrophoben PPG-Glaskeramikbeschichtungen (9H).',
        ar: 'تطبيق أفلام حماية الطلاء (PPF) ذاتية المعالجة مدمجة مع طلاءات السيراميك والزجاج الواقي PPG بدرجة صلابة 9H المقاومة للماء.'
      },
      features: {
        en: ['Self-Healing Polyurethane Film', '10-Year Anti-Chipping Warranty', 'PPG 9H Hydrophobic Coating', 'Ultra High-Gloss Zero Orange-Peel'],
        de: ['Selbstheilende Polyurethanfolie', '10 Jahre Garantie gegen Steinschlag', 'Hydrophobe PPG 9H Beschichtung', 'Absoluter Spiegelglanz ohne Struktur'],
        ar: ['فيلم بولي يوريثان معالج ذاتياً', 'ضمان لمدة ١٠ سنوات ضد الحصى', 'طلاء زجاج مائي PPG 9H', 'لمعان فائق خالي من أي تموجات عيبية']
      },
      icon: Layers,
      priceEstimate: '€2,900 - €3,400'
    }
  ];

  const careMetrics = [
    { label: currentLang === 'de' ? 'PPF-Dicke' : currentLang === 'ar' ? 'سمك الطبقة الحامية' : 'Polyurethane PPF Thickness', value: '150-200 μm' },
    { label: currentLang === 'de' ? 'Lackschutz-Garantie' : currentLang === 'ar' ? 'ضمان حماية الطلاء' : 'Self-Healing Warranty', value: '10 Years' },
    { label: currentLang === 'de' ? 'Wasch-Protokoll' : currentLang === 'ar' ? 'خطوات الغسيل الفائق' : 'Multi-Stage Wash Protocol', value: '24 Steps' },
    { label: currentLang === 'de' ? 'PPG Keramikhärte' : currentLang === 'ar' ? 'صلابة السيراميك PPG' : 'PPG Glass Ceramic Shield', value: '9H+ Hardness' }
  ];

  return (
    <section className="text-[#E0E0E0] font-sans bg-transparent" id="car-care-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold font-mono text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/20 px-3 py-1 rounded-sm uppercase tracking-[0.2em]">
            Consortium Car Care & Protection
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif tracking-tight mt-3 text-white">
            {t.carCareTitle}
          </h2>
          <p className="text-sm text-white/50 mt-2 font-sans">
            {t.carCareSubtitle}
          </p>
          <p className="text-xs sm:text-sm text-white/40 mt-3 leading-relaxed font-sans max-w-2xl mx-auto">
            {t.carCarePara}
          </p>
        </div>

        {/* Detailing Metrics Panel */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {careMetrics.map((m, i) => (
            <div key={i} className="bg-[#111111] p-4 rounded-sm border border-white/10 text-center hover:border-[#C5A059]/30 transition-all shadow-md">
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#C5A059] block mb-0.5">
                {m.value}
              </span>
              <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider font-mono">
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* Visually Separated Premium Services Showcase */}
        <div className="space-y-12 mb-16">
          <div className="border-b border-white/10 pb-2">
            <h3 className="text-xs font-mono text-[#C5A059] uppercase tracking-[0.25em] font-bold">
              {currentLang === 'de' ? 'UNSERE STRUKTURIERTEN FLUGKÖRPERDIENSTE' : currentLang === 'ar' ? 'خدمات الحماية والعناية الفائقة المصنفة' : 'CLASSIFIED CAR CARE DIVISIONS'}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={service.id} 
                  className={`bg-[#111111] border rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_4px_30px_rgba(197,160,89,0.05)] ${
                    serviceSelected === service.id 
                      ? 'border-[#C5A059]' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div>
                    {/* Visual Aspect ratio */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0A0A]">
                      <img 
                        src={service.image} 
                        alt={service.title[currentLang]} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent"></div>
                      
                      {/* Floating Badge */}
                      <span className="absolute top-4 left-4 bg-black/80 border border-[#C5A059]/30 text-[#C5A059] text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-sm">
                        {service.badge[currentLang]}
                      </span>
                    </div>

                    {/* Content details */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-[#0A0A0A] border border-[#C5A059]/20 text-[#C5A059] rounded-sm">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <h4 className="text-base font-serif text-white group-hover:text-[#C5A059] transition-colors leading-tight">
                          {service.title[currentLang]}
                        </h4>
                      </div>

                      <p className="text-xs text-white/50 leading-relaxed font-sans mb-6">
                        {service.desc[currentLang]}
                      </p>

                      <div className="space-y-2 border-t border-white/5 pt-4">
                        <span className="text-[9px] font-mono uppercase text-[#C5A059] tracking-wider block font-bold">
                          {currentLang === 'de' ? 'Technische Highlights' : currentLang === 'ar' ? 'المواصفات التقنية الفائقة' : 'Technical Attributes'}
                        </span>
                        {service.features[currentLang].map((feat, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-white/70">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]/80 shrink-0" />
                            <span className="font-sans text-xs">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Price Estimate Footer */}
                  <div className="p-6 pt-0">
                    <div className="bg-[#0A0A0A] p-3.5 rounded-sm border border-white/5 flex items-center justify-between">
                      <div className="text-left" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                        <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest block">
                          {currentLang === 'de' ? 'Investitionsschätzung' : currentLang === 'ar' ? 'تكلفة تقديرية' : 'Estimate Range'}
                        </span>
                        <span className="text-sm font-mono text-[#C5A059] font-bold">
                          {service.priceEstimate}
                        </span>
                      </div>
                      <button 
                        onClick={() => {
                          setServiceSelected(service.id);
                          const element = document.getElementById('estimator-panel');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="bg-white/5 hover:bg-[#C5A059] text-white hover:text-black border border-white/10 hover:border-[#C5A059] py-1.5 px-3 rounded-sm text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer font-bold"
                      >
                        {currentLang === 'de' ? 'Auswählen' : currentLang === 'ar' ? 'تحديد وتخصيص' : 'Select'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Split Estimator & Laboratory Standards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8" id="estimator-panel">
          
          {/* Facility Standards (Left) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#111111] border border-white/10 rounded-sm p-6">
            <div>
              <h3 className="text-base font-serif text-white mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
                {t.carCareFacilityTitle}
              </h3>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                {t.carCareFacilityDesc}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-[#0A0A0A] p-4 rounded-sm border border-white/5">
                  <span className="text-xs font-mono uppercase text-[#C5A059] tracking-widest block mb-1 font-bold">
                    {currentLang === 'de' ? 'Partikelfreier Raum' : currentLang === 'ar' ? 'قاعات تركيب خالية من الغبار' : 'Dust-Free Wrapping Chamber'}
                  </span>
                  <p className="text-[11px] text-white/40 leading-relaxed font-sans">
                    {currentLang === 'de' 
                      ? 'Klimatisierte Überdruckhallen verhindern Staubeinschlüsse während der Folienmontage vollständig.' 
                      : currentLang === 'ar' 
                      ? 'قاعات ضغط هواء إيجابي تمنع تماماً دخول الأتربة لضمان تركيب أفلام حماية مثالي بدون شوائب.' 
                      : 'Positive air-pressure cleanrooms eliminate electrostatic micro-particulates during application.'}
                  </p>
                </div>
                <div className="bg-[#0A0A0A] p-4 rounded-sm border border-white/5">
                  <span className="text-xs font-mono uppercase text-[#C5A059] tracking-widest block mb-1 font-bold">
                    {currentLang === 'de' ? 'Chirurgisches Licht' : currentLang === 'ar' ? 'إضاءة دقيقة فائقة التركيز' : 'Defect Detection Light Grid'}
                  </span>
                  <p className="text-[11px] text-white/40 leading-relaxed font-sans">
                    {currentLang === 'de' 
                      ? 'Multi-Spektral-Beleuchtung zur makellosen Erkennung feinster Lackfehler vor dem Coating.' 
                      : currentLang === 'ar' 
                      ? 'إضاءات طيفية متعددة الزوايا تضمن رؤية أدق خدوش الطلاء وتصحيحها قبل تركيب طلاء PPG.' 
                      : 'Multi-spectrum surgical-grade light arrays reveal sub-micron paint defects before lock-in.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
              <span>FACILITY ID: DET_BER_09</span>
              <span>CERTIFICATION: ISO_9001_AUTOMOTIVE</span>
            </div>
          </div>

          {/* Pricing Configurator (Right) */}
          <div className="lg:col-span-5 bg-[#111111] border border-white/10 rounded-sm p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-mono text-[#C5A059] mb-4 uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
                <Car className="w-4 h-4" />
                {currentLang === 'de' ? 'Preisschätzer & Konfiguration' : currentLang === 'ar' ? 'تخصيص السعر وحجز موعد' : 'Configure Custom Quote'}
              </h3>
              
              {/* Selector for Vehicle Class */}
              <div className="mb-4">
                <label className="text-[10px] font-mono text-white/40 block mb-1.5 font-bold uppercase">
                  {currentLang === 'de' ? '1. Fahrzeugklasse' : currentLang === 'ar' ? '١. فئة السيارة' : '1. Vehicle Class'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['sedan', 'suv', 'sport'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setVehicleType(type)}
                      className={`py-1.5 px-2 text-xs rounded-sm border font-mono transition-all uppercase tracking-wider font-bold cursor-pointer ${
                        vehicleType === type 
                          ? 'bg-[#C5A059] text-black border-[#C5A059]' 
                          : 'bg-[#0A0A0A] text-white/60 border-white/10 hover:border-white/25'
                      }`}
                    >
                      {type === 'sedan' ? (currentLang === 'de' ? 'Limousine' : currentLang === 'ar' ? 'صالون' : 'Sedan') : ''}
                      {type === 'suv' ? (currentLang === 'de' ? 'SUV/Gelände' : currentLang === 'ar' ? 'دفع رباعي' : 'SUV') : ''}
                      {type === 'sport' ? (currentLang === 'de' ? 'Sportwagen' : currentLang === 'ar' ? 'رياضية' : 'Exotic') : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector for Service Type */}
              <div className="mb-5">
                <label className="text-[10px] font-mono text-white/40 block mb-1.5 font-bold uppercase">
                  {currentLang === 'de' ? '2. Dienstleistungsauswahl' : currentLang === 'ar' ? '٢. تحديد الخدمة' : '2. Active Protection Service'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['ppf', 'detailing', 'wash'] as const).map((service) => (
                    <button
                      key={service}
                      onClick={() => setServiceSelected(service)}
                      className={`py-1.5 px-2 text-[10px] sm:text-xs rounded-sm border font-mono transition-all uppercase tracking-wider font-bold cursor-pointer ${
                        serviceSelected === service 
                          ? 'bg-[#C5A059] text-black border-[#C5A059]' 
                          : 'bg-[#0A0A0A] text-white/60 border-white/10 hover:border-[#C5A059]/30'
                      }`}
                    >
                      {service === 'ppf' ? 'PPG & PPF' : ''}
                      {service === 'detailing' ? 'Detailing' : ''}
                      {service === 'wash' ? 'VIP Wash' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quote Price Display */}
              <div className="bg-[#0A0A0A] border border-white/5 rounded-sm p-4 text-center mb-5">
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block mb-0.5">
                  {currentLang === 'de' ? 'Geschätztes Investitionsvolumen' : currentLang === 'ar' ? 'القيمة التقديرية للاستثمار' : 'Estimated Care Investment'}
                </span>
                <span className="text-3xl font-serif text-white tracking-tight">
                  €{currentPrice.toLocaleString()}
                  <span className="text-xs font-sans text-white/40 font-normal">
                    {serviceSelected === 'wash' ? '' : '+'}
                  </span>
                </span>
                <p className="text-[10px] text-white/40 mt-1 font-sans">
                  {currentLang === 'de' 
                    ? 'Inklusive professioneller Aufbereitung und Qualitätskontrolle.' 
                    : currentLang === 'ar' 
                    ? 'شامل للفحص الدقيق والضمان الشامل لمراكز كوكاكينت.' 
                    : 'Includes exhaustive paint pre-cleansing & state certification.'}
                </p>
              </div>

              {/* Booking/Contact Inquiry Mini Form */}
              <form onSubmit={handleInquirySubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    required
                    value={carName}
                    onChange={(e) => setCarName(e.target.value)}
                    placeholder={currentLang === 'de' ? 'z. B. Porsche GT3 RS' : currentLang === 'ar' ? 'مثال: بورش جي تي 3' : 'Vehicle Model (e.g., Porsche GT3)'}
                    className="w-full bg-[#0A0A0A] border border-white/10 hover:border-white/20 focus:border-[#C5A059] rounded-sm py-2 px-3 text-xs text-white placeholder-white/30 focus:outline-none transition-colors font-sans"
                  />
                </div>
                
                {inquirySent ? (
                  <div className="bg-[#152010] border border-emerald-500/30 text-emerald-400 text-xs py-2.5 px-3 rounded-sm flex items-center gap-2 font-sans justify-center animate-pulse">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>
                      {currentLang === 'de' ? 'Anfrage erfolgreich übermittelt!' : currentLang === 'ar' ? 'تم إرسال طلب عرض السعر بنجاح!' : 'Bespoke Quote Inquiry Received!'}
                    </span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-[#C5A059] hover:bg-[#b08e4f] text-black font-semibold text-xs uppercase tracking-widest py-2.5 px-4 rounded-sm transition-all flex items-center justify-center gap-1.5 font-sans cursor-pointer active:translate-y-0.5"
                  >
                    <span>
                      {currentLang === 'de' ? 'Reservierung Anfragen' : currentLang === 'ar' ? 'طلب موعد فحص وحماية' : 'Secure Booking Slot'}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </button>
                )}
              </form>
            </div>

            <div className="text-[10px] font-mono text-white/30 text-center mt-6 flex items-center justify-center gap-1 leading-normal">
              <BadgePercent className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>
                {currentLang === 'de' ? 'Zertifizierter Partner für XPEL & SunTek Folien' : currentLang === 'ar' ? 'شريك معتمد لأفلام XPEL و SunTek العالمية' : 'XPEL & SunTek Certified Application Facility'}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
