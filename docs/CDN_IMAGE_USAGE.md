# CDN Image Resolution System

## Overview
This system automatically converts UUID-based asset identifiers into temporary, signed URLs using our internal File System + CDN API.

## Technical Details

### Backend Response
Product objects contain UUIDs instead of direct URLs:
```json
{
  "productId": "123",
  "productName": "Sample Product",
  "thumbnail": "550e8400-e29b-41d4-a716-446655440000"
}
```

### CDN Endpoint
- Base URL: `https://cdn-nextshop.prospectbdltd.com/api/temporary-url`
- Full URL: `https://cdn-nextshop.prospectbdltd.com/api/temporary-url/{UUID}`

### Environment Variable
```env
NEXT_PUBLIC_CDN_BASEURL=https://cdn-nextshop.prospectbdltd.com/api/temporary-url
```

## Configuration

### next.config.mjs
```javascript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-nextshop.prospectbdltd.com',
        pathname: '/**',
      },
    ],
  },
};
```

## Components & Utilities

### 1. Image Resolver Utility (`src/utils/imageResolver.js`)

#### `isUUID(str)`
Validates if a string is a valid UUID v4.

```javascript
import { isUUID } from '@/utils/imageResolver';

isUUID('550e8400-e29b-41d4-a716-446655440000'); // true
isUUID('not-a-uuid'); // false
```

#### `resolveImageUrl(imageValue)`
Converts UUID to CDN URL or returns URL/path as-is.

```javascript
import { resolveImageUrl } from '@/utils/imageResolver';

// UUID → CDN URL
resolveImageUrl('550e8400-e29b-41d4-a716-446655440000');
// Returns: 'https://cdn-nextshop.prospectbdltd.com/api/temporary-url/550e8400-e29b-41d4-a716-446655440000'

// URL → Pass through
resolveImageUrl('https://example.com/image.jpg');
// Returns: 'https://example.com/image.jpg'

// Local path → Pass through
resolveImageUrl('/images/logo.png');
// Returns: '/images/logo.png'
```

#### `getFallbackImage(type)`
Returns fallback image path based on type.

```javascript
import { getFallbackImage } from '@/utils/imageResolver';

getFallbackImage('product'); // '/luxury-product-showcase.jpg'
getFallbackImage('brand');   // '/placeholder-brand.png'
getFallbackImage('category'); // '/placeholder-category.png'
```

### 2. CdnImage Component (`src/components/CdnImage.jsx`)

A wrapper around Next.js `Image` component that automatically resolves UUIDs.

#### Props
- `src` (string, required): UUID, URL, or local path
- `alt` (string): Alt text for the image
- `fallbackType` (string): Type of fallback ('product', 'brand', 'category', 'user')
- `fill` (boolean): Use fill layout
- `width` (number): Image width (required if not using fill)
- `height` (number): Image height (required if not using fill)
- `priority` (boolean): Load image with priority
- `quality` (number): Image quality (default: 75)
- `sizes` (string): Responsive sizes
- All other Next.js Image props

## Usage Examples

### Example 1: Product Card
```jsx
import CdnImage from '@/components/CdnImage';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <CdnImage
        src={product.thumbnail} // UUID or URL
        alt={product.productName}
        fallbackType="product"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <h3>{product.productName}</h3>
      <p>${product.finalPrice}</p>
    </div>
  );
}
```

### Example 2: Product Detail Page
```jsx
import CdnImage from '@/components/CdnImage';

function ProductDetail({ product }) {
  return (
    <div className="product-detail">
      {/* Main Image */}
      <div className="relative w-full h-96">
        <CdnImage
          src={product.thumbnail}
          alt={product.productName}
          fallbackType="product"
          fill
          priority
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Gallery Images */}
      <div className="grid grid-cols-4 gap-4">
        {product.images?.map((imageUuid, index) => (
          <div key={index} className="relative aspect-square">
            <CdnImage
              src={imageUuid}
              alt={`${product.productName} - Image ${index + 1}`}
              fallbackType="product"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 25vw, 200px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Example 3: Product List with Fixed Dimensions
```jsx
import CdnImage from '@/components/CdnImage';

