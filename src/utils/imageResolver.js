/**
 * Image Resolver Utility
 * Handles UUID-based image references from the CDN service
 */

const CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_BASEURL ;
const TENANT_HEADER = process.env.NEXT_PUBLIC_TENANT_HEADER;

export function isUUID(str) {
  if (!str || typeof str !== 'string') return false;
  
  // UUID v4 pattern: 8-4-4-4-12 hexadecimal characters
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidPattern.test(str);
}
export function getCdnHeaders() {
  const headers = {};
  
  if (TENANT_HEADER) {
    headers['X-Tenant'] = TENANT_HEADER;
  }
  
  return headers;
}
/**
 * Resolve image value to a usable URL
 * @param {string} imageValue - UUID, URL, or path
 * @returns {string} - Resolved URL or empty string
 */
export function resolveImageUrl(imageValue) {
  // Return empty string for null/undefined
  if (!imageValue) return '';
  
  // If it's a UUID, construct the CDN URL
  if (isUUID(imageValue)) {
    // Ensure we have the full CDN URL with /api/temporary-url/
    return `${CDN_BASE_URL}/api/temporary-url/${imageValue}`;
  }
  
  // Filter out placeholder URLs - treat them as missing images
  if (typeof imageValue === 'string' && 
      (imageValue.includes('placeholder.com') || 
       imageValue.includes('via.placeholder') ||
       imageValue.includes('placehold'))) {
    return ''; // Return empty to trigger fallback
  }
  
  // If it's already a full URL (and not a placeholder), return as-is
  if (imageValue.startsWith('http://') || imageValue.startsWith('https://')) {
    return imageValue;
  }
  
  // If it's a relative path, return as-is (for local assets)
  if (imageValue.startsWith('/')) {
    return imageValue;
  }
  
  // Default: return as-is
  return imageValue;
}



/**
 * Resolve multiple image URLs
 * @param {string[]} images - Array of image values
 * @returns {string[]} - Array of resolved URLs
 */
export function resolveImageUrls(images) {
  if (!Array.isArray(images)) return [];
  return images.map(resolveImageUrl).filter(Boolean);
}

/**
 * Get fallback image based on type
 * @param {string} type - Type of fallback (product, brand, category, user)
 * @returns {string} - Fallback image path
 */
export function getFallbackImage(type = 'product') {
  const fallbacks = {
    product: '/luxury-product-showcase.jpg',
    brand: '/placeholder-brand.png',
    category: '/placeholder-category.png',
    user: '/placeholder-user.png',
  };
  
  return fallbacks[type] || fallbacks.product;
}

export function resolveProductImages(product) {
  if (!product) return null;
  
  return {
    ...product,
    thumbnail: resolveImageUrl(product.thumbnail) || getFallbackImage('product'),
    images: product.images ? resolveImageUrls(product.images) : [],
  };
}

export function resolveBrandImage(brand) {
  if (!brand) return null;
  
  return {
    ...brand,
    logo: resolveImageUrl(brand.logo) || getFallbackImage('brand'),
    image: resolveImageUrl(brand.image) || getFallbackImage('brand'),
  };
}

/**
 * Resolve category image with fallback
 * @param {object} category - Category object
 * @returns {object} - Category with resolved image URL
 */
export function resolveCategoryImage(category) {
  if (!category) return null;
  
  return {
    ...category,
    image: resolveImageUrl(category.image) || getFallbackImage('category'),
  };
}
