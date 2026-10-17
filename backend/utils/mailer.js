const nodemailer = require('nodemailer');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const env = (...keys) => {
  for (const key of keys) {
    const value = process.env[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
};

exports.getMailConfig = () => ({
  host: env('SMTP_HOST', 'EMAIL_HOST'),
  port: Number(env('SMTP_PORT', 'EMAIL_PORT') || 587),
  user: env('SMTP_USER', 'EMAIL_USER'),
  pass: env('SMTP_PASS', 'EMAIL_PASS').replace(/\s+/g, ''),
  from: env('SMTP_FROM', 'EMAIL_FROM', 'SMTP_USER', 'EMAIL_USER'),
  contactTo: env('CONTACT_EMAIL', 'SMTP_USER', 'EMAIL_USER'),
});

exports.missingMailKeys = () => {
  const { host, port, user, pass, contactTo } = exports.getMailConfig();
  const missing = [];
  if (!host) missing.push('SMTP_HOST');
  if (!Number.isInteger(port) || port < 1 || port > 65535) missing.push('SMTP_PORT');
  if (!user) missing.push('SMTP_USER');
  if (!pass) missing.push('SMTP_PASS');
  if (!EMAIL_RE.test(contactTo)) missing.push('CONTACT_EMAIL');
  return missing;
};

exports.isMailConfigured = () => exports.missingMailKeys().length === 0;

exports.createTransport = () => {
  const missing = exports.missingMailKeys();
  if (missing.length) {
    throw new Error(`SMTP is not configured: missing or invalid ${missing.join(', ')}`);
  }

  const { host, port, user, pass } = exports.getMailConfig();
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user, pass },
  });
};

exports.sendMail = async (options) => {
  const { from } = exports.getMailConfig();
  const transport = exports.createTransport();
  return transport.sendMail({ from, ...options });
};
