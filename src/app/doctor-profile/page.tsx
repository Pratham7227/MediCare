'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DoctorProfilePage() {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const doctor = {
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    hospital: 'City General Hospital',
    fees: '$150',
    experience: '15 years',
    education: 'MD - Harvard Medical School',
    photoUrl: '',
    description: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology and has helped thousands of patients maintain heart health.',
    availableSlots: [
      '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
    ]
  };

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedSlot) {
      alert('Please select a date and time slot');
      return;
    }
    alert(`Appointment booked for ${selectedDate} at ${selectedSlot}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Doctor Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Doctor Photo */}
            <div className="flex-shrink-0">
              {doctor.photoUrl ? (
                <img
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  className="w-48 h-48 rounded-full object-cover border-4 border-blue-200"
                />
              ) : (
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-200 to-green-200 border-4 border-blue-200 flex items-center justify-center text-blue-600 font-bold text-6xl">
                  {doctor.name.charAt(0)}
                </div>
              )}
            </div>
            
            {/* Doctor Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-blue-800 mb-2">{doctor.name}</h1>
              <p className="text-xl text-green-700 font-semibold mb-2">{doctor.specialization}</p>
              <p className="text-blue-600 mb-4">{doctor.hospital}</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-gray-600">Consultation Fee:</span>
                  <span className="ml-2 font-bold text-blue-700 text-lg">{doctor.fees}</span>
                </div>
                <div>
                  <span className="text-gray-600">Experience:</span>
                  <span className="ml-2 font-semibold">{doctor.experience}</span>
                </div>
                <div>
                  <span className="text-gray-600">Education:</span>
                  <span className="ml-2 font-semibold">{doctor.education}</span>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">{doctor.description}</p>
            </div>
          </div>
        </div>
        
        {/* Appointment Booking */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Book Appointment</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Date Selection */}
            <div>
              <label className="block text-blue-800 font-medium mb-2">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            {/* Time Slots */}
            <div>
              <label className="block text-blue-800 font-medium mb-2">Select Time</label>
              <div className="grid grid-cols-2 gap-2">
                {doctor.availableSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selectedSlot === slot
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-blue-800 border-blue-200 hover:bg-blue-50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Book Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleBookAppointment}
              className="px-8 py-3 bg-blue-600 hover:bg-green-600 text-white font-bold text-lg rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 