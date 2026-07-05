/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'de' | 'ar';

export type ActiveSection = 'home' | 'software' | 'trade' | 'automotive' | 'carcare' | 'admin';

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
  };
  geoCoords: string;
}
