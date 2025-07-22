// TypeScript type definitions for your Handcrafted Haven project

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

export interface Craft {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  userId: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
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
