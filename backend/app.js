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
const contentRouter = require('./Routers/contentRouter');
const adminRouter = require('./Routers/adminRouter');

const app = express();

const allowedOrigins = [
  "https://sparktrust.tech",
  "https://www.sparktrust.tech",
  "https://construction-website-xi-ten.vercel.app",
  "https://azadnoori.com",
  "https://www.azadnoori.com",
  "https://sparktrust.ca",
  "https://www.sparktrust.ca",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "http://localhost:5175",
  "http://127.0.0.1:5175",
];

const isPrivateLanOrigin = (origin) => {
  if (!origin) return false;
  let host;
  try {
    host = new URL(origin).hostname;
  } catch (_) {
    return false;
  }

  const cleaned = host.replace(/^\[|\]$/g, "");
  const m = cleaned.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (m) {
    const [, a, b] = m.map(Number);
    if (a === 10) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 127) return true;
    return false;
  }

  if (cleaned === "::1") return true;
  if (cleaned.startsWith("fe80:")) return true;
  if (cleaned.startsWith("fc") || cleaned.startsWith("fd")) return true;
  if (cleaned === "localhost") return true;

  return false;
};

const isOriginAllowed = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  if (isPrivateLanOrigin(origin)) return true;
  return false;
};

app.use(
  cors({
    origin: (origin, callback) => {
      console.log(`Request Origin: ${origin || "no origin"}`);
      if (isOriginAllowed(origin)) {
        console.log(`CORS allowed origin: ${origin || "no origin"}`);
        callback(null, origin || true);
      } else {
        console.log(`CORS blocked origin: ${origin}`);
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.options(
  "*",
  cors({
    origin: (origin, callback) => {
      console.log(`Preflight Request Origin: ${origin || "no origin"}`);
      if (isOriginAllowed(origin)) {
        console.log(`CORS preflight allowed origin: ${origin || "no origin"}`);
        callback(null, origin || true);
      } else {
        console.log(`CORS preflight blocked origin: ${origin}`);
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  }),
);

app.use(cookieParser());
app.use(helmet());

// Parse JSON
app.use(express.json({ limit: '2mb' }));

// Prevent HTTP parameter pollution & XSS
app.use(hpp());
app.use(xss());
app.use(morgan("dev"));

app.use(
  "/Uploads",
  express.static(path.join(__dirname, "Uploads"), {
    setHeaders: (res) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET");
    },
  }),
);

app.use('/api/v1/messages', MessageRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/provinces', provincesRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/companies', companiesRouter);
app.use('/api/v1/advertisements', advertisementsRouter);
app.use('/api/v1/content', contentRouter);
app.use('/api/v1/admin', adminRouter);

// Global error handler
app.use(globalErrorHandler);

app.use("*", (req, res) => {
  res.status(404).json({
    status: "Fail",
    message: `Can't find ${req.originalUrl}`,
  });
});

module.exports = app;
