import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../contexts/AuthContext';

interface LoginFormProps {
  onToggleForm: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login, isLoading } = useAuth();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await login(email, password);
    } catch (error) {
      setErrors({ email: 'Invalid email or password' });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
        <p className="text-gray-600">Sign in to your NeuroCart account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="email"
          placeholder="Enter your email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          icon={<Mail className="w-5 h-5 text-gray-400" />}
        />

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            icon={<Lock className="w-5 h-5 text-gray-400" />}
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <Button
          type="submit"
          loading={isLoading}
          className="w-full"
          size="lg"
        >
          Sign In
        </Button>

        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onToggleForm}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};