'use client';

import { useState } from 'react';
import HealthMap from './HealthMap';

interface Facility {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'pharmacy' | 'lab';
  address: string;
  phone: string;
  rating: number;
  distance: number;
  coordinates: [number, number];
  hours: string;
  services: string[];
}

export default function EnhancedHealthMap() {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'hospitals' | 'drugs'>('hospitals');
  
  // Mock user location (you can replace with actual geolocation)
  const userLocation: [number, number] = [40.7128, -74.0060]; // New York coordinates

  const hospitals = [
    {
      id: '1',
      name: 'City General Hospital',
      type: 'hospital' as const,
      address: '123 Main St, New York, NY',
      phone: '(555) 123-4567',
      rating: 4.5,
      distance: 0.8,
      coordinates: [40.7589, -73.9851] as [number, number],
      hours: '24/7',
      services: ['Emergency Care', 'Surgery', 'ICU', 'Maternity']
    },
    {
      id: '2',
      name: 'Heart Specialists Center',
      type: 'clinic' as const,
      address: '456 Oak Ave, New York, NY',
      phone: '(555) 234-5678',
      rating: 4.8,
      distance: 1.2,
      coordinates: [40.7505, -73.9934] as [number, number],
      hours: '8 AM - 6 PM',
      services: ['Cardiology', 'Heart Surgery', 'ECG', 'Stress Tests']
    },
    {
      id: '3',
      name: 'Children\'s Medical Center',
      type: 'hospital' as const,
      address: '789 Pine St, New York, NY',
      phone: '(555) 345-6789',
      rating: 4.7,
      distance: 2.1,
      coordinates: [40.7580, -73.9855] as [number, number],
      hours: '24/7',
      services: ['Pediatrics', 'NICU', 'Emergency Care', 'Surgery']
    }
  ];

  const drugStores = [
    {
      id: '4',
      name: 'CVS Pharmacy',
      type: 'pharmacy' as const,
      address: '321 Broadway, New York, NY',
      phone: '(555) 456-7890',
      rating: 4.2,
      distance: 0.5,
      coordinates: [40.7614, -73.9776] as [number, number],
      hours: '7 AM - 10 PM',
      services: ['Prescriptions', 'Vaccines', 'Health Screening', 'OTC Medications']
    },
    {
      id: '5',
      name: 'Walgreens',
      type: 'pharmacy' as const,
      address: '654 5th Ave, New York, NY',
      phone: '(555) 567-8901',
      rating: 4.0,
      distance: 0.9,
      coordinates: [40.7505, -73.9934] as [number, number],
      hours: '8 AM - 9 PM',
      services: ['Prescriptions', 'Photo Services', 'Vaccines', 'Health Products']
    }
  ];

  const allFacilities = [...hospitals, ...drugStores];

  const handleFacilityClick = (facility: Facility) => {
    setSelectedFacility(facility);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Search Bar */}
      <div className="bg-white shadow-sm p-4 sticky top-0 z-40">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search hospitals, pharmacies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Tabs */}
        <div className="flex mt-4 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('hospitals')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'hospitals'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            🏥 Hospitals
          </button>
          <button
            onClick={() => setActiveTab('drugs')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'drugs'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            💊 Pharmacies
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="h-64 mx-4 mt-4 rounded-xl overflow-hidden shadow-lg">
        <HealthMap
          userLocation={userLocation}
          facilities={allFacilities}
          onFacilityClick={handleFacilityClick}
          selectedFacility={selectedFacility}
        />
      </div>

      {/* Content Sections */}
      <div className="p-4">
        {activeTab === 'hospitals' && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              🏥 Nearby Hospitals & Clinics
            </h2>
            
            {/* Specializations */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Specializations</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Cardiology', 'Pediatrics', 'Emergency', 'Surgery', 'Maternity', 'Neurology', 'Orthopedics', 'Dermatology'].map((spec) => (
                  <button key={spec} className="bg-blue-50 text-blue-700 p-3 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                    {spec}
                  </button>
                ))}
              </div>
            </div>

            {/* Hospital List */}
            <div className="space-y-4">
              {hospitals.map((hospital) => (
                <div key={hospital.id} className="bg-white rounded-xl p-4 shadow-sm border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{hospital.name}</h3>
                      <p className="text-gray-600 text-sm">{hospital.address}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span className="text-sm font-medium">{hospital.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {hospital.services.map((service) => (
                      <span key={service} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs">
                        {service}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>📍 {hospital.distance} miles away</span>
                    <span>🕒 {hospital.hours}</span>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium">
                      Call Now
                    </button>
                    <button 
                      onClick={() => handleFacilityClick(hospital)}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium"
                    >
                      View on Map
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'drugs' && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              💊 Nearby Pharmacies
            </h2>
            
            {/* Drug Categories */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Drug Categories</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Pain Relief', 'Cold & Flu', 'Antibiotics', 'Vitamins', 'Diabetes', 'Heart Health', 'Allergy', 'Prescription'].map((category) => (
                  <button key={category} className="bg-green-50 text-green-700 p-3 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Pharmacy List */}
            <div className="space-y-4">
              {drugStores.map((pharmacy) => (
                <div key={pharmacy.id} className="bg-white rounded-xl p-4 shadow-sm border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{pharmacy.name}</h3>
                      <p className="text-gray-600 text-sm">{pharmacy.address}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span className="text-sm font-medium">{pharmacy.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {pharmacy.services.map((service) => (
                      <span key={service} className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-xs">
                        {service}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>📍 {pharmacy.distance} miles away</span>
                    <span>🕒 {pharmacy.hours}</span>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium">
                      Call Now
                    </button>
                    <button 
                      onClick={() => handleFacilityClick(pharmacy)}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium"
                    >
                      View on Map
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
