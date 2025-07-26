import HomePageNew from './components/HomePageNew';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import HowItWorks from './components/HowItWorks';
import Subscription from './components/Subscription';
import Support from './components/Support';
import Help from './components/Help';
import './App.css';

// API Service - Backend Integration
const API_BASE_URL = 'http://localhost:5001/api';

const makeRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// API functions
const checkApiHealth = () => makeRequest('/health');
const getFuelTypes = () => makeRequest('/fuel-types');
const getRouteHistory = () => makeRequest('/routes');
const calculateRouteCost = (routeData) => makeRequest('/calculate-cost', {
  method: 'POST',
  body: JSON.stringify(routeData),
});

function App() {
  // Backend integration state
  const [apiStatus, setApiStatus] = useState('checking');
  const [fuelTypes, setFuelTypes] = useState(['hydrogen', 'methanol', 'ammonia']);
  const [routeHistory, setRouteHistory] = useState([]);

  useEffect(() => {
    // Backend initialization
    const initializeBackend = async () => {
      try {
        // Check API health
        await checkApiHealth();
        setApiStatus('connected');
        console.log('✅ Backend connected successfully');

        // Load fuel types
        try {
          const fuelTypesResponse = await getFuelTypes();
          setFuelTypes(fuelTypesResponse.data || ['hydrogen', 'methanol', 'ammonia']);
        } catch (error) {
          console.warn('Using default fuel types:', error.message);
        }

        // Load route history
        try {
          const historyResponse = await getRouteHistory();
          setRouteHistory(historyResponse.data || []);
        } catch (error) {
          console.warn('Could not load route history:', error.message);
        }

      } catch (error) {
        console.error('Backend connection failed:', error);
        setApiStatus('error');
      }
    };

    // Smooth scrolling for navigation links
    const handleSmoothScroll = (e) => {
      if (e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Hide header-top on scroll down
    let lastScrollY = window.scrollY;
    const headerTop = document.querySelector('.header-top');
    const header = document.querySelector('.header');

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        if (headerTop) headerTop.style.transform = 'translateY(-100%)';
        if (header) header.style.top = '0';
      } else {
        if (headerTop) headerTop.style.transform = 'translateY(0)';
        if (header) header.style.top = '40px';
      }
      
      lastScrollY = currentScrollY;
    };

    // Initialize everything
    initializeBackend();
    document.addEventListener('click', handleSmoothScroll);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Backend integration functions to pass to FuelRouteApp
  const backendAPI = {
    calculateCost: calculateRouteCost,
    isConnected: apiStatus === 'connected',
    fuelTypes,
    routeHistory,
    refreshHistory: async () => {
      try {
        const historyResponse = await getRouteHistory();
        setRouteHistory(historyResponse.data || []);
      } catch (error) {
        console.warn('Could not refresh route history:', error.message);
      }
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/support" element={<Support />} />
        <Route path="/help" element={<Help />} />
        <Route path="/subscribe" element={<Subscription />} />
        <Route path="/" element={<HomePageNew backendAPI={backendAPI} apiStatus={apiStatus} />} />
      </Routes>
    </Router>
  );
}

export default App;