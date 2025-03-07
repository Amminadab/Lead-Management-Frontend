"use client";

import { useState, useEffect } from "react";
import { Lead, LeadStatus } from "@/types/lead";
import { getLeads } from "@/services/leadService";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeadTableSkeleton } from "./LeadTableSkeleton";
import { RefreshCw, AlertCircle } from "lucide-react";

// Helper function to get status color
const getStatusBadgeVariant = (
  status: LeadStatus
): "default" | "secondary" | "outline" | "destructive" | "success" => {
  switch (status) {
    case LeadStatus.NEW:
      return "default";
    case LeadStatus.ENGAGED:
      return "secondary";
    case LeadStatus.PROPOSAL_SENT:
      return "outline";
    case LeadStatus.CLOSED_WON:
      return "success";
    case LeadStatus.CLOSED_LOST:
      return "destructive";
    default:
      return "default";
  }
};

// Format date helper
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

type LeadListProps = {
  refreshTrigger: number;
};

export default function LeadList({ refreshTrigger }: LeadListProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getLeads();
        setLeads(data);
      } catch (err) {
        setError("Failed to fetch leads. Please try again later.");
        toast.error("Error loading leads");
        console.error("Error fetching leads:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, [refreshTrigger]);

  if (isLoading) {
    return <LeadTableSkeleton />;
  }

  if (error) {
    return (
      <Card className="border-red-500 dark:border-red-700">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-red-500 dark:text-red-400" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Error Loading Leads</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {error}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (leads.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
            <div className="rounded-full bg-primary/10 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10 text-primary"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">No leads found</h3>
            <p className="text-sm text-muted-foreground">
              Add your first lead using the form on the left.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          <span>All Leads</span>
          <Badge>{leads.length} Total</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead._id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={getStatusBadgeVariant(lead.status as LeadStatus)}
                    >
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatDate(lead.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
