import { Input } from '@nextui-org/react';
import React from 'react';

interface YTURLInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

const YTURLInput: React.FC<YTURLInputProps> = ({ onChange, onClear }) => {
  return (
    <Input
      label="YouTube URL"
      placeholder="Paste YouTube video URL here"
      onChange={onChange}
      onClear={onClear}
      width="100%"
      aria-label="YouTube URL"
    />
  );
};

export default YTURLInput;
