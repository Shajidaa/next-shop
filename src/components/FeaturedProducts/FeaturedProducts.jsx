"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { 
  Loader2, 
  ChevronLeft, 
  ChevronRight, 
  Star,
  TrendingUp,
  Package
} from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const FeaturedProducts = ({featured=[]}) => {


  if (!featured || featured.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Package className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No Featured Products
        </h3>
        <p className="text-muted-foreground">No featured products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Featured Badge */}
      <div className="flex items-center justify-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 rounded-full text-accent font-semibold text-sm">
          <Star className="w-4 h-4 fill-current" />
          Handpicked for You
        </div>
      </div>

      {/* Products Swiper */}
      <div className="relative">

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            prevEl: '.featured-swiper-button-prev',
            nextEl: '.featured-swiper-button-next',
          }}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSlideChange={(swiper) => {
            const counter = document.querySelector('.featured-swiper-counter');
            
            if (counter) {
              counter.textContent = swiper.realIndex + 1;
            }
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            480: {
              slidesPerView: 1.2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1536: {
              slidesPerView: 4,
              spaceBetween: 28,
            },
          }}
          className="!pb-16 featured-products-swiper"
        >
          {featured.map((product) => (
            <SwiperSlide key={product.productId}>
              <div className="h-full">
                <ProductCard product={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="featured-swiper-button-prev absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-card border border-border/50 rounded-full flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 shadow-lg hover:shadow-xl group">
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
        </button>
        
        <button className="featured-swiper-button-next absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-card border border-border/50 rounded-full flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 shadow-lg hover:shadow-xl group">
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
        </button>

        {/* Simple Counter */}
        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-20 bg-card/90 backdrop-blur-sm border border-border/50 rounded-lg px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium text-muted-foreground">
          <span className="featured-swiper-counter">1</span> / <span className="featured-swiper-total">{featured.length}</span>
        </div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .featured-products-swiper .swiper-pagination {
          bottom: 8px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: auto !important;
        }
        
        .featured-products-swiper .swiper-pagination-bullet {
          width: 6px !important;
          height: 6px !important;
          margin: 0 3px !important;
          background: var(--muted-foreground) !important;
          opacity: 0.3 !important;
          transition: all 0.3s ease !important;
        }
        
        .featured-products-swiper .swiper-pagination-bullet-active {
          background: var(--accent) !important;
          opacity: 1 !important;
          transform: scale(1.3) !important;
        }
        
        .featured-swiper-button-prev,
        .featured-swiper-button-next {
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        .featured-products-swiper:hover .featured-swiper-button-prev,
        .featured-products-swiper:hover .featured-swiper-button-next {
          opacity: 1;
        }

        /* Mobile specific styles */
        @media (max-width: 640px) {
          .featured-products-swiper .swiper-pagination {
            bottom: 4px !important;
          }
          
          .featured-products-swiper .swiper-pagination-bullet {
            width: 5px !important;
            height: 5px !important;
            margin: 0 2px !important;
          }
          
          .featured-swiper-button-prev,
          .featured-swiper-button-next {
            opacity: 1 !important;
          }
        }

        /* Tablet specific styles */
        @media (min-width: 641px) and (max-width: 1024px) {
          .featured-products-swiper .swiper-pagination-bullet {
            width: 7px !important;
            height: 7px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturedProducts;
