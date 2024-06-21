import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Pg from "pg";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import fs from "fs";
import multer from "multer";
import dotenv from "dotenv";
import { getStorage, ref,uploadBytes,getDownloadURL} from "firebase/storage";
import { initializeApp } from "firebase/app";

dotenv.config();

const secretKey = process.env.SECRET_KEY;
const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(cookieParser());
app.use(express.static("public"));
app.use(cors({
origin: process.env.FRONTEND_URL,
methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const upload = multer({ dest: '' });

// Database configuration
// const db = new Pg.Client({
// connectionString: process.env.DATABASE_URL,
// ssl: { rejectUnauthorized: false } // Ensure SSL connection
// });

const dbConfig = {
user: "postgres",
host: "localhost",
database: "world",
password: "Mahesh@1802",
port: 4000,
};

const db = new Pg.Client(dbConfig);
db.connect()
.then(() => console.log("Connected to the database"))
.catch(err => console.error("Error connecting to database:", err));
//firebase
const firebaseConfig = {
apiKey: "AIzaSyCwQcCNFhv2pjZctwh0mmO4lcTFN6sDHrc",
authDomain: "quizmaster-b0faf.firebaseapp.com",
projectId: "quizmaster-b0faf",
storageBucket: "gs://quizmaster-b0faf.appspot.com",
messagingSenderId: "620399637174",
appId: "1:620399637174:web:11397e200c8fc4c7866c17",
measurementId: "G-6MD1EF1R78"
};

const firebaseApp = initializeApp(firebaseConfig);

// Route to add a question
app.post("/addquestion", async (req, res) => {
const receivedData1 = req.body.data;
console.log("addquestion",receivedData1)
try {
const result = await db.query('SELECT question_id FROM quiz_question WHERE question_id=$1',[receivedData1.questionId]);
if(result.rows.length===0){
console.log(" null")
await db.query("INSERT INTO quiz_question(question_id) VALUES ($1) ",[receivedData1.questionId])
}
await db.query("UPDATE quiz_question SET question = $1, options1 = $2, options2 = $3, options3 = $4, options4 = $5, answer = $6, description = $7, image = $8, quizname = $9 WHERE question_id = $10", [
receivedData1.question,
receivedData1.options[0],
receivedData1.options[1],
receivedData1.options[2],
receivedData1.options[3],
receivedData1.answer,
receivedData1.description,
receivedData1.imgSrc,
receivedData1.quizName,
receivedData1.questionId
]);
res.status(200).send('Data updated successfully');
} catch (err) {
console.error("Error updating question:", err);
res.status(500).json({ error: "Failed to update question" });
}
});

// Route to get all questions
app.get("/getquestion", async (req, res) => {
try {
const result = await db.query('SELECT * FROM quiz_question');
// console.log(result.rows);
res.json(result.rows);
} catch (err) {
console.error('Error getting questions:', err);
res.status(500).json({ error: 'Failed to get questions' });
}
});

app.post("/delete",async(req,res)=>{
console.log("delete",req.body.question_id)
try{
await db.query("DELETE FROM quiz_question WHERE question_id=$1",[req.body.question_id])
res.status(200).send('Data updated successfully');
}catch (err) {
console.error('Error getting questions:', err);
res.status(500).json({ error: 'Failed to get questions' });
}

})

app.post("/addquizname",async(req,res)=>{
console.log("addquizname",req.body.data.name);

await db.query("INSERT INTO quiz_setup(name) VALUES ($1)", [req.body.data.name]);
})

app.post("/addSaveTimer",async(req,res)=>{
const receivedData=req.body
console.log("addSaveTimer",receivedData)
await db.query("UPDATE quiz_setup SET time=$1, date=$2 WHERE name=$3",[receivedData.quizTime,receivedData.quizDate,receivedData.saveTimerquizname])
res.send(req.body)
})
app.get("/getSaveTimer",async(req,res)=>{
  try{
    const result= await db.query("SELECT * FROM quiz_setup");
    console.log("getsavetimer",result.rows);
    res.json(result.rows);
  }catch(e){
    console.log(e)
  }

})

app.post("/delete_quiz_setup",async(req,res)=>{
console.log("deletequizname",req.body)
try{
await db.query("DELETE FROM quiz_setup WHERE name=$1",[req.body.data])
} catch (err) {
console.error('Error getting questions:', err);
res.status(500).json({ error: 'Failed to get questions' });
}
})

app.get("/readtoken", (req, res) => {
const token = req.cookies.token;
if (!token) {
return res.status(401).json({ error: 'No token provided' });
} else {
res.json({ success: true, token: token });
}
});

// Audio file upload and retrieval
//storage in multer

app.post('/upload', upload.single('file'), async (req, res) => {
const file = req.file;
const mediaType=req.body.mediaType;
const questionId=req.body.questionId;
console.log("upload",questionId)
var fileUrl;
if (!file) {
return res.status(400).send('No file uploaded.');
}
try {
// Read the file and convert it to a buffer
const fileBuffer = fs.readFileSync(file.path);
// Firebase storage reference
const storage = getStorage();
if(mediaType==='image'){
console.log("image")
const storageRef = ref(storage, `image/${file.originalname}`);
await uploadBytes(storageRef, fileBuffer);
fileUrl = await getDownloadURL(storageRef);
}
else if(mediaType==='audio'){
console.log("audio")
const storageRef = ref(storage, `audio/${file.originalname}`);
await uploadBytes(storageRef, fileBuffer);
fileUrl = await getDownloadURL(storageRef);
}
else if(mediaType==='video'){
const storageRef = ref(storage, `video/${file.originalname}`);
await uploadBytes(storageRef, fileBuffer);
fileUrl = await getDownloadURL(storageRef);
}
console.log("file",fileUrl)
// Insert file reference into the database
await db.query('INSERT INTO quiz_question(question_id,file_type,file_url) VALUES ($1, $2,$3)', [questionId,mediaType,fileUrl]);
// Clean up the uploaded file
fs.unlinkSync(file.path);
res.status(200).json({ message: 'File uploaded successfully.' });// getting error
//file ko gip me kar ke save kar sakte hai
} catch (err) {
console.error('Error uploading file:', err);
res.status(500).send('Error uploading file.');
}
});

// Auth sections

// bcrypt salt generation
const salt = bcrypt.genSaltSync(10);
app.post("/addpassword", async (req, res) => {
const { email, password } = req.body.data;

if (validator.isEmail(email) && email.endsWith('@iiitdwd.ac.in')) {
try {
const hash = await bcrypt.hash(password, salt);
await db.query("INSERT INTO auth(username, email, password_hash) VALUES ($1, $2, $3)", [
password,
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
try {
const result = await db.query('SELECT password_hash FROM auth WHERE email = $1', [email]);
if (result.rows.length === 0) {
return res.status(404).json({ error: 'User not found' });
}

const hash = result.rows[0].password_hash;
const matchingPassword = await bcrypt.compare(password, hash);

if (matchingPassword) {
  const token = jwt.sign({ email }, secretKey);
  res.cookie("token", token, { httpOnly: true, sameSite: 'Lax' });
  res.json({ success1: true, token });
} else {
  res.status(401).json({ error: "Invalid password" });
}
} catch (err) {
console.error("Error logging in:", err);
res.status(500).json({ error: "Failed to log in" });
}
});

app.post("/logout", (req, res) => {
res.cookie("token", "", { httpOnly: true, sameSite: 'Lax' });
res.send("logout successful postman");
console.log("logout successful");
});

//Block user
app.post("/blockuser",async(req,res)=>{
  try{
  await db.query("INSERT INTO blocked_gmail(gmail) VALUES ($1)", [
    req.body
    ]);
    res.status(200).json({ message: 'Data received successfully' });
    } catch (err) {
    console.error("Error adding password:", err);
    res.status(500).json({ error: "Failed to add password" });
    }
})
app.post("/unblockuser",async(req,res)=>{
  try{
    await db.query("DELETE FROM blocked_gmail WHERE gmail=$1",[req.body.data])
    } catch (err) {
    console.error('Error getting questions:', err);
    res.status(500).json({ error: 'Failed to get questions' });
    }
})
//member
app.get("/membersDetail",async(req,res)=>{
    try {
    const result = await db.query('SELECT * FROM member');
     console.log(result.rows);
    res.json(result.rows);
    } catch (err) {
    console.error('Error getting questions:', err);
    res.status(500).json({ error: 'Failed to get questions' });
    }
})

// Start the server
app.listen(port, () => {
console.log(`Backend is running on http://localhost:${port}`);
});

// Database table creation for reference
// CREATE TABLE quiz_question (
// id serial primary key,
//   question_id INT ,
//   question VARCHAR(400) ,
//   options1 VARCHAR(100) ,
//   options2 VARCHAR(100) ,
//   options3 VARCHAR(100) ,
//   options4 VARCHAR(100) ,
//   answer VARCHAR(100) ,
//   description VARCHAR(400),
//   image TEXT,
//   quizname VARCHAR(40),
//   file_type VARCHAR(255),
//   file_url TEXT
// );


// CREATE TABLE auth(
// id serial primary key,
// username varchar(255),
// email varchar(255),
// password_hash varchar(255)
// );

// CREATE TABLE Quiz_setup(
//   id serial primary key,
//   name varchar(255),
//   time TIME,
//   date DATE
//   );

// CREATE TABLE member(
//   id serial primary key,
// 	image TEXT,
//   name varchar(40),
//   roll/role varchar(40),
//   about varchar(100),
// 	instagram TEXT,
// 	linkedin TEXT,
// 	github TEXT
//   );

// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import pkg from "pg";
// import validator from "validator";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";
// import path from 'path';
// import multer from 'multer';

// const secretKey = "mahesh"; // Using hardcoded secret key use in auth
// var tokenVar; // Will be used in auth
// const {pool}=pkg

// const app = express();
// const port = 5000;
// const API_URL = "http://localhost:8000";

// // Middleware setup
// app.use(cookieParser());
// app.use(express.static("public"));
// app.use(cors({
//   origin: "http://localhost:3000",
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   credentials: true // Allow credentials to be sent
// }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// const upload = multer({ dest: 'uploads/' });
// console.log(upload)

// // Database configuration
// const dbConfig = {
//   user: "postgres",
//   host: "localhost",
//   database: "world",
//   password: "Mahesh@1802",
//   port: 4000,
// };

// // const db = new pg.Client(dbConfig);
// // db.connect()
// //   .then(() => console.log("Connected to the database"))
// //   .catch(err => console.error("Error connecting to database:", err));
//   const db = new Pool({
//     connectionString: 'postgresql://mahesh:i8hW0vNCuZan89BvMbzCAA@droll-egret-5007.7s5.aws-ap-south-1.cockroachlabs.cloud:26257/quiz?sslmode=verify-full',
//     ssl: {
//       ca: fs.readFileSync(path.resolve(__dirname, 'path/to/your/cockroachdb-ca.crt')).toString(),
//     },
//   });
// // Route to get all questions
// app.get("/getquestion", async (req, res) => {
//   try {
//     const result = await db.query('SELECT * FROM quiz');
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error verifying token or getting questions:', err);
//     res.status(500).json({ error: 'Failed to authenticate token or get questions' });
//   }
// });

// // Route to add a question
// app.post("/addquestion", async (req, res) => {
//   const receivedData1 = req.body.data;
//   console.log(receivedData1.description)
//   try {
//     await db.query("INSERT INTO quiz(question, options1, options2, options3, options4, answer, discription, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [
//       receivedData1.question,
//       receivedData1.options[0],
//       receivedData1.options[1],
//       receivedData1.options[2],
//       receivedData1.options[3],
//       receivedData1.answer,
//       receivedData1.description,
//       receivedData1.imgSrc
//     ]);
//     res.status(200).send('Data received successfully');
//   } catch (err) {
//     console.error("Error adding question:", err);
//     res.status(500).json({ error: "Failed to add question" });
//   }
// });

// // Auth sections
// app.post("/logout", (req, res) => {
//   res.cookie("token", "", { httpOnly: true, sameSite: 'Lax' });
//   res.send("logout successful postman");
//   console.log("logout successful");
// });

// app.get("/readtoken", (req, res) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ error: 'No token provided' });
//   } else {
//     res.json({ success: true, token: token });
//   }
// });

// // bcrypt salt generation
// const salt = bcrypt.genSaltSync(10);

// app.post("/addpassword", async (req, res) => {
//   const { email, password } = req.body.data;
//   if (validator.isEmail(email) && email.endsWith('@iiitdwd.ac.in')) {
//     try {
//       const hash = await bcrypt.hash(password, salt);
//       await db.query("INSERT INTO auth(username, email, password_hash) VALUES ($1, $2, $3)", [
//         "mahesh",
//         email,
//         hash,
//       ]);
//       res.status(200).json({ message: 'Data received successfully' });
//     } catch (err) {
//       console.error("Error adding password:", err);
//       res.status(500).json({ error: "Failed to add password" });
//     }
//   } else {
//     console.log("Invalid email");
//     res.status(400).json({ error: "Invalid email format or domain" });
//   }
// });

// app.post("/loginpassword", async (req, res) => {
//   const { email, password } = req.body.data;
//   try {
//     const result = await db.query('SELECT password_hash FROM auth WHERE email = $1', [email]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const hash = result.rows[0].password_hash;
//     const matchingPassword = await bcrypt.compare(password, hash);

//     if (matchingPassword) {
//       const token = jwt.sign({ email }, secretKey);
//       tokenVar = token;
//       res.cookie("token", tokenVar, { httpOnly: true, sameSite: 'Lax' });
//       res.json({ success1: true, token });
//     } else {
//       res.status(401).json({ error: "Invalid password" });
//     }
//   } catch (err) {
//     console.error("Error logging in:", err);
//     res.status(500).json({ error: "Failed to log in" });
//   }
// });

// // Audio file upload and retrieval

// app.post('/upload', upload.single('file'), async (req, res) => {
//   const file = req.file;

//   if (!file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   // Read the file and convert it to a buffer
//   const fileData = fs.readFileSync(file.path);

//   try {
//     // Insert the file data into the database
//     const query = 'INSERT INTO files (file_name, file_data) VALUES ($1, $2)';
//     await pool.query(query, [file.originalname, fileData]);

//     // Clean up the uploaded file
//     fs.unlinkSync(file.path);

//     res.send('File uploaded successfully.');
//   } catch (err) {
//     console.error('Error uploading file:', err);
//     res.status(500).send('Error uploading file.');
//   }
// });

// // app.get('/audio/:id', async (req, res) => {
// //   const fileId = req.params.id;

// //   try {
// //     const result = await db.query('SELECT file_name, file_path FROM audio_files WHERE id = $1', [fileId]);

// //     if (result.rows.length === 0) {
// //       res.status(404).send('File not found');
// //       return;
// //     }

// //     const audioFile = result.rows[0];
// //     res.setHeader('Content-Disposition', `attachment; filename="${audioFile.file_name}"`);
// //     res.setHeader('Content-Type', 'audio/mpeg');
// //     res.sendFile(path.resolve(__dirname, audioFile.file_path));
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send('Error retrieving file');
// //   }
// // });

// // Start the server
// app.listen(port, () => {
//   console.log(`Backend is running on http://localhost:${port}`);
// });

// // Database table creation for reference
// // CREATE TABLE quiz(
// // id serial primary key,
// // question varchar(400),
// // options1 varchar(100),
// // options2 varchar(100),
// // options3 varchar(100),
// // options4 varchar(100),
// // answer varchar(100),
// // discription varchar(400),
// // image varchar(400)
// // );

// CREATE TABLE files (
//   id SERIAL PRIMARY KEY,
//   file_name TEXT NOT NULL,
//   file_url TEXT NOT NULL
// );

// // CREATE TABLE auth(
// // id serial primary key,
// // username varchar(255),
// // email varchar(255),
// // password_hash varchar(255)
// // );
