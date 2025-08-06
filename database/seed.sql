-- Handcrafted Haven - Complete Database Seed Data
-- PostgreSQL seed data for artisan marketplace

-- ============================================
-- USERS/ACCOUNTS - Seeding user data
-- ============================================

-- Initial set of creators and buyers
INSERT INTO users (id, email, username, first_name, last_name, password_hash, bio, profile_image_url) VALUES
-- Original creators
(uuid_generate_v4(), 'alice.potter@example.com', 'alicepotter', 'Alice', 'Potter', '$2a$10$example.hash.for.alice', 'I''ve been creating pottery for over 15 years. Each piece is wheel-thrown and fired in my home studio.', '/images/user-profile-pics/alice.jpg'),
(uuid_generate_v4(), 'bob.woodworker@example.com', 'bobwood', 'Bob', 'Carpenter', '$2a$10$example.hash.for.bob', 'Custom furniture maker specializing in live-edge pieces. All wood sourced sustainably from local forests.', '/images/user-profile-pics/bob.jpg'),
(uuid_generate_v4(), 'carol.weaver@example.com', 'carolweaves', 'Carol', 'Weaver', '$2a$10$example.hash.for.carol', 'Traditional textile artist creating modern interpretations of ancient weaving techniques.', '/images/user-profile-pics/carol.jpg'),
(uuid_generate_v4(), 'david.jeweler@example.com', 'davidgold', 'David', 'Goldsmith', '$2a$10$example.hash.for.david', 'Handcrafting unique jewelry pieces using recycled metals and ethically sourced stones.', '/images/user-profile-pics/david.jpg'),
(uuid_generate_v4(), 'emma.glass@example.com', 'emmaglass', 'Emma', 'Glassblower', '$2a$10$example.hash.for.emma', 'Glass artist specializing in functional art pieces. Each item is hand-blown in my studio.', '/images/user-profile-pics/emma.jpg'),

-- Additional creators
(uuid_generate_v4(), 'maria.artist@example.com', 'mariaart', 'Maria', 'Rodriguez', '$2a$10$example.hash.for.maria', 'Multi-disciplinary artist working in various mediums. I love experimenting with different materials to create unique pieces that tell stories.', '/images/user-profile-pics/maria.jpg'),
(uuid_generate_v4(), 'alex.creative@example.com', 'alexcreates', 'Alex', 'Thompson', '$2a$10$example.hash.for.alex', 'Contemporary artist exploring the intersection of traditional crafts and modern design. I work across multiple mediums to create pieces that tell stories of our time.', '/images/user-profile-pics/alex.jpg'),
(uuid_generate_v4(), 'sofia.artisan@example.com', 'sofiaartisan', 'Sofia', 'Chen', '$2a$10$example.hash.for.sofia', 'Mixed-media artist with a passion for sustainable art practices. I love repurposing materials and combining different techniques to create unique, environmentally conscious pieces.', '/images/user-profile-pics/sofia.jpg'),

-- Buyers and collectors
(uuid_generate_v4(), 'frank.buyer@example.com', 'frankbuyer', 'Frank', 'Hansen', '$2a$10$example.hash.for.frank', 'Art enthusiast, collector, and photographer specializing in architectural and nature photography. I also create custom photo prints and digital art.', '/images/user-profile-pics/frank.jpg'),
(uuid_generate_v4(), 'grace.buyer@example.com', 'gracebuyer', 'Grace', 'Johnson', '$2a$10$example.hash.for.grace', 'Interior designer who creates unique home decor pieces and handmade candles. I love finding and creating pieces that transform spaces.', '/images/user-profile-pics/grace.jpg'),

-- Additional creators
(uuid_generate_v4(), 'jan.levit@example.com', 'janlevit', 'Jan', 'Levit', '$2a$10$example.hash.for.jan', 'Artisan candle maker specializing in hand-poured soy and beeswax candles. I create unique scent blends using natural essential oils and sustainable materials.', '/images/user-profile-pics/jan.jpg'),
(uuid_generate_v4(), 'adrian.cooper@example.com', 'adriancooper', 'Adrian', 'Cooper', '$2a$10$example.hash.for.adrian', 'Master woodworker with 20+ years experience creating custom furniture and decorative pieces. I specialize in traditional joinery techniques and sustainable hardwoods.', '/images/user-profile-pics/adrian.jpg'),
(uuid_generate_v4(), 'paul.simmons@example.com', 'paulsimmons', 'Paul', 'Simmons', '$2a$10$example.hash.for.paul', 'Glass artist and sculptor creating both functional and decorative pieces. I work with traditional glassblowing techniques combined with modern design aesthetics.', '/images/user-profile-pics/paul.jpg');

