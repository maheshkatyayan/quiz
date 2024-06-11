import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import pg from "pg"
import validator from "validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";

const app = express();
const port = 1000;
var secretKey="mahesh"
var tokenVar;


app.use(cookieParser())

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
  
  const db = new pg.Client(dbConfig);//one of the difference from my code
  db.connect()
    .then(() => console.log("Connected to the database"))
    .catch(err => console.error("Error connecting to database:", err));

// Route to handle password addition (currently not implemented)


app.get("/",(req,res)=>{
  res.cookie(
"token",tokenVar)
  res.send("hii")
})

app.post("/logout",(req,res)=>{
  res.cookie("token","")
  res.send("logout successful")
  console.log("logout successful")
})

app.get("/read",(req,res)=>{
  const t=req.cookies.token
  console.log(t)
  res.send(`your token is :done ${t}`)
})

//bcrypt
var salt = bcrypt.genSaltSync(10);
//adding password from singin page
app.post("/addpassword", async (req, res) => {
  const receivedData = req.body.data;
  if((receivedData.email.slice(8,32)==='@iiitdwd.ac.in') && validator.isEmail(receivedData.email)){
  try {
    var hash = await bcrypt.hash(receivedData.password,salt);
    const result = await db.query("INSERT INTO auth(username,email,password_hash) VALUES ($1, $2, $3)", [
      "sameera",
      receivedData.email,
      hash,
    ]);
    res.status(200).send('Data received successfully');
  } catch (err) {
    console.error("Error adding question:", err);
    res.status(500).json({ error: "Failed to add question" });
  }
    }else{
      console.log("wrong gmail")
    }
   


// app.post("/addpassword", async (req, res) => {
//   const receivedData = req.body.data;
//   if (validator.isEmail(receivedData.email) && receivedData.email.endsWith('@iiitdwd.ac.in')){
//   try {
//     var hash = await bcrypt.hash(receivedData.password,salt);
//     const result = await db.query("INSERT INTO auth(username,email,password_hash) VALUES ($1, $2, $3)", [
//       "mahesh765",
//       receivedData.email,
//       hash,
//     ]);
//     res.status(200).send('Data received successfully');
//   } catch (err) {
//     console.error("Error adding question:", err);
//     res.status(500).json({ error: "Failed to add question" });
//   }
//     }else {
//       console.log("Invalid email");
//       res.status(400).json({ error: "Invalid email format or domain" });
//     }
   
  // Add your password handling logic here
});

app.post("/loginpassword",async (req,res)=>{
  const receivedData = req.body.data;
  console.log(receivedData)
  const { email, password } = receivedData;
    console.log(receivedData,email,password);
    // Use a parameterized query to prevent SQL injection
    const hash = await db.query('SELECT password_hash FROM auth WHERE email = $1', [receivedData.email]);
    const matchingPassword= bcrypt.compareSync(receivedData.password,hash.rows[0].password_hash);
    if(matchingPassword){
      const token = jwt.sign({ email }, secretKey,{ expiresIn: '300s' }); // Use email in token payload
      tokenVar = token
      console.log(tokenVar)
      res.cookie("token", tokenVar, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax'
      });
      //when I am sending cookies iin this post request it i not working but it is workin when i am making req from postman

     res.send("haa tera data mila muje")
    }
    
    if (hash.rows.length === 0) {
      console.log("false")
      return res.status(404).json({ error: 'User not found' });
  }
})

app.post("/hi",(req,res)=>{
  const receivedData1=req.body.name
  console.log(receivedData1)
  res.send("hi")
})


app.listen(port, () => {
  console.log(`auth.js API is running at http://localhost:${port}`);
});

// create table auth(
//   id serial primary key,
//     username VARCHAR(255) UNIQUE NOT NULL,
//     email VARCHAR(255) NOT NULL,
//       password_hash BYTEA NOT NULL
//   );