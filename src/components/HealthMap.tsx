'use client';

import { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Phone, Clock, Star } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

interface HealthMapProps {
  userLocation: [number, number] | null;
  facilities: Facility[];
  onFacilityClick: (facility: Facility) => void;
  selectedFacility: Facility | null;
}

export default function HealthMap({ userLocation, facilities, onFacilityClick, selectedFacility }: HealthMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    if (!mapRef.current || !userLocation) return;

    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        center: userLocation,
        zoom: 6,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        dragging: true,
        touchZoom: true
      });

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);
    }

    // Update map center to user location
    mapInstanceRef.current.setView(userLocation, 6);

    // Clear existing markers
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current?.removeLayer(layer);
      }
    });

    // Add user location marker
    const userIcon = L.divIcon({
      html: `
        <div style="
          width: 16px; 
          height: 16px; 
          background: #3b82f6; 
          border: 3px solid white; 
          border-radius: 50%; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          animation: pulse 2s infinite;
        "></div>
        <style>
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
        </style>
      `,
      className: 'user-location-marker',
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    const userMarker = L.marker(userLocation, { icon: userIcon })
      .addTo(mapInstanceRef.current)
      .bindPopup(`
        <div style="text-align: center; padding: 8px;">
          <div style="font-weight: bold; color: #3b82f6; margin-bottom: 4px;">Your Location</div>
          <div style="font-size: 12px; color: #666;">
            ${userLocation[0].toFixed(4)}, ${userLocation[1].toFixed(4)}
          </div>
        </div>
      `);

    // Add facility markers
    facilities.forEach((facility) => {
      const colors = {
        hospital: '#ef4444',
        clinic: '#3b82f6',
        pharmacy: '#10b981',
        lab: '#8b5cf6'
      };

      const icons = {
        hospital: '🏥',
        clinic: '🏥',
        pharmacy: '💊',
        lab: '🔬'
      };

      const facilityIcon = L.divIcon({
        html: `
          <div style="
            width: 24px; 
            height: 24px; 
            background: ${colors[facility.type]}; 
            border: 2px solid white; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-size: 12px; 
            color: white; 
            font-weight: bold;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            cursor: pointer;
            transition: transform 0.2s;
          " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
            ${icons[facility.type]}
          </div>
        `,
        className: 'facility-marker',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker(facility.coordinates, { icon: facilityIcon })
        .addTo(mapInstanceRef.current!)
        .bindPopup(`
          <div style="min-width: 180px; padding: 8px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="font-size: 18px;">${icons[facility.type]}</span>
              <div>
                <div style="font-weight: bold; color: #1f2937; margin-bottom: 2px; font-size: 14px;">${facility.name}</div>
                <div style="font-size: 11px; color: #6b7280;">${facility.type}</div>
              </div>
            </div>
            <div style="font-size: 11px; color: #6b7280; margin-bottom: 8px;">${facility.address}</div>
            <div style="display: flex; justify-content: space-between; font-size: 10px; color: #9ca3af; margin-bottom: 8px;">
              <span>⭐ ${facility.rating}</span>
              <span>${facility.distance} km</span>
            </div>
            <button onclick="window.facilityClick('${facility.id}')" style="
              width: 100%; 
              padding: 6px 12px; 
              background: #3b82f6; 
              color: white; 
              border: none; 
              border-radius: 4px; 
              font-size: 11px; 
              cursor: pointer;
              transition: background 0.2s;
            " onmouseover="this.style.background='#2563eb'" onmouseout="this.style.background='#3b82f6'">
              View Details
            </button>
          </div>
        `);

      // Store facility data for click handling
      (marker as any).facilityData = facility;
    });

    // Handle facility clicks
    (window as any).facilityClick = (facilityId: string) => {
      const facility = facilities.find(f => f.id === facilityId);
      if (facility) {
        onFacilityClick(facility);
      }
    };

    // Invalidate size to ensure proper rendering
    setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 100);

  }, [userLocation, facilities, onFacilityClick]);

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

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

  if (mapError) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-gray-600 text-sm">Map failed to load</p>
          <button 
            onClick={() => setMapError(false)}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {/* Interactive Map */}
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Map Controls Overlay */}
      {/* <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setMapError(!mapError)}
          className="bg-white p-2 lg:p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          title="Toggle Map View"
        >
          <MapPin size={20} className="lg:w-6 lg:h-6 text-blue-600" />
        </button>
      </div> */}

      {/* Facility Info Panel */}
      {selectedFacility && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-md z-10">
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
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 lg:p-4 z-10">
        <h4 className="text-xs lg:text-sm font-semibold text-gray-700 mb-2 lg:mb-3">Legend</h4>
        <div className="space-y-1 lg:space-y-2 text-xs lg:text-sm">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-3 h-3 lg:w-4 lg:h-4 bg-red-500 rounded-full"></div>
            <span className="font-medium">Hospitals</span>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-3 h-3 lg:w-4 lg:h-4 bg-blue-500 rounded-full"></div>
            <span className="font-medium">Clinics</span>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full"></div>
            <span className="font-medium">Pharmacies</span>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-3 h-3 lg:w-4 lg:h-4 bg-purple-500 rounded-full"></div>
            <span className="font-medium">Labs</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .leaflet-container {
          font-family: inherit;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        
        .leaflet-popup-content {
          margin: 0;
          padding: 0;
        }
        
        .leaflet-popup-tip {
          background: white;
        }
        
        .leaflet-control-zoom {
          border: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .leaflet-control-zoom a {
          background: white;
          color: #374151;
          border: none;
          border-radius: 8px;
          margin: 2px;
          width: 32px;
          height: 32px;
          line-height: 32px;
          font-size: 16px;
          font-weight: bold;
        }
        
        .leaflet-control-zoom a:hover {
          background: #f3f4f6;
          color: #1f2937;
        }
      `}</style>
    </div>
  );
}
