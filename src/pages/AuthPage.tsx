import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">NeuroCart</h1>
          </div>
          <p className="text-gray-600">
            AI-powered shopping for neurodiverse individuals
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          {isLogin ? (
            <LoginForm onToggleForm={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onToggleForm={() => setIsLogin(true)} />
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Designed with accessibility, safety, and comfort in mind
          </p>
        </div>
      </div>
    </div>
  );
};