-- ============================================
-- ARTPIECES - Seeding artpiece data
-- ============================================

-- Original artpieces from initial creators
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
  -- Alice Potter's pottery pieces
  ('Handthrown Ceramic Bowl', 'Beautiful blue-glazed ceramic bowl perfect for serving or decoration. Food-safe and dishwasher friendly.', 45.00, '/images/artpieces/ceramic-bowl-1.jpg', 'alicepotter', 'Pottery'),
  ('Rustic Pottery Vase', 'Earth-toned ceramic vase with natural texture. Perfect for dried flowers or as standalone art.', 38.00, '/images/artpieces/pottery-vase-1.jpg', 'alicepotter', 'Pottery'),
  
  -- Bob Carpenter's woodworking pieces
  ('Custom Oak Cutting Board', 'Handcrafted oak cutting board with juice groove and rubber feet. Treated with food-safe mineral oil.', 75.00, '/images/artpieces/oak-cutting-board.jpg', 'bobwood', 'Woodworking'),
  ('Live Edge Walnut Table', 'Stunning live-edge walnut coffee table with hairpin legs. Each piece is unique with natural wood characteristics.', 450.00, '/images/artpieces/walnut-table.jpg', 'bobwood', 'Woodworking'),
  ('Cedar Jewelry Box', 'Handcrafted cedar box with velvet lining and brass hinges. Perfect for storing precious jewelry.', 120.00, '/images/artpieces/cedar-jewelry-box.jpg', 'bobwood', 'Woodworking'),
  
  -- Carol Weaver's textile pieces
  ('Wool Winter Scarf', 'Hand-knitted merino wool scarf in forest green. Soft, warm, and perfect for cold weather.', 35.00, '/images/artpieces/wool-scarf-green.jpg', 'carolweaves', 'Textiles'),
  ('Woven Wall Hanging', 'Modern macramé wall hanging in neutral tones. Adds texture and warmth to any space.', 65.00, '/images/artpieces/wall-hanging-macrame.jpg', 'carolweaves', 'Fiber Arts'),
  
  -- David Goldsmith's jewelry pieces
  ('Sterling Silver Pendant', 'Delicate silver pendant with natural turquoise stone. Comes with matching chain.', 85.00, '/images/artpieces/silver-pendant-turquoise.jpg', 'davidgold', 'Jewelry'),
  ('Copper Wire Bracelet', 'Handwoven copper wire bracelet with adjustable sizing. Develops beautiful patina over time.', 28.00, '/images/artpieces/copper-bracelet.jpg', 'davidgold', 'Jewelry'),
  
  -- Emma Glassblower's glass art pieces
  ('Hand-blown Glass Vase', 'Elegant clear glass vase with subtle blue swirls. Perfect for fresh or dried flowers.', 95.00, '/images/artpieces/glass-vase-blue.jpg', 'emmaglass', 'Glass Art'),
  ('Glass Tea Light Holders', 'Set of three amber glass tea light holders. Creates beautiful warm lighting for any occasion.', 42.00, '/images/artpieces/glass-tea-lights.jpg', 'emmaglass', 'Glass Art')
) AS artpiece_data(title, description, price, hero_image_url, creator_username, category_name)
JOIN user_ids u ON u.username = artpiece_data.creator_username
JOIN category_ids c ON c.name = artpiece_data.category_name;

-- Maria Rodriguez's multi-disciplinary pieces
WITH user_ids AS (
  SELECT id, username FROM users WHERE username = 'mariaart'
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
  
  -- Painting pieces
  ('Watercolor Botanical Series', 'Set of three watercolor paintings featuring native wildflowers. Sold as a collection.', 120.00, '/images/artpieces/watercolor-botanicals.jpg', 'mariaart', 'Painting'),
  
  -- Sculpture pieces
  ('Clay Figure Sculpture', 'Hand-sculpted ceramic figure representing joy and movement. Kiln-fired and finished with matte glaze.', 145.00, '/images/artpieces/clay-figure-sculpture.jpg', 'mariaart', 'Sculpture'),
  
  -- Ceramics pieces
  ('Decorative Ceramic Tiles', 'Set of six hand-painted ceramic tiles with geometric patterns. Perfect for backsplash or wall art.', 85.00, '/images/artpieces/decorative-tiles.jpg', 'mariaart', 'Ceramics'),
  
  -- Printmaking pieces
  ('Linocut Nature Print', 'Hand-pulled linocut print featuring forest animals. Limited edition of 25 prints, signed and numbered.', 45.00, '/images/artpieces/linocut-nature.jpg', 'mariaart', 'Printmaking'),
  ('Screen Print Poster Series', 'Vintage-inspired screen print poster celebrating local landmarks. Set of three designs.', 75.00, '/images/artpieces/screen-print-posters.jpg', 'mariaart', 'Printmaking')
) AS artpiece_data(title, description, price, hero_image_url, creator_username, category_name)
JOIN user_ids u ON u.username = artpiece_data.creator_username
JOIN category_ids c ON c.name = artpiece_data.category_name;

