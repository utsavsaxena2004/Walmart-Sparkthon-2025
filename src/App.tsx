import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { StoreProvider } from './contexts/StoreContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { AuthPage } from './pages/AuthPage';
import { OnboardingFlow } from './components/auth/OnboardingFlow';
import { DashboardPage } from './pages/DashboardPage';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { isDimMode } = useTheme();

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
        isDimMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  // Check if user needs onboarding
  const needsOnboarding = !user.profile.sensoryPreferences.preferredShoppingTimes.length;

  if (needsOnboarding) {
    return <OnboardingFlow />;
  }

  return (
    <StoreProvider>
      <DashboardPage />
    </StoreProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <div className="dim-mode-container">
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;