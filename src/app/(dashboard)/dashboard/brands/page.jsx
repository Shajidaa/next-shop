"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import BrandsSections from "@/components/dashboard/BrandsSections";

export default function DashboardBrandsPage() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/client/v1/brands`,
          {
            headers: {
              "X-Tenant": process.env.NEXT_PUBLIC_TENANT_HEADER,
            },
          }
        );
        
        const data = await response.json();
        
        if (response.ok && data) {
          const brandsData = data.data || data;
          setBrands(brandsData);
        } else {
          console.error("Failed to fetch brands:", data);
          setBrands([]);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading brands...</p>
        </div>
      </div>
    );
  }

  return <BrandsSections brands={brands} loading={loading} />;
}
