import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import { SensoryPreferences, ShoppingPreferences } from '../../types';

const steps = [
  { id: 'welcome', title: 'Welcome', description: 'Let\'s personalize your experience' },
  { id: 'sensory', title: 'Sensory Preferences', description: 'Help us understand your needs' },
  { id: 'shopping', title: 'Shopping Preferences', description: 'Customize your shopping experience' },
  { id: 'allergens', title: 'Allergens & Brands', description: 'Set your safety preferences' },
  { id: 'complete', title: 'Complete', description: 'You\'re all set!' }
];

export const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    sensory: {
      lightSensitivity: 'medium' as const,
      soundSensitivity: 'medium' as const,
      crowdTolerance: 'medium' as const,
      preferredShoppingTimes: [] as string[]
    },
    shopping: {
      routeType: 'balanced' as const,
      assistanceLevel: 'moderate' as const,
      notifications: true,
      arGlasses: false
    },
    allergens: [] as string[],
    preferredBrands: [] as string[]
  });

  const { updateProfile, isLoading } = useAuth();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    try {
      await updateProfile({
        sensoryPreferences: preferences.sensory,
        shoppingPreferences: preferences.shopping,
        allergens: preferences.allergens,
        preferredBrands: preferences.preferredBrands
      });
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'welcome':
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">🧠</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to NeuroCart</h2>
              <p className="text-gray-600">We're here to make your shopping experience calm, comfortable, and personalized just for you.</p>
            </div>
          </div>
        );

      case 'sensory':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sensory Preferences</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Light Sensitivity</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['low', 'medium', 'high'] as const).map(level => (
                    <Button
                      key={level}
                      variant={preferences.sensory.lightSensitivity === level ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setPreferences(prev => ({
                        ...prev,
                        sensory: { ...prev.sensory, lightSensitivity: level }
                      }))}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sound Sensitivity</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['low', 'medium', 'high'] as const).map(level => (
                    <Button
                      key={level}
                      variant={preferences.sensory.soundSensitivity === level ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setPreferences(prev => ({
                        ...prev,
                        sensory: { ...prev.sensory, soundSensitivity: level }
                      }))}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Crowd Tolerance</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['low', 'medium', 'high'] as const).map(level => (
                    <Button
                      key={level}
                      variant={preferences.sensory.crowdTolerance === level ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setPreferences(prev => ({
                        ...prev,
                        sensory: { ...prev.sensory, crowdTolerance: level }
                      }))}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Shopping Times</label>
                <div className="grid grid-cols-2 gap-2">
                  {['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM'].map(time => (
                    <Button
                      key={time}
                      variant={preferences.sensory.preferredShoppingTimes.includes(time) ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setPreferences(prev => ({
                        ...prev,
                        sensory: {
                          ...prev.sensory,
                          preferredShoppingTimes: prev.sensory.preferredShoppingTimes.includes(time)
                            ? prev.sensory.preferredShoppingTimes.filter(t => t !== time)
                            : [...prev.sensory.preferredShoppingTimes, time]
                        }
                      }))}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'shopping':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shopping Preferences</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Route Type</label>
                <div className="space-y-2">
                  {[
                    { value: 'quickest', label: 'Quickest Route', desc: 'Get in and out fast' },
                    { value: 'calmest', label: 'Calmest Route', desc: 'Avoid crowds and noise' },
                    { value: 'balanced', label: 'Balanced Route', desc: 'Mix of speed and comfort' }
                  ].map(option => (
                    <Card 
                      key={option.value}
                      className={`p-4 cursor-pointer border-2 ${
                        preferences.shopping.routeType === option.value 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200'
                      }`}
                      onClick={() => setPreferences(prev => ({
                        ...prev,
                        shopping: { ...prev.shopping, routeType: option.value as any }
                      }))}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{option.label}</h3>
                          <p className="text-sm text-gray-600">{option.desc}</p>
                        </div>
                        {preferences.shopping.routeType === option.value && (
                          <Check className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assistance Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['minimal', 'moderate', 'full'] as const).map(level => (
                    <Button
                      key={level}
                      variant={preferences.shopping.assistanceLevel === level ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setPreferences(prev => ({
                        ...prev,
                        shopping: { ...prev.shopping, assistanceLevel: level }
                      }))}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="notifications"
                  checked={preferences.shopping.notifications}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    shopping: { ...prev.shopping, notifications: e.target.checked }
                  }))}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="notifications" className="text-sm text-gray-700">
                  Enable helpful notifications
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="arGlasses"
                  checked={preferences.shopping.arGlasses}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    shopping: { ...prev.shopping, arGlasses: e.target.checked }
                  }))}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="arGlasses" className="text-sm text-gray-700">
                  Use AR glasses integration
                </label>
              </div>
            </div>
          </div>
        );

      case 'allergens':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Allergens & Brands</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Common Allergens</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Peanuts', 'Tree Nuts', 'Shellfish', 'Fish', 'Dairy', 'Eggs', 'Soy', 'Wheat', 'Sesame'].map(allergen => (
                    <Button
                      key={allergen}
                      variant={preferences.allergens.includes(allergen.toLowerCase()) ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setPreferences(prev => ({
                        ...prev,
                        allergens: prev.allergens.includes(allergen.toLowerCase())
                          ? prev.allergens.filter(a => a !== allergen.toLowerCase())
                          : [...prev.allergens, allergen.toLowerCase()]
                      }))}
                    >
                      {allergen}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Brands</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Organic Valley', 'Great Value', 'Simply Balanced', 'Marketside', 'Equate', 'Member\'s Mark'].map(brand => (
                    <Button
                      key={brand}
                      variant={preferences.preferredBrands.includes(brand) ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setPreferences(prev => ({
                        ...prev,
                        preferredBrands: prev.preferredBrands.includes(brand)
                          ? prev.preferredBrands.filter(b => b !== brand)
                          : [...prev.preferredBrands, brand]
                      }))}
                    >
                      {brand}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">You're All Set!</h2>
              <p className="text-gray-600">Your personalized shopping experience is ready. Let's start shopping with confidence.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <Card className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-gray-500">
                {steps[currentStep].title}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button
                onClick={handleComplete}
                loading={isLoading}
                variant="primary"
                className="bg-green-600 hover:bg-green-700"
              >
                Complete Setup
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                variant="primary"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};