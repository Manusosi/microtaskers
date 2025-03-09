
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Clock, DollarSign, CheckCircle, XCircle, Briefcase, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Job {
  id: number;
  title: string;
  payment: number;
  date: string;
  time: string;
  status: "submitted" | "awaiting review" | "paid" | "declined";
}

interface CompletedJobsTableProps {
  jobs: Job[];
}

export const CompletedJobsTable = ({ jobs }: CompletedJobsTableProps) => {
  const [filter, setFilter] = useState<string | null>(null);
  
  // Count jobs by status
  const jobCounts = {
    submitted: jobs.filter(job => job.status === "submitted").length,
    awaitingReview: jobs.filter(job => job.status === "awaiting review").length,
    paid: jobs.filter(job => job.status === "paid").length,
    declined: jobs.filter(job => job.status === "declined").length,
  };
  
  // Filter jobs based on selected status
  const filteredJobs = filter 
    ? jobs.filter(job => job.status === filter)
    : jobs;
  
  // Calculate total earnings
  const totalEarnings = jobs
    .filter(job => job.status === "paid")
    .reduce((sum, job) => sum + job.payment, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
            <CheckCircle className="mr-1 h-3 w-3" /> submitted
          </Badge>
        );
      case "awaiting review":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">
            <Clock className="mr-1 h-3 w-3" /> awaiting review
          </Badge>
        );
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
            <DollarSign className="mr-1 h-3 w-3" /> paid
          </Badge>
        );
      case "declined":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
            <XCircle className="mr-1 h-3 w-3" /> declined
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-900">Finished Jobs</h3>
          </div>
          <Button variant="outline" size="sm">
            See all
          </Button>
        </div>
        
        {/* Job Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div 
            onClick={() => setFilter("submitted")}
            className={cn(
              "bg-blue-100 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md",
              filter === "submitted" && "ring-2 ring-blue-400"
            )}
          >
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-600">{jobCounts.submitted}</span>
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="mt-2 text-blue-700 font-medium">submitted tasks</div>
          </div>
          
          <div 
            onClick={() => setFilter("awaiting review")}
            className={cn(
              "bg-amber-100 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md",
              filter === "awaiting review" && "ring-2 ring-amber-400"
            )}
          >
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-amber-600">{jobCounts.awaitingReview}</span>
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <div className="mt-2 text-amber-700 font-medium">waiting for employer's review</div>
          </div>
          
          <div 
            onClick={() => setFilter("paid")}
            className={cn(
              "bg-green-100 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md",
              filter === "paid" && "ring-2 ring-green-400"
            )}
          >
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-green-600">{jobCounts.paid}</span>
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="mt-2 text-green-700 font-medium">well done & paid</div>
          </div>
          
          <div 
            onClick={() => setFilter("declined")}
            className={cn(
              "bg-red-100 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md",
              filter === "declined" && "ring-2 ring-red-400"
            )}
          >
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-red-600">{jobCounts.declined}</span>
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="mt-2 text-red-700 font-medium">declined</div>
          </div>
        </div>
        
        {/* Filter Reset Button (only shown when filter is active) */}
        {filter && (
          <div className="mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setFilter(null)}
              className="text-purple-600"
            >
              Clear filter
            </Button>
          </div>
        )}
        
        <div className="overflow-x-auto border rounded-lg">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold">Task ID</TableHead>
                <TableHead className="font-semibold">Job Title</TableHead>
                <TableHead className="font-semibold">Payment</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Date/Time</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium flex items-center">
                    <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                    {job.id}
                  </TableCell>
                  <TableCell>{job.title}</TableCell>
                  <TableCell className="font-medium">${job.payment.toFixed(2)}</TableCell>
                  <TableCell>
                    {getStatusBadge(job.status)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {job.date}
                      <div className="text-gray-500">{job.time}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Search className="h-4 w-4" />
                      </Button>
                      {job.status === "awaiting review" && (
                        <Button variant="ghost" size="sm" className="text-red-500">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Total Earnings */}
        <div className="mt-6 text-right">
          <div className="flex items-center justify-end gap-2">
            <p className="text-lg font-medium text-gray-600">All Time Earnings:</p>
            <p className="text-xl font-bold text-purple-700">${totalEarnings.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
