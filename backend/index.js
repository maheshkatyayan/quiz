import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";


const secretKey = "mahesh"; // Using hardcoded secret key use in auth
var tokenVar;//will be use in auth

// CREATE TABLE quiz(
// id serial primary key,
// question varchar(400),
// options1 varchar(100),
// options2 varchar(100),
// options3 varchar(100),
// options4 varchar(100)
// answer varchar(100),
// discription varchar(400),
// image varchar(400)
// );
//jsonwebtoken


const app = express();
const port = 5000;
const API_URL = "http://localhost:8000";

// Middleware setup
app.use(cookieParser());
app.use(express.static("public"));
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true // Allow credentials to be sent
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database configuration
const dbConfig = {
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Mahesh@1802",
  port: 4000,
};

const db = new pg.Client(dbConfig);
db.connect()
  .then(() => console.log("Connected to the database"))
  .catch(err => console.error("Error connecting to database:", err));

// Route to get all questions
app.get("/getquestion", async (req, res) => {
  const token1 = await req.cookies.token;
  console.log("token1",token1)
  console.log("tokenvar",tokenVar)
  if(token1===tokenVar){
    const decode=jwt.verify(token1,secretKey)
  console.log("yes");
  }
  try {
    const result = await db.query("SELECT * FROM quiz");
    //console.log(result.rows);
    res.json(result.rows); // Sending all quiz rows as JSON response
  } catch (err) {
    console.error("Error getting questions:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to add a question
app.post("/addquestion", async (req, res) => {
  const receivedData1 = req.body.data;
 // console.log(receivedData1.question, receivedData1.options[0], receivedData1.options[1], receivedData1.options[2], receivedData1.options[3], receivedData1.dis, receivedData1.imgsrc);
  try {
    const result = await db.query("INSERT INTO quiz(question, options1, options2, options3, options4, answer, discription, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [
      receivedData1.question,
      receivedData1.options[0],
      receivedData1.options[1],
      receivedData1.options[2],
      receivedData1.options[3],
      receivedData1.answer,
      receivedData1.dis,
      receivedData1.imgsrc
    ]);
    res.status(200).send('Data received successfully');
  } catch (err) {
    console.error("Error adding question:", err);
    res.status(500).json({ error: "Failed to add question" });
  }
});


//auth sections
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
      const token = jwt.sign({ email }, secretKey);
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


// Start the server
app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
