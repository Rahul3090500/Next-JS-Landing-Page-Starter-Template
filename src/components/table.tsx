import React, { useState } from "react";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FileInput from "./file";
import { Button } from "@mui/material";
import FileModal from "./modal/filemodal";
import Card from "./modal/card";
import API from "@/utils/api.config";

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

const PdfUploader = () => {
  const [selectedfile, setFile] = useState(null);
  const [openCredentailsFile, setOpenCredentailsFile] = useState<Boolean>(false)
  const [apiData, setApiData] = useState<ApiDataItem[]>([
    {
      Answered: 0,
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
    },
    {
      Answered: 0,
      Query: "What do you mean by &#39;unknown&#39;?",
      Replied_Response: NaN,
      Response:
        "Hello! 'Unknown' refers to comments that cannot be categorized as positive, negative, or neutral in sentiment analysis of YouTube video comments. It indicates uncertainty in sentiment classification. \n",
      commentId: "UgyI2_AyssD3fxiMCUF4AaABAg",
      published_time: "2024-02-06 08:24:45",
      updated_time: "2024-02-06 08:24:45",
      user_name: "@athiramv2312",
    },
    {
      Answered: 0,
      Query: "How chat gpt is utilised here?",
      Replied_Response: NaN,
      Response:
        "Hello! ChatGPT is used to analyze sentiments in YouTube comments. It helps identify positive, negative, neutral, or unknown sentiments for better understanding. \n",
      commentId: "Ugz0-xuqKJnltwGycZh4AaABAg",
      published_time: "2024-02-06 08:22:08",
      updated_time: "2024-02-06 08:22:08",
      user_name: "@athiramv2312",
    },
    {
      Answered: 0,
      Query:
        "Is there any difference in accuracy while the number of comments gets increased ?",
      Replied_Response: NaN,
      Response:
        "Hello! The accuracy remains consistent regardless of the number of comments due to the inference method using ChatGPT. Number of comments doesn't affect accuracy. \n",
      commentId: "UgzOirttKhKx6x4Z0ol4AaABAg",
      published_time: "2024-02-06 08:21:18",
      updated_time: "2024-02-06 08:21:18",
      user_name: "@athiramv2312",
    },
    {
      Answered: 0,
      Query: "How did you come to this conclusion",
      Replied_Response: NaN,
      Response:
        "We used Chatgpt technique to analyze sentiments in YouTube comments, categorizing them as positive, negative, neutral, or unknown. This helped us draw conclusions. \n",
      commentId: "UgyM6Rb2-19Udn6DnqV4AaABAg",
      published_time: "2024-02-06 08:17:28",
      updated_time: "2024-02-06 08:17:28",
      user_name: "@athiramv2312",
    }
  ]);

 

  

  const handleFileSubmit = async () => {
    try {
      if(selectedfile){
      
      const response = await API.post("query_answer",
        {
          "url": "https://www.youtube.com/watch?v=f5YdhPYsk3U",
          "pdf_file": "sentiment.pdf",
          "model_type": "advanced"
        }
        
      );
      let res=response.data
      res = res.replace(/NaN/g, "0");

      setApiData(JSON.parse(res));
     // console.error("Error uploading file:",typeof  response.data,JSON.parse(response.data));
      
    }} catch (error) {
      console.error("Error uploading file:", error);
    }
  
  };

  
  return (
    <div>
      <div className="flex flex-row">
      <FileInput
        setSelectedFile={setFile}
       
      />
      <Button variant="contained" onClick={handleFileSubmit} component="label">
        Upload File
      </Button>
      <Button variant="contained" onClick={()=>setOpenCredentailsFile(true)} component="label">
        Submit Response
      </Button>
      </div>
      

     {
      apiData.length > 0 && <div
      style={{
        marginRight: "100px",
        marginLeft: "100px",
        margin: "5px",
        height: "100x",
        width: "100%",
        overflow: "auto",
        border: "4px solid #000000", // Note: This color value might not be correct, make sure to use the correct color
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Checkbox</TableCell>
            <TableCell>Answered</TableCell>
            <TableCell>Query</TableCell>
            <TableCell>Replied Response</TableCell>
            <TableCell>Response</TableCell>
            <TableCell>Comment ID</TableCell>
            <TableCell>Published Time</TableCell>
            <TableCell>Updated Time</TableCell>
            <TableCell>User Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apiData?.map((item:ApiDataItem) => (
            <TableRow key={item.commentId}>
              <TableCell>
                <Checkbox
                  checked={item.selected}
                  onChange={(event) => {
                  const newItem = {
                    ...item,
                    selected: event.target.checked
                  }
                  // Update state or perform other actions with updatedData
                  setApiData(prevApiData => prevApiData.map((it) => {
                    if (it.commentId === newItem.commentId) {
                      return newItem;
                    } else {
                      return it; // Use the previous state it instead of item
                    }
                  }));
                  }}
                />
              </TableCell>
              <TableCell>{item.Answered}</TableCell>
              <TableCell>{item.Query}</TableCell>
              <TableCell>{item.Replied_Response}</TableCell>
              <TableCell>
                <input type="text" value={item.Response}
                onChange={(value)=>{
                  const newItem = {
                    ...item,
                    Response: value.target.value,
                  }
                  // Update state or perform other actions with updatedData
                  setApiData(prevApiData => prevApiData.map((it) => {
                    if (it.commentId === newItem.commentId) {
                      return newItem;
                    } else {
                      return it; // Use the previous state it instead of item
                    }
                  }));
              }}

                
                
                />

              </TableCell>
              <TableCell>{item.commentId}</TableCell>
              <TableCell>{item.published_time}</TableCell>
              <TableCell>{item.updated_time}</TableCell>
              <TableCell>{item.user_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <FileModal setIsOpen={setOpenCredentailsFile} IsOpen={openCredentailsFile} apiData={apiData} />
    </div>
     }
    </div>
  );
};

export default PdfUploader;
