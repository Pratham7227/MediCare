'use client';

import { useState } from 'react';
import { HelpCircle, Phone, Mail, MessageSquare, Clock, Users, Star, Award, ChevronRight, Search, FileText, Video, Headphones, Zap, Shield, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HelpCenterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    
    alert('Thank you for your feedback! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const helplineNumbers = [
    { 
      name: 'General Support', 
      number: '1-800-MEDICARE', 
      hours: '24/7',
      icon: Users,
      color: 'blue',
      description: 'General inquiries and account support'
    },
    { 
      name: 'Technical Support', 
      number: '1-800-TECH-HELP', 
      hours: 'Mon-Fri 8AM-8PM',
      icon: Zap,
      color: 'green',
      description: 'Website and app technical issues'
    },
    { 
      name: 'Billing Support', 
      number: '1-800-BILLING', 
      hours: 'Mon-Fri 9AM-6PM',
      icon: FileText,
      color: 'purple',
      description: 'Payment and billing questions'
    },
    { 
      name: 'Emergency Support', 
      number: '1-800-EMERGENCY', 
      hours: '24/7',
      icon: Heart,
      color: 'red',
      description: 'Urgent medical assistance'
    }
  ];

  const supportCategories = [
    {
      title: 'Account & Profile',
      icon: Users,
      color: 'blue',
      articles: [
        'How to create an account',
        'Updating personal information',
        'Password reset guide',
        'Account security settings'
      ]
    },
    {
      title: 'Appointments',
      icon: Clock,
      color: 'green',
      articles: [
        'Booking appointments',
        'Canceling appointments',
        'Rescheduling guide',
        'Appointment reminders'
      ]
    },
    {
      title: 'Insurance & Claims',
      icon: Shield,
      color: 'purple',
      articles: [
        'Understanding coverage',
        'Filing insurance claims',
        'Claim status tracking',
        'Appealing denied claims'
      ]
    },
    {
      title: 'Technical Issues',
      icon: Zap,
      color: 'orange',
      articles: [
        'Website troubleshooting',
        'Mobile app issues',
        'Browser compatibility',
        'Performance optimization'
      ]
    }
  ];

  const faqItems = [
    {
      question: 'How do I reset my password?',
      answer: 'Click on the "Forgot Password" link on the login page. Enter your email address and follow the instructions sent to your email to reset your password. The reset link will expire in 24 hours for security.'
    },
    {
      question: 'How can I update my personal information?',
      answer: 'Log into your account and go to "Profile Settings" to update your personal information, contact details, and preferences. All changes are saved automatically and reflected immediately.'
    },
    {
      question: 'What should I do if I can\'t book an appointment?',
      answer: 'If you\'re having trouble booking an appointment, please contact our support team at 1-800-MEDICARE or email us at support@medicare.com. We\'ll help you resolve the issue quickly.'
    },
    {
      question: 'How do I cancel or reschedule an appointment?',
      answer: 'You can cancel or reschedule appointments through your account dashboard under "My Appointments" or by calling our support line. Changes can be made up to 24 hours before the appointment.'
    },
    {
      question: 'Is my personal health information secure?',
      answer: 'Yes, we follow strict HIPAA guidelines and use industry-standard encryption to protect your personal health information. Your data is never shared with third parties without your explicit consent.'
    },
    {
      question: 'How do I report a technical issue?',
      answer: 'You can report technical issues through this feedback form, by calling our technical support line, or by emailing tech@medicare.com. Please include screenshots if possible.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and digital wallets including PayPal, Apple Pay, and Google Pay. We also support insurance payments and installment plans.'
    },
    {
      question: 'How do I access my medical records?',
      answer: 'You can access your medical records through your account dashboard under "Medical Records". You can view, download, and share your records with healthcare providers.'
    }
  ];

  const quickActions = [
    {
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: MessageSquare,
      color: 'blue',
      action: 'Start Chat'
    },
    {
      title: 'Knowledge Base',
      description: 'Browse our comprehensive help articles',
      icon: FileText,
      color: 'green',
      action: 'Browse Articles'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides and tutorials',
      icon: Video,
      color: 'purple',
      action: 'Watch Videos'
    },
    {
      title: 'Call Support',
      description: 'Speak directly with our support team',
      icon: Phone,
      color: 'orange',
      action: 'Call Now'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the support you need. We&apos;re here to help with any questions or concerns you may have.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">How can we help you?</h2>
            <p className="text-gray-600">Search our knowledge base or browse categories</p>
          </div>
          
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for help articles, guides, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 text-lg"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`w-12 h-12 bg-${action.color}-100 rounded-full flex items-center justify-center mb-4`}>
                  <action.icon className={`w-6 h-6 text-${action.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                <button className={`w-full py-2 px-4 bg-${action.color}-600 hover:bg-${action.color}-700 text-white rounded-lg font-semibold transition-colors`}>
                  {action.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Helpline Numbers */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Contact Numbers</h2>
                  <p className="text-gray-600">Get in touch with our support team</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {helplineNumbers.map((helpline, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 bg-${helpline.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                        <helpline.icon className={`w-5 h-5 text-${helpline.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg">{helpline.name}</h3>
                        <p className="text-2xl font-bold text-blue-600">{helpline.number}</p>
                        <p className="text-gray-600 text-sm mb-1">{helpline.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{helpline.hours}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Contact */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Email Support</h3>
                  <p className="text-blue-100">Get help via email</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold">support@medicare.com</p>
                <p className="text-blue-100">General inquiries and support</p>
                <div className="flex items-center gap-2 text-sm text-blue-200">
                  <Clock className="w-4 h-4" />
                  <span>Response time: Within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Support Categories */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Help Categories</h3>
              <div className="space-y-4">
                {supportCategories.map((category, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 bg-${category.color}-100 rounded-full flex items-center justify-center`}>
                        <category.icon className={`w-4 h-4 text-${category.color}-600`} />
                      </div>
                      <h4 className="font-semibold text-gray-900">{category.title}</h4>
                    </div>
                    <ul className="space-y-1 ml-11">
                      {category.articles.map((article, articleIndex) => (
                        <li key={articleIndex} className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                          {article}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Send Feedback</h2>
                <p className="text-gray-600">We&apos;d love to hear from you</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">
              Have a question, suggestion, or complaint? We&apos;re here to help and improve our services.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
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
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Please describe your question, feedback, or concern..."
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Find answers to common questions</p>
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

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Support Statistics</h2>
            <p className="text-blue-100">We&apos;re committed to providing excellent support</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">2hrs</div>
              <div className="text-blue-100">Average Response</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">10k+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 