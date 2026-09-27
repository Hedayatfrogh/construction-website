// authController.js
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/CatchAsync');
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

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

const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id, user.role);
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
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: localOrigin ? false : true,
    sameSite: localOrigin ? 'Lax' : 'None',
    path: '/',
  };

  console.log('Setting cookie:', {
    token: token.slice(0, 20) + '...',
    cookieName,
    options: cookieOptions,
    origin,
  });
  res.cookie(cookieName, token, cookieOptions);
  console.log('Response headers after setting cookie:', res.getHeaders());

  delete user.password;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  });
};

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide your email and password!', 400));
  }

  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length === 0) {
    return next(new AppError('Incorrect email or password!', 401));
  }
  const user = rows[0];

  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
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
    console.log('Cookies:', req.cookies);
    console.log('Headers:', req.headers.authorization);
    console.log('Request origin:', req.headers.origin || 'no origin');

    let token;
    const origin = req.headers.origin || 'no origin';
    let cookieName = 'jwt';
    if (origin.includes('azadnoori.com')) {
      cookieName = 'jwt_azadnoori';
    } else if (origin.includes('sparktrust.tech') || origin.includes('sparktrust.ca')) {
      cookieName = 'jwt_sparktrust';
    }

    if (req.cookies[cookieName]) {
      token = req.cookies[cookieName];
      console.log(`Using cookie-based token (${cookieName}):`, token.slice(0, 20) + '...');
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      console.warn('Using Authorization header as fallback:', token.slice(0, 20) + '...');
    }

    if (!token) {
      return next(
        new AppError(
          `You are not logged in! Cookies: ${JSON.stringify(req.cookies)}, Headers: ${
            req.headers.authorization || 'none'
          }, Origin: ${req.headers.origin || 'none'}`,
          401
        )
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    const [rows] = await pool.execute(
      'SELECT id, email, name, role FROM users WHERE id = ?',
      [decoded.id]
    );
    if (rows.length === 0) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    req.user = rows[0];
    next();
  } catch (err) {
    return next(new AppError(`Invalid token: ${err.message}`, 401));
  }
};

exports.getMe = catchAsync(async (req, res, next) => {
  if (!req.user || !req.user.id) {
    return next(new AppError('No authenticated user found.', 401));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
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