/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Shield, FileText, Landmark, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface StaticPagesModalProps {
  isOpen: boolean;
  page: 'privacy' | 'terms' | 'imprint' | null;
  onClose: () => void;
  currentLang: Language;
}

export default function StaticPagesModal({ isOpen, page, onClose, currentLang }: StaticPagesModalProps) {
  if (!isOpen || !page) return null;

  const isRTL = currentLang === 'ar';

  // Localized contents
  const contents = {
    privacy: {
      title: {
        en: 'Privacy Policy',
        de: 'Datenschutzerklärung',
        ar: 'سياسة الخصوصية'
      },
      icon: Shield,
      body: {
        en: (
          <div className="space-y-6 text-sm text-white/70 leading-relaxed">
            <p className="text-white/90 font-medium">
              Last updated: July 2026. This Privacy Policy describes how Kocakint ("we", "us", or "our") processes your personal data across our operational software divisions, global logistics, and prestige automotive brokerage interfaces.
            </p>
            
            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">1. Regulatory Framework & Compliance</h4>
              <p>
                Kocakint is a global enterprise. We strictly process user data in total compliance with:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>The European Union General Data Protection Regulation (<strong>GDPR</strong>) for all EU-based transactions.</li>
                <li>The UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (<strong>PDPL</strong>) for all Middle East and global trade operations.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">2. Information Collection</h4>
              <p>
                We collect information to provide high-performance, tailored experiences across our division portals:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li><strong>Inquiry Details:</strong> When you request fleet brokerage or consulting, we securely capture your name, email, country, and specifications.</li>
                <li><strong>System Logs:</strong> Secure cryptographic hashes of session data to maintain state integrity without client tracking.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">3. Data Sovereignty & Storage Location</h4>
              <p>
                To maintain physical and digital sovereignty, data is housed in sovereign-secured cloud zones. European inquiries are routed and stored exclusively in Frankfurt/Berlin nodes, while Gulf-originated queries reside in GCC-regional databases, preventing cross-border leakage.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">4. Your Statutory Rights</h4>
              <p>
                Under GDPR and UAE PDPL, you hold the right to obtain confirmation about stored data, request rectification, demand restriction, or absolute erasure. Please route inquiries directly to <strong>compliance@kocakint.com</strong>.
              </p>
            </div>
          </div>
        ),
        de: (
          <div className="space-y-6 text-sm text-white/70 leading-relaxed">
            <p className="text-white/90 font-medium">
              Stand: Juli 2026. Diese Datenschutzerklärung beschreibt, wie Kocakint („wir“, „uns“ oder „unser“) Ihre personenbezogenen Daten im Rahmen unserer Softwareabteilungen, globalen Handelskorridore und exklusiven Automobilvermittlungen verarbeitet.
            </p>
            
            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">1. Gesetzliche Grundlagen & DSGVO</h4>
              <p>
                Der Schutz Ihrer Daten hat bei uns höchste Priorität. Wir verarbeiten personenbezogene Daten streng nach den Vorgaben:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>der europäischen Datenschutz-Grundverordnung (<strong>DSGVO</strong>) für alle Aktivitäten in der EU.</li>
                <li>des Bundesgesetzes der VAE Nr. 45 von 2021 zum Schutz personenbezogener Daten (<strong>PDPL</strong>) für unsere Logistik- und Vermittlungsprozesse am Standort Dubai.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">2. Datenerfassung & Verwendungszweck</h4>
              <p>
                Wir erheben ausschließlich Daten, die für die Bereitstellung unserer Premium-Dienstleistungen erforderlich sind:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li><strong>Fahrzeuganfragen:</strong> Name, E-Mail, Telefonnummer und spezifische Import- oder Mietpräferenzen werden verschlüsselt übertragen.</li>
                <li><strong>Sicherheits-Logs:</strong> Temporäre IP-Hashes zur Betrugs- und Missbrauchsprävention im Admin-Verzeichnis.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">3. Hosting & Datensouveränität</h4>
              <p>
                Zur Wahrung der technologischen Unabhängigkeit verbleiben europäische Kundendaten ausschließlich auf zertifizierten Serverstrukturen im Raum Deutschland (Frankfurt/Berlin). Daten unserer GCC-Kunden werden in hochsicheren Cloud-Regionen innerhalb der VAE betrieben.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">4. Ihre Betroffenenrechte</h4>
              <p>
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten. Zudem steht Ihnen ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten zu. Kontaktieren Sie uns hierzu unter <strong>compliance@kocakint.com</strong>.
              </p>
            </div>
          </div>
        ),
        ar: (
          <div className="space-y-6 text-sm text-white/70 leading-relaxed" style={{ textAlign: 'right' }}>
            <p className="text-white/90 font-medium">
              آخر تحديث: يوليو ٢٠٢٦. توضح سياسة الخصوصية هذه كيف تقوم مجموعة كوكاكينت ("نحن" أو "الخاصة بنا") بمعالجة بياناتك الشخصية عبر بواباتنا البرمجية المتقدمة وأنظمتنا اللوجستية وعمليات وساطة السيارات الفاخرة.
            </p>
            
            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">١. الأطر التنظيمية والامتثال القانوني</h4>
              <p>
                باعتبار كوكاكينت تكتلاً عالمياً، فإننا نلتزم التزاماً كاملاً بـ:
              </p>
              <ul className="list-disc list-inside pr-4 space-y-1">
                <li>اللائحة العامة لحماية البيانات في الاتحاد الأوروبي (<strong>GDPR</strong>) لجميع المعاملات والأنشطة الأوروبية.</li>
                <li>المرسوم بقانون اتحادي لدولة الإمارات العربية المتحدة رقم ٤٥ لسنة ٢٠٢١ بشأن حماية البيانات الشخصية (<strong>PDPL</strong>) للأنشطة الإقليمية والتجارة الدولية.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">٢. البيانات التي نجمعها</h4>
              <p>
                نقوم بجمع البيانات الأساسية اللازمة لتقديم الخدمة الأكثر تميزاً وملاءمةً لك:
              </p>
              <ul className="list-disc list-inside pr-4 space-y-1">
                <li><strong>تفاصيل الاستفسارات:</strong> عند طلب الوساطة أو الاستشارة، نسجل اسمك، بريدك الإلكتروني، بلدك ومواصفات طلبك بشكل آمن.</li>
                <li><strong>سجلات النظام الآمنة:</strong> رموز تشفير مؤقتة لبيانات الجلسة لمنع الاختراقات وتأمين واجهات التحكم.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">٣. سيادة البيانات وموقع التخزين</h4>
              <p>
                لضمان السيادة الرقمية التامة، يتم استضافة وتخزين بيانات العملاء الأوروبيين حصرياً في خوادم داخل ألمانيا (فرانكفورت)، بينما يتم استضافة بيانات عملاء الشرق الأوسط ومجلس التعاون الخليجي في مراكز البيانات الإقليمية فائقة الأمان داخل الإمارات العربية المتحدة.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">٤. حقوقك القانونية</h4>
              <p>
                بموجب القوانين الحاكمة، يحق لك طلب الوصول إلى بياناتك المخزنة لدينا، أو تعديلها، أو المطالبة بحذفها بالكامل. يرجى إرسال الطلبات مباشرة إلى القسم القانوني عبر: <strong>compliance@kocakint.com</strong>.
              </p>
            </div>
          </div>
        )
      }
    },
    terms: {
      title: {
        en: 'Terms of Service',
        de: 'Allgemeine Geschäftsbedingungen',
        ar: 'شروط وأحكام الخدمة'
      },
      icon: FileText,
      body: {
        en: (
          <div className="space-y-6 text-sm text-white/70 leading-relaxed">
            <p className="text-white/90 font-medium">
              Welcome to Kocakint. These Terms of Service ("Terms") govern your access to and use of our web architecture, business division portals, and advisory services.
            </p>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">1. Scope & Core Services</h4>
              <p>
                Kocakint coordinates enterprise services across multiple divisions: Custom Software Architectures, International Trade Hub Management (GCC-EU), Premium Automotive Sourcing, Nano-detailing Labs, and Exotic Vehicle Rentals. By utilizing our interfaces, you acknowledge and agree to these terms.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">2. Trade & Regulatory Compliance</h4>
              <p>
                All physical trade transactions facilitated via our Trade Section are bound to final compliance screening of dual-use goods, import tax declarations (EU custom rates), and GCC unified tariffs. We reserve the right to cancel any transit requests that violate Schengen trade protocols.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">3. Automotive & Rental Terms</h4>
              <p>
                Vehicles sourced via our Tier-1 Prestige Automotive Ledger are sold on a delivery-duties-paid (DDP) or delivery-at-place (DAP) basis depending on bilateral purchase contracts. Rental services demand valid driving credentials, international permits (for non-residents in GCC), and compliance with the specified rental security deposits.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">4. Intellectual Property</h4>
              <p>
                The technological platforms, custom UI grids, proprietary pricing models, and specific diagnostic configurations showcased remain the exclusive intellectual property of Kocakint and its development partner, Data212. Any reproduction without permission is prohibited.
              </p>
            </div>
          </div>
        ),
        de: (
          <div className="space-y-6 text-sm text-white/70 leading-relaxed">
            <p className="text-white/90 font-medium">
              Willkommen bei Kocakint. Diese Allgemeinen Geschäftsbedingungen („AGB“) regeln die Nutzung unserer Online-Portale, Geschäftsbereiche und Beratungsleistungen.
            </p>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">1. Geltungsbereich & Dienstleistungen</h4>
              <p>
                Kocakint koordiniert Unternehmensdienstleistungen in mehreren eigenständigen Sparten: Softwarearchitektur, internationaler Handel, Premium-Fahrzeugbeschaffung, Lackschutzversiegelungen und Luxusfahrzeugvermietung. Mit der Nutzung unserer Webangebote erklären Sie sich mit diesen Bedingungen einverstanden.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">2. Einhaltung von Handelsvorschriften</h4>
              <p>
                Sämtliche über unsere Außenhandels-Sparte vermittelten Transport- und Warengeschäfte unterliegen den Exportkontrollgesetzen der EU sowie den Richtlinien der GCC-Zollunion. Wir lehnen Verträge ab, die gegen rechtliche Auflagen oder internationale Sanktionen verstoßen.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">3. Konditionen Automobil- und Mietsektor</h4>
              <p>
                Alle über das Premium Automotive Ledger vermittelten Fahrzeuge werden gemäß den jeweils vereinbarten Incoterms (DDP/DAP) deklariert. Mietgeschäfte setzen ein gültiges Ausweis- und Führerscheindokument, ein Mindestalter des Fahrers sowie die Hinterlegung der vertraglich festgelegten Kaution voraus.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">4. Geistiges Eigentum</h4>
              <p>
                Die Benutzeroberfläche, technologische Backends, Preisberechnungsalgorithmen sowie die Gesamtdarstellung der Markenidentität sind geschütztes Eigentum von Kocakint und dem Entwicklungspartner Data212. Jede unbefugte Vervielfältigung wird rechtlich verfolgt.
              </p>
            </div>
          </div>
        ),
        ar: (
          <div className="space-y-6 text-sm text-white/70 leading-relaxed" style={{ textAlign: 'right' }}>
            <p className="text-white/90 font-medium">
              مرحباً بكم في كوكاكينت. تحكم شروط الخدمة هذه ("الشروط") وصولك واستخدامك لمنصاتنا الرقمية، وبواباتنا التجارية، وخدماتنا الاستشارية المتميزة.
            </p>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">١. نطاق الخدمات المقدمة</h4>
              <p>
                تنسق كوكاكينت خدمات مؤسسية رفيعة المستوى عبر أقسام متعددة تشمل: هندسة البرمجيات المخصصة، إدارة المراكز التجارية الدولية (الاتحاد الأوروبي ومجلس التعاون الخليجي)، تأمين أساطيل السيارات الفاخرة، ومراكز حماية وتفصيل السيارات الفائقة، وتأجير السيارات الرياضية والنخبوية.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">٢. الامتثال للتجارة الدولية واللوائح</h4>
              <p>
                تخضع جميع المعاملات التجارية الميسرة عبر قسم التجارة لتدقيق صارم يضمن الالتزام بقوانين الاستيراد والتصدير الجمركية في الاتحاد الأوروبي والتعرفة الجمركية الموحدة لدول مجلس التعاون الخليجي. نحتفظ بالحق في إلغاء أي شحنات تخالف الاتفاقيات الدولية الحاكمة.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">٣. شروط قطاع السيارات والتأجير</h4>
              <p>
                يتم بيع وتسليم المركبات المطلوبة عبر سجل السيارات الفاخرة لدينا على أساس الرسوم والضرائب المدفوعة مسبقاً (DDP) أو التسليم في مكان محدد (DAP) بناءً على العقود الموقعة. تتطلب خدمات التأجير رخص قيادة دولية سارية ومستندات تعريفية معتمدة مع دفع مبالغ التأمين المقررة.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-base border-b border-white/15 pb-1">٤. الملكية الفكرية</h4>
              <p>
                تظل البنى التقنية للأنظمة، والتصميمات الفريدة للموقع، وخوارزميات التسعير، والمصنفات المعروضة ملكية فكرية حصرية لمجموعة كوكاكينت وشريكها التطويري Data212. يُحظر تماماً أي إعادة إنتاج أو استخدام غير مصرح به.
              </p>
            </div>
          </div>
        )
      }
    },
    imprint: {
      title: {
        en: 'Imprint / Impressum',
        de: 'Impressum',
        ar: 'بيانات الناشر القانونية'
      },
      icon: Landmark,
      body: {
        en: (
          <div className="space-y-6 text-sm text-white/70 leading-relaxed">
            <p className="text-white/90 font-medium">
              Legal Disclosure according to European Telemedia Laws and UAE Commercial Registry regulations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <h4 className="text-[#C5A059] font-semibold text-sm uppercase tracking-wider border-b border-[#C5A059]/20 pb-1">European Operations</h4>
                <p className="font-semibold text-white">Kocakint GmbH</p>
                <p>Symeonstraße 10<br />12279 Berlin, Germany</p>
                <p><strong>Managing Director / CEO:</strong> Salih Kocak</p>
                <p><strong>Commercial Registry:</strong> Amtsgericht Charlottenburg<br /><strong>Registration Number:</strong> HRB 248910 B</p>
                <p><strong>VAT Identification Number (USt-IdNr.):</strong> DE 358102493</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-[#C5A059] font-semibold text-sm uppercase tracking-wider border-b border-[#C5A059]/20 pb-1">Middle East Operations</h4>
                <p className="font-semibold text-white">Kocakint Global FZCO</p>
                <p>Business Bay, One Central Tower<br />P.O. Box 410294, Dubai, UAE</p>
                <p><strong>Authorized Representative:</strong> Salih Kocak</p>
                <p><strong>Licensing Authority:</strong> Dubai Multi Commodities Centre (DMCC)</p>
                <p><strong>License Number:</strong> DMCC-849102</p>
                <p><strong>Corporate Tax Registration Number (TRN):</strong> 1004829105</p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <h4 className="text-white font-semibold text-base pb-1">Contact Channels</h4>
              <p>
                <strong>Central Email:</strong> office@kocakint.com<br />
                <strong>German Support:</strong> +49 (0) 30 5201 4930<br />
                <strong>UAE Support:</strong> +971 (0) 4 395 2840
              </p>
              <p className="text-xs text-white/40 italic pt-2 flex items-center gap-1">
                <span>Web Technology Architecture and Systems developed in partnership with</span>
                <a href="https://data212.com" target="_blank" rel="noopener noreferrer" className="text-[#C5A059] hover:underline inline-flex items-center gap-0.5 font-semibold">
                  Data212 <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          </div>
        ),
        de: (
          <div className="space-y-6 text-sm text-white/70 leading-relaxed">
            <p className="text-white/90 font-medium">
              Gesetzliche Anbieterkennzeichnung nach § 5 TMG sowie den gesetzlichen Bestimmungen der Handelskammer Dubai.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <h4 className="text-[#C5A059] font-semibold text-sm uppercase tracking-wider border-b border-[#C5A059]/20 pb-1">Europäischer Hauptsitz</h4>
                <p className="font-semibold text-white">Kocakint GmbH</p>
                <p>Symeonstraße 10<br />12279 Berlin, Deutschland</p>
                <p><strong>Vertreten durch den Geschäftsführer:</strong> Salih Kocak</p>
                <p><strong>Handelsregister:</strong> Amtsgericht Charlottenburg<br /><strong>Registernummer:</strong> HRB 248910 B</p>
                <p><strong>Umsatzsteuer-Identifikationsnummer (USt-IdNr.):</strong> DE 358102493</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-[#C5A059] font-semibold text-sm uppercase tracking-wider border-b border-[#C5A059]/20 pb-1">Hauptsitz Mittlerer Osten</h4>
                <p className="font-semibold text-white">Kocakint Global FZCO</p>
                <p>Business Bay, One Central Tower<br />Postfach 410294, Dubai, VAE</p>
                <p><strong>Bevollmächtigter Vertreter:</strong> Salih Kocak</p>
                <p><strong>Lizenzbehörde:</strong> Dubai Multi Commodities Centre (DMCC)</p>
                <p><strong>Lizenznummer:</strong> DMCC-849102</p>
                <p><strong>Umsatzsteuer-Identifikationsnummer (TRN):</strong> 1004829105</p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <h4 className="text-white font-semibold text-base pb-1">Zentrale Kontaktkanäle</h4>
              <p>
                <strong>Zentrale E-Mail-Adresse:</strong> office@kocakint.com<br />
                <strong>Support Deutschland:</strong> +49 (0) 30 5201 4930<br />
                <strong>Support Dubai / VAE:</strong> +971 (0) 4 395 2840
              </p>
              <p className="text-xs text-white/40 italic pt-2 flex items-center gap-1">
                <span>Webtechnologie, Design und Anwendungsentwicklung realisiert in Partnerschaft mit</span>
                <a href="https://data212.com" target="_blank" rel="noopener noreferrer" className="text-[#C5A059] hover:underline inline-flex items-center gap-0.5 font-semibold">
                  Data212 <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          </div>
        ),
        ar: (
          <div className="space-y-6 text-sm text-white/70 leading-relaxed" style={{ textAlign: 'right' }}>
            <p className="text-white/90 font-medium">
              الإفصاح القانوني بموجب قوانين تكنولوجيا المعلومات والاتصالات الأوروبية واللوائح التنظيمية للسجل التجاري في دولة الإمارات العربية المتحدة.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Dubai Office */}
              <div className="space-y-3">
                <h4 className="text-[#C5A059] font-semibold text-sm uppercase tracking-wider border-b border-[#C5A059]/20 pb-1">العمليات الإقليمية - دبي والشرق الأوسط</h4>
                <p className="font-semibold text-white">Kocakint Global FZCO</p>
                <p>خليج الأعمال، برج ون سنترال<br />ص.ب ٤١٠٢٩٤، دبي، الإمارات العربية المتحدة</p>
                <p><strong>الممثل المفوض والمخول:</strong> صالح كوتشاك</p>
                <p><strong>الجهة المرخصة:</strong> مركز دبي للسلع المتعددة (DMCC)</p>
                <p><strong>رقم الرخصة التجارية:</strong> DMCC-849102</p>
                <p><strong>الرقم الضريبي الاتحادي (TRN):</strong> 1004829105</p>
              </div>

              {/* Berlin Office */}
              <div className="space-y-3">
                <h4 className="text-[#C5A059] font-semibold text-sm uppercase tracking-wider border-b border-[#C5A059]/20 pb-1">العمليات الإقليمية - برلين وأوروبا</h4>
                <p className="font-semibold text-white">Kocakint GmbH</p>
                <p>شارع سيميون ١٠<br />١٢٢٧٩ برلين، جمهورية ألمانيا الاتحادية</p>
                <p><strong>المدير التنفيذي المسؤول:</strong> صالح كوتشاك</p>
                <p><strong>السجل التجاري:</strong> محكمة شارلوتنبورغ الابتدائية ببرلين</p>
                <p><strong>رقم التسجيل:</strong> HRB 248910 B</p>
                <p><strong>رقم المعرف الضريبي المضاف (VAT):</strong> DE 358102493</p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <h4 className="text-white font-semibold text-base pb-1">قنوات التواصل المباشرة</h4>
              <p>
                <strong>البريد الإلكتروني المركزي:</strong> office@kocakint.com<br />
                <strong>الدعم الفني في ألمانيا:</strong> +49 (0) 30 5201 4930<br />
                <strong>الدعم الفني في دبي:</strong> +971 (0) 4 395 2840
              </p>
              <p className="text-xs text-white/40 italic pt-2 flex items-center gap-1 justify-end">
                <span>تم تطوير البنية التحتية والموقع بالشراكة مع</span>
                <a href="https://data212.com" target="_blank" rel="noopener noreferrer" className="text-[#C5A059] hover:underline inline-flex items-center gap-0.5 font-semibold">
                  Data212 <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          </div>
        )
      }
    }
  };

  const PageIcon = contents[page].icon;
  const pageTitle = contents[page].title[currentLang];
  const pageBody = contents[page].body[currentLang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10" id="static-pages-overlay">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card Container */}
      <div 
        className="relative bg-[#0D0D0D] border border-white/15 w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-sm shadow-2xl p-6 sm:p-10 z-10 font-sans text-left transition-all flex flex-col"
        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        id="static-modal-card"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <div className="flex items-center gap-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <div className="p-2 bg-[#C5A059]/10 rounded-sm border border-[#C5A059]/30">
              <PageIcon className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h3 className="text-lg sm:text-xl font-serif text-white uppercase tracking-wider">{pageTitle}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-all active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto pr-1">
          {pageBody}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-white/40" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <span>Kocakint Global Consortium &copy; 2026</span>
          <button 
            onClick={onClose}
            className="bg-white/5 hover:bg-white/10 hover:text-white text-white/80 font-semibold px-4 py-2 rounded-sm border border-white/10 transition-colors"
          >
            {currentLang === 'de' ? 'Schließen' : currentLang === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
