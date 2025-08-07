-- Second Seed Data - Additional Seller and Artpieces
-- This script adds one new seller and 10 artpieces to fill out more categories

-- Add new seller: Maria, a multi-disciplinary artist
INSERT INTO users (id, email, username, first_name, last_name, password_hash, bio, profile_image_url) VALUES
(uuid_generate_v4(), 'maria.artist@example.com', 'mariaart', 'Maria', 'Rodriguez', '$2a$10$example.hash.for.maria', 'Multi-disciplinary artist working in various mediums. I love experimenting with different materials to create unique pieces that tell stories.', '/images/user-profile-pics/maria.jpg');

-- Add 10 new artpieces across different categories to fill out our catalog
WITH user_ids AS (
  SELECT id, username FROM users WHERE username IN ('mariaart', 'alicepotter', 'bobwood', 'carolweaves', 'davidgold', 'emmaglass')
),
category_ids AS (
  SELECT id, name FROM categories
)
INSERT INTO artpieces (title, description, price, hero_image_url, creator_id, category_id) 
SELECT 
  artpiece_data.title,
  artpiece_data.description,
  artpiece_data.price,
  artpiece_data.hero_image_url,
  u.id,
  c.id
FROM (VALUES
  -- Metalwork pieces
  ('Forged Iron Candle Holder', 'Hand-forged iron candle holder with rustic finish. Perfect for pillar candles and adds warmth to any room.', 55.00, '/images/artpieces/iron-candle-holder.jpg', 'mariaart', 'Metalwork'),
  ('Copper Garden Sculpture', 'Abstract copper sculpture designed for garden display. Develops beautiful patina over time.', 185.00, '/images/artpieces/copper-garden-sculpture.jpg', 'mariaart', 'Metalwork'),
  
  -- Painting
  ('Abstract Landscape Oil Painting', 'Original oil painting on canvas depicting an abstract mountain landscape. Ready to hang with included frame.', 250.00, '/images/artpieces/abstract-landscape.jpg', 'mariaart', 'Painting'),
  ('Watercolor Botanical Series', 'Set of three watercolor paintings featuring native wildflowers. Sold as a collection.', 120.00, '/images/artpieces/watercolor-botanicals.jpg', 'mariaart', 'Painting'),
  
  -- Sculpture
  ('Clay Figure Sculpture', 'Hand-sculpted ceramic figure representing joy and movement. Kiln-fired and finished with matte glaze.', 145.00, '/images/artpieces/clay-figure-sculpture.jpg', 'mariaart', 'Sculpture'),
  
  -- Ceramics (different from pottery)
  ('Decorative Ceramic Tiles', 'Set of six hand-painted ceramic tiles with geometric patterns. Perfect for backsplash or wall art.', 85.00, '/images/artpieces/decorative-tiles.jpg', 'mariaart', 'Ceramics'),
  
  -- Printmaking
  ('Linocut Nature Print', 'Hand-pulled linocut print featuring forest animals. Limited edition of 25 prints, signed and numbered.', 45.00, '/images/artpieces/linocut-nature.jpg', 'mariaart', 'Printmaking'),
  ('Screen Print Poster Series', 'Vintage-inspired screen print poster celebrating local landmarks. Set of three designs.', 75.00, '/images/artpieces/screen-print-posters.jpg', 'mariaart', 'Printmaking'),
  
  -- Mixed Media
  ('Mixed Media Collage Art', 'Contemporary collage combining fabric, paper, and paint to create a textured landscape scene.', 195.00, '/images/artpieces/mixed-media-collage.jpg', 'mariaart', 'Mixed Media'),
  
  -- Other category
  ('Upcycled Book Planter', 'Creative planter made from vintage hardcover books, waterproofed and perfect for succulents.', 35.00, '/images/artpieces/book-planter.jpg', 'mariaart', 'Other')
) AS artpiece_data(title, description, price, hero_image_url, creator_username, category_name)
JOIN user_ids u ON u.username = artpiece_data.creator_username
JOIN category_ids c ON c.name = artpiece_data.category_name;

-- Add some reviews for the new artpieces
WITH artpiece_ids AS (
  SELECT a.id as artpiece_id, a.title, u.username as creator 
  FROM artpieces a 
  JOIN users u ON a.creator_id = u.id
  WHERE a.title IN ('Forged Iron Candle Holder', 'Abstract Landscape Oil Painting', 'Decorative Ceramic Tiles', 'Mixed Media Collage Art', 'Upcycled Book Planter')
),
reviewer_ids AS (
  SELECT id, username FROM users WHERE username IN ('frankbuyer', 'gracebuyer', 'alicepotter', 'bobwood')
)
INSERT INTO reviews (artpiece_id, reviewer_id, rating, comment)
SELECT 
  a.artpiece_id,
  r.id,
  review_data.rating,
  review_data.comment
FROM (VALUES
  ('Forged Iron Candle Holder', 'frankbuyer', 5, 'Beautiful craftsmanship! The iron work is stunning and it creates such a cozy atmosphere.'),
  ('Abstract Landscape Oil Painting', 'gracebuyer', 4, 'Love the colors and composition. It''s the perfect size for my living room wall.'),
  ('Decorative Ceramic Tiles', 'alicepotter', 5, 'Amazing detail in the hand-painting. These tiles are works of art in themselves!'),
  ('Mixed Media Collage Art', 'bobwood', 4, 'Really unique piece with interesting textures. Great conversation starter.'),
  ('Upcycled Book Planter', 'frankbuyer', 5, 'Such a creative idea! Perfect for my office desk and the succulents love it.'),
  ('Abstract Landscape Oil Painting', 'frankbuyer', 5, 'Maria is incredibly talented. The painting has so much depth and emotion.'),
  ('Forged Iron Candle Holder', 'gracebuyer', 4, 'High quality metalwork. Looks great with thick pillar candles.')
) AS review_data(artpiece_title, reviewer_username, rating, comment)
JOIN artpiece_ids a ON a.title = review_data.artpiece_title
JOIN reviewer_ids r ON r.username = review_data.reviewer_username;

-- Add some favorites for the new pieces
WITH artpiece_ids AS (
  SELECT a.id as artpiece_id, a.title 
  FROM artpieces a
  WHERE a.title IN ('Copper Garden Sculpture', 'Watercolor Botanical Series', 'Clay Figure Sculpture', 'Linocut Nature Print', 'Screen Print Poster Series')
),
user_ids AS (
  SELECT id, username FROM users
)
INSERT INTO favorites (user_id, artpiece_id)
SELECT 
  u.id,
  a.artpiece_id
FROM (VALUES
  ('frankbuyer', 'Copper Garden Sculpture'),
  ('gracebuyer', 'Watercolor Botanical Series'),
  ('alicepotter', 'Clay Figure Sculpture'),
  ('bobwood', 'Linocut Nature Print'),
  ('davidgold', 'Screen Print Poster Series'),
  ('emmaglass', 'Copper Garden Sculpture'),
  ('mariaart', 'Watercolor Botanical Series')
) AS favorite_data(username, artpiece_title)
JOIN user_ids u ON u.username = favorite_data.username
JOIN artpiece_ids a ON a.title = favorite_data.artpiece_title;

-- Update view counts for new artpieces to make them feel realistic
UPDATE artpieces 
SET view_count = FLOOR(RANDOM() * 75) + 5
WHERE creator_id = (SELECT id FROM users WHERE username = 'mariaart');

-- Add some variation to existing artpiece view counts
UPDATE artpieces 
SET view_count = view_count + FLOOR(RANDOM() * 25)
WHERE view_count > 0;