-- Alex Thompson's contemporary pieces
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
  ('Copper Garden Sculpture', 'Abstract copper sculpture designed for garden display. Develops beautiful patina over time.', 185.00, '/images/artpieces/copper-garden-sculpture.jpg', 'alexcreates', 'Metalwork'),
  ('Abstract Landscape Oil Painting', 'Original oil painting on canvas depicting an abstract mountain landscape. Ready to hang with included frame.', 250.00, '/images/artpieces/abstract-landscape.jpg', 'alexcreates', 'Painting'),
  ('Modern Ceramic Sculpture', 'Contemporary ceramic sculpture with geometric patterns and matte finish. Statement piece perfect for modern interiors.', 165.00, '/images/artpieces/modern-ceramic-sculpture.jpg', 'alexcreates', 'Sculpture'),
  ('Minimalist Steel Wall Art', 'Clean-lined steel wall sculpture with powder-coated finish. Industrial aesthetic meets fine art.', 220.00, '/images/artpieces/steel-wall-art.jpg', 'alexcreates', 'Metalwork'),
  ('Digital Art Print Series', 'Limited edition giclee prints of original digital artwork. Modern interpretation of classical themes.', 65.00, '/images/artpieces/digital-art-prints.jpg', 'alexcreates', 'Printmaking'),
  ('Reclaimed Wood Mirror', 'Handcrafted mirror frame using reclaimed barn wood. Each piece has unique character and history.', 135.00, '/images/artpieces/reclaimed-wood-mirror.jpg', 'alexcreates', 'Woodworking')
) AS artpiece_data(title, description, price, hero_image_url, creator_username, category_name)
JOIN user_ids u ON u.username = artpiece_data.creator_username
JOIN category_ids c ON c.name = artpiece_data.category_name;

-- Sofia Chen's sustainable pieces
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
  ('Mixed Media Collage Art', 'Contemporary collage combining fabric, paper, and paint to create a textured landscape scene.', 195.00, '/images/artpieces/mixed-media-collage.jpg', 'sofiaartisan', 'Mixed Media'),
  ('Upcycled Book Planter', 'Creative planter made from vintage hardcover books, waterproofed and perfect for succulents.', 35.00, '/images/artpieces/book-planter.jpg', 'sofiaartisan', 'Other'),
  ('Recycled Textile Wall Hanging', 'Woven wall art created from recycled fabric scraps. Colorful and environmentally conscious design.', 85.00, '/images/artpieces/recycled-textile-hanging.jpg', 'sofiaartisan', 'Fiber Arts'),
  ('Eco-Friendly Pottery Set', 'Dinnerware set made from reclaimed clay with natural, non-toxic glazes. Sustainable and beautiful.', 150.00, '/images/artpieces/eco-pottery-set.jpg', 'sofiaartisan', 'Pottery'),
  ('Upcycled Glass Terrarium', 'Terrarium created from repurposed glass containers. Perfect for succulents and air plants.', 45.00, '/images/artpieces/upcycled-terrarium.jpg', 'sofiaartisan', 'Glass Art'),
  ('Sustainable Jewelry Collection', 'Earrings and pendant set made from recycled metals and ethically sourced stones.', 75.00, '/images/artpieces/sustainable-jewelry.jpg', 'sofiaartisan', 'Jewelry')
) AS artpiece_data(title, description, price, hero_image_url, creator_username, category_name)
JOIN user_ids u ON u.username = artpiece_data.creator_username
JOIN category_ids c ON c.name = artpiece_data.category_name;

