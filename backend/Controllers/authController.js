// authController.js
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/CatchAsync');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { createHash, randomBytes } = require('crypto');
const { getDb } = require('../config/db');

const ensurePasswordResetTable = () => {
  getDb().exec(`
    CREATE TABLE IF NOT EXISTS password_resets (
      token_hash TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      used_at TEXT
    )
  `);
};

// Helper: is the request coming from a local / LAN context? (plain HTTP,
// no TLS, so we must NOT use `Secure` cookies and should use `Lax` for
// `SameSite` so the cookie is sent on cross-origin requests from the LAN).
const isLocalOrigin = (origin) => {
  if (!origin) return true; // no Origin header (e.g. curl)
  if (origin.includes('localhost') || origin.includes('127.0.0.1')) return true;
  // RFC1918 IPv4 private ranges
  const m = origin.match(/https?:\/\/(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})/);
  if (m) {
    const a = Number(m[1]);
    const b = Number(m[2]);
    if (a === 10) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 127) return true;
  }
  // IPv6 loopback / link-local / unique-local
  if (origin.includes('://[::1]')) return true;
  if (origin.includes('://[fe80')) return true;
  if (origin.includes('://[fc') || origin.includes('://[fd')) return true;
  return false;
};

const signToken = (id, role, tokenVersion = '0') => {
  return jwt.sign({ id, role, tokenVersion }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '90d',
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id || user.id, user.role, user.tokenVersion);
  const origin = req.headers.origin || 'no origin';
  const localOrigin = isLocalOrigin(origin);

  // Determine cookie name based on origin
  let cookieName = 'jwt';
  if (origin.includes('azadnoori.com')) {
    cookieName = 'jwt_azadnoori';
  } else if (origin.includes('sparktrust.tech') || origin.includes('sparktrust.ca')) {
    cookieName = 'jwt_sparktrust';
  }

  const cookieOptions = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 90) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: localOrigin ? false : true,
    sameSite: localOrigin ? 'Lax' : 'None',
    path: '/',
  };

  res.cookie(cookieName, token, cookieOptions);

  const userObj = user.toObject ? user.toObject() : { ...user };
  delete userObj.password;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user: userObj },
  });
};

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (typeof email !== 'string' || !email.trim() || typeof password !== 'string' || !password) {
    return next(new AppError('Please provide your email and password!', 400));
  }

<<<<<<< HEAD
  const user = await User.findOne({ email: String(email).trim().toLowerCase() }).select('+password');
  if (!user || !(await bcrypt.compare(String(password), user.password))) {
=======
  const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');
  if (
    !user ||
    user.role !== 'admin' ||
    user.is_active === false ||
    !(await bcrypt.compare(password, user.password))
  ) {
>>>>>>> 5bd4460d2e4320943266b8a62ca576eb0e21e1d6
    return next(new AppError('Incorrect email or password!', 401));
  }

  createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  const origin = req.headers.origin || 'no origin';
  const localOrigin = isLocalOrigin(origin);
  let cookieName = 'jwt';
  if (origin.includes('azadnoori.com')) {
    cookieName = 'jwt_azadnoori';
  } else if (origin.includes('sparktrust.tech') || origin.includes('sparktrust.ca')) {
    cookieName = 'jwt_sparktrust';
  }

  res.cookie(cookieName, '', {
    expires: new Date(0),
    httpOnly: true,
    secure: localOrigin ? false : true,
    sameSite: localOrigin ? 'Lax' : 'None',
    path: '/',
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    const origin = req.headers.origin || 'no origin';
    let cookieName = 'jwt';
    if (origin.includes('azadnoori.com')) {
      cookieName = 'jwt_azadnoori';
    } else if (origin.includes('sparktrust.tech') || origin.includes('sparktrust.ca')) {
      cookieName = 'jwt_sparktrust';
    }

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies[cookieName]) {
      token = req.cookies[cookieName];
    }

    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id).select('-password');
    if (!currentUser || currentUser.is_active === false) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }
    if (String(decoded.tokenVersion || '0') !== String(currentUser.tokenVersion || '0')) {
      return next(new AppError('Your session has expired. Please sign in again.', 401));
    }

    req.user = currentUser;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new AppError('Your session has expired. Please log in again.', 401));
    }
    return next(new AppError('Your session is invalid or has expired. Please sign in again.', 401));
  }
};

