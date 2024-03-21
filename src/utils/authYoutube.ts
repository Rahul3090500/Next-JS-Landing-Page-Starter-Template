// import { google } from "googleapis";

const saveJsonToFile = async(data, filename) => {
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  return null
};

export const authenticateWithYouTube = async (credentials) => {
 

  return credentials
};

export const uploadFileToServer = async (file) => {
  const formData = new FormData();
  formData.append('file', file, 'authentication_response.json');

  try {
    const response = await fetch('https://your-server-endpoint.com/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }

    console.log('File uploaded successfully');
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

// Function to handle the authentication response and save it to a JSON file
export const handleAuthenticationResponse = async(response) => {
  console.log('handleAuthenticationResponse')
  await saveJsonToFile(response, 'authentication_response.json');
  console.log('handleAuthenticationResponse')
  await uploadFileToServer(response);
  console.log('handleAuthenticationResponse')
};







