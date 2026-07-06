/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CarListing, RentalCar, CarCarePricing } from './types';

export const initialVehicles: CarListing[] = [
  {
    id: 'car-1',
    title: 'Porsche 911 Carrera GTS (992)',
    make: 'Porsche',
    model: '911 Carrera GTS',
    year: 2024,
    price: 168500,
    currency: 'EUR',
    mileage: '4,200 km',
    fuelType: 'Gasoline',
    transmission: 'PDK (Automatic)',
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800',
    imageUrls: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1611016186353-9af58c69a533?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=800'
    ],
    status: 'available',
    description: {
      en: 'Pristine condition, acquired directly from Stuttgart, Germany. Equipped with Weissach package, front axle lift, and carbon-ceramic brakes.',
      de: 'Makelloser Zustand, direkt aus Stuttgart bezogen. Ausgestattet mit Weissach-Paket, Liftsystem für die Vorderachse und Keramikbremsen.',
      ar: 'حالة ممتازة، تم الاستحواذ عليها مباشرة من شتوتغارت، ألمانيا. مجهزة بحزمة فايساخ، ونظام رفع المحور الأمامي، ومكابح سيراميك الكربون.',
      tr: 'Stuttgart, Almanya\'dan doğrudan ithal edilmiş, kusursuz durumda. Weissach paketi, ön aks kaldırma sistemi ve karbon seramik frenlerle donatılmıştır.'
    },
    specs: ['Weissach Package', 'Front Axle Lift', 'PCCB Brakes', 'Sport Chrono', 'Carbon Fiber Seats']
  },
  {
    id: 'car-2',
    title: 'Mercedes-AMG G 63 "Grand Edition"',
    make: 'Mercedes-Benz',
    model: 'G 63 AMG',
    year: 2023,
    price: 245000,
    currency: 'EUR',
    mileage: '12,500 km',
    fuelType: 'Gasoline',
    transmission: '9-Speed Automatic',
    imageUrl: 'https://images.unsplash.com/photo-1520050206274-a1ae446cb3cc?auto=format&fit=crop&q=80&w=800',
    imageUrls: [
      'https://images.unsplash.com/photo-1520050206274-a1ae446cb3cc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800'
    ],
    status: 'sold',
    description: {
      en: 'Highly sought-after Grand Edition, finished in Kalahari Gold Magno. Fully optimized for GCC and EU specifications, imported via our Dubai hub.',
      de: 'Sehr begehrte Grand Edition, lackiert in Kalahari Gold Magno. Vollständig optimiert für GCC- und EU-Spezifikationen, importiert über unseren Hub in Dubai.',
      ar: 'إصدار "غراند إيديشن" المرغوب بشدة، مطلي بلون كالاهاري الذهبي الماط. مهيأ تماماً لمواصفات دول الخليج والاتحاد الأوروبي، تم استيراده عبر مركزنا في دبي.',
      tr: 'Kalahari Gold Magno renginde, son derece nadide "Grand Edition" serisi. GCC ve AB spesifikasyonları için tamamen optimize edilmiş, Dubai merkezimiz üzerinden ithal edilmiştir.'
    },
    specs: ['Grand Edition 1-of-1000', 'Burmester Sound System', 'GCC Optimized cooling', 'Active Ride Control', 'Nappa Leather']
  },
  {
    id: 'car-3',
    title: 'Audi RS e-tron GT',
    make: 'Audi',
    model: 'RS e-tron GT',
    year: 2024,
    price: 139000,
    currency: 'EUR',
    mileage: '1,800 km',
    fuelType: 'Electric',
    transmission: 'Automatic',
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
    imageUrls: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800'
    ],
    status: 'available',
    description: {
      en: 'Zero-emissions luxury performance grand tourer. Super-fast DC charging compatible. Specially curated for Berlin green mobility compliance.',
      de: 'Emissionsfreier, luxuriöser Hochleistungs-Grand-Tourer. Kompatibel mit superschnellem DC-Laden. Speziell kuratiert für die Einhaltung der Berliner Umweltzonen.',
      ar: 'سيارة غران تورير كهربائية فاخرة ذات أداء عالي وخالية من الانبعاثات. متوافقة مع الشحن السريع بالتيار المستمر. تم اختيارها خصيصاً للتوافق مع معايير التنقل الأخضر في برلين.',
      tr: 'Sıfır emisyonlu, ultra lüks ve yüksek performanslı elektrikli grand tourer. Süper hızlı DC şarj uyumlu. Berlin yeşil mobilite yönetmeliklerine tam uyumlulukla tedarik edilmiştir.'
    },
    specs: ['93.4 kWh Battery', 'Quattro AWD', 'Matrix LED Headlights', 'Head-Up Display', 'Panoramic Roof']
  },
  {
    id: 'car-4',
    title: 'Toyota Land Cruiser 300 VXR Black Edition',
    make: 'Toyota',
    model: 'Land Cruiser 300 VXR',
    year: 2023,
    price: 98000,
    currency: 'EUR',
    mileage: '24,000 km',
    fuelType: 'Diesel',
    transmission: '10-Speed Automatic',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    imageUrls: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1520050206274-a1ae446cb3cc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800'
    ],
    status: 'sold',
    description: {
      en: 'The definitive luxury off-road explorer. Fully customized suspension and high-efficiency sand filtration. Highly demanded in our Dubai regional branch.',
      de: 'Der ultimative Luxus-Offroad-Explorer. Vollständig angepasstes Fahrwerk und hocheffiziente Sandfiltration. Sehr gefragt in unserer Regionalniederlassung in Dubai.',
      ar: 'مستكشف الطرق الوعرة الفاخر والأيقوني. نظام تعليق مخصص بالكامل وفلترة رملية عالية الكفاءة. مطلوب بشدة في فرعنا الإقليمي في دبي.',
      tr: 'Lüks arazi maceralarının efsanevi ismi. Tamamen özel ayarlı süspansiyon sistemi ve yüksek verimli kum filtrasyon donanımı. Dubai bölge şubemizin en popüler modeli.'
    },
    specs: ['Twin Turbo V6', 'Multi-Terrain Select', 'JBL Premium Audio', 'Pre-collision Safety', 'Cool Box']
  }
];

