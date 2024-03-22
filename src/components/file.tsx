import React from "react";
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
export default function FileInputModal({ IsOpen, setIsOpen }:any) {
  const {setRowData,setDataFileName,youtubeUrl,dataFileName}=useYoutubeContext()

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const file:any = event.target.files[0];
      // Do something with the selected file, such as uploading it
      const formData = new FormData();
      formData.append("file", file);
      setDataFileName(file?.name)
      // Make a POST request to your API endpoint
      try {
        const response:any = await API.post(
          "upload_file",
          {
            url: youtubeUrl,
            filename: formData,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log('response',response )
        
        setDataFileName(file?.name)

        
      } catch (error) {
        // Handle network error
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleFileSubmit = async () => {
    try {
      if(dataFileName){
      
      

      setRowData([{
        Answered: 1,
        Query: "Difference between positive and negative sentiments ?",
        Replied_Response: NaN,
        Response:
          "Hello! The difference between positive and negative sentiments is the overall tone and emotion expressed in the comments. Positive sentiments are favorable, while negative sentiments are unfavorable. \n",
        commentId: "UgyCFev6W64FhwYubh94AaABAg",
        published_time: "2024-03-02 09:42:00",
        updated_time: "2024-03-02 09:42:00",
        user_name: "@SuccessIsAJourneyNotADes-dd5oz",
      },
      {
        Answered: 0,
        Query: "How many type of sentiments we are analyzing ?",
        Replied_Response: NaN,
        Response:
          "Hello! We are analyzing four types of sentiments: positive, negative, neutral, and unknown. This is based on sentiment analysis of YouTube video comments using ChatGPT technique.",
        commentId: "Ugz6t_R0PIPl4eU4y2R4AaABAg",
        published_time: "2024-03-02 09:36:44",
        updated_time: "2024-03-02 09:36:44",
        user_name: "@SuccessIsAJourneyNotADes-dd5oz",
      },
      {
        Answered: 0,
        Query: "How many type of sentiments we are analyzing ?",
        Replied_Response: NaN,
        Response:
          "Hello! We are analyzing four types of sentiments: positive, negative, neutral, and unknown. This is based on sentiment analysis of YouTube video comments using ChatGPT.",
        commentId: "UgwYLe68xwdll5h_Ky14AaABAg",
        published_time: "2024-03-02 09:13:48",
        updated_time: "2024-03-02 09:13:48",
        user_name: "@SuccessIsAJourneyNotADes-dd5oz",
      },
      {
        Answered: 0,
        Query: "Any other application is there in pipeline ?",
        Replied_Response: NaN,
        Response:
          "Yes, we plan to expand to other social media platforms in the future.",
        commentId: "Ugz0iM-8eyanbX4kxgh4AaABAg",
        published_time: "2024-02-28 12:12:04",
        updated_time: "2024-02-28 12:12:04",
        user_name: "@SuccessIsAJourneyNotADes-dd5oz",
      },
      {
        Answered: 0,
        Query: "Which version of chatgpt is best?",
        Replied_Response: NaN,
        Response:
          "Hello! The best version of ChatGPT for sentiment analysis of YouTube video comments is the latest version. It helps analyze positive, negative, neutral, or unknown sentiments accurately. \n",
        commentId: "UgwqhyHJHQgK67k2XqV4AaABAg",
        published_time: "2024-02-28 07:09:24",
        updated_time: "2024-02-28 07:09:24",
        user_name: "@SuccessIsAJourneyNotADes-dd5oz",
      },
      {
        Answered: 0,
        Query: "Is this model is using Langchain in your implementation",
        Replied_Response: NaN,
        Response:
          "Hello! No, the model is not using Langchain in the implementation. It uses Chatgpt for sentiment analysis of YouTube video comments. \n",
        commentId: "UgxylBfogE-oWfVIvyN4AaABAg",
        published_time: "2024-02-23 10:22:24",
        updated_time: "2024-02-23 10:22:24",
        user_name: "@SuccessIsAJourneyNotADes-dd5oz",
      }]);
      const response = await API.post("query_answer",
        {
          "url": youtubeUrl,
          "pdf_file": dataFileName,
          "model_type": "advanced"
        }
        
      );
      let res=response.data
      res = res.replace(/NaN/g, "0");
      console.log('res',res)
      
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
