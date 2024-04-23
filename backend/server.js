import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors"

const app = express();
const port = 8000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Mahesh@1802",
  port: 4000,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({
  origin:"http://localhost:3000",
  methods:["GET","POST"]
}))
// GET home page
const question=[]
app.get("/", async (req, res) => {
    try{
        const result = await db.query("SELECT question FROM quiz ");
        // result.rows.forEach((i) => {
        //   question.push(i.question)
        //   console.log(i.question)
        // });
    }catch(err){
        console.log(err)
    }
    // console.log(question[0])

});
db.end()

app.post('/added', async (req, res) => {
  const receivedData1 = req.body.data;
  console.log('Received data1:', receivedData1);
  // Process the received data as needed
  // Send back a response
  res.status(200).send('Data received successfully1');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});