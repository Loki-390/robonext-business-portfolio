-- ====================================================================
-- ROBOTICS & STEM EDUCATION BUSINESS PORTFOLIO - DATABASE SCHEMA
-- Target Database: MySQL 8.0+
-- ====================================================================

CREATE DATABASE IF NOT EXISTS `robotics_portfolio` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `robotics_portfolio`;

-- 1. SCHOOL ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS `school_enquiries` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `school_name` VARCHAR(255) NOT NULL,
    `contact_person` VARCHAR(150) NOT NULL,
    `designation` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `classes_interested` VARCHAR(100) NULL,
    `student_strength` INT NULL,
    `preferred_date` DATE NULL,
    `message` TEXT NULL,
    `enquiry_status` VARCHAR(50) NOT NULL DEFAULT 'New',
    `internal_notes` TEXT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_enquiry_status` (`enquiry_status`),
    INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. PROGRAMMES TABLE
CREATE TABLE IF NOT EXISTS `programmes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `programme_name` VARCHAR(255) NOT NULL,
    `target_classes` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `duration` VARCHAR(100) NULL,
    `learning_outcomes` TEXT NULL,
    `topics` TEXT NULL,
    `practical_activities` TEXT NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'active',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_programme_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS `projects` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `project_name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `technologies` VARCHAR(255) NOT NULL,
    `working_principle` TEXT NOT NULL,
    `learning_outcomes` TEXT NOT NULL,
    `image_url` VARCHAR(500) NULL,
    `video_url` VARCHAR(500) NULL,
    `category` VARCHAR(100) NOT NULL DEFAULT 'Robotics',
    `status` VARCHAR(50) NOT NULL DEFAULT 'published',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_project_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS `admin_users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(100) NOT NULL UNIQUE,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` VARCHAR(50) NOT NULL DEFAULT 'admin',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- INITIAL SEED DATA
-- ====================================================================

-- Default Admin User (Password: Admin@123, hashed with bcrypt 10 salt rounds)
INSERT INTO `admin_users` (`username`, `email`, `password_hash`, `role`)
VALUES 
('admin', 'admin@robonext.com', '$2a$10$w85Y5yFfK3pkyk826Z8BsewV9pmsv352ZkHQYpI8g8tX.3pGsk1/6', 'admin')
ON DUPLICATE KEY UPDATE `email` = VALUES(`email`);

-- Initial Educational Programmes
INSERT INTO `programmes` (`programme_name`, `target_classes`, `description`, `duration`, `learning_outcomes`, `topics`, `practical_activities`, `status`)
VALUES
(
    'Introduction to Robotics',
    'Classes 6–7',
    'A foundational programme designed to ignite curiosity in young minds. Students explore what robots are, how electrical circuits function, and how sensors perceive the environment.',
    '4 Weeks (8 Sessions)',
    'Understanding foundational electronics, basic logical thinking, hands-on circuit assembly, sensor awareness.',
    'What is Robotics?, Introduction to Electronics, Understanding Sensors, Motors and Their Applications, Basic Circuits, Introduction to Programming, Simple Robotic Applications',
    'Building simple LED sensor circuits, battery-motor linkages, light-sensitive alarm assembly',
    'active'
),
(
    'Practical Robotics',
    'Classes 6–8',
    'A hands-on, hardware-driven robotics programme focusing on microcontrollers, motors, and intelligent obstacle detection systems.',
    '6 Weeks (12 Sessions)',
    'Microcontroller programming, sensor calibration, motor driving principles, independent robot troubleshooting.',
    'Arduino Introduction, IR Sensors, Ultrasonic Sensors, DC Motors, Motor Drivers, Robot Chassis Assembly, Obstacle Avoider Robot, Line Follower Robot',
    'Assembling a dual-motor robotic chassis, wiring L298N motor drivers, programming obstacle avoidance logic',
    'active'
),
(
    'Advanced Robotics and IoT',
    'Classes 8–9',
    'Students step into interconnected intelligent systems, utilizing wireless protocols, IoT boards (ESP32), and automation algorithms.',
    '8 Weeks (16 Sessions)',
    'IoT cloud concepts, wireless Bluetooth/Wi-Fi telemetry, automation architectures, sensor data visualization.',
    'Arduino & ESP32, Sensor Integration, Bluetooth Communication, Wi-Fi Communication, Servo Motors, Mobile-Controlled Robots, Smart Dustbin, Smart Irrigation System, Introduction to IoT Applications',
    'Building smartphone-controlled Bluetooth rover, automated soil hydration trigger, smart servo-actuated bin',
    'active'
),
(
    'STEM and Innovation Workshops',
    'Classes 6–9',
    'Intensive, high-energy experiential workshops that connect theoretical science and math lessons to real-world engineering problem solving.',
    '1–2 Day Bootcamps',
    'Applied scientific inquiry, teamwork and engineering presentation, rapid prototyping mindset.',
    'Introduction to Artificial Intelligence, Introduction to IoT, Technology and Innovation, Real-World Engineering Applications, Problem-Solving Activities, Mini Project Development',
    'Hands-on mini-sensor challenges, group prototype race, interactive robotics technology demo',
    'active'
);

-- Initial Project Showcase
INSERT INTO `projects` (`project_name`, `description`, `technologies`, `working_principle`, `learning_outcomes`, `image_url`, `video_url`, `category`, `status`)
VALUES
(
    'Obstacle Avoider Robot',
    'An autonomous robotic vehicle engineered with ultrasonic sonar distance sensing that detects barriers and re-routes its movement trajectory smoothly.',
    'Arduino Uno, HC-SR04 Ultrasonic Sensor, L298N Motor Driver, High-Torque DC Motors, Chassis',
    'Emits high-frequency ultrasonic sound bursts and calculates bounce-back echo duration to determine proximity to objects, triggering avoidance logic.',
    'Sensor integration, real-time feedback loops, automated navigation logic, basic C++ programming.',
    '/images/projects/obstacle-avoider.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Autonomous Robotics',
    'published'
),
(
    'Line Follower Robot',
    'A precision path-tracking robot capable of following custom black contour tracks on white surfaces using dual infrared reflectance sensors.',
    'Arduino Uno, Dual IR Sensors, Motor Driver Shield, Geared DC Motors',
    'Leverages differential surface reflectance: dark surfaces absorb infrared light while white surfaces reflect it back into the photodiode.',
    'Optoelectronic sensor calibration, closed-loop feedback control, analog vs digital signals.',
    '/images/projects/line-follower.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Sensor Robotics',
    'published'
),
(
    'Bluetooth-Controlled Smart Rover',
    'A wireless tele-operated robotic vehicle commanded directly from a smartphone application over secure serial Bluetooth pairing.',
    'Arduino Uno, HC-05 Bluetooth Module, L298N Motor Driver, Bluetooth Controller App',
    'Receives single-byte wireless UART commands from an Android/iOS terminal and translates character packets into distinct wheel rotation states.',
    'Serial baud-rate communication, wireless transceiver integration, mobile device interfacing.',
    '/images/projects/bluetooth-rover.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Wireless Systems',
    'published'
),
(
    'Smart Contactless Dustbin',
    'An automated sanitisation and waste disposal system that senses incoming hands or waste items and actuates an automatic lid opening mechanism.',
    'Arduino Nano, HC-SR04 Ultrasonic Sensor, SG90 Micro Servo Motor, 9V Power Supply',
    'Continuous ultrasonic ranging detects proximity within 15 cm, prompting the servo horn to sweep 90 degrees open for 4 seconds before gentle closure.',
    'Real-world automation design, angular servo positioning, hygienic engineering solutions.',
    '/images/projects/smart-dustbin.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Smart Automation',
    'published'
),
(
    'Smart Soil Irrigation System',
    'An automated agricultural IoT prototype that monitors soil volumetric moisture levels and triggers an electric water pump relay when dryness is detected.',
    'Arduino Uno, Capacitive/Resistive Soil Moisture Sensor, 5V Single Channel Relay, Submersible Mini Pump',
    'Measures electrical conductivity of soil medium; below threshold moisture triggers the relay to activate the pump until optimal hydration is restored.',
    'Environmental sensing, electromechanical relay switching, water conservation principles.',
    '/images/projects/smart-irrigation.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'IoT & Agriculture',
    'published'
);
