
import React from 'react';

interface DashboardStatsProps {
  stats: {
    jobsFinished: number;
    offers: number;
    offerSales: number;
    moneyEarned: number;
  };
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="JOBS FINISHED" 
        value={stats.jobsFinished} 
        bgColor="bg-white" 
        textColor="text-purple-600"
      />
      <StatCard 
        title="OFFERS" 
        value={stats.offers} 
        bgColor="bg-white" 
        textColor="text-blue-600"
      />
      <StatCard 
        title="OFFER SALES" 
        value={stats.offerSales} 
        bgColor="bg-white" 
        textColor="text-green-600"
      />
      <StatCard 
        title="MONEY EARNED" 
        value={`$${stats.moneyEarned.toFixed(2)}`} 
        bgColor="bg-gradient-to-br from-purple-600 to-purple-700" 
        textColor="text-white"
        titleColor="text-white"
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number | string;
  bgColor: string;
  textColor: string;
  titleColor?: string;
}

const StatCard = ({ title, value, bgColor, textColor, titleColor = "text-gray-700" }: StatCardProps) => (
  <div className={`${bgColor} border rounded-lg shadow-sm p-4`}>
    <h3 className={`text-sm font-medium ${titleColor} mb-1`}>{title}</h3>
    <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
  </div>
);
