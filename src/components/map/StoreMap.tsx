import React, { useState } from 'react';
import { MapPin, Navigation, Users, Volume2, Cpu, Zap } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useStore } from '../../contexts/StoreContext';
import { useTheme } from '../../contexts/ThemeContext';

export const StoreMap: React.FC = () => {
  const { storeData, routes, shoppingList } = useStore();
  const { isDimMode, isCalmMode } = useTheme();
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [showARMode, setShowARMode] = useState(false);

  const selectedRouteData = routes.find(r => r.id === selectedRoute);

  // Filter routes based on calm mode
  const filteredRoutes = isCalmMode 
    ? routes.filter(route => route.stressLevel === 'low' || route.avoidsCrowds)
    : routes;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Interactive Store Map</h2>
          <div className="flex space-x-2">
            <Button
              variant={showARMode ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setShowARMode(!showARMode)}
            >
              {showARMode ? 'AR Active' : 'AR View'}
            </Button>
            <Button variant="outline" size="sm">
              <Navigation className="w-4 h-4 mr-1" />
              Recenter
            </Button>
          </div>
        </div>

        {showARMode && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center text-blue-800 mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              <span className="font-medium">AR Mode Active</span>
            </div>
            <p className="text-sm text-blue-700">
              Visual cues are now overlaid on your AR glasses. Green highlights show preferred brands, 
              red warnings indicate allergens, and blue paths show your optimized route.
            </p>
          </div>
        )}

        {/* AI Route Optimization Notice */}
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <div className="flex items-center text-purple-800 mb-2">
            <Cpu className="w-4 h-4 mr-2" />
            <span className="font-medium">AI-Powered Dynamic Routing</span>
          </div>
          <p className="text-sm text-purple-700">
            Routes are dynamically generated using real-time crowd density, noise levels, and your personal 
            sensory preferences. Our backend AI continuously optimizes paths through Supabase Edge Functions 
            for the most comfortable shopping experience.
          </p>
        </div>

        {/* Store Map Visualization */}
        <div className={`relative rounded-lg p-4 h-96 overflow-hidden transition-colors duration-300 ${
          isDimMode ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <svg viewBox="0 0 600 400" className="w-full h-full">
            {/* Store Layout */}
            <rect 
              x="50" 
              y="50" 
              width="500" 
              height="300" 
              fill={isDimMode ? "#374151" : "white"} 
              stroke={isDimMode ? "#6b7280" : "#e5e7eb"} 
              strokeWidth="2" 
            />
            
            {/* Departments */}
            <rect x="80" y="80" width="100" height="60" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
            <text x="130" y="115" textAnchor="middle" fontSize="12" fill="#166534">Produce</text>
            
            <rect x="200" y="80" width="100" height="60" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
            <text x="250" y="115" textAnchor="middle" fontSize="12" fill="#1e40af">Dairy</text>
            
            <rect x="320" y="80" width="100" height="60" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="370" y="115" textAnchor="middle" fontSize="12" fill="#92400e">Bakery</text>
            
            <rect x="440" y="80" width="100" height="60" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="1" />
            <text x="490" y="115" textAnchor="middle" fontSize="12" fill="#5b21b6">Frozen</text>
            
            <rect x="80" y="160" width="100" height="60" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
            <text x="130" y="195" textAnchor="middle" fontSize="12" fill="#991b1b">Meat</text>
            
            <rect x="200" y="160" width="100" height="60" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
            <text x="250" y="195" textAnchor="middle" fontSize="12" fill="#059669">Health</text>
            
            <rect x="320" y="160" width="100" height="60" fill="#fdf4ff" stroke="#a855f7" strokeWidth="1" />
            <text x="370" y="195" textAnchor="middle" fontSize="12" fill="#7c2d12">Pantry</text>
            
            <rect x="440" y="160" width="100" height="60" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="1" />
            <text x="490" y="195" textAnchor="middle" fontSize="12" fill="#0c4a6e">Electronics</text>

            {/* Calm Zones */}
            {storeData.calmZones.map((zone, index) => (
              <g key={zone.id}>
                <circle
                  cx={zone.location.x}
                  cy={zone.location.y}
                  r="15"
                  fill={zone.available ? "#10b981" : "#ef4444"}
                  fillOpacity="0.3"
                  stroke={zone.available ? "#10b981" : "#ef4444"}
                  strokeWidth="2"
                />
                <text
                  x={zone.location.x}
                  y={zone.location.y + 25}
                  textAnchor="middle"
                  fontSize="10"
                  fill={isDimMode ? "#d1d5db" : "#374151"}
                >
                  {zone.name}
                </text>
              </g>
            ))}

            {/* Shopping List Items */}
            {shoppingList.map((item, index) => (
              <g key={item.id}>
                <circle
                  cx={item.location.x}
                  cy={item.location.y}
                  r="6"
                  fill={item.allergenWarning ? "#ef4444" : isCalmMode ? "#10b981" : "#3b82f6"}
                />
                <text
                  x={item.location.x + 10}
                  y={item.location.y + 4}
                  fontSize="10"
                  fill={isDimMode ? "#d1d5db" : "#374151"}
                >
                  {item.name}
                </text>
              </g>
            ))}

            {/* Selected Route */}
            {selectedRouteData && (
              <g>
                <polyline
                  points={selectedRouteData.waypoints.map(wp => `${wp.location.x},${wp.location.y}`).join(' ')}
                  fill="none"
                  stroke={isCalmMode ? "#10b981" : "#3b82f6"}
                  strokeWidth="3"
                  strokeDasharray="5,5"
                />
                {selectedRouteData.waypoints.map((wp, index) => (
                  <g key={wp.id}>
                    <circle cx={wp.location.x} cy={wp.location.y} r="8" fill={isCalmMode ? "#10b981" : "#3b82f6"} />
                    <text
                      x={wp.location.x}
                      y={wp.location.y + 4}
                      textAnchor="middle"
                      fontSize="10"
                      fill="white"
                    >
                      {index + 1}
                    </text>
                  </g>
                ))}
              </g>
            )}

            {/* Real-time Crowd Density Indicators */}
            <g>
              <circle cx="150" cy="250" r="20" fill="#ef4444" fillOpacity="0.2" />
              <text x="150" y="275" textAnchor="middle" fontSize="10" fill="#991b1b">High Traffic</text>
              
              <circle cx="350" cy="250" r="15" fill="#f59e0b" fillOpacity="0.2" />
              <text x="350" y="275" textAnchor="middle" fontSize="10" fill="#92400e">Medium</text>
              
              <circle cx="450" cy="250" r="10" fill="#10b981" fillOpacity="0.2" />
              <text x="450" y="275" textAnchor="middle" fontSize="10" fill="#059669">Low</text>
            </g>

            {/* AI Processing Indicator */}
            {showARMode && (
              <g>
                <rect x="480" y="60" width="60" height="20" fill="#8b5cf6" fillOpacity="0.8" rx="10" />
                <text x="510" y="73" textAnchor="middle" fontSize="8" fill="white">AI Active</text>
                <circle cx="495" cy="70" r="2" fill="#fbbf24">
                  <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
                </circle>
              </g>
            )}
          </svg>
        </div>

        {/* Map Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded-full mr-2 ${isCalmMode ? 'bg-green-500' : 'bg-blue-500'}`}></div>
            <span>Shopping Items</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span>Available Calm Zones</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
            <span>Busy Areas / Allergen Warnings</span>
          </div>
          <div className="flex items-center">
            <div className={`w-4 h-4 border-2 rounded mr-2 ${isCalmMode ? 'border-green-500' : 'border-blue-500'}`}></div>
            <span>Optimized Route</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-purple-600" />
            AI Route Selection
            {isCalmMode && (
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Calm Mode
              </span>
            )}
          </h3>
          <div className="space-y-3">
            {filteredRoutes.map((route) => (
              <div
                key={route.id}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedRoute === route.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedRoute(route.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium flex items-center">
                      {route.name}
                      {route.avoidsCrowds && (
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Crowd-Free
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-600">{route.estimatedTime} min</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    route.stressLevel === 'low' ? 'bg-green-100 text-green-800' :
                    route.stressLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {route.stressLevel}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-700">
              <Cpu className="w-4 h-4 inline mr-1" />
              Routes dynamically optimized using real-time IoT sensor data and machine learning algorithms.
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Real-time Conditions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">Store Occupancy</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-2">{storeData.occupancy}%</span>
                <div className={`w-2 h-2 rounded-full ${
                  storeData.occupancy < 30 ? 'bg-green-500' :
                  storeData.occupancy < 70 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Volume2 className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">Noise Level</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-2">{storeData.soundLevel}dB</span>
                <div className={`w-2 h-2 rounded-full ${
                  storeData.soundLevel < 40 ? 'bg-green-500' :
                  storeData.soundLevel < 60 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">Calm Zones Available</span>
              </div>
              <span className="font-medium">
                {storeData.calmZones.filter(z => z.available).length}/{storeData.calmZones.length}
              </span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Backend Integration</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Supabase real-time database for user preferences</li>
              <li>• Edge Functions for route optimization algorithms</li>
              <li>• IoT sensor data simulation for crowd/noise levels</li>
              <li>• Machine learning for personalized recommendations</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};