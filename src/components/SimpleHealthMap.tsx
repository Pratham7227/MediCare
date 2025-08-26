'use client';

import { useState } from 'react';
import { MapPin, Navigation, Phone, Clock, Star } from 'lucide-react';

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

interface SimpleHealthMapProps {
  userLocation: [number, number] | null;
  facilities: Facility[];
  onFacilityClick: (facility: Facility) => void;
  selectedFacility: Facility | null;
}

export default function SimpleHealthMap({ userLocation, facilities, onFacilityClick, selectedFacility }: SimpleHealthMapProps) {
  const [showMap, setShowMap] = useState(false);

  if (!userLocation) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 relative">
      {/* Static Map Background */}
      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <MapPin size={48} className="mx-auto mb-4 text-blue-600" />
          <p className="text-lg font-semibold">Interactive Health Map</p>
          <p className="text-sm">Your location and nearby facilities</p>
        </div>
      </div>

      {/* User Location Indicator */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
        <div className="w-12 h-12 bg-blue-600 rounded-full border-2 border-white shadow-lg absolute -top-3 -left-3 opacity-30 animate-ping"></div>
      </div>

      {/* Facility Markers */}
      {facilities.map((facility, index) => {
        const angle = (index / facilities.length) * 2 * Math.PI;
        const radius = 120;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        const colors = {
          hospital: 'bg-red-500',
          clinic: 'bg-blue-500',
          pharmacy: 'bg-green-500',
          lab: 'bg-purple-500'
        };

        return (
          <div
            key={facility.id}
            className={`absolute w-8 h-8 ${colors[facility.type]} rounded-full border-2 border-white shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform`}
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`
            }}
            onClick={() => onFacilityClick(facility)}
            title={facility.name}
          >
            <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
              {facility.type === 'hospital' ? '🏥' : 
               facility.type === 'clinic' ? '🏥' : 
               facility.type === 'pharmacy' ? '💊' : '🔬'}
            </div>
          </div>
        );
      })}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setShowMap(!showMap)}
          className="bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          title="Toggle Map View"
        >
          <MapPin size={20} className="text-blue-600" />
        </button>
      </div>

      {/* Facility Info Panel */}
      {selectedFacility && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {selectedFacility.type === 'hospital' ? '🏥' : 
                 selectedFacility.type === 'clinic' ? '🏥' : 
                 selectedFacility.type === 'pharmacy' ? '💊' : '🔬'}
              </span>
              <h3 className="font-semibold text-gray-900">{selectedFacility.name}</h3>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2">{selectedFacility.address}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <Star size={14} className="text-yellow-500" />
              {selectedFacility.rating}
            </span>
            <span>{selectedFacility.distance} km away</span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {selectedFacility.hours}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.open(`tel:${selectedFacility.phone}`, '_self')}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 transition-colors"
            >
              <Phone size={14} />
              Call
            </button>
            <button
              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedFacility.coordinates[0]},${selectedFacility.coordinates[1]}`, '_blank')}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
            >
              <Navigation size={14} />
              Directions
            </button>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3">
        <h4 className="text-xs font-semibold text-gray-700 mb-2">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Hospitals</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Clinics</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Pharmacies</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span>Labs</span>
          </div>
        </div>
      </div>
    </div>
  );
}

