import React from 'react';
import { TrendingUp, BarChart3, Clock, MapPin } from 'lucide-react';
import { Card } from '../ui/Card';
import { useStore } from '../../contexts/StoreContext';

export const Analytics: React.FC = () => {
  const { analytics } = useStore();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Analytics</h2>
        <div className="flex items-center text-sm text-blue-600">
          <TrendingUp className="w-4 h-4 mr-1" />
          Insights
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stress Level Trends */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Stress Level Trends
          </h3>
          <div className="space-y-2">
            {analytics.stressLevels.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{data.time}</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className={`h-2 rounded-full ${
                        data.level <= 2 ? 'bg-green-500' :
                        data.level <= 4 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${(data.level / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{data.level}/10</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Patterns */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Shopping Patterns
          </h3>
          <div className="space-y-2">
            {analytics.shoppingPatterns.map((pattern, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm font-medium">{pattern.day}</span>
                  <div className="text-xs text-gray-600">{pattern.duration} min</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    pattern.stress <= 2 ? 'text-green-600' :
                    pattern.stress <= 4 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    Stress: {pattern.stress}/10
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Route Efficiency */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Route Efficiency
          </h3>
          <div className="space-y-2">
            {analytics.routeEfficiency.map((route, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{route.route}</span>
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${route.efficiency}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{route.efficiency}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calm Zone Usage */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Calm Zone Usage</h3>
          <div className="space-y-2">
            {analytics.calmZoneUsage.map((zone, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{zone.zone}</span>
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${zone.usage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{zone.usage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <h4 className="font-medium text-green-900 mb-2">Key Insights</h4>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Your stress levels are lowest during early morning shopping</li>
          <li>• Sensory-friendly routes reduce stress by 40% on average</li>
          <li>• Calm zones help maintain lower stress throughout your visit</li>
          <li>• Auto-reorder saves you 2+ hours per week</li>
        </ul>
      </div>
    </Card>
  );
};