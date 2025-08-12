'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ArtpieceFallbackImageProps {
  src: string | null;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}

export default function ArtpieceFallbackImage({
  src,
  fallbackSrc = '/images/artpieces/placeholder.jpg',
  alt,
  className,
  sizes,
  priority = false,
  fill = false,
  width,
  height,
}: ArtpieceFallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [hasErrored, setHasErrored] = useState(false);

  const handleError = () => {
    if (!hasErrored) {
      setHasErrored(true);
      setImgSrc(fallbackSrc);
    }
  };

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        className={className}
        sizes={sizes}
        priority={priority}
        onError={handleError}
        fill
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={handleError}
      width={width || 400}
      height={height || 300}
    />
  );
}
