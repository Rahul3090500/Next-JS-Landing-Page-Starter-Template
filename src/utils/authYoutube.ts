// import { google } from "googleapis";

import API from "./api.config";

// const saveJsonToFile = async(data:any, filename:any) => {
//   const json = JSON.stringify(data);
//   const blob = new Blob([json], { type: 'application/json' });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = filename;
//   document.body.appendChild(a);
//   a.click();
//   window.URL.revokeObjectURL(url);
//   return null
// };

export const authenticateWithYouTube = async (credentials:any) => {
 

  return credentials
};

export const uploadFileToServer = async (file:any,youtubeUrl:any) => {
  const jsonData = JSON.stringify(file);

    // Create Blob object from JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create FormData object
    const formData = new FormData();
    formData.append('file', blob, 'authentication_response.json');
  

  try {
    const response = await API.post('upload_file', {
      url: youtubeUrl,
      filename: formData,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    console.log('response', response)

  } catch (error) {
    console.error('Error uploading file:', error);
  }

  return null
};

// Function to handle the authentication response and save it to a JSON file
export const handleAuthenticationResponse = async(response:any,youtubeUrl:any) => {
  console.log('handleAuthenticationResponse') 
  await uploadFileToServer(response,youtubeUrl);
  
};







