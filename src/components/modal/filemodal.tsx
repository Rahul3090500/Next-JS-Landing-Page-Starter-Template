import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import {
  authenticateWithYouTube,
  handleAuthenticationResponse,
} from "@/utils/authYoutube";
import API from "@/utils/api.config";
import { useYoutubeContext } from "@/hooks/urlcontext";

export default function FileModal({ IsOpen, setIsOpen }:any) {
  const { rowData,youtubeUrl} = useYoutubeContext();
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    const auth = async () => {
      const data = rowData.filter((it) => it.selected == true);
      const payload = data.map((it) => {
        return {
          answer: it?.Response,
          commentId: it?.commentId,
        };
      });

      
      if (rowData.length > 0) {
        try {
          const response=await authenticateWithYouTube(authData)
          await handleAuthenticationResponse(response,youtubeUrl);
          const res = await API.post("auto_reply_multi_select", {
            url: youtubeUrl,
            model_type: "advanced",
            credential_file: "authentication_response.json",
            reply_list: payload,
          });
          console.log('res',res )
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    };

    auth();
  }, [authData]);

  const handleFileUpload = (event:any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event:any) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        console.log(jsonData);
        setAuthData(jsonData?.installed);
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
