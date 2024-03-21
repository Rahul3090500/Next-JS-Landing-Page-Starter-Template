import { Button } from '@nextui-org/react';
import React from 'react';

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
    <Button
    isLoading={isLoading}
      onClick={onSubmit}
      disabled={isLoading} 
      className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      color="secondary"
      spinner={
        <svg
          className="animate-spin h-5 w-5 text-current"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"
          />
        </svg>
      }
    >
      {buttonText}
    </Button>
  );
};

export default SubmitButton;
