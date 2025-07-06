import React, { useState } from 'react';
import { Route, Navigation, Zap, Heart, MapPin, Shield } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useStore } from '../../contexts/StoreContext';
import { useTheme } from '../../contexts/ThemeContext';

export const RouteOptimizer: React.FC = () => {
  const { routes, shoppingList } = useStore();
  const { isCalmMode } = useTheme();
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  // Filter routes based on calm mode
  const filteredRoutes = isCalmMode 
    ? routes.filter(route => route.stressLevel === 'low' || route.avoidsCrowds)
    : routes;

  const getRouteIcon = (stressLevel: string) => {
    switch (stressLevel) {
      case 'low':
        return <Heart className="w-5 h-5 text-green-600" />;
      case 'medium':
        return <Navigation className="w-5 h-5 text-yellow-600" />;
      case 'high':
        return <Zap className="w-5 h-5 text-red-600" />;
      default:
        return <Route className="w-5 h-5 text-gray-600" />;
    }
  };

  const getRouteColor = (stressLevel: string) => {
    switch (stressLevel) {
      case 'low':
        return 'bg-green-50 border-green-200 hover:bg-green-100';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100';
      case 'high':
        return 'bg-red-50 border-red-200 hover:bg-red-100';
      default:
        return 'bg-gray-50 border-gray-200 hover:bg-gray-100';
    }
  };

  const handleStartRoute = (routeId: string) => {
    setSelectedRoute(routeId);
    // Here you would typically navigate to the route view
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-900">Route Optimizer</h2>
          {isCalmMode && (
            <div className="ml-3 flex items-center text-green-600">
              <Shield className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Calm Mode</span>
            </div>
          )}
        </div>
        <div className="flex items-center text-sm text-blue-600">
          <MapPin className="w-4 h-4 mr-1" />
          {shoppingList.length} items
        </div>
      </div>

      {isCalmMode && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">
            <Shield className="w-4 h-4 inline mr-1" />
            Showing only calm, low-stress routes that avoid crowds and minimize sensory overload.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {filteredRoutes.map((route) => (
          <div
            key={route.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedRoute === route.id
                ? 'border-blue-500 bg-blue-50'
                : getRouteColor(route.stressLevel)
            }`}
            onClick={() => setSelectedRoute(route.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                {getRouteIcon(route.stressLevel)}
                <h3 className="font-medium text-gray-900 ml-2">{route.name}</h3>
                {route.avoidsCrowds && (
                  <div className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Crowd-Free
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-600">
                {route.estimatedTime} min
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-gray-600">Stress Level</div>
                <div className={`font-medium ${
                  route.stressLevel === 'low' ? 'text-green-600' :
                  route.stressLevel === 'medium' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {route.stressLevel.charAt(0).toUpperCase() + route.stressLevel.slice(1)}
                </div>
              </div>
              <div>
                <div className="text-gray-600">Waypoints</div>
                <div className="font-medium text-gray-900">{route.waypoints.length}</div>
              </div>
              <div>
                <div className="text-gray-600">Environment</div>
                <div className="font-medium text-gray-900">
                  {route.avoidsCrowds ? 'Quiet' : 'Regular'}
                </div>
              </div>
            </div>

            {selectedRoute === route.id && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {isCalmMode ? 'Optimized for calm mode preferences' : 'Optimized for your sensory preferences'}
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartRoute(route.id);
                    }}
                  >
                    Start Route
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">
          {isCalmMode ? 'Calm Mode Features' : 'Route Features'}
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Real-time crowd avoidance</li>
          <li>• Noise level optimization</li>
          <li>• Calm zone integration</li>
          <li>• AR navigation support</li>
          {isCalmMode && (
            <>
              <li>• Priority for sensory-friendly paths</li>
              <li>• Extended time allowances</li>
            </>
          )}
        </ul>
      </div>
    </Card>
  );
};