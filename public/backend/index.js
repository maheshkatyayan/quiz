import express from 'express'
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import axios from 'axios'

const app = express();
const port = 5000;


// CREATE TABLE quiz(
// id serial primary key,
// question varchar(400),
// options1 varchar(100),
// options2 varchar(100),
// options3 varchar(100),
// options4 varchar(100),
// answer varchar(100),
// discription varchar(400),
// image varchar(400)
// );

app.use(express.static("public"));
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST","PUT","PATCH","DELETE"]
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

const db = new pg.Client(dbConfig);//one of the difference from my code
db.connect()
  .then(() => console.log("Connected to the database"))
  .catch(err => console.error("Error connecting to database:", err));



//Get All the question
app.get("/getquestion", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM quiz");
    console.log(result.rows)
    const questions = result.rows.map(row => row.options1);
    res.json(result.rows); // Sending array of questions as JSON response
  } catch (err) {
    console.error("Error getting questions:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Add the question

app.post("/addquestion", async (req, res) => {
  const receivedData1 = req.body.data;
  
  console.log( receivedData1.question,receivedData1.options[0],receivedData1.options[1],receivedData1.options[2],receivedData1.options[3],receivedData1.dis,receivedData1.imgsrc);
  try {
    const result = await db.query("INSERT INTO quiz(question,options1,options2,options3,options4,answer,discription,image) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",[ receivedData1.question,receivedData1.options[0],receivedData1.options[1],receivedData1.options[2],receivedData1.options[3],receivedData1.answer,receivedData1.dis,receivedData1.imgsrc]);
    res.status(200).send('Data received successfully1');
  } catch (err) {
    console.error("Error adding question:", err);
    res.status(500).json({ error: "Failed to add question" });
  }
});


app.post("/optionadded", async (req, res) => {
  const receivedData1 = req.body.data;
  console.log(receivedData1.options[4]);
 
  try {
    const result = await db.query("INSERT INTO quiz (options1,options2,options3,options4,answer) VALUES ($2,$3,$4,$5,$6)",[receivedData1.options[0],receivedData1.options[1],receivedData1.options[2],receivedData1.options[3],receivedData1.options[4]]);
   
    res.status(200).send('Data received successfully1');
  } catch (err) {
    console.error("Error adding question:", err);
    res.status(500).json({ error: "Failed to add question" });
  }
});

//for post


// // Route to render the main page
// const API_URL = "http://localhost:1000";
// app.get("/", async (req, res) => {
//   try {
//     const response = await axios.get(`${API_URL}/posts`);
//      console.log(response.data);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching posts" });
//   }
// });

// // Route to render the edit page
// app.get("/new", (req, res) => {
 
// });

// app.get("/edit/:id", async (req, res) => {
//   try {
//     const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
//     console.log(response.data);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching post" });
//   }
// });

// // Create a new post
// app.post("/api/posts", async (req, res) => {
//   try {
//     const response = await axios.post(`${API_URL}/posts`, req.body);
//     console.log(response.data);
//     // res.redirect("/");
//   } catch (error) {
//     res.status(500).json({ message: "Error creating post" });
//   }
// });

// // Partially update a post
// app.post("/api/posts/:id", async (req, res) => {
//   console.log("called");dasdascs
//   try {
//     const response = await axios.patch(
//       `${API_URL}/posts/${req.params.id}`,
//       req.body
//     );
//     console.log(response.data);
//     // res.redirect("/");
//   } catch (error) {
//     res.status(500).json({ message: "Error updating post" });
//   }
// });

// // Delete a post
// app.get("/api/posts/delete/:id", async (req, res) => {
//   try {
//     await axios.delete(`${API_URL}/posts/${req.params.id}`);
//     // res.redirect("/");
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting post" });
//   }
// });







app.listen(port, () => {
  console.log(`Backend index is running on http://localhost:${port}`);
});
/*
User
import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import pg from "pg";

const app = express();
const port = 5000;
 const API_URL = "http://localhost:8000";

 app.use(express.static("public"));
app.use(cors({
  origin:"http://localhost:3000",
  methods:["GET","POST"]
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Mahesh@1802",
  port: 4000,
});
db.connect();

app.post('/add', (req, res) => {
  const receivedData = req.body.data;
  console.log('Received data:', receivedData);
  console.log(receivedData)
  res.status(200).send('Data received successfully');
});

app.get("/getquestion", async (req, res) => { 
  try{
    const result = await db.query("SELECT question FROM quiz");
     let question = [];
    result.rows.forEach((i) => {
      question.push(i.question);
    });
    console.log(question[1])
    res.send(question[2])
  }
  catch(err){
    console.log(err)
  }
});

app.post("/added", async (req, res) => {
  const receivedData1 = (req.body.data);
   console.log('Received data1:', receivedData1);
   const receivedData2="thik nahi h"
  try{
    const result = await db.query("INSERT INTO quiz (question) VALUES ($1)",[receivedData1]);
  }
  catch(err){
    console.log(err)
  }
  console.log(receivedData2)
 res.status(200).send('Data received successfully1');
 db.end();
});
  
app.listen(port, () => {
  console.log(`Backend index is running on http://localhost:${port}`);
});
*/ 