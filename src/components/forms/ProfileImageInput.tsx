'use client';

import { useState } from 'react';

interface ProfileImageInputProps {
  defaultValue?: string;
  name: string;
  id: string;
}

export function ProfileImageInput({ defaultValue = '', name, id }: ProfileImageInputProps) {
  const [imageUrl, setImageUrl] = useState(defaultValue);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    setImageError(false); // Reset error state when URL changes
  };

  const isValidUrl = imageUrl && imageUrl.startsWith('http');

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        Profile Image URL
      </label>
      <div className="space-y-3">
        <input
          type="url"
          id={id}
          name={name}
          value={imageUrl}
          onChange={handleUrlChange}
          className="w-full px-3 py-2 border border-background-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          placeholder="https://example.com/your-image.jpg"
        />
        
        <div className="text-xs text-gray-500">
          <p className="mb-1">Enter a direct link to your profile image. The image should be:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Square format (recommended)</li>
            <li>At least 200x200 pixels</li>
            <li>JPG, PNG, or WebP format</li>
            <li>Publicly accessible URL</li>
          </ul>
        </div>
        
        {/* Live Preview */}
        {isValidUrl && (
          <div className="bg-gray-50 p-3 rounded-lg border">
            <p className="text-sm font-medium text-gray-700 mb-2">
              {imageUrl === defaultValue ? 'Current Profile Image:' : 'Preview:'}
            </p>
            <div className="flex items-center space-x-3">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-200">
                {!imageError ? (
                  <img
                    src={imageUrl}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
                    <span>Failed to load</span>
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-600 flex-1">
                <p className="font-medium">
                  {imageError ? (
                    <span className="text-red-600">❌ Image failed to load</span>
                  ) : (
                    <span className="text-green-600">✅ Image loaded successfully</span>
                  )}
                </p>
                <p className="text-xs break-all mt-1">{imageUrl}</p>
                {imageError && (
                  <p className="text-xs text-red-500 mt-1">
                    Please check that the URL is correct and publicly accessible.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Suggestions for free image hosting */}
        <details className="text-xs text-gray-500">
          <summary className="cursor-pointer font-medium text-gray-600 hover:text-gray-800">
            💡 Need somewhere to host your image?
          </summary>
          <div className="mt-2 pl-4 border-l-2 border-gray-200">
            <p className="mb-2">Here are some free image hosting options:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Imgur:</strong> imgur.com - Free, no account required</li>
              <li><strong>GitHub:</strong> Upload to a GitHub repo and use the raw URL</li>
              <li><strong>Cloudinary:</strong> cloudinary.com - Free tier available</li>
              <li><strong>ImageBB:</strong> imgbb.com - Free image hosting</li>
            </ul>
            <p className="mt-2 text-gray-400">
              Right-click on any uploaded image and select "Copy image address" to get the URL.
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}
