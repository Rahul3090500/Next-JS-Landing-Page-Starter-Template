import React, { useState } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FileInput from "../../compononets/file";

const PdfUploader = () => {
  const [file, setFile] = useState(null);
  const [apiData, setApiData] = useState([
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
    },
  ]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCheckboxChange = (event, id) => {
    const updatedData = apiData.map((item) =>
      item.commentId === id ? { ...item, selected: event.target.checked } : item
    );
    // Update state or perform other actions with updatedData
    setApiData(updatedData);
    console.log(updatedData);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://20.244.47.51:8080/v1/query_answer",
        {
          url: "https://www.youtube.com/watch?v=f5YdhPYsk3U",
          model_type: "advanced",
          token_path:
            "./swagger_server/algorithm_impl/auto_reply/lijoy_credentials.json",
          answer:
            "Hello! No, the model is not using Langchain in the implementation",
          commentId: "UgxylBfogE-oWfVIvyN4AaABAg",
        }
      );
      setApiData(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleResSubmit = async () => {
    try {
      const data = apiData.filter((item) => item.selected == true);
      if (data.length == 1) {
        const response = await axios.post(
          "http://20.244.47.51:8080/v1/query_answer",
          {
            url: "https://www.youtube.com/watch?v=f5YdhPYsk3U",
            model_type: "advanced",
            token_path:
              "./swagger_server/algorithm_impl/auto_reply/lijoy_credentials.json",
            answer:
              "Hello! No, the model is not using Langchain in the implementation",
            commentId: "UgxylBfogE-oWfVIvyN4AaABAg",
          }
        );
      } else if (data.length > 1) {
        const reply_list = data.map((item) => {
          return {
            answer: item.Answered,
            commentId: item.commentId,
          };
        });
        const response = await axios.post(
          "http://20.244.47.51:8080/v1/query_answer",
          {
            url: "https://www.youtube.com/watch?v=f5YdhPYsk3U",
            model_type: "advanced",
            token_path:
              "./swagger_server/algorithm_impl/auto_reply/lijoy_credentials.json",
            reply_list: reply_list,
          }
        );
      }
    } catch (error) {}
  };

  return (
    <div>
      <FileInput
        file={file}
        setFile={setFile}
        handleFileUpload={handleSubmit}
      />
      <Button variant="contained" component="label">
        Submit Response
      </Button>

      <div
        style={{
          marginRight: "100px",
          marginLeft: "100px",
          margin: "5px",
          height: "100x",
          width: "1000px",
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
            {apiData.map((item) => (
              <TableRow key={item.commentId}>
                <TableCell>
                  <Checkbox
                    checked={item.selected}
                    onChange={(e) => handleCheckboxChange(e, item.commentId)}
                  />
                </TableCell>
                <TableCell>{item.Answered}</TableCell>
                <TableCell>{item.Query}</TableCell>
                <TableCell>{item.Replied_Response}</TableCell>
                <TableCell>{item.Response}</TableCell>
                <TableCell>{item.commentId}</TableCell>
                <TableCell>{item.published_time}</TableCell>
                <TableCell>{item.updated_time}</TableCell>
                <TableCell>{item.user_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PdfUploader;
