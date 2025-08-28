'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import EmergencyButton from '@/components/EmergencyButton';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import MedicalHelp from '@/components/MedicalHelp';
import Profile from '@/components/Profile';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  const router = useRouter();
  
  const handleTabChange = (tab: string) => {
    if (tab === 'healthmap') {
      router.push('/health-map');
      return;
    }
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'medical-help':
        return <MedicalHelp />;
      case 'profile':
        return <Profile />;
      default:
        return (
          <>
            {/* Search Bar - Moved to Top */}
            <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4 sticky top-0 z-40">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-3">
                  <div className="flex-1 relative">
                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search for doctors or specializations..."
                      className="w-full pl-12 pr-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white/80"
                    />
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-medium rounded-xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Search
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Hospital & Drugs Section */}
            <div className="bg-gray-50 py-8 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 gap-4 lg:gap-8">
                  {/* Hospitals/Specializations Column */}
                  <div className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-6 shadow-lg">
                    <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
                      <div className="w-8 h-8 lg:w-12 lg:h-12 bg-blue-100 rounded-lg lg:rounded-xl flex items-center justify-center">
                        <svg className="w-4 h-4 lg:w-6 lg:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h2 className="text-lg lg:text-2xl font-bold text-gray-800">Hospitals</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
                      {[
                        { name: 'Cardiology', icon: '❤️', count: '45' },
                        { name: 'Neurology', icon: '🧠', count: '32' },
                        { name: 'Orthopedics', icon: '🦴', count: '38' },
                        { name: 'Pediatrics', icon: '👶', count: '28' },
                        { name: 'Dermatology', icon: '🧴', count: '22' },
                        { name: 'Gynecology', icon: '👩‍⚕️', count: '25' }
                      ].map((spec, index) => (
                        <div key={index} className="bg-blue-50 hover:bg-blue-100 p-2 lg:p-4 rounded-lg lg:rounded-xl cursor-pointer transition-all duration-200 border border-blue-100 hover:border-blue-200">
                          <div className="flex items-center gap-1 lg:gap-2 mb-1 lg:mb-2">
                            <span className="text-sm lg:text-lg">{spec.icon}</span>
                            <h3 className="font-semibold text-gray-800 text-xs lg:text-sm">{spec.name}</h3>
                          </div>
                          <p className="text-xs text-gray-600">{spec.count} docs</p>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-3 lg:mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 lg:py-3 rounded-lg lg:rounded-xl text-sm lg:text-base font-medium transition-colors">
                      View All
                    </button>
                  </div>

                  {/* Drugs Column */}
                  <div className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-6 shadow-lg">
                    <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
                      <div className="w-8 h-8 lg:w-12 lg:h-12 bg-green-100 rounded-lg lg:rounded-xl flex items-center justify-center">
                        <svg className="w-4 h-4 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <h2 className="text-lg lg:text-2xl font-bold text-gray-800">Drugs</h2>
                    </div>
                    <div className="space-y-2 lg:space-y-4">
                      {[
                        { name: 'Paracetamol', category: 'Pain Relief', price: '$5.99' },
                        { name: 'Ibuprofen', category: 'Anti-inflammatory', price: '$7.50' },
                        { name: 'Amoxicillin', category: 'Antibiotic', price: '$12.99' },
                        { name: 'Omeprazole', category: 'Acid Reducer', price: '$8.75' },
                        { name: 'Metformin', category: 'Diabetes', price: '$15.20' },
                        { name: 'Lisinopril', category: 'Blood Pressure', price: '$11.40' }
                      ].map((drug, index) => (
                        <div key={index} className="bg-green-50 hover:bg-green-100 p-2 lg:p-4 rounded-lg lg:rounded-xl cursor-pointer transition-all duration-200 border border-green-100 hover:border-green-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-800 text-xs lg:text-base">{drug.name}</h3>
                              <p className="text-xs text-gray-600">{drug.category}</p>
                            </div>
                            <p className="font-semibold text-green-600 text-xs lg:text-base">{drug.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-3 lg:mt-4 bg-green-600 hover:bg-green-700 text-white py-2 lg:py-3 rounded-lg lg:rounded-xl text-sm lg:text-base font-medium transition-colors">
                      Browse All
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
              {/* Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              </div>
              
              <div className="relative max-w-6xl mx-auto text-center">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Trusted by 10,000+ Patients
                  </div>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold text-blue-800 mb-6 leading-tight">
                  Your Health,
                  <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Our Priority
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Find trusted doctors, get comprehensive medical information, and access emergency services all in one secure platform.
                </p>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-white">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
                    Why Choose <span className="text-green-600">MediCare</span>?
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    We provide comprehensive healthcare solutions designed to make your medical journey seamless and stress-free.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Expert Doctors */}
                  <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-blue-800 mb-4">Expert Doctors</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Connect with board-certified specialists and experienced healthcare professionals who prioritize your well-being.
                    </p>
                  </div>

                  {/* Drug Information */}
                  <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-green-800 mb-4">Drug Information</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Access comprehensive drug databases with detailed information about medications, side effects, and interactions.
                    </p>
                  </div>

                  {/* 24/7 Emergency */}
                  <div className="group bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-red-800 mb-4">24/7 Emergency</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Round-the-clock emergency services with instant access to medical professionals and emergency contacts.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-green-600">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div className="text-white">
                    <div className="text-4xl font-bold mb-2">10K+</div>
                    <div className="text-blue-100">Happy Patients</div>
                  </div>
                  <div className="text-white">
                    <div className="text-4xl font-bold mb-2">500+</div>
                    <div className="text-blue-100">Expert Doctors</div>
                  </div>
                  <div className="text-white">
                    <div className="text-4xl font-bold mb-2">24/7</div>
                    <div className="text-blue-100">Support Available</div>
                  </div>
                  <div className="text-white">
                    <div className="text-4xl font-bold mb-2">99%</div>
                    <div className="text-blue-100">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {activeTab === 'home' && <Header />}
      
      {renderContent()}

      {activeTab === 'home' && <EmergencyButton />}
      {activeTab === 'home' && <Footer />}
      
      <MobileNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
