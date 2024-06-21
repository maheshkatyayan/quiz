import express from 'express';
import { db } from '../config/db.js';

const router = express.Router();

let quizName;

router.post('/addquestion', async (req, res) => {
  const receivedData = req.body.data;
  try {
    const result = await db.query('SELECT question_id FROM quiz_question WHERE question_id=$1', [receivedData.questionId]);
    if (result.rows.length === 0) {
      await db.query('INSERT INTO quiz_question(question_id) VALUES ($1)', [receivedData.questionId]);
    }
    await db.query(`UPDATE quiz_question 
      SET question = $1, options1 = $2, options2 = $3, options3 = $4, options4 = $5, answer = $6, description = $7, image = $8, quizname = $9 
      WHERE question_id = $10`, [
      receivedData.question,
      receivedData.options[0],
      receivedData.options[1],
      receivedData.options[2],
      receivedData.options[3],
      receivedData.answer,
      receivedData.description,
      receivedData.imgSrc,
      quizName,
      receivedData.questionId,
    ]);
    res.status(200).send('Data updated successfully');
  } catch (err) {
    console.error('Error updating question:', err);
    res.status(500).json({ error: 'Failed to update question' });
  }
});

router.get('/getquestion', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM quiz_question');
    res.json(result.rows);
  } catch (err) {
    console.error('Error getting questions:', err);
    res.status(500).json({ error: 'Failed to get questions' });
  }
});

router.post('/delete', async (req, res) => {
  try {
    await db.query('DELETE FROM quiz_question WHERE question_id=$1', [req.body.question_id]);
    res.status(200).send('Data deleted successfully');
  } catch (err) {
    console.error('Error deleting question:', err);
    res.status(500).json({ error: 'Failed to delete question' });
  }
});

router.post('/addquizname', async (req, res) => {
  quizName = req.body.data.name;
  try {
    await db.query('INSERT INTO quiz_setup(name) VALUES ($1)', [quizName]);
    res.status(200).send('Quiz name added successfully');
  } catch (err) {
    console.error('Error adding quiz name:', err);
    res.status(500).json({ error: 'Failed to add quiz name' });
  }
});

router.post('/addSaveTimer', async (req, res) => {
  const receivedData = req.body;
  try {
    await db.query('UPDATE quiz_setup SET time=$1, date=$2 WHERE name=$3', [
      receivedData.quizTime,
      receivedData.quizDate,
      receivedData.saveTimerquizname,
    ]);
    res.status(200).send('Timer updated successfully');
  } catch (err) {
    console.error('Error updating timer:', err);
    res.status(500).json({ error: 'Failed to update timer' });
  }
});

router.get('/getSaveTimer', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM quiz_setup');
    res.json(result.rows);
  } catch (err) {
    console.error('Error getting timer:', err);
    res.status(500).json({ error: 'Failed to get timer' });
  }
});

router.post('/delete_quiz_setup', async (req, res) => {
  try {
    await db.query('DELETE FROM quiz_setup WHERE name=$1', [req.body.data]);
    res.status(200).send('Quiz setup deleted successfully');
  } catch (err) {
    console.error('Error deleting quiz setup:', err);
    res.status(500).json({ error: 'Failed to delete quiz setup' });
  }
});

export default router;
