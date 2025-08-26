'use client';

import { useState, useEffect } from 'react';
import { Search, Pill, AlertTriangle, Info, Clock, Shield, Heart, Brain, Activity, Zap, Filter, ChevronDown, X, BookOpen, Users, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Drug interface
interface Drug {
  id: number;
  name: string;
  genericName: string;
  category: string;
  usage: string;
  sideEffects: string;
  contraindications: string;
  warnings: string;
  dosage: string;
  interactions: string;
  pregnancyCategory: string;
  breastfeeding: string;
  storage: string;
  manufacturer: string;
  prescriptionRequired: boolean;
  rating: number;
  reviews: number;
}

// Enhanced mock drug data
const mockDrugs = [
  {
    id: 1,
    name: 'Aspirin',
    genericName: 'Acetylsalicylic Acid',
    category: 'Pain Relief',
    usage: 'Pain relief, fever reduction, blood thinning',
    sideEffects: 'Stomach upset, bleeding risk, allergic reactions, ringing in ears',
    contraindications: 'Peptic ulcers, bleeding disorders, pregnancy (third trimester), asthma',
    warnings: 'May cause stomach bleeding, avoid alcohol, consult doctor if pregnant, take with food',
    dosage: '325-650mg every 4-6 hours as needed',
    interactions: 'Blood thinners, alcohol, other NSAIDs',
    pregnancyCategory: 'C',
    breastfeeding: 'Consult doctor',
    storage: 'Store at room temperature, keep dry',
    manufacturer: 'Bayer Healthcare',
    prescriptionRequired: false,
    rating: 4.5,
    reviews: 1250
  },
  {
    id: 2,
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    category: 'Pain Relief',
    usage: 'Pain relief, inflammation reduction, fever reduction',
    sideEffects: 'Stomach irritation, dizziness, increased blood pressure, kidney problems',
    contraindications: 'Stomach ulcers, kidney disease, heart failure, pregnancy (third trimester)',
    warnings: 'Take with food, avoid long-term use, monitor blood pressure, stay hydrated',
    dosage: '200-400mg every 4-6 hours as needed',
    interactions: 'Blood pressure medications, diuretics, lithium',
    pregnancyCategory: 'C',
    breastfeeding: 'Generally safe',
    storage: 'Store at room temperature',
    manufacturer: 'Advil, Motrin',
    prescriptionRequired: false,
    rating: 4.3,
    reviews: 890
  },
  {
    id: 3,
    name: 'Acetaminophen',
    genericName: 'Paracetamol',
    category: 'Pain Relief',
    usage: 'Pain relief, fever reduction',
    sideEffects: 'Liver damage (high doses), allergic reactions, skin rash',
    contraindications: 'Liver disease, alcohol abuse, severe liver impairment',
    warnings: 'Do not exceed recommended dose, avoid alcohol, check other medications',
    dosage: '500-1000mg every 4-6 hours as needed',
    interactions: 'Alcohol, warfarin, other liver-metabolized drugs',
    pregnancyCategory: 'B',
    breastfeeding: 'Generally safe',
    storage: 'Store at room temperature',
    manufacturer: 'Tylenol',
    prescriptionRequired: false,
    rating: 4.7,
    reviews: 2100
  },
  {
    id: 4,
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    category: 'Blood Pressure',
    usage: 'High blood pressure, heart failure treatment',
    sideEffects: 'Dry cough, dizziness, low blood pressure, fatigue',
    contraindications: 'Pregnancy, angioedema history, kidney disease, bilateral renal artery stenosis',
    warnings: 'Monitor blood pressure, avoid pregnancy, regular kidney function tests',
    dosage: '10-40mg once daily',
    interactions: 'Diuretics, lithium, NSAIDs, potassium supplements',
    pregnancyCategory: 'D',
    breastfeeding: 'Consult doctor',
    storage: 'Store at room temperature',
    manufacturer: 'AstraZeneca',
    prescriptionRequired: true,
    rating: 4.2,
    reviews: 567
  },
  {
    id: 5,
    name: 'Metformin',
    genericName: 'Metformin Hydrochloride',
    category: 'Diabetes',
    usage: 'Type 2 diabetes management',
    sideEffects: 'Nausea, diarrhea, stomach upset, lactic acidosis (rare)',
    contraindications: 'Severe kidney disease, heart failure, alcohol abuse, metabolic acidosis',
    warnings: 'Take with meals, monitor blood sugar, avoid excessive alcohol',
    dosage: '500-2550mg daily in divided doses',
    interactions: 'Alcohol, iodinated contrast media, other diabetes medications',
    pregnancyCategory: 'B',
    breastfeeding: 'Generally safe',
    storage: 'Store at room temperature',
    manufacturer: 'Merck',
    prescriptionRequired: true,
    rating: 4.4,
    reviews: 789
  },
  {
    id: 6,
    name: 'Atorvastatin',
    genericName: 'Atorvastatin Calcium',
    category: 'Cholesterol',
    usage: 'Cholesterol reduction, heart disease prevention',
    sideEffects: 'Muscle pain, liver problems, digestive issues, memory problems',
    contraindications: 'Liver disease, pregnancy, breastfeeding, active liver disease',
    warnings: 'Regular liver function tests, report muscle pain, avoid grapefruit',
    dosage: '10-80mg once daily',
    interactions: 'Grapefruit juice, other statins, certain antibiotics',
    pregnancyCategory: 'X',
    breastfeeding: 'Not recommended',
    storage: 'Store at room temperature',
    manufacturer: 'Pfizer',
    prescriptionRequired: true,
    rating: 4.1,
    reviews: 432
  },
  {
    id: 7,
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    category: 'Gastrointestinal',
    usage: 'Acid reflux, stomach ulcers, GERD treatment',
    sideEffects: 'Headache, diarrhea, stomach pain, vitamin B12 deficiency',
    contraindications: 'Pregnancy (first trimester), hypersensitivity, liver disease',
    warnings: 'Long-term use may increase fracture risk, monitor magnesium levels',
    dosage: '20-40mg once daily',
    interactions: 'Iron supplements, vitamin B12, certain antifungal medications',
    pregnancyCategory: 'C',
    breastfeeding: 'Generally safe',
    storage: 'Store at room temperature',
    manufacturer: 'AstraZeneca',
    prescriptionRequired: false,
    rating: 4.6,
    reviews: 1567
  },
  {
    id: 8,
    name: 'Cetirizine',
    genericName: 'Cetirizine Hydrochloride',
    category: 'Allergy',
    usage: 'Allergic rhinitis, hives, seasonal allergies',
    sideEffects: 'Drowsiness, dry mouth, headache, fatigue',
    contraindications: 'Severe kidney disease, hypersensitivity to cetirizine',
    warnings: 'May cause drowsiness, avoid alcohol, use caution when driving',
    dosage: '10mg once daily',
    interactions: 'Alcohol, other sedating medications',
    pregnancyCategory: 'B',
    breastfeeding: 'Generally safe',
    storage: 'Store at room temperature',
    manufacturer: 'Zyrtec',
    prescriptionRequired: false,
    rating: 4.8,
    reviews: 2340
  }
];

const categories = [
  { id: 'all', name: 'All Categories', icon: Pill, color: 'blue' },
  { id: 'pain-relief', name: 'Pain Relief', icon: Zap, color: 'red' },
  { id: 'blood-pressure', name: 'Blood Pressure', icon: Heart, color: 'pink' },
  { id: 'diabetes', name: 'Diabetes', icon: Activity, color: 'green' },
  { id: 'cholesterol', name: 'Cholesterol', icon: Shield, color: 'purple' },
  { id: 'gastrointestinal', name: 'Gastrointestinal', icon: Brain, color: 'orange' },
  { id: 'allergy', name: 'Allergy', icon: AlertTriangle, color: 'yellow' }
];

export default function DrugsInfoPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredDrugs, setFilteredDrugs] = useState(mockDrugs);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [sortBy, setSortBy] = useState('name');

  // Filter and sort drugs
  useEffect(() => {
    let filtered = mockDrugs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(drug =>
        drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.usage.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(drug => {
        const drugCategory = drug.category.toLowerCase().replace(/\s+/g, '-');
        return drugCategory === selectedCategory;
      });
    }

    // Sort drugs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredDrugs(filtered);
  }, [searchTerm, selectedCategory, sortBy]);

  const handleDrugClick = (drug: Drug) => {
    setSelectedDrug(drug);
  };

  const closeModal = () => {
    setSelectedDrug(null);
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : Pill;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : 'blue';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Drug Information Database
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive information about medications, their uses, side effects, and safety guidelines. Always consult healthcare professionals before use.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          {/* Main Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for medications by name, generic name, or usage..."
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
            
            {selectedCategory !== 'all' && (
              <span className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                <Pill size={14} />
                {categories.find(cat => cat.id === selectedCategory)?.name}
                <button onClick={() => setSelectedCategory('all')} className="ml-1">
                  <X size={14} />
                </button>
              </span>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid md:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Name</option>
                  <option value="rating">Rating</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prescription Required</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All</option>
                  <option value="true">Prescription Only</option>
                  <option value="false">Over the Counter</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Results Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Drug Information ({filteredDrugs.length} results)
            </h2>
            <div className="text-sm text-gray-600">
              Showing {filteredDrugs.length} of {mockDrugs.length} medications
            </div>
          </div>
          
          {filteredDrugs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-gray-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No medications found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or browse all categories.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDrugs.map((drug) => (
                <div key={drug.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Drug Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      💊
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{drug.name}</h3>
                      <p className="text-blue-600 font-semibold">{drug.genericName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-semibold text-gray-700">{drug.rating}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{drug.reviews} reviews</span>
                      </div>
                    </div>
                  </div>

                  {/* Drug Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Pill className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold">{drug.category}</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      <span className="font-semibold text-green-700">Usage:</span> {drug.usage}
                    </div>
                    <div className="text-sm text-gray-700">
                      <span className="font-semibold text-orange-700">Dosage:</span> {drug.dosage}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      {drug.prescriptionRequired ? (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                          Prescription Required
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          Over the Counter
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDrugClick(drug)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                    >
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-yellow-800 mb-2">⚠️ Important Disclaimer</h3>
              <p className="text-yellow-800 mb-2">
                This information is for educational purposes only and should not replace professional medical advice.
              </p>
              <p className="text-yellow-800">
                Always consult with a healthcare provider before taking any medication, and follow the prescribed dosage and instructions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Drug Details Modal */}
      {selectedDrug && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Drug Information</h2>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-start gap-6 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center text-white font-bold text-2xl">
                  💊
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedDrug.name}</h3>
                  <p className="text-blue-600 font-semibold text-lg">{selectedDrug.genericName}</p>
                  <p className="text-gray-600">{selectedDrug.manufacturer}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{selectedDrug.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span>{selectedDrug.reviews} reviews</span>
                    <span className="text-gray-400">•</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      {selectedDrug.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Usage & Dosage</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>
                      <span className="font-semibold text-green-700">Usage:</span> {selectedDrug.usage}
                    </div>
                    <div>
                      <span className="font-semibold text-blue-700">Dosage:</span> {selectedDrug.dosage}
                    </div>
                    <div>
                      <span className="font-semibold text-purple-700">Storage:</span> {selectedDrug.storage}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Safety Information</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>
                      <span className="font-semibold text-red-700">Pregnancy Category:</span> {selectedDrug.pregnancyCategory}
                    </div>
                    <div>
                      <span className="font-semibold text-orange-700">Breastfeeding:</span> {selectedDrug.breastfeeding}
                    </div>
                    <div>
                      <span className="font-semibold text-yellow-700">Prescription Required:</span> {selectedDrug.prescriptionRequired ? 'Yes' : 'No'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Side Effects</h4>
                  <p className="text-sm text-gray-700">{selectedDrug.sideEffects}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Contraindications</h4>
                  <p className="text-sm text-gray-700">{selectedDrug.contraindications}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Warnings</h4>
                  <p className="text-sm text-gray-700">{selectedDrug.warnings}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Drug Interactions</h4>
                  <p className="text-sm text-gray-700">{selectedDrug.interactions}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                  Consult Doctor
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Save Information
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