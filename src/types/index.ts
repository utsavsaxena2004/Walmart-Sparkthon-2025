export interface User {
  id: string;
  name: string;
  email: string;
  profile: UserProfile;
  createdAt: string;
}

export interface UserProfile {
  sensoryPreferences: SensoryPreferences;
  shoppingPreferences: ShoppingPreferences;
  allergens: string[];
  preferredBrands: string[];
  emergencyContact?: EmergencyContact;
}

export interface SensoryPreferences {
  lightSensitivity: 'low' | 'medium' | 'high';
  soundSensitivity: 'low' | 'medium' | 'high';
  crowdTolerance: 'low' | 'medium' | 'high';
  preferredShoppingTimes: string[];
}

export interface ShoppingPreferences {
  routeType: 'quickest' | 'calmest' | 'balanced';
  assistanceLevel: 'minimal' | 'moderate' | 'full';
  notifications: boolean;
  arGlasses: boolean;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface StoreData {
  occupancy: number;
  soundLevel: number;
  avgWaitTime: number;
  calmZones: CalmZone[];
  lastUpdated: string;
}

export interface CalmZone {
  id: string;
  name: string;
  location: { x: number; y: number };
  type: 'quiet' | 'spacious' | 'dimmed';
  available: boolean;
}

export interface Route {
  id: string;
  name: string;
  estimatedTime: number;
  stressLevel: 'low' | 'medium' | 'high';
  waypoints: Waypoint[];
  avoidsCrowds: boolean;
}

export interface Waypoint {
  id: string;
  location: { x: number; y: number };
  department: string;
  estimatedCrowdLevel: number;
  soundLevel: number;
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  location: { x: number; y: number };
  preferredBrand?: string;
  allergenWarning: boolean;
  autoReorder: boolean;
  lastPurchased?: string;
}

export interface AnalyticsData {
  stressLevels: Array<{ time: string; level: number }>;
  shoppingPatterns: Array<{ day: string; duration: number; stress: number }>;
  routeEfficiency: Array<{ route: string; efficiency: number }>;
  calmZoneUsage: Array<{ zone: string; usage: number }>;
}