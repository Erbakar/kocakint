/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Sparkles, ShieldCheck, Droplet, Layers, HelpCircle, ArrowUpRight, CheckCircle2, Car, BadgePercent } from 'lucide-react';

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

  const careMetrics = [
    { label: currentLang === 'de' ? 'PPF-Dicke' : currentLang === 'ar' ? 'سمك الطبقة الحامية' : 'Polyurethane PPF Thickness', value: '150-200 μm' },
    { label: currentLang === 'de' ? 'Lackschutz-Garantie' : currentLang === 'ar' ? 'ضمان حماية الطلاء' : 'Self-Healing Warranty', value: '10 Years' },
    { label: currentLang === 'de' ? 'Wasch-Protokoll' : currentLang === 'ar' ? 'خطوات الغسيل الفائق' : 'Multi-Stage Wash Protocol', value: '24 Steps' },
    { label: currentLang === 'de' ? 'Keramikhärte' : currentLang === 'ar' ? 'صلابة السيراميك' : 'Ceramic Coating Shield', value: '9H Hardness' }
  ];

  return (
    <section className="py-4 text-[#E0E0E0] font-sans bg-transparent" id="car-care-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold font-mono text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/20 px-3 py-1 rounded-sm uppercase tracking-[0.2em]">
            Consortium Car Care & Protection
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif tracking-tight mt-3 text-white">
            {t.carCareTitle}
          </h1>
          <p className="text-sm text-white/50 mt-2 font-sans">
            {t.carCareSubtitle}
          </p>
        </div>

        {/* Detailing Metrics Panel */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {careMetrics.map((m, i) => (
            <div key={i} className="bg-[#111111] p-4 rounded-sm border border-white/10 text-center hover:border-[#C5A059]/30 transition-all">
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#C5A059] block mb-0.5">
                {m.value}
              </span>
              <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider font-mono">
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* Content Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
          
          {/* Main Editorial Text */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#111111] border border-white/10 rounded-sm p-6">
            <div>
              <h3 className="text-base font-serif text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C5A059]" />
                {currentLang === 'de' ? 'Automobile Ästhetik-Chirurgie' : currentLang === 'ar' ? 'مركز حماية ولمعان السيارات' : 'State-of-the-Art Protection Lab'}
              </h3>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                {t.carCarePara}
              </p>
              
              <div className="space-y-4">
                <div className="border-l-2 border-[#C5A059] pl-3 py-0.5">
                  <h4 className="text-xs sm:text-sm font-serif text-white flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#C5A059]" />
                    {t.carCareService1Title}
                  </h4>
                  <p className="text-xs text-white/50 mt-1 font-sans">{t.carCareService1Desc}</p>
                </div>
                <div className="border-l-2 border-[#C5A059] pl-3 py-0.5">
                  <h4 className="text-xs sm:text-sm font-serif text-white flex items-center gap-1.5">
                    <Droplet className="w-4 h-4 text-[#C5A059]" />
                    {t.carCareService2Title}
                  </h4>
                  <p className="text-xs text-white/50 mt-1 font-sans">{t.carCareService2Desc}</p>
                </div>
              </div>
            </div>

            {/* Facility standards */}
            <div className="mt-8 pt-5 border-t border-white/10">
              <h4 className="text-xs font-mono uppercase text-[#C5A059] tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                {t.carCareFacilityTitle}
              </h4>
              <p className="text-xs text-white/40 leading-relaxed font-sans">
                {t.carCareFacilityDesc}
              </p>
            </div>
          </div>

          {/* Interactive Pricing Estimator & Custom Booking Quote */}
          <div className="lg:col-span-5 bg-[#111111] border border-white/10 rounded-sm p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-mono text-[#C5A059] mb-4 uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
                <Car className="w-4 h-4" />
                {currentLang === 'de' ? 'Preisschätzer & Anfrage' : currentLang === 'ar' ? 'حاسبة التكلفة الفورية' : 'Bespoke Quote Generator'}
              </h3>
              
              {/* Selector for Vehicle Class */}
              <div className="mb-4">
                <label className="text-[10px] font-mono text-white/40 uppercase block mb-1.5 font-bold">
                  {currentLang === 'de' ? 'Fahrzeugklasse' : currentLang === 'ar' ? 'فئة السيارة' : '1. Vehicle Class'}
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
                <label className="text-[10px] font-mono text-white/40 uppercase block mb-1.5 font-bold">
                  {currentLang === 'de' ? 'Premium-Dienstleistung' : currentLang === 'ar' ? 'الخدمة المطلوبة' : '2. Premium Care Service'}
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
                      {service === 'ppf' ? 'PPF Wrap' : ''}
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
