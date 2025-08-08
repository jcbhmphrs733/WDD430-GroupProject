// Database configuration and utility functions for Handcrafted Haven
import { sql } from '@vercel/postgres';
import { User, Category, ArtpieceWithDetails, DatabaseStructure, Review, Creator } from '@/types';

export { sql };

// User-related database functions
export async function getAllUsers(): Promise<User[]> {
  try {
    const result = await sql`
      SELECT id, username, first_name, last_name, email, bio, profile_image_url, created_at 
      FROM users 
      ORDER BY created_at DESC
    `;
    return result.rows as User[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function getUserById(userId: string) {
  try {
    const result = await sql`
      SELECT id, username, first_name, last_name, email, bio, profile_image_url, created_at 
      FROM users 
      WHERE id = ${userId}
    `;
    console.log(result.rows[0]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user.');
  }
}

// Artpiece-related database functions
export async function getAllArtpieces(): Promise<ArtpieceWithDetails[]> {
  try {
    const result = await sql`
      SELECT * FROM artpieces_with_details 
      ORDER BY created_at DESC
    `;
    return result.rows.map(row => ({
      ...row,
      price: Number(row.price),
      average_rating: Number(row.average_rating),
      review_count: Number(row.review_count),
      favorite_count: Number(row.favorite_count),
      view_count: Number(row.view_count)
    })) as ArtpieceWithDetails[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch artpieces.');
  }
}

export async function getRandomArtpieces(limit: number = 10): Promise<ArtpieceWithDetails[]> {
  try {
    const result = await sql`
      SELECT * FROM artpieces_with_details 
      ORDER BY RANDOM()
      LIMIT ${limit}
    `;
    return result.rows.map(row => ({
      ...row,
      price: Number(row.price),
      average_rating: Number(row.average_rating),
      review_count: Number(row.review_count),
      favorite_count: Number(row.favorite_count),
      view_count: Number(row.view_count)
    })) as ArtpieceWithDetails[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch random artpieces.');
  }
}

export async function getFeaturedArtpieces(limit: number = 8): Promise<ArtpieceWithDetails[]> {
  try {
    const result = await sql`
      SELECT * FROM artpieces_with_details 
      WHERE average_rating >= 4 OR favorite_count >= 2
      ORDER BY (average_rating * 0.7 + favorite_count * 0.3) DESC, created_at DESC
      LIMIT ${limit}
    `;
    return result.rows.map(row => ({
      ...row,
      price: Number(row.price),
      average_rating: Number(row.average_rating),
      review_count: Number(row.review_count),
      favorite_count: Number(row.favorite_count),
      view_count: Number(row.view_count)
    })) as ArtpieceWithDetails[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch featured artpieces.');
  }
}

export async function getArtpiecesByCategory(categoryName: string) {
  try {
    const result = await sql`
      SELECT * FROM artpieces_with_details 
      WHERE category_name = ${categoryName}
      ORDER BY created_at DESC
    `;
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch artpieces by category.');
  }
}

export async function getArtpieceById(artpieceId: string): Promise<ArtpieceWithDetails | null> {
  try {
    const result = await sql`
      SELECT 
        a.id,
        a.title,
        a.description,
        a.price,
        a.hero_image_url,
        a.creator_id,
        a.category_id,
        a.view_count,
        a.created_at,
        a.updated_at,
        u.username as creator_username,
        u.first_name || ' ' || u.last_name as creator_name,
        u.profile_image_url as creator_profile_image,
        c.name as category_name,
        COALESCE(AVG(r.rating), 0) as average_rating,
        COUNT(r.id) as review_count,
        COUNT(f.id) as favorite_count
      FROM artpieces a
      JOIN users u ON a.creator_id = u.id
      JOIN categories c ON a.category_id = c.id
      LEFT JOIN reviews r ON a.id = r.artpiece_id
      LEFT JOIN favorites f ON a.id = f.artpiece_id
      WHERE a.id = ${artpieceId}
      GROUP BY a.id, u.id, c.id
    `;
    if (result.rows.length > 0) {
      const row = result.rows[0];
      return {
        ...row,
        price: Number(row.price),
        average_rating: Number(row.average_rating),
        review_count: Number(row.review_count),
        favorite_count: Number(row.favorite_count),
        view_count: Number(row.view_count),
        category_id: Number(row.category_id)
      } as ArtpieceWithDetails;
    }
    return null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch artpiece.');
  }
}

export async function getArtpieceReviews(artpieceId: string): Promise<Review[]> {
  try {
    const result = await sql`
      SELECT 
        r.id,
        r.artpiece_id,
        r.reviewer_id,
        r.rating,
        r.comment,
        r.created_at,
        r.updated_at,
        u.username,
        u.first_name,
        u.last_name,
        u.profile_image_url
      FROM reviews r
      LEFT JOIN users u ON r.reviewer_id = u.id
      WHERE r.artpiece_id = ${artpieceId}
      ORDER BY r.created_at DESC
    `;
    return result.rows as Review[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch artpiece reviews.');
  }
}

export async function incrementArtpieceViews(artpieceId: string): Promise<void> {
  try {
    await sql`
      UPDATE artpieces 
      SET view_count = view_count + 1 
      WHERE id = ${artpieceId}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    // Don't throw error for view count increment failures
  }
}

export async function searchArtpieces(searchTerm: string) {
  try {
    const result = await sql`
      SELECT * FROM artpieces_with_details 
      WHERE to_tsvector('english', title || ' ' || description) @@ plainto_tsquery('english', ${searchTerm})
         OR title ILIKE ${'%' + searchTerm + '%'}
         OR description ILIKE ${'%' + searchTerm + '%'}
      ORDER BY created_at DESC
    `;
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to search artpieces.');
  }
}

export async function searchCreators(searchTerm: string) {
  try {
    const result = await sql`
      SELECT 
        u.id,
        u.username,
        u.first_name,
        u.last_name,
        u.bio,
        u.profile_image_url,
        u.created_at,
        us.artpieces_count,
        us.average_rating,
        us.total_reviews
      FROM users u
      LEFT JOIN user_stats us ON u.id = us.id
      WHERE u.first_name ILIKE ${'%' + searchTerm + '%'}
         OR u.last_name ILIKE ${'%' + searchTerm + '%'}
         OR u.username ILIKE ${'%' + searchTerm + '%'}
         OR u.bio ILIKE ${'%' + searchTerm + '%'}
         OR to_tsvector('english', u.first_name || ' ' || u.last_name || ' ' || COALESCE(u.bio, '')) @@ plainto_tsquery('english', ${searchTerm})
      ORDER BY us.artpieces_count DESC NULLS LAST, u.created_at DESC
    `;
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to search creators.');
  }
}

export async function getArtpiecesbyUser(userId: string): Promise<ArtpieceWithDetails[]> {
  try {
    const result = await sql`
      SELECT * FROM artpieces
      WHERE creator_id = ${userId}
      ORDER BY created_at desc
    `;
    console.log(result)
      
    return result.rows.map(row => ({
      ...row,
      price: Number(row.price),
      average_rating: Number(row.average_rating),
      review_count: Number(row.review_count),
      favorite_count: Number(row.favorite_count),
      view_count: Number(row.view_count),
    })) as ArtpieceWithDetails[];    
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch artpieces for user.');
  }
}

// Category-related functions
export async function getAllCategories(): Promise<Category[]> {
  try {
    const result = await sql`
      SELECT * FROM categories 
      ORDER BY name
    `;
    return result.rows as Category[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch categories.');
  }
}

// Review-related functions
export async function getReviewsForArtpiece(artpieceId: string) {
  try {
    const result = await sql`
      SELECT r.*, u.username, u.first_name, u.last_name, u.profile_image_url
      FROM reviews r
      JOIN users u ON r.reviewer_id = u.id
      WHERE r.artpiece_id = ${artpieceId}
      ORDER BY r.created_at DESC
    `;
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch reviews.');
  }
}

// Favorites-related functions
export async function getUserFavorites(userId: string) {
  try {
    const result = await sql`
      SELECT a.* FROM artpieces_with_details a
      JOIN favorites f ON a.id = f.artpiece_id
      WHERE f.user_id = ${userId}
      ORDER BY f.created_at DESC
    `;
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user favorites.');
  }
}

// Test database connection
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW() as current_time`;
    return result.rows[0];
  } catch (error) {
    console.error('Database Connection Error:', error);
    throw new Error('Failed to connect to database.');
  }
}

// Check what tables and views exist in the database
export async function checkDatabaseStructure(): Promise<DatabaseStructure> {
  try {
    const tables = await sql`
      SELECT table_name, table_type 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_type, table_name
    `;
    
    const views = await sql`
      SELECT viewname as view_name
      FROM pg_views 
      WHERE schemaname = 'public'
      ORDER BY viewname
    `;

    return {
      tables: tables.rows as { table_name: string; table_type: string }[],
      views: views.rows as { view_name: string }[]
    };
  } catch (error) {
    console.error('Database Structure Check Error:', error);
    throw new Error('Failed to check database structure.');
  }
}

export async function getAllCreators(): Promise<Creator[]> {
  try {
    const result = await sql`
      SELECT 
        u.id,
        u.username,
        u.first_name,
        u.last_name,
        u.bio,
        u.profile_image_url,
        us.artpieces_count,
        us.total_favorites_received as total_favorites,
        us.average_rating,
        us.total_reviews,
        COALESCE(SUM(a.view_count), 0) as total_views
      FROM users u
      JOIN user_stats us ON u.id = us.id
      LEFT JOIN artpieces a ON u.id = a.creator_id
      WHERE us.artpieces_count > 0
      GROUP BY u.id, u.username, u.first_name, u.last_name, u.bio, u.profile_image_url, 
               us.artpieces_count, us.total_favorites_received, us.average_rating, us.total_reviews
      ORDER BY us.total_favorites_received DESC, us.average_rating DESC, us.artpieces_count DESC
    `;
    return result.rows as Creator[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch creators.');
  }
}

export async function createUser({
  email,
  username,
  first_name,
  last_name,
  password,
  bio,
  profile_image_url
}: {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  bio?: string;
  profile_image_url?: string;
}) {
  console.log('bio', bio);
  try {
    const result = await sql`
    INSERT INTO users (
      email, username, first_name, last_name, password_hash, bio, profile_image_url
      ) VALUES (
        ${email}, ${username}, ${first_name}, ${last_name}, ${password}, ${bio}, ${profile_image_url}
      )
      RETURNING id;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Database Error - createUser:', error);
    throw error;
  }
}

// possibly use to add in the art
export async function postNewArt(title: string, description: string, price: number, hero_image_url: string, category_id: string, UUID: string, created_at: string, updated_at: string ) {
  try {
    const result = await sql`
    INSERT INTO artpieces (title, description, price, hero_image_url, creator_id, category_id, created_at, updated_at)
    VALUES (${title}, ${description}, ${price}, ${hero_image_url}, ${UUID}, ${category_id}, ${created_at}, ${updated_at},)
    `;
  } catch(error) {
    console.error('Database Connection Error:', error);
    throw new Error('Failed to connect to database.');
  }
}

// possibly use to edit in the art
export async function putArt(art_id: string, title: string, description: string, price: number, hero_image_url: string, category_id: number, updated_at: string ) {
  try {
    const result = await sql`
    UPDATE artpieces 
    SET title = ${title}, description = ${description}, price = ${price}, hero_image_url = ${hero_image_url}, category_id = ${category_id}, updated_at = ${updated_at})
    WHERE id = ${art_id}
    `;
  } catch(error) {
    console.error('Database Connection Error:', error);
    throw new Error('Failed to connect to database.');
  }
}