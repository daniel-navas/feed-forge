import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const UNSPLASH_ACCESS_KEY = "bSsN2iYawUe7KaIazV1tpa8WxGZO3p3QxpaLqC6raeE";

const getRandomImage = async (topics: string) => {
  const url = `https://api.unsplash.com/photos/random?count=10&topics=${topics}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
    throw error;
  }
};

export { getRandomImage };
