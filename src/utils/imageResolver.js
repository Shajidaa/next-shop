/**
 * Image Resolver Utility
 * Handles UUID-based image references from the CDN service
 */

const CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_BASEURL;

/**
 * Check if a string is a UUID
 * @param {string} str - String to check
 * @returns {boolean}
 */
export function isUUID(str) {
  if (!str || typeof str !== 'string') return false;
  
  // UUID v4 pattern
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidPattern.test(str);
}

/**
 * Resolve image URL from UUID or return the URL as-is
 * @param {string} imageValue - UUID or URL string
 * @returns {string} - Resolved CDN URL or original URL
 */
export function resolveImageUrl(imageValue) {
  // Return empty string for null/undefined
  if (!imageValue) return '';
  
  // If it's a UUID, construct the CDN URL
  if (isUUID(imageValue)) {
    return `${CDN_BASE_URL}/${imageValue}`;
  }
  
  // If it's already a full URL, return as-is
  if (imageValue.startsWith('http://') || imageValue.startsWith('https://')) {
    return imageValue;
  }
  
  // If it's a relative path, return as-is (for local assets)
  if (imageValue.startsWith('/')) {
    return imageValue;
  }
  
  // Default: assume it's a UUID without dashes or treat as relative path
  return `${CDN_BASE_URL}/${imageValue}`;
}

/**
 * Resolve multiple image URLs
 * @param {string[]} images - Array of UUIDs or URLs
 * @returns {string[]} - Array of resolved URLs
 */
export function resolveImageUrls(images) {
  if (!Array.isArray(images)) return [];
  return images.map(resolveImageUrl).filter(Boolean);
}

/**
 * Get fallback image URL
 * @param {string} type - Type of fallback (product, brand, category, user)
 * @returns {string} - Fallback image URL
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

/**
 * Resolve product images with fallback
 * @param {object} product - Product object
 * @returns {object} - Product with resolved image URLs
 */
export function resolveProductImages(product) {
  if (!product) return null;
  
  return {
    ...product,
    thumbnail: resolveImageUrl(product.thumbnail) || getFallbackImage('product'),
    images: product.images ? resolveImageUrls(product.images) : [],
    // Preserve original values for reference
    _originalThumbnail: product.thumbnail,
    _originalImages: product.images,
  };
}

/**
 * Resolve brand image with fallback
 * @param {object} brand - Brand object
 * @returns {object} - Brand with resolved image URL
 */
export function resolveBrandImage(brand) {
  if (!brand) return null;
  
  return {
    ...brand,
    logo: resolveImageUrl(brand.logo) || getFallbackImage('brand'),
    image: resolveImageUrl(brand.image) || getFallbackImage('brand'),
    _originalLogo: brand.logo,
    _originalImage: brand.image,
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
    _originalImage: category.image,
  };
}
