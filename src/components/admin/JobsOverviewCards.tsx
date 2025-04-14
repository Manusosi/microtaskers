
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, PauseCircle, FileText } from "lucide-react";

interface JobStats {
  active: number;
  completed: number;
  paused: number;
  draft: number;
}

interface JobsOverviewCardsProps {
  jobStats: JobStats;
}

export const JobsOverviewCards = ({ jobStats }: JobsOverviewCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Jobs</p>
              <h3 className="text-2xl font-bold text-gray-900">{jobStats.active}</h3>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Currently running</span>
              <span className="font-medium text-green-600">Live</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Completed Jobs</p>
              <h3 className="text-2xl font-bold text-gray-900">{jobStats.completed}</h3>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Finished successfully</span>
              <span className="font-medium text-blue-600">Archive</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
              <PauseCircle className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Paused Jobs</p>
              <h3 className="text-2xl font-bold text-gray-900">{jobStats.paused}</h3>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Temporarily stopped</span>
              <span className="font-medium text-amber-600">On hold</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Draft Jobs</p>
              <h3 className="text-2xl font-bold text-gray-900">{jobStats.draft}</h3>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Not published</span>
              <span className="font-medium text-gray-600">Pending</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
