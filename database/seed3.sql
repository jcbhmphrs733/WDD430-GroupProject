
INSERT INTO users (id, email, username, first_name, last_name, password_hash, bio, profile_image_url) VALUES
(uuid_generate_v4(), 'alex.creative@example.com', 'alexcreates', 'Alex', 'Thompson', '$2a$10$example.hash.for.alex', 'Contemporary artist exploring the intersection of traditional crafts and modern design. I work across multiple mediums to create pieces that tell stories of our time.', '/images/user-profile-pics/alex.jpg'),
(uuid_generate_v4(), 'sofia.artisan@example.com', 'sofiaartisan', 'Sofia', 'Chen', '$2a$10$example.hash.for.sofia', 'Mixed-media artist with a passion for sustainable art practices. I love repurposing materials and combining different techniques to create unique, environmentally conscious pieces.', '/images/user-profile-pics/sofia.jpg');


UPDATE artpieces 
SET creator_id = (SELECT id FROM users WHERE username = 'alexcreates')
WHERE title IN ('Copper Garden Sculpture', 'Abstract Landscape Oil Painting');

UPDATE artpieces 
SET creator_id = (SELECT id FROM users WHERE username = 'sofiaartisan')
WHERE title IN ('Mixed Media Collage Art', 'Upcycled Book Planter');

WITH user_ids AS (
  SELECT id, username FROM users WHERE username = 'alexcreates'
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

  ('Modern Ceramic Sculpture', 'Contemporary ceramic sculpture with geometric patterns and matte finish. Statement piece perfect for modern interiors.', 165.00, '/images/artpieces/modern-ceramic-sculpture.jpg', 'alexcreates', 'Sculpture'),
  ('Minimalist Steel Wall Art', 'Clean-lined steel wall sculpture with powder-coated finish. Industrial aesthetic meets fine art.', 220.00, '/images/artpieces/steel-wall-art.jpg', 'alexcreates', 'Metalwork'),
  ('Digital Art Print Series', 'Limited edition giclee prints of original digital artwork. Modern interpretation of classical themes.', 65.00, '/images/artpieces/digital-art-prints.jpg', 'alexcreates', 'Printmaking'),
  ('Reclaimed Wood Mirror', 'Handcrafted mirror frame using reclaimed barn wood. Each piece has unique character and history.', 135.00, '/images/artpieces/reclaimed-wood-mirror.jpg', 'alexcreates', 'Woodworking')
) AS artpiece_data(title, description, price, hero_image_url, creator_username, category_name)
JOIN user_ids u ON u.username = artpiece_data.creator_username
JOIN category_ids c ON c.name = artpiece_data.category_name;

WITH user_ids AS (
  SELECT id, username FROM users WHERE username = 'sofiaartisan'
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

  ('Recycled Textile Wall Hanging', 'Woven wall art created from recycled fabric scraps. Colorful and environmentally conscious design.', 85.00, '/images/artpieces/recycled-textile-hanging.jpg', 'sofiaartisan', 'Fiber Arts'),
  ('Eco-Friendly Pottery Set', 'Dinnerware set made from reclaimed clay with natural, non-toxic glazes. Sustainable and beautiful.', 150.00, '/images/artpieces/eco-pottery-set.jpg', 'sofiaartisan', 'Pottery'),
  ('Upcycled Glass Terrarium', 'Terrarium created from repurposed glass containers. Perfect for succulents and air plants.', 45.00, '/images/artpieces/upcycled-terrarium.jpg', 'sofiaartisan', 'Glass Art'),
  ('Sustainable Jewelry Collection', 'Earrings and pendant set made from recycled metals and ethically sourced stones.', 75.00, '/images/artpieces/sustainable-jewelry.jpg', 'sofiaartisan', 'Jewelry')
) AS artpiece_data(title, description, price, hero_image_url, creator_username, category_name)
JOIN user_ids u ON u.username = artpiece_data.creator_username
JOIN category_ids c ON c.name = artpiece_data.category_name;

UPDATE reviews 
SET artpiece_id = (
  SELECT id FROM artpieces WHERE title = 'Copper Garden Sculpture' 
  AND creator_id = (SELECT id FROM users WHERE username = 'alexcreates')
)
WHERE artpiece_id = (
  SELECT id FROM artpieces WHERE title = 'Copper Garden Sculpture'
  AND creator_id = (SELECT id FROM users WHERE username = 'mariaart')
);

WITH artpiece_ids AS (
  SELECT a.id as artpiece_id, a.title, u.username as creator 
  FROM artpieces a 
  JOIN users u ON a.creator_id = u.id
  WHERE a.title IN ('Modern Ceramic Sculpture', 'Minimalist Steel Wall Art', 'Recycled Textile Wall Hanging', 'Eco-Friendly Pottery Set', 'Sustainable Jewelry Collection')
),
reviewer_ids AS (
  SELECT id, username FROM users WHERE username IN ('frankbuyer', 'gracebuyer', 'alicepotter', 'bobwood', 'davidgold')
)
INSERT INTO reviews (artpiece_id, reviewer_id, rating, comment)
SELECT 
  a.artpiece_id,
  r.id,
  review_data.rating,
  review_data.comment
