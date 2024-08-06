import React, { useEffect, useState } from 'react';
import axios from 'axios';
import topics from './topics';

interface UnsplashImage {
  urls: {
    regular: string;
  };
  topic_submissions: {
    [key: string]: { status: string };
  };
  topics_list: string[];
}

interface PhotoFeedProps {
  selectedPreset: string;
  presets: { name: string; topics: string[] }[];
  addTopicToPreset: (presetName: string, topicId: string) => void;
}

const getRandomTopic = () => {
  const randomIndex = Math.floor(Math.random() * topics.length);
  return topics[randomIndex];
};

const getRandomTopics = (count: number): string[] => {
  const shuffled = topics.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((topic) => topic.id);
};

const getTopicsForPreset = (presetTopics: string[]): string[] => {
  if (presetTopics.length === 0) {
    return getRandomTopics(5);
  }
  let topicsToUse = [...presetTopics];
  topicsToUse.push(getRandomTopic().id);
  return topicsToUse;
};

const PhotoFeed: React.FC<PhotoFeedProps> = ({ selectedPreset, presets, addTopicToPreset }) => {
  const [photos, setPhotos] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const useStaticImages = false;

  const fallbackImages = [
    { urls: { regular: 'https://plus.unsplash.com/premium_photo-1721830498757-ebc68f215580' }, topic_submissions: {}, topics_list: ['Fallback Topic 1'] },
    { urls: { regular: 'https://plus.unsplash.com/premium_photo-1721830498757-ebc68f215580' }, topic_submissions: {}, topics_list: ['Fallback Topic 2'] },
  ];

  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);

    if (useStaticImages) {
      setPhotos(fallbackImages);
      setLoading(false);
      return;
    }

    try {
      const preset = presets.find((p) => p.name === selectedPreset);
      const presetTopics = preset?.topics || [];
      let topicsToUse = getTopicsForPreset(presetTopics);
      const topicsParam = topicsToUse.join(',');
      const url = `https://feed-forge-aa8df5951922.herokuapp.com//api/random-image?count=10&topics=${topicsParam}`;
      const response = await axios.get(url);

      if (Array.isArray(response.data)) {
        const fetchedPhotos = response.data.map((photo: any) => {
          const topicSubmissionKeys = Object.keys(photo.topic_submissions).filter(
            (key) => topics.some((topic) => topic.slug === key) && photo.topic_submissions[key].status === 'approved'
          );
          const topicsList = topicSubmissionKeys.map((key) => topics.find((t) => t.slug === key)?.slug || 'Unknown');
          return {
            ...photo,
            topics_list: topicsList,
          };
        });

        setPhotos((prevPhotos) => [...prevPhotos, ...fetchedPhotos]);
      } else {
        setError('Unexpected response format');
        setPhotos(fallbackImages);
      }
    } catch (error) {
      console.error('Error fetching images from Unsplash:', error);
      setError('Error fetching the images, using fallback images');
      setPhotos(fallbackImages);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (topicSubmissions: { [key: string]: any }) => {
    const likedTopics = Object.keys(topicSubmissions).filter(
      (key) => topics.some((topic) => topic.slug === key) && topicSubmissions[key].status === 'approved'
    );
    likedTopics.forEach((topic) => {
      const topicObject = topics.find((t) => t.slug === topic);
      if (topicObject) {
        addTopicToPreset(selectedPreset, topicObject.id);
      }
    });
  };

  useEffect(() => {
    setPhotos([]);
    fetchPhotos();
  }, [selectedPreset]);

  return (
    <div className="photo-feed">
      {photos.map((photo, index) => (
        <div key={index} className="photo-item">
          <img src={photo.urls.regular} alt={`Photo ${index + 1}`} />
          <div className="photo-details">
            <button className="like-button" onClick={() => handleLike(photo.topic_submissions)}>❤️ Like</button>
            <div className="topics-list">
              {photo.topics_list.map((topic, idx) => (
                <p key={idx}>{topic}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <button onClick={fetchPhotos} disabled={loading}>
        Load More Photos
      </button>
    </div>
  );
};

export default PhotoFeed;
