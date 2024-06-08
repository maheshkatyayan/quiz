import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import axios from 'axios';

const app = express();
const port = 5000;
const API_URL = "http://localhost:8000";

// Middleware setup
app.use(express.static("public"));
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
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
  try {
    const result = await db.query("SELECT * FROM quiz");
    console.log(result.rows);
    res.json(result.rows); // Sending all quiz rows as JSON response
  } catch (err) {
    console.error("Error getting questions:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to add a question
app.post("/addquestion", async (req, res) => {
  const receivedData1 = req.body.data;
  console.log(receivedData1.question, receivedData1.options[0], receivedData1.options[1], receivedData1.options[2], receivedData1.options[3], receivedData1.dis, receivedData1.imgsrc);
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

// Route to add options (this route seems redundant as options are added in addquestion route)
app.post("/optionadded", async (req, res) => {
  const receivedData1 = req.body.data;
  console.log(receivedData1.options[4]);
  try {
    const result = await db.query("INSERT INTO quiz (options1, options2, options3, options4, answer) VALUES ($1, $2, $3, $4, $5)", [
      receivedData1.options[0],
      receivedData1.options[1],
      receivedData1.options[2],
      receivedData1.options[3],
      receivedData1.options[4]
    ]);
    res.status(200).send('Data received successfully');
  } catch (err) {
    console.error("Error adding options:", err);
    res.status(500).json({ error: "Failed to add options" });
  }
});

// Route to handle password addition (currently not implemented)
app.post("/addpassword", async (req, res) => {
  const receivedData2 = req.body.data;
  console.log("Received password data:", receivedData2);
  var a=receivedData2.email
  console.log(a.slice(8,22))
  if(a.slice(8,32)==='@iiitdwd.ac.in'){
    console.log("yes")
  }
   
  // Add your password handling logic here
});

// Start the server
app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
