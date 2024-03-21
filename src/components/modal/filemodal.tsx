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

export default function FileModal({ IsOpen, setIsOpen, apiData }) {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    const auth = async () => {
      const data = apiData.filter((it) => it.selected == true);
      const payload = data.map((it) => {
        return {
          answered: it?.Response,
          Comment: it?.commentId,
        };
      });

      console.log("Authenticating with YouTube", apiData);
      if (authData) {
        try {
          const response=await authenticateWithYouTube(authData)
          await handleAuthenticationResponse(response);
          const res = await API.post("auto_reply_multi_select", {
            url: "https://www.youtube.com/watch?v=f5YdhPYsk3U",
            model_type: "advanced",
            credential_file: "authentication_response.json",
            reply_list: payload,
          });
        } catch (error) {}
      }
    };

    auth();
  }, [authData]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
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
