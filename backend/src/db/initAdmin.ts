import pool from './database.js'
import bcrypt from 'bcryptjs'

export async function ensureDefaultUsers() {
  // Tom (admin)
  const hashTom = await bcrypt.hash('password', 10);
  await pool.query(
    `INSERT INTO users (login, password_hash, role)
     VALUES ('Tom', $1, 'admin')
     ON CONFLICT (login) DO NOTHING`,
    [hashTom]
  );

  // Mathilde (user)
  const hashMathilde = await bcrypt.hash('password', 10);
  await pool.query(
    `INSERT INTO users (login, password_hash, role)
     VALUES ('Mathilde', $1, 'user')
     ON CONFLICT (login) DO NOTHING`,
    [hashMathilde]
  );

  console.log('👍 Utilisateurs Tom (admin) et Mathilde (user) vérifiés ou créés');
}