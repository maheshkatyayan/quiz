import express from 'express';
import { uploadMediaQuestion,getquestion,deletequestion } from '../controllers/creatingquizcontroller.js';
import {authenticate_user} from '../middlewares/authMiddleware.js'

const router = express.Router();


router.post("/uploadMediaQuestion",uploadMediaQuestion);
router.get("/getquestion",getquestion);
router.post("/deletequestion",deletequestion)//use router.delete

export default router;
