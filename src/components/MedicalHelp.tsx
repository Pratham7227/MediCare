'use client';

export default function MedicalHelp() {
  const emergencyContacts = [
    { service: 'Emergency Services', number: '911', icon: '🚨' },
    { service: 'Poison Control', number: '1-800-222-1222', icon: '☠️' },
    { service: 'Mental Health Crisis', number: '988', icon: '🧠' },
    { service: 'Medical Emergency', number: '911', icon: '🏥' }
  ];

  const quickHelp = [
    {
      title: 'First Aid for Cuts',
      steps: ['Clean hands', 'Stop bleeding with pressure', 'Clean wound', 'Apply bandage'],
      icon: '🩹'
    },
    {
      title: 'Fever Management',
      steps: ['Stay hydrated', 'Rest', 'Take fever reducer if needed', 'Monitor temperature'],
      icon: '🌡️'
    },
    {
      title: 'Choking Emergency',
      steps: ['Call 911', 'Perform Heimlich maneuver', 'Back blows if needed', 'Continue until help arrives'],
      icon: '🫁'
    },
    {
      title: 'Allergic Reaction',
      steps: ['Remove trigger', 'Use antihistamine', 'Call 911 if severe', 'Use EpiPen if available'],
      icon: '⚠️'
    }
  ];

  const commonMedicines = [
    { name: 'Ibuprofen', use: 'Pain relief, fever reduction', dosage: '200-400mg every 4-6 hours' },
    { name: 'Acetaminophen', use: 'Pain relief, fever reduction', dosage: '500-1000mg every 4-6 hours' },
    { name: 'Antihistamine', use: 'Allergies, itching', dosage: 'Follow package instructions' },
    { name: 'Antacid', use: 'Heartburn, indigestion', dosage: 'As needed, follow package' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Search Bar */}
      <div className="bg-white shadow-sm p-4 sticky top-0 z-40">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search medical help..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Emergency Contacts */}
        <section>
          <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
            🚨 Emergency Contacts
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-red-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{contact.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">{contact.service}</h3>
                      <p className="text-lg font-bold text-red-600">{contact.number}</p>
                    </div>
                  </div>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                    Call
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Help Guide */}
        <section>
          <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
            🆘 Quick Help Guide
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {quickHelp.map((help, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{help.icon}</span>
                  <h3 className="font-semibold text-lg text-gray-800">{help.title}</h3>
                </div>
                <ol className="list-decimal list-inside space-y-1">
                  {help.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-gray-600">{step}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* Common Medicines */}
        <section>
          <h2 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
            💊 Common Medicines
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {commonMedicines.map((medicine, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{medicine.name}</h3>
                <p className="text-gray-600 mb-1"><strong>Use:</strong> {medicine.use}</p>
                <p className="text-gray-600"><strong>Dosage:</strong> {medicine.dosage}</p>
                <p className="text-xs text-red-500 mt-2">⚠️ Always consult a healthcare provider before taking any medication</p>
              </div>
            ))}
          </div>
        </section>

        {/* When to Seek Help */}
        <section>
          <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-2">
            🏥 When to Seek Immediate Help
          </h2>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-red-500">•</span>
                Difficulty breathing or shortness of breath
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-red-500">•</span>
                Chest pain or pressure
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-red-500">•</span>
                Severe bleeding that won&apos;t stop
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-red-500">•</span>
                Loss of consciousness
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-red-500">•</span>
                Severe allergic reaction
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-red-500">•</span>
                Signs of stroke (FAST: Face, Arms, Speech, Time)
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
