import React from 'react';
import { Brain, User, Settings, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { isCalmMode } = useTheme();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <Brain className={`w-8 h-8 mr-2 ${
                isCalmMode ? 'text-green-600' : 'text-blue-600'
              }`} />
              <h1 className="text-2xl font-bold text-gray-900">
                NeuroCart
              </h1>
              {isCalmMode && (
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Calm Mode
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm text-gray-600">Welcome back,</span>
              <span className="font-medium text-gray-900">{user?.name}</span>
            </div>
            
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};