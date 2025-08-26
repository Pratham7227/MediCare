'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Filter, Star, Clock, Phone, Calendar, User, Award, Building2, DollarSign, ChevronDown, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Enhanced mock data for doctors
const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    hospital: 'Apollo Hospital Delhi',
    fees: '₹1500',
    rating: 4.8,
    experience: '15 years',
    location: 'Delhi, India',
    photoUrl: '',
    availability: 'Mon-Fri 9AM-6PM',
    phone: '+91-11-7179-1090',
    languages: ['English', 'Hindi'],
    education: 'MBBS, MD - Cardiology',
    awards: ['Best Cardiologist 2023', 'Excellence in Healthcare']
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialization: 'Dermatologist',
    hospital: 'Fortis Hospital Mumbai',
    fees: '₹1200',
    rating: 4.6,
    experience: '12 years',
    location: 'Mumbai, India',
    photoUrl: '',
    availability: 'Mon-Sat 10AM-7PM',
    phone: '+91-22-6766-7777',
    languages: ['English', 'Hindi', 'Mandarin'],
    education: 'MBBS, MD - Dermatology',
    awards: ['Top Dermatologist 2022']
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrician',
    hospital: 'Children\'s Hospital Bangalore',
    fees: '₹1000',
    rating: 4.9,
    experience: '18 years',
    location: 'Bangalore, India',
    photoUrl: '',
    availability: 'Mon-Fri 8AM-5PM',
    phone: '+91-80-2555-1234',
    languages: ['English', 'Hindi', 'Spanish'],
    education: 'MBBS, MD - Pediatrics',
    awards: ['Best Pediatrician 2023', 'Child Care Excellence']
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialization: 'Neurologist',
    hospital: 'AIIMS Delhi',
    fees: '₹2000',
    rating: 4.7,
    experience: '20 years',
    location: 'Delhi, India',
    photoUrl: '',
    availability: 'Mon-Fri 9AM-6PM',
    phone: '+91-11-2658-8500',
    languages: ['English', 'Hindi'],
    education: 'MBBS, MD - Neurology',
    awards: ['Neurology Excellence Award']
  },
  {
    id: 5,
    name: 'Dr. Lisa Thompson',
    specialization: 'Orthopedic Surgeon',
    hospital: 'Sports Medicine Clinic Chennai',
    fees: '₹1800',
    rating: 4.5,
    experience: '14 years',
    location: 'Chennai, India',
    photoUrl: '',
    availability: 'Mon-Sat 9AM-7PM',
    phone: '+91-44-2498-5678',
    languages: ['English', 'Hindi', 'Tamil'],
    education: 'MBBS, MS - Orthopedics',
    awards: ['Sports Medicine Specialist']
  },
  {
    id: 6,
    name: 'Dr. Robert Kim',
    specialization: 'Psychiatrist',
    hospital: 'Mental Health Institute Kolkata',
    fees: '₹1300',
    rating: 4.4,
    experience: '16 years',
    location: 'Kolkata, India',
    photoUrl: '',
    availability: 'Mon-Fri 10AM-6PM',
    phone: '+91-33-2287-8901',
    languages: ['English', 'Hindi', 'Bengali'],
    education: 'MBBS, MD - Psychiatry',
    awards: ['Mental Health Advocate']
  },
  {
    id: 7,
    name: 'Dr. Priya Sharma',
    specialization: 'Gynecologist',
    hospital: 'Women\'s Health Center',
    fees: '₹1400',
    rating: 4.8,
    experience: '13 years',
    location: 'Pune, India',
    photoUrl: '',
    availability: 'Mon-Sat 9AM-6PM',
    phone: '+91-20-4123-4567',
    languages: ['English', 'Hindi', 'Marathi'],
    education: 'MBBS, MD - Obstetrics & Gynecology',
    awards: ['Women\'s Health Excellence']
  },
  {
    id: 8,
    name: 'Dr. Rajesh Kumar',
    specialization: 'Oncologist',
    hospital: 'Cancer Research Institute',
    fees: '₹2500',
    rating: 4.9,
    experience: '22 years',
    location: 'Hyderabad, India',
    photoUrl: '',
    availability: 'Mon-Fri 8AM-5PM',
    phone: '+91-40-2345-6789',
    languages: ['English', 'Hindi', 'Telugu'],
    education: 'MBBS, MD - Oncology',
    awards: ['Oncology Research Award', 'Cancer Care Excellence']
  }
];

