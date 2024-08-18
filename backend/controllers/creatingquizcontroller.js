import db from "../config.js";
import multer from "multer";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwQcCNFhv2pjZctwh0mmO4lcTFN6sDHrc",
  authDomain: "quizmaster-b0faf.firebaseapp.com",
  projectId: "quizmaster-b0faf",
  storageBucket: "quizmaster-b0faf.appspot.com", // Correctly formatted
  messagingSenderId: "620399637174",
  appId: "1:620399637174:web:11397e200c8fc4c7866c17",
  measurementId: "G-6MD1EF1R78",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(firebaseApp);

// Multer setup
 const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use original file name
  }
}); // Store files in memory
const upload = multer({ storage });

// Express route handler
export const uploadMediaQuestion = upload.single('file', async (req, res) => {
  const file = req.file;
  const mediaType = req.body.mediaType;
  const questionId = req.body.questionId;
console.log(mediaType,questionId,file)
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    // Read the file and convert it to a buffer
    const fileBuffer = fs.readFileSync(file.path);
    const storage = getStorage();

    let storageRef;
    if (mediaType === 'image') {
      storageRef = ref(storage, `images/${file.originalname}`);
    } else if (mediaType === 'audio') {
      storageRef = ref(storage, `audio/${file.originalname}`);
    } else if (mediaType === 'video') {
      storageRef = ref(storage, `videos/${file.originalname}`);
    } else {
      return res.status(400).send("Invalid media type.");
    }

    await uploadBytes(storageRef, fileBuffer);
    const fileUrl = await getDownloadURL(storageRef);

    // Insert file reference into the database
    await db.query(
      "INSERT INTO quiz_question(question_id, file_type, file_url) VALUES ($1, $2, $3)",
      [questionId, mediaType, fileUrl]
    );

    // Clean up the uploaded file
    fs.unlinkSync(file.path);

    res.status(200).json({ message: "File uploaded successfully." });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).send("Error uploading file.");
  }
});

export const addquestion_to_quiz = async (req, res) => {
  const {
    questionId,
    question,
    options,
    answer,
    description,
    imgSrc,
    quizName,
  } = req.body;
  console.log(question);
  try {
    // Check if the question already exists in the quiz
    const result = await db.query(
      "SELECT question_id FROM quiz_question WHERE question_id = $1",
      [questionId]
    );

    if (result.rows.length === 0) {
      // If the question doesn't exist, insert it
      await db.query("INSERT INTO quiz_question (question_id) VALUES ($1)", [
        questionId,
      ]);
    }

    // Update or insert the question details
    await db.query(
      `UPDATE quiz_question 
       SET question = $1, options1 = $2, options2 = $3, options3 = $4, options4 = $5, answer = $6, description = $7, image = $8, quizname = $9 
       WHERE question_id = $10`,
      [
        question,
        options[0],
        options[1],
        options[2],
        options[3],
        answer,
        description,
        imgSrc,
        quizName,
        questionId,
      ]
    );

    res.status(200).send("Data updated successfully");
  } catch (err) {
    console.error("Error updating question:", err);
    res.status(500).json({ error: "Failed to update question" });
  }
};

export const uploadmediaquestion = async (req, res) => {
  const file = req.file;
  const mediaType = req.body.mediaType;
  const questionId = req.body.questionId;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    // Create a reference to the storage location
    let storageRef;
    if (mediaType === 'image') {
      storageRef = ref(firebaseStorage, `images/${file.originalname}`);
    } else if (mediaType === 'audio') {
      storageRef = ref(firebaseStorage, `audio/${file.originalname}`);
    } else if (mediaType === 'video') {
      storageRef = ref(firebaseStorage, `videos/${file.originalname}`);
    } else {
      return res.status(400).send("Invalid media type.");
    }

    // Upload the file to Firebase Storage
    await uploadBytes(storageRef, file.buffer);
    const fileUrl = await getDownloadURL(storageRef);

    // Insert file reference into the database
    await db.query(
      "INSERT INTO quiz_question(question_id, file_type, file_url) VALUES ($1, $2, $3)",
      [questionId, mediaType, fileUrl]
    );

    res.status(200).json({ message: "File uploaded successfully." });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).send("Error uploading file.");
  }
};


  export const getquestion = async (req, res) => {
    //console.log(quizName)
  try {
  const result = await db.query('SELECT * FROM quiz_question');
   //console.log(result.rows);
  res.json(result.rows);
  //res.status(200).send('Data updated successfully');
  } catch (err) {
  console.error('Error getting questions:', err);
  res.status(500).json({ error: 'Failed to get questions' });
  }
  };

  export const deletequestion=async(req,res)=>{
    //console.log("delete",req.body.question_id)
    try{
    await db.query("DELETE FROM quiz_question WHERE question_id=$1",[req.body.question_id])
    res.status(200).send('question deleted successfully');
    }catch (err) {
    console.error('Error delete questions:', err);
    res.status(500).json({ error: 'Failed to get delete' });
    }
    }
