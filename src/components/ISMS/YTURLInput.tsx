import React, { useState } from 'react';
import { TextField, FormControl, FormHelperText, Input } from '@mui/material';

interface YTURLInputProps {
  onChange:any;
  onClear: () => void;
  youtubeUrl: string;
}

const YTURLInput: React.FC<YTURLInputProps> = ({ onChange, onClear,youtubeUrl }) => {
  return (
    <Input
      label="YouTube URL"
      value={youtubeUrl}
      placeholder="Paste YouTube video URL here"
      onChange={onChange}
      onClear={onClear}
      width="100%"
      aria-label="YouTube URL"
      className="w-full p-3 text-base text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  );
};

export default YTURLInput;
