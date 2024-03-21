import React, { useState } from 'react';
import { TextField, FormControl, FormHelperText } from '@mui/material';

interface YTURLInputProps {
  onChange:any;
  onClear: () => void;
}

const YTURLInput: React.FC<YTURLInputProps> = ({ onChange, onClear }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    // Simple YouTube URL validation
    const isValid = newValue.match(/^(https?:\/\/)?(www\.)?(youtube.com|youtu.be)\/.+$/);
    setError(!isValid);
    if (isValid) onChange(event);
  };

  const handleClear = () => {
    setValue('');
    setError(false);
    onClear();
  };

  return (
    <FormControl variant="outlined" fullWidth error={error}>
      <TextField
        label="YouTube URL"
        placeholder="Paste YouTube video URL here"
        value={value}
        onChange={handleChange}
        fullWidth
        error={error}
        variant="outlined"
        InputProps={{
          endAdornment: value && (
            <button onClick={handleClear} style={{ cursor: 'pointer', border: 'none', background: 'none', color: 'rgba(0, 0, 0, 0.54)' }}>
              Clear
            </button>
          ),
        }}
        // Additional styling for hover effect and shadow
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)', // default
            },
            '&:hover fieldset': {
              borderColor: 'primary.main', // hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main', // focused
            },
          },
        }}
      />
      {error && <FormHelperText>Please enter a valid YouTube URL.</FormHelperText>}
    </FormControl>
  );
};

export default YTURLInput;
