import React from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import axios from "axios";
import API from "@/utils/api.config";

interface FileInputProps {
  setSelectedFile: any;
}

const FileInput: React.FC<FileInputProps> = ({
  setSelectedFile
}) => {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const file = event.target.files[0];
      // Do something with the selected file, such as uploading it
      const formData = new FormData();
      formData.append("file", file);
      setSelectedFile(file?.name) // Append the file to the FormData object

      // Make a POST request to your API endpoint
      try {
        const response = await API.post(
          "upload_file",
          {
            "url": "https://www.youtube.com/watch?v=f5YdhPYsk3U",
            "filename": formData
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.ok) {
          // File uploaded successfully
          console.log("File uploaded successfully!");
        } else {
          // Handle HTTP error
          console.error("Failed to upload file. Status:", response.status);
        }
      } catch (error) {
        // Handle network error
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div>
      <Input
        type="file"
        onChange={handleFileChange}
        inputProps={{ accept: ".pdf" }}
        // Specify accepted file types using the 'accept' attribute
      />
      
    </div>
  );
};

export default FileInput;
