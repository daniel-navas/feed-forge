import express from 'express';
import path from 'path';
import { getRandomImage } from './unsplash';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/api/random-image', async (req, res) => {
  const topics = req.query.topics as string;

  try {
    const images = await getRandomImage(topics);
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching images from Unsplash' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