function ProductList({ products }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.productId} className="product-item">
          <CdnImage
            src={product.thumbnail}
            alt={product.productName}
            fallbackType="product"
            width={400}
            height={400}
            className="rounded-lg"
          />
          <h3>{product.productName}</h3>
        </div>
      ))}
    </div>
  );
}
```

### Example 4: Brand Logo
```jsx
import CdnImage from '@/components/CdnImage';

function BrandCard({ brand }) {
  return (
    <div className="brand-card">
      <CdnImage
        src={brand.logo}
        alt={brand.brandName}
        fallbackType="brand"
        width={200}
        height={100}
        className="object-contain"
      />
    </div>
  );
}
```

### Example 5: Category Image
```jsx
import CdnImage from '@/components/CdnImage';

function CategoryCard({ category }) {
  return (
    <div className="category-card">
      <div className="relative h-48">
        <CdnImage
          src={category.image}
          alt={category.categoryName}
          fallbackType="category"
          fill
          className="object-cover rounded-t-lg"
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>
      <h3>{category.categoryName}</h3>
    </div>
  );
}
```

### Example 6: With Custom Error Handling
```jsx
import CdnImage from '@/components/CdnImage';
import { useState } from 'react';

function ProductImage({ product }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div>
      <CdnImage
        src={product.thumbnail}
        alt={product.productName}
        fallbackType="product"
        fill
        onError={(error) => {
          console.error('Image failed to load:', error);
          setImageError(true);
        }}
      />
      {imageError && (
        <div className="error-message">
          Image temporarily unavailable
        </div>
      )}
    </div>
  );
}
```

## Helper Functions

### Resolve Product Images
```javascript
import { resolveProductImages } from '@/utils/imageResolver';

const product = {
  productId: '123',
  thumbnail: '550e8400-e29b-41d4-a716-446655440000',
  images: ['uuid-1', 'uuid-2', 'uuid-3']
};

const resolvedProduct = resolveProductImages(product);
// Returns product with resolved URLs
```

### Resolve Brand Images
```javascript
import { resolveBrandImage } from '@/utils/imageResolver';

const brand = {
  brandId: '456',
  logo: '550e8400-e29b-41d4-a716-446655440000'
};

const resolvedBrand = resolveBrandImage(brand);
// Returns brand with resolved logo URL
```

## Security & Best Practices

### ✅ DO
- Use the `CdnImage` component for all product/brand/category images
- Let the component handle UUID detection and resolution automatically
- Use appropriate `fallbackType` for different image types
- Specify `sizes` prop for responsive images
- Use `priority` for above-the-fold images

### ❌ DON'T
- Store resolved URLs in localStorage (they are temporary and signed)
- Manually construct CDN URLs (use the utility functions)
- Skip the `alt` prop (important for accessibility)
- Use the component without `fill` or `width/height` props

## Error Handling

The `CdnImage` component automatically:
1. Detects if the image fails to load
2. Falls back to a placeholder image based on `fallbackType`
3. Logs a warning to the console
4. Calls custom `onError` handler if provided

## Performance Optimization

- URLs are resolved on-demand, not stored long-term
- Next.js Image optimization is applied automatically
- Fallback images are local assets (fast loading)
- Component re-renders only when `src` or `fallbackType` changes

## Troubleshooting

### Images not loading?
1. Check `NEXT_PUBLIC_CDN_BASEURL` is set in `.env`
2. Verify `remotePatterns` in `next.config.mjs`
3. Check browser console for errors
4. Verify the UUID format is correct

### Fallback images showing?
1. Check if the CDN endpoint is accessible
2. Verify the UUID exists in the CDN
3. Check if the temporary URL has expired
4. Ensure network connectivity

## Migration Guide

### From direct URLs to UUID system:
```jsx
// Before
<Image src={product.imageUrl} alt={product.name} fill />

// After
<CdnImage src={product.thumbnail} alt={product.name} fallbackType="product" fill />
```

The component handles both UUIDs and URLs, so migration can be gradual.
