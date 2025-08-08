-- Handcrafted Haven - Complete Database Schema
-- PostgreSQL schema for artisan marketplace

-- Enable UUID extension for better ID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users/Accounts table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    bio TEXT,
    profile_image_url VARCHAR(500),
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Categories table (enum-like structure for better performance)
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Artpieces table
CREATE TABLE artpieces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    hero_image_url VARCHAR(500) NOT NULL,
    creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table (comments and ratings)
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    artpiece_id UUID NOT NULL REFERENCES artpieces(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure a user can only review an artpiece once
    UNIQUE(artpiece_id, reviewer_id),
    
    -- Ensure at least one of rating or comment is provided
    CHECK (rating IS NOT NULL OR comment IS NOT NULL)
);

-- Favorites table (many-to-many relationship)
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    artpiece_id UUID NOT NULL REFERENCES artpieces(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure a user can only favorite an artpiece once
    UNIQUE(user_id, artpiece_id)
);

-- Indexes for better query performance
CREATE INDEX idx_artpieces_creator_id ON artpieces(creator_id);
CREATE INDEX idx_artpieces_category_id ON artpieces(category_id);
CREATE INDEX idx_artpieces_created_at ON artpieces(created_at DESC);
CREATE INDEX idx_artpieces_price ON artpieces(price);
CREATE INDEX idx_reviews_artpiece_id ON reviews(artpiece_id);
CREATE INDEX idx_reviews_reviewer_id ON reviews(reviewer_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_favorites_artpiece_id ON favorites(artpiece_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- Full-text search index for artpieces (title and description)
CREATE INDEX idx_artpieces_search ON artpieces USING gin(to_tsvector('english', title || ' ' || description));

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at timestamps
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_artpieces_updated_at BEFORE UPDATE ON artpieces
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default categories
INSERT INTO categories (name, description) VALUES
('Pottery', 'Handcrafted ceramic bowls, vases, and functional pottery'),
('Woodworking', 'Custom wooden furniture, cutting boards, and carved items'),
('Textiles', 'Handwoven fabrics, knitted items, and embroidered pieces'),
('Jewelry', 'Handmade necklaces, bracelets, rings, and earrings'),
('Metalwork', 'Forged items, sculptures, and decorative metalwork'),
('Glass Art', 'Blown glass, stained glass, and glass sculptures'),
('Painting', 'Original paintings in various mediums and styles'),
('Sculpture', 'Three-dimensional art in various materials'),
('Ceramics', 'Ceramic tiles, sculptures, and decorative pieces'),
('Fiber Arts', 'Macramé, weaving, felting, and fiber sculptures'),
('Printmaking', 'Screen prints, block prints, and lithographic works'),
('Mixed Media', 'Art combining multiple materials and techniques'),
('Photography', 'Digital and film photography, prints, and photographic art'),
('Digital Art', 'Computer-generated art, digital illustrations, and digital media'),
('Home Decor', 'Decorative items for home and living spaces'),
('Other', 'Unique artworks that don''t fit standard categories');

-- Views for common queries
CREATE VIEW artpieces_with_details AS
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
GROUP BY a.id, u.id, c.id;

-- View for user statistics
CREATE VIEW user_stats AS
SELECT 
    u.id,
    u.username,
    u.first_name || ' ' || u.last_name as full_name,
    COUNT(DISTINCT a.id) as artpieces_count,
    COALESCE(AVG(r.rating), 0) as average_rating,
    COUNT(DISTINCT r.id) as total_reviews,
    COUNT(DISTINCT f.id) as total_favorites_received,
    u.created_at as member_since
FROM users u
LEFT JOIN artpieces a ON u.id = a.creator_id
LEFT JOIN reviews r ON a.id = r.artpiece_id
LEFT JOIN favorites f ON a.id = f.artpiece_id
GROUP BY u.id;