exports.getMe = catchAsync(async (req, res, next) => {
  if (!req.user || (!req.user.id && !req.user._id)) {
    return next(new AppError('No authenticated user found.', 401));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body || {};
  if (
    typeof currentPassword !== 'string' ||
    !currentPassword ||
    typeof newPassword !== 'string' ||
    newPassword.length < 12
  ) {
    return next(
      new AppError(
        'Enter your current password and a new password of at least 12 characters.',
        400,
      ),
    );
  }

  const user = await User.findById(req.user.id).select('+password');
  if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
    return next(new AppError('Current password is incorrect.', 401));
  }

  const updatedUser = await User.findByIdAndUpdate(user.id, {
    password: await bcrypt.hash(newPassword, 12),
    tokenVersion: String(Number(user.tokenVersion || 0) + 1),
  });
  createSendToken(updatedUser, 200, req, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const email =
    typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  if (!email) return next(new AppError('Email is required.', 400));

  const smtpReady =
    process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS;
  if (!smtpReady) {
    return next(
      new AppError('Password recovery is not configured. Contact the site administrator.', 503),
    );
  }

  const genericMessage =
    'If an administrator account exists, reset instructions have been sent.';
  const user = await User.findOne({ email });
  if (!user || user.role !== 'admin') {
    return res.status(200).json({ status: 'success', message: genericMessage });
  }

  ensurePasswordResetTable();
  const rawToken = randomBytes(32).toString('hex');
  const tokenHash = createHash('sha256').update(rawToken).digest('hex');
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
  getDb()
    .prepare('DELETE FROM password_resets WHERE user_id = ?')
    .run(user.id);
  getDb()
    .prepare('INSERT INTO password_resets (token_hash, user_id, expires_at) VALUES (?, ?, ?)')
    .run(tokenHash, user.id, expiresAt);

  try {
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT || 587),
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
    const resetUrl = new URL(
      '/reset-password',
      process.env.FRONTEND_URL || 'http://localhost:5175',
    );
    resetUrl.searchParams.set('token', rawToken);
    await transport.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: user.email,
      subject: 'SMS administrator password reset',
      text: `Use this one-time link within 30 minutes to reset your password: ${resetUrl.toString()}`,
    });
  } catch (error) {
    getDb().prepare('DELETE FROM password_resets WHERE token_hash = ?').run(tokenHash);
    console.error('Password reset email delivery failed:', error.code || 'mail error');
    return next(new AppError('Could not send password reset email. Please try again later.', 503));
  }

  return res.status(200).json({ status: 'success', message: genericMessage });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token, newPassword } = req.body || {};
  if (
    typeof token !== 'string' ||
    !token ||
    typeof newPassword !== 'string' ||
    newPassword.length < 12
  ) {
    return next(
      new AppError(
        'A valid reset link and a password of at least 12 characters are required.',
        400,
      ),
    );
  }

  ensurePasswordResetTable();
  const tokenHash = createHash('sha256').update(token).digest('hex');
  const db = getDb();
  db.exec('BEGIN IMMEDIATE');
  try {
    const reset = db
      .prepare(
        `SELECT user_id FROM password_resets
         WHERE token_hash = ? AND used_at IS NULL AND julianday(expires_at) > julianday('now')`,
      )
      .get(tokenHash);
    const user = reset ? await User.findById(reset.user_id) : null;
    if (!user || user.role !== 'admin') {
      db.exec('ROLLBACK');
      return next(new AppError('This password reset link is invalid or expired.', 400));
    }

    await User.findByIdAndUpdate(user.id, {
      password: await bcrypt.hash(newPassword, 12),
      tokenVersion: String(Number(user.tokenVersion || 0) + 1),
    });
    db.prepare('UPDATE password_resets SET used_at = ? WHERE token_hash = ?')
      .run(new Date().toISOString(), tokenHash);
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }

  return res.status(200).json({
    status: 'success',
    message: 'Password reset successfully.',
  });
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};