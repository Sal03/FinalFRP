// frontend/src/components/RouteMap.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, LayersControl, FeatureGroup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './RouteMap.css';

// Fix default markers (Leaflet + React issue)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icons for different transport modes
const createCustomIcon = (color, symbol) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="
      background-color: ${color};
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: white;
      font-weight: bold;
    ">${symbol}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  });
};

// Transport mode styling
const transportStyles = {
  truck: {
    color: '#2563eb', // Blue
    weight: 4,
    opacity: 0.8,
    dashArray: null,
    icon: '🚛'
  },
  rail: {
    color: '#dc2626', // Red
    weight: 6,
    opacity: 0.7,
    dashArray: '10, 5',
    icon: '🚂'
  },
  ship: {
    color: '#059669', // Green
    weight: 5,
    opacity: 0.8,
    dashArray: '15, 5, 5, 5',
    icon: '🚢'
  },
  pipeline: {
    color: '#7c3aed', // Purple
    weight: 8,
    opacity: 0.6,
    dashArray: null,
    icon: '⛽'
  }
};

// Add this function after the imports (around line 50):
const generateCurvedPath = (start, end, transportMode) => {
  if (!start || !end) return [start, end].filter(Boolean);
  
  const [lat1, lng1] = start;
  const [lat2, lng2] = end;
  
  // Calculate midpoint
  const midLat = (lat1 + lat2) / 2;
  const midLng = (lng1 + lng2) / 2;
  
  // Add curvature based on transport mode and distance
  const distance = Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lng2 - lng1, 2));
  let curveOffset = distance * 0.3; // Base curve
  
  // Mode-specific routing adjustments
  if (transportMode === 'ship') {
    // Ships follow coastal routes
    if (lat1 > 35 && lat2 > 35) { // Northern route
      curveOffset = distance * 0.4;
    } else { // Southern/Gulf route
      curveOffset = distance * 0.2;
    }
  } else if (transportMode === 'rail') {
    // Rail follows network topology
    curveOffset = distance * 0.25;
  } else if (transportMode === 'truck') {
    // Trucks follow highways
    curveOffset = distance * 0.15;
  }
  
  // Create curved path with multiple waypoints
  const waypoints = [];
  const segments = 8; // Number of curve segments
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    
    // Bezier curve calculation
    const lat = lat1 + t * (lat2 - lat1) + Math.sin(t * Math.PI) * curveOffset;
    const lng = lng1 + t * (lng2 - lng1) + Math.cos(t * Math.PI) * curveOffset * 0.5;
    
    waypoints.push([lat, lng]);
  }
  
  return waypoints;
};

// Major US ports and hubs with coordinates
const locations = {
  'Houston, TX': [29.7604, -95.3698],
  'New Orleans, LA': [29.9511, -90.0715],
  'Mobile, AL': [30.6944, -88.0431],
  'Tampa Bay, FL': [27.9506, -82.4572],
  'Savannah, GA': [32.0835, -81.0998],
  'Jacksonville, FL': [30.3322, -81.6557],
  'Miami, FL': [25.7617, -80.1918],
  'New York/NJ': [40.7128, -74.0060],
  'Philadelphia, PA': [39.9526, -75.1652],
  'Norfolk, VA': [36.8468, -76.2852],
  'Boston, MA': [42.3601, -71.0589],
  'Long Beach, CA': [33.7701, -118.1937],
  'Los Angeles, CA': [34.0522, -118.2437],
  'Seattle, WA': [47.6062, -122.3321],
  'Portland, OR': [45.5152, -122.6784],
  'San Francisco/Oakland, CA': [37.7749, -122.4194],
  'Chicago, IL': [41.8781, -87.6298],
  'St. Louis, MO': [38.6270, -90.1994],
  'Memphis, TN': [35.1495, -90.0490],
  'Duluth-Superior, MN/WI': [46.7867, -92.1005]
};

