import React from 'react';

// Assuming apiData is an array of objects with a `commentId` property
interface ApiDataItem {
  Answered: number;
  Query: string;
  Replied_Response: number | null; // Assuming the type of Replied_Response is number or null, update as needed
  Response: string;
  commentId: string;
  published_time: string;
  updated_time: string;
  user_name: string;
  selected?: boolean; // Optional property
}

interface HandleCheckboxChangeProps {
  event: React.ChangeEvent<HTMLInputElement>;
  id: string;
}

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
  if (event.target.files) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  }
};

const handleCheckboxChange = (props: HandleCheckboxChangeProps, apiData: ApiDataItem[], setApiData: React.Dispatch<React.SetStateAction<ApiDataItem[]>>) => {
  const { event, id } = props;
  const updatedData = apiData.map((item) =>
    item.commentId === id ? { ...item, selected: event.target.checked } : item
  );
  // Update state or perform other actions with updatedData
  setApiData(updatedData);
  console.log(updatedData);
};

export { handleFileChange, handleCheckboxChange };
