import React from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

interface FileInputProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleFileUpload: () => void;
}

const FileInput: React.FC<FileInputProps> = ({ file, setFile, handleFileUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      // Do something with the selected file, such as uploading it
      console.log('Selected file:', selectedFile);
      setFile(selectedFile);
    }
  };

  return (
    <div>
      <Input
        type="file"
        onChange={handleFileChange}
        inputProps={{ accept: '.pdf' }}
        // Specify accepted file types using the 'accept' attribute
      />
      <Button variant="contained" onClick={handleFileUpload} component="label">
        Upload File
      </Button>
    </div>
  );
};

export default FileInput;
