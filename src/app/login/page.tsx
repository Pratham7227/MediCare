'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FormInput from '@/components/FormInput';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert(isLogin ? 'Login successful!' : 'Registration successful!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
          <div className="grid lg:grid-cols-2">
            {/* Left Column - Healthcare Image */}
            <div className="bg-gradient-to-br from-blue-600 to-green-600 p-8 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-6xl">🏥</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Welcome to MediCare</h2>
                <p className="text-blue-100 text-lg">
                  Your trusted partner in healthcare. Access medical services, find doctors, 
                  and manage your health information all in one place.
                </p>
              </div>
            </div>

            {/* Right Column - Login Form */}
            <div className="p-8">
              <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-blue-800 mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-gray-600 mb-8">
                  {isLogin 
                    ? 'Sign in to access your health information and book appointments.'
                    : 'Join thousands of patients who trust MediCare for their healthcare needs.'
                  }
                </p>

                {/* Toggle Buttons */}
                <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                      isLogin
                        ? 'bg-white text-blue-800 shadow-sm'
                        : 'text-gray-600 hover:text-blue-800'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                      !isLogin
                        ? 'bg-white text-blue-800 shadow-sm'
                        : 'text-gray-600 hover:text-blue-800'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <FormInput
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  )}
                  
                  <FormInput
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  
                  {!isLogin && (
                    <FormInput
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  )}
                  
                  {isLogin && (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-blue-300 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                      </label>
                      <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                        Forgot password?
                      </a>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-green-600 text-white font-bold rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </button>
                </form>

                {/* Social Login */}
                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="text-blue-600 font-bold mr-2">G</span>
                      Google
                    </button>
                    <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="text-blue-600 font-bold mr-2">F</span>
                      Facebook
                    </button>
                  </div>
                </div>

                {/* Terms */}
                {!isLogin && (
                  <p className="mt-6 text-xs text-gray-500 text-center">
                    By creating an account, you agree to our{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 