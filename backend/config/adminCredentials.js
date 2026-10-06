// Local development admin login. On startup (when NODE_ENV is not
// "production") the backend makes sure this account exists in SQLite with
// this password. Change the values here and restart the backend.
module.exports = {
  name: 'Admin',
  email: 'admin@example.com',
  password: 'Admin@123456',
};
