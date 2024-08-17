import Pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Mahesh@1802",
  port: 4000,
};;
const db = new Pg.Client(dbConfig)
db.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("Connection error", err.stack));

export default db;
