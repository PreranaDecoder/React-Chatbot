import React from 'react';
import { User as UserIcon, Settings, LogOut } from 'lucide-react';
import type { User } from '../types';

interface UserProfileProps {
  user: User;
  onLogout: () => void;
}

export function UserProfile({ user, onLogout }: UserProfileProps) {
  return (
    <div className="border-b border-secondary p-4 bg-secondary-light">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center float">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <UserIcon className="w-6 h-6 text-secondary" />
            )}
          </div>
          <div>
            <h3 className="text-white font-medium">{user.name}</h3>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-400 hover:text-primary" />
          </button>
          <button 
            onClick={onLogout}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 text-gray-400 hover:text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
}