const bcrypt = require('bcryptjs');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/CatchAsync');
const User = require('../models/User');

const publicUser = (user) => {
  const result = user.toObject ? user.toObject() : { ...user };
  delete result.password;
  return result;
};

const activeAdminCount = async () =>
  (await User.find({ role: 'admin', is_active: true })).length;

exports.listUsers = catchAsync(async (_req, res) => {
  const users = await User.find({ role: 'admin' }).sort({ createdAt: -1 });
  res.status(200).json({
    status: 'success',
    data: { users: users.map(publicUser) },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body || {};
  if (
    typeof name !== 'string' ||
    !name.trim() ||
    typeof email !== 'string' ||
    !email.trim() ||
    typeof password !== 'string' ||
    password.length < 12
  ) {
    return next(
      new AppError(
        'Name, email, and a password of at least 12 characters are required.',
        400,
      ),
    );
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (await User.findOne({ email: normalizedEmail })) {
    return next(new AppError('An account with this email already exists.', 409));
  }

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password: await bcrypt.hash(password, 12),
    role: 'admin',
    is_active: true,
    is_super_admin: false,
    tokenVersion: '0',
  });
  res.status(201).json({
    status: 'success',
    data: { user: publicUser(user) },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user || user.role !== 'admin') {
    return next(new AppError('Admin user not found.', 404));
  }

  const { name, email, is_active: isActive, password } = req.body || {};
  const updates = {};
  if (name !== undefined) {
    if (typeof name !== 'string' || !name.trim()) {
      return next(new AppError('Name cannot be empty.', 400));
    }
    updates.name = name.trim();
  }
  if (email !== undefined) {
    if (typeof email !== 'string' || !email.trim()) {
      return next(new AppError('Email cannot be empty.', 400));
    }
    updates.email = email.trim().toLowerCase();
  }
  if (isActive !== undefined) {
    if (typeof isActive !== 'boolean') {
      return next(new AppError('Account status must be true or false.', 400));
    }
    if (isActive === false && user.is_super_admin) {
      return next(new AppError('The primary administrator cannot be disabled.', 409));
    }
    if (
      isActive === false &&
      user.is_active &&
      (await activeAdminCount()) <= 1
    ) {
      return next(new AppError('The last active administrator cannot be disabled.', 409));
    }
    updates.is_active = isActive;
  }
  if (email !== undefined) {
    const existing = await User.findOne({ email: updates.email });
    if (existing && existing.id !== user.id) {
      return next(new AppError('An account with this email already exists.', 409));
    }
  }
  if (password !== undefined) {
    if (typeof password !== 'string' || password.length < 12) {
      return next(new AppError('A password must be at least 12 characters.', 400));
    }
    updates.password = await bcrypt.hash(password, 12);
    updates.tokenVersion = String(Number(user.tokenVersion || 0) + 1);
  }
  if (Object.keys(updates).length === 0) {
    return next(new AppError('No user changes were provided.', 400));
  }

  const updatedUser = await User.findByIdAndUpdate(user.id, updates);
  res.status(200).json({
    status: 'success',
    data: { user: publicUser(updatedUser) },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  if (String(req.user.id) === String(req.params.id)) {
    return next(
      new AppError('You cannot delete your own administrator account.', 409),
    );
  }

  const user = await User.findById(req.params.id);
  if (!user || user.role !== 'admin') {
    return next(new AppError('Admin user not found.', 404));
  }
  if (user.is_super_admin) {
    return next(new AppError('The primary administrator cannot be deleted.', 409));
  }
  if (user.is_active && (await activeAdminCount()) <= 1) {
    return next(new AppError('The last active administrator cannot be deleted.', 409));
  }

  await User.findByIdAndDelete(user.id);
  res.status(204).send();
});

exports.requireOwner = (req, res, next) => {
  if (!req.user?.is_super_admin) {
    return next(
      new AppError(
        'Only the primary administrator can manage admin accounts.',
        403,
      ),
    );
  }
  next();
};

exports.uploadImage = (req, res, next) => {
  if (!req.file) return next(new AppError('Choose an image to upload.', 400));
  const publicBase = (
    process.env.PUBLIC_API_URL || `${req.protocol}://${req.get('host')}`
  )
    .replace(/\/api\/v1\/?$/i, '')
    .replace(/\/+$/, '');
  res.status(201).json({
    status: 'success',
    data: {
      url: `${publicBase}/Uploads/${encodeURIComponent(req.file.filename)}`,
    },
  });
};
