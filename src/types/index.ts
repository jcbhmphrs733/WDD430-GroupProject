// TypeScript type definitions for Handcrafted Haven

export interface User {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  bio?: string;
  profile_image_url?: string;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Creator {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  bio?: string;
  profile_image_url?: string;
  artpieces_count: number;
  total_favorites: number;
  average_rating: number;
  total_reviews: number;
  total_views: number;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at: string;
}

export interface Artpiece {
  id: string;
  title: string;
  description: string;
  price: number;
  hero_image_url: string;
  creator_id: string;
  category_id: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface ArtpieceWithDetails extends Artpiece {
  creator_username: string;
  creator_name: string;
  creator_profile_image?: string;
  category_name: string;
  average_rating: number;
  review_count: number;
  favorite_count: number;
}

export interface Review {
  id: string;
  artpiece_id: string;
  reviewer_id: string;
  rating?: number;
  comment?: string;
  created_at: string;
  updated_at: string;
  // Joined fields from user
  username?: string;
  first_name?: string;
  last_name?: string;
  profile_image_url?: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  artpiece_id: string;
  created_at: string;
}

// Form types for creating/updating data
export interface CreateArtpieceData {
  title: string;
  description: string;
  price: number;
  hero_image_url: string;
  creator_id: string;
  category_id: number;
}

export interface CreateReviewData {
  artpiece_id: string;
  reviewer_id: string;
  rating?: number;
  comment?: string;
}

// Common props for components
export interface ArtpieceCardProps {
  artpiece: ArtpieceWithDetails;
  showCreator?: boolean;
  showCategory?: boolean;
  className?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Database structure check types
export interface DatabaseTable {
  table_name: string;
  table_type: string;
}

export interface DatabaseView {
  view_name: string;
}

export interface DatabaseStructure {
  tables: DatabaseTable[];
  views: DatabaseView[];
}
