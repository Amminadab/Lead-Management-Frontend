"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import LeadForm from "@/components/LeadForm";
import LeadList from "@/components/LeadList";
import { LeadFormSkeleton } from "@/components/LeadFormSkeleton";
import { LeadTableSkeleton } from "@/components/LeadTableSkeleton";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLeadAdded = () => {
    // Increment the refresh trigger to cause the LeadList to refetch
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Header />

      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8 mt-64">
          Lead Management Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lead Form */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-24">
              {isLoading ? (
                <LeadFormSkeleton />
              ) : (
                <LeadForm onLeadAdded={handleLeadAdded} />
              )}
            </div>
          </div>

          {/* Lead List */}
          <div className="lg:col-span-2 space-y-6">
            {isLoading ? (
              <LeadTableSkeleton />
            ) : (
              <LeadList refreshTrigger={refreshTrigger} />
            )}
          </div>
        </div>
      </main>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            style: {
              background: "#22c55e",
            },
          },
          error: {
            style: {
              background: "#ef4444",
            },
          },
        }}
      />
    </div>
  );
}
