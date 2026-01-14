import { useState, useEffect } from 'react';

const CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_BASEURL;

// Cache to store fetched URLs to avoid repeated API calls
const urlCache = new Map();

export function useImageUrl(thumbnailUuid) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!thumbnailUuid) {
      setImageUrl(null);
      setLoading(false);
      return;
    }

    // Check if URL is already in cache
    if (urlCache.has(thumbnailUuid)) {
      setImageUrl(urlCache.get(thumbnailUuid));
      setLoading(false);
      return;
    }

    const fetchImageUrl = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${CDN_BASE_URL}/${thumbnailUuid}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch image URL');
        }

        const data = await response.json();
        
        if (data.url) {
          // Cache the URL
          urlCache.set(thumbnailUuid, data.url);
          setImageUrl(data.url);
        } else {
          throw new Error('No URL in response');
        }
      } catch (err) {
        console.error('Error fetching image URL:', err);
        setError(err.message);
        setImageUrl(null);
      } finally {
        setLoading(false);
      }
    };

    fetchImageUrl();
  }, [thumbnailUuid]);

  return { imageUrl, loading, error };
}

// Alternative: Synchronous function that returns a promise
export async function getImageUrl(thumbnailUuid) {
  if (!thumbnailUuid) return null;

  // Check cache first
  if (urlCache.has(thumbnailUuid)) {
    return urlCache.get(thumbnailUuid);
  }

  try {
    const response = await fetch(`${CDN_BASE_URL}/${thumbnailUuid}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch image URL');
    }

    const data = await response.json();
    
    if (data.url) {
      // Cache the URL
      urlCache.set(thumbnailUuid, data.url);
      return data.url;
    }
    
    return null;
  } catch (err) {
    console.error('Error fetching image URL:', err);
    return null;
  }
}

// Clear cache function (useful for memory management)
export function clearImageUrlCache() {
  urlCache.clear();
}
