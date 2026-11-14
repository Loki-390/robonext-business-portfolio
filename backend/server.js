const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const { initDatabase, getDbStatus } = require('./config/db');
const { startAutomationWorker } = require('./services/automationService');
const { generalApiLimiter } = require('./middleware/rateLimiter');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Trust Render reverse proxy for rate-limiting & IP validation
app.set('trust proxy', 1);

// 2. CORS configuration (Includes your live Render domain)
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'https://robonext-backend.onrender.com',
  'https://robonext-business-portfolio.pages.dev',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: Not allowed by Access-Control-Allow-Origin'));
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply general API rate limiter
app.use('/api/', generalApiLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: getDbStatus()
  });
});

// Mount REST API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));
app.use('/api/programmes', require('./routes/programmeRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/automations', require('./routes/automationRoutes'));

// Serve Frontend Production Build (Single-Page App)
const frontendDistPath = path.resolve(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return res.status(404).json({ success: false, message: `Endpoint ${req.originalUrl} not found.` });
    }
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
} else {
  app.use('/api/*', (req, res) => {
    res.status(404).json({
      success: false,
      message: `API endpoint ${req.originalUrl} not found.`
    });
  });
}

// Centralized error handling
app.use((err, req, res, next) => {
  console.error('[UNHANDLED SERVER ERROR]:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An unexpected internal server error occurred.'
  });
});

// Initialize Database & Start Server
async function startServer() {
  try {
    await initDatabase();

    const followupInterval = Number(process.env.FOLLOWUP_CHECK_INTERVAL_HOURS) || 12;
    startAutomationWorker(followupInterval);

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`====================================================`);
      console.log(`🚀 RoboNext STEM Full-Stack Server Running`);
      console.log(`🌐 Application URL: https://robonext-backend.onrender.com`);
      console.log(`📡 REST API Health: /api/health`);
      console.log(`🔐 Admin Dashboard: /admin/login`);
      console.log(`🗄️ Database Status: ${getDbStatus().target}`);
      console.log(`====================================================`);
    });
  } catch (err) {
    console.error('Fatal initialization error:', err);
    process.exit(1);
  }
}

startServer();