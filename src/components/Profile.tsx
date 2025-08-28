'use client';

import { useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    bloodType: 'O+',
    allergies: 'Penicillin, Peanuts',
    emergencyContact: 'Jane Doe - (555) 987-6543',
    medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
    currentMedications: ['Metformin 500mg', 'Lisinopril 10mg'],
    insuranceProvider: 'Blue Cross Blue Shield',
    insuranceNumber: 'BC123456789'
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-blue-100">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white/20 p-2 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Personal Information */}
        <section className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            👤 Personal Information
          </h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Full Name</label>
                <p className="text-gray-800">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                <p className="text-gray-800">{user.dateOfBirth}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Phone Number</label>
              <p className="text-gray-800">{user.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <p className="text-gray-800">{user.email}</p>
            </div>
          </div>
        </section>

        {/* Medical Information */}
        <section className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🩺 Medical Information
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Blood Type</label>
                <p className="text-red-600 font-semibold">{user.bloodType}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Emergency Contact</label>
                <p className="text-gray-800">{user.emergencyContact}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Known Allergies</label>
              <p className="text-red-600 font-medium">{user.allergies}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Medical History</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {user.medicalHistory.map((condition, index) => (
                  <span key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-lg text-sm">
                    {condition}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Current Medications</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {user.currentMedications.map((medication, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm">
                    {medication}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Information */}
        <section className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🛡️ Insurance Information
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600">Insurance Provider</label>
              <p className="text-gray-800">{user.insuranceProvider}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Policy Number</label>
              <p className="text-gray-800 font-mono">{user.insuranceNumber}</p>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            ⚡ Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-blue-50 text-blue-600 p-3 rounded-lg text-center hover:bg-blue-100 transition-colors">
              <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">Book Appointment</span>
            </button>
            <button className="bg-green-50 text-green-600 p-3 rounded-lg text-center hover:bg-green-100 transition-colors">
              <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium">Medical Records</span>
            </button>
            <button className="bg-purple-50 text-purple-600 p-3 rounded-lg text-center hover:bg-purple-100 transition-colors">
              <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span className="text-sm font-medium">Prescriptions</span>
            </button>
            <button className="bg-red-50 text-red-600 p-3 rounded-lg text-center hover:bg-red-100 transition-colors">
              <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-sm font-medium">Emergency Card</span>
            </button>
          </div>
        </section>

        {/* Settings */}
        <section className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            ⚙️ Settings
          </h2>
          <div className="space-y-3">
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center justify-between">
              <span className="text-gray-700">Privacy Settings</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center justify-between">
              <span className="text-gray-700">Notifications</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center justify-between text-red-600">
              <span>Sign Out</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
