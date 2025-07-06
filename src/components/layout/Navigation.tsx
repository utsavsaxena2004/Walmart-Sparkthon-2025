import React from 'react';
import { Home, Map, ShoppingCart, BarChart3, Heart, Settings } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'map', label: 'Store Map', icon: Map },
  { id: 'shopping', label: 'Shopping', icon: ShoppingCart },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'calm', label: 'Calm Mode', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};