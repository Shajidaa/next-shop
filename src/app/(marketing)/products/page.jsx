import ProductPageSection from "@/components/products/ProductPageSection";
import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "Products | Next Shop",
};

function ProductsLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-4" />
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    </div>
  );
}

export default async function ProductPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/client/v1/products`,
    {
      headers: {
        "X-Tenant": process.env.NEXT_PUBLIC_TENANT_HEADER,
      },
    }
  );

  const result = await response.json();
  const data = result?.data || [];

  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductPageSection products={data} />
    </Suspense>
  );
}
