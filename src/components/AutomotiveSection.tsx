/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, CarListing } from '../types';
import { translations } from '../translations';
import { Car, Fuel, Milestone, Calendar, ArrowUpRight, X, AlertCircle, Info, Mail, Send, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AutomotiveSectionProps {
  currentLang: Language;
  listings: CarListing[];
}

interface VehicleCardProps {
  key?: string;
  car: CarListing;
  currentLang: Language;
  onOpenModal: (car: CarListing) => void;
  isRTL: boolean;
  t: any;
}

function VehicleCard({ car, currentLang, onOpenModal, isRTL, t }: VehicleCardProps) {
  const isSold = car.status === 'sold';
  const images = car.imageUrls && car.imageUrls.length > 0 ? car.imageUrls : [car.imageUrl];
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div 
      id={`car-card-${car.id}`}
      className="group bg-[#111111] border border-white/10 rounded-sm overflow-hidden shadow-xl hover:shadow-2xl hover:border-[#C5A059]/30 transition-all flex flex-col justify-between"
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden bg-[#0A0A0A] group/slider">
        <img 
          src={images[currentIndex]} 
          alt={car.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
          referrerPolicy="no-referrer"
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4 font-sans z-10" style={{ left: isRTL ? 'auto' : '1rem', right: isRTL ? '1rem' : 'auto' }}>
          {isSold ? (
            <span className="bg-black/90 text-[#C5A059] border border-[#C5A059]/30 font-bold uppercase text-[10px] tracking-wider px-3 py-1.5 rounded-sm shadow-lg flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></span>
              {t.statusSold}
            </span>
          ) : (
            <span className="bg-[#C5A059] text-black font-bold uppercase text-[10px] tracking-wider px-3 py-1.5 rounded-sm shadow-lg flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
              {t.statusAvailable}
            </span>
          )}
        </div>

        {/* Cost Badge */}
        <div className="absolute bottom-4 right-4 bg-[#0A0A0A]/90 border border-white/10 px-3 py-1.5 rounded-sm text-xs font-bold text-white shadow-lg font-mono z-10">
          €{car.price.toLocaleString('de-DE')}
        </div>

        {/* Image Slider Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-[#C5A059] border border-white/10 p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all z-10 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-[#C5A059] border border-white/10 p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all z-10 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Bullet Indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex ? 'bg-[#C5A059] w-3' : 'bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Body Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] font-bold">{car.make}</span>
            <span className="text-xs text-white/30 font-medium">#{car.id}</span>
          </div>
          <h3 className="text-base font-serif text-white group-hover:text-[#C5A059] mb-3 transition-colors">{car.title}</h3>
          <p className="text-xs text-white/50 line-clamp-2 leading-relaxed mb-4 font-sans">
            {car.description[currentLang] || car.description['en']}
          </p>
        </div>

        {/* Specs shortcuts */}
        <div className="grid grid-cols-3 gap-2 py-3 border-t border-white/10 text-white/60 text-[11px] font-mono mb-4">
          <div className="flex items-center gap-1 bg-[#0A0A0A] p-1.5 rounded-sm border border-white/5">
            <Calendar className="w-3.5 h-3.5 text-[#C5A059]/60" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-1 bg-[#0A0A0A] p-1.5 rounded-sm border border-white/5">
            <Milestone className="w-3.5 h-3.5 text-[#C5A059]/60" />
            <span className="truncate">{car.mileage}</span>
          </div>
          <div className="flex items-center gap-1 bg-[#0A0A0A] p-1.5 rounded-sm border border-white/5">
            <Fuel className="w-3.5 h-3.5 text-[#C5A059]/60" />
            <span className="truncate">{car.fuelType}</span>
          </div>
        </div>

        {/* CTA */}
        <button
          id={`car-cta-${car.id}`}
          onClick={() => onOpenModal(car)}
          className="w-full bg-[#0A0A0A] hover:bg-[#111111] text-[#C5A059] font-semibold text-xs uppercase tracking-wider py-2.5 px-4 rounded-sm border border-white/10 hover:border-[#C5A059]/30 transition-all flex items-center justify-center gap-1 shadow-md cursor-pointer"
        >
          <span>{t.viewDetails}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function AutomotiveSection({ currentLang, listings }: AutomotiveSectionProps) {
  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  const [activeFilter, setActiveFilter] = useState<'all' | 'available' | 'sold'>('all');
  const [selectedCar, setSelectedCar] = useState<CarListing | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  
  // Inquiry form states
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);

  const filteredListings = listings.filter((car) => {
    if (activeFilter === 'available') return car.status === 'available';
    if (activeFilter === 'sold') return car.status === 'sold';
    return true;
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail) return;
    
    setInquirySuccess(true);
    setTimeout(() => {
      setInquirySuccess(false);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMsg('');
    }, 4000);
  };

  const handleOpenModal = (car: CarListing) => {
    setSelectedCar(car);
    setModalImageIndex(0);
    setInquirySuccess(false);
    setInquiryMsg(`Hello Kocakint Automotive Team,\nI am interested in the ${car.title}. Please provide regional delivery availability for Berlin and Dubai offices.`);
  };

  return (
    <section className="py-4 text-[#E0E0E0] font-sans bg-transparent" id="automotive-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold font-mono text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/20 px-3 py-1 rounded-sm uppercase tracking-[0.2em]">
            Premium Brokerage
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif tracking-tight mt-3 text-white">
            {t.automotiveTitle}
          </h1>
          <p className="text-sm text-white/50 mt-1.5 font-sans">
            {t.automotiveSubtitle}
          </p>
          <p className="text-xs text-white/45 max-w-2xl mx-auto mt-3 leading-relaxed font-sans">
            {t.automotivePara}
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-white/10 pb-4" id="automotive-toolbar">
          <div className="flex bg-[#0A0A0A] p-1 rounded-sm border border-white/10">
            {(['all', 'available', 'sold'] as const).map((filter) => (
              <button
                key={filter}
                id={`filter-btn-${filter}`}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-xs font-bold rounded-sm uppercase tracking-wider transition-all duration-250 ${
                  activeFilter === filter
                    ? 'bg-[#C5A059] text-black shadow-md'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {filter === 'all' ? t.filterAll : filter === 'available' ? t.filterAvailable : t.filterSold}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-white/40 bg-[#111111] px-3 py-1.5 rounded-sm border border-white/10">
            <span className="text-[#C5A059] font-bold">{filteredListings.length}</span> / {listings.length} listings indexed
          </div>
        </div>

        {/* Vehicle Grid */}
        {filteredListings.length === 0 ? (
          <div className="text-center py-20 bg-[#111111] border border-white/10 rounded-sm p-8" id="no-listings-view">
            <AlertCircle className="w-12 h-12 text-[#C5A059]/50 mx-auto mb-3" />
            <p className="text-white/50 font-medium text-sm">{t.noVehicles}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="listings-grid">
            {filteredListings.map((car) => (
              <VehicleCard 
                key={car.id}
                car={car}
                currentLang={currentLang}
                onOpenModal={handleOpenModal}
                isRTL={isRTL}
                t={t}
              />
            ))}
          </div>
        )}

        {/* Details Drawer / Modal Overlay */}
        <AnimatePresence>
          {selectedCar && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6" id="car-details-overlay">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-[#111111] border border-white/10 rounded-sm overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col justify-between shadow-2xl relative"
                id="car-details-modal"
              >
                {/* Header Close button */}
                <button 
                  onClick={() => setSelectedCar(null)}
                  className="absolute top-4 right-4 z-10 p-2 text-white/50 hover:text-white bg-[#0A0A0A]/80 rounded-sm border border-white/10 hover:scale-105 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Scrollable content panel */}
                <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
                  
                  {/* Title & Brand and badges */}
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] font-bold">{selectedCar.make} / {selectedCar.model}</span>
                    <h2 className="text-xl sm:text-2xl font-serif text-white mt-1">{selectedCar.title}</h2>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedCar.status === 'sold' ? (
                        <span className="bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-sm">
                          {t.statusSold}
                        </span>
                      ) : (
                        <span className="bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-sm">
                          {t.statusAvailable}
                        </span>
                      )}
                      <span className="bg-[#0A0A0A] text-white/60 border border-white/10 text-[10px] font-mono px-3 py-1 rounded-sm">
                        ID: {selectedCar.id}
                      </span>
                      <span className="bg-[#0A0A0A] text-white/60 border border-white/10 text-[10px] font-mono px-3 py-1 rounded-sm">
                        SPEC_REG: GCC & EU COMPLIANT
                      </span>
                    </div>
                  </div>

                  {/* Body Layout (Grid) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Visual & Highlights */}
                    <div className="lg:col-span-7 space-y-5">
                      {/* Interactive Image Slider */}
                      <div className="relative aspect-video overflow-hidden bg-[#0A0A0A] rounded-sm border border-white/10 group/modal-slider">
                        <img 
                          src={(selectedCar.imageUrls && selectedCar.imageUrls.length > 0 ? selectedCar.imageUrls : [selectedCar.imageUrl])[modalImageIndex]} 
                          alt={selectedCar.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        
                        {(selectedCar.imageUrls && selectedCar.imageUrls.length > 1) && (
                          <>
                            {/* Left Arrow */}
                            <button
                              onClick={() => {
                                const urls = selectedCar.imageUrls || [selectedCar.imageUrl];
                                setModalImageIndex((prev) => (prev === 0 ? urls.length - 1 : prev - 1));
                              }}
                              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-black text-[#C5A059] border border-white/10 p-2 rounded-full transition-all z-10 hover:scale-110 active:scale-95 cursor-pointer"
                              aria-label="Previous slide"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            
                            {/* Right Arrow */}
                            <button
                              onClick={() => {
                                const urls = selectedCar.imageUrls || [selectedCar.imageUrl];
                                setModalImageIndex((prev) => (prev === urls.length - 1 ? 0 : prev + 1));
                              }}
                              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-black text-[#C5A059] border border-white/10 p-2 rounded-full transition-all z-10 hover:scale-110 active:scale-95 cursor-pointer"
                              aria-label="Next slide"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                            
                            {/* Indicators */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                              {(selectedCar.imageUrls || [selectedCar.imageUrl]).map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setModalImageIndex(idx)}
                                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                                    idx === modalImageIndex ? 'bg-[#C5A059] w-4' : 'bg-white/40 hover:bg-white/70'
                                  }`}
                                  aria-label={`Go to slide ${idx + 1}`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Thumbnail Strip */}
                      {(selectedCar.imageUrls && selectedCar.imageUrls.length > 1) && (
                        <div className="flex gap-2 overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-white/10" id="modal-thumbnail-strip">
                          {selectedCar.imageUrls.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => setModalImageIndex(idx)}
                              className={`relative aspect-video w-20 rounded-sm overflow-hidden border transition-all flex-shrink-0 cursor-pointer ${
                                idx === modalImageIndex 
                                  ? 'border-[#C5A059] ring-1 ring-[#C5A059]' 
                                  : 'border-white/10 hover:border-white/40 opacity-60 hover:opacity-100'
                              }`}
                            >
                              <img 
                                src={img} 
                                alt={`${selectedCar.title} - View ${idx + 1}`} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </button>
                          ))}
                        </div>
                      )}

                      <div>
                        <h4 className="text-xs font-mono uppercase text-[#C5A059] tracking-wider mb-2">Vehicles Portfolio Description</h4>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed bg-[#0A0A0A]/40 p-4 rounded-sm border border-white/10 font-sans">
                          {selectedCar.description[currentLang] || selectedCar.description['en']}
                        </p>
                      </div>

                      {/* Technical specifications blocks */}
                      <div>
                        <h4 className="text-xs font-mono uppercase text-[#C5A059] tracking-wider mb-3">{t.specsLabel}</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedCar.specs.map((s, i) => (
                            <span key={i} className="bg-[#0A0A0A] border border-white/10 text-white/70 px-2.5 py-1 rounded-sm text-xs font-medium">
                              • {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Financials & Inquiry Box */}
                    <div className="lg:col-span-5 space-y-5">
                      
                      {/* Financial summary banner */}
                      <div className="bg-[#0A0A0A] border border-white/10 p-4 rounded-sm space-y-3 shadow-inner">
                        <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                          <span className="text-white/30 font-mono">FINANCIAL CODE: BR-DB-A</span>
                          <span className="text-[#C5A059] font-mono">NET EXPORT VALUE</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs text-white/50 font-medium">{t.priceLabel}:</span>
                          <span className="text-xl sm:text-2xl font-bold text-white font-mono">€{selectedCar.price.toLocaleString('de-DE')}</span>
                        </div>

                        {/* Fast spec bullets */}
                        <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-white/60">
                          <div className="flex justify-between font-mono"><span className="text-white/30">{t.yearLabel}:</span> <span className="text-white font-bold">{selectedCar.year}</span></div>
                          <div className="flex justify-between font-mono"><span className="text-white/30">{t.mileageLabel}:</span> <span className="text-white font-bold">{selectedCar.mileage}</span></div>
                          <div className="flex justify-between font-mono"><span className="text-white/30">{t.fuelLabel}:</span> <span className="text-white font-bold">{selectedCar.fuelType}</span></div>
                          <div className="flex justify-between font-mono"><span className="text-white/30">{t.transmissionLabel}:</span> <span className="text-white font-bold">{selectedCar.transmission}</span></div>
                        </div>
                      </div>

                      {/* Contact Inquire Form */}
                      <div className="bg-[#111111] border border-white/10 p-4 sm:p-5 rounded-sm">
                        <h4 className="text-xs font-bold text-[#C5A059] mb-1 flex items-center gap-1.5 font-mono uppercase tracking-wider">
                          <Mail className="w-4 h-4" />
                          {t.inquireBtn}
                        </h4>
                        <p className="text-[10px] text-white/40 mb-4 leading-normal font-sans">
                          Get immediate export logistics quotes from our physical agents in Berlin and Dubai offices.
                        </p>

                        {inquirySuccess ? (
                          <div className="p-4 bg-[#111111] border border-[#C5A059]/20 text-[#C5A059] rounded-sm space-y-2 text-center animate-fadeIn">
                            <CheckCircle2 className="w-8 h-8 mx-auto" />
                            <p className="text-xs font-serif uppercase tracking-wider font-bold">Inquiry Transmitted Successfully</p>
                            <p className="text-[10px] text-white/60 leading-normal font-sans">Our European and Gulf division logs registered this inquiry. A local advisor will contact you within 2 hours.</p>
                          </div>
                        ) : (
                          <form onSubmit={handleInquirySubmit} className="space-y-3 text-xs">
                            <div className="grid grid-cols-2 gap-2">
                              <input 
                                type="text" 
                                required
                                value={inquiryName}
                                onChange={(e) => setInquiryName(e.target.value)}
                                placeholder={t.contactPlaceholderName}
                                className="w-full bg-[#0A0A0A] rounded-sm border border-white/10 p-2 text-white focus:outline-none focus:border-[#C5A059]"
                              />
                              <input 
                                type="email" 
                                required
                                value={inquiryEmail}
                                onChange={(e) => setInquiryEmail(e.target.value)}
                                placeholder={t.contactPlaceholderEmail}
                                className="w-full bg-[#0A0A0A] rounded-sm border border-white/10 p-2 text-white focus:outline-none focus:border-[#C5A059]"
                              />
                            </div>
                            <textarea
                              rows={3}
                              required
                              value={inquiryMsg}
                              onChange={(e) => setInquiryMsg(e.target.value)}
                              className="w-full bg-[#0A0A0A] rounded-sm border border-white/10 p-2 text-white focus:outline-none focus:border-[#C5A059] font-sans"
                            />
                            
                            <button
                              type="submit"
                              disabled={selectedCar.status === 'sold'}
                              className={`w-full font-semibold uppercase tracking-wider text-xs py-2.5 px-4 rounded-sm flex items-center justify-center gap-1.5 transition-all shadow-md ${
                                selectedCar.status === 'sold'
                                  ? 'bg-[#222222] text-white/20 cursor-not-allowed border border-white/5'
                                  : 'bg-[#C5A059] hover:bg-[#b08e4f] text-black active:translate-y-0.5'
                              }`}
                            >
                              {selectedCar.status === 'sold' ? (
                                <span>Vehicle Marked Sold (Offline)</span>
                              ) : (
                                <>
                                  <span>Transmit Brokerage Inquiry</span>
                                  <Send className="w-3.5 h-3.5" />
                                </>
                              )}
                            </button>
                          </form>
                        )}
                      </div>

                    </div>

                  </div>

                </div>

                {/* Footer panel */}
                <div className="bg-[#0A0A0A] p-4 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-white/30">
                  <span>LOGISTICS SPECIFICATION: EURO-GCC AIR & SEA ROUTING READY</span>
                  <button onClick={() => setSelectedCar(null)} className="text-[#C5A059] hover:underline uppercase tracking-wider font-semibold text-[10px]">{t.closeBtn}</button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
