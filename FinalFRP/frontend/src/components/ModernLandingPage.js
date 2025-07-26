import React, { useState, useEffect } from 'react';

// Modern Header Component
export const ModernHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <div>
            <h1 className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              FuelRoute Pro
            </h1>
            <p className={`text-xs ${isScrolled ? 'text-gray-600' : 'text-blue-100'}`}>
              By THAMPICO
            </p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#solutions" className={`font-medium transition-colors ${
            isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
          }`}>
            Solutions
          </a>
          <a href="#pricing" className={`font-medium transition-colors ${
            isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
          }`}>
            Pricing
          </a>
          <a href="#about" className={`font-medium transition-colors ${
            isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
          }`}>
            About
          </a>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
};

// Hero Section Component
export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            The Future of
            <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              {' '}Alternative Fuel{' '}
            </span>
            Transportation
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            AI-powered cost estimation for hydrogen, methanol, and ammonia logistics. 
            Optimize routes, reduce costs, and accelerate the clean energy transition.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all">
              Watch Demo
            </button>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-blue-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>20+ US Ports & Hubs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>AI-Enhanced Calculations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Multi-Modal Transport</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Stats Section Component
export const StatsSection = () => {
  const stats = [
    { value: '95%', label: 'Cost Accuracy', description: 'AI-powered calculations' },
    { value: '20+', label: 'Major Ports', description: 'US transportation hubs' },
    { value: '3', label: 'Fuel Types', description: 'H₂, CH₃OH, NH₃' },
    { value: '24/7', label: 'Support', description: 'Expert assistance' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform delivers precise cost calculations for alternative fuel transportation
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 group-hover:shadow-lg transition-all">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Solutions Section Component
export const SolutionsSection = () => {
  const solutions = [
    {
      icon: '🧮',
      title: 'AI Cost Calculator',
      description: 'Get precise transportation costs with our AI-enhanced calculation engine powered by OpenAI.',
      features: ['Real-time pricing', 'Multi-modal routes', 'Risk assessment']
    },
    {
      icon: '🗺️',
      title: 'Route Optimization',
      description: 'Optimize your fuel transportation routes across 20+ major US ports and transportation hubs.',
      features: ['Interactive mapping', 'Distance optimization', 'Hub recommendations']
    },
    {
      icon: '📊',
      title: 'Market Intelligence',
      description: 'Access real-time market data and insights for hydrogen, methanol, and ammonia markets.',
      features: ['Price monitoring', 'Trend analysis', 'Risk indicators']
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Complete Alternative Fuel Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to plan, optimize, and execute alternative fuel transportation
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all group">
              <div className="text-4xl mb-4">{solution.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{solution.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{solution.description}</p>
              <ul className="space-y-2">
                {solution.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 text-blue-600 font-semibold group-hover:text-orange-500 transition-colors">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section Component
export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Optimize Your Fuel Transportation?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Join industry leaders using AI-powered cost calculations to make smarter transportation decisions
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all">
            Start Free Trial
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all">
            Schedule Demo
          </button>
        </div>
        
        <p className="text-blue-200 text-sm mt-6">
          No credit card required • 3 free calculations • Full access
        </p>
      </div>
    </section>
  );
};

// Footer Component
export const ModernFooter = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">FuelRoute Pro</h3>
                <p className="text-sm text-gray-400">By THAMPICO</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              AI-powered cost estimation for alternative fuel transportation. 
              Making clean energy logistics efficient and cost-effective.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                💼
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Email</span>
                📧
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Cost Calculator</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Route Optimization</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Market Intelligence</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Access</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 FuelRoute Pro by THAMPICO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
export const ModernTransportApp = () => {
  return (
    <div className="min-h-screen">
      <ModernHeader />
      <HeroSection />
      <StatsSection />
      <SolutionsSection />
      <CTASection />
      <ModernFooter />
    </div>
  );
};

export default ModernTransportApp;
