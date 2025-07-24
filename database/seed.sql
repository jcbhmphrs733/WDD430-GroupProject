INSERT INTO users (id, email, username, first_name, last_name, password_hash, bio, profile_image_url) VALUES
(uuid_generate_v4(), 'alice.potter@example.com', 'alicepotter', 'Alice', 'Potter', '$2a$10$example.hash.for.alice', 'I''ve been creating pottery for over 15 years. Each piece is wheel-thrown and fired in my home studio.', '/images/profiles/alice.jpg'),
(uuid_generate_v4(), 'bob.woodworker@example.com', 'bobwood', 'Bob', 'Carpenter', '$2a$10$example.hash.for.bob', 'Custom furniture maker specializing in live-edge pieces. All wood sourced sustainably from local forests.', '/images/profiles/bob.jpg'),
(uuid_generate_v4(), 'carol.weaver@example.com', 'carolweaves', 'Carol', 'Weaver', '$2a$10$example.hash.for.carol', 'Traditional textile artist creating modern interpretations of ancient weaving techniques.', '/images/profiles/carol.jpg'),
(uuid_generate_v4(), 'david.jeweler@example.com', 'davidgold', 'David', 'Goldsmith', '$2a$10$example.hash.for.david', 'Handcrafting unique jewelry pieces using recycled metals and ethically sourced stones.', '/images/profiles/david.jpg'),
(uuid_generate_v4(), 'emma.glass@example.com', 'emmaglass', 'Emma', 'Glassblower', '$2a$10$example.hash.for.emma', 'Glass artist specializing in functional art pieces. Each item is hand-blown in my studio.', '/images/profiles/emma.jpg'),
(uuid_generate_v4(), 'frank.buyer@example.com', 'frankbuyer', 'Frank', 'Collector', '$2a$10$example.hash.for.frank', 'Art enthusiast and collector of handmade pieces.', NULL),
(uuid_generate_v4(), 'grace.buyer@example.com', 'gracebuyer', 'Grace', 'Johnson', '$2a$10$example.hash.for.grace', 'Interior designer always looking for unique pieces for my clients.', NULL);

WITH user_ids AS (
  SELECT id, username FROM users WHERE username IN ('alicepotter', 'bobwood', 'carolweaves', 'davidgold', 'emmaglass')
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
  ('Handthrown Ceramic Bowl', 'Beautiful blue-glazed ceramic bowl perfect for serving or decoration. Food-safe and dishwasher friendly.', 45.00, '/images/artpieces/ceramic-bowl-1.jpg', 'alicepotter', 'Pottery'),
  ('Rustic Pottery Vase', 'Earth-toned ceramic vase with natural texture. Perfect for dried flowers or as standalone art.', 38.00, '/images/artpieces/pottery-vase-1.jpg', 'alicepotter', 'Pottery'),
  ('Custom Oak Cutting Board', 'Handcrafted oak cutting board with juice groove and rubber feet. Treated with food-safe mineral oil.', 75.00, '/images/artpieces/oak-cutting-board.jpg', 'bobwood', 'Woodworking'),
  ('Live Edge Walnut Table', 'Stunning live-edge walnut coffee table with hairpin legs. Each piece is unique with natural wood characteristics.', 450.00, '/images/artpieces/walnut-table.jpg', 'bobwood', 'Woodworking'),
  ('Cedar Jewelry Box', 'Handcrafted cedar box with velvet lining and brass hinges. Perfect for storing precious jewelry.', 120.00, '/images/artpieces/cedar-jewelry-box.jpg', 'bobwood', 'Woodworking'),
  ('Wool Winter Scarf', 'Hand-knitted merino wool scarf in forest green. Soft, warm, and perfect for cold weather.', 35.00, '/images/artpieces/wool-scarf-green.jpg', 'carolweaves', 'Textiles'),
  ('Woven Wall Hanging', 'Modern macramé wall hanging in neutral tones. Adds texture and warmth to any space.', 65.00, '/images/artpieces/wall-hanging-macrame.jpg', 'carolweaves', 'Fiber Arts'),
  ('Sterling Silver Pendant', 'Delicate silver pendant with natural turquoise stone. Comes with matching chain.', 85.00, '/images/artpieces/silver-pendant-turquoise.jpg', 'davidgold', 'Jewelry'),
  ('Copper Wire Bracelet', 'Handwoven copper wire bracelet with adjustable sizing. Develops beautiful patina over time.', 28.00, '/images/artpieces/copper-bracelet.jpg', 'davidgold', 'Jewelry'),
  ('Hand-blown Glass Vase', 'Elegant clear glass vase with subtle blue swirls. Perfect for fresh or dried flowers.', 95.00, '/images/artpieces/glass-vase-blue.jpg', 'emmaglass', 'Glass Art'),
  ('Glass Tea Light Holders', 'Set of three amber glass tea light holders. Creates beautiful warm lighting for any occasion.', 42.00, '/images/artpieces/glass-tea-lights.jpg', 'emmaglass', 'Glass Art')
) AS artpiece_data(title, description, price, hero_image_url, creator_username, category_name)
JOIN user_ids u ON u.username = artpiece_data.creator_username
JOIN category_ids c ON c.name = artpiece_data.category_name;