-- Frank Collector's photography and digital art pieces
WITH user_ids AS (
  SELECT id, username FROM users WHERE username = 'frankbuyer'
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
  ('Urban Architecture Print', 'Black and white architectural photography print capturing the geometric beauty of modern cityscapes. Professionally printed on high-quality paper.', 85.00, '/images/artpieces/urban-architecture.jpg', 'frankbuyer', 'Photography'),
  ('Nature Landscape Series', 'Set of three landscape photographs featuring local mountain vistas during golden hour. Each print signed and numbered.', 150.00, '/images/artpieces/nature-landscapes.jpg', 'frankbuyer', 'Photography'),
  ('Digital Abstract Art', 'Contemporary digital artwork exploring color and form through abstract composition. Available as high-resolution print or digital download.', 65.00, '/images/artpieces/digital-abstract.jpg', 'frankbuyer', 'Digital Art')
) AS artpiece_data(title, description, price, hero_image_url, creator_username, category_name)
JOIN user_ids u ON u.username = artpiece_data.creator_username
JOIN category_ids c ON c.name = artpiece_data.category_name;

-- Grace Johnson's home decor and candle pieces
WITH user_ids AS (
  SELECT id, username FROM users WHERE username = 'gracebuyer'
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
  ('Handpoured Soy Candles', 'Set of three artisan soy candles in ceramic vessels. Scented with natural essential oils: lavender, eucalyptus, and vanilla.', 45.00, '/images/artpieces/soy-candles.jpg', 'gracebuyer', 'Other'),
  ('Macrame Plant Hangers', 'Beautiful macrame plant hangers made from natural cotton rope. Perfect for displaying your favorite plants in any space.', 35.00, '/images/artpieces/macrame-hangers.jpg', 'gracebuyer', 'Home Decor'),
  ('Custom Throw Pillows', 'Designer throw pillows with hand-selected fabrics and unique patterns. Custom sizes and colors available upon request.', 55.00, '/images/artpieces/throw-pillows.jpg', 'gracebuyer', 'Home Decor')
) AS artpiece_data(title, description, price, hero_image_url, creator_username, category_name)
JOIN user_ids u ON u.username = artpiece_data.creator_username
JOIN category_ids c ON c.name = artpiece_data.category_name;

-- Jan Levit's candle pieces
WITH user_ids AS (
  SELECT id, username FROM users WHERE username = 'janlevit'
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
  ('Lavender Beeswax Pillar Candles', 'Set of two hand-poured beeswax pillar candles infused with pure lavender essential oil. Natural cotton wicks provide a clean, long-lasting burn.', 35.00, '/images/artpieces/lavender-pillar-candles.jpg', 'janlevit', 'Other'),
  ('Vanilla Soy Wax Tea Lights', 'Pack of twelve vanilla-scented soy wax tea lights in natural aluminum cups. Perfect for creating ambient lighting and relaxing atmosphere.', 25.00, '/images/artpieces/vanilla-tea-lights.jpg', 'janlevit', 'Other'),
  ('Eucalyptus Cedar Jar Candles', 'Large mason jar candles with eucalyptus and cedar scent blend. Made from 100% soy wax with wooden wicks for a cozy crackling sound.', 45.00, '/images/artpieces/eucalyptus-jar-candles.jpg', 'janlevit', 'Other'),
  ('Seasonal Spice Candle Collection', 'Limited edition collection of three candles featuring warm spice blends: cinnamon bark, clove orange, and vanilla nutmeg. Holiday favorite!', 65.00, '/images/artpieces/spice-candle-collection.jpg', 'janlevit', 'Other')
) AS artpiece_data(title, description, price, hero_image_url, creator_username, category_name)
JOIN user_ids u ON u.username = artpiece_data.creator_username
JOIN category_ids c ON c.name = artpiece_data.category_name;

-- Adrian Cooper's woodworking pieces
WITH user_ids AS (
  SELECT id, username FROM users WHERE username = 'adriancooper'
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
  ('Solid Oak Dining Table', 'Handcrafted solid oak dining table featuring traditional mortise and tenon joinery. Seats 6-8 people comfortably with rich natural grain finish.', 850.00, '/images/artpieces/oak-dining-table.jpg', 'adriancooper', 'Woodworking'),
  ('Maple Floating Shelves', 'Set of three floating shelves crafted from sustainably sourced maple. Hidden bracket system creates clean, modern look perfect for any room.', 120.00, '/images/artpieces/maple-floating-shelves.jpg', 'adriancooper', 'Woodworking'),
  ('Walnut Chess Board', 'Premium chess board hand-crafted from alternating walnut and maple squares. Felt-lined storage drawer underneath holds chess pieces.', 185.00, '/images/artpieces/walnut-chess-board.jpg', 'adriancooper', 'Woodworking')
) AS artpiece_data(title, description, price, hero_image_url, creator_username, category_name)
JOIN user_ids u ON u.username = artpiece_data.creator_username
JOIN category_ids c ON c.name = artpiece_data.category_name;