export const initialRentals: RentalCar[] = [
  {
    id: 'ferrari-f8',
    name: 'F8 Tributo Spider',
    brand: 'Ferrari',
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
    specs: {
      power: '720 HP',
      acceleration: '2.9s',
      topSpeed: '340 km/h',
      engine: '3.9L Twin-Turbo V8'
    },
    dailyPrice: 1600,
    availableWithDriver: true,
    availableWithoutDriver: true,
    accentColor: '#E10600',
    description: {
      en: 'The pinnacle of Italian performance. Experience absolute aerodynamics and visceral turbocharged acceleration.',
      de: 'Der Gipfel italienischer Performance. Erleben Sie absolute Aerodynamik und viszeral aufgeladene V8-Beschleunigung.',
      ar: 'قمة الأداء الإيطالي العريق. اختبر الانسيابية المطلقة والتسارع المذهل لمحرك التوربو المزدوج V8.',
      tr: 'İtalyan mühendislik ve performansının zirvesi. Kusursuz aerodinamiği ve çift turbolu V8 motorun can yakıcı hızlanmasını hissedin.'
    }
  },
  {
    id: 'porsche-gt3',
    name: '911 GT3 (992)',
    brand: 'Porsche',
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
    specs: {
      power: '510 HP',
      acceleration: '3.4s',
      topSpeed: '318 km/h',
      engine: '4.0L Naturally Aspirated Boxer'
    },
    dailyPrice: 1100,
    availableWithDriver: false,
    availableWithoutDriver: true,
    accentColor: '#C5A059',
    description: {
      en: 'A razor-sharp track weapon optimized for open-road surgical precision. Pure, high-revving motorsport heritage.',
      de: 'Eine messerscharfe Rennstrecken-Waffe optimiert für chirurgische Präzision auf der Straße. Reines Motorsport-Erbe.',
      ar: 'سلاح حلبات فائق الدقة مصمم للتحكم الكامل والسرعة المتناهية. إرث حقيقي لسباقات السيارات الرياضية.',
      tr: 'Açık yollarda cerrahi hassasiyet için optimize edilmiş keskin bir pist canavarı. Saf ve yüksek devirli motor sporları mirası.'
    }
  },
  {
    id: 'lamborghini-huracan',
    name: 'Huracán EVO',
    brand: 'Lamborghini',
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80',
    specs: {
      power: '640 HP',
      acceleration: '2.9s',
      topSpeed: '325 km/h',
      engine: '5.2L Naturally Aspirated V10'
    },
    dailyPrice: 1500,
    availableWithDriver: true,
    availableWithoutDriver: true,
    accentColor: '#9BC31C',
    description: {
      en: 'Visually commanding, audibly legendary. The naturally aspirated V10 exhaust note is unmatched.',
      de: 'Visuell imposant, akustisch legendär. Der Sound des frei saugenden V10-Motors ist unübertroffen.',
      ar: 'هيبة بصرية وصوت أسطوري خارق. سيمفونية محرك V10 ذو التنفس الطبيعي تقدم تجربة لا تُنسى.',
      tr: 'Görsel olarak büyüleyici, işitsel olarak efsanevi. Atmosferik V10 motorunun egzoz tınısı benzersizdir.'
    }
  },
  {
    id: 'g-wagon-63',
    name: 'AMG G 63 Magno',
    brand: 'Mercedes-Benz',
    category: 'suv',
    image: 'https://images.unsplash.com/photo-1520050206274-a1ae446cb3cc?auto=format&fit=crop&w=800&q=80',
    specs: {
      power: '585 HP',
      acceleration: '4.5s',
      topSpeed: '220 km/h',
      engine: '4.0L BiTurbo V8'
    },
    dailyPrice: 950,
    availableWithDriver: true,
    availableWithoutDriver: true,
    accentColor: '#7A7A7A',
    description: {
      en: 'The definitive luxury off-road icon. Offers supreme road presence and commanding high-altitude comfort.',
      de: 'Die ultimative Luxus-Offroad-Ikone. Bietet unübertroffene Straßenpräsenz und souveränen Komfort.',
      ar: 'أيقونة الدفع الرباعي الفاخرة المطلقة. هيبة استثنائية على الطرقات وراحة فائقة للركاب.',
      tr: 'Lüks arazi araçlarının mutlak ikonu. Eşsiz bir yol duruşu ve üst düzey sürüş konforu sunar.'
    }
  },
  {
    id: 'rolls-ghost',
    name: 'Ghost Series II',
    brand: 'Rolls-Royce',
    category: 'luxury',
    image: 'https://images.unsplash.com/photo-1632245889029-e406faaa34cd?auto=format&fit=crop&w=800&q=80',
    specs: {
      power: '571 HP',
      acceleration: '4.8s',
      topSpeed: '250 km/h',
      engine: '6.75L Twin-Turbo V12'
    },
    dailyPrice: 2200,
    availableWithDriver: true,
    availableWithoutDriver: false,
    accentColor: '#4A154B',
    description: {
      en: 'Uncompromised luxury for executive transit. Experience the whisper-quiet, magic carpet ride with professional chauffeur.',
      de: 'Kompromissloser Luxus für exklusiven Transport. Erleben Sie die flüsterleise Fahrt mit professionellem Chauffeur.',
      ar: 'قمة الفخامة الدبلوماسية لرجال الأعمال. تجربة ركوب صامتة وخيالية أشبه بالتحليق على بساط ريحي مع سائق خاص.',
      tr: 'Üst düzey yöneticiler için ödün vermeyen lüks. Profesyonel özel şoförünüz eşliğinde fısıltı sessizliğinde sihirli bir sürüş deneyimi.'
    }
  },
  {
    id: 'audi-r8',
    name: 'R8 V10 Performance',
    brand: 'Audi',
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80',
    specs: {
      power: '620 HP',
      acceleration: '3.1s',
      topSpeed: '331 km/h',
      engine: '5.2L FSI Naturally Aspirated V10'
    },
    dailyPrice: 1250,
    availableWithDriver: false,
    availableWithoutDriver: true,
    accentColor: '#C5A059',
    description: {
      en: 'The everyday supercar. Precise Quattro all-wheel drive stability married to the high-revving roar of the V10.',
      de: 'Das Alltagssupercar. Präzise Quattro-Allradstabilität gepaart mit dem hochdrehenden Brüllen des V10-Saugmotors.',
      ar: 'سيارة خارقة مريحة بشكل يومي. ثبات استثنائي بفضل نظام كواترو الرباعي المتكامل ممزوج بهدير محرك FSI V10.',
      tr: 'Günlük kullanıma uygun süper spor otomobil. Hassas Quattro dört tekerlekten çekiş stabilitesi ile V10 motorun kükremesi bir arada.'
    }
  }
];

export const initialCarCarePrices: CarCarePricing = {
  sedan: { ppf: 2900, detailing: 750, wash: 120 },
  suv: { ppf: 3400, detailing: 890, wash: 150 },
  sport: { ppf: 3200, detailing: 950, wash: 180 }
};
