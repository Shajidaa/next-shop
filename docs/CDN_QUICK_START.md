# CDN Image System - Quick Start

## 🚀 Quick Setup

### 1. Environment Variable
Add to your `.env` file:
```env
NEXT_PUBLIC_CDN_BASEURL=https://cdn-nextshop.prospectbdltd.com/api/temporary-url
```

### 2. Next.js Configuration
Already configured in `next.config.mjs`:
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn-nextshop.prospectbdltd.com',
      pathname: '/**',
    },
  ],
}
```

## 📦 What's Included

### Files Created:
- ✅ `src/utils/imageResolver.js` - UUID detection and URL resolution
- ✅ `src/components/CdnImage.jsx` - Main image component
- ✅ `src/components/CDNImage.jsx` - Backward compatibility wrapper
- ✅ `docs/CDN_IMAGE_USAGE.md` - Complete documentation
- ✅ `docs/CDN_QUICK_START.md` - This file

## 🎯 Basic Usage

### Import the Component
```jsx
import CdnImage from '@/components/CdnImage';
// or
import CDNImage from '@/components/CDNImage'; // backward compatible
```

### Use with UUID (from API)
```jsx
<CdnImage
  src="550e8400-e29b-41d4-a716-446655440000"
  alt="Product Image"
  fill
  className="object-cover"
/>
```

### Use with Product Object
```jsx
<CdnImage
  src={product.thumbnail}
  alt={product.productName}
  fallbackType="product"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

## 🔧 Common Patterns

### Product Card (Fill Layout)
```jsx
<div className="relative aspect-square">
  <CdnImage
    src={product.thumbnail}
    alt={product.productName}
    fallbackType="product"
    fill
    className="object-cover rounded-lg"
    sizes="(max-width: 768px) 100vw, 33vw"
  />
</div>
```

### Product Card (Fixed Size)
```jsx
<CdnImage
  src={product.thumbnail}
  alt={product.productName}
  fallbackType="product"
  width={400}
  height={400}
  className="rounded-lg"
/>
```

### Brand Logo
```jsx
<CdnImage
  src={brand.logo}
  alt={brand.brandName}
  fallbackType="brand"
  width={200}
  height={100}
  className="object-contain"
/>
```

### Category Image
```jsx
<CdnImage
  src={category.image}
  alt={category.categoryName}
  fallbackType="category"
  fill
  className="object-cover"
/>
```

## 🎨 Fallback Types

The component automatically uses appropriate fallback images:

- `fallbackType="product"` → `/luxury-product-showcase.jpg`
- `fallbackType="brand"` → `/placeholder-brand.png`
- `fallbackType="category"` → `/placeholder-category.png`
- `fallbackType="user"` → `/placeholder-user.png`

## ✨ Features

- ✅ Automatic UUID detection and resolution
- ✅ Supports UUIDs, URLs, and local paths
- ✅ Automatic fallback on error
- ✅ All Next.js Image props supported
- ✅ TypeScript-friendly
- ✅ Performance optimized
- ✅ No manual URL construction needed

## 🔍 How It Works

1. **UUID Detection**: Component checks if `src` is a valid UUID
2. **URL Resolution**: If UUID, constructs CDN URL: `{CDN_BASE_URL}/{UUID}`
3. **Pass-through**: If URL or path, uses as-is
4. **Error Handling**: On load failure, shows fallback image
5. **Optimization**: Next.js Image optimization applied automatically

## 📝 Props Reference

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `src` | string | ✅ | UUID, URL, or local path |
| `alt` | string | ✅ | Alt text for accessibility |
| `fallbackType` | string | ❌ | Type of fallback image |
| `fill` | boolean | ❌ | Use fill layout |
| `width` | number | ❌* | Image width |
| `height` | number | ❌* | Image height |
| `priority` | boolean | ❌ | Load with priority |
| `quality` | number | ❌ | Image quality (default: 75) |
| `sizes` | string | ❌ | Responsive sizes |
| `className` | string | ❌ | CSS classes |

*Required if not using `fill`

## 🚨 Important Notes

### DO ✅
- Use `CdnImage` for all product/brand/category images
- Provide `alt` text for accessibility
- Use `fill` OR `width/height` (not both)
- Specify `sizes` for responsive images
- Use `priority` for above-the-fold images

### DON'T ❌
- Store resolved URLs in localStorage (they're temporary)
- Manually construct CDN URLs
- Skip the `alt` prop
- Use without `fill` or `width/height`

## 🐛 Troubleshooting

### Images not loading?
```bash
# Check environment variable
echo $NEXT_PUBLIC_CDN_BASEURL

# Restart dev server
npm run dev
```

### Seeing fallback images?
1. Verify UUID format is correct
2. Check CDN endpoint is accessible
3. Ensure network connectivity
4. Check browser console for errors

## 📚 More Information

See `docs/CDN_IMAGE_USAGE.md` for:
- Detailed API documentation
- Advanced usage examples
- Helper functions
- Security best practices
- Migration guide

## 🎓 Examples in Codebase

Check these files for real-world usage:
- `src/components/ProductCard.jsx`
- `src/components/FeaturedProducts/FeaturedProducts.jsx`
- `src/components/CategoryShowcase.jsx`
- `src/components/Home/ProductDetails.jsx`
