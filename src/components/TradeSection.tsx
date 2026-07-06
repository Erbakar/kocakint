/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Landmark, ArrowLeftRight, Ship, ShieldAlert, BadgePercent, Globe2, Anchor, ArrowUpRight, Scale } from 'lucide-react';

interface TradeSectionProps {
  currentLang: Language;
}

export default function TradeSection({ currentLang }: TradeSectionProps) {
  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  const tradeMetrics = [
    { label: currentLang === 'de' ? 'Jährliches Handelsvolumen' : currentLang === 'ar' ? 'حجم التبادل التجاري السنوي' : 'Annual Managed Trade Volume', value: '€82.4M+' },
    { label: currentLang === 'de' ? 'Freigegebene Sendungen' : currentLang === 'ar' ? 'شحنات مستخلصة بنجاح' : 'Cleared Shipments', value: '1,450+' },
    { label: currentLang === 'de' ? 'Aktive Korridore' : currentLang === 'ar' ? 'ممرات لوجستية نشطة' : 'Active Intercontinental Corridors', value: '4 Major Routes' },
    { label: currentLang === 'de' ? 'Logistik-Partner' : currentLang === 'ar' ? 'شركاء الخدمات اللوجستية' : 'Tier-1 Logistics Partners', value: '12 Global Ports' }
  ];

  return (
    <section className="py-4 text-[#E0E0E0] font-sans bg-transparent" id="trade-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold font-mono text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/20 px-3 py-1 rounded-sm uppercase tracking-[0.2em]">
            Schengen ⇄ GCC Gateway
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif tracking-tight mt-3 text-white">
            {t.tradeTitle}
          </h1>
          <p className="text-sm text-white/50 mt-2 font-sans">
            {t.tradeSubtitle}
          </p>
        </div>

        {/* Trade Metrics Panel */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {tradeMetrics.map((m, i) => (
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
          
          {/* Main Editorial Text (SEO/GEO Rich) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#111111] border border-white/10 rounded-sm p-6">
            <div>
              <h3 className="text-base font-serif text-white mb-3 flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-[#C5A059]" />
                Intercontinental Commerce Hub
              </h3>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4 font-sans">
                {t.tradeMainPara}
              </p>
              
              <div className="space-y-3">
                <div className="border-l-2 border-[#C5A059] pl-3 py-0.5">
                  <h4 className="text-xs sm:text-sm font-serif text-white">{t.tradeRoute1}</h4>
                  <p className="text-xs text-white/50 mt-0.5 font-sans">{t.tradeRoute1Desc}</p>
                </div>
                <div className="border-l-2 border-[#C5A059] pl-3 py-0.5">
                  <h4 className="text-xs sm:text-sm font-serif text-white">{t.tradeRoute2}</h4>
                  <p className="text-xs text-white/50 mt-0.5 font-sans">{t.tradeRoute2Desc}</p>
                </div>
              </div>
            </div>

            {/* Regulatory Section */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <h4 className="text-xs font-mono uppercase text-[#C5A059] tracking-wider mb-1.5 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                {t.tradeComplianceTitle}
              </h4>
              <p className="text-xs text-white/40 leading-relaxed font-sans">
                {t.tradeComplianceDesc}
              </p>
            </div>
          </div>

          {/* Graphical/Structured Compliance Info cards */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="bg-[#111111] border border-white/10 rounded-sm p-5 flex-1">
              <h3 className="text-xs font-mono text-[#C5A059] mb-3 uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
                <Ship className="w-4 h-4" />
                Port Clearance Protocols
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-sm bg-[#0A0A0A] flex items-center justify-center text-[10px] font-mono text-[#C5A059] border border-white/10 shrink-0">01</div>
                  <div>
                    <h4 className="text-xs font-serif text-white">German BAFA Audit</h4>
                    <p className="text-[10px] text-white/50 mt-0.5 font-sans">Dual-use item screening and compliance authorization matching in accordance with German Federal Export regulations.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-sm bg-[#0A0A0A] flex items-center justify-center text-[10px] font-mono text-[#C5A059] border border-white/10 shrink-0">02</div>
                  <div>
                    <h4 className="text-xs font-serif text-white">Schengen Customs Clearance</h4>
                    <p className="text-[10px] text-white/50 mt-0.5 font-sans">Unified Customs Tariff matching (TARIC code matching) optimized directly through our office in Berlin, Germany.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-sm bg-[#0A0A0A] flex items-center justify-center text-[10px] font-mono text-[#C5A059] border border-white/10 shrink-0">03</div>
                  <div>
                    <h4 className="text-xs font-serif text-white">Dubai Customs Clearance</h4>
                    <p className="text-[10px] text-white/50 mt-0.5 font-sans">GCC Customs Union compliant reporting, clearing import/transit protocols in Jebel Ali Port and Dubai Al Maktoum Airport.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Interactive Global Route Visualizer */}
        <div className="bg-[#111111] border border-white/10 rounded-sm p-5 text-center relative overflow-hidden" id="trade-map-visualizer">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
          
          <h3 className="text-xs font-serif text-white mb-4 uppercase tracking-wider">
            Active Multi-Modal Trade Pathways
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10 py-4">
            
            {/* Source: Berlin */}
            <div className="bg-[#0A0A0A] border border-white/10 p-3.5 rounded-sm w-full md:w-60 text-left relative shadow-lg">
              <span className="text-[9px] bg-[#C5A059]/10 text-[#C5A059] px-2 py-0.5 rounded-sm border border-[#C5A059]/20 font-bold font-mono">SOURCE OFFICE</span>
              <h4 className="text-xs sm:text-sm font-serif text-white mt-1.5">Berlin, Germany Hub</h4>
              <p className="text-[10px] text-white/50 mt-1 leading-relaxed font-sans">Centralized procurement of machinery, electronic assemblies, and premium German automotive fleets.</p>
            </div>

            {/* Transit Line */}
            <div className="flex-1 w-full flex flex-col items-center justify-center min-w-[120px]">
              <div className="w-full h-[1px] bg-[#C5A059] relative flex items-center justify-center">
                <div className="absolute top-1/2 -translate-y-1/2 left-1/4 w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping"></div>
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 -translate-y-1/2 left-3/4 w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping" style={{ animationDelay: '2s' }}></div>
              </div>
              <span className="text-[9px] font-mono text-[#C5A059] mt-1.5 uppercase tracking-wider flex items-center gap-1">
                <ArrowLeftRight className="w-3 h-3" />
                Schengen ⇄ Gulf Corridor
              </span>
              <span className="text-[8px] text-white/30 mt-0.5 font-mono">Transit Time: Air (6h) / Sea (18d)</span>
            </div>

            {/* Destination: Dubai */}
            <div className="bg-[#0A0A0A] border border-white/10 p-3.5 rounded-sm w-full md:w-60 text-left relative shadow-lg">
              <span className="text-[9px] bg-[#C5A059]/10 text-[#C5A059] px-2 py-0.5 rounded-sm border border-[#C5A059]/20 font-bold font-mono">DISTRIBUTION HUB</span>
              <h4 className="text-xs sm:text-sm font-serif text-white mt-1.5">Dubai, UAE Branch</h4>
              <p className="text-[10px] text-white/50 mt-1 leading-relaxed font-sans">Tax-free logistics storage, custom brokerage, re-export routing into GCC, Middle East & Asian markets.</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
