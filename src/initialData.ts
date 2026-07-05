/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CarListing } from './types';

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
      ar: 'حالة ممتازة، تم الاستحواذ عليها مباشرة من شتوتغارت، ألمانيا. مجهزة بحزمة فايساخ، ونظام رفع المحور الأمامي، ومكابح سيراميك الكربون.'
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
      ar: 'إصدار "غراند إيديشن" المرغوب بشدة، مطلي بلون كالاهاري الذهبي الماط. مهيأ تماماً لمواصفات دول الخليج والاتحاد الأوروبي، تم استيراده عبر مركزنا في دبي.'
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
      ar: 'سيارة غران تورير كهربائية فاخرة ذات أداء عالي وخالية من الانبعاثات. متوافقة مع الشحن السريع بالتيار المستمر. تم اختيارها خصيصاً للتوافق مع معايير التنقل الأخضر في برلين.'
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
      ar: 'مستكشف الطرق الوعرة الفاخر والأيقوني. نظام تعليق مخصص بالكامل وفلترة رملية عالية الكفاءة. مطلوب بشدة في فرعنا الإقليمي في دبي.'
    },
    specs: ['Twin Turbo V6', 'Multi-Terrain Select', 'JBL Premium Audio', 'Pre-collision Safety', 'Cool Box']
  }
];
