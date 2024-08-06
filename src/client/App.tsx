import React, { useState } from 'react';
import FeedSection from './Menu';
import PhotoFeed from './Feed';
import './App.css';

interface Preset {
  name: string;
  topics: string[];
}

const App: React.FC = () => {
  const [presets, setPresets] = useState<Preset[]>([{ name: 'Default', topics: [] }]);
  const [selectedPreset, setSelectedPreset] = useState<string>('Default');

  const addPreset = (presetName: string) => {
    setPresets([...presets, { name: presetName, topics: [] }]);
  };

  const selectPreset = (presetName: string) => {
    setSelectedPreset(presetName);
  };

  const addTopicToPreset = (presetName: string, topicId: string) => {
    setPresets((prevPresets) =>
      prevPresets.map((preset) => {
        if (preset.name === presetName) {
          const newTopics = [...preset.topics, topicId];
          if (newTopics.length > 5) {
            newTopics.shift();
          }
          return { ...preset, topics: newTopics };
        }
        return preset;
      })
    );
  };

  return (
    <div className="app-container">
      <FeedSection 
        presets={presets} 
        addPreset={addPreset} 
        selectPreset={selectPreset} 
        selectedPreset={selectedPreset} 
      />
      <PhotoFeed 
        selectedPreset={selectedPreset} 
        presets={presets} 
        addTopicToPreset={addTopicToPreset} 
      />
    </div>
  );
};

export default App;
