/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'de' | 'ar' | 'tr';

export type ActiveSection = 'home' | 'software' | 'trade' | 'automotive' | 'carcare' | 'admin' | 'rental';

export interface RentalCar {
  id: string;
  name: string;
  brand: string;
  category: 'sports' | 'suv' | 'luxury';
  image: string;
  specs: {
    power: string;
    acceleration: string;
    topSpeed: string;
    engine: string;
  };
  dailyPrice: number;
  availableWithDriver: boolean;
  availableWithoutDriver: boolean;
  accentColor: string;
  description: {
    en: string;
    de: string;
    ar: string;
    tr?: string;
  };
}

export interface CarCarePricing {
  sedan: { ppf: number; detailing: number; wash: number };
  suv: { ppf: number; detailing: number; wash: number };
  sport: { ppf: number; detailing: number; wash: number };
}

export interface CarListing {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  imageUrl: string;
  imageUrls?: string[];
  status: 'available' | 'sold';
  description: {
    en: string;
    de: string;
    ar: string;
    tr?: string;
  };
  specs: string[];
}

export interface OfficeLocation {
  city: 'Berlin' | 'Dubai';
  country: string;
  address: string;
  phone: string;
  email: string;
  timezone: string;
  seoText: {
    en: string;
    de: string;
    ar: string;
    tr?: string;
  };
  geoCoords: string;
}
