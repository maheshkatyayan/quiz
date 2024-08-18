import Pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// const dbConfig = {
//   user: "postgres",
//   host: "localhost",
//   database: "world",
//   password: "Mahesh@1802",
//   port: 4000,
// };;
const db = new Pg.Client({
  connectionString: 'postgresql://mahesh:i8hW0vNCuZan89BvMbzCAA@droll-egret-5007.7s5.aws-ap-south-1.cockroachlabs.cloud:26257/quiz?sslmode=verify-full',
  // ssl: {
  //   ca: fs.readFileSync(path.resolve(__dirname, 'path/to/your/cockroachdb-ca.crt')).toString(),
  // },
});

db.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("Connection error", err.stack));

export default db;
