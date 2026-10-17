const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const Message = require('../models/Message');
const {
  isMailConfigured,
  missingMailKeys,
  getMailConfig,
  sendMail,
  contactMailNotReadyMessage,
} = require('../utils/mailer');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

const toWesternDigits = (value) =>
  String(value ?? '')
    .replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)));

const str = (value, max) => String(value ?? '').trim().slice(0, max);

exports.createMessage = catchAsync(async (req, res, next) => {
  if (str(req.body.website, 200) || str(req.body.fax, 200)) {
    return res.status(204).send();
  }

  const websiteId = req.body.websiteId || 'azad_noori';
  if (!['spark_trust', 'azad_noori'].includes(websiteId)) {
    return next(new AppError('Invalid websiteId', 400));
  }

  const fullName = str(req.body.fullName, 150);
  let firstName = str(req.body.firstName, 100);
  let lastName = str(req.body.lastName, 100);
  if (fullName && !firstName) {
    const parts = fullName.split(/\s+/);
    firstName = parts.shift() || '';
    lastName = parts.join(' ');
  }
  const email = str(req.body.email, 254).toLowerCase();
  const phone = toWesternDigits(str(req.body.phone, 40));
  const company = str(req.body.company, 150);
  const subject = str(req.body.subject, 200);
  const description = str(req.body.message || req.body.description, 5000);

  if (!firstName) return next(new AppError('Full name is required.', 400));
  if (!EMAIL_RE.test(email)) return next(new AppError('Please provide a valid email address.', 400));
  if (description.length < 10) {
    return next(new AppError('Please enter a message of at least 10 characters.', 400));
  }

  if (!isMailConfigured()) {
    console.error(`Contact form rejected: missing ${missingMailKeys().join(', ')}`);
    return next(new AppError(contactMailNotReadyMessage(), 503));
  }

  const newMessage = await Message.create({
    firstName,
    lastName,
    company,
    email,
    phone,
    subject,
    description,
    websiteId,
  });

<<<<<<< HEAD
=======
  if (!isMailConfigured()) {
    const missing = missingMailKeys().join(', ');
    console.error(`Contact saved but email not sent: missing ${missing}`);
    return next(
      new AppError(
        'Your message was saved, but email is not configured on the server.',
        503,
        'EMAIL_NOT_CONFIGURED',
      ),
    );
  }

>>>>>>> 8c8c075c12a6fea126da96f76094a07e9f08a350
  const { contactTo } = getMailConfig();
  const displayName = [firstName, lastName].filter(Boolean).join(' ');
  try {
    await sendMail({
      to: contactTo,
      replyTo: email,
      subject: subject ? `SMS contact: ${subject}` : `SMS contact from ${displayName}`,
      text: [
        'New message from the SMS website contact form.',
        '',
        `Name: ${displayName}`,
        `Email: ${email}`,
        `Phone: ${phone || '—'}`,
        `Company: ${company || '—'}`,
        `Subject: ${subject || '—'}`,
        '',
        description,
      ].join('\n'),
    });
  } catch (err) {
    console.error('Contact email delivery failed:', err.code || err.message);
    return next(
      new AppError(
        'Your message was saved, but email delivery failed. Please try again later.',
        503,
        'EMAIL_DELIVERY_FAILED',
      ),
    );
  }

  res.status(201).json({
    status: 'success',
    data: {
      id: newMessage.id || newMessage._id,
    },
  });
});

exports.getPublicContactInfo = catchAsync(async (req, res) => {
  const { contactTo } = getMailConfig();
  res.status(200).json({
    status: 'success',
    data: {
      email: EMAIL_RE.test(contactTo) ? contactTo : '',
    },
  });
});

exports.getMessagesByWebsite = catchAsync(async (req, res, next) => {
  const { websiteId } = req.params;

  if (!['spark_trust', 'azad_noori'].includes(websiteId)) {
    return next(new AppError('Invalid websiteId', 400));
  }

  const messages = await Message.find({ websiteId }).sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: messages.length,
    data: messages,
  });
});

exports.updateMessage = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { isRead } = req.body;

  if (typeof isRead !== 'boolean') {
    return next(new AppError('isRead must be a boolean', 400));
  }

  const message = await Message.findByIdAndUpdate(id, { isRead });

  if (!message) {
    return next(new AppError('No message found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Message updated successfully',
  });
});

exports.deleteMessage = catchAsync(async (req, res, next) => {
  const message = await Message.findByIdAndDelete(req.params.id);
  if (!message) {
    return next(new AppError('No message found with that ID', 404));
  }
  res.status(204).send();
});
