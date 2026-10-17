// Maps known errors to safe, user-friendly responses and hides internals.
const normalize = (err) => {
  if (err.name === 'CastError') return { statusCode: 400, message: `Invalid ${err.path === '_id' ? 'ID' : err.path}.` };
  if (err.name === 'ValidationError') {
    const first = Object.values(err.errors || {})[0];
    return { statusCode: 400, message: first ? first.message : 'Invalid data.' };
  }
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || err.keyPattern || {})[0] || 'value';
    return { statusCode: 409, message: `A record with this ${field} already exists.` };
  }
  if (err.type === 'entity.parse.failed') return { statusCode: 400, message: 'Malformed JSON body.' };
  if (err.type === 'entity.too.large') return { statusCode: 413, message: 'Request body is too large.' };
  if (err.name === 'MulterError') return { statusCode: 400, message: err.code === 'LIMIT_FILE_SIZE' ? 'Image must be 8 MB or smaller.' : 'Invalid upload.' };
  if (/^Upload a JPEG/.test(err.message || '')) return { statusCode: 400, message: err.message };
  if (/^Not allowed by CORS/.test(err.message || '')) return { statusCode: 403, message: 'Origin not allowed.' };
  if (/^Mongo(Server|Network)|ServerSelection/.test(err.name || '')) {
    return { statusCode: 503, message: 'The database is temporarily unavailable. Please try again shortly.' };
  }
  return null;
};

module.exports = (err, req, res, next) => {
  const known = normalize(err);
  const statusCode = known ? known.statusCode : err.statusCode || 500;
  let message = known ? known.message : err.message;

  if (statusCode >= 500 && !known && !err.isOperational) {
    console.error('Unhandled error:', err);
    message = 'Something went wrong. Please try again later.';
  } else if (statusCode >= 500 && err.isOperational) {
    console.error(err.message);
  }

  res.status(statusCode).json({
    status: statusCode < 500 ? 'fail' : 'error',
    message,
    ...(err.errorCode ? { code: err.errorCode } : {}),
  });
};
