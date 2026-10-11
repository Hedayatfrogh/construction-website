const mongoose = require('../utils/mongoose');

const passwordResetSchema = new mongoose.Schema({
  tokenHash: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  expiresAt: { type: Date, required: true, expires: 0 },
  usedAt: { type: Date, default: null },
});

module.exports = mongoose.model('PasswordReset', passwordResetSchema);
