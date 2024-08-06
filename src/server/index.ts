import express from 'express';
import { getRandomImage } from './unsplash';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Welcome to the Feed Forge API');
});

app.get('/api/random-image', async (req, res) => {
  const topics = req.query.topics as string;

  try {
    const images = await getRandomImage(topics);
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching images from Unsplash' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
