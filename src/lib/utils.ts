// Utility functions for your Handcrafted Haven project

export function formatDate(date: Date | string): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function getProfileImageUrl(profileImageUrl: string | null | undefined): string {
  // If user has a profile image URL, use it
  if (profileImageUrl && profileImageUrl.trim() !== '') {
    return profileImageUrl;
  }
  
  // Otherwise, return the default image
  return '/images/user-profile-pics/default.jpg';
}

export function getUserAvatarColor(userId: number | string): string {
  // Generate consistent hue based on user ID using golden angle
  const numericId = typeof userId === 'string' ? parseInt(userId) || 0 : userId;
  const hue = (numericId * 137.508) % 360; // Golden angle for good distribution
  
  // Return HSL color with fixed saturation and lightness for consistency
  return `hsl(${Math.round(hue)}, 65%, 75%)`;
}
