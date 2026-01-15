"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { resolveImageUrl, getFallbackImage } from '@/utils/imageResolver';

export default function CDNImage({ 
  src, 
  alt = 'Image', 
  fallbackType = 'product',
  className = '',
  fill = false,
  width,
  height,
  priority = false,
  quality = 75,
  sizes,
  onError: customOnError,
  ...props 
}) {
  const [imgSrc, setImgSrc] = useState(() => {
    const resolved = resolveImageUrl(src);
    return resolved || getFallbackImage(fallbackType);
  });
  const [hasError, setHasError] = useState(false);

  // Update image source when src prop changes
  useEffect(() => {
    const resolved = resolveImageUrl(src);
    if (resolved) {
      setImgSrc(resolved);
      setHasError(false);
    } else {
      setImgSrc(getFallbackImage(fallbackType));
    }
  }, [src, fallbackType]);

  const handleError = (error) => {
    if (!hasError) {
      console.warn(`Failed to load image: ${imgSrc}`);
      setHasError(true);
      setImgSrc(getFallbackImage(fallbackType));
      
      if (customOnError) {
        customOnError(error);
      }
    }
  };

  // Check if the image is from our CDN
  const isCDNUrl = imgSrc.includes('cdn-nextshop.prospectbdltd.com');
  
  // Common props for both fill and fixed size images
  const commonProps = {
    src: imgSrc,
    alt,
    className,
    onError: handleError,
    quality,
    priority,
    ...props,
  };

  // If it's a CDN URL, unoptimize it to bypass Next.js image optimization
  // This prevents the _next/image?url= proxy
  const unoptimizedProps = isCDNUrl ? { unoptimized: true } : {};

  // Render with fill prop
  if (fill) {
    return (
      <Image
        {...commonProps}
        {...unoptimizedProps}
        fill
        sizes={sizes || '100vw'}
      />
    );
  }

  // Render with fixed dimensions
  if (width && height) {
    return (
      <Image
        {...commonProps}
        {...unoptimizedProps}
        width={width}
        height={height}
        sizes={sizes}
      />
    );
  }

  // Fallback: use fill if no dimensions provided
  console.warn('CDNImage: No width/height or fill prop provided. Using fill as fallback.');
  return (
    <Image
      {...commonProps}
      {...unoptimizedProps}
      fill
      sizes={sizes || '100vw'}
    />
  );
}