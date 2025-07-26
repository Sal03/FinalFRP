import React from 'react';
import FuelRouteApp from './FuelRouteApp';
import { ModernHeader, HeroSection, StatsSection, SolutionsSection, CTASection, ModernFooter } from './ModernLandingPage';
import { FuelTypesShowcase, TrustIndicators, PortNetworkVisualization } from './FuelTransportComponents';

const HomePageNew = ({ backendAPI, apiStatus }) => {
  return (
    <div className="min-h-screen">
      <ModernHeader />
      <HeroSection />
      <StatsSection />
      <SolutionsSection />
      <FuelTypesShowcase />
      {/* Existing calculator component */}
      <section id="calculator">
        <FuelRouteApp backendAPI={backendAPI} apiStatus={apiStatus} />
      </section>
      <TrustIndicators />
      <PortNetworkVisualization />
      <CTASection />
      <ModernFooter />
    </div>
  );
};

export default HomePageNew;
