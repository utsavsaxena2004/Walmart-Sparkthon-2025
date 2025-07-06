import React, { useState } from 'react';
import { Heart, Shield, Phone, Headphones, Sun, Moon, Volume2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { BreathingExercise } from '../calm/BreathingExercise';
import { EmergencyContacts } from '../calm/EmergencyContacts';

export const CalmMode: React.FC = () => {
  const [stressLevel, setStressLevel] = useState(2);
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [whiteNoiseActive, setWhiteNoiseActive] = useState(false);
  
  const { user } = useAuth();
  const { isDimMode, toggleDimMode, isCalmMode, toggleCalmMode } = useTheme();

  const getStressColor = (level: number) => {
    if (level <= 2) return 'text-green-600';
    if (level <= 4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStressLabel = (level: number) => {
    if (level <= 2) return 'Calm';
    if (level <= 4) return 'Moderate';
    return 'High';
  };

  const handleWhiteNoise = () => {
    setWhiteNoiseActive(!whiteNoiseActive);
    // In a real app, this would start/stop white noise audio
    if (!whiteNoiseActive) {
      console.log('Starting calming white noise...');
    } else {
      console.log('Stopping white noise...');
    }
  };

  // Dim mode styles for this component only
  const dimModeStyles = isDimMode ? {
    backgroundColor: '#1f2937',
    color: '#f9fafb',
    borderColor: '#374151'
  } : {};

  const dimModeCardStyles = isDimMode ? {
    backgroundColor: '#374151',
    borderColor: '#4b5563'
  } : {};

  return (
    <>
      <Card 
        className={`p-6 transition-all duration-300 ${
          isCalmMode 
            ? 'bg-green-50 border-green-200' 
            : 'bg-white border-gray-200'
        }`}
        style={dimModeStyles}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Heart className={`w-5 h-5 mr-2 ${isCalmMode ? 'text-green-600' : 'text-gray-600'}`} />
            <h2 className="text-xl font-semibold" style={isDimMode ? {color: '#f9fafb'} : {color: '#111827'}}>
              Calm Mode
            </h2>
          </div>
          <Button
            variant={isCalmMode ? 'calm' : 'outline'}
            onClick={toggleCalmMode}
            className="transition-all duration-300"
          >
            {isCalmMode ? 'Active' : 'Activate'}
          </Button>
        </div>

        {isCalmMode && (
          <div 
            className="mb-6 p-4 rounded-lg border transition-all duration-300"
            style={isDimMode ? {
              backgroundColor: '#4b5563',
              borderColor: '#6b7280',
              color: '#d1fae5'
            } : {
              backgroundColor: 'white',
              borderColor: '#16a34a',
              color: '#166534'
            }}
          >
            <div className="flex items-center mb-2">
              <Shield className="w-4 h-4 mr-2" />
              <span className="font-medium">Calm Mode is Active</span>
            </div>
            <p className="text-sm">
              Your experience is optimized for minimal stress. Routes prioritize calm zones, 
              notifications are muted, and emergency features are ready.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div 
            className="flex items-center justify-between p-4 rounded-lg transition-colors duration-300"
            style={isDimMode ? {
              backgroundColor: '#4b5563',
              color: '#f9fafb'
            } : {
              backgroundColor: '#f9fafb',
              color: '#111827'
            }}
          >
            <div>
              <h3 className="font-medium">Current Stress Level</h3>
              <p className="text-sm opacity-75">Based on environment and biometrics</p>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold transition-colors duration-300 ${getStressColor(stressLevel)}`}>
                {stressLevel}/10
              </div>
              <div className={`text-sm transition-colors duration-300 ${getStressColor(stressLevel)}`}>
                {getStressLabel(stressLevel)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="flex flex-col items-center py-4 transition-all duration-300 hover:scale-105"
              onClick={() => setShowBreathingExercise(true)}
              style={isDimMode ? {
                backgroundColor: '#4b5563',
                borderColor: '#6b7280',
                color: '#f9fafb'
              } : {}}
            >
              <Sun className="w-6 h-6 text-blue-500 mb-2" />
              <span className="text-sm">Breathing Exercise</span>
            </Button>

            <Button
              variant={whiteNoiseActive ? 'primary' : 'outline'}
              className="flex flex-col items-center py-4 transition-all duration-300 hover:scale-105"
              onClick={handleWhiteNoise}
              style={!whiteNoiseActive && isDimMode ? {
                backgroundColor: '#4b5563',
                borderColor: '#6b7280',
                color: '#f9fafb'
              } : {}}
            >
              <Headphones className={`w-6 h-6 mb-2 ${whiteNoiseActive ? 'text-white' : 'text-purple-500'}`} />
              <span className="text-sm">{whiteNoiseActive ? 'Stop' : 'White Noise'}</span>
              {whiteNoiseActive && (
                <div className="flex items-center mt-1">
                  <Volume2 className="w-3 h-3 mr-1" />
                  <div className="flex space-x-1">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-1 h-2 bg-white rounded animate-pulse" style={{animationDelay: `${i * 0.2}s`}} />
                    ))}
                  </div>
                </div>
              )}
            </Button>

            <Button
              variant={isDimMode ? 'primary' : 'outline'}
              className="flex flex-col items-center py-4 transition-all duration-300 hover:scale-105"
              onClick={toggleDimMode}
              style={!isDimMode ? {} : {}}
            >
              <Moon className={`w-6 h-6 mb-2 ${isDimMode ? 'text-white' : 'text-indigo-500'}`} />
              <span className="text-sm">{isDimMode ? 'Light Mode' : 'Dim Mode'}</span>
            </Button>

            <Button
              variant="outline"
              className="flex flex-col items-center py-4 transition-all duration-300 hover:scale-105 border-red-200 hover:border-red-300"
              onClick={() => setShowEmergencyContacts(true)}
              style={isDimMode ? {
                backgroundColor: '#4b5563',
                borderColor: '#ef4444',
                color: '#f9fafb'
              } : {}}
            >
              <Phone className="w-6 h-6 text-red-500 mb-2" />
              <span className="text-sm">Emergency</span>
            </Button>
          </div>
        </div>

        <div 
          className="mt-6 p-4 rounded-lg transition-colors duration-300"
          style={isDimMode ? {
            backgroundColor: '#1e40af',
            color: '#dbeafe'
          } : {
            backgroundColor: '#dbeafe',
            color: '#1e40af'
          }}
        >
          <h4 className="font-medium mb-2">Auto-Reorder Status</h4>
          <div className="text-sm">
            <div className="flex justify-between mb-1">
              <span>Essential items automatically reordered</span>
              <span className="font-medium">5 items</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Next delivery scheduled</span>
              <span className="font-medium">Tomorrow, 2-4 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated savings</span>
              <span className="font-medium">2 hours per week</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Breathing Exercise Modal */}
      <BreathingExercise 
        isOpen={showBreathingExercise} 
        onClose={() => setShowBreathingExercise(false)} 
      />

      {/* Emergency Contacts Modal */}
      <EmergencyContacts 
        isOpen={showEmergencyContacts} 
        onClose={() => setShowEmergencyContacts(false)} 
      />
    </>
  );
};