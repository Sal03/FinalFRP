import React, { useState } from 'react';

// Fuel Types Showcase Component
export const FuelTypesShowcase = () => {
  const [activeFuel, setActiveFuel] = useState('hydrogen');
  
  const fuels = {
    hydrogen: {
      formula: 'H₂',
      name: 'Hydrogen',
      color: 'from-blue-500 to-blue-700',
      description: 'Clean-burning fuel with zero emissions',
      specs: [
        'Storage: -253°C (cryogenic)',
        'Density: 0.0899 kg/m³',
        'Energy: 120-142 MJ/kg',
        'Applications: Heavy transport, maritime, aviation'
      ],
      challenges: ['Cryogenic storage', 'Pressure management', 'Leak detection'],
      icon: '❄️'
    },
    methanol: {
      formula: 'CH₃OH',
      name: 'Methanol',
      color: 'from-orange-500 to-orange-700',
      description: 'Liquid fuel with existing infrastructure compatibility',
      specs: [
        'Storage: Ambient temperature',
        'Density: 792 kg/m³',
        'Energy: 19.9 MJ/kg',
        'Applications: Maritime, industrial, power generation'
      ],
      challenges: ['Chemical handling', 'Fire suppression', 'Vapor control'],
      icon: '🔥'
    },
    ammonia: {
      formula: 'NH₃',
      name: 'Ammonia',
      color: 'from-purple-500 to-purple-700',
      description: 'High energy density with established transport networks',
      specs: [
        'Storage: -33°C or pressurized',
        'Density: 682 kg/m³',
        'Energy: 18.6 MJ/kg',
        'Applications: Maritime, power generation, fertilizer'
      ],
      challenges: ['Refrigeration', 'Toxicity monitoring', 'Specialized ventilation'],
      icon: '⚗️'
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Alternative Fuel Transportation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Specialized logistics solutions for next-generation clean fuels
          </p>
        </div>

        {/* Fuel Type Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            {Object.entries(fuels).map(([key, fuel]) => (
              <button
                key={key}
                onClick={() => setActiveFuel(key)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeFuel === key
                    ? `bg-gradient-to-r ${fuel.color} text-white shadow-lg`
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{fuel.icon}</span>
                {fuel.formula}
              </button>
            ))}
          </div>
        </div>

        {/* Active Fuel Details */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${fuels[activeFuel].color} text-white text-3xl font-bold mb-4`}>
                {fuels[activeFuel].formula}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {fuels[activeFuel].name}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {fuels[activeFuel].description}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Technical Specifications</h4>
                <ul className="space-y-2">
                  {fuels[activeFuel].specs.map((spec, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${fuels[activeFuel].color} mr-3`}></div>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Transport Challenges</h4>
                <div className="flex flex-wrap gap-2">
                  {fuels[activeFuel].challenges.map((challenge, index) => (
                    <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      {challenge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className={`bg-gradient-to-br ${fuels[activeFuel].color} rounded-3xl p-8 text-white relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10">
                <div className="text-6xl mb-4">{fuels[activeFuel].icon}</div>
                <h4 className="text-2xl font-bold mb-4">Why Choose {fuels[activeFuel].name}?</h4>
                <p className="text-white/90 leading-relaxed">
                  Our AI-powered platform specializes in {fuels[activeFuel].name.toLowerCase()} transportation, 
                  accounting for all safety requirements, storage needs, and regulatory compliance to deliver 
                  accurate cost estimates.
                </p>
                
                <button className="mt-6 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-all">
                  Calculate {fuels[activeFuel].name} Costs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Interactive Calculator Preview Component
export const CalculatorPreview = () => {
  const [formData, setFormData] = useState({
    fuelType: 'hydrogen',
    volume: '10',
    origin: 'Los Angeles, CA',
    destination: 'Seattle, WA',
    mode: 'truck'
  });

  const [showResult, setShowResult] = useState(false);

  const handleCalculate = () => {
    setShowResult(true);
    setTimeout(() => setShowResult(false), 5000);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Try Our AI Calculator
          </h2>
          <p className="text-xl text-gray-600">
            Get instant cost estimates for your fuel transportation needs
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form Side */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Calculate Transportation Costs
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fuel Type
                    </label>
                    <select 
                      value={formData.fuelType}
                      onChange={(e) => setFormData({...formData, fuelType: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="hydrogen">Hydrogen (H₂)</option>
                      <option value="methanol">Methanol (CH₃OH)</option>
                      <option value="ammonia">Ammonia (NH₃)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Volume (tonnes)
                      </label>
                      <input
                        type="number"
                        value={formData.volume}
                        onChange={(e) => setFormData({...formData, volume: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Transport Mode
                      </label>
                      <select 
                        value={formData.mode}
                        onChange={(e) => setFormData({...formData, mode: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="truck">Truck</option>
                        <option value="rail">Rail</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Route
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={formData.origin}
                        onChange={(e) => setFormData({...formData, origin: e.target.value})}
                        placeholder="Origin"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={formData.destination}
                        onChange={(e) => setFormData({...formData, destination: e.target.value})}
                        placeholder="Destination"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleCalculate}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
                  >
                    Calculate with AI
                  </button>
                </div>
              </div>

              {/* Result Side */}
              <div className="flex items-center justify-center">
                {showResult ? (
                  <div className="bg-white rounded-2xl p-8 shadow-xl w-full">
                    <div className="text-center">
                      <div className="text-4xl mb-4">🎯</div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-4">
                        Cost Estimate
                      </h4>
                      <div className="text-3xl font-bold text-green-600 mb-4">
                        $15,420
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Base Transport:</span>
                          <span>$12,800</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Handling Fees:</span>
                          <span>$1,620</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Insurance:</span>
                          <span>$1,000</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-4">
                        ✅ AI-Enhanced • 95% Confidence
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-4">🧮</div>
                    <p className="text-lg">Enter your details and click calculate to see AI-powered cost estimates</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Trust Indicators Component
export const TrustIndicators = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">
            Trusted by Industry Leaders
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
          {/* Mock company logos - replace with actual logos */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-gray-400">MAERSK</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-gray-400">SHELL</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-gray-400">BP</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-gray-400">TOTAL</div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Enterprise Security</h3>
            <p className="text-gray-600 text-sm">Bank-level encryption and data protection</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Compliance Ready</h3>
            <p className="text-gray-600 text-sm">DOT and international regulations included</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📞</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-sm">Expert assistance when you need it</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Port Network Visualization Component
export const PortNetworkVisualization = () => {
  const ports = [
    { name: 'Los Angeles', region: 'West Coast', connections: 15, color: 'bg-blue-500' },
    { name: 'Houston', region: 'Gulf Coast', connections: 18, color: 'bg-green-500' },
    { name: 'New York/NJ', region: 'East Coast', connections: 12, color: 'bg-purple-500' },
    { name: 'Seattle', region: 'West Coast', connections: 10, color: 'bg-blue-500' },
    { name: 'Miami', region: 'Southeast', connections: 8, color: 'bg-orange-500' },
    { name: 'Chicago', region: 'Midwest', connections: 14, color: 'bg-red-500' }
  ];

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Connected Port Network
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access 20+ major US ports and transportation hubs with optimized routing algorithms
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              {ports.map((port, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg backdrop-blur">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${port.color}`}></div>
                    <div>
                      <div className="font-semibold">{port.name}</div>
                      <div className="text-sm text-gray-400">{port.region}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{port.connections}</div>
                    <div className="text-sm text-gray-400">connections</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl p-8 backdrop-blur">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`h-16 rounded-lg bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center ${i === 4 ? 'scale-110 bg-gradient-to-br from-orange-500/50 to-red-500/50' : ''}`}>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">20+</div>
                <div className="text-sm text-gray-300">Major Transportation Hubs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Component
export const FuelTransportApp = () => {
  return (
    <div className="min-h-screen">
      <FuelTypesShowcase />
      <CalculatorPreview />
      <TrustIndicators />
      <PortNetworkVisualization />
    </div>
  );
};

export default FuelTransportApp;
