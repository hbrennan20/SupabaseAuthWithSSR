'use client';

import React, { useState } from 'react';
import { Typography, Container, Box, Grid, Paper } from '@mui/material';
import PitchTools from '../pitch_tagging_tools';

const MatchViewer: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [tags, setTags] = useState<{ x: number; y: number; type?: string }[]>(
    []
  );
  const [selectedTagIndex, setSelectedTagIndex] = useState<number | null>(null);
  const [selectedTagType, setSelectedTagType] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const linkInput = (
      e.currentTarget.elements.namedItem('link') as HTMLInputElement
    ).value;
    const videoId = extractVideoId(linkInput);
    if (videoId) {
      setVideoSrc(
        `https://www.youtube.com/embed/${videoId}?enablejsapi=1&widgetid=1`
      );
    }
  };

  const extractVideoId = (url: string): string | null => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
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
      updatedTags[selectedTagIndex] = {
        ...updatedTags[selectedTagIndex],
        type
      };
      setTags(updatedTags);
    }
  };

  const handleTagTypeSelect = (type: string) => {
    setSelectedTagType(type);
  };

  const selectedTag = selectedTagIndex !== null ? tags[selectedTagIndex] : null;

  return (
    <Container maxWidth="xl">
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Match Viewer
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <input
                  type="text"
                  name="link"
                  className="flex-grow rounded-l-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  style={{ color: 'black', padding: '0.5rem' }}
                  placeholder="Enter YouTube URL"
                  defaultValue="https://www.youtube.com/watch?v=i8PiBNuOR1Y"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white rounded-r-md px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </Box>
            </form>
            {videoSrc && (
              <Box sx={{ position: 'relative', paddingTop: '56.25%', mb: 2 }}>
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                  }}
                  src={videoSrc}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Box>
            )}
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '70%',
                backgroundImage: 'url(/images/football_pitch.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                cursor: 'crosshair'
              }}
              onClick={handlePitchClick}
            >
              {/* Vertical lines */}
              <Box
                sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
              >
                {[10, 25, 45, 55, 75, 90].map((left) => (
                  <Box
                    key={left}
                    sx={{
                      position: 'absolute',
                      height: '100%',
                      width: '2px',
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      left: `${left}%`
                    }}
                  />
                ))}
                {/* Goal areas */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: '30px',
                    height: '80px',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                    top: '50%',
                    left: 0,
                    transform: 'translateY(-50%)'
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    width: '30px',
                    height: '80px',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                    top: '50%',
                    right: 0,
                    transform: 'translateY(-50%)'
                  }}
                />
              </Box>
              {/* Render tags */}
              {tags.map((tag, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'absolute',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor:
                      tag.type === 'Shot'
                        ? 'rgba(0, 0, 255, 0.7)'
                        : tag.type === 'Tackle'
                          ? 'rgba(255, 165, 0, 0.7)'
                          : 'rgba(255, 0, 0, 0.7)',
                    left: `${tag.x}px`,
                    top: `${tag.y}px`,
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    border: '2px solid white'
                  }}
                  onClick={() => handleTagClick(index)}
                />
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <PitchTools
              onClearTags={handleClearTags}
              onUndoTag={handleUndoTag}
              onShot={() => handleTagTypeSelect('Shot')}
              onTackle={() => handleTagTypeSelect('Tackle')}
              onKickout={() => handleTagTypeSelect('Kickout')}
              onTurnover={() => handleTagTypeSelect('Turnover')}
              onTagTypeSelect={handleTagTypeSelect}
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Tag Legend</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {['Shot', 'Pass', 'Tackle', 'Turnover'].map((type) => (
                  <Box
                    key={type}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        backgroundColor:
                          type === 'Shot'
                            ? 'blue'
                            : type === 'Pass'
                              ? 'green'
                              : type === 'Tackle'
                                ? 'orange'
                                : 'red',
                        mr: 1
                      }}
                    />
                    <Typography variant="body2">{type}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Summary Stats
            </Typography>
            <Box
              component="table"
              sx={{ width: '100%', borderCollapse: 'collapse' }}
            >
              <tbody>
                {['Shot', 'Tackle', 'Kickout', 'Turnover'].map((type) => (
                  <Box
                    component="tr"
                    key={type}
                    sx={{
                      '&:not(:last-child)': {
                        borderBottom: '1px solid rgba(224, 224, 224, 1)'
                      }
                    }}
                  >
                    <Box component="td" sx={{ py: 1 }}>
                      Total {type}s
                    </Box>
                    <Box component="td" sx={{ py: 1, textAlign: 'right' }}>
                      {tags.filter((tag) => tag.type === type).length}
                    </Box>
                  </Box>
                ))}
              </tbody>
            </Box>
          </Paper>
          {selectedTag && (
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Selected Tag Type
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {['Shot', 'Pass', 'Tackle', 'Turnover'].map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      handleTagTypeChange(
                        type as 'Shot' | 'Pass' | 'Tackle' | 'Turnover'
                      )
                    }
                    className={`px-3 py-1 rounded ${selectedTag.type === type ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-800'}`}
                  >
                    {type}
                  </button>
                ))}
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MatchViewer;
