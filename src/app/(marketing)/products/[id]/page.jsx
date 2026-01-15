
import Link from "next/link";
import ProductDetails from "@/components/Home/ProductDetails";

export const metadata = {
  title: 'Product Details | Next Shop',
};

export default async function ProductDetailsPage({ params }) {
  // Await params to get the id
  const { id } = await params;
  
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/client/v1/products/${id}`, {
      headers: {
        "X-Tenant": process.env.NEXT_PUBLIC_TENANT_HEADER,
      },
    });
    const data = await response.json();
    const productData = data.data || data;

   

    return (
      <div className="min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                Products
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium truncate">{productData.productName}</span>
            </div>
          </div>
        </div>
        <ProductDetails product={productData} />
      </div>
    );
  
}
