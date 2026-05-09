import React from 'react';

// Lightweight optimized image wrapper
// Props: src, alt, className, loading, style, sizes, srcSet, onLoad, onError, priority
export default function OptimizedImg({ src, alt = '', className = '', loading = 'lazy', style, sizes, srcSet, onLoad, onError, priority = false, ...rest }) {
  // Use browser-native attributes where available. decode='async' helps with main-thread work.
  // fetchPriority is supported in Chromium-based browsers; set to 'high' for priority images.
  const fetchPriority = priority ? 'high' : 'auto';

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      sizes={sizes}
      srcSet={srcSet}
      style={style}
      onLoad={onLoad}
      onError={onError}
      {...rest}
    />
  );
}
