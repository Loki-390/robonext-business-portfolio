const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

let dbPool = null;
let dbMode = 'uninitialized';
let dbLastError = null;

// Local JSON DB fallback path
const dataDir = path.join(__dirname, '..', 'data');
const localDbPath = path.join(dataDir, 'local_db.json');

// Initial seed data for fallback / fresh initialization
const initialData = {
  school_enquiries: [
    {
      id: 1,
      school_name: "St. Patrick's Matriculation Higher Secondary School",
      contact_person: "Dr. K. Rajasekhar",
      designation: "Principal",
      email: "principal@stpatrickschool.edu.in",
      phone: "+91 98401 23456",
      location: "Adyar, Chennai",
      classes_interested: "Classes 6–8",
      student_strength: 120,
      preferred_date: "2025-07-15",
      message: "We would like to introduce a practical robotics curriculum for our middle school students. Please conduct an introductory demonstration session.",
      enquiry_status: "Demo Scheduled",
      internal_notes: "Initial phone call completed. Principal is keen on obstacle-avoiding robots and line followers.",
      created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
      updated_at: new Date(Date.now() - 1 * 86400000).toISOString()
    },
    {
      id: 2,
      school_name: "Velachery Vidyashram Higher Secondary School",
      contact_person: "Mrs. Revathi Sundaram",
      designation: "Academic Coordinator",
      email: "revathi.s@velacheryvidyashram.edu",
      phone: "+91 94440 98765",
      location: "Velachery, Chennai",
      classes_interested: "Classes 7–9",
      student_strength: 85,
      preferred_date: "2025-07-22",
      message: "Interested in setting up an after-school robotics club and conducting IoT weekend workshops for Class 9.",
      enquiry_status: "New",
      internal_notes: "Enquiry submitted via website. Pending initial outreach call.",
      created_at: new Date(Date.now() - 12 * 3600000).toISOString(),
      updated_at: new Date(Date.now() - 12 * 3600000).toISOString()
    }
  ],
  programmes: [
    {
      id: 1,
      programme_name: "Introduction to Robotics",
      target_classes: "Classes 6–7",
      description: "A foundational programme designed to ignite curiosity in young minds. Students explore what robots are, how electrical circuits function, and how sensors perceive the environment.",
      duration: "4 Weeks (8 Sessions)",
      learning_outcomes: "Understanding foundational electronics, basic logical thinking, hands-on circuit assembly, sensor awareness.",
      topics: "What is Robotics?, Introduction to Electronics, Understanding Sensors, Motors and Their Applications, Basic Circuits, Introduction to Programming, Simple Robotic Applications",
      practical_activities: "Building simple LED sensor circuits, battery-motor linkages, light-sensitive alarm assembly",
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      programme_name: "Practical Robotics",
      target_classes: "Classes 6–8",
      description: "A hands-on, hardware-driven robotics programme focusing on microcontrollers, motors, and intelligent obstacle detection systems.",
      duration: "6 Weeks (12 Sessions)",
      learning_outcomes: "Microcontroller programming, sensor calibration, motor driving principles, independent robot troubleshooting.",
      topics: "Arduino Introduction, IR Sensors, Ultrasonic Sensors, DC Motors, Motor Drivers, Robot Chassis Assembly, Obstacle Avoider Robot, Line Follower Robot",
      practical_activities: "Assembling a dual-motor robotic chassis, wiring L298N motor drivers, programming obstacle avoidance logic",
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      programme_name: "Advanced Robotics and IoT",
      target_classes: "Classes 8–9",
      description: "Students step into interconnected intelligent systems, utilizing wireless protocols, IoT boards (ESP32), and automation algorithms.",
      duration: "8 Weeks (16 Sessions)",
      learning_outcomes: "IoT cloud concepts, wireless Bluetooth/Wi-Fi telemetry, automation architectures, sensor data visualization.",
      topics: "Arduino & ESP32, Sensor Integration, Bluetooth Communication, Wi-Fi Communication, Servo Motors, Mobile-Controlled Robots, Smart Dustbin, Smart Irrigation System, Introduction to IoT Applications",
      practical_activities: "Building smartphone-controlled Bluetooth rover, automated soil hydration trigger, smart servo-actuated bin",
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 4,
      programme_name: "STEM and Innovation Workshops",
      target_classes: "Classes 6–9",
      description: "Intensive, high-energy experiential workshops that connect theoretical science and math lessons to real-world engineering problem solving.",
      duration: "1–2 Day Bootcamps",
      learning_outcomes: "Applied scientific inquiry, teamwork and engineering presentation, rapid prototyping mindset.",
      topics: "Introduction to Artificial Intelligence, Introduction to IoT, Technology and Innovation, Real-World Engineering Applications, Problem-Solving Activities, Mini Project Development",
      practical_activities: "Hands-on mini-sensor challenges, group prototype race, interactive robotics technology demo",
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  projects: [
    {
      id: 1,
      project_name: "Obstacle Avoider Robot",
      description: "An autonomous robotic vehicle engineered with ultrasonic sonar distance sensing that detects barriers and re-routes its movement trajectory smoothly.",
      technologies: "Arduino Uno, HC-SR04 Ultrasonic Sensor, L298N Motor Driver, High-Torque DC Motors, Chassis",
      working_principle: "Emits high-frequency ultrasonic sound bursts and calculates bounce-back echo duration to determine proximity to objects, triggering avoidance logic.",
      learning_outcomes: "Sensor integration, real-time feedback loops, automated navigation logic, basic C++ programming.",
      image_url: "/images/projects/obstacle-avoider.jpg",
      video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "Autonomous Robotics",
      status: "published",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      project_name: "Line Follower Robot",
      description: "A precision path-tracking robot capable of following custom black contour tracks on white surfaces using dual infrared reflectance sensors.",
      technologies: "Arduino Uno, Dual IR Sensors, Motor Driver Shield, Geared DC Motors",
      working_principle: "Leverages differential surface reflectance: dark surfaces absorb infrared light while white surfaces reflect it back into the photodiode.",
      learning_outcomes: "Optoelectronic sensor calibration, closed-loop feedback control, analog vs digital signals.",
      image_url: "/images/projects/line-follower.jpg",
      video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "Sensor Robotics",
      status: "published",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      project_name: "Bluetooth-Controlled Smart Rover",
      description: "A wireless tele-operated robotic vehicle commanded directly from a smartphone application over secure serial Bluetooth pairing.",
      technologies: "Arduino Uno, HC-05 Bluetooth Module, L298N Motor Driver, Bluetooth Controller App",
      working_principle: "Receives single-byte wireless UART commands from an Android/iOS terminal and translates character packets into distinct wheel rotation states.",
      learning_outcomes: "Serial baud-rate communication, wireless transceiver integration, mobile device interfacing.",
      image_url: "/images/projects/bluetooth-rover.jpg",
      video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "Wireless Systems",
      status: "published",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 4,
      project_name: "Smart Contactless Dustbin",
      description: "An automated sanitisation and waste disposal system that senses incoming hands or waste items and actuates an automatic lid opening mechanism.",
      technologies: "Arduino Nano, HC-SR04 Ultrasonic Sensor, SG90 Micro Servo Motor, 9V Power Supply",
      working_principle: "Continuous ultrasonic ranging detects proximity within 15 cm, prompting the servo horn to sweep 90 degrees open for 4 seconds before gentle closure.",
      learning_outcomes: "Real-world automation design, angular servo positioning, hygienic engineering solutions.",
      image_url: "/images/projects/smart-dustbin.jpg",
      video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "Smart Automation",
      status: "published",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 5,
      project_name: "Smart Soil Irrigation System",
      description: "An automated agricultural IoT prototype that monitors soil volumetric moisture levels and triggers an electric water pump relay when dryness is detected.",
      technologies: "Arduino Uno, Soil Moisture Sensor, 5V Single Channel Relay, Submersible Mini Pump",
      working_principle: "Measures electrical conductivity of soil medium; below threshold moisture triggers the relay to activate the pump until optimal hydration is restored.",
      learning_outcomes: "Environmental sensing, electromechanical relay switching, water conservation principles.",
      image_url: "/images/projects/smart-irrigation.jpg",
      video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "IoT & Agriculture",
      status: "published",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  admin_users: [
    {
      id: 1,
      username: "admin",
      email: "admin@robonext.com",
      password_hash: "$2a$10$w85Y5yFfK3pkyk826Z8BsewV9pmsv352ZkHQYpI8g8tX.3pGsk1/6", // Admin@123
      role: "admin",
      created_at: new Date().toISOString()
    }
  ]
};

// Helper to ensure local JSON DB directory and file exist
function getLocalData() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(localDbPath)) {
    fs.writeFileSync(localDbPath, JSON.stringify(initialData, null, 2), 'utf8');
    return initialData;
  }
  try {
    const raw = fs.readFileSync(localDbPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local JSON db, resetting to initialData:', err.message);
    return initialData;
  }
}

function saveLocalData(data) {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(localDbPath, JSON.stringify(data, null, 2), 'utf8');
}

// Local mock SQL executor for graceful fallback when MySQL server is not running
function executeLocalSql(sql, params = []) {
  const data = getLocalData();
  const trimmed = sql.trim();
  const upper = trimmed.toUpperCase();

  // SELECT ...
  if (upper.startsWith('SELECT')) {
    // SELECT COUNT(*) ... FROM school_enquiries
    if (upper.includes('COUNT(')) {
      let table = 'school_enquiries';
      if (upper.includes('FROM SCHOOL_ENQUIRIES') || upper.includes('FROM `SCHOOL_ENQUIRIES`')) table = 'school_enquiries';
      else if (upper.includes('FROM PROGRAMMES')) table = 'programmes';
      else if (upper.includes('FROM PROJECTS')) table = 'projects';
      
      let rows = data[table] || [];
      if (upper.includes('WHERE ENQUIRY_STATUS = ?') && params.length > 0) {
        rows = rows.filter(r => r.enquiry_status === params[0]);
      }
      return [{ count: rows.length }];
    }

    // SELECT * FROM school_enquiries WHERE id = ?
    let table = 'school_enquiries';
    if (upper.includes('FROM SCHOOL_ENQUIRIES') || upper.includes('FROM `SCHOOL_ENQUIRIES`')) table = 'school_enquiries';
    else if (upper.includes('FROM PROGRAMMES') || upper.includes('FROM `PROGRAMMES`')) table = 'programmes';
    else if (upper.includes('FROM PROJECTS') || upper.includes('FROM `PROJECTS`')) table = 'projects';
    else if (upper.includes('FROM ADMIN_USERS') || upper.includes('FROM `ADMIN_USERS`')) table = 'admin_users';

    let rows = [...(data[table] || [])];

    if (upper.includes('WHERE EMAIL = ?') && params.length > 0) {
      rows = rows.filter(r => r.email && r.email.toLowerCase() === params[0].toLowerCase());
    } else if (upper.includes('WHERE ID = ?') && params.length > 0) {
      rows = rows.filter(r => String(r.id) === String(params[0]));
    } else if (upper.includes('WHERE STATUS = ?') && params.length > 0) {
      rows = rows.filter(r => r.status === params[0]);
    } else if (upper.includes('WHERE ENQUIRY_STATUS = ?') && params.length > 0) {
      rows = rows.filter(r => r.enquiry_status === params[0]);
    }

    if (upper.includes('ORDER BY CREATED_AT DESC')) {
      rows.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    } else if (upper.includes('ORDER BY ID DESC')) {
      rows.sort((a, b) => Number(b.id) - Number(a.id));
    }

    return rows;
  }

  // INSERT INTO ...
  if (upper.startsWith('INSERT INTO')) {
    let table = 'school_enquiries';
    if (upper.includes('INTO SCHOOL_ENQUIRIES') || upper.includes('INTO `SCHOOL_ENQUIRIES`')) table = 'school_enquiries';
    else if (upper.includes('INTO PROGRAMMES') || upper.includes('INTO `PROGRAMMES`')) table = 'programmes';
    else if (upper.includes('INTO PROJECTS') || upper.includes('INTO `PROJECTS`')) table = 'projects';
    else if (upper.includes('INTO ADMIN_USERS') || upper.includes('INTO `ADMIN_USERS`')) table = 'admin_users';

    const items = data[table] || [];
    const nextId = items.length > 0 ? Math.max(...items.map(i => Number(i.id) || 0)) + 1 : 1;

    let newItem = { id: nextId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };

    if (table === 'school_enquiries') {
      newItem = {
        id: nextId,
        school_name: params[0] || '',
        contact_person: params[1] || '',
        designation: params[2] || '',
        email: params[3] || '',
        phone: params[4] || '',
        location: params[5] || '',
        classes_interested: params[6] || '',
        student_strength: params[7] ? Number(params[7]) : null,
        preferred_date: params[8] || null,
        message: params[9] || '',
        enquiry_status: params[10] || 'New',
        internal_notes: params[11] || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (table === 'programmes') {
      newItem = {
        id: nextId,
        programme_name: params[0] || '',
        target_classes: params[1] || '',
        description: params[2] || '',
        duration: params[3] || '',
        learning_outcomes: params[4] || '',
        topics: params[5] || '',
        practical_activities: params[6] || '',
        status: params[7] || 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (table === 'projects') {
      newItem = {
        id: nextId,
        project_name: params[0] || '',
        description: params[1] || '',
        technologies: params[2] || '',
        working_principle: params[3] || '',
        learning_outcomes: params[4] || '',
        image_url: params[5] || '',
        video_url: params[6] || '',
        category: params[7] || 'Robotics',
        status: params[8] || 'published',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }

    items.push(newItem);
    data[table] = items;
    saveLocalData(data);
    return { insertId: nextId, affectedRows: 1 };
  }

  // UPDATE ...
  if (upper.startsWith('UPDATE')) {
    let table = 'school_enquiries';
    if (upper.includes('UPDATE SCHOOL_ENQUIRIES') || upper.includes('UPDATE `SCHOOL_ENQUIRIES`')) table = 'school_enquiries';
    else if (upper.includes('UPDATE PROGRAMMES') || upper.includes('UPDATE `PROGRAMMES`')) table = 'programmes';
    else if (upper.includes('UPDATE PROJECTS') || upper.includes('UPDATE `PROJECTS`')) table = 'projects';

    const items = data[table] || [];
    const targetId = params[params.length - 1]; // last param is usually ID in WHERE id = ?
    const idx = items.findIndex(i => String(i.id) === String(targetId));

    if (idx !== -1) {
      if (table === 'school_enquiries') {
        if (upper.includes('ENQUIRY_STATUS = ?, INTERNAL_NOTES = ?')) {
          items[idx].enquiry_status = params[0];
          items[idx].internal_notes = params[1];
        } else if (upper.includes('ENQUIRY_STATUS = ?')) {
          items[idx].enquiry_status = params[0];
        }
      } else if (table === 'programmes') {
        items[idx].programme_name = params[0] ?? items[idx].programme_name;
        items[idx].target_classes = params[1] ?? items[idx].target_classes;
        items[idx].description = params[2] ?? items[idx].description;
        items[idx].duration = params[3] ?? items[idx].duration;
        items[idx].learning_outcomes = params[4] ?? items[idx].learning_outcomes;
        items[idx].topics = params[5] ?? items[idx].topics;
        items[idx].practical_activities = params[6] ?? items[idx].practical_activities;
        items[idx].status = params[7] ?? items[idx].status;
      } else if (table === 'projects') {
        items[idx].project_name = params[0] ?? items[idx].project_name;
        items[idx].description = params[1] ?? items[idx].description;
        items[idx].technologies = params[2] ?? items[idx].technologies;
        items[idx].working_principle = params[3] ?? items[idx].working_principle;
        items[idx].learning_outcomes = params[4] ?? items[idx].learning_outcomes;
        items[idx].image_url = params[5] ?? items[idx].image_url;
        items[idx].video_url = params[6] ?? items[idx].video_url;
        items[idx].category = params[7] ?? items[idx].category;
        items[idx].status = params[8] ?? items[idx].status;
      }
      items[idx].updated_at = new Date().toISOString();
      data[table] = items;
      saveLocalData(data);
      return { affectedRows: 1 };
    }
    return { affectedRows: 0 };
  }

  // DELETE FROM ...
  if (upper.startsWith('DELETE FROM')) {
    let table = 'school_enquiries';
    if (upper.includes('FROM SCHOOL_ENQUIRIES') || upper.includes('FROM `SCHOOL_ENQUIRIES`')) table = 'school_enquiries';
    else if (upper.includes('FROM PROGRAMMES') || upper.includes('FROM `PROGRAMMES`')) table = 'programmes';
    else if (upper.includes('FROM PROJECTS') || upper.includes('FROM `PROJECTS`')) table = 'projects';

    const items = data[table] || [];
    const targetId = params[0];
    const initialLen = items.length;
    data[table] = items.filter(i => String(i.id) !== String(targetId));
    saveLocalData(data);
    return { affectedRows: initialLen - data[table].length };
  }

  return { affectedRows: 0 };
}

// Database initialization
async function initDatabase() {
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'robotics_portfolio',
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 1500,
    queueLimit: 0
  };

  try {
    // Attempt initial test connection to MySQL server
    console.log(`[DB] Attempting MySQL connection to ${dbConfig.host}:${dbConfig.port}...`);
    const pool = mysql.createPool(dbConfig);
    const testConn = await pool.getConnection();
    console.log('[DB] MySQL Connected successfully to database:', dbConfig.database);
    testConn.release();

    dbPool = pool;
    dbMode = 'mysql';
    return;
  } catch (err) {
    dbLastError = err.message;
    console.warn(`[DB WARNING] MySQL connection unavailable (${err.message}).`);
    console.warn('[DB INFO] Seamlessly activating local persistence engine for zero downtime.');
    getLocalData(); // Ensure directory & seed data exist
    dbMode = 'local_fallback';
  }
}

// Universal query function with parameter binding
async function query(sql, params = []) {
  if (dbMode === 'mysql' && dbPool) {
    try {
      const [rows] = await dbPool.execute(sql, params);
      return rows;
    } catch (err) {
      console.error('[DB Query Error in MySQL]:', err.message);
      throw err;
    }
  }

  // Fallback to local persistence engine
  return executeLocalSql(sql, params);
}

function getDbStatus() {
  return {
    mode: dbMode,
    target: dbMode === 'mysql' ? 'MySQL 8.0' : 'Local Persistence Engine (Active Fallback)',
    lastError: dbLastError
  };
}

module.exports = {
  initDatabase,
  query,
  getDbStatus
};
