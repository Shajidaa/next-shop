

import HeroSection from "@/components/HeroSection";
import CategoryShowcase from "@/components/CategoryShowcase";
import FeaturesSection from "@/components/Home/FeaturesSection";
import CTA from "@/components/Home/CTA";
import FeaturedProductsSection from "@/components/Home/FeaturedProducts";
import Category from "@/components/Home/Category";

export default function Home() {


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Category Showcase Section */}
      <Category/>

     {/* Featured Products Section */}
 
     <FeaturedProductsSection/>
      <CTA/>
   <FeaturesSection />
    </div>
  );
}