FROM (VALUES
  ('Modern Ceramic Sculpture', 'frankbuyer', 5, 'Alex has such a unique contemporary style! This sculpture is a perfect centerpiece for my living room.'),
  ('Minimalist Steel Wall Art', 'gracebuyer', 4, 'Beautiful modern piece. The clean lines work perfectly in my minimalist space.'),
  ('Recycled Textile Wall Hanging', 'alicepotter', 5, 'Love Sofia''s commitment to sustainability! The colors are vibrant and the quality is excellent.'),
  ('Eco-Friendly Pottery Set', 'bobwood', 4, 'Great to see eco-conscious artisans. The pottery is well-made and feels good to use.'),
  ('Sustainable Jewelry Collection', 'davidgold', 5, 'As a fellow jewelry maker, I really appreciate Sofia''s ethical sourcing. Beautiful work!'),
  ('Modern Ceramic Sculpture', 'gracebuyer', 4, 'Alex''s contemporary style is refreshing. Great addition to any modern home.'),
  ('Recycled Textile Wall Hanging', 'frankbuyer', 5, 'Amazing how Sofia transforms waste into art. Truly inspiring and beautiful!')
) AS review_data(artpiece_title, reviewer_username, rating, comment)
JOIN artpiece_ids a ON a.title = review_data.artpiece_title
JOIN reviewer_ids r ON r.username = review_data.reviewer_username;

WITH artpiece_ids AS (
  SELECT a.id as artpiece_id, a.title, u.username as creator
  FROM artpieces a 
  JOIN users u ON a.creator_id = u.id
  WHERE a.title IN ('Digital Art Print Series', 'Reclaimed Wood Mirror', 'Upcycled Glass Terrarium', 'Copper Garden Sculpture', 'Mixed Media Collage Art')
),
user_ids AS (
  SELECT id, username FROM users
)
INSERT INTO favorites (user_id, artpiece_id)
SELECT 
  u.id,
  a.artpiece_id
FROM (VALUES
  ('frankbuyer', 'Digital Art Print Series'),
  ('gracebuyer', 'Reclaimed Wood Mirror'),
  ('alicepotter', 'Upcycled Glass Terrarium'),
  ('bobwood', 'Copper Garden Sculpture'),
  ('davidgold', 'Mixed Media Collage Art'),
  ('emmaglass', 'Digital Art Print Series'),
  ('mariaart', 'Sustainable Jewelry Collection'),
  ('alexcreates', 'Eco-Friendly Pottery Set'),
  ('sofiaartisan', 'Modern Ceramic Sculpture')
) AS favorite_data(username, artpiece_title)
JOIN user_ids u ON u.username = favorite_data.username
JOIN artpiece_ids a ON a.title = favorite_data.artpiece_title;

UPDATE artpieces 
SET view_count = FLOOR(RANDOM() * 60) + 15
WHERE creator_id IN (
  SELECT id FROM users WHERE username IN ('alexcreates', 'sofiaartisan')
);

UPDATE artpieces 
SET view_count = view_count + FLOOR(RANDOM() * 20) + 10
WHERE title IN ('Copper Garden Sculpture', 'Abstract Landscape Oil Painting', 'Mixed Media Collage Art', 'Upcycled Book Planter');

WITH user_cross_ref AS (
  SELECT id, username FROM users WHERE username IN ('alexcreates', 'sofiaartisan', 'mariaart', 'alicepotter', 'bobwood')
),
artpiece_cross_ref AS (
  SELECT a.id as artpiece_id, a.title, u.username as creator
  FROM artpieces a 
  JOIN users u ON a.creator_id = u.id
  WHERE u.username IN ('alexcreates', 'sofiaartisan', 'mariaart')
)
INSERT INTO favorites (user_id, artpiece_id)
SELECT DISTINCT
  u.id,
  a.artpiece_id
FROM (VALUES
  ('alexcreates', 'Forged Iron Candle Holder'),
  ('sofiaartisan', 'Watercolor Botanical Series'),
  ('mariaart', 'Modern Ceramic Sculpture'),
  ('alicepotter', 'Recycled Textile Wall Hanging'),
  ('bobwood', 'Minimalist Steel Wall Art')
) AS cross_favorite_data(username, artpiece_title)
JOIN user_cross_ref u ON u.username = cross_favorite_data.username
JOIN artpiece_cross_ref a ON a.title = cross_favorite_data.artpiece_title
WHERE NOT EXISTS (
  SELECT 1 FROM favorites f 
  WHERE f.user_id = u.id AND f.artpiece_id = a.artpiece_id
);
