/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, CarListing, RentalCar, CarCarePricing } from '../types';
import { translations } from '../translations';
import { 
  ShieldAlert, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  ToggleLeft, 
  ToggleRight, 
  Key, 
  Eye, 
  EyeOff, 
  LayoutGrid, 
  ListFilter, 
  CheckCircle2, 
  Sliders, 
  Car, 
  Settings, 
  DollarSign 
} from 'lucide-react';
import { motion } from 'motion/react';

interface AdminPanelProps {
  currentLang: Language;
  listings: CarListing[];
  onAddCar: (car: Omit<CarListing, 'id'>) => void;
  onUpdateCar: (car: CarListing) => void;
  onDeleteCar: (id: string) => void;

  // Rental fleet props
  rentals: RentalCar[];
  onAddRental: (rental: Omit<RentalCar, 'id'>) => void;
  onUpdateRental: (rental: RentalCar) => void;
  onDeleteRental: (id: string) => void;

  // Car Care price list props
  carCarePrices: CarCarePricing;
  onUpdateCarCarePrices: (prices: CarCarePricing) => void;

  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
}

export default function AdminPanel({
  currentLang,
  listings,
  onAddCar,
  onUpdateCar,
  onDeleteCar,
  rentals,
  onAddRental,
  onUpdateRental,
  onDeleteRental,
  carCarePrices,
  onUpdateCarCarePrices,
  isLoggedIn,
  onLoginSuccess,
  onLogout
}: AdminPanelProps) {
  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Admin Tab selection
  const [adminTab, setAdminTab] = useState<'vehicles' | 'rentals' | 'carcare'>('vehicles');

  // --- AUTOMOTIVE FORM STATE ---
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    title: '',
    make: '',
    model: '',
    year: 2026,
    price: 85000,
    mileage: '0 km',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    imageUrl: '',
    imageUrls: '',
    status: 'available' as 'available' | 'sold',
    descEn: '',
    descDe: '',
    descAr: '',
    descTr: '',
    specs: ''
  });

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormState({
      title: '',
      make: '',
      model: '',
      year: 2026,
      price: 95000,
      mileage: '1,500 km',
      fuelType: 'Gasoline',
      transmission: 'PDK (Automatic)',
      imageUrl: '',
      imageUrls: '',
      status: 'available',
      descEn: '',
      descDe: '',
      descAr: '',
      descTr: '',
      specs: 'Sport Exhaust, LED Matrix, Premium Audio'
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let parsedImageUrls = formState.imageUrls
      .split(',')
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    let fallbackImage = formState.imageUrl.trim();
    if (!fallbackImage && parsedImageUrls.length > 0) {
      fallbackImage = parsedImageUrls[0];
    } else if (!fallbackImage) {
      fallbackImage = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800';
    }

    if (parsedImageUrls.length === 0) {
      parsedImageUrls = [fallbackImage];
    }

    const parsedSpecs = formState.specs
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const carData = {
      title: formState.title,
      make: formState.make,
      model: formState.model,
      year: Number(formState.year),
      price: Number(formState.price),
      currency: 'EUR',
      mileage: formState.mileage,
      fuelType: formState.fuelType,
      transmission: formState.transmission,
      imageUrl: fallbackImage,
      imageUrls: parsedImageUrls,
      status: formState.status,
      description: {
        en: formState.descEn || formState.title,
        de: formState.descDe || formState.title,
        ar: formState.descAr || formState.title,
        tr: formState.descTr || formState.title
      },
      specs: parsedSpecs
    };

    if (isEditing && editingId) {
      onUpdateCar({
        id: editingId,
        ...carData
      });
    } else {
      onAddCar(carData);
    }
    resetForm();
  };

  const toggleStatusDirectly = (car: CarListing) => {
    onUpdateCar({
      ...car,
      status: car.status === 'available' ? 'sold' : 'available'
    });
  };

  const handleEditClick = (car: CarListing) => {
    setIsEditing(true);
    setEditingId(car.id);
    setFormState({
      title: car.title,
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage,
      fuelType: car.fuelType,
      transmission: car.transmission,
      imageUrl: car.imageUrl,
      imageUrls: car.imageUrls?.join(', ') || '',
      status: car.status,
      descEn: car.description.en,
      descDe: car.description.de,
      descAr: car.description.ar,
      descTr: car.description.tr || '',
      specs: car.specs.join(', ')
    });
  };

  // --- RENTAL FLEET FORM STATE ---
  const [isEditingRental, setIsEditingRental] = useState(false);
  const [editingRentalId, setEditingRentalId] = useState<string | null>(null);
  const [rentalFormState, setRentalFormState] = useState({
    name: '',
    brand: '',
    category: 'sports' as 'sports' | 'suv' | 'luxury',
    image: '',
    power: '600 HP',
    acceleration: '3.1s',
    topSpeed: '320 km/h',
    engine: '4.0L BiTurbo V8',
    dailyPrice: 1200,
    availableWithDriver: true,
    availableWithoutDriver: true,
    accentColor: '#C5A059',
    descEn: '',
    descDe: '',
    descAr: '',
    descTr: ''
  });

  const resetRentalForm = () => {
    setIsEditingRental(false);
    setEditingRentalId(null);
    setRentalFormState({
      name: '',
      brand: '',
      category: 'sports',
      image: '',
      power: '600 HP',
      acceleration: '3.1s',
      topSpeed: '320 km/h',
      engine: '4.0L BiTurbo V8',
      dailyPrice: 1200,
      availableWithDriver: true,
      availableWithoutDriver: true,
      accentColor: '#C5A059',
      descEn: '',
      descDe: '',
      descAr: '',
      descTr: ''
    });
  };

  const handleRentalFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rentalData = {
      name: rentalFormState.name,
      brand: rentalFormState.brand,
      category: rentalFormState.category,
      image: rentalFormState.image.trim() || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
      specs: {
        power: rentalFormState.power,
        acceleration: rentalFormState.acceleration,
        topSpeed: rentalFormState.topSpeed,
        engine: rentalFormState.engine
      },
      dailyPrice: Number(rentalFormState.dailyPrice),
      availableWithDriver: rentalFormState.availableWithDriver,
      availableWithoutDriver: rentalFormState.availableWithoutDriver,
      accentColor: rentalFormState.accentColor,
      description: {
        en: rentalFormState.descEn || rentalFormState.name,
        de: rentalFormState.descDe || rentalFormState.name,
        ar: rentalFormState.descAr || rentalFormState.name,
        tr: rentalFormState.descTr || rentalFormState.name
      }
    };

    if (isEditingRental && editingRentalId) {
      onUpdateRental({
        id: editingRentalId,
        ...rentalData
      });
    } else {
      onAddRental(rentalData);
    }
    resetRentalForm();
  };

  const handleEditRentalClick = (rental: RentalCar) => {
    setIsEditingRental(true);
    setEditingRentalId(rental.id);
    setRentalFormState({
      name: rental.name,
      brand: rental.brand,
      category: rental.category,
      image: rental.image,
      power: rental.specs.power,
      acceleration: rental.specs.acceleration,
      topSpeed: rental.specs.topSpeed,
      engine: rental.specs.engine,
      dailyPrice: rental.dailyPrice,
      availableWithDriver: rental.availableWithDriver,
      availableWithoutDriver: rental.availableWithoutDriver,
      accentColor: rental.accentColor,
      descEn: rental.description.en,
      descDe: rental.description.de,
      descAr: rental.description.ar,
      descTr: rental.description.tr || ''
    });
  };

  const toggleRentalDriverOption = (rental: RentalCar, option: 'with' | 'without') => {
    if (option === 'with') {
      onUpdateRental({
        ...rental,
        availableWithDriver: !rental.availableWithDriver
      });
    } else {
      onUpdateRental({
        ...rental,
        availableWithoutDriver: !rental.availableWithoutDriver
      });
    }
  };

  // --- CAR CARE PRICE FORM STATE ---
  const [carCareForm, setCarCareForm] = useState<CarCarePricing>(carCarePrices);
  const [carCareSaved, setCarCareSaved] = useState(false);

  useEffect(() => {
    setCarCareForm(carCarePrices);
  }, [carCarePrices]);

  const handleCarCareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCarCarePrices(carCareForm);
    setCarCareSaved(true);
    setTimeout(() => setCarCareSaved(false), 4000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '58Salih58') {
      onLoginSuccess();
      setPassword('');
      setAuthError(false);
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 3000);
    }
  };

  // Secure Auth screen if not logged in
  if (!isLoggedIn) {
    return (
      <div className="py-12 sm:py-20 flex justify-center items-center px-4 font-sans bg-transparent" id="admin-login-view">
        <div className="bg-[#111111] border border-white/10 rounded-sm p-6 sm:p-8 w-full max-w-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#C5A059]"></div>
          
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-[#C5A059]/10 border border-[#C5A059]/20 rounded-sm flex items-center justify-center mx-auto mb-3 text-[#C5A059]">
              <Key className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-serif text-white tracking-tight">{t.adminLoginRequired}</h2>
            <p className="text-xs text-white/50 mt-1">{t.adminSubtitle}</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono uppercase text-white/40 tracking-widest mb-1.5">Administrator Credential</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.adminPasswordPlaceholder}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C5A059] pr-10 pl-3"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-sm text-red-400 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{t.adminWrongPassword}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#C5A059] hover:bg-[#b08e4f] text-black font-semibold py-2.5 px-4 rounded-sm transition-all shadow-md active:translate-y-0.5"
            >
              {t.adminLoginBtn}
            </button>
          </form>

          {/* Prompt instruction hint */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <span className="text-[10px] font-mono text-white/30 block">{t.adminHint}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-8 text-[#E0E0E0] font-sans bg-transparent" id="admin-management-dashboard">
      <div className="max-w-7xl mx-auto">
        
        {/* Title row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-serif text-white tracking-tight flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-[#C5A059]" />
              Consortium Registry Console
            </h1>
            <p className="text-white/40 text-xs mt-1">Authorized database administration dashboard.</p>
          </div>
          <div>
            <button 
              onClick={onLogout} 
              className="bg-[#0A0A0A] hover:bg-[#111111] border border-white/10 text-white/50 hover:text-white font-mono text-[10px] py-2 px-4 rounded-sm uppercase tracking-wider font-bold cursor-pointer transition-colors"
            >
              {t.adminLogoutBtn}
            </button>
          </div>
        </div>

        {/* Global Tab Selection */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/5 pb-4">
          <button
            onClick={() => setAdminTab('vehicles')}
            className={`py-2 px-4 rounded-sm font-mono text-xs uppercase tracking-wider transition-all font-bold cursor-pointer ${
              adminTab === 'vehicles' 
                ? 'bg-[#C5A059] text-black border border-[#C5A059]' 
                : 'bg-[#111111] text-white/50 hover:text-white border border-white/10'
            }`}
          >
            🏢 Automotive Sales
          </button>
          <button
            onClick={() => setAdminTab('rentals')}
            className={`py-2 px-4 rounded-sm font-mono text-xs uppercase tracking-wider transition-all font-bold cursor-pointer ${
              adminTab === 'rentals' 
                ? 'bg-[#C5A059] text-black border border-[#C5A059]' 
                : 'bg-[#111111] text-white/50 hover:text-white border border-white/10'
            }`}
          >
            🏎️ Luxury Rentals
          </button>
          <button
            onClick={() => setAdminTab('carcare')}
            className={`py-2 px-4 rounded-sm font-mono text-xs uppercase tracking-wider transition-all font-bold cursor-pointer ${
              adminTab === 'carcare' 
                ? 'bg-[#C5A059] text-black border border-[#C5A059]' 
                : 'bg-[#111111] text-white/50 hover:text-white border border-white/10'
            }`}
          >
            💎 Car Care Price Configurator
          </button>
        </div>

        {/* --- VIEW 1: AUTOMOTIVE SALES MANAGEMENT --- */}
        {adminTab === 'vehicles' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Create/Edit Vehicle Form */}
            <div className="lg:col-span-5 bg-[#111111] border border-white/10 p-6 rounded-sm shadow-xl space-y-6">
              <div className="border-b border-white/10 pb-3 flex justify-between items-center">
                <h3 className="text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em] font-mono">
                  {isEditing ? t.editListing : t.addNewListing}
                </h3>
                {isEditing && (
                  <button onClick={resetForm} className="text-white/40 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-white/60 font-medium mb-1">{t.formTitle}</label>
                  <input
                    type="text"
                    required
                    value={formState.title}
                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                    placeholder="e.g. Porsche 911 GT3 RS"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white placeholder-white/20 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/60 font-medium mb-1">{t.formMake}</label>
                    <input
                      type="text"
                      required
                      value={formState.make}
                      onChange={(e) => setFormState({ ...formState, make: e.target.value })}
                      placeholder="e.g. Porsche"
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white placeholder-white/20 focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 font-medium mb-1">{t.formModel}</label>
                    <input
                      type="text"
                      required
                      value={formState.model}
                      onChange={(e) => setFormState({ ...formState, model: e.target.value })}
                      placeholder="e.g. 911 GT3"
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white placeholder-white/20 focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-white/60 font-medium mb-1">{t.formYear}</label>
                    <input
                      type="number"
                      required
                      value={formState.year}
                      onChange={(e) => setFormState({ ...formState, year: Number(e.target.value) })}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 font-medium mb-1">{t.formPrice}</label>
                    <input
                      type="number"
                      required
                      value={formState.price}
                      onChange={(e) => setFormState({ ...formState, price: Number(e.target.value) })}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 font-medium mb-1">{t.formStatus}</label>
                    <select
                      value={formState.status}
                      onChange={(e) => setFormState({ ...formState, status: e.target.value as 'available' | 'sold' })}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value="available">{t.statusAvailable}</option>
                      <option value="sold">{t.statusSold}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-white/60 font-medium mb-1">{t.formMileage}</label>
                    <input
                      type="text"
                      required
                      value={formState.mileage}
                      onChange={(e) => setFormState({ ...formState, mileage: e.target.value })}
                      placeholder="e.g. 5,000 km"
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 font-medium mb-1">{t.formFuel}</label>
                    <input
                      type="text"
                      required
                      value={formState.fuelType}
                      onChange={(e) => setFormState({ ...formState, fuelType: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 font-medium mb-1">{t.formTransmission}</label>
                    <input
                      type="text"
                      required
                      value={formState.transmission}
                      onChange={(e) => setFormState({ ...formState, transmission: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 font-medium mb-1">{t.formImageUrl} (Primary Image)</label>
                  <input
                    type="text"
                    value={formState.imageUrl}
                    onChange={(e) => setFormState({ ...formState, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/... or blank"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white placeholder-white/20 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-white/60 font-medium mb-1">Additional Images (Comma-separated)</label>
                  <textarea
                    rows={2}
                    value={formState.imageUrls}
                    onChange={(e) => setFormState({ ...formState, imageUrls: e.target.value })}
                    placeholder="https://images.unsplash.com/..., https://..."
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white placeholder-white/20 focus:outline-none focus:border-[#C5A059] font-mono text-xs animate-none"
                  />
                </div>

                <div className="space-y-2 border-t border-white/10 pt-3">
                  <span className="block text-[10px] font-mono text-[#C5A059] uppercase tracking-widest font-bold">Multilingual Descriptions</span>
                  <div>
                    <label className="block text-white/40 mb-0.5">English Description</label>
                    <textarea
                      rows={2}
                      value={formState.descEn}
                      onChange={(e) => setFormState({ ...formState, descEn: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 mb-0.5">German Description</label>
                    <textarea
                      rows={2}
                      value={formState.descDe}
                      onChange={(e) => setFormState({ ...formState, descDe: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 mb-0.5">Arabic Description</label>
                    <textarea
                      rows={2}
                      value={formState.descAr}
                      onChange={(e) => setFormState({ ...formState, descAr: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                      style={{ direction: 'rtl', textAlign: 'right' }}
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 mb-0.5">Turkish Description</label>
                    <textarea
                      rows={2}
                      value={formState.descTr}
                      onChange={(e) => setFormState({ ...formState, descTr: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 font-medium mb-1">{t.formSpecs}</label>
                  <input
                    type="text"
                    value={formState.specs}
                    onChange={(e) => setFormState({ ...formState, specs: e.target.value })}
                    placeholder="e.g. Carbon Brakes, Weissach pack"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white placeholder-white/20 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-[#C5A059] hover:bg-[#b08e4f] text-black font-semibold uppercase tracking-wider py-2.5 rounded-sm transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isEditing ? t.submitSave : t.submitAdd}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Automotive Listings Ledger Table */}
            <div className="lg:col-span-7 bg-[#111111] border border-white/10 p-6 rounded-sm shadow-xl overflow-hidden">
              <h3 className="text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em] font-mono mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
                <ListFilter className="w-4 h-4" />
                Automotive Sales Inventory ({listings.length})
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 font-mono text-white/40 text-[10px] uppercase">
                      <th className="py-3 px-2">Vehicle</th>
                      <th className="py-3 px-2 text-center">Price</th>
                      <th className="py-3 px-2 text-center">Live Status</th>
                      <th className="py-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans text-[#E0E0E0]">
                    {listings.map((car) => (
                      <tr key={car.id} className="hover:bg-[#0A0A0A]/40 transition-all">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2.5">
                            <img src={car.imageUrl} className="w-10 h-7 object-cover rounded-sm bg-[#0A0A0A] border border-white/10" referrerPolicy="no-referrer" />
                            <div className="flex flex-col">
                              <span className="font-bold text-white">{car.title}</span>
                              <span className="text-[10px] font-mono text-white/40">{car.make} • {car.year}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-center font-mono font-bold text-white">
                          €{car.price.toLocaleString()}
                        </td>
                        <td className="py-3 px-2 text-center">
                          <button onClick={() => toggleStatusDirectly(car)} className="focus:outline-none cursor-pointer">
                            {car.status === 'sold' ? (
                              <span className="bg-black/90 text-red-400 border border-red-500/20 text-[9px] font-mono uppercase px-2 py-0.5 rounded-sm flex items-center gap-1">
                                <ToggleLeft className="w-3.5 h-3.5 text-red-400" /> SOLD
                              </span>
                            ) : (
                              <span className="bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-[9px] font-mono uppercase px-2 py-0.5 rounded-sm flex items-center gap-1">
                                <ToggleRight className="w-3.5 h-3.5 text-[#C5A059]" /> ACTIVE
                              </span>
                            )}
                          </button>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button onClick={() => handleEditClick(car)} className="p-1 bg-[#0A0A0A] hover:bg-[#111111] rounded-sm border border-white/10 text-white/50 hover:text-[#C5A059] cursor-pointer">
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => onDeleteCar(car.id)} className="p-1 bg-[#0A0A0A] hover:bg-red-950/20 rounded-sm border border-white/10 text-white/40 hover:text-red-400 cursor-pointer">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW 2: LUXURY RENTALS MANAGEMENT (ŞOFÖRLÜ & SOFÖRSÜZ SPOR ARABALAR) --- */}
        {adminTab === 'rentals' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form to Create/Edit Rental Fleet Car */}
            <div className="lg:col-span-5 bg-[#111111] border border-white/10 p-6 rounded-sm shadow-xl space-y-6">
              <div className="border-b border-white/10 pb-3 flex justify-between items-center">
                <h3 className="text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em] font-mono">
                  {isEditingRental ? 'Modify Rental Asset' : 'Register New Rental Asset'}
                </h3>
                {isEditingRental && (
                  <button onClick={resetRentalForm} className="text-white/40 hover:text-white cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <form onSubmit={handleRentalFormSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/60 font-medium mb-1">Brand Name</label>
                    <input
                      type="text"
                      required
                      value={rentalFormState.brand}
                      onChange={(e) => setRentalFormState({ ...rentalFormState, brand: e.target.value })}
                      placeholder="e.g. Ferrari"
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 font-medium mb-1">Model Name</label>
                    <input
                      type="text"
                      required
                      value={rentalFormState.name}
                      onChange={(e) => setRentalFormState({ ...rentalFormState, name: e.target.value })}
                      placeholder="e.g. F8 Spider"
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-white/60 font-medium mb-1">Category</label>
                    <select
                      value={rentalFormState.category}
                      onChange={(e) => setRentalFormState({ ...rentalFormState, category: e.target.value as 'sports' | 'suv' | 'luxury' })}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059] font-mono"
                    >
                      <option value="sports">🏎️ Sports Exotics</option>
                      <option value="suv">🚙 Prestige SUVs</option>
                      <option value="luxury">👑 Luxury Saloons</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/60 font-medium mb-1">Daily Price (€)</label>
                    <input
                      type="number"
                      required
                      value={rentalFormState.dailyPrice}
                      onChange={(e) => setRentalFormState({ ...rentalFormState, dailyPrice: Number(e.target.value) })}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 font-medium mb-1">Brand Accent Color</label>
                    <input
                      type="text"
                      value={rentalFormState.accentColor}
                      onChange={(e) => setRentalFormState({ ...rentalFormState, accentColor: e.target.value })}
                      placeholder="e.g. #E10600"
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059] font-mono"
                    />
                  </div>
                </div>

                <div className="bg-[#0A0A0A] p-3 rounded-sm border border-white/5 space-y-3">
                  <span className="block text-[10px] font-mono text-[#C5A059] uppercase tracking-wider font-bold">Chauffeur Availability Options</span>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 text-white/70 hover:text-white cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={rentalFormState.availableWithoutDriver} 
                        onChange={(e) => setRentalFormState({ ...rentalFormState, availableWithoutDriver: e.target.checked })}
                        className="rounded bg-[#111111] border-white/10 text-[#C5A059] focus:ring-0 w-4 h-4 cursor-pointer"
                      />
                      <span>Self-Drive (Şoförsüz)</span>
                    </label>

                    <label className="flex items-center gap-2 text-white/70 hover:text-white cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={rentalFormState.availableWithDriver} 
                        onChange={(e) => setRentalFormState({ ...rentalFormState, availableWithDriver: e.target.checked })}
                        className="rounded bg-[#111111] border-white/10 text-[#C5A059] focus:ring-0 w-4 h-4 cursor-pointer"
                      />
                      <span>With Chauffeur (Şoförlü)</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/60 font-medium mb-1">Power Output</label>
                    <input
                      type="text"
                      required
                      value={rentalFormState.power}
                      onChange={(e) => setRentalFormState({ ...rentalFormState, power: e.target.value })}
                      placeholder="e.g. 720 HP"
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 font-medium mb-1">Acceleration (0-100 km/h)</label>
                    <input
                      type="text"
                      required
                      value={rentalFormState.acceleration}
                      onChange={(e) => setRentalFormState({ ...rentalFormState, acceleration: e.target.value })}
                      placeholder="e.g. 2.9s"
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/60 font-medium mb-1">Top Speed</label>
                    <input
                      type="text"
                      required
                      value={rentalFormState.topSpeed}
                      onChange={(e) => setRentalFormState({ ...rentalFormState, topSpeed: e.target.value })}
                      placeholder="e.g. 340 km/h"
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 font-medium mb-1">Engine specs</label>
                    <input
                      type="text"
                      required
                      value={rentalFormState.engine}
                      onChange={(e) => setRentalFormState({ ...rentalFormState, engine: e.target.value })}
                      placeholder="e.g. 3.9L Twin-Turbo V8"
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 font-medium mb-1">Image URL</label>
                  <input
                    type="text"
                    required
                    value={rentalFormState.image}
                    onChange={(e) => setRentalFormState({ ...rentalFormState, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="space-y-2 border-t border-white/10 pt-3">
                  <span className="block text-[10px] font-mono text-[#C5A059] uppercase tracking-widest font-bold">Multilingual Descriptions</span>
                  <div>
                    <label className="block text-white/40 mb-0.5">English</label>
                    <textarea
                      rows={2}
                      value={rentalFormState.descEn}
                      onChange={(e) => setRentalFormState({ ...rentalFormState, descEn: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 mb-0.5">German</label>
                    <textarea
                      rows={2}
                      value={rentalFormState.descDe}
                      onChange={(e) => setRentalFormState({ ...rentalFormState, descDe: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 mb-0.5">Arabic</label>
                    <textarea
                      rows={2}
                      value={rentalFormState.descAr}
                      onChange={(e) => setRentalFormState({ ...rentalFormState, descAr: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                      style={{ direction: 'rtl', textAlign: 'right' }}
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 mb-0.5">Turkish</label>
                    <textarea
                      rows={2}
                      value={rentalFormState.descTr}
                      onChange={(e) => setRentalFormState({ ...rentalFormState, descTr: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-[#C5A059] hover:bg-[#b08e4f] text-black font-semibold uppercase tracking-wider py-2.5 rounded-sm transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isEditingRental ? 'Save Rental Asset' : 'Add Rental Asset'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Rentals Fleet Database Table */}
            <div className="lg:col-span-7 bg-[#111111] border border-white/10 p-6 rounded-sm shadow-xl overflow-hidden">
              <h3 className="text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em] font-mono mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
                <Car className="w-4 h-4" />
                Exotic Rentals Fleet Ledger ({rentals.length})
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 font-mono text-white/40 text-[10px] uppercase">
                      <th className="py-3 px-2">Luxury Vehicle</th>
                      <th className="py-3 px-2 text-center">Price / Day</th>
                      <th className="py-3 px-2 text-center">Self-Drive / Driver</th>
                      <th className="py-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans text-[#E0E0E0]">
                    {rentals.map((rental) => (
                      <tr key={rental.id} className="hover:bg-[#0A0A0A]/40 transition-all">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2.5">
                            <img src={rental.image} className="w-10 h-7 object-cover rounded-sm bg-[#0A0A0A] border border-white/10" referrerPolicy="no-referrer" />
                            <div className="flex flex-col">
                              <span className="font-bold text-white">{rental.name}</span>
                              <span className="text-[10px] font-mono text-white/40 uppercase" style={{ color: rental.accentColor }}>{rental.brand} • {rental.category}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-center font-mono font-bold text-[#C5A059]">
                          €{rental.dailyPrice}
                        </td>
                        <td className="py-3 px-2 text-center">
                          <div className="flex items-center justify-center gap-1.5 font-mono text-[9px]">
                            <button 
                              onClick={() => toggleRentalDriverOption(rental, 'without')}
                              className={`px-1.5 py-0.5 rounded-sm border ${rental.availableWithoutDriver ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' : 'border-red-500/20 text-red-400 bg-red-500/5'} cursor-pointer`}
                              title="Toggle Self-Drive (Soforsuz) capability"
                            >
                              Self
                            </button>
                            <button 
                              onClick={() => toggleRentalDriverOption(rental, 'with')}
                              className={`px-1.5 py-0.5 rounded-sm border ${rental.availableWithDriver ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' : 'border-red-500/20 text-red-400 bg-red-500/5'} cursor-pointer`}
                              title="Toggle Driver Chauffeur (Soforlu) capability"
                            >
                              Driver
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button onClick={() => handleEditRentalClick(rental)} className="p-1 bg-[#0A0A0A] hover:bg-[#111111] rounded-sm border border-white/10 text-white/50 hover:text-[#C5A059] cursor-pointer">
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => onDeleteRental(rental.id)} className="p-1 bg-[#0A0A0A] hover:bg-red-950/20 rounded-sm border border-white/10 text-white/40 hover:text-red-400 cursor-pointer">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW 3: CAR CARE PRICE MATRIX CONFIGURATOR --- */}
        {adminTab === 'carcare' && (
          <div className="bg-[#111111] border border-white/10 p-6 sm:p-8 rounded-sm shadow-xl max-w-4xl mx-auto">
            <div className="border-b border-white/10 pb-3 mb-6">
              <h3 className="text-sm font-serif text-[#C5A059] tracking-tight flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#C5A059]" />
                Car Care Price Grid System
              </h3>
              <p className="text-white/40 text-[11px] mt-1">Configure live prices for PPF applications, detailing processes, and VIP auto washes based on vehicle body type classes.</p>
            </div>

            <form onSubmit={handleCarCareSubmit} className="space-y-6 text-xs">
              
              {/* Sedan Class */}
              <div className="bg-[#0A0A0A] p-4 rounded-sm border border-white/5 space-y-4">
                <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-wider">🚗 Sedan Class / Limuzin</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white/50 mb-1 font-mono uppercase tracking-widest text-[9px]">PPG & PPF (Coating/Folyolama)</label>
                    <input
                      type="number"
                      required
                      value={carCareForm.sedan.ppf}
                      onChange={(e) => setCarCareForm({
                        ...carCareForm,
                        sedan: { ...carCareForm.sedan, ppf: Number(e.target.value) }
                      })}
                      className="w-full bg-[#111111] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059] font-mono text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 mb-1 font-mono uppercase tracking-widest text-[9px]">Ultra Detailing (Detaylı Temizlik)</label>
                    <input
                      type="number"
                      required
                      value={carCareForm.sedan.detailing}
                      onChange={(e) => setCarCareForm({
                        ...carCareForm,
                        sedan: { ...carCareForm.sedan, detailing: Number(e.target.value) }
                      })}
                      className="w-full bg-[#111111] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059] font-mono text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 mb-1 font-mono uppercase tracking-widest text-[9px]">VIP Wash (Köpüklü VIP Yıkama)</label>
                    <input
                      type="number"
                      required
                      value={carCareForm.sedan.wash}
                      onChange={(e) => setCarCareForm({
                        ...carCareForm,
                        sedan: { ...carCareForm.sedan, wash: Number(e.target.value) }
                      })}
                      className="w-full bg-[#111111] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059] font-mono text-xs font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* SUV Class */}
              <div className="bg-[#0A0A0A] p-4 rounded-sm border border-white/5 space-y-4">
                <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-wider">🚙 SUV Class / Cip & Arazi</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white/50 mb-1 font-mono uppercase tracking-widest text-[9px]">PPG & PPF (Coating/Folyolama)</label>
                    <input
                      type="number"
                      required
                      value={carCareForm.suv.ppf}
                      onChange={(e) => setCarCareForm({
                        ...carCareForm,
                        suv: { ...carCareForm.suv, ppf: Number(e.target.value) }
                      })}
                      className="w-full bg-[#111111] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059] font-mono text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 mb-1 font-mono uppercase tracking-widest text-[9px]">Ultra Detailing (Detaylı Temizlik)</label>
                    <input
                      type="number"
                      required
                      value={carCareForm.suv.detailing}
                      onChange={(e) => setCarCareForm({
                        ...carCareForm,
                        suv: { ...carCareForm.suv, detailing: Number(e.target.value) }
                      })}
                      className="w-full bg-[#111111] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059] font-mono text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 mb-1 font-mono uppercase tracking-widest text-[9px]">VIP Wash (Köpüklü VIP Yıkama)</label>
                    <input
                      type="number"
                      required
                      value={carCareForm.suv.wash}
                      onChange={(e) => setCarCareForm({
                        ...carCareForm,
                        suv: { ...carCareForm.suv, wash: Number(e.target.value) }
                      })}
                      className="w-full bg-[#111111] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059] font-mono text-xs font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Sport/Exotic Class */}
              <div className="bg-[#0A0A0A] p-4 rounded-sm border border-white/5 space-y-4">
                <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-wider">🏎️ Exotic & Sport Class / Spor ve Lüks Grup</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white/50 mb-1 font-mono uppercase tracking-widest text-[9px]">PPG & PPF (Coating/Folyolama)</label>
                    <input
                      type="number"
                      required
                      value={carCareForm.sport.ppf}
                      onChange={(e) => setCarCareForm({
                        ...carCareForm,
                        sport: { ...carCareForm.sport, ppf: Number(e.target.value) }
                      })}
                      className="w-full bg-[#111111] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059] font-mono text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 mb-1 font-mono uppercase tracking-widest text-[9px]">Ultra Detailing (Detaylı Temizlik)</label>
                    <input
                      type="number"
                      required
                      value={carCareForm.sport.detailing}
                      onChange={(e) => setCarCareForm({
                        ...carCareForm,
                        sport: { ...carCareForm.sport, detailing: Number(e.target.value) }
                      })}
                      className="w-full bg-[#111111] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059] font-mono text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 mb-1 font-mono uppercase tracking-widest text-[9px]">VIP Wash (Köpüklü VIP Yıkama)</label>
                    <input
                      type="number"
                      required
                      value={carCareForm.sport.wash}
                      onChange={(e) => setCarCareForm({
                        ...carCareForm,
                        sport: { ...carCareForm.sport, wash: Number(e.target.value) }
                      })}
                      className="w-full bg-[#111111] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059] font-mono text-xs font-bold"
                    />
                  </div>
                </div>
              </div>

              {carCareSaved && (
                <div className="bg-[#152010] border border-emerald-500/30 text-emerald-400 text-xs py-2.5 px-3 rounded-sm flex items-center gap-2 font-sans justify-center animate-pulse">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Price matrix updated successfully in database!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#C5A059] hover:bg-[#b08e4f] text-black font-semibold uppercase tracking-wider py-2.5 rounded-sm transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer text-xs font-bold"
              >
                <Save className="w-4 h-4" />
                <span>Save Live Prices Matrix</span>
              </button>

            </form>
          </div>
        )}

      </div>
    </section>
  );
}
