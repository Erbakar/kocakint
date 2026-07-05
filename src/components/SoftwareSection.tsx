/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Cpu, Cloud, Code, GitBranch, ArrowRight, Server, ShieldCheck, Database, Sliders, Settings } from 'lucide-react';
import { motion } from 'motion/react';

interface SoftwareSectionProps {
  currentLang: Language;
}

export default function SoftwareSection({ currentLang }: SoftwareSectionProps) {
  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  // State for the interactive system planner
  const [planner, setPlanner] = useState({
    industry: 'fintech',
    scale: 'million',
    hosting: 'gcp'
  });

  const [simulationResult, setSimulationResult] = useState<any>(null);

  const runPlannerSimulation = () => {
    let architecture = '';
    let components: string[] = [];
    let compliance = '';

    if (planner.industry === 'fintech') {
      architecture = 'Distributed Ledger / Event Sourced microservices with high transaction isolation.';
      components = ['Apache Kafka', 'PostgreSQL (Cloud SQL)', 'Go / Rust APIs', 'Redis Cluster'];
      compliance = currentLang === 'de' 
        ? 'BaFin / DSGVO-konform, mit Ende-zu-Ende-Verschlüsselung im Ruhezustand.' 
        : currentLang === 'ar'
        ? 'متوافق مع سلطة دبي للخدمات المالية (DFSA) والبنك المركزي لدولة الإمارات، تشفير عالي الكفاءة.'
        : 'BaFin, GDPR & DFSA dual-compliant, utilizing hardware security modules (HSM) and KMS envelope encryption.';
    } else if (planner.industry === 'logistics') {
      architecture = 'Real-time telemetry streams, event mesh, and edge database replication.';
      components = ['MQTT Brokers', 'TimescaleDB', 'Node.js Edge Workers', 'Google BigQuery'];
      compliance = currentLang === 'de'
        ? 'Einhaltung der Lieferketten-Richtlinien, GPS-Echtzeit-Tracking-Garantie.'
        : currentLang === 'ar'
        ? 'الامتثال الكامل للجمارك وسلاسل التوريد، تتبع فوري عبر الأقمار الصناعية.'
        : 'Cross-border dual-customs audit logging, fully GDPR-compliant tracking and transit monitoring.';
    } else {
      architecture = 'High-frequency inventory sync & auto-scaling container mesh.';
      components = ['Kubernetes', 'Elasticsearch', 'Python AI Sourcing Engines', 'MongoDB Atlas'];
      compliance = currentLang === 'de'
        ? 'Vollständig integrierte Bestandsprüfung, DSGVO-konforme Speicherung.'
        : currentLang === 'ar'
        ? 'تكامل تام مع خدمات تخليص جبل علي، تخزين آمن لبيانات الموردين.'
        : 'JAFZA & EU trade customs API integrations, storage in highly secure ISO-27001 sovereign clouds.';
    }

    setSimulationResult({
      architecture,
      components,
      compliance,
      timestamp: new Date().toLocaleTimeString()
    });
  };

  const techCompetencies = [
    {
      icon: Cpu,
      title: t.softwareFeat1Title,
      desc: t.softwareFeat1Desc,
      color: 'border-white/10'
    },
    {
      icon: Cloud,
      title: t.softwareFeat2Title,
      desc: t.softwareFeat2Desc,
      color: 'border-white/10'
    },
    {
      icon: Code,
      title: t.softwareFeat3Title,
      desc: t.softwareFeat3Desc,
      color: 'border-white/10'
    }
  ];

  const technologies = [
    { category: 'Languages', items: ['TypeScript', 'Go', 'Rust', 'Python', 'C++'] },
    { category: 'Cloud & DevOps', items: ['Google Cloud', 'AWS', 'Kubernetes', 'Docker', 'Terraform'] },
    { category: 'Frameworks', items: ['React / Vite', 'Next.js', 'Express.js', 'FastAPI', 'gRPC'] },
    { category: 'Databases', items: ['PostgreSQL', 'Redis', 'MongoDB', 'TimescaleDB', 'Pinecone (Vector DB)'] }
  ];

  return (
    <section className="py-4 text-[#E0E0E0] font-sans bg-transparent" id="software-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold font-mono text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/20 px-3 py-1 rounded-sm uppercase tracking-[0.2em]">
            Berlin Tech Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif tracking-tight mt-3 text-white">
            {t.softwareTitle}
          </h1>
          <p className="text-sm text-white/50 mt-1.5 font-sans">
            {t.softwareSubtitle}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          
          {/* Main Details Panel */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-[#111111] border border-white/10 p-5 rounded-sm shadow-xl">
              <h2 className="text-base font-serif text-white mb-3 flex items-center gap-2">
                <Server className="w-4 h-4 text-[#C5A059]" />
                Enterprise Architectural Design
              </h2>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4 font-sans">
                {t.softwareMainPara}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-white/10">
                <div className="p-2.5 bg-[#0A0A0A] rounded-sm text-center border border-white/10">
                  <span className="block text-xl font-serif font-bold text-[#C5A059]">100%</span>
                  <span className="text-[9px] text-white/40 uppercase tracking-widest font-mono">GDPR Compliant</span>
                </div>
                <div className="p-2.5 bg-[#0A0A0A] rounded-sm text-center border border-white/10">
                  <span className="block text-xl font-serif font-bold text-[#C5A059]">99.99%</span>
                  <span className="text-[9px] text-white/40 uppercase tracking-widest font-mono">SLA Uptime</span>
                </div>
                <div className="p-2.5 bg-[#0A0A0A] rounded-sm text-center border border-white/10">
                  <span className="block text-xl font-serif font-bold text-[#C5A059]">&lt;50ms</span>
                  <span className="text-[9px] text-white/40 uppercase tracking-widest font-mono">Global Latency</span>
                </div>
              </div>
            </div>

            {/* Competency cards */}
            <div className="space-y-3">
              {techCompetencies.map((comp, idx) => {
                const IconComp = comp.icon;
                return (
                  <div 
                    key={idx} 
                    className="group bg-[#111111] p-4 rounded-sm border border-white/10 hover:border-[#C5A059]/30 transition-all flex gap-3.5 items-start"
                  >
                    <div className="p-2.5 rounded-sm bg-[#0A0A0A] border border-white/10 text-[#C5A059] shadow-sm shrink-0">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-serif text-white group-hover:text-[#C5A059] transition-colors">{comp.title}</h3>
                      <p className="text-xs text-white/50 mt-0.5 leading-relaxed font-sans">{comp.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Technology planner Tool Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#111111] p-6 rounded-sm border border-white/10 shadow-2xl relative overflow-hidden">
              <h3 className="text-base font-serif text-white mb-1 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#C5A059]" />
                Enterprise Tech Planner
              </h3>
              <p className="text-xs text-white/40 mb-4 font-sans">
                Configure your target parameters to synthesize an enterprise production architecture drafted by Kocakint Berlin engineers.
              </p>

              {/* Form Controls */}
              <div className="space-y-3.5">
                <div>
                  <label className="block text-[10px] font-mono text-white/40 uppercase tracking-wider mb-1">Industry Vertical</label>
                  <select 
                    value={planner.industry} 
                    onChange={(e) => setPlanner({ ...planner, industry: e.target.value })}
                    className="w-full bg-[#0A0A0A] text-white text-xs rounded-sm border border-white/10 p-2.5 focus:border-[#C5A059] outline-none"
                  >
                    <option value="fintech">Fintech & Cross-border Payments</option>
                    <option value="logistics">Smart Supply Chain & IoT Tracking</option>
                    <option value="commerce">E-Commerce & High-frequency Sourcing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-white/40 uppercase tracking-wider mb-1">Scale Requirement</label>
                  <select 
                    value={planner.scale} 
                    onChange={(e) => setPlanner({ ...planner, scale: e.target.value })}
                    className="w-full bg-[#0A0A0A] text-white text-xs rounded-sm border border-white/10 p-2.5 focus:border-[#C5A059] outline-none"
                  >
                    <option value="million">Enterprise Scale (&gt;10M requests/day)</option>
                    <option value="startup">Corporate MVP / Multi-Regional Launch</option>
                    <option value="global">Global Mesh / Multi-datacenter Active-Active</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-white/40 uppercase tracking-wider mb-1">Primary Sovereign Cloud</label>
                  <select 
                    value={planner.hosting} 
                    onChange={(e) => setPlanner({ ...planner, hosting: e.target.value })}
                    className="w-full bg-[#0A0A0A] text-white text-xs rounded-sm border border-white/10 p-2.5 focus:border-[#C5A059] outline-none"
                  >
                    <option value="gcp">Google Cloud Platform (EU / GCC Regions)</option>
                    <option value="aws">Amazon Web Services (Frankfurt / Bahrain)</option>
                    <option value="hybrid">Hybrid Sovereign Cloud (Private + Public Mesh)</option>
                  </select>
                </div>

                <button 
                  onClick={runPlannerSimulation}
                  className="w-full bg-[#C5A059] hover:bg-[#b08e4f] text-black font-semibold text-xs uppercase tracking-widest py-3 px-4 rounded-sm transition-all flex items-center justify-center gap-1.5 shadow-md active:translate-y-0.5"
                >
                  Synthesize Architecture Design
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Simulation Result Output */}
              {simulationResult && (
                <div className="mt-4 p-4 bg-[#0A0A0A] rounded-sm border border-white/10 font-mono text-[10px] text-white/60 space-y-2 animate-fadeIn">
                  <div className="flex justify-between items-center text-[9px] text-white/30 border-b border-white/10 pb-1.5">
                    <span>STATUS: COMPILED SUCCESSFULLY</span>
                    <span>{simulationResult.timestamp}</span>
                  </div>
                  <div>
                    <span className="text-[#C5A059] block font-bold mb-1">Recommended Topology:</span>
                    <p className="text-[11px] leading-relaxed text-white/80 font-sans">{simulationResult.architecture}</p>
                  </div>
                  <div>
                    <span className="text-[#C5A059] block font-bold mb-1">Target Stack:</span>
                    <div className="flex flex-wrap gap-1">
                      {simulationResult.components.map((c: string, i: number) => (
                        <span key={i} className="bg-[#111111] text-[9px] px-1.5 py-0.5 rounded-sm border border-white/10 text-white/70">{c}</span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-1.5 border-t border-white/10">
                    <span className="text-[#C5A059] block font-bold mb-0.5 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" /> Regulatory Clearance:
                    </span>
                    <p className="text-[10px] text-white/40 leading-normal font-sans">{simulationResult.compliance}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Tech Stack Competency Grid */}
        <div className="border-t border-white/10 pt-12">
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#C5A059] text-center mb-8">{t.softwareTechStack}</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, idx) => (
              <div key={idx} className="bg-[#111111] border border-white/10 rounded-sm p-4 hover:border-[#C5A059]/20 transition-all">
                <h4 className="text-xs font-mono font-bold text-[#C5A059] mb-3 border-b border-white/10 pb-1.5 uppercase tracking-wider">{tech.category}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {tech.items.map((item, idy) => (
                    <span key={idy} className="bg-[#0A0A0A] hover:bg-[#111111] text-white/60 hover:text-white px-2.5 py-1 rounded-sm text-xs border border-white/10 transition-all">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
