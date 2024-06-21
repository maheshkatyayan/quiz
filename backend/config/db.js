import Pg from "pg";
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

export const db = new Pg(dbConfig);
db.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Error connecting to database:', err));
