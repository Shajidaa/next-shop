"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Loader2, 
  ArrowRight, 
  Package,
  Sparkles,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function CategoryShowcase() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Enhanced category icons and colors mapping
  const getCategoryData = (categoryName) => {
    const name = categoryName.toLowerCase();

    
    return { 
      icon: '📦', 
      gradient: 'from-gray-500 to-slate-500', 
      bg: 'from-gray-50 to-slate-50' 
    };
  };

  if (loading) {
    return (
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent font-semibold text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              Shop by Category
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Our Categories
            </h2>
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-4" />
                <p className="text-muted-foreground">Loading categories...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent font-semibold text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              Shop by Category
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Our Categories
            </h2>
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No categories available at the moment.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-30"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent font-semibold text-sm mb-6 animate-in slide-in-from-top-5 duration-700">
            <Sparkles className="w-4 h-4" />
            Shop by Category
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-in slide-in-from-top-5 duration-700 delay-100">
            Explore Our Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-in slide-in-from-top-5 duration-700 delay-200">
            Discover amazing products organized by categories. Find exactly what you're looking for.
          </p>
        </div>

        {/* Categories Swiper */}
        <div className="relative animate-in slide-in-from-bottom-5 duration-700 delay-300">
          {/* Slide Counter */}
          <div className="absolute top-4 right-4 z-20 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full px-3 py-1 text-sm font-medium text-muted-foreground">
            <span className="swiper-counter">1</span> / <span className="swiper-total">{categories.length}</span>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              prevEl: '.category-swiper-button-prev',
              nextEl: '.category-swiper-button-next',
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-muted-foreground/30 !w-3 !h-3 !mx-2',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-accent !w-8 !h-3 !rounded-full',
              renderBullet: function (index, className) {
                return `<span class="${className} transition-all duration-300 cursor-pointer hover:!bg-accent/70"></span>`;
              },
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onSlideChange={(swiper) => {
              const counter = document.querySelector('.swiper-counter');
              const progressBar = document.querySelector('.swiper-progress-bar');
              const totalSlides = Math.max(categories.length - 4, 1);
              
              if (counter) {
                counter.textContent = swiper.realIndex + 1;
              }
              
              if (progressBar) {
                const progress = ((swiper.realIndex + 1) / totalSlides) * 100;
                progressBar.style.width = `${Math.min(progress, 100)}%`;
              }
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              480: {
                slidesPerView: 1.5,
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
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
              1536: {
                slidesPerView: 6,
                spaceBetween: 28,
              },
            }}
            className="!pb-16"
          >
            {categories.map((category) => {
              const categoryData = getCategoryData(category.categoryName);
              
              return (
                <SwiperSlide key={category.categoryId}>
                  <Link
                    href={`/products?category=${category.categoryId}`}
                    className="group block h-full"
                  >
                    <div className="bg-card border border-border/50 rounded-2xl p-6 h-full hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                      {/* Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${categoryData.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      
                      {/* Content */}
                      <div className="relative z-10 text-center">
                        {/* Category Icon */}
                        <div className={`w-20 h-20 bg-gradient-to-br ${categoryData.gradient} rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                          <span className="text-4xl filter drop-shadow-sm">{categoryData.icon}</span>
                        </div>
                        
                        {/* Category Info */}
                        <h3 className="text-xl line-clamp-1  font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                          {category.categoryName}
                        </h3>
                        
                       
                        
                    
                      </div>

                      {/* Hover Effect Border */}
                      <div className={`absolute inset-0 border-2 border-transparent bg-gradient-to-r ${categoryData.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                           style={{ padding: '2px' }}>
                        <div className="w-full h-full bg-card rounded-2xl"></div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="category-swiper-button-prev absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-card border border-border/50 rounded-full flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 shadow-lg hover:shadow-xl group">
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
          </button>
          
          <button className="category-swiper-button-next absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-card border border-border/50 rounded-full flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 shadow-lg hover:shadow-xl group">
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
          </button>

          {/* Progress Bar */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-20 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full px-3 py-2 sm:px-4 sm:py-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-16 sm:w-24 h-1 bg-muted rounded-full overflow-hidden">
                <div className="swiper-progress-bar h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300" style={{ width: `${(1 / Math.max(categories.length - 4, 1)) * 100}%` }}></div>
              </div>
              <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                <span className="swiper-counter">1</span> of <span className="swiper-total">{Math.max(categories.length - 4, 1)}</span>
              </span>
            </div>
          </div>
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12 animate-in slide-in-from-bottom-5 duration-700 delay-500">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            <TrendingUp className="w-5 h-5" />
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 0 !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 8px !important;
        }
        
        .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          margin: 0 !important;
          border-radius: 50% !important;
          transition: all 0.3s ease !important;
          opacity: 1 !important;
          background: var(--muted-foreground) !important;
          opacity: 0.3 !important;
        }
        
        .swiper-pagination-bullet:hover {
          opacity: 0.7 !important;
          transform: scale(1.1) !important;
        }
        
        .swiper-pagination-bullet-active {
          width: 32px !important;
          height: 12px !important;
          border-radius: 6px !important;
          background: var(--accent) !important;
          opacity: 1 !important;
          transform: scale(1) !important;
        }
        
        .swiper-pagination-bullet-active:hover {
          opacity: 1 !important;
          transform: scale(1.05) !important;
        }
        
        .category-swiper-button-prev,
        .category-swiper-button-next {
          opacity: 0;
          transform: translateY(-50%) scale(0.8);
          transition: all 0.3s ease;
        }
        
        .swiper:hover .category-swiper-button-prev,
        .swiper:hover .category-swiper-button-next {
          opacity: 1;
          transform: translateY(-50%) scale(1);
        }
        
        .category-swiper-button-prev {
          transform: translateY(-50%) translateX(-16px) scale(0.8);
        }
        
        .category-swiper-button-next {
          transform: translateY(-50%) translateX(16px) scale(0.8);
        }
        
        .swiper:hover .category-swiper-button-prev {
          transform: translateY(-50%) translateX(-16px) scale(1);
        }
        
        .swiper:hover .category-swiper-button-next {
          transform: translateY(-50%) translateX(16px) scale(1);
        }

        /* Enhanced pagination container */
        .swiper-pagination-bullets {
          background: rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 20px !important;
          padding: 8px 16px !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }

        /* Responsive pagination */
        @media (max-width: 640px) {
          .swiper-pagination-bullet {
            width: 8px !important;
            height: 8px !important;
          }
          
          .swiper-pagination-bullet-active {
            width: 24px !important;
            height: 8px !important;
            border-radius: 4px !important;
          }
        }
      `}</style>
    </section>
  );
}