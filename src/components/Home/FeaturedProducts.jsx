import React from 'react'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'


export default async function FeaturedProductsSection() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/client/v1/featureProducts`, {
    headers: {
      "X-Tenant": process.env.NEXT_PUBLIC_TENANT_HEADER,
    },
  });
        const res = await response.json();
        const data=res.data || [];
  return (
    
      <section className="py-12 sm:py-16 md:py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Featured Products
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium products that our customers love most.
            </p>
          </div>
          
          <div className="mb-8 sm:mb-12">
            <FeaturedProducts featured={data} />
          </div>
          
          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl group"
            >
              View All Products
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
  )
}
