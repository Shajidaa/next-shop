"use client";
import Image from 'next/image';
import { useState } from 'react';
import { resolveImageUrl, getFallbackImage } from '@/utils/imageResolver';

/**
 * CDNImage Component
 * Automatically resolves UUID-based image references to CDN URLs
 * Handles fallback images on error
 */
export default function CDNImage({ 
  src, 
  alt, 
  fallbackType = 'product',
  className = '',
  fill,
  width,
  height,
  ...props 
}) {
  const [imgSrc, setImgSrc] = useState(resolveImageUrl(src) || getFallbackImage(fallbackType));
  const [isError, setIsError] = useState(false);
  const [useNativeImg, setUseNativeImg] = useState(false);

  const handleError = () => {
    if (!isError) {
      setIsError(true);
      // Try using native img tag first for external URLs
      if (!useNativeImg && imgSrc && (imgSrc.includes('placeholder') || !imgSrc.includes('cdn-nextshop'))) {
        setUseNativeImg(true);
      } else {
        // Fall back to placeholder
        setImgSrc(getFallbackImage(fallbackType));
        setUseNativeImg(false);
      }
    }
  };

  // Use native img for external placeholder URLs to avoid Next.js config issues
  if (useNativeImg || (imgSrc && imgSrc.includes('placeholder'))) {
    return (
      <img
        src={imgSrc}
        alt={'Image'}
        className={className}
        onError={handleError}
        style={fill ? { width: '100%', height: '100%', objectFit: 'cover' } : undefined}
        {...(width && !fill ? { width } : {})}
        {...(height && !fill ? { height } : {})}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt || 'Image'}
      className={className}
      onError={handleError}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      {...props}
    />
  );
}
