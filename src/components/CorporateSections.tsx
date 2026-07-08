/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Language, ActiveSection } from '../types';
import { translations } from '../translations';
import {
  MapPin,
  Award,
  Shield,
  Handshake,
  Target,
  ArrowUpRight,
  Briefcase,
} from 'lucide-react';
import { motion } from 'motion/react';

interface CorporateSectionsProps {
  currentLang: Language;
  onSectionChange: (section: ActiveSection) => void;
}

function getLocalizedText(
  currentLang: Language,
  texts: { en: string; de: string; ar: string; tr: string }
) {
  return texts[currentLang] || texts.en;
}

export function CorporateStatsBar({ currentLang }: { currentLang: Language }) {
  const stats = [
    {
      value: '15+',
      label: getLocalizedText(currentLang, {
        en: 'Years of Excellence',
        de: 'Jahre Exzellenz',
        ar: 'سنوات من التميز',
        tr: 'Yıllık Deneyim',
      }),
    },
    {
      value: '5',
      label: getLocalizedText(currentLang, {
        en: 'Business Divisions',
        de: 'Geschäftsbereiche',
        ar: 'قطاعات أعمال',
        tr: 'İş Kolu',
      }),
    },
    {
      value: '2',
      label: getLocalizedText(currentLang, {
        en: 'Global Headquarters',
        de: 'Globale Hauptsitze',
        ar: 'مقرات عالمية',
        tr: 'Küresel Merkez',
      }),
    },
    {
      value: '€82M+',
      label: getLocalizedText(currentLang, {
        en: 'Annual Trade Volume',
        de: 'Jährliches Handelsvolumen',
        ar: 'حجم التجارة السنوي',
        tr: 'Yıllık Ticaret Hacmi',
      }),
    },
  ];

  return (
    <section className="relative z-20 -mt-1 border-b border-white/10 bg-[#0D0D0D]" id="corporate-stats">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="py-8 sm:py-10 px-4 sm:px-8 text-center"
            >
              <div className="corp-stat-value">{stat.value}</div>
              <div className="corp-stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CorporateAboutSection({ currentLang }: { currentLang: Language }) {
  const isRTL = currentLang === 'ar';

  const values = [
    {
      icon: Target,
      title: getLocalizedText(currentLang, {
        en: 'Strategic Vision',
        de: 'Strategische Vision',
        ar: 'رؤية استراتيجية',
        tr: 'Stratejik Vizyon',
      }),
      desc: getLocalizedText(currentLang, {
        en: 'Long-term partnerships built on transparency, precision, and measurable results across every division.',
        de: 'Langfristige Partnerschaften auf Basis von Transparenz, Präzision und messbaren Ergebnissen.',
        ar: 'شراكات طويلة الأمد مبنية على الشفافية والدقة والنتائج القابلة للقياس.',
        tr: 'Her iş kolunda şeffaflık, hassasiyet ve ölçülebilir sonuçlara dayalı uzun vadeli ortaklıklar.',
      }),
    },
    {
      icon: Shield,
      title: getLocalizedText(currentLang, {
        en: 'Regulatory Excellence',
        de: 'Regulatorische Exzellenz',
        ar: 'الامتثال التنظيمي',
        tr: 'Düzenleyici Mükemmellik',
      }),
      desc: getLocalizedText(currentLang, {
        en: 'Full compliance with EU GDPR, Schengen customs, GCC regulations, and DMCC corporate standards.',
        de: 'Vollständige Einhaltung von EU-DSGVO, Schengen-Zoll, GCC-Vorschriften und DMCC-Standards.',
        ar: 'امتثال كامل للائحة GDPR الأوروبية وجمارك شنغن ولوائح مجلس التعاون الخليجي.',
        tr: 'AB GDPR, Schengen gümrük, KİGK düzenlemeleri ve DMCC kurumsal standartlarına tam uyum.',
      }),
    },
    {
      icon: Handshake,
      title: getLocalizedText(currentLang, {
        en: 'Cross-Border Expertise',
        de: 'Grenzüberschreitende Expertise',
        ar: 'خبرة عابرة للحدود',
        tr: 'Sınır Ötesi Uzmanlık',
      }),
      desc: getLocalizedText(currentLang, {
        en: 'Seamless operations bridging Berlin and Dubai — from software engineering to luxury automotive logistics.',
        de: 'Nahtlose Operationen zwischen Berlin und Dubai — von Softwareentwicklung bis Luxusautomobil-Logistik.',
        ar: 'عمليات سلسة تربط برلين ودبي — من هندسة البرمجيات إلى لوجستيات السيارات الفاخرة.',
        tr: 'Berlin ve Dubai arasında yazılımdan lüks otomotiv lojistiğine kesintisiz operasyonlar.',
      }),
    },
  ];

  return (
    <section className="py-20 sm:py-28 border-b border-white/10" id="about-kocakint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-sm border border-white/10 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                alt="Corporate headquarters"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                <div className="corp-card px-4 py-3 backdrop-blur-md bg-black/60 flex-1">
                  <MapPin className="w-4 h-4 text-[#C5A059] mb-1" />
                  <p className="text-xs font-semibold text-white">Berlin, Germany</p>
                  <p className="text-[10px] text-white/50">European Operations HQ</p>
                </div>
                <div className="corp-card px-4 py-3 backdrop-blur-md bg-black/60 flex-1">
                  <MapPin className="w-4 h-4 text-[#C5A059] mb-1" />
                  <p className="text-xs font-semibold text-white">Dubai, UAE</p>
                  <p className="text-[10px] text-white/50">Middle East & Asia HQ</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-[#C5A059]/20 rounded-sm -z-10 hidden sm:block" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: isRTL ? 'right' : 'left' }}
          >
            <span className="section-label">
              {getLocalizedText(currentLang, {
                en: 'About Kocakint',
                de: 'Über Kocakint',
                ar: 'عن كوكاكينت',
                tr: 'Kocakint Hakkında',
              })}
            </span>
            <div className="gold-accent-line" style={{ marginLeft: isRTL ? 'auto' : 0, marginRight: isRTL ? 0 : 'auto' }} />
            <h2 className="section-title mb-5">
              {getLocalizedText(currentLang, {
                en: 'A Global Conglomerate Built on German Precision & Gulf Ambition',
                de: 'Ein globales Konglomerat auf Basis deutscher Präzision und Golf-Ambition',
                ar: 'مجموعة عالمية مبنية على الدقة الألمانية والطموح الخليجي',
                tr: 'Alman Hassasiyeti ve Körfez Vizyonu Üzerine Kurulu Küresel Konglomerat',
              })}
            </h2>
            <p className="section-subtitle mb-4">
              {getLocalizedText(currentLang, {
                en: 'Founded at the intersection of European engineering excellence and Middle Eastern commercial dynamism, Kocakint operates as a diversified holding company spanning software technologies, international trade, premium automotive brokerage, car care, and luxury vehicle rental.',
                de: 'Gegründet an der Schnittstelle europäischer Ingenieurskunst und nahöstlicher Wirtschaftsdynamik, operiert Kocakint als diversifiziertes Holdingunternehmen in Software, Außenhandel, Automobilvermittlung, Fahrzeugpflege und Luxusvermietung.',
                ar: 'تأسست كوكاكينت عند تقاطع التميز الهندسي الأوروبي والديناميكية التجارية في الشرق الأوسط، وتعمل كشركة قابضة متنوعة في التكنولوجيا والتجارة الدولية ووساطة السيارات الفاخرة.',
                tr: 'Avrupa mühendislik mükemmelliği ile Orta Doğu ticari dinamizminin kesişiminde kurulan Kocakint; yazılım, dış ticaret, otomotiv brokerliği, araç bakımı ve lüks araç kiralama alanlarında faaliyet gösteren çeşitlendirilmiş bir holding şirketidir.',
              })}
            </p>
            <p className="text-sm text-white/45 leading-relaxed mb-8">
              {getLocalizedText(currentLang, {
                en: 'Our dual-headquarter model in Berlin and Dubai enables us to serve clients across the EU, GCC, and broader international markets with localized expertise and unified corporate governance.',
                de: 'Unser Dual-Hauptsitz-Modell in Berlin und Dubai ermöglicht es uns, Kunden in der EU, im GCC und international mit lokaler Expertise zu bedienen.',
                ar: 'نموذج المقر المزدوج في برلين ودبي يمكننا من خدمة العملاء في الاتحاد الأوروبي ودول مجلس التعاون الخليجي بخبرة محلية.',
                tr: 'Berlin ve Dubai\'deki çift merkez modelimiz, AB, KİGK ve uluslararası pazarlarda yerel uzmanlıkla hizmet vermemizi sağlar.',
              })}
            </p>

            <div className="space-y-5">
              {values.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <div key={idx} className="flex gap-4" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <div className="shrink-0 w-10 h-10 rounded-sm bg-[#C5A059]/10 border border-[#C5A059]/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#C5A059]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1">{value.title}</h3>
                      <p className="text-xs text-white/50 leading-relaxed">{value.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function CorporateTrustBar({ currentLang }: { currentLang: Language }) {
  const certifications = [
    { label: 'ISO 27001', sub: 'Information Security' },
    { label: 'GDPR', sub: 'EU Data Protection' },
    { label: 'DMCC', sub: 'Dubai Free Zone' },
    { label: 'BaFin', sub: 'Financial Compliance' },
    { label: 'GCC Customs', sub: 'Trade Clearance' },
    { label: 'Schengen', sub: 'EU Border Protocol' },
  ];

  return (
    <section className="py-14 sm:py-16 bg-[#0D0D0D] border-b border-white/10" id="trust-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="section-label">
            {getLocalizedText(currentLang, {
              en: 'Standards & Compliance',
              de: 'Standards & Compliance',
              ar: 'المعايير والامتثال',
              tr: 'Standartlar ve Uyumluluk',
            })}
          </span>
          <h3 className="text-xl sm:text-2xl font-serif text-white mt-3">
            {getLocalizedText(currentLang, {
              en: 'Trusted by Regulators Across Two Continents',
              de: 'Vertrauen von Regulierungsbehörden auf zwei Kontinenten',
              ar: 'موثوق من قبل الجهات التنظيمية عبر قارتين',
              tr: 'İki Kıtada Düzenleyici Kurumların Güvencesi',
            })}
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="corp-card corp-card-hover p-5 text-center group"
            >
              <Award className="w-5 h-5 text-[#C5A059]/60 mx-auto mb-3 group-hover:text-[#C5A059] transition-colors" />
              <p className="text-sm font-semibold text-white">{cert.label}</p>
              <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">{cert.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CorporateProcessSection({ currentLang }: { currentLang: Language }) {
  const isRTL = currentLang === 'ar';

  const steps = [
    {
      num: '01',
      title: getLocalizedText(currentLang, {
        en: 'Consultation & Strategy',
        de: 'Beratung & Strategie',
        ar: 'الاستشارة والاستراتيجية',
        tr: 'Danışmanlık ve Strateji',
      }),
      desc: getLocalizedText(currentLang, {
        en: 'Dedicated account managers assess your requirements and design a tailored operational roadmap.',
        de: 'Persönliche Account Manager bewerten Ihre Anforderungen und erstellen einen maßgeschneiderten Fahrplan.',
        ar: 'مديرو حسابات مخصصون يقيّمون متطلباتكم ويصممون خارطة طريق تشغيلية.',
        tr: 'Özel hesap yöneticileri gereksinimlerinizi değerlendirir ve size özel operasyon planı oluşturur.',
      }),
    },
    {
      num: '02',
      title: getLocalizedText(currentLang, {
        en: 'Execution & Compliance',
        de: 'Umsetzung & Compliance',
        ar: 'التنفيذ والامتثال',
        tr: 'Uygulama ve Uyumluluk',
      }),
      desc: getLocalizedText(currentLang, {
        en: 'Cross-border operations managed with full regulatory clearance in both EU and GCC jurisdictions.',
        de: 'Grenzüberschreitende Operationen mit vollständiger regulatorischer Freigabe in EU und GCC.',
        ar: 'عمليات عابرة للحدود تُدار بموافقات تنظيمية كاملة في الاتحاد الأوروبي ودول الخليج.',
        tr: 'AB ve KİGK yargı bölgelerinde tam düzenleyici onayla yönetilen sınır ötesi operasyonlar.',
      }),
    },
    {
      num: '03',
      title: getLocalizedText(currentLang, {
        en: 'Delivery & Support',
        de: 'Lieferung & Support',
        ar: 'التسليم والدعم',
        tr: 'Teslimat ve Destek',
      }),
      desc: getLocalizedText(currentLang, {
        en: 'End-to-end project delivery with ongoing support, monitoring, and performance reporting.',
        de: 'End-to-End-Projektabwicklung mit laufendem Support, Monitoring und Performance-Reporting.',
        ar: 'تسليم المشاريع من البداية للنهاية مع دعم مستمر ومراقبة وتقارير أداء.',
        tr: 'Sürekli destek, izleme ve performans raporlaması ile uçtan uca proje teslimi.',
      }),
    },
    {
      num: '04',
      title: getLocalizedText(currentLang, {
        en: 'Long-Term Partnership',
        de: 'Langfristige Partnerschaft',
        ar: 'شراكة طويلة الأمد',
        tr: 'Uzun Vadeli Ortaklık',
      }),
      desc: getLocalizedText(currentLang, {
        en: 'Continuous optimization and expansion of services as your business grows across markets.',
        de: 'Kontinuierliche Optimierung und Erweiterung der Services mit Ihrem Wachstum.',
        ar: 'تحسين مستمر وتوسيع الخدمات مع نمو أعمالكم عبر الأسواق.',
        tr: 'İşiniz büyüdükçe hizmetlerin sürekli optimizasyonu ve genişletilmesi.',
      }),
    },
  ];

  return (
    <section className="py-20 sm:py-28 border-b border-white/10" id="corporate-process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">
            {getLocalizedText(currentLang, {
              en: 'How We Work',
              de: 'Wie wir arbeiten',
              ar: 'كيف نعمل',
              tr: 'Nasıl Çalışıyoruz',
            })}
          </span>
          <h2 className="section-title mt-3">
            {getLocalizedText(currentLang, {
              en: 'Our Corporate Engagement Model',
              de: 'Unser Corporate Engagement Modell',
              ar: 'نموذج مشاركتنا المؤسسية',
              tr: 'Kurumsal İşbirliği Modelimiz',
            })}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="corp-card corp-card-hover p-6 sm:p-8 relative group"
              style={{ textAlign: isRTL ? 'right' : 'left' }}
            >
              <span className="text-4xl font-serif font-bold text-[#C5A059]/15 group-hover:text-[#C5A059]/30 transition-colors absolute top-4 right-4">
                {step.num}
              </span>
              <div className="w-10 h-0.5 bg-[#C5A059] mb-5" />
              <h3 className="text-base font-semibold text-white mb-3 pr-8">{step.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CorporateCTABanner({
  currentLang,
  onSectionChange,
}: {
  currentLang: Language;
  onSectionChange: (section: ActiveSection) => void;
}) {
  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  return (
    <section className="py-16 sm:py-20 border-b border-white/10" id="corporate-cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden corp-card p-10 sm:p-14 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059]/5 via-transparent to-[#C5A059]/5" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />
          <div className="relative z-10">
            <Briefcase className="w-8 h-8 text-[#C5A059] mx-auto mb-5" />
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-4">
              {getLocalizedText(currentLang, {
                en: 'Ready to Partner with Kocakint?',
                de: 'Bereit für eine Partnerschaft mit Kocakint?',
                ar: 'هل أنتم مستعدون للشراكة مع كوكاكينت؟',
                tr: 'Kocakint ile Ortaklığa Hazır mısınız?',
              })}
            </h2>
            <p className="text-sm text-white/50 max-w-xl mx-auto mb-8">
              {getLocalizedText(currentLang, {
                en: 'Connect with our Berlin or Dubai offices to discuss your project requirements across any of our five business divisions.',
                de: 'Kontaktieren Sie unsere Büros in Berlin oder Dubai, um Ihre Projektanforderungen zu besprechen.',
                ar: 'تواصلوا مع مكاتبنا في برلين أو دبي لمناقشة متطلبات مشروعكم.',
                tr: 'Beş iş kolumuzdan herhangi biri için proje gereksinimlerinizi görüşmek üzere Berlin veya Dubai ofislerimizle iletişime geçin.',
              })}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#locations-section"
                className="bg-[#C5A059] hover:bg-[#b08e4f] text-black font-semibold text-xs uppercase tracking-widest py-3.5 px-10 rounded-sm transition-all shadow-md"
              >
                {t.getInTouch}
              </a>
              <button
                onClick={() => onSectionChange('software')}
                className="bg-transparent hover:bg-white/5 border border-white/20 text-white font-semibold text-xs uppercase tracking-widest py-3.5 px-10 rounded-sm transition-all flex items-center gap-2"
                style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
              >
                {t.exploreDivisions}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CorporateSections({ currentLang, onSectionChange }: CorporateSectionsProps) {
  return (
    <>
      <CorporateStatsBar currentLang={currentLang} />
      <CorporateAboutSection currentLang={currentLang} />
      <CorporateTrustBar currentLang={currentLang} />
      <CorporateProcessSection currentLang={currentLang} />
      <CorporateCTABanner currentLang={currentLang} onSectionChange={onSectionChange} />
    </>
  );
}
