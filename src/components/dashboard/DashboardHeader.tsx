
import React from 'react';

interface DashboardHeaderProps {
  username: string;
  lastLogin: string;
  balance?: number;
  avatarUrl?: string | null;
}

export const DashboardHeader = ({ username, lastLogin, balance, avatarUrl }: DashboardHeaderProps) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center mr-4">
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg font-semibold text-purple-600">
                {username?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Hello, <span className="text-purple-600">{username}</span>!
            </h1>
            <p className="text-sm text-gray-500">
              {lastLogin ? `You last logged in at: ${lastLogin}` : 'Welcome to your dashboard!'}
            </p>
          </div>
        </div>
        {balance !== undefined && (
          <div className="bg-green-100 px-4 py-2 rounded-lg">
            <p className="text-sm text-green-600 font-medium">Available Balance</p>
            <p className="text-2xl font-bold text-green-700">${balance.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
};
