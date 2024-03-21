import { createContext, useContext, useState, ReactNode } from 'react';

// Define the types for your context
interface YoutubeContextType {
  youtubeUrl: string;
  setYoutubeUrl: any;
  dataFileName: string;
  setDataFileName: any;
  tokenFileName: string;
  setTokenFileName: any;
  rowData: any[]; // Change 'any' to the type of your row data if known
  setRowData: any; // Change 'any' to the type of your row data if known
}

// Create the context
const YoutubeContext = createContext<YoutubeContextType | undefined>(undefined);

// Define the context provider component
export const YoutubeContextProvider = ({ children }: { children: ReactNode }) => {
  const [youtubeUrl, setYoutubeUrl] = useState("https://www.youtube.com/watch?v=f5YdhPYsk3U");
  const [dataFileName, setDataFileName] = useState('');
  const [tokenFileName, setTokenFileName] = useState('');
  const [rowData, setRowData] = useState<any[]>([]); // Change 'any' to the type of your row data if known

  return (
    <YoutubeContext.Provider
      value={{
        youtubeUrl,
        setYoutubeUrl,
        dataFileName,
        setDataFileName,
        tokenFileName,
        setTokenFileName,
        rowData,
        setRowData,
      }}
    >
      {children}
    </YoutubeContext.Provider>
  );
};

// Custom hook to use the context
export const useYoutubeContext = (): YoutubeContextType => {
  const context = useContext(YoutubeContext);
  if (!context) {
    throw new Error('useYoutubeContext must be used within a YoutubeContextProvider');
  }
  return context;
};
