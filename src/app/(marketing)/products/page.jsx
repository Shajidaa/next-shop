import ProductPageSection from "@/components/products/ProductPageSection";
import React from "react";
export const metadata = {
  title: "Products | Next Shop",
};
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

  return <ProductPageSection products={data} />;
}
