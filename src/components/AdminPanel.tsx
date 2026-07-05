/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, CarListing } from '../types';
import { translations } from '../translations';
import { ShieldAlert, Plus, Edit3, Trash2, Save, X, ToggleLeft, ToggleRight, Key, Eye, EyeOff, LayoutGrid, ListFilter } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminPanelProps {
  currentLang: Language;
  listings: CarListing[];
  onAddCar: (car: Omit<CarListing, 'id'>) => void;
  onUpdateCar: (car: CarListing) => void;
  onDeleteCar: (id: string) => void;
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
  isLoggedIn,
  onLoginSuccess,
  onLogout
}: AdminPanelProps) {
  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Form edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formState, setFormState] = useState({
    title: '',
    make: '',
    model: '',
    year: 2024,
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
      specs: 'Sport Exhaust, LED Matrix, Premium Audio'
    });
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
      specs: car.specs.join(', ')
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse multiple image URLs
    let parsedImageUrls = formState.imageUrls
      .split(',')
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    // Provide a premium default image if none specified
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
        ar: formState.descAr || formState.title
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
    <section className="py-12 sm:py-16 text-[#E0E0E0] font-sans bg-transparent" id="admin-management-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-tight flex items-center gap-2">
              <ShieldAlert className="w-7 h-7 text-[#C5A059]" />
              {t.adminTitle}
            </h1>
            <p className="text-white/50 text-sm mt-1">{t.adminSubtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={resetForm} 
              className="bg-[#C5A059] hover:bg-[#b08e4f] text-black font-semibold text-xs uppercase tracking-wider py-2 px-4 rounded-sm flex items-center gap-1.5 shadow-md active:translate-y-0.5"
            >
              <Plus className="w-4 h-4" /> Add Vehicle
            </button>
            <button 
              onClick={onLogout} 
              className="bg-[#0A0A0A] hover:bg-[#111111] border border-white/10 text-white/50 hover:text-white font-semibold text-xs py-2 px-4 rounded-sm uppercase tracking-wider"
            >
              {t.adminLogoutBtn}
            </button>
          </div>
        </div>

        {/* Dashboard Panels */}
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
                  placeholder="https://images.unsplash.com/... or blank for generic vehicle placeholder"
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white placeholder-white/20 focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-white/60 font-medium mb-1">Additional Image URLs (Comma-separated, for slider)</label>
                <textarea
                  rows={2}
                  value={formState.imageUrls}
                  onChange={(e) => setFormState({ ...formState, imageUrls: e.target.value })}
                  placeholder="e.g. https://images.unsplash.com/photo1..., https://images.unsplash.com/photo2..."
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white placeholder-white/20 focus:outline-none focus:border-[#C5A059] font-mono text-xs"
                />
                <span className="text-[10px] text-white/40 mt-1 block">Specify multiple URLs separated by commas to activate the premium vehicle image slider.</span>
              </div>

              {/* Multilingual Descriptions */}
              <div className="space-y-2 border-t border-white/10 pt-3">
                <span className="block text-[10px] font-mono text-[#C5A059] uppercase tracking-widest font-bold">Multilingual Descriptions</span>
                
                <div>
                  <label className="block text-white/60 font-medium mb-0.5">{t.formDescEn}</label>
                  <textarea
                    rows={2}
                    value={formState.descEn}
                    onChange={(e) => setFormState({ ...formState, descEn: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-white/60 font-medium mb-0.5">{t.formDescDe}</label>
                  <textarea
                    rows={2}
                    value={formState.descDe}
                    onChange={(e) => setFormState({ ...formState, descDe: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-white/60 font-medium mb-0.5">{t.formDescAr}</label>
                  <textarea
                    rows={2}
                    value={formState.descAr}
                    onChange={(e) => setFormState({ ...formState, descAr: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2 text-white focus:outline-none focus:border-[#C5A059]"
                    style={{ direction: 'rtl', textAlign: 'right' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 font-medium mb-1">{t.formSpecs}</label>
                <input
                  type="text"
                  value={formState.specs}
                  onChange={(e) => setFormState({ ...formState, specs: e.target.value })}
                  placeholder="e.g. Carbon Brakes, Weissach pack, Panoramic, LED Matrix"
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
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-[#0A0A0A] border border-white/10 text-white/40 hover:text-white px-4 py-2.5 rounded-sm font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    {t.cancelBtn}
                  </button>
                )}
              </div>

            </form>
          </div>

          {/* Listings Database Table */}
          <div className="lg:col-span-7 bg-[#111111] border border-white/10 p-6 rounded-sm shadow-xl overflow-hidden">
            <h3 className="text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em] font-mono mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
              <ListFilter className="w-4 h-4" />
              Vehicles Listings Ledger ({listings.length})
            </h3>

            {listings.length === 0 ? (
              <p className="text-white/30 text-xs text-center py-10 font-mono">Ledger database is empty.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 font-mono text-white/40 text-[10px] uppercase">
                      <th className="py-3 px-2">Vehicle</th>
                      <th className="py-3 px-2 text-center">Price</th>
                      <th className="py-3 px-2 text-center">Live Status</th>
                      <th className="py-3 px-2 text-right">Ledger Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans text-[#E0E0E0]">
                    {listings.map((car) => {
                      const isSold = car.status === 'sold';
                      return (
                        <tr key={car.id} className="hover:bg-[#0A0A0A]/40 transition-all">
                          <td className="py-3.5 px-2">
                            <div className="flex items-center gap-2.5">
                              <img 
                                src={car.imageUrl} 
                                alt={car.title} 
                                className="w-10 h-7 object-cover rounded-sm bg-[#0A0A0A] border border-white/10"
                                referrerPolicy="no-referrer"
                              />
                              <div className="flex flex-col">
                                <span className="font-bold text-white">{car.title}</span>
                                <span className="text-[10px] font-mono text-white/40">{car.make} • {car.year}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-2 text-center font-mono font-bold text-white">
                            €{car.price.toLocaleString('de-DE')}
                          </td>
                          <td className="py-3.5 px-2 text-center">
                            <button
                              id={`status-toggle-${car.id}`}
                              onClick={() => toggleStatusDirectly(car)}
                              className="focus:outline-none transition-transform inline-flex"
                              title="Toggle available/sold status instantly"
                            >
                              {isSold ? (
                                <span className="bg-black/95 text-[#C5A059] border border-[#C5A059]/20 text-[9px] font-mono uppercase px-2 py-0.5 rounded-sm flex items-center gap-1 cursor-pointer hover:border-[#C5A059]/40">
                                  <ToggleLeft className="w-4 h-4 text-[#C5A059]" /> SOLD
                                </span>
                              ) : (
                                <span className="bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-[9px] font-mono uppercase px-2 py-0.5 rounded-sm flex items-center gap-1 cursor-pointer hover:bg-[#C5A059]/20">
                                  <ToggleRight className="w-4 h-4 text-[#C5A059]" /> AVAILABLE
                                </span>
                              )}
                            </button>
                          </td>
                          <td className="py-3.5 px-2 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                id={`edit-car-${car.id}`}
                                onClick={() => handleEditClick(car)}
                                className="p-1.5 bg-[#0A0A0A] hover:bg-[#111111] rounded-sm border border-white/10 text-white/50 hover:text-[#C5A059] hover:border-[#C5A059]/30 transition-all cursor-pointer"
                                title="Edit listing specs & details"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                id={`delete-car-${car.id}`}
                                onClick={() => onDeleteCar(car.id)}
                                className="p-1.5 bg-[#0A0A0A] hover:bg-red-950/20 border border-white/10 hover:border-red-500/30 rounded-sm text-white/40 hover:text-red-400 transition-all cursor-pointer"
                                title="Delete listing completely"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
