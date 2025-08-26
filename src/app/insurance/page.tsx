'use client';

import { useState } from 'react';
import { Shield, FileText, Phone, Clock, CheckCircle, AlertCircle, Upload, DollarSign, Calendar, User, Building2, Mail, MessageSquare, ChevronRight, Star, Award, Users, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function InsurancePage() {
  const [formData, setFormData] = useState({
    policyNumber: '',
    patientName: '',
    dateOfTreatment: '',
    hospitalName: '',
    treatmentDescription: '',
    claimAmount: '',
    email: '',
    phone: ''
  });

  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Claim form submitted successfully! We will contact you within 24 hours.');
    setIsSubmitting(false);
  };

  const insurancePlans = [
    {
      name: 'Basic Health Plan',
      price: '₹2,500',
      features: ['Hospitalization Coverage', 'Pre & Post Hospitalization', 'Day Care Procedures', 'Ambulance Charges'],
      popular: false
    },
    {
      name: 'Premium Health Plan',
      price: '₹5,000',
      features: ['All Basic Features', 'Critical Illness Coverage', 'Maternity Benefits', 'Dental Coverage', 'Vision Care'],
      popular: true
    },
    {
      name: 'Family Health Plan',
      price: '₹8,000',
      features: ['All Premium Features', 'Family Coverage (4 members)', 'Preventive Health Checkups', 'Mental Health Coverage'],
      popular: false
    }
  ];

  const faqItems = [
    {
      question: 'What documents do I need to submit with my claim?',
      answer: 'You will need to submit the original medical bills, prescription receipts, doctor\'s certificate, discharge summary, and any other relevant medical documents. Digital copies are also accepted.'
    },
    {
      question: 'How long does it take to process a claim?',
      answer: 'Standard claims are processed within 7-10 business days. Complex cases may take up to 30 days. We\'ll keep you updated throughout the process via email and SMS.'
    },
    {
      question: 'Can I track my claim status online?',
      answer: 'Yes, you can track your claim status by logging into your account or calling our helpline with your claim reference number. Real-time updates are available 24/7.'
    },
    {
      question: 'What is covered under my insurance policy?',
      answer: 'Coverage varies by policy. Please refer to your policy document or contact our customer service for specific details about your coverage. We offer comprehensive health insurance plans.'
    },
    {
      question: 'How do I appeal a denied claim?',
      answer: 'You can appeal a denied claim by submitting additional documentation and a written explanation within 30 days of the denial notice. Our appeals team will review your case thoroughly.'
    },
    {
      question: 'Are pre-existing conditions covered?',
      answer: 'Pre-existing conditions are covered after a waiting period of 2-4 years depending on your policy. Please check your specific policy terms for detailed information.'
    }
  ];

  const claimSteps = [
    {
      step: 1,
      title: 'Submit Claim',
      description: 'Fill out the claim form with all required details',
      icon: FileText
    },
    {
      step: 2,
      title: 'Document Review',
      description: 'Our team reviews your submitted documents',
      icon: CheckCircle
    },
    {
      step: 3,
      title: 'Processing',
      description: 'Claim is processed and verified',
      icon: Clock
    },
    {
      step: 4,
      title: 'Approval',
      description: 'Claim is approved and payment initiated',
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Health Insurance Claims
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get help with your insurance claims and access our comprehensive support services. We're here to make the process simple and stress-free.
          </p>
        </div>

        {/* Insurance Plans Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Health Insurance Plan</h2>
            <p className="text-gray-600">Select the perfect plan for you and your family</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {insurancePlans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'border-blue-500 scale-105' : 'border-gray-100'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-1">{plan.price}</div>
                  <p className="text-gray-500">per month</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.popular 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}>
                  {plan.popular ? 'Get Started' : 'Learn More'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Claim Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Submit Insurance Claim</h2>
                <p className="text-gray-600">Fill out the form below to submit your claim</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Policy Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="policyNumber"
                    value={formData.policyNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Treatment <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfTreatment"
                    value={formData.dateOfTreatment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Claim Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="claimAmount"
                      value={formData.claimAmount}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital/Clinic Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Treatment Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="treatmentDescription"
                  value={formData.treatmentDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Please describe the treatment received..."
                  required
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Documents <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PDF, JPG, JPEG, PNG (Max 10MB per file)</p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Submit Claim
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Help Information */}
          <div className="space-y-8">
            {/* Helpline */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Insurance Helpline</h3>
                  <p className="text-blue-100">24/7 Support Available</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold">1-800-INSURANCE</p>
                <p className="text-blue-100">Available 24/7 for emergency claims</p>
                <div className="text-sm text-blue-200">
                  <p>Monday - Friday: 8 AM - 8 PM EST</p>
                  <p>Saturday: 9 AM - 5 PM EST</p>
                </div>
              </div>
            </div>

            {/* Claim Process */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Claim Process</h3>
              <div className="space-y-4">
                {claimSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
                <div className="text-2xl font-bold text-blue-600 mb-1">98%</div>
                <div className="text-sm text-gray-600">Claim Success Rate</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
                <div className="text-2xl font-bold text-green-600 mb-1">7 Days</div>
                <div className="text-sm text-gray-600">Average Processing</div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Find answers to common questions about insurance claims</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-900">{item.question}</span>
                      <ChevronRight className="w-5 h-5 text-gray-500 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-4 pb-4 text-gray-600">
                      {item.answer}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 