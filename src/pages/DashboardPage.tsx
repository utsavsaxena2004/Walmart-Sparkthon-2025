import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Navigation } from '../components/layout/Navigation';
import { StoreStatus } from '../components/dashboard/StoreStatus';
import { RecommendedTimes } from '../components/dashboard/RecommendedTimes';
import { RouteOptimizer } from '../components/dashboard/RouteOptimizer';
import { ShoppingList } from '../components/dashboard/ShoppingList';
import { CalmMode } from '../components/dashboard/CalmMode';
import { Analytics } from '../components/dashboard/Analytics';
import { StoreMap } from '../components/map/StoreMap';
import { useTheme } from '../contexts/ThemeContext';

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isDimMode } = useTheme();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <StoreStatus />
              <RouteOptimizer />
              <CalmMode />
            </div>
            <div className="space-y-6">
              <RecommendedTimes />
              <ShoppingList />
            </div>
          </div>
        );
      case 'map':
        return <StoreMap />;
      case 'shopping':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ShoppingList />
            <RouteOptimizer />
          </div>
        );
      case 'analytics':
        return (
          <div className="grid grid-cols-1 gap-6">
            <Analytics />
          </div>
        );
      case 'calm':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CalmMode />
            <StoreStatus />
          </div>
        );
      case 'settings':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Settings</h2>
              <p className="text-gray-600">Settings panel would go here...</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDimMode ? 'dim-mode' : ''
    }`}>
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};