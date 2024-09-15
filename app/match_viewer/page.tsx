"use client";

import React, { useState } from 'react';
import { Typography, Container, Box } from '@mui/material';
import PitchTools from "./pitch_tagging_tools";

const MatchViewer: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string>("");
  const [tags, setTags] = useState<{ x: number, y: number, type?: string }[]>([]);
  const [selectedTagIndex, setSelectedTagIndex] = useState<number | null>(null);
  const [selectedTagType, setSelectedTagType] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const linkInput = (e.currentTarget.elements.namedItem('link') as HTMLInputElement).value;
    const videoId = extractVideoId(linkInput);
    if (videoId) {
      setVideoSrc(`https://www.youtube.com/embed/${videoId}?enablejsapi=1&widgetid=1`);
    }
  };

  const extractVideoId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const handlePitchClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const pitch = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - pitch.left;
    const y = e.clientY - pitch.top;
    setTags([...tags, { x, y, type: selectedTagType ?? undefined }]); 
  };

  const handleClearTags = () => {
    setTags([]);  
    setSelectedTagIndex(null);  
  };

  const handleUndoTag = () => {
    setTags(tags.slice(0, -1));  
    setSelectedTagIndex(null);  
  };

  const handleTagClick = (index: number) => {
    setSelectedTagIndex(index);  
  };

  const handleTagTypeChange = (type: string) => {
    if (selectedTagIndex !== null) {
      const updatedTags = [...tags];
      updatedTags[selectedTagIndex] = { ...updatedTags[selectedTagIndex], type };
      setTags(updatedTags);
    }
  };

  const handleTagTypeSelect = (type: string) => {
    setSelectedTagType(type); 
  };

  const selectedTag = selectedTagIndex !== null ? tags[selectedTagIndex] : null;

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Match Viewer
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          View and analyze your matches
        </Typography>
      </Box>
      <div className="bg-[#0D121F] px-[90px] text-white">
        <PitchTools 
          onClearTags={handleClearTags} 
          onUndoTag={handleUndoTag}
          onShot={() => {}}
          onTackle={() => {}}
          onKickout={() => {}}
          onTurnover={() => {}}
          onTagTypeSelect={handleTagTypeSelect} 
        />
        <div className="overflow-x-auto">
          <form onSubmit={handleSubmit}>
            <label className="block">
              <span className="block text-sm font-small text-gray-700">YouTube Link</span>
              <input 
                type="text" 
                name="link" 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                style={{color: 'black'}}
                placeholder="Enter YouTube URL"
                defaultValue="https://www.youtube.com/watch?v=i8PiBNuOR1Y"
              />
            </label>
            <button 
              type="submit" 
              className="mt-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>

          <iframe 
            className="w-full h-[300px] mt-4"
            src={videoSrc} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>

          <div 
            className="relative mt-8 w-full h-[350px] bg-green-400 bg-cover bg-center" 
            style={{ backgroundImage: 'url(/images/football_pitch.png)' }} 
            onClick={handlePitchClick}
          >
            {/* Vertical lines */}
            <div className="absolute inset-0">
              <div className="absolute h-full w-[2px] bg-white" style={{ left: '10%' }}></div>
              <div className="absolute h-full w-[2px] bg-white" style={{ left: '25%' }}></div>
              <div className="absolute h-full w-[2px] bg-white" style={{ left: '45%' }}></div>
              <div className="absolute h-full w-[2px] bg-white" style={{ left: '55%' }}></div>
              <div className="absolute h-full w-[2px] bg-white" style={{ left: '75%' }}></div>
              <div className="absolute h-full w-[2px] bg-white" style={{ left: '90%' }}></div>
              
              <div className="absolute w-[30px] h-[80px] bg-white" style={{ top: '50%', left: '0', transform: 'translateY(-50%)' }}></div>
              <div className="absolute w-[30px] h-[80px] bg-white" style={{ top: '50%', right: '0', transform: 'translateY(-50%)' }}></div>
            </div>

            {/* Render tags */}
            {tags.map((tag, index) => (
              <div 
                key={index}
                className={`absolute w-2 h-2.5 rounded-full ${tag.type === 'Shot' ? 'bg-blue-600' : tag.type === 'Tackle' ? 'bg-orange-500' : 'bg-red-600'}`}
                style={{ left: `${tag.x}px`, top: `${tag.y}px` }}
                onClick={() => handleTagClick(index)}
              ></div>
            ))}
          </div>
          <div className="mt-4 mb-4 flex items-center">
            <div className="flex items-center mr-4">
              <div className="w-4 h-4 rounded-full bg-blue-600 mr-2"></div>
              Shot
            </div>
            <div className="flex items-center mr-4">
              <div className="w-4 h-4 rounded-full bg-green-600 mr-2"></div>
              Pass
            </div>
            <div className="flex items-center mr-4">
              <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
              Tackle
            </div>
            <div className="flex items-center mr-4">
              <div className="w-4 h-4 rounded-full bg-red-600 mr-2"></div>
              Turnover
            </div>
          </div>
          <div className="mt-4">
            <p className="font-semibold">Summary Stats:</p>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Stat</th>
                  <th className="px-4 py-2">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">Total Shots</td>
                  <td className="px-4 py-2">{tags.filter(tag => tag.type === 'Shot').length}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Total Tackles</td>
                  <td className="px-4 py-2">{tags.filter(tag => tag.type === 'Tackle').length}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Total Kickouts</td>
                  <td className="px-4 py-2">{tags.filter(tag => tag.type === 'Kickout').length}</td>
                </tr>              
                <tr>
                  <td className="px-4 py-2">Total Fouls</td>
                  <td className="px-4 py-2">{tags.filter(tag => tag.type === 'Foul').length}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <p className="font-semibold">Tags:</p>
            <ul className="list-disc pl-4">
              {tags.map((tag, index) => (
                <li key={index}>{`(${tag.x}, ${tag.y}) ${tag.type ? `-  ${tag.type}` : ''}`}</li>
              ))}
            </ul>
          </div>

          {selectedTag && (
            <div className="mt-4">
              <p className="font-semibold">Selected Tag Type:</p>
              <div>
                <button 
                  onClick={() => handleTagTypeChange('Shot')} 
                  className={`mr-2 px-4 py-2 text-white rounded ${selectedTag.type === 'Shot' ? 'bg-blue-700' : 'bg-blue-500'}`}
                >
                  Shot
                </button>
                <button 
                  onClick={() => handleTagTypeChange('Pass')} 
                  className={`mr-2 px-4 py-2 text-white rounded ${selectedTag.type === 'Pass' ? 'bg-green-700' : 'bg-green-500'}`}
                >
                  Pass
                </button>
                <button 
                  onClick={() => handleTagTypeChange('Tackle')} 
                  className={`mr-2 px-4 py-2 text-white rounded ${selectedTag.type === 'Tackle' ? 'bg-orange-700' : 'bg-orange-500'}`}
                >
                  Tackle
                </button>
                <button 
                  onClick={() => handleTagTypeChange('Turnover')} 
                  className={`mr-2 px-4 py-2 text-white rounded ${selectedTag.type === 'Turnover' ? 'bg-red-700' : 'bg-red-500'}`}
                >
                  Turnover
                </button>              
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default MatchViewer;