-- Paul Simmons's glass art pieces
WITH user_ids AS (
  SELECT id, username FROM users WHERE username = 'paulsimmons'
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
  ('Blown Glass Garden Orbs', 'Set of three colorful blown glass orbs designed for garden display. Weather-resistant finish in blues, greens, and amber tones.', 95.00, '/images/artpieces/blown-glass-orbs.jpg', 'paulsimmons', 'Glass Art'),
  ('Stained Glass Window Panel', 'Custom stained glass panel featuring abstract geometric design in rich jewel tones. Perfect for hanging in windows to catch natural light.', 125.00, '/images/artpieces/stained-glass-panel.jpg', 'paulsimmons', 'Glass Art'),
  ('Hand-blown Wine Glasses', 'Set of four elegant wine glasses with delicate stems and perfectly balanced bowls. Each glass is individually blown and unique.', 85.00, '/images/artpieces/blown-wine-glasses.jpg', 'paulsimmons', 'Glass Art')
) AS artpiece_data(title, description, price, hero_image_url, creator_username, category_name)
JOIN user_ids u ON u.username = artpiece_data.creator_username
JOIN category_ids c ON c.name = artpiece_data.category_name;

-- ============================================
-- REVIEWS - Seeding review data
-- ============================================

-- Reviews for original artpieces
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

-- Reviews for Maria's artpieces
WITH artpiece_ids AS (
  SELECT a.id as artpiece_id, a.title, u.username as creator 
  FROM artpieces a 
  JOIN users u ON a.creator_id = u.id
  WHERE a.title IN ('Forged Iron Candle Holder', 'Decorative Ceramic Tiles', 'Watercolor Botanical Series', 'Linocut Nature Print')
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
  ('Forged Iron Candle Holder', 'gracebuyer', 4, 'High quality metalwork. Looks great with thick pillar candles.'),
  ('Decorative Ceramic Tiles', 'alicepotter', 5, 'Amazing detail in the hand-painting. These tiles are works of art in themselves!'),
  ('Watercolor Botanical Series', 'bobwood', 4, 'Really beautiful botanical work. Great attention to detail and color.'),
  ('Linocut Nature Print', 'frankbuyer', 5, 'Love the limited edition nature prints. Maria''s technique is exceptional.')
) AS review_data(artpiece_title, reviewer_username, rating, comment)
JOIN artpiece_ids a ON a.title = review_data.artpiece_title
JOIN reviewer_ids r ON r.username = review_data.reviewer_username;

-- Reviews for Alex's contemporary pieces
WITH artpiece_ids AS (
  SELECT a.id as artpiece_id, a.title, u.username as creator 
  FROM artpieces a 
  JOIN users u ON a.creator_id = u.id
  WHERE a.title IN ('Modern Ceramic Sculpture', 'Minimalist Steel Wall Art', 'Abstract Landscape Oil Painting', 'Digital Art Print Series')
),
reviewer_ids AS (
  SELECT id, username FROM users WHERE username IN ('frankbuyer', 'gracebuyer', 'davidgold')
)
INSERT INTO reviews (artpiece_id, reviewer_id, rating, comment)
SELECT 
  a.artpiece_id,
  r.id,
  review_data.rating,
  review_data.comment
FROM (VALUES
  ('Modern Ceramic Sculpture', 'frankbuyer', 5, 'Alex has such a unique contemporary style! This sculpture is a perfect centerpiece for my living room.'),
  ('Modern Ceramic Sculpture', 'gracebuyer', 4, 'Alex''s contemporary style is refreshing. Great addition to any modern home.'),
  ('Minimalist Steel Wall Art', 'gracebuyer', 4, 'Beautiful modern piece. The clean lines work perfectly in my minimalist space.'),
  ('Abstract Landscape Oil Painting', 'gracebuyer', 4, 'Love the colors and composition. It''s the perfect size for my living room wall.'),
  ('Abstract Landscape Oil Painting', 'frankbuyer', 5, 'Alex is incredibly talented. The painting has so much depth and emotion.'),
  ('Digital Art Print Series', 'davidgold', 4, 'Great modern interpretation of classical themes. High quality prints.')
) AS review_data(artpiece_title, reviewer_username, rating, comment)
JOIN artpiece_ids a ON a.title = review_data.artpiece_title
JOIN reviewer_ids r ON r.username = review_data.reviewer_username;

