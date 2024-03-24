import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useYoutubeContext } from "@/hooks/urlcontext";
import API from "@/utils/api.config";
export default function FileInputModal({ IsOpen, setIsOpen }) {
  const {setRowData,setDataFileName,youtubeUrl,dataFileName}=useYoutubeContext()

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setDataFileName(e.target.files[0]?.name);
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('filename', file);

    try {
        const response = await fetch('http://20.244.47.51:8080/v1/upload_file?url=https://www.youtube.com/watch?v=f5YdhPYsk3U' , {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log('File uploaded successfully');
            // Handle success
        } else {
            console.error('File upload failed');
            // Handle failure
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        // Handle error
    }

      
  };

  const handleFileSubmit = async () => {
    try {
      if(dataFileName){
      
      

    
      const response = await API.post(`query_answer`,
        {
          "url":youtubeUrl,
          "pdf_file": dataFileName,
          "model_type": "advanced"
        }
        
      );
      let res=response.data
      res = res.replace(/NaN/g, "0");
      const data=JSON.parse(res)
      setRowData(data)
      
    }} catch (error) {
      console.error("Error uploading file:", error);
    } finally{
      setIsOpen(false)
    }
  
  };

  return (
    <>
      <Modal isOpen={IsOpen}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Upload Your File 
            </ModalHeader>
            <ModalBody>
              <input type="file"  onChange={handleFileChange} />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="light"
                onPress={handleFileSubmit}
              >
                Upload File
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
