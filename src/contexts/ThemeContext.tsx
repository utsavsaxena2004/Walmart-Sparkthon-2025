import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  isDimMode: boolean;
  toggleDimMode: () => void;
  isCalmMode: boolean;
  toggleCalmMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDimMode, setIsDimMode] = useState(false);
  const [isCalmMode, setIsCalmMode] = useState(false);

  useEffect(() => {
    // Check for saved preferences
    const savedDimMode = localStorage.getItem('neurocart-dim-mode');
    const savedCalmMode = localStorage.getItem('neurocart-calm-mode');
    
    if (savedDimMode === 'true') {
      setIsDimMode(true);
    }
    
    if (savedCalmMode === 'true') {
      setIsCalmMode(true);
      document.documentElement.classList.add('calm-mode');
    }
  }, []);

  const toggleDimMode = () => {
    const newDimMode = !isDimMode;
    setIsDimMode(newDimMode);
    localStorage.setItem('neurocart-dim-mode', newDimMode.toString());
  };

  const toggleCalmMode = () => {
    const newCalmMode = !isCalmMode;
    setIsCalmMode(newCalmMode);
    
    if (newCalmMode) {
      document.documentElement.classList.add('calm-mode');
      localStorage.setItem('neurocart-calm-mode', 'true');
    } else {
      document.documentElement.classList.remove('calm-mode');
      localStorage.setItem('neurocart-calm-mode', 'false');
    }
  };

  return (
    <ThemeContext.Provider value={{
      isDimMode,
      toggleDimMode,
      isCalmMode,
      toggleCalmMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};