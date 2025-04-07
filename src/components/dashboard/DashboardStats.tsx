
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
        emptyState={stats.jobsFinished === 0}
        emptyText="No jobs completed yet"
      />
      <StatCard 
        title="OFFERS" 
        value={stats.offers} 
        bgColor="bg-white" 
        textColor="text-blue-600"
        emptyState={stats.offers === 0}
        emptyText="No offers yet"
      />
      <StatCard 
        title="OFFER SALES" 
        value={stats.offerSales} 
        bgColor="bg-white" 
        textColor="text-green-600"
        emptyState={stats.offerSales === 0}
        emptyText="No sales yet"
      />
      <StatCard 
        title="MONEY EARNED" 
        value={`$${stats.moneyEarned.toFixed(2)}`} 
        bgColor="bg-gradient-to-br from-purple-600 to-purple-700" 
        textColor="text-white"
        titleColor="text-white"
        emptyState={stats.moneyEarned === 0}
        emptyText="$0.00"
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
  emptyState?: boolean;
  emptyText?: string;
}

const StatCard = ({ 
  title, 
  value, 
  bgColor, 
  textColor, 
  titleColor = "text-gray-700",
  emptyState = false,
  emptyText = "0" 
}: StatCardProps) => (
  <div className={`${bgColor} border rounded-lg shadow-sm p-4`}>
    <h3 className={`text-sm font-medium ${titleColor} mb-1`}>{title}</h3>
    {emptyState ? (
      <p className={`text-lg italic font-medium text-gray-400`}>{emptyText}</p>
    ) : (
      <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
    )}
  </div>
);
