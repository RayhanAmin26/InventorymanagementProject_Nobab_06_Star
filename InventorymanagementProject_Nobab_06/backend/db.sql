-- Create database
CREATE DATABASE IF NOT EXISTS agri_inventory CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE agri_inventory;

-- Inventory table
CREATE TABLE IF NOT EXISTS inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(50) NOT NULL,
  product_name VARCHAR(150) NOT NULL,
  category VARCHAR(100),
  stock_level VARCHAR(100),
  usage_rate VARCHAR(100),
  quantity INT DEFAULT 0,
  procurement_schedule DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Agricultural products
CREATE TABLE IF NOT EXISTS agricultural_products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(50) NOT NULL,
  product_name VARCHAR(150) NOT NULL,
  category VARCHAR(100),
  seed_type VARCHAR(100),
  sowing_date DATE,
  expected_harvest DATE,
  storage VARCHAR(150),
  shelf_life VARCHAR(100),
  packaging VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Harvested crops
CREATE TABLE IF NOT EXISTS harvested_crops (
  id INT AUTO_INCREMENT PRIMARY KEY,
  crop_id VARCHAR(50) NOT NULL,
  temperature VARCHAR(50),
  humidity VARCHAR(50),
  category VARCHAR(100),
  harvest_date DATE,
  crop_name VARCHAR(150),
  quantity VARCHAR(100),
  storage VARCHAR(150),
  processing_unit VARCHAR(150),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Perishable products
CREATE TABLE IF NOT EXISTS perishable_products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(50) NOT NULL,
  product_name VARCHAR(150) NOT NULL,
  storage VARCHAR(150),
  product_type VARCHAR(100),
  category VARCHAR(100),
  expiry_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Post-harvest monitoring
CREATE TABLE IF NOT EXISTS post_harvest (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(50) NOT NULL,
  product_name VARCHAR(150) NOT NULL,
  category VARCHAR(100),
  batch_number VARCHAR(100),
  expiry_date DATE,
  storage_condition VARCHAR(150),
  location VARCHAR(150),
  quantity VARCHAR(100),
  stock_level_status VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Storage conditions
CREATE TABLE IF NOT EXISTS storage_conditions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  warehouse_id VARCHAR(50) NOT NULL,
  location VARCHAR(150),
  temperature VARCHAR(50),
  humidity VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



