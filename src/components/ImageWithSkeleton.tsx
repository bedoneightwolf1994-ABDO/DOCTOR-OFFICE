'use client'
import { useState } from 'react'

// Wraps an <img> with a pulsing gray placeholder that's shown until the
// image finishes loading, instead of a blank gap. Drop-in replacement for
// a plain <img> — pass the same src/alt/className props.
export default function ImageWithSkeleton({ src, alt, className = '' }: {
  src: string
  alt: string
  className?: string
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative w-full h-full overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}
