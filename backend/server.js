import express from 'express'; // Importing the Express framework to create a web server
import { createServer } from 'http'; // Importing the HTTP module to create an HTTP server
import { Server } from 'socket.io'; // Importing the Server class from Socket.IO for real-time communication
import cors from 'cors'; // Importing CORS middleware to handle Cross-Origin Resource Sharing
import bodyParser from 'body-parser'; // Importing body-parser middleware to parse incoming request bodies
import EventEmitter from 'events'; // Importing the events module to create an event emitter

// Creating an instance of EventEmitter
const eventemiter = new EventEmitter(); // EventEmitter allows us to create, emit, and listen to custom events
var receiveddata = null; // Variable to store data received from 'start' event

const app = express(); // Creating an Express application
const server = createServer(app); // Creating an HTTP server using the Express app
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allowing CORS for the specified origin (frontend)
    methods: ["GET", "POST"] // Allowing only GET and POST methods for CORS
  }
});

// Applying middleware to the Express app
app.use(cors({
  origin: "http://localhost:3000", // Allowing CORS for the specified origin (frontend)
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"] // Allowing various HTTP methods for CORS
}));

app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Defining a GET route at '/' which sends a simple response
app.get('/', (req, res) => {
  res.send("hello"); // Responding with a simple "hello" message
});

// Defining a POST route at '/sendmessage'
app.post('/sendmessage', (req, res) => {
  const { message } = req.body; // Extracting the message from the request body
  console.log("Received message:", message); // Logging the received message
  io.emit('receive_message', message); // Emitting 'receive_message' event to all connected clients
  res.status(200).send({ success: true }); // Sending a success response to the client
});

// Listening for socket connections
io.on('connection', (socket) => {
  console.log('a user connected', socket.id); // Logging when a user connects with their socket ID

  // Listening for 'send_message' event from the client
  socket.on('send_message', (data) => {
    console.log("socket listening to:", data, socket.id); // Logging the received data and socket ID
    // io.emit('receive_message', data, socket.id); // (Commented out) Broadcast the message to all clients
  });

  // Listening for 'start' event from the client
  socket.on('Set', (data) => {
    receiveddata = data; // Storing received data in the wider scope variable
    eventemiter.emit('newData', data); // Emitting 'newData' event with the received data
    console.log(`i got ${data}`); // Logging the received data
    io.emit('permission',data)
  });

socket.on('send_name',(data)=>{
console.log('send_name: ',data)
})

  console.log("newdata", receiveddata); // Logging the received data stored in the wider scope variable

  // Listening for the disconnect event
  socket.on('disconnect', () => {
    console.log('user disconnected'); // Logging when a user disconnects
  });
});

// Starting the server on port 8000
server.listen(8000, () => {
  console.log('server running at http://localhost:8000'); // Logging that the server is running
});
