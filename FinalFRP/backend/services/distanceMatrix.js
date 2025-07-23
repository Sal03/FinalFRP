// backend/services/distanceMatrix.js - Real-world distances between 20 US ports/hubs

const DISTANCE_MATRIX = {
    // Format: 'Origin-Destination': { truck: miles, rail: miles, ship: miles, pipeline: miles }
    
    // Houston, TX connections
    'Houston, TX-New Orleans, LA': { truck: 350, rail: 350, ship: 351, pipeline: 340 },
    'Houston, TX-Mobile, AL': { truck: 335, rail: 367, ship: 350, pipeline: null },
    'Houston, TX-Tampa Bay, FL': { truck: 875, rail: 920, ship: 863, pipeline: null },
    'Houston, TX-Savannah, GA': { truck: 870, rail: 915, ship: null, pipeline: null },
    'Houston, TX-Jacksonville, FL': { truck: 825, rail: 890, ship: null, pipeline: null },
    'Houston, TX-Miami, FL': { truck: 1190, rail: 1250, ship: null, pipeline: null },
    'Houston, TX-New York/NJ': { truck: 1630, rail: 1720, ship: null, pipeline: null },
    'Houston, TX-Philadelphia, PA': { truck: 1555, rail: 1640, ship: null, pipeline: null },
    'Houston, TX-Norfolk, VA': { truck: 1420, rail: 1510, ship: null, pipeline: null },
    'Houston, TX-Boston, MA': { truck: 1770, rail: 1860, ship: null, pipeline: null },
    'Houston, TX-Long Beach, CA': { truck: 1545, rail: 1720, ship: 3200, pipeline: null },
    'Houston, TX-Los Angeles, CA': { truck: 1555, rail: 1546, ship: 3684, pipeline: null },
    'Houston, TX-Seattle, WA': { truck: 2350, rail: 2480, ship: 5100, pipeline: null },
    'Houston, TX-Portland, OR': { truck: 2180, rail: 2300, ship: 4950, pipeline: null },
    'Houston, TX-San Francisco/Oakland, CA': { truck: 1920, rail: 2050, ship: 3850, pipeline: null },
    'Houston, TX-Chicago, IL': { truck: 1080, rail: 1092, ship: null, pipeline: 925 },
    'Houston, TX-St. Louis, MO': { truck: 780, rail: 679, ship: null, pipeline: 679 },
    'Houston, TX-Memphis, TN': { truck: 570, rail: 520, ship: null, pipeline: null },
    'Houston, TX-Duluth-Superior, MN/WI': { truck: 1350, rail: 1200, ship: null, pipeline: null },
  
    // Los Angeles, CA connections  
    'Los Angeles, CA-Long Beach, CA': { truck: 25, rail: 25, ship: 23, pipeline: 25 },
    'Los Angeles, CA-San Francisco/Oakland, CA': { truck: 380, rail: 382, ship: 399, pipeline: 382 },
    'Los Angeles, CA-Seattle, WA': { truck: 1135, rail: 1377, ship: 1253, pipeline: null },
    'Los Angeles, CA-Portland, OR': { truck: 965, rail: 963, ship: 952, pipeline: null },
    'Los Angeles, CA-Houston, TX': { truck: 1555, rail: 1546, ship: 3684, pipeline: null },
    'Los Angeles, CA-New Orleans, LA': { truck: 1890, rail: 2090, ship: 3914, pipeline: null },
    'Los Angeles, CA-Chicago, IL': { truck: 2015, rail: 2256, ship: null, pipeline: null },
    'Los Angeles, CA-New York/NJ': { truck: 2790, rail: 2800, ship: 5200, pipeline: null },
    'Los Angeles, CA-Miami, FL': { truck: 2750, rail: 2900, ship: 3900, pipeline: null },
    'Los Angeles, CA-Boston, MA': { truck: 3000, rail: 3100, ship: 5500, pipeline: null },
  
    // Seattle, WA connections
    'Seattle, WA-Portland, OR': { truck: 170, rail: 186, ship: 334, pipeline: null },
    'Seattle, WA-San Francisco/Oakland, CA': { truck: 810, rail: 926, ship: 806, pipeline: null },
    'Seattle, WA-Long Beach, CA': { truck: 1160, rail: 1380, ship: 1130, pipeline: null },
    'Seattle, WA-Chicago, IL': { truck: 2065, rail: 2062, ship: null, pipeline: null },
    'Seattle, WA-New York/NJ': { truck: 2860, rail: 2852, ship: 5984, pipeline: null },
    'Seattle, WA-Houston, TX': { truck: 2350, rail: 2480, ship: 5100, pipeline: null },
  
    // New York/NJ connections
    'New York/NJ-Philadelphia, PA': { truck: 95, rail: 83, ship: 115, pipeline: null },
    'New York/NJ-Boston, MA': { truck: 215, rail: 231, ship: 334, pipeline: null },
    'New York/NJ-Norfolk, VA': { truck: 340, rail: 375, ship: 334, pipeline: null },
    'New York/NJ-Savannah, GA': { truck: 720, rail: 785, ship: 540, pipeline: null },
    'New York/NJ-Jacksonville, FL': { truck: 940, rail: 1020, ship: 760, pipeline: null },
    'New York/NJ-Miami, FL': { truck: 1280, rail: 1380, ship: 1100, pipeline: null },
    'New York/NJ-Chicago, IL': { truck: 790, rail: 790, ship: null, pipeline: null },
  
    // Chicago, IL connections
    'Chicago, IL-St. Louis, MO': { truck: 300, rail: 284, ship: null, pipeline: 300 },
    'Chicago, IL-Memphis, TN': { truck: 530, rail: 341, ship: null, pipeline: 530 },
    'Chicago, IL-Duluth-Superior, MN/WI': { truck: 350, rail: 465, ship: 495, pipeline: 350 },
    'Chicago, IL-Detroit, MI': { truck: 280, rail: 285, ship: null, pipeline: null },
  
    // Gulf Coast connections
    'New Orleans, LA-Mobile, AL': { truck: 145, rail: 150, ship: 150, pipeline: 145 },
    'New Orleans, LA-Tampa Bay, FL': { truck: 680, rail: 720, ship: 520, pipeline: null },
    'Mobile, AL-Tampa Bay, FL': { truck: 290, rail: 340, ship: 180, pipeline: null },
  
    // Southeast connections
    'Savannah, GA-Jacksonville, FL': { truck: 140, rail: 139, ship: 127, pipeline: null },
    'Jacksonville, FL-Miami, FL': { truck: 345, rail: 354, ship: 334, pipeline: null },
    'Tampa Bay, FL-Miami, FL': { truck: 280, rail: 281, ship: 250, pipeline: null },
  
    // Northeast connections
    'Philadelphia, PA-Norfolk, VA': { truck: 300, rail: 295, ship: 285, pipeline: null },
    'Norfolk, VA-Savannah, GA': { truck: 375, rail: 419, ship: 368, pipeline: null },
    'Boston, MA-Philadelphia, PA': { truck: 314, rail: 314, ship: null, pipeline: null },
  
    // Midwest connections
    'St. Louis, MO-Memphis, TN': { truck: 285, rail: 305, ship: null, pipeline: 285 },
    'Memphis, TN-New Orleans, LA': { truck: 340, rail: 395, ship: null, pipeline: 358 },
  
    // West Coast connections
    'Portland, OR-San Francisco/Oakland, CA': { truck: 635, rail: 713, ship: 580, pipeline: null },
    'San Francisco/Oakland, CA-Long Beach, CA': { truck: 400, rail: 400, ship: 420, pipeline: 400 }
  };
  
  // Helper function to get distance between two locations
  function getDistance(origin, destination, transportMode) {
    const key1 = `${origin}-${destination}`;
    const key2 = `${destination}-${origin}`;
    
    const route = DISTANCE_MATRIX[key1] || DISTANCE_MATRIX[key2];
    
    if (!route) {
      console.warn(`No distance data for ${origin} → ${destination}`);
      return null;
    }
    
    const distance = route[transportMode];
    if (distance === null) {
      console.warn(`${transportMode} not available for ${origin} → ${destination}`);
      return null;
    }
    
    return distance;
  }
  
  // Get all available routes for a location
  function getAvailableRoutes(origin, transportMode) {
    const availableRoutes = [];
    
    Object.keys(DISTANCE_MATRIX).forEach(key => {
      const [routeOrigin, routeDestination] = key.split('-');
      
      if (routeOrigin === origin || routeDestination === origin) {
        const destination = routeOrigin === origin ? routeDestination : routeOrigin;
        const route = DISTANCE_MATRIX[key];
        
        if (route[transportMode] !== null) {
          availableRoutes.push({
            destination,
            distance: route[transportMode],
            transportMode
          });
        }
      }
    });
    
    return availableRoutes;
  }
  
  // Check if pipeline is available between two locations
  function isPipelineAvailable(origin, destination) {
    const distance = getDistance(origin, destination, 'pipeline');
    return distance !== null;
  }
  
  module.exports = {
    DISTANCE_MATRIX,
    getDistance,
    getAvailableRoutes,
    isPipelineAvailable
  };