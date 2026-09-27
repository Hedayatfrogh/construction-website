const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log('Hashed Password:', hashedPassword);
}

hashPassword('pass123'); // Password you’re using