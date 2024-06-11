import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
const port = 1000;
const secretKey = "mahesh"; // Using hardcoded secret key
let tokenVar;

app.use(cookieParser());
app.use(express.static("public"));
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true // Allow credentials to be sent
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbConfig = {
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Mahesh@1802",
  port: 4000, // Corrected port number for PostgreSQL
};

const db = new pg.Client(dbConfig);
db.connect()
  .then(() => console.log("Connected to the database"))
  .catch(err => console.error("Error connecting to database:", err));


app.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true, sameSite: 'Lax' });
  res.send("logout successful postman");
  console.log("logout successful");
});

app.get("/readtoken", (req, res) => {
  const token1 = req.cookies.token;
  console.log(token1);
  res.json({ success: true, token: token1 });
});

// bcrypt salt generation
const salt = bcrypt.genSaltSync(10);

app.post("/addpassword", async (req, res) => {
  const { email, password } = req.body.data;
  if (validator.isEmail(email) && email.endsWith('@iiitdwd.ac.in')) {
    try {
      const hash = await bcrypt.hash(password, salt);
      await db.query("INSERT INTO auth(username, email, password_hash) VALUES ($1, $2, $3)", [
        "mahesh",
        email,
        hash,
      ]);
      res.status(200).json({ message: 'Data received successfully' });
    } catch (err) {
      console.error("Error adding password:", err);
      res.status(500).json({ error: "Failed to add password" });
    }
  } else {
    console.log("Invalid email");
    res.status(400).json({ error: "Invalid email format or domain" });
  }
});

app.post("/loginpassword", async (req, res) => {
  const { email, password } = req.body.data;
  console.log(email, password);
  try {
    const result = await db.query('SELECT password_hash FROM auth WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hash = result.rows[0].password_hash;
    const matchingPassword = await bcrypt.compare(password, hash);

    if (matchingPassword) {
      const token = jwt.sign({ email }, secretKey, { expiresIn: '300s' });
      tokenVar = token;
      console.log(tokenVar);
      res.cookie("token", tokenVar,{ httpOnly: true, sameSite: 'Lax' });
      res.json({ success1: true, token });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Failed to log in" });
  }
  
});

app.listen(port, () => {
  console.log(`auth.js API is running at http://localhost:${port}`);
});

//when I am sending cookies in this post request it is not working but it is working when I am making req from postman
// create table auth(
//   id serial primary key,
//     username VARCHAR(255) UNIQUE NOT NULL,
//     email VARCHAR(255) NOT NULL,
//       password_hash BYTEA NOT NULL
//   );