-- Reviews for Sofia's sustainable pieces
WITH artpiece_ids AS (
  SELECT a.id as artpiece_id, a.title, u.username as creator 
  FROM artpieces a 
  JOIN users u ON a.creator_id = u.id
  WHERE a.title IN ('Recycled Textile Wall Hanging', 'Eco-Friendly Pottery Set', 'Sustainable Jewelry Collection', 'Mixed Media Collage Art', 'Upcycled Book Planter')
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
  ('Recycled Textile Wall Hanging', 'alicepotter', 5, 'Love Sofia''s commitment to sustainability! The colors are vibrant and the quality is excellent.'),
  ('Recycled Textile Wall Hanging', 'frankbuyer', 5, 'Amazing how Sofia transforms waste into art. Truly inspiring and beautiful!'),
  ('Eco-Friendly Pottery Set', 'bobwood', 4, 'Great to see eco-conscious artisans. The pottery is well-made and feels good to use.'),
  ('Sustainable Jewelry Collection', 'davidgold', 5, 'As a fellow jewelry maker, I really appreciate Sofia''s ethical sourcing. Beautiful work!'),
  ('Mixed Media Collage Art', 'bobwood', 4, 'Really unique piece with interesting textures. Great conversation starter.'),
  ('Upcycled Book Planter', 'frankbuyer', 5, 'Such a creative idea! Perfect for my office desk and the succulents love it.')
) AS review_data(artpiece_title, reviewer_username, rating, comment)
JOIN artpiece_ids a ON a.title = review_data.artpiece_title
JOIN reviewer_ids r ON r.username = review_data.reviewer_username;

-- Reviews for Frank's photography and digital art
WITH artpiece_ids AS (
  SELECT a.id as artpiece_id, a.title, u.username as creator 
  FROM artpieces a 
  JOIN users u ON a.creator_id = u.id
  WHERE a.title IN ('Urban Architecture Print', 'Nature Landscape Series', 'Digital Abstract Art')
),
reviewer_ids AS (
  SELECT id, username FROM users WHERE username IN ('gracebuyer', 'alicepotter', 'mariaart')
)
INSERT INTO reviews (artpiece_id, reviewer_id, rating, comment)
SELECT 
  a.artpiece_id,
  r.id,
  review_data.rating,
  review_data.comment
FROM (VALUES
  ('Urban Architecture Print', 'gracebuyer', 5, 'Frank has a great eye for architectural photography! This print looks amazing in my client''s modern loft.'),
  ('Nature Landscape Series', 'alicepotter', 4, 'Beautiful landscape work. The golden hour lighting is perfectly captured.'),
  ('Digital Abstract Art', 'mariaart', 5, 'Love Frank''s transition into digital art. The composition and color work are excellent.')
) AS review_data(artpiece_title, reviewer_username, rating, comment)
JOIN artpiece_ids a ON a.title = review_data.artpiece_title
JOIN reviewer_ids r ON r.username = review_data.reviewer_username;

-- Reviews for Grace's home decor pieces
WITH artpiece_ids AS (
  SELECT a.id as artpiece_id, a.title, u.username as creator 
  FROM artpieces a 
  JOIN users u ON a.creator_id = u.id
  WHERE a.title IN ('Handpoured Soy Candles', 'Macrame Plant Hangers', 'Custom Throw Pillows')
),
reviewer_ids AS (
  SELECT id, username FROM users WHERE username IN ('frankbuyer', 'emmaglass', 'sofiaartisan')
)
INSERT INTO reviews (artpiece_id, reviewer_id, rating, comment)
SELECT 
  a.artpiece_id,
  r.id,
  review_data.rating,
  review_data.comment
FROM (VALUES
  ('Handpoured Soy Candles', 'frankbuyer', 5, 'Grace''s candles are incredible! The scents are perfect and the ceramic vessels are beautiful.'),
  ('Macrame Plant Hangers', 'emmaglass', 4, 'Well-crafted plant hangers. Perfect for my studio space and the cotton rope is high quality.'),
  ('Custom Throw Pillows', 'sofiaartisan', 5, 'Grace has such great taste in fabrics! The custom pillows transformed my living room.')
) AS review_data(artpiece_title, reviewer_username, rating, comment)
JOIN artpiece_ids a ON a.title = review_data.artpiece_title
JOIN reviewer_ids r ON r.username = review_data.reviewer_username;