const specializations = [
  'All Specializations',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Neurologist',
  'Orthopedic Surgeon',
  'Psychiatrist',
  'Gynecologist',
  'Oncologist',
  'Dentist',
  'Ophthalmologist',
  'ENT Specialist'
];

const locations = [
  'All Locations',
  'Delhi, India',
  'Mumbai, India',
  'Bangalore, India',
  'Chennai, India',
  'Kolkata, India',
  'Pune, India',
  'Hyderabad, India'
];

export default function DoctorSearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations');
  const [maxFees, setMaxFees] = useState('');
  const [minRating, setMinRating] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredDoctors, setFilteredDoctors] = useState(mockDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

  // Filter doctors based on search criteria
  useEffect(() => {
    let filtered = mockDoctors;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by location
    if (selectedLocation !== 'All Locations') {
      filtered = filtered.filter(doctor => doctor.location === selectedLocation);
    }

    // Filter by specialization
    if (selectedSpecialization !== 'All Specializations') {
      filtered = filtered.filter(doctor => doctor.specialization === selectedSpecialization);
    }

    // Filter by max fees
    if (maxFees) {
      const maxFee = parseInt(maxFees);
      filtered = filtered.filter(doctor => {
        const fee = parseInt(doctor.fees.replace('₹', ''));
        return fee <= maxFee;
      });
    }

    // Filter by minimum rating
    if (minRating) {
      const minRatingNum = parseFloat(minRating);
      filtered = filtered.filter(doctor => doctor.rating >= minRatingNum);
    }

    setFilteredDoctors(filtered);
  }, [searchTerm, selectedLocation, selectedSpecialization, maxFees, minRating]);

  const handleBookAppointment = (doctor: any) => {
    setSelectedDoctor(doctor);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect Doctor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with experienced healthcare professionals across India. Book appointments, read reviews, and get the care you deserve.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          {/* Main Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by doctor name, specialization, or hospital..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 text-lg"
            />
          </div>
          
          {/* Quick Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Filter size={16} />
              Filters
              <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            {selectedLocation !== 'All Locations' && (
              <span className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                <MapPin size={14} />
                {selectedLocation}
                <button onClick={() => setSelectedLocation('All Locations')} className="ml-1">
                  <X size={14} />
                </button>
              </span>
            )}
            
            {selectedSpecialization !== 'All Specializations' && (
              <span className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                <User size={14} />
                {selectedSpecialization}
                <button onClick={() => setSelectedSpecialization('All Specializations')} className="ml-1">
                  <X size={14} />
                </button>
              </span>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid md:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Fee</label>
                <select
                  value={maxFees}
                  onChange={(e) => setMaxFees(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Fee</option>
                  <option value="1000">Under ₹1000</option>
                  <option value="1500">Under ₹1500</option>
                  <option value="2000">Under ₹2000</option>
                  <option value="2500">Under ₹2500</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Rating</label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Rating</option>
                  <option value="4.0">4.0+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.8">4.8+ Stars</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Results Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Doctors ({filteredDoctors.length})
            </h2>
            <div className="text-sm text-gray-600">
              Showing {filteredDoctors.length} of {mockDoctors.length} doctors
            </div>
          </div>
          
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-gray-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No doctors found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Doctor Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {doctor.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
                      <p className="text-blue-600 font-semibold">{doctor.specialization}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-semibold text-gray-700">{doctor.rating}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{doctor.experience}</span>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building2 className="w-4 h-4 text-blue-500" />
                      <span>{doctor.hospital}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-green-500" />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-purple-500" />
                      <span>{doctor.availability}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 text-orange-500" />
                      <span className="font-semibold text-gray-900">{doctor.fees}</span>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {doctor.languages.map((language, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBookAppointment(doctor)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                    >
                      Book Appointment
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Doctor Details Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-start gap-6 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center text-white font-bold text-2xl">
                  {selectedDoctor.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedDoctor.name}</h3>
                  <p className="text-blue-600 font-semibold">{selectedDoctor.specialization}</p>
                  <p className="text-gray-600">{selectedDoctor.hospital}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{selectedDoctor.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span>{selectedDoctor.experience}</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-500" />
                      <span>{selectedDoctor.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-500" />
                      <span>{selectedDoctor.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-500" />
                      <span>{selectedDoctor.availability}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Education & Awards</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span>{selectedDoctor.education}</span>
                    </div>
                    {selectedDoctor.awards.map((award: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-blue-500" />
                        <span>{award}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                  Book Appointment
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Call Doctor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
} 