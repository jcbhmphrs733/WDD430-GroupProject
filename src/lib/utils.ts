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
  // Predefined palette of well-distributed, vibrant colors
  const colorPalette = [
    '#E53E3E', // Red
    '#D53F8C', // Pink  
    '#9F7AEA', // Purple
    '#667EEA', // Blue
    '#4299E1', // Light Blue
    '#0BC5EA', // Cyan
    '#00B5A5', // Teal
    '#38A169', // Green
    '#68D391', // Light Green
    '#D69E2E', // Yellow
    '#ED8936', // Orange
    '#F56500', // Dark Orange
    '#E53E3E', // Red (different shade)
    '#C53030', // Dark Red
    '#B83280', // Dark Pink
    '#805AD5', // Dark Purple
    '#5A67D8', // Dark Blue
    '#3182CE', // Medium Blue
    '#0987A0', // Dark Cyan
    '#319795', // Dark Teal
    '#2F855A', // Dark Green
    '#38A169', // Medium Green
    '#B7791F', // Dark Yellow
    '#C05621', // Dark Orange
  ];
  
  // Convert userId to a consistent index
  const str = String(userId);
  let hash = 0;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Use absolute value and modulo to get a palette index
  const colorIndex = Math.abs(hash) % colorPalette.length;
  return colorPalette[colorIndex];
}