-- Reviews for Jan's candle pieces
WITH artpiece_ids AS (
  SELECT a.id as artpiece_id, a.title, u.username as creator 
  FROM artpieces a 
  JOIN users u ON a.creator_id = u.id
  WHERE a.title IN ('Lavender Beeswax Pillar Candles', 'Vanilla Soy Wax Tea Lights', 'Eucalyptus Cedar Jar Candles', 'Seasonal Spice Candle Collection')
),
reviewer_ids AS (
  SELECT id, username FROM users WHERE username IN ('alicepotter', 'bobwood', 'davidgold', 'emmaglass')
)
INSERT INTO reviews (artpiece_id, reviewer_id, rating, comment)
SELECT 
  a.artpiece_id,
  r.id,
  review_data.rating,
  review_data.comment
FROM (VALUES
  ('Lavender Beeswax Pillar Candles', 'alicepotter', 5, 'Jan''s candles are absolutely beautiful! The lavender scent is so calming and the beeswax burns so cleanly.'),
  ('Vanilla Soy Wax Tea Lights', 'bobwood', 4, 'Great quality tea lights. Perfect for my workshop when I need some ambient lighting in the evenings.'),
  ('Eucalyptus Cedar Jar Candles', 'davidgold', 5, 'Love the wooden wick crackling sound! The scent combination is unique and very relaxing.'),
  ('Seasonal Spice Candle Collection', 'emmaglass', 4, 'Perfect for the holidays! The spice blends are warm and inviting, really sets the mood.')
) AS review_data(artpiece_title, reviewer_username, rating, comment)
JOIN artpiece_ids a ON a.title = review_data.artpiece_title
JOIN reviewer_ids r ON r.username = review_data.reviewer_username;

-- Reviews for Adrian's woodworking pieces
WITH artpiece_ids AS (
  SELECT a.id as artpiece_id, a.title, u.username as creator 
  FROM artpieces a 
  JOIN users u ON a.creator_id = u.id
  WHERE a.title IN ('Solid Oak Dining Table', 'Maple Floating Shelves', 'Walnut Chess Board')
),
reviewer_ids AS (
  SELECT id, username FROM users WHERE username IN ('frankbuyer', 'gracebuyer', 'mariaart')
)
INSERT INTO reviews (artpiece_id, reviewer_id, rating, comment)
SELECT 
  a.artpiece_id,
  r.id,
  review_data.rating,
  review_data.comment
FROM (VALUES
  ('Solid Oak Dining Table', 'frankbuyer', 5, 'Adrian''s craftsmanship is exceptional! This table is a masterpiece - the joinery work is flawless and it''s built to last generations.'),
  ('Maple Floating Shelves', 'gracebuyer', 4, 'Beautiful shelves with perfect hidden mounting. Adrian''s attention to detail really shows in the finish work.'),
  ('Walnut Chess Board', 'mariaart', 5, 'Stunning chess board! The wood grain patterns are gorgeous and the storage drawer is so cleverly designed.')
) AS review_data(artpiece_title, reviewer_username, rating, comment)
JOIN artpiece_ids a ON a.title = review_data.artpiece_title
JOIN reviewer_ids r ON r.username = review_data.reviewer_username;

-- Reviews for Paul's glass art pieces
WITH artpiece_ids AS (
  SELECT a.id as artpiece_id, a.title, u.username as creator 
  FROM artpieces a 
  JOIN users u ON a.creator_id = u.id
  WHERE a.title IN ('Blown Glass Garden Orbs', 'Stained Glass Window Panel', 'Hand-blown Wine Glasses')
),
reviewer_ids AS (
  SELECT id, username FROM users WHERE username IN ('carolweaves', 'alexcreates', 'sofiaartisan')
)
INSERT INTO reviews (artpiece_id, reviewer_id, rating, comment)
SELECT 
  a.artpiece_id,
  r.id,
  review_data.rating,
  review_data.comment
FROM (VALUES
  ('Blown Glass Garden Orbs', 'carolweaves', 4, 'Paul''s glass orbs look amazing in my garden! They catch the sunlight beautifully and add such vibrant color.'),
  ('Stained Glass Window Panel', 'alexcreates', 5, 'Incredible stained glass work! The way Paul uses color and light is masterful. It transforms my studio space.'),
  ('Hand-blown Wine Glasses', 'sofiaartisan', 5, 'Each glass is a work of art! Paul''s glassblowing skills are extraordinary - they''re both beautiful and perfectly functional.')
) AS review_data(artpiece_title, reviewer_username, rating, comment)
JOIN artpiece_ids a ON a.title = review_data.artpiece_title
JOIN reviewer_ids r ON r.username = review_data.reviewer_username;