WITH artpiece_ids AS (
  SELECT a.id as artpiece_id, a.title, u.username as creator 
  FROM artpieces a 
  JOIN users u ON a.creator_id = u.id
),
reviewer_ids AS (
  SELECT id, username FROM users WHERE username IN ('frankbuyer', 'gracebuyer')
)
INSERT INTO reviews (artpiece_id, reviewer_id, rating, comment)
SELECT 
  a.artpiece_id,
  r.id,
  review_data.rating,
  review_data.comment
FROM (VALUES
  ('Handthrown Ceramic Bowl', 'frankbuyer', 5, 'Absolutely beautiful bowl! The craftsmanship is outstanding and it''s perfect for serving salads.'),
  ('Custom Oak Cutting Board', 'gracebuyer', 4, 'High-quality cutting board. Love the juice groove feature. Would definitely recommend.'),
  ('Wool Winter Scarf', 'frankbuyer', 5, 'So soft and warm! The color is exactly as shown. Great communication with the seller.'),
  ('Sterling Silver Pendant', 'gracebuyer', 5, 'Gorgeous pendant! The turquoise stone is beautiful and the silver work is exquisite.'),
  ('Hand-blown Glass Vase', 'frankbuyer', 4, 'Beautiful vase with unique character. Slightly smaller than expected but still lovely.'),
  ('Live Edge Walnut Table', 'gracebuyer', 5, 'Stunning piece! The natural edge is gorgeous and the craftsmanship is top-notch. Worth every penny.')
) AS review_data(artpiece_title, reviewer_username, rating, comment)
JOIN artpiece_ids a ON a.title = review_data.artpiece_title
JOIN reviewer_ids r ON r.username = review_data.reviewer_username;

WITH artpiece_ids AS (
  SELECT a.id as artpiece_id, a.title 
  FROM artpieces a
),
user_ids AS (
  SELECT id, username FROM users
)
INSERT INTO favorites (user_id, artpiece_id)
SELECT 
  u.id,
  a.artpiece_id
FROM (VALUES
  ('frankbuyer', 'Cedar Jewelry Box'),
  ('frankbuyer', 'Woven Wall Hanging'),
  ('frankbuyer', 'Glass Tea Light Holders'),
  ('gracebuyer', 'Live Edge Walnut Table'),
  ('gracebuyer', 'Hand-blown Glass Vase'),
  ('gracebuyer', 'Rustic Pottery Vase'),
  ('alicepotter', 'Custom Oak Cutting Board'),
  ('bobwood', 'Sterling Silver Pendant')
) AS favorite_data(username, artpiece_title)
JOIN user_ids u ON u.username = favorite_data.username
JOIN artpiece_ids a ON a.title = favorite_data.artpiece_title;

UPDATE artpieces 
SET view_count = FLOOR(RANDOM() * 100) + 10
WHERE id IN (SELECT id FROM artpieces LIMIT 8);
