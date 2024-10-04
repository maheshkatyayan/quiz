import Pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
 host: 'database-1.c5k8wya6yico.us-east-1.rds.amazonaws.com', // Your RDS endpoint
  port: 5432,
  user: 'postgres',  // Your username
  password: 'InQuiztive2024',  // Your password
  database: 'postgres',  // Your database name
  ssl: {
    rejectUnauthorized:false
}
};
const db = new Pg.Client(dbConfig);
// const db = new Pg.Client({
//   connectionString: 'postgresql://mahesh:i8hW0vNCuZan89BvMbzCAA@droll-egret-5007.7s5.aws-ap-south-1.cockroachlabs.cloud:26257/quiz?sslmode=verify-full',
//   // ssl: {
//   //   ca: fs.readFileSync(path.resolve(__dirname, 'path/to/your/cockroachdb-ca.crt')).toString(),
//   // },
// });
//console.log(db)
try{
  db.connect()
  console.log("Connected to PostgreSQL")
}catch(err){
  console.log("some erro occurs")
}


export default db;
