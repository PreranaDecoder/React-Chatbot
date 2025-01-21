import React, { useState } from 'react';
import { LogIn, UserPlus, Lock } from 'lucide-react';

interface AuthProps {
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string) => void;
}

export function Auth({ onLogin, onSignup }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(email, password);
    } else {
      onSignup(email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
      <div className="max-w-md w-full space-y-8 p-4 sm:p-8 bg-secondary-light rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary text-white rounded-full flex items-center justify-center float">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-white sparkle">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-secondary border border-primary/30 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-secondary border border-primary/30 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-secondary bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 pulse"
          >
            {isLogin ? (
              <>
                <LogIn className="w-4 h-4" />
                Sign in
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Sign up
              </>
            )}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-primary hover:text-primary-light transition-colors duration-200"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}