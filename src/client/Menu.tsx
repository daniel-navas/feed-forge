import React, { useState } from 'react';
import topics from './topics';

interface FeedSectionProps {
  presets: { name: string; topics: string[] }[];
  addPreset: (preset: string) => void;
  selectPreset: (preset: string) => void;
  selectedPreset: string;
}

const FeedSection: React.FC<FeedSectionProps> = ({ presets, addPreset, selectPreset, selectedPreset }) => {
  const [newPreset, setNewPreset] = useState('');

  const handleAddPreset = () => {
    if (newPreset.trim() !== '') {
      addPreset(newPreset.trim());
      setNewPreset('');
    }
  };

  const getTopicSlug = (id: string) => {
    const topic = topics.find((topic) => topic.id === id);
    return topic ? topic.slug : id;
  };

  return (
    <div className="feed-section">
      <h2>Instagram</h2>
      <div className="preset-dropdown">
        <select id="preset-select" onChange={(e) => selectPreset(e.target.value)}>
          {presets.map((preset, index) => (
            <option key={index} value={preset.name}>{preset.name}</option>
          ))}
        </select>
      </div>
      <div className="new-preset">
        <input 
          type="text" 
          value={newPreset} 
          onChange={(e) => setNewPreset(e.target.value)} 
          placeholder="New preset name" 
        />
        <button onClick={handleAddPreset}>Add</button>
      </div>
      <div className="preset-list">
        {presets.find((preset) => preset.name === selectedPreset)?.topics.map((topic, idx) => (
          <li key={idx} className="topic-item">{getTopicSlug(topic)}</li>
        ))}
      </div>
    </div>
  );
};

export default FeedSection;
