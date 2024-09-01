#!/usr/bin/env node

import pg from 'pg'
import initDotEnv from './env'

initDotEnv()

const seed = async () => {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL is not defined')
  }
  const client = new pg.Client({
    connectionString: process.env.POSTGRES_URL,
  })

  console.log('⏳ Checking connexion ...')
  console.log(`🗄️  URL : ${process.env.POSTGRES_URL}`)

  await client.connect()

  const start = Date.now()

  await client.query(` 
      INSERT INTO Todo (title, isCompleted, createdAt, updatedAt) VALUES
      ('Learn TypeScript', false, '2024-01-01 10:00:00', '2024-01-01 10:00:00'),
      ('Build a Next.js App', false, '2024-01-02 11:00:00', '2024-01-02 11:00:00'),
      ('Write a Blog Post', true, '2024-01-03 09:00:00', '2024-01-03 09:00:00'),
      ('Create a YouTube Video', false, '2024-01-04 14:00:00', '2024-01-04 14:00:00'),
      ('Read a Technical Book', true, '2024-01-05 08:00:00', '2024-01-05 08:00:00'),
      ('Update Portfolio', false, '2024-01-06 15:00:00', '2024-01-06 15:00:00'),
      ('Attend a Webinar', true, '2024-01-07 12:00:00', '2024-01-07 12:00:00'),
      ('Practice Coding Challenges', false, '2024-01-08 17:00:00', '2024-01-08 17:00:00'),
      ('Network with Peers', false, '2024-01-09 13:00:00', '2024-01-09 13:00:00'),
      ('Plan Next Month’s Goals', true, '2024-01-10 18:00:00', '2024-01-10 18:00:00');

    `)

  await client.query(` 
      INSERT INTO users (name) VALUES
      ('Alice'),
      ('Bob'),
      ('Blocked'),
      ('Charlie'),
      ('David'),
      ('Eve'),
      ('Frank'),
      ('Grace');

      INSERT INTO profile_info (user_id, note, metadata) VALUES
      ((SELECT id FROM users WHERE name = 'Alice'),'Note Alice', '{"age": 25, "city": "New York"}'),
      ((SELECT id FROM users WHERE name = 'Bob'), 'Note Bob', '{"age": 30, "city": "San Francisco"}');
          
     `)

  await client.query(` 
    INSERT INTO Category (name) VALUES
('Electronics'),
('Books'),
('Clothing'),
('Home Appliances'),
('Sports Equipment');

INSERT INTO Product (title, price, description, image, category_id, quantity, createdat, updatedat) VALUES
-- Electronics
('iPhone 14 Pro', 999.99, 'Apple iPhone 14 Pro with A16 Bionic chip, 128GB storage', 'iphone14pro.png', 1, 50, '2024-01-01 10:00:00', '2024-01-01 10:00:00'),
('Samsung QLED TV', 799.99, 'Samsung 55-inch QLED 4K UHD Smart TV', 'samsung_qled_tv.png', 1, 30, '2024-01-02 11:00:00', '2024-01-02 11:00:00'),
('MacBook Pro 16', 2499.99, 'Apple MacBook Pro 16 inch with M1 Max chip', 'macbook_pro_16.png', 1, 20, '2024-01-11 09:00:00', '2024-01-11 09:00:00'),
('Sony WH-1000XM4', 349.99, 'Sony WH 1000XM4 Noise Cancelling Headphones', 'sony_wh1000xm4.png', 1, 70, '2024-01-12 10:30:00', '2024-01-12 10:30:00'),

-- Books
('The Pragmatic Programmer', 49.99, 'Your Journey to Mastery, 20th Anniversary Edition', 'pragmatic_programmer.png', 2, 100, '2024-01-03 12:00:00', '2024-01-03 12:00:00'),
('Clean Code', 39.99, 'A Handbook of Agile Software Craftsmanship by Robert C. Martin', 'clean_code.png', 2, 80, '2024-01-04 13:00:00', '2024-01-04 13:00:00'),
('Design Patterns', 44.99, 'Elements of Reusable Object Oriented Software', 'design_patterns.png', 2, 60, '2024-01-13 14:00:00', '2024-01-13 14:00:00'),
('Refactoring', 49.99, 'Improving the Design of Existing Code by Martin Fowler', 'refactoring.png', 2, 90, '2024-01-14 15:00:00', '2024-01-14 15:00:00'),

-- Clothing
('Levi’s 501 Original Jeans', 59.99, 'Iconic straight fit with button fly, 100 percent cotton', 'levis_501.png', 3, 200, '2024-01-05 14:00:00', '2024-01-05 14:00:00'),
('Nike Air Max 270', 129.99, 'Nike Air Max 270 with revolutionary air sole unit', 'nike_air_max_270.png', 3, 150, '2024-01-06 15:00:00', '2024-01-06 15:00:00'),
('Adidas Originals T Shirt', 29.99, 'Adidas Originals Classic Trefoil Tee', 'adidas_tshirt.png', 3, 250, '2024-01-15 16:00:00', '2024-01-15 16:00:00'),
('North Face Jacket', 199.99, 'North Face Men s Apex Bionic Jacket', 'north_face_jacket.png', 3, 100, '2024-01-16 17:00:00', '2024-01-16 17:00:00'),

-- Home Appliances
('Dyson V11 Vacuum Cleaner', 599.99, 'Dyson V11 Torque Drive Cordless Vacuum Cleaner', 'dyson_v11.png', 4, 40, '2024-01-07 16:00:00', '2024-01-07 16:00:00'),
('Instant Pot Duo 7 in 1', 99.99, '7 in 1 Electric Pressure Cooker, 6 Quart', 'instant_pot_duo.png', 4, 60, '2024-01-08 17:00:00', '2024-01-08 17:00:00'),
('KitchenAid Stand Mixer', 399.99, 'KitchenAid Artisan Series 5 Quart Stand Mixer', 'kitchenaid_mixer.png', 4, 25, '2024-01-17 18:00:00', '2024-01-17 18:00:00'),
('Roomba i7+', 799.99, 'iRobot Roomba i7+ Robot Vacuum with Automatic Dirt Disposal', 'roomba_i7.png', 4, 35, '2024-01-18 19:00:00', '2024-01-18 19:00:00'),

-- Sports Equipment
('Adidas Ultraboost Running Shoes', 179.99, 'Adidas Ultraboost 21, high performance running shoes', 'adidas_ultraboost.png', 5, 90, '2024-01-09 18:00:00', '2024-01-09 18:00:00'),
('Fitbit Charge 5', 149.99, 'Fitbit Charge 5 Advanced Health and Fitness Tracker', 'fitbit_charge_5.png', 5, 120, '2024-01-10 19:00:00', '2024-01-10 19:00:00'),
('Peloton Bike', 1499.99, 'Peloton Bike with built in screen and live classes', 'peloton_bike.png', 5, 15, '2024-01-19 20:00:00', '2024-01-19 20:00:00'),
('Wilson Pro Staff Tennis Racket', 229.99, 'Wilson Pro Staff RF97 Autograph Tennis Racket', 'wilson_tennis_racket.png', 5, 50, '2024-01-20 21:00:00', '2024-01-20 21:00:00');

  `)

  await client.query(` 
    INSERT INTO groups (name) VALUES
    ('Admin'),
    ('User'),
    ('Guest');

    -- Établir les relations entre les utilisateurs et les groupes
    -- Relations pour Alice
    INSERT INTO users_to_groups (user_id, group_id) VALUES
    ((SELECT id FROM users WHERE name = 'Alice'), (SELECT id FROM groups WHERE name = 'Admin')),
    ((SELECT id FROM users WHERE name = 'Alice'), (SELECT id FROM groups WHERE name = 'User'));

    -- Relations pour Bob
    INSERT INTO users_to_groups (user_id, group_id) VALUES
    ((SELECT id FROM users WHERE name = 'Bob'), (SELECT id FROM groups WHERE name = 'User'));

    -- Relations pour Charlie
    INSERT INTO users_to_groups (user_id, group_id) VALUES
    ((SELECT id FROM users WHERE name = 'Charlie'), (SELECT id FROM groups WHERE name = 'User')),
    ((SELECT id FROM users WHERE name = 'Charlie'), (SELECT id FROM groups WHERE name = 'Guest'));

    -- Relations pour David
    INSERT INTO users_to_groups (user_id, group_id) VALUES
    ((SELECT id FROM users WHERE name = 'David'), (SELECT id FROM groups WHERE name = 'User')),
    ((SELECT id FROM users WHERE name = 'David'), (SELECT id FROM groups WHERE name = 'Admin'));

    -- Relations pour Eve
    INSERT INTO users_to_groups (user_id, group_id) VALUES
    ((SELECT id FROM users WHERE name = 'Eve'), (SELECT id FROM groups WHERE name = 'Guest'));

    -- Relations pour Frank
    INSERT INTO users_to_groups (user_id, group_id) VALUES
    ((SELECT id FROM users WHERE name = 'Frank'), (SELECT id FROM groups WHERE name = 'Admin'));

    -- Relations pour Grace
    INSERT INTO users_to_groups (user_id, group_id) VALUES
    ((SELECT id FROM users WHERE name = 'Grace'), (SELECT id FROM groups WHERE name = 'User')),
    ((SELECT id FROM users WHERE name = 'Grace'), (SELECT id FROM groups WHERE name = 'Guest'));

    `)

  await client.query(` 
    INSERT INTO accounts (user_id, balance, blocked) VALUES
    ((SELECT id FROM users WHERE name = 'Alice'), 10000.00, false),
    ((SELECT id FROM users WHERE name = 'Bob'), 15000.00, false),
    ((SELECT id FROM users WHERE name = 'Blocked'), 15000.00, true);
    `)

  const end = Date.now()

  console.log('✅ Seed inserted in', end - start, 'ms')

  process.exit(0)
}

export default seed

try {
  await seed()
} catch (error) {
  console.error('❌ Connexion failed')
  console.error(error)
  process.exit(1)
}
