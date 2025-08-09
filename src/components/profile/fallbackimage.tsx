'use client';

import Image from 'next/image';
import { useState } from 'react';

interface FallbackImageProps {
  src: string | null;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}

export default function FallbackImage({
  src,
  fallbackSrc = '/images/user-profile-pics/fallback.jpg',
  alt,
  className,
  sizes,
  priority = false,
  fill = false,
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      sizes={sizes}
      priority={priority}
      fill={fill}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}