-- ============================================
-- FAVORITES - Seeding favorite data
-- ============================================

-- Original favorites
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
  ('frankbuyer', 'Digital Art Print Series'),
  ('frankbuyer', 'Upcycled Book Planter'),
  ('gracebuyer', 'Live Edge Walnut Table'),
  ('gracebuyer', 'Hand-blown Glass Vase'),
  ('gracebuyer', 'Rustic Pottery Vase'),
  ('gracebuyer', 'Reclaimed Wood Mirror'),
  ('alicepotter', 'Custom Oak Cutting Board'),
  ('alicepotter', 'Clay Figure Sculpture'),
  ('alicepotter', 'Upcycled Glass Terrarium'),
  ('bobwood', 'Sterling Silver Pendant'),
  ('bobwood', 'Linocut Nature Print'),
  ('bobwood', 'Copper Garden Sculpture'),
  ('bobwood', 'Minimalist Steel Wall Art'),
  ('davidgold', 'Screen Print Poster Series'),
  ('davidgold', 'Mixed Media Collage Art'),
  ('emmaglass', 'Copper Garden Sculpture'),
  ('emmaglass', 'Digital Art Print Series'),
  ('mariaart', 'Watercolor Botanical Series'),
  ('mariaart', 'Sustainable Jewelry Collection'),
  ('alexcreates', 'Eco-Friendly Pottery Set'),
  ('alexcreates', 'Forged Iron Candle Holder'),
  ('sofiaartisan', 'Modern Ceramic Sculpture'),
  ('sofiaartisan', 'Watercolor Botanical Series'),
  -- Cross-favorites for Frank and Grace's new creations
  ('gracebuyer', 'Urban Architecture Print'),
  ('alicepotter', 'Nature Landscape Series'),
  ('mariaart', 'Digital Abstract Art'),
  ('frankbuyer', 'Handpoured Soy Candles'),
  ('emmaglass', 'Macrame Plant Hangers'),
  ('sofiaartisan', 'Custom Throw Pillows'),
  -- Favorites for new creators' artpieces
  ('gracebuyer', 'Lavender Beeswax Pillar Candles'),
  ('frankbuyer', 'Eucalyptus Cedar Jar Candles'),
  ('alicepotter', 'Solid Oak Dining Table'),
  ('bobwood', 'Walnut Chess Board'),
  ('davidgold', 'Blown Glass Garden Orbs'),
  ('emmaglass', 'Stained Glass Window Panel'),
  ('mariaart', 'Hand-blown Wine Glasses'),
  ('alexcreates', 'Maple Floating Shelves'),
  ('sofiaartisan', 'Seasonal Spice Candle Collection')
) AS favorite_data(username, artpiece_title)
JOIN user_ids u ON u.username = favorite_data.username
JOIN artpiece_ids a ON a.title = favorite_data.artpiece_title;

-- ============================================
-- VIEW COUNTS - Updating view counts
-- ============================================

-- Set realistic view counts for all artpieces
UPDATE artpieces 
SET view_count = FLOOR(RANDOM() * 100) + 10
WHERE creator_id IN (
  SELECT id FROM users WHERE username IN ('alicepotter', 'bobwood', 'carolweaves', 'davidgold', 'emmaglass')
);

UPDATE artpieces 
SET view_count = FLOOR(RANDOM() * 75) + 5
WHERE creator_id = (SELECT id FROM users WHERE username = 'mariaart');

UPDATE artpieces 
SET view_count = FLOOR(RANDOM() * 60) + 15
WHERE creator_id IN (
  SELECT id FROM users WHERE username IN ('alexcreates', 'sofiaartisan')
);

UPDATE artpieces 
SET view_count = FLOOR(RANDOM() * 40) + 5
WHERE creator_id IN (
  SELECT id FROM users WHERE username IN ('frankbuyer', 'gracebuyer')
);

-- Set view counts for new creators (100-300 range)
UPDATE artpieces 
SET view_count = FLOOR(RANDOM() * 200) + 100
WHERE creator_id IN (
  SELECT id FROM users WHERE username IN ('janlevit', 'adriancooper', 'paulsimmons')
);

-- Add extra views to featured pieces
UPDATE artpieces 
SET view_count = view_count + FLOOR(RANDOM() * 25) + 10
WHERE title IN (
  'Live Edge Walnut Table', 
  'Abstract Landscape Oil Painting', 
  'Modern Ceramic Sculpture', 
  'Mixed Media Collage Art',
  'Copper Garden Sculpture'
);
