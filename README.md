# RoboNext STEM Technologies
### Practical Robotics, IoT & STEM Education Business Portfolio for School Partnerships

> **Brand Positioning:** *"We don't just teach robotics. We help students experience, build and understand technology."*

A full-stack, production-ready educational technology business portfolio web application designed for school leadership (Principals, Correspondents, Management, Academic Coordinators, and Science/CS Heads) to collaborate with an emerging Robotics and STEM startup based in Chennai.

---

## 🚀 Key Features

### 1. Public School-Facing Website (9 Comprehensive Pages)
- **Home**: Executive overview, hero value proposition, 6 educational services, free school demo section, student learning outcomes, and partnership call-to-actions.
- **About Us**: Mission & vision, 5 core educational philosophies, authentic founder profile (Logesh, B.Tech in Artificial Intelligence & Data Science) with genuine project and college demonstration credentials.
- **Programmes**: Curricula tailored for Classes 6–9:
  - *Introduction to Robotics* (Classes 6–7)
  - *Practical Robotics* (Classes 6–8)
  - *Advanced Robotics and IoT* (Classes 8–9)
  - *STEM & Innovation Workshops* (Classes 6–9)
- **Project Portfolio**: Hands-on hardware creation cards featuring:
  - Obstacle Avoider Autonomous Robot (Ultrasonic + L298N)
  - Line Follower Robot (Infrared photodiode reflectance)
  - Bluetooth-Controlled Smart Rover (UART serial + mobile app)
  - Smart Contactless Dustbin (Sonar + micro servo actuator)
  - Smart Soil Irrigation System (Conductivity sensing + electromechanical pump relay)
- **Why Choose Us**: 8 school-oriented benefits explaining practical hardware immersion, zero capital burden on schools, and custom schedule compatibility.
- **Teaching Methodology**: 5-Stage Learning Framework:
  1. *Introduce* (Real-world relatable engineering context)
  2. *Demonstrate* (Live working prototype test on the floor)
  3. *Explore* (Component inspection, multimeter readings, logic flow)
  4. *Build* (Squad assembly, wiring, microcontroller flashing)
  5. *Test and Present* (Error debugging & student presentation to peers)
- **School Partnerships**: 5 flexible engagement models and a 6-stage collaboration workflow ensuring complete school authority.
- **Safety & Professional Commitment**: Child protection, low-voltage DC electronics (5V/9V), zero high-voltage AC exposure, mandatory faculty supervision, and strict student privacy.
- **Contact & Request a Free Demonstration**: 10-field functional school demonstration booking form, direct WhatsApp chat, telephone, and official email channels.

### 2. Comprehensive Admin Dashboard (`/admin`)
- **Authentication**: JWT session tokens with bcrypt password hashing (protected admin routes).
- **Executive Metrics**: Live count of total enquiries, new requests, contacted schools, scheduled demos, completed demos, proposals sent, and confirmed partnerships.
- **Enquiry Pipeline Manager**: Search by school name, filter by status, view complete inquiry details, update internal administrative notes, and record pipeline progression.
- **Curriculum Manager**: Create, edit, and toggle active/inactive status for educational programmes.
- **Project Portfolio Manager**: Create, edit, and toggle published/draft status for robotic models.
- **Automations & System Diagnostics**: Real-time health monitor, on-demand pipeline audit executor, executive digest compiler, and automated background event logs.

### 3. Automated Notification & Follow-up Engine
- Automated email acknowledgement dispatched to school upon enquiry submission.
- Automated email notification dispatched to the startup administrator.
- Automated 48-hour follow-up detection for pending enquiries.
- Automated upcoming demonstration alerts (within 3 days of preferred date).
- Development outbox logger (`backend/data/outbox.log`) ensuring zero email failure crashes when SMTP is in test mode.

---

## 🛠️ Technical Stack

- **Frontend**: React.js (Vite), JavaScript ES6+ (JSX), Tailwind CSS, Framer Motion, Lucide React, React Router DOM, Axios.
- **Backend**: Node.js, Express.js, REST API, MVC architecture, JWT, bcryptjs, Nodemailer, Express Rate Limit.
- **Database**: MySQL 8.0+ relational schema (`database/schema.sql`) with dual-mode zero-downtime persistence engine fallback.

---

## 📦 Project Structure

```
robotics-business-portfolio/
|-- frontend/
|   |-- src/
|   |   |-- admin/          # Admin Dashboard, Enquiries, Programmes, Projects, Automations
|   |   |-- components/     # Navbar, Footer, DemoModal
|   |   |-- context/        # AuthContext (JWT state management)
|   |   |-- pages/          # 9 Public Pages
|   |   |-- services/       # Axios API client with token interceptors
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |   |-- index.css
|   |-- package.json
|   |-- tailwind.config.js
|   |-- vite.config.js
|
|-- backend/
|   |-- config/             # Dual-mode Database connector (MySQL + Zero-downtime Fallback)
|   |-- controllers/        # Enquiry, Programme, Project, Auth, Automation controllers
|   |-- models/             # Relational data models with parameterized queries
|   |-- routes/             # Express REST endpoints
|   |-- middleware/         # JWT Auth guard & Rate limiting
|   |-- services/           # Nodemailer email dispatcher & background scheduler
|   |-- server.js
|   |-- package.json
|   |-- .env.example
|
|-- database/
|   `-- schema.sql          # Complete MySQL 8.0 DDL & Initial Seeds
|
|-- start.bat               # One-click Windows launcher
`-- README.md
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v24)
- **npm** v9+
- *(Optional)* MySQL Server 8.0+

### 2. Backend Setup
1. Open a terminal in `backend/`:
   ```bash
   cd backend
   npm install
   ```
2. Check `backend/.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=robotics_portfolio
   DB_PORT=3306
   JWT_SECRET=super_secret_jwt_key_robonext_stem_education_2025_secure
   ```
3. Start the backend:
   ```bash
   npm start
   ```
   *Note: If your local MySQL service is running, it connects automatically. If MySQL is offline, the backend activates its resilient zero-downtime local persistence engine so you can use the entire website and admin panel immediately without interruption!*

### 3. Frontend Setup
1. Open a second terminal in `frontend/`:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## 🔑 Default Administrator Credentials

To access the private Admin Dashboard:
- **URL**: `http://localhost:5173/admin/login`
- **Email**: `admin@robonext.com`
- **Password**: `Admin@123`

---

## 🗄️ MySQL Database Setup (Optional Native Mode)

To run strictly against a live local MySQL server:
1. Ensure your MySQL server service is active on port 3306.
2. Log into MySQL and import the schema:
   ```bash
   mysql -u root -p < database/schema.sql
   ```
3. Update `backend/.env` with your MySQL user and password.
4. Restart the backend server.

---

## 🌐 Production Deployment

- **Frontend (Vercel)**:
  - Framework Preset: `Vite`
  - Root Directory: `frontend`
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Environment Variable: `VITE_API_BASE_URL` pointing to your hosted backend.

- **Backend (Render / Railway)**:
  - Environment: `Node`
  - Root Directory: `backend`
  - Build Command: `npm install`
  - Start Command: `node server.js`
  - Set production environment variables (`PORT`, `JWT_SECRET`, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `CLIENT_URL`).

---

&copy; RoboNext STEM Technologies. All rights reserved.
Velachery &bull; Taramani &bull; Perungudi &bull; OMR &bull; Chennai
