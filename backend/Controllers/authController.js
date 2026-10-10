// authController.js
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/CatchAsync');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// ── Manual admin fallback ─────────────────────────────────────────────────
// When MySQL is down / the `users` table is empty, /api/v1/users/login will
// accept a single hard-coded admin whose credentials live in `config.env`
// (ADMIN_USERNAME + ADMIN_PASSWORD_HASH). The hash is bcryptjs cost-12, the
// same scheme used by the DB path, so the comparison is identical.
//
// To rotate the password:
//   1) node scripts/generate-admin-hash.js "<new-password>"
//   2) paste the printed hash into config.env -> ADMIN_PASSWORD_HASH
//   3) restart the backend
//
// Security: the fallback only kicks in when the env hash is present. If
// ADMIN_PASSWORD_HASH is empty, the fallback is a no-op and the user gets
// the normal "Incorrect email or password" 401, even when MySQL is down.
const manualAdminEnabled = () => {
  const u = (process.env.ADMIN_USERNAME || '').trim();
  const h = (process.env.ADMIN_PASSWORD_HASH || '').trim();
  return Boolean(u && h);
};

// Returns a user object matching the DB row shape, or `null` if the
// submitted credentials do not match the env-configured admin.
const tryManualAdmin = async (email, password) => {
  if (!manualAdminEnabled()) return null;
  const username = process.env.ADMIN_USERNAME.trim().toLowerCase();
  if (email.trim().toLowerCase() !== username) return null;
  let ok = false;
  try {
    ok = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH.trim());
  } catch (_) {
    return null;
  }
  if (!ok) return null;
  return {
    // Use a stable, recognisable id derived from the username so re-login
    // sessions don't collide. The id only needs to be unique within this
    // auth fallback namespace.
    id: `manual-${username}`,
    email: process.env.ADMIN_USERNAME.trim(),
    name: (process.env.ADMIN_NAME || 'Admin').trim() || 'Admin',
    role: (process.env.ADMIN_ROLE || 'admin').trim() || 'admin',
  };
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

const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '90d',
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id || user.id, user.role);
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

  console.log('Setting cookie:', {
    token: token.slice(0, 20) + '...',
    cookieName,
    options: cookieOptions,
    origin,
  });
  res.cookie(cookieName, token, cookieOptions);
  console.log('Response headers after setting cookie:', res.getHeaders());

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
  if (!email || !password) {
    return next(new AppError('Please provide your email and password!', 400));
  }

  const user = await User.findOne({ email: String(email).trim().toLowerCase() }).select('+password');
  if (!user || !(await bcrypt.compare(String(password), user.password))) {
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

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
      console.log('Using Authorization header token:', token.slice(0, 20) + '...');
    } else if (req.cookies && req.cookies[cookieName]) {
      token = req.cookies[cookieName];
      console.log(`Using cookie-based token (${cookieName}):`, token.slice(0, 20) + '...');
    }

    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    const currentUser = await User.findById(decoded.id).select('-password');
    if (!currentUser) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    req.user = currentUser;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new AppError('Your session has expired. Please log in again.', 401));
    }
    return next(new AppError(`Invalid token: ${err.message}`, 401));
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