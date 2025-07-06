import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StoreData, Route, ShoppingItem, AnalyticsData } from '../types';

interface StoreContextType {
  storeData: StoreData;
  routes: Route[];
  shoppingList: ShoppingItem[];
  analytics: AnalyticsData;
  isLoading: boolean;
  refreshStoreData: () => Promise<void>;
  addToShoppingList: (item: ShoppingItem) => void;
  removeFromShoppingList: (itemId: string) => void;
  updateShoppingItem: (itemId: string, updates: Partial<ShoppingItem>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [storeData, setStoreData] = useState<StoreData>({
    occupancy: 0,
    soundLevel: 0,
    avgWaitTime: 0,
    calmZones: [],
    lastUpdated: ''
  });
  const [routes, setRoutes] = useState<Route[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    stressLevels: [],
    shoppingPatterns: [],
    routeEfficiency: [],
    calmZoneUsage: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
    // Set up real-time updates
    const interval = setInterval(refreshStoreData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        refreshStoreData(),
        loadRoutes(),
        loadShoppingList(),
        loadAnalytics()
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshStoreData = async () => {
    try {
      // Simulate API call for real-time store data with realistic daily patterns
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const currentHour = new Date().getHours();
      
      // Simulate realistic daily patterns
      let baseOccupancy = 30;
      let baseSoundLevel = 35;
      
      // Peak hours: 12-2 PM and 5-7 PM
      if ((currentHour >= 12 && currentHour <= 14) || (currentHour >= 17 && currentHour <= 19)) {
        baseOccupancy = 70;
        baseSoundLevel = 60;
      }
      // Moderate hours: 10-12 PM and 3-5 PM
      else if ((currentHour >= 10 && currentHour <= 12) || (currentHour >= 15 && currentHour <= 17)) {
        baseOccupancy = 50;
        baseSoundLevel = 45;
      }
      // Early morning and late evening
      else if (currentHour <= 9 || currentHour >= 20) {
        baseOccupancy = 20;
        baseSoundLevel = 30;
      }
      
      // Add some randomness
      const occupancyVariation = Math.floor(Math.random() * 20) - 10;
      const soundVariation = Math.floor(Math.random() * 15) - 7;
      
      const mockStoreData: StoreData = {
        occupancy: Math.max(5, Math.min(95, baseOccupancy + occupancyVariation)),
        soundLevel: Math.max(25, Math.min(80, baseSoundLevel + soundVariation)),
        avgWaitTime: Math.floor(Math.random() * 10) + 2,
        calmZones: [
          {
            id: 'cz1',
            name: 'Quiet Reading Corner',
            location: { x: 150, y: 100 },
            type: 'quiet',
            available: Math.random() > 0.2
          },
          {
            id: 'cz2',
            name: 'Spacious Produce Area',
            location: { x: 300, y: 200 },
            type: 'spacious',
            available: Math.random() > 0.15
          },
          {
            id: 'cz3',
            name: 'Dimmed Electronics',
            location: { x: 450, y: 150 },
            type: 'dimmed',
            available: Math.random() > 0.3
          },
          {
            id: 'cz4',
            name: 'Wellness Corner',
            location: { x: 250, y: 300 },
            type: 'quiet',
            available: Math.random() > 0.25
          }
        ],
        lastUpdated: new Date().toISOString()
      };

      setStoreData(mockStoreData);
    } catch (error) {
      console.error('Failed to refresh store data:', error);
    }
  };

  const loadRoutes = async () => {
    try {
      const mockRoutes: Route[] = [
        {
          id: 'route1',
          name: 'Calm Essentials Route',
          estimatedTime: 25,
          stressLevel: 'low',
          waypoints: [
            { id: 'wp1', location: { x: 100, y: 50 }, department: 'Produce', estimatedCrowdLevel: 20, soundLevel: 35 },
            { id: 'wp2', location: { x: 200, y: 100 }, department: 'Dairy', estimatedCrowdLevel: 15, soundLevel: 30 },
            { id: 'wp3', location: { x: 300, y: 150 }, department: 'Bakery', estimatedCrowdLevel: 25, soundLevel: 40 }
          ],
          avoidsCrowds: true
        },
        {
          id: 'route2',
          name: 'Quick Grab Route',
          estimatedTime: 15,
          stressLevel: 'medium',
          waypoints: [
            { id: 'wp4', location: { x: 150, y: 75 }, department: 'Frozen', estimatedCrowdLevel: 45, soundLevel: 55 },
            { id: 'wp5', location: { x: 250, y: 125 }, department: 'Snacks', estimatedCrowdLevel: 60, soundLevel: 65 }
          ],
          avoidsCrowds: false
        },
        {
          id: 'route3',
          name: 'Sensory-Friendly Route',
          estimatedTime: 35,
          stressLevel: 'low',
          waypoints: [
            { id: 'wp6', location: { x: 120, y: 80 }, department: 'Health & Beauty', estimatedCrowdLevel: 10, soundLevel: 25 },
            { id: 'wp7', location: { x: 280, y: 180 }, department: 'Pharmacy', estimatedCrowdLevel: 5, soundLevel: 20 },
            { id: 'wp8', location: { x: 400, y: 120 }, department: 'Clothing', estimatedCrowdLevel: 15, soundLevel: 30 }
          ],
          avoidsCrowds: true
        },
        {
          id: 'route4',
          name: 'Express Checkout Route',
          estimatedTime: 12,
          stressLevel: 'high',
          waypoints: [
            { id: 'wp9', location: { x: 180, y: 90 }, department: 'Deli', estimatedCrowdLevel: 70, soundLevel: 70 },
            { id: 'wp10', location: { x: 320, y: 160 }, department: 'Checkout', estimatedCrowdLevel: 80, soundLevel: 75 }
          ],
          avoidsCrowds: false
        }
      ];

      setRoutes(mockRoutes);
    } catch (error) {
      console.error('Failed to load routes:', error);
    }
  };

  const loadShoppingList = async () => {
    try {
      const mockShoppingList: ShoppingItem[] = [
        {
          id: 'item1',
          name: 'Organic Milk',
          category: 'Dairy',
          location: { x: 200, y: 100 },
          preferredBrand: 'Organic Valley',
          allergenWarning: false,
          autoReorder: true,
          lastPurchased: '2025-01-10'
        },
        {
          id: 'item2',
          name: 'Gluten-Free Bread',
          category: 'Bakery',
          location: { x: 300, y: 150 },
          allergenWarning: false,
          autoReorder: true,
          lastPurchased: '2025-01-08'
        },
        {
          id: 'item3',
          name: 'Fresh Apples',
          category: 'Produce',
          location: { x: 100, y: 50 },
          allergenWarning: false,
          autoReorder: false
        },
        {
          id: 'item4',
          name: 'Peanut Butter',
          category: 'Pantry',
          location: { x: 350, y: 200 },
          allergenWarning: true,
          autoReorder: false
        },
        {
          id: 'item5',
          name: 'Vitamin D Supplements',
          category: 'Health',
          location: { x: 120, y: 80 },
          preferredBrand: 'Nature Made',
          allergenWarning: false,
          autoReorder: true,
          lastPurchased: '2025-01-05'
        }
      ];

      setShoppingList(mockShoppingList);
    } catch (error) {
      console.error('Failed to load shopping list:', error);
    }
  };

  const loadAnalytics = async () => {
    try {
      const mockAnalytics: AnalyticsData = {
        stressLevels: [
          { time: '9:00 AM', level: 2 },
          { time: '11:00 AM', level: 4 },
          { time: '1:00 PM', level: 6 },
          { time: '3:00 PM', level: 3 },
          { time: '5:00 PM', level: 7 },
          { time: '7:00 PM', level: 4 },
          { time: '8:00 PM', level: 2 }
        ],
        shoppingPatterns: [
          { day: 'Monday', duration: 45, stress: 3 },
          { day: 'Tuesday', duration: 32, stress: 2 },
          { day: 'Wednesday', duration: 38, stress: 2 },
          { day: 'Thursday', duration: 55, stress: 4 },
          { day: 'Friday', duration: 65, stress: 5 },
          { day: 'Saturday', duration: 78, stress: 6 },
          { day: 'Sunday', duration: 42, stress: 3 }
        ],
        routeEfficiency: [
          { route: 'Calm Essentials', efficiency: 92 },
          { route: 'Quick Grab', efficiency: 78 },
          { route: 'Sensory-Friendly', efficiency: 95 },
          { route: 'Express Checkout', efficiency: 65 }
        ],
        calmZoneUsage: [
          { zone: 'Quiet Reading Corner', usage: 85 },
          { zone: 'Spacious Produce', usage: 72 },
          { zone: 'Dimmed Electronics', usage: 58 },
          { zone: 'Wellness Corner', usage: 91 }
        ]
      };

      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  };

  const addToShoppingList = (item: ShoppingItem) => {
    setShoppingList(prev => [...prev, item]);
  };

  const removeFromShoppingList = (itemId: string) => {
    setShoppingList(prev => prev.filter(item => item.id !== itemId));
  };

  const updateShoppingItem = (itemId: string, updates: Partial<ShoppingItem>) => {
    setShoppingList(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      )
    );
  };

  return (
    <StoreContext.Provider value={{
      storeData,
      routes,
      shoppingList,
      analytics,
      isLoading,
      refreshStoreData,
      addToShoppingList,
      removeFromShoppingList,
      updateShoppingItem
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};