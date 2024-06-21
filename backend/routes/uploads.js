import express from 'express';
import fs from 'fs';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase.js';

const router = express.Router();

router.post('/upload', async (req, res) => {
  const file = req.file;
  const fileName = file.originalname;
  const fileRef = ref(storage, fileName);
  const metadata = {
    contentType: file.mimetype,
  };

  fs.readFile(file.path, async (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).json({ error: 'Failed to read file' });
      return;
    }

    try {
      await uploadBytes(fileRef, data, metadata);
      const downloadURL = await getDownloadURL(fileRef);
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });
      res.status(200).json({ url: downloadURL });
    } catch (err) {
      console.error('Error uploading file:', err);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  });
});

router.get('/getimage/:imageName', async (req, res) => {
  const { imageName } = req.params;
  try {
    const imageRef = ref(storage, imageName);
    const downloadURL = await getDownloadURL(imageRef);
    res.json({ url: downloadURL });
  } catch (err) {
    console.error('Error retrieving image:', err);
    res.status(500).json({ error: 'Failed to retrieve image' });
  }
});

export default router;
