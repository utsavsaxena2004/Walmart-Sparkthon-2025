import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<User['profile']>) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    checkSession();
    
    // Only listen for auth changes if Supabase is properly configured
    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          await loadUserProfile(session.user.id);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkSession = async () => {
    try {
      // If Supabase is not configured, skip to localStorage fallback
      if (!isSupabaseConfigured) {
        throw new Error('Supabase not configured');
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await loadUserProfile(session.user.id);
      }
    } catch (error) {
      console.log('Using demo mode - Supabase not configured');
      // Fallback to localStorage for demo
      const storedUser = localStorage.getItem('neurocart-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserProfile = async (userId: string) => {
    try {
      if (!isSupabaseConfigured) {
        throw new Error('Supabase not configured');
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      if (profile) {
        const userData: User = {
          id: profile.user_id,
          name: profile.name,
          email: '', // Will be filled from auth user
          profile: {
            sensoryPreferences: profile.sensory_preferences || {
              lightSensitivity: 'medium',
              soundSensitivity: 'medium',
              crowdTolerance: 'medium',
              preferredShoppingTimes: []
            },
            shoppingPreferences: profile.shopping_preferences || {
              routeType: 'balanced',
              assistanceLevel: 'moderate',
              notifications: true,
              arGlasses: false
            },
            allergens: profile.allergens || [],
            preferredBrands: profile.preferred_brands || [],
            emergencyContact: profile.emergency_contact
          },
          createdAt: profile.created_at
        };
        setUser(userData);
      }
    } catch (error) {
      console.log('Using demo profile data');
      // Fallback to demo data
      loadDemoUser();
    }
  };

  const loadDemoUser = () => {
    const mockUser: User = {
      id: '1',
      name: 'Festival', // Changed from 'Alex Johnson' to 'Festival'
      email: 'alex@example.com',
      profile: {
        sensoryPreferences: {
          lightSensitivity: 'medium',
          soundSensitivity: 'high',
          crowdTolerance: 'low',
          preferredShoppingTimes: ['9:00 AM', '2:00 PM']
        },
        shoppingPreferences: {
          routeType: 'calmest',
          assistanceLevel: 'moderate',
          notifications: true,
          arGlasses: true
        },
        allergens: ['peanuts', 'shellfish'],
        preferredBrands: ['Organic Valley', 'Great Value'],
        emergencyContact: {
          name: 'Sarah Johnson',
          phone: '555-0123',
          relationship: 'Partner'
        }
      },
      createdAt: new Date().toISOString()
    };
    setUser(mockUser);
    localStorage.setItem('neurocart-user', JSON.stringify(mockUser));
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // If Supabase is not configured, use demo login
      if (!isSupabaseConfigured) {
        console.log('Demo mode: Simulating login...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        loadDemoUser();
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.user) {
        await loadUserProfile(data.user.id);
      }
    } catch (error) {
      console.log('Login failed, using demo mode:', error);
      // Fallback to demo login
      await new Promise(resolve => setTimeout(resolve, 1000));
      loadDemoUser();
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User>) => {
    setIsLoading(true);
    try {
      // If Supabase is not configured, use demo registration
      if (!isSupabaseConfigured) {
        console.log('Demo mode: Simulating registration...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        loadDemoUser();
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: userData.email || '',
        password: 'demo-password', // In real app, this would come from form
        options: {
          data: {
            name: userData.name
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: data.user.id,
            name: userData.name || '',
            sensory_preferences: {
              lightSensitivity: 'medium',
              soundSensitivity: 'medium',
              crowdTolerance: 'medium',
              preferredShoppingTimes: []
            },
            shopping_preferences: {
              routeType: 'balanced',
              assistanceLevel: 'moderate',
              notifications: true,
              arGlasses: false
            },
            allergens: [],
            preferred_brands: []
          });

        if (profileError) throw profileError;
        await loadUserProfile(data.user.id);
      }
    } catch (error) {
      console.log('Registration failed, using demo mode:', error);
      // Fallback to demo registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      loadDemoUser();
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.log('Logout error (using demo mode):', error);
    }
    setUser(null);
    localStorage.removeItem('neurocart-user');
  };

  const updateProfile = async (profileUpdates: Partial<User['profile']>) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      if (!isSupabaseConfigured) {
        throw new Error('Supabase not configured');
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          sensory_preferences: profileUpdates.sensoryPreferences,
          shopping_preferences: profileUpdates.shoppingPreferences,
          allergens: profileUpdates.allergens,
          preferred_brands: profileUpdates.preferredBrands,
          emergency_contact: profileUpdates.emergencyContact,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      const updatedUser = {
        ...user,
        profile: {
          ...user.profile,
          ...profileUpdates
        }
      };

      setUser(updatedUser);
      localStorage.setItem('neurocart-user', JSON.stringify(updatedUser));
    } catch (error) {
      console.log('Profile update using demo mode:', error);
      // Fallback to localStorage update
      const updatedUser = {
        ...user,
        profile: {
          ...user.profile,
          ...profileUpdates
        }
      };
      setUser(updatedUser);
      localStorage.setItem('neurocart-user', JSON.stringify(updatedUser));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};