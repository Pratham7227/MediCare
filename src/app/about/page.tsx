'use client';

import { Heart, Lightbulb, Shield, Globe, Users, Award, Star, MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin, ArrowRight, CheckCircle, Zap, Target } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      bio: 'Board-certified cardiologist with 20+ years of experience in healthcare technology and patient care. Leading our medical strategy and ensuring the highest standards of care.',
      image: '/doctor-placeholder.png',
      experience: '20+ Years',
      specialization: 'Cardiology',
      achievements: ['Board Certified', 'Healthcare Innovation Award', 'Patient Safety Leader']
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      bio: 'Technology leader with expertise in healthcare systems and digital transformation. Driving innovation in medical technology and platform development.',
      image: '/doctor-placeholder.png',
      experience: '15+ Years',
      specialization: 'Healthcare Tech',
      achievements: ['Tech Innovation Award', 'Digital Health Expert', 'Platform Architect']
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Patient Experience',
      bio: 'Dedicated to improving patient outcomes through innovative healthcare solutions. Passionate about creating seamless patient journeys.',
      image: '/doctor-placeholder.png',
      experience: '12+ Years',
      specialization: 'Patient Care',
      achievements: ['Patient Experience Award', 'Care Quality Leader', 'Innovation Champion']
    },
    {
      name: 'Dr. James Wilson',
      role: 'Medical Director',
      bio: 'Experienced physician leading our medical team and ensuring quality care standards. Committed to evidence-based medicine and patient safety.',
      image: '/doctor-placeholder.png',
      experience: '18+ Years',
      specialization: 'Internal Medicine',
      achievements: ['Medical Excellence Award', 'Quality Assurance Leader', 'Clinical Research']
    }
  ];

  const values = [
    {
      title: 'Patient-Centered Care',
      description: 'Every decision we make is guided by what\'s best for our patients. We prioritize their health, comfort, and well-being above all else.',
      icon: Heart,
      color: 'red',
      features: ['Personalized Care Plans', '24/7 Patient Support', 'Quality Assurance']
    },
    {
      title: 'Innovation',
      description: 'Continuously improving our platform with cutting-edge technology to provide the best healthcare experience possible.',
      icon: Lightbulb,
      color: 'yellow',
      features: ['AI-Powered Diagnostics', 'Telemedicine Solutions', 'Smart Health Monitoring']
    },
    {
      title: 'Trust & Security',
      description: 'Protecting your health information with the highest security standards and maintaining complete confidentiality.',
      icon: Shield,
      color: 'blue',
      features: ['HIPAA Compliant', 'End-to-End Encryption', 'Regular Security Audits']
    },
    {
      title: 'Accessibility',
      description: 'Making healthcare accessible to everyone, everywhere, regardless of location, income, or background.',
      icon: Globe,
      color: 'green',
      features: ['Multi-Language Support', 'Mobile-First Design', 'Universal Access']
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Platform Launch',
      description: 'Launched our comprehensive healthcare platform with basic features'
    },
    {
      year: '2021',
      title: '10,000 Patients',
      description: 'Reached our first major milestone of serving 10,000 patients'
    },
    {
      year: '2022',
      title: 'AI Integration',
      description: 'Integrated AI-powered diagnostics and smart health monitoring'
    },
    {
      year: '2023',
      title: '50,000+ Patients',
      description: 'Expanded to serve over 50,000 patients across multiple regions'
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'Launched services in multiple countries with localized support'
    }
  ];

  const achievements = [
    {
      number: '50,000+',
      label: 'Patients Served',
      icon: Users,
      color: 'blue'
    },
    {
      number: '500+',
      label: 'Healthcare Providers',
      icon: Award,
      color: 'green'
    },
    {
      number: '24/7',
      label: 'Emergency Support',
      icon: Zap,
      color: 'red'
    },
    {
      number: '99.9%',
      label: 'Uptime',
      icon: Star,
      color: 'yellow'
    },
    {
      number: '15+',
      label: 'Countries',
      icon: Globe,
      color: 'purple'
    },
    {
      number: '100%',
      label: 'HIPAA Compliant',
      icon: Shield,
      color: 'blue'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">MediCare</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Were revolutionizing healthcare by connecting patients with trusted medical professionals 
            and providing comprehensive health information in one accessible platform. Our mission is 
            to make quality healthcare available to everyone, everywhere.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl p-12 mb-16 border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
            To democratize healthcare access by providing a comprehensive digital platform that connects 
            patients with qualified healthcare providers, offers reliable medical information, and ensures 
            emergency services are always within reach. We believe everyone deserves quality healthcare 
            regardless of their location or circumstances.
          </p>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape our commitment to excellence in healthcare
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`w-16 h-16 bg-${value.color}-100 rounded-full flex items-center justify-center mb-6`}>
                  <value.icon className={`w-8 h-8 text-${value.color}-600`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{value.description}</p>
                <ul className="space-y-2">
                  {value.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals who are driving innovation in healthcare
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {member.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {member.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {member.specialization}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">{member.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {member.achievements.map((achievement, achievementIndex) => (
                    <span key={achievementIndex} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Numbers that reflect our commitment to transforming healthcare
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`w-16 h-16 bg-${achievement.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <achievement.icon className={`w-8 h-8 text-${achievement.color}-600`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.number}</div>
                <div className="text-gray-600 font-medium">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Key milestones in our mission to revolutionize healthcare
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-200 h-full"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 px-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="w-1/2 px-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact & Social Section */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Contact Us</h3>
                <p className="text-gray-600">Get in touch with our team</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                  <p className="text-gray-600">123 Healthcare Avenue<br />Medical District, MD 12345</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                  <p className="text-gray-600">1-800-MEDICARE</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-600">info@medicare.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                  <p className="text-gray-600">Monday - Friday: 8 AM - 8 PM EST<br />Saturday: 9 AM - 5 PM EST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Follow Us</h3>
                <p className="text-gray-600">Stay connected with us</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Facebook className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Facebook</div>
                  <div className="text-gray-600">@MediCareOfficial</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                  <Twitter className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Twitter</div>
                  <div className="text-gray-600">@MediCareHealth</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Instagram</div>
                  <div className="text-gray-600">@MediCareHealth</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                  <Linkedin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">LinkedIn</div>
                  <div className="text-gray-600">MediCare Health</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 