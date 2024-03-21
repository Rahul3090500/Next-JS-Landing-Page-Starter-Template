import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
interface SubmitButtonProps {
  isLoading: boolean;
  onSubmit: () => void; // The function to call when the button is clicked
  buttonText?: string; // Optional prop to allow custom button text
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  onSubmit,
  buttonText = 'Submit', // Default button text is 'Submit'
}) => {
  return (
    <Box display="flex" justifyContent="right" ml={2}>

    <Button
 variant="contained"
 color="secondary"
 onClick={onSubmit}
 disabled={isLoading}
 startIcon={isLoading && <CircularProgress size={24} color="inherit" />}
 sx={{
  backgroundColor: '#1977d3 !important', 
  color: '#fff',
  '&:hover': {
    backgroundColor: '#ff0000 !important', // Darken button on hover
  },
  '&:disabled': {
    backgroundColor: 'action.disabled', // Style for disabled state
    boxShadow: 'none',
  },
}}
    >
      {buttonText}
    </Button>
    </Box>

  );
};

export default SubmitButton;
