
import React from 'react';

interface DashboardHeaderProps {
  username: string;
  lastLogin: string;
  balance?: number;
}

export const DashboardHeader = ({ username, lastLogin, balance }: DashboardHeaderProps) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
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
