const nodemailer = require('nodemailer');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const env = (...keys) => {
  for (const key of keys) {
    const value = process.env[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
};

<<<<<<< HEAD
exports.getMailConfig = () => {
  const user = env('SMTP_USER', 'EMAIL_USER');
  const from = env('EMAIL_FROM') || user;
  return {
    host: env('SMTP_HOST', 'EMAIL_HOST'),
    port: Number(env('SMTP_PORT', 'EMAIL_PORT') || 587),
    user,
    pass: env('SMTP_PASS', 'EMAIL_PASS'),
    from,
    contactTo: env('CONTACT_EMAIL'),
  };
};
=======
exports.getMailConfig = () => ({
  host: env('SMTP_HOST', 'EMAIL_HOST'),
  port: Number(env('SMTP_PORT', 'EMAIL_PORT') || 587),
  user: env('SMTP_USER', 'EMAIL_USER'),
  pass: env('SMTP_PASS', 'EMAIL_PASS').replace(/\s+/g, ''),
  from: env('SMTP_FROM', 'EMAIL_FROM', 'SMTP_USER', 'EMAIL_USER'),
  contactTo: env('CONTACT_EMAIL', 'SMTP_USER', 'EMAIL_USER'),
});
>>>>>>> 8c8c075c12a6fea126da96f76094a07e9f08a350

exports.missingSmtpKeys = () => {
  const { host, port, user, pass } = exports.getMailConfig();
  const missing = [];
  if (!host) missing.push('SMTP_HOST');
  if (!Number.isInteger(port) || port < 1 || port > 65535) missing.push('SMTP_PORT');
  if (!user) missing.push('SMTP_USER');
  if (!pass) missing.push('SMTP_PASS');
  return missing;
};

exports.missingMailKeys = () => {
  const missing = exports.missingSmtpKeys();
  const { contactTo } = exports.getMailConfig();
  if (!EMAIL_RE.test(contactTo)) missing.push('CONTACT_EMAIL');
  return missing;
};

exports.isSmtpConfigured = () => exports.missingSmtpKeys().length === 0;

exports.isMailConfigured = () => exports.isSmtpConfigured() && exports.missingMailKeys().length === 0;

/** Safe API message when contact email cannot be sent (no secrets). */
exports.contactMailNotReadyMessage = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'We could not send your message right now. Please try again later or reach us by phone.';
  }
  const missing = exports.missingMailKeys();
  return `Email is not configured on the server. Set ${missing.join(', ')} in the backend environment and restart the server.`;
};

exports.createTransport = () => {
  const missing = exports.missingSmtpKeys();
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
