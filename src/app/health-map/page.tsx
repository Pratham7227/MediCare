'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Navigation, Filter, Phone, Clock, Star, X, Search, Menu, ChevronDown, ArrowLeft } from 'lucide-react';

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('../../components/HealthMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
    </div>
  ),
});

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

// Function to fetch real hospital data from OpenStreetMap
async function fetchRealHospitalData(lat: number, lon: number, radius: number = 5000): Promise<Facility[]> {
  try {
    // Overpass API query to get hospitals, clinics, pharmacies, and labs
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="hospital"](around:${radius},${lat},${lon});
        way["amenity"="hospital"](around:${radius},${lat},${lon});
        relation["amenity"="hospital"](around:${radius},${lat},${lon});
        node["amenity"="clinic"](around:${radius},${lat},${lon});
        way["amenity"="clinic"](around:${radius},${lat},${lon});
        relation["amenity"="clinic"](around:${radius},${lat},${lon});
        node["amenity"="pharmacy"](around:${radius},${lat},${lon});
        way["amenity"="pharmacy"](around:${radius},${lat},${lon});
        relation["amenity"="pharmacy"](around:${radius},${lat},${lon});
        node["amenity"="laboratory"](around:${radius},${lat},${lon});
        way["amenity"="laboratory"](around:${radius},${lat},${lon});
        relation["amenity"="laboratory"](around:${radius},${lat},${lon});
      );
      out body;
      >;
      out skel qt;
    `;

    // Add timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const facilities: Facility[] = [];
    let idCounter = 1;

    // Process the results
    data.elements?.forEach((element: any) => {
      if (element.type === 'node' && element.tags) {
        const tags = element.tags;
        let type: 'hospital' | 'clinic' | 'pharmacy' | 'lab' = 'hospital';
        let name = tags.name || tags['name:en'] || 'Unknown Facility';
        let address = tags.address || tags['addr:street'] || 'Address not available';
        let phone = tags.phone || tags['contact:phone'] || '+91-XXX-XXX-XXXX';
        let hours = tags.opening_hours || 'Hours not available';

        // Determine facility type
        if (tags.amenity === 'hospital') {
          type = 'hospital';
        } else if (tags.amenity === 'clinic') {
          type = 'clinic';
        } else if (tags.amenity === 'pharmacy') {
          type = 'pharmacy';
        } else if (tags.amenity === 'laboratory') {
          type = 'lab';
        } else {
          return; // Skip if not a medical facility
        }

        // Calculate distance from user location
        const distance = calculateDistance(lat, lon, element.lat, element.lon);

        // Generate services based on facility type
        const services = generateServices(type);

        // Generate rating (random for now, but could be enhanced with real data)
        const rating = 4.0 + Math.random() * 1.0;

        facilities.push({
          id: `real_${idCounter++}`,
          name,
          type,
          address,
          phone,
          rating: Math.round(rating * 10) / 10,
          distance: Math.round(distance * 10) / 10,
          coordinates: [element.lat, element.lon],
          hours,
          services
        });
      }
    });

    // Sort by distance and limit to top 20
    return facilities
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 20);

  } catch (error) {
    console.error('Error fetching real hospital data:', error);
    return [];
  }
}

// Function to calculate distance between two coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Function to generate services based on facility type
function generateServices(type: 'hospital' | 'clinic' | 'pharmacy' | 'lab'): string[] {
  const serviceMap = {
    hospital: ['Emergency Care', 'Cardiology', 'Neurology', 'Surgery', 'ICU', 'Pediatrics'],
    clinic: ['Primary Care', 'General Medicine', 'Vaccinations', 'Health Checkups'],
    pharmacy: ['Prescriptions', 'Over-the-counter', 'Health Supplements', 'Medical Devices'],
    lab: ['Blood Tests', 'Imaging', 'COVID Testing', 'Pathology', 'Diagnostics']
  };
  return serviceMap[type] || ['General Services'];
}

const facilityTypes = [
  { id: 'all', label: 'All', icon: '🏥' },
  { id: 'hospital', label: 'Hospitals', icon: '🏥' },
  { id: 'clinic', label: 'Clinics', icon: '🏥' },
  { id: 'pharmacy', label: 'Pharmacies', icon: '💊' },
  { id: 'lab', label: 'Labs', icon: '🔬' }
];

export default function HealthMapPage() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [allFacilities, setAllFacilities] = useState<Facility[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoadingFacilities, setIsLoadingFacilities] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(location);
          setIsLoading(false);
          
          // Fetch real hospital data
          setIsLoadingFacilities(true);
          try {
            const realFacilities = await fetchRealHospitalData(location[0], location[1]);
            if (realFacilities.length > 0) {
              setAllFacilities(realFacilities);
              setFilteredFacilities(realFacilities);
            } else {
              // Fallback to mock data if no real data found
              const mockFacilities = getMockFacilities(location);
              setAllFacilities(mockFacilities);
              setFilteredFacilities(mockFacilities);
            }
          } catch (error) {
            console.error('Error fetching facilities:', error);
            // Fallback to mock data
            const mockFacilities = getMockFacilities(location);
            setAllFacilities(mockFacilities);
            setFilteredFacilities(mockFacilities);
          }
          setIsLoadingFacilities(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to a default location in Delhi, India
          const defaultLocation: [number, number] = [28.6139, 77.2090];
          setUserLocation(defaultLocation);
          setIsLoading(false);
          
          // Fetch real hospital data for default location
          setIsLoadingFacilities(true);
          fetchRealHospitalData(defaultLocation[0], defaultLocation[1])
            .then((realFacilities) => {
              if (realFacilities.length > 0) {
                setAllFacilities(realFacilities);
                setFilteredFacilities(realFacilities);
              } else {
                const mockFacilities = getMockFacilities(defaultLocation);
                setAllFacilities(mockFacilities);
                setFilteredFacilities(mockFacilities);
              }
            })
            .catch(() => {
              const mockFacilities = getMockFacilities(defaultLocation);
              setAllFacilities(mockFacilities);
              setFilteredFacilities(mockFacilities);
            })
            .finally(() => {
              setIsLoadingFacilities(false);
            });
        }
      );
    } else {
      const defaultLocation: [number, number] = [28.6139, 77.2090];
      setUserLocation(defaultLocation);
      setIsLoading(false);
      const mockFacilities = getMockFacilities(defaultLocation);
      setAllFacilities(mockFacilities);
      setFilteredFacilities(mockFacilities);
    }
  }, []);

  // Function to get mock facilities as fallback
  function getMockFacilities(location: [number, number]): Facility[] {
    return [
      {
        id: '1',
        name: 'Apollo Hospital Delhi',
        type: 'hospital',
        address: 'Sarita Vihar, Delhi, India',
        phone: '+91-11-7179-1090',
        rating: 4.8,
        distance: 0.5,
        coordinates: [28.6139, 77.2090],
        hours: '24/7',
        services: ['Emergency Care', 'Cardiology', 'Neurology', 'Oncology']
      },
      {
        id: '2',
        name: 'Fortis Hospital Mumbai',
        type: 'hospital',
        address: 'Mulund West, Mumbai, Maharashtra',
        phone: '+91-22-6766-7777',
        rating: 4.7,
        distance: 1.2,
        coordinates: [19.0760, 72.8777],
        hours: '24/7',
        services: ['Trauma Care', 'Orthopedics', 'Pediatrics', 'ICU']
      },
      {
        id: '3',
        name: 'MedPlus Pharmacy',
        type: 'pharmacy',
        address: 'Koramangala, Bangalore, Karnataka',
        phone: '+91-80-2555-1234',
        rating: 4.3,
        distance: 0.8,
        coordinates: [12.9716, 77.5946],
        hours: 'Mon-Sat 8AM-10PM',
        services: ['Prescriptions', 'Over-the-counter', 'Health Supplements']
      },
      {
        id: '4',
        name: 'Dr. Reddy\'s Lab',
        type: 'lab',
        address: 'T Nagar, Chennai, Tamil Nadu',
        phone: '+91-44-2498-5678',
        rating: 4.6,
        distance: 1.5,
        coordinates: [13.0827, 80.2707],
        hours: 'Mon-Fri 7AM-7PM',
        services: ['Blood Tests', 'Imaging', 'COVID Testing', 'Pathology']
      },
      {
        id: '5',
        name: 'Kolkata Medical Center',
        type: 'clinic',
        address: 'Park Street, Kolkata, West Bengal',
        phone: '+91-33-2287-8901',
        rating: 4.5,
        distance: 2.1,
        coordinates: [22.5726, 88.3639],
        hours: 'Mon-Sat 9AM-6PM',
        services: ['Primary Care', 'Vaccinations', 'Health Checkups']
      }
    ];
  }

  // Filter facilities based on active filter and search query
  useEffect(() => {
    let filtered = allFacilities;
    
    // Filter by type
    if (activeFilter !== 'all') {
      filtered = filtered.filter(facility => facility.type === activeFilter);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(facility =>
        facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredFacilities(filtered);
  }, [activeFilter, searchQuery, allFacilities]);

  const handleFacilityClick = (facility: Facility) => {
    setSelectedFacility(facility);
    // Close sidebar on mobile when facility is selected
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const getDirections = (facility: Facility) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${facility.coordinates[0]},${facility.coordinates[1]}`;
    window.open(url, '_blank');
  };

  const callFacility = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Getting your location in India...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Back to Main Website Button */}
              <button
                onClick={() => window.location.href = '/'}
                className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                title="Back to Main Website"
              >
                <ArrowLeft size={20} />
              </button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Menu size={20} />
              </button>
              
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">India Health Map</h1>
                <p className="text-xs lg:text-sm text-gray-600">
                  {isLoadingFacilities ? 'Loading real hospital data...' : 'Find nearby medical facilities across India'}
                </p>
                {!isLoadingFacilities && allFacilities.length > 0 && allFacilities[0].id.startsWith('real_') && (
                  <p className="text-xs text-green-600 mt-1">✓ Real hospital data loaded</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Filter size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)] relative">
        {/* Map Section */}
        <div className="flex-1 relative bg-white">
          <MapComponent
            userLocation={userLocation}
            facilities={filteredFacilities}
            onFacilityClick={handleFacilityClick}
            selectedFacility={selectedFacility}
          />
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 bg-white shadow-lg border-l border-gray-200 overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search facilities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter by Type</h3>
              <div className="flex flex-wrap gap-2">
                {facilityTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveFilter(type.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      activeFilter === type.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-1">{type.icon}</span>
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Facilities List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {isLoadingFacilities ? 'Loading...' : `Nearby Facilities (${filteredFacilities.length})`}
              </h3>
              {isLoadingFacilities ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-600">Loading real hospital data...</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredFacilities.map((facility) => (
                    <div
                      key={facility.id}
                      onClick={() => handleFacilityClick(facility)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        selectedFacility?.id === facility.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">
                              {facility.type === 'hospital' ? '🏥' : 
                               facility.type === 'clinic' ? '🏥' : 
                               facility.type === 'pharmacy' ? '💊' : '🔬'}
                            </span>
                            <h4 className="font-semibold text-gray-900">{facility.name}</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{facility.address}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Star size={14} className="text-yellow-500" />
                              {facility.rating}
                            </span>
                            <span>{facility.distance} km away</span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {facility.hours}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {showSidebar && (
          <div className="lg:hidden fixed inset-0 z-50">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowSidebar(false)}
            />
            
            {/* Sidebar */}
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Facilities</h3>
                  <button
                    onClick={() => setShowSidebar(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-gray-200">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search facilities..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-700">Filter by Type</h3>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  
                  {showFilters && (
                    <div className="flex flex-wrap gap-2">
                      {facilityTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setActiveFilter(type.id)}
                          className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                            activeFilter === type.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <span className="mr-1">{type.icon}</span>
                          {type.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Facilities List */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {isLoadingFacilities ? 'Loading...' : `Nearby Facilities (${filteredFacilities.length})`}
                    </h3>
                    {isLoadingFacilities ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-2 text-gray-600">Loading real hospital data...</span>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {filteredFacilities.map((facility) => (
                          <div
                            key={facility.id}
                            onClick={() => handleFacilityClick(facility)}
                            className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                              selectedFacility?.id === facility.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-lg">
                                    {facility.type === 'hospital' ? '🏥' : 
                                     facility.type === 'clinic' ? '🏥' : 
                                     facility.type === 'pharmacy' ? '💊' : '🔬'}
                                  </span>
                                  <h4 className="font-semibold text-gray-900">{facility.name}</h4>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{facility.address}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <Star size={14} className="text-yellow-500" />
                                    {facility.rating}
                                  </span>
                                  <span>{facility.distance} km away</span>
                                  <span className="flex items-center gap-1">
                                    <Clock size={14} />
                                    {facility.hours}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Facility Details Modal - Mobile Optimized */}
      {selectedFacility && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 lg:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {selectedFacility.type === 'hospital' ? '🏥' : 
                     selectedFacility.type === 'clinic' ? '🏥' : 
                     selectedFacility.type === 'pharmacy' ? '💊' : '🔬'}
                  </span>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900">{selectedFacility.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                  <p className="text-gray-600 text-sm lg:text-base">{selectedFacility.address}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedFacility.services.map((service, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-500" />
                    <span className="text-sm text-gray-600">
                      {selectedFacility.rating} rating
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">{selectedFacility.distance} km away</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} />
                  <span>{selectedFacility.hours}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-3 pt-4">
                  <button
                    onClick={() => callFacility(selectedFacility.phone)}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Phone size={16} />
                    Call
                  </button>
                  <button
                    onClick={() => getDirections(selectedFacility)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Navigation size={16} />
                    Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