const RouteMap = ({ 
  routeOptions = [], 
  selectedRoute = null, 
  origin = '', 
  destination = '', 
  onRouteSelect,
  showAllRoutes = false,
  height = '500px'
}) => {
  const [routeData, setRouteData] = useState([]);
  const [mapCenter, setMapCenter] = useState([39.8283, -98.5795]); // Center of US
  const [mapZoom, setMapZoom] = useState(4);

  // Debug logging - moved inside component
  useEffect(() => {
    console.log('RouteMap props:', {
      routeOptions,
      selectedRoute,
      origin,
      destination
    });
  }, [routeOptions, selectedRoute, origin, destination]);

  // Add realistic route paths for different transport modes
  const getRealisticRoutePath = (origin, destination, transportMode) => {
    const originCoords = locations[origin];
    const destCoords = locations[destination];
    
    if (!originCoords || !destCoords) return [originCoords, destCoords].filter(Boolean);
    
    // Define intermediate waypoints for major routes
    const routeWaypoints = {
      'Los Angeles, CA-Seattle, WA': {
        truck: [[34.0522, -118.2437], [36.7783, -119.4179], [37.7749, -122.4194], [45.5152, -122.6784], [47.6062, -122.3321]], // Via Central Valley, SF, Portland
        rail: [[34.0522, -118.2437], [35.3733, -119.0187], [37.7749, -122.4194], [45.5152, -122.6784], [47.6062, -122.3321]], // Rail network route
        ship: [[34.0522, -118.2437], [36.2048, -121.8918], [43.3504, -124.3738], [47.6062, -122.3321]] // Coastal route
      },
      'Houston, TX-New Orleans, LA': {
        truck: [[29.7604, -95.3698], [30.2241, -93.2044], [29.9511, -90.0715]], // Via I-10
        rail: [[29.7604, -95.3698], [30.1588, -94.1213], [29.9511, -90.0715]], // Rail corridor
        ship: [[29.7604, -95.3698], [29.7520, -94.0477], [29.9511, -90.0715]] // Gulf Coast
      }
      // Add more routes as needed
    };
  
  const routeKey = `${origin}-${destination}`;
  const reverseKey = `${destination}-${origin}`;
  
  if (routeWaypoints[routeKey] && routeWaypoints[routeKey][transportMode]) {
    return routeWaypoints[routeKey][transportMode];
  } else if (routeWaypoints[reverseKey] && routeWaypoints[reverseKey][transportMode]) {
    return [...routeWaypoints[reverseKey][transportMode]].reverse();
  }
  
  // Fallback to direct route for unknown combinations
  return [originCoords, destCoords];
};

  // Process route options for map display
  // UPDATE the route processing to use backend waypoints:
useEffect(() => {
  if (routeOptions.length > 0) {
    const processedRoutes = routeOptions.map((route, index) => {
      // Use waypoints from backend if available
      let routePath = [];
      
      if (route.waypoints && route.waypoints.length > 0) {
        // Use backend-provided waypoints for realistic routing
        routePath = route.waypoints;
      } else if (route.routePath && route.routePath.length > 2) {
        // Multi-point route from backend
        routePath = route.routePath
          .map(location => locations[location])
          .filter(coords => coords);
      } else {
        // Simple point-to-point with curve
        const originCoords = locations[route.routePath?.[0] || origin];
        const destCoords = locations[route.routePath?.[route.routePath.length - 1] || destination];
        
        if (originCoords && destCoords) {
          const primaryMode = route.transportModes?.[0] || 'truck';
          routePath = generateCurvedPath(originCoords, destCoords, primaryMode);
        }
      }

      return {
        id: route.id || `route-${index}`,
        name: route.name || `Route ${index + 1}`,
        transportModes: route.transportModes || ['truck'],
        routePath,
        distance: route.distance,
        estimatedTime: route.estimatedTime,
        estimatedCost: route.estimatedCost,
        routingMethod: route.routingMethod,
        fallback: route.fallback || false,
        selected: selectedRoute && selectedRoute.id === route.id
      };
    }).filter(route => route !== null && route.routePath.length > 0);

    setRouteData(processedRoutes);
  }
}, [routeOptions, selectedRoute, origin, destination]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="route-map-container">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Map Header */}
        <div className="bg-blue-600 text-white px-4 py-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              🗺️ Interactive Route Visualization
              {routeData.length > 0 && (
                <span className="text-blue-200 text-sm">
                  ({routeData.length} route{routeData.length !== 1 ? 's' : ''})
                </span>
              )}
            </h3>
            
            {/* Legend */}
            <div className="flex items-center gap-4 text-sm">
              {Object.entries(transportStyles).map(([mode, style]) => (
                <div key={mode} className="flex items-center gap-1">
                  <div 
                    className="w-4 h-1" 
                    style={{ 
                      backgroundColor: style.color,
                      borderStyle: style.dashArray ? 'dashed' : 'solid',
                      borderWidth: '1px'
                    }}
                  ></div>
                  <span className="capitalize">{mode}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div style={{ height, width: '100%' }}>
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LayersControl position="topright">
              {/* Route Layers */}
              {routeData.map((route) => (
                <LayersControl.Overlay 
                  key={route.id} 
                  name={route.name}
                  checked={showAllRoutes || route.selected}
                >
                  <FeatureGroup>
                    {/* Route line */}
                    {route.routePath.length >= 2 && route.transportModes.map((mode, modeIndex) => {
                      const style = transportStyles[mode] || transportStyles.truck;
                      
                      return (
                        <Polyline
                          key={`${route.id}-${mode}-${modeIndex}`}
                          positions={route.routePath}
                          pathOptions={{
                            color: style.color,
                            weight: style.weight,
                            opacity: route.selected ? 1.0 : style.opacity,
                            dashArray: style.dashArray
                          }}
                          eventHandlers={{
                            click: () => {
                              if (onRouteSelect) {
                                onRouteSelect(route);
                              }
                            }
                          }}
                        >
                          <Popup>
                            <div className="min-w-64">
                              <h4 className="font-semibold text-blue-600 mb-2">{route.name}</h4>
                              <div className="space-y-1 text-sm">
                                <div><strong>Distance:</strong> {route.distance} miles</div>
                                <div><strong>Time:</strong> {route.estimatedTime}</div>
                                <div><strong>Cost:</strong> {formatCurrency(route.estimatedCost)}</div>
                                {route.routingMethod && (
                                  <div><strong>Method:</strong> {route.routingMethod.replace(/_/g, ' ')}</div>
                                )}
                                {route.fallback && (
                                  <div className="text-yellow-600"><strong>⚠️ Estimated route</strong></div>
                                )}
                              </div>
                            </div>
                          </Popup>
                        </Polyline>
                      );
                    })}

                    {/* Route waypoint markers */}
                    {route.routePath.map((coords, index) => {
                      const isOrigin = index === 0;
                      const isDestination = index === route.routePath.length - 1;
                      const isWaypoint = !isOrigin && !isDestination;
                      
                      let markerColor = '#6b7280'; // Default gray
                      let markerSymbol = '📍';
                      
                      if (isOrigin) {
                        markerColor = '#10b981'; // Green
                        markerSymbol = '🟢';
                      } else if (isDestination) {
                        markerColor = '#ef4444'; // Red  
                        markerSymbol = '🔴';
                      } else if (isWaypoint) {
                        markerColor = '#f59e0b'; // Yellow
                        markerSymbol = '🟡';
                      }

                      return (
                        <Marker
                          key={`${route.id}-marker-${index}`}
                          position={coords}
                          icon={createCustomIcon(markerColor, markerSymbol)}
                        >
                          <Popup>
                            <div className="text-sm">
                              <div className="font-semibold">
                                {isOrigin ? 'Origin' : isDestination ? 'Destination' : 'Waypoint'}
                              </div>
                              <div>Coordinates: {coords[0].toFixed(4)}, {coords[1].toFixed(4)}</div>
                            </div>
                          </Popup>
                        </Marker>
                      );
                    })}
                  </FeatureGroup>
                </LayersControl.Overlay>
              ))}

              {/* All Locations Layer */}
              <LayersControl.Overlay name="All Ports & Hubs" checked={false}>
                <FeatureGroup>
                  {Object.entries(locations).map(([name, coords]) => (
                    <Marker
                      key={name}
                      position={coords}
                      icon={createCustomIcon('#6366f1', '🏭')}
                    >
                      <Popup>
                        <div className="text-sm">
                          <div className="font-semibold">{name}</div>
                          <div>Coordinates: {coords[0].toFixed(4)}, {coords[1].toFixed(4)}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            Available for truck, rail, ship, and pipeline transport
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </FeatureGroup>
              </LayersControl.Overlay>
            </LayersControl>
          </MapContainer>
        </div>

        {/* Route Summary */}
        {routeData.length > 0 && (
          <div className="bg-gray-50 px-4 py-3 border-t">
            <div className="text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <div>
                  <strong>Route Summary:</strong> {origin} → {destination}
                </div>
                <div className="flex items-center gap-4">
                  {selectedRoute ? (
                    <div className="text-blue-600">
                      <strong>Selected:</strong> {selectedRoute.name}
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      Click on a route to select it
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteMap;