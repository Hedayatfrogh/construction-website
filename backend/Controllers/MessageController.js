const catchAsync = require('../utils/CatchAsync')
const db = require('../config/db')

exports.createMessage = catchAsync(async (req, res, next) => {
  const { firstName, lastName, company, email, description, websiteId } =
    req.body

  if (!['spark_trust', 'azad_noori'].includes(websiteId)) {
    return next(new AppError('Invalid websiteId', 400))
  }

  const [result] = await db.execute(
    `INSERT INTO messages (firstName, lastName, company, email, description, websiteId)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [firstName, lastName, company, email, description, websiteId]
  )

  res.status(201).json({
    status: 'success',
    data: {
      id: result.insertId,
      firstName,
      lastName,
      company,
      email,
      description,
      websiteId
    }
  })
})

exports.getMessagesByWebsite = catchAsync(async (req, res, next) => {
  const { websiteId } = req.params

  if (!['spark_trust', 'azad_noori'].includes(websiteId)) {
    return next(new AppError('Invalid websiteId', 400))
  }

  const [messages] = await db.execute(
    `SELECT * FROM messages WHERE websiteId = ? ORDER BY createdAt DESC`,
    [websiteId]
  )

  res.status(200).json({
    status: 'success',
    results: messages.length,
    data: messages
  })
})

exports.updateMessage = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const { isRead } = req.body

  if (typeof isRead !== 'boolean') {
    return next(new AppError('isRead must be a boolean', 400))
  }

  const [result] = await db.execute(
    `UPDATE messages SET isRead = ? WHERE id = ?`,
    [isRead, id]
  )

  if (result.affectedRows === 0) {
    return next(new AppError('No message found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    message: 'Message updated successfully'
  })
})
