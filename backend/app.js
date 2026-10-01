// app.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const xss = require('xss-clean');
const path = require('path');
const globalErrorHandler = require('./Controllers/globalErrorHandler');
const MessageRouter = require('./Routers/messageRouter');
const usersRouter = require('./Routers/usersRouter');
const provincesRouter = require('./Routers/provincesRouter');
const categoriesRouter = require('./Routers/categoriesRouter');
const companiesRouter = require('./Routers/companiesRouter');
const advertisementsRouter = require('./Routers/advertisementsRouter');

const app = express();

// Define allowed origins (production + local development)
const allowedOrigins = [
  'https://construction-website-xi-ten.vercel.app',
  'https://sparktrust.tech',
  'https://www.sparktrust.tech',
  'https://azadnoori.com',
  'https://www.azadnoori.com',
  'https://sparktrust.ca',
  'https://www.sparktrust.ca',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5175',
];

// Helper: returns true when the origin URL points at a private LAN address
// (RFC1918 ranges). This lets any phone / laptop on the same Wi-Fi / LAN
// connect to the API without having to hard-code every IP here.
const isPrivateLanOrigin = (origin) => {
  if (!origin) return false;
  let host;
  try {
    host = new URL(origin).hostname;
  } catch (_) {
    return false;
  }

  // Strip IPv6 brackets if present
  const cleaned = host.replace(/^\[|\]$/g, '');

  // IPv4 private ranges
  const m = cleaned.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (m) {
    const [, a, b] = m.map(Number);
    if (a === 10) return true;                         // 10.0.0.0/8
    if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
    if (a === 192 && b === 168) return true;           // 192.168.0.0/16
    if (a === 127) return true;                        // 127.0.0.0/8 (loopback)
    return false;
  }

  // IPv6 loopback / link-local / unique-local
  if (cleaned === '::1') return true;
  if (cleaned.startsWith('fe80:')) return true;       // link-local
  if (cleaned.startsWith('fc') || cleaned.startsWith('fd')) return true; // ULA

  // Hostname-based "localhost"
  if (cleaned === 'localhost') return true;

  return false;
};

const isOriginAllowed = (origin) => {
  if (!origin) return true; // same-origin / curl / server-to-server
  if (allowedOrigins.includes(origin)) return true;
  if (isPrivateLanOrigin(origin)) return true;
  return false;
};

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      console.log(`Request Origin: ${origin || 'no origin'}`);

      if (isOriginAllowed(origin)) {
        console.log(`CORS allowed origin: ${origin || 'no origin'}`);
        callback(null, origin || true);
      } else {
        console.log(`CORS blocked origin: ${origin}`);
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Log response headers for debugging
app.use((req, res, next) => {
  const originalSend = res.send;

  res.send = function (body) {
    console.log('Response headers:', res.getHeaders());
    return originalSend.apply(res, arguments);
  };

  next();
});

// Handle CORS preflight requests
app.options(
  '*',
  cors({
    origin: (origin, callback) => {
      console.log(`Preflight Request Origin: ${origin || 'no origin'}`);

      if (isOriginAllowed(origin)) {
        console.log(`CORS preflight allowed origin: ${origin || 'no origin'}`);
        callback(null, origin || true);
      } else {
        console.log(`CORS preflight blocked origin: ${origin}`);
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
  })
);

// Cookie Parser
app.use(cookieParser());

// Security Headers
app.use(helmet());

// Parse JSON
app.use(express.json());

// Prevent HTTP parameter pollution & XSS
app.use(hpp());
app.use(xss());

// Logger
app.use(morgan('dev'));

// Static files
app.use(
  '/Uploads',
  express.static(path.join(__dirname, 'Uploads'), {
    setHeaders: (res) => {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Methods', 'GET');
    },
  })
);

app.use('/api/v1/messages', MessageRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/provinces', provincesRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/companies', companiesRouter);
app.use('/api/v1/advertisements', advertisementsRouter);

// Global error handler
app.use(globalErrorHandler);

// 404 fallback
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'Fail',
    message: `Can't find ${req.originalUrl}`,
  });
});

module.exports = app;