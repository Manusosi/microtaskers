
import React from 'react';

interface DashboardHeaderProps {
  username: string;
  lastLogin: string;
}

export const DashboardHeader = ({ username, lastLogin }: DashboardHeaderProps) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-6">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
          <span className="text-lg font-semibold text-purple-600">
            {username?.charAt(0)?.toUpperCase() || 'U'}
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Hello, <span className="text-purple-600">{username}</span>!
          </h1>
          <p className="text-sm text-gray-500">
            You last logged in at: {lastLogin}
          </p>
        </div>
      </div>
    </div>
  );
};
