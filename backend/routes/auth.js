import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { db } from '../config/db.js';

const router = express.Router();
const salt = bcrypt.genSaltSync(10);
const secretKey = process.env.SECRET_KEY;

router.post('/addpassword', async (req, res) => {
  const { email, password } = req.body.data;

  if (validator.isEmail(email) && email.endsWith('@iiitdwd.ac.in')) {
    try {
      const hash = await bcrypt.hash(password, salt);
      await db.query('INSERT INTO auth(username, email, password_hash) VALUES ($1, $2, $3)', [
        'username', // Replace with actual username if needed
        email,
        hash,
      ]);
      res.status(200).json({ message: 'Data received successfully' });
    } catch (err) {
      console.error('Error adding password:', err);
      res.status(500).json({ error: 'Failed to add password' });
    }
  } else {
    res.status(400).json({ error: 'Invalid email format or domain' });
  }
});

router.post('/loginpassword', async (req, res) => {
  const { email, password } = req.body.data;
  try {
    const result = await db.query('SELECT password_hash FROM auth WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hash = result.rows[0].password_hash;
    const matchingPassword = await bcrypt.compare(password, hash);

    if (matchingPassword) {
      const token = jwt.sign({ email }, secretKey);
      res.cookie('token', token, { httpOnly: true, sameSite: 'Lax' });
      res.json({ success: true, token });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

router.post('/logout', (req, res) => {
  res.cookie('token', '', { httpOnly: true, sameSite: 'Lax' });
  res.send('Logout successful');
});

router.get('/readtoken', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  } else {
    res.json({ success: true, token });
  }
});

export default router;
