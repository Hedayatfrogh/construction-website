const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const Message = require('../models/Message');

exports.createMessage = catchAsync(async (req, res, next) => {
  const { firstName, lastName, company, email, phone, description, websiteId } =
    req.body;

  if (!['spark_trust', 'azad_noori'].includes(websiteId)) {
    return next(new AppError('Invalid websiteId', 400));
  }

  const newMessage = await Message.create({
    firstName,
    lastName: lastName || '',
    company: company || '',
    email,
    phone: phone || '',
    description,
    websiteId,
  });

  res.status(201).json({
    status: 'success',
    data: {
      id: newMessage.id || newMessage._id,
      firstName: newMessage.firstName,
      lastName: newMessage.lastName,
      company: newMessage.company,
      email: newMessage.email,
      description: newMessage.description,
      websiteId: newMessage.websiteId,
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

  const message = await Message.findByIdAndUpdate(
    id,
    { isRead },
    { new: true, runValidators: true }
  );

  if (!message) {
    return next(new AppError('No message found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Message updated successfully',
  });
});
