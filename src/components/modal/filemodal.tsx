import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

import { useYoutubeContext } from "@/hooks/urlcontext";
import axios from "axios";
export default function FileModal({ IsOpen, setIsOpen }) {
  const { rowData,youtubeUrl,setCredentails,Credentails} = useYoutubeContext();

 
  useEffect(() => {
    const auth = async () => {
      const data = rowData.filter((it) => it.selected == true);
    const payload = data.map((it) => {
      return {
        answer: it?.Response,
        commentId: it?.commentId,
      };
    });
     

      
      if (rowData.length > 0 && Credentails?.client_secret) {
        try {
         // await axios.post("/api/get-auth-url",{...authData}).then((response) => {console.log(response);}).catch((error) => {console.log(error);})
          const response = await axios.post('/api/get-auth-url', {
            client_id: Credentails?.client_id,
            client_secret: Credentails?.client_secret,
            redirect_uris: ['http://localhost:3000/'], // Update with your redirect URIs
          });
          localStorage.setItem('data',JSON.stringify({
            payload:payload,
            client_id: Credentails?.client_id,
            client_secret: Credentails?.client_secret,
            redirect_uris: ['http://localhost:3000/'],
            youtubeUrl:youtubeUrl


          }));
          const authUrl = response.data.authUrl;
      
          // Redirect the user to the authentication URL
          window.location.href = authUrl;
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    };

    auth();
  }, [Credentails]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        console.log(jsonData);
        setCredentails(jsonData?.installed);
        
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      <Modal isOpen={IsOpen}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Upload Your Credentails File
            </ModalHeader>
            <ModalBody>
              <input type="file" onChange={handleFileUpload} />
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
                onPress={() => setIsOpen(false)}
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
