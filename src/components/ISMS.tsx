import api from "@/api";
import {
  Button,
  Input,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { Tabs, Tab, Chip, Card, CardBody } from "@nextui-org/react";

import React, { useState } from "react";
import YTSummary from "./ISMS/YTSummary";
import BarChart from "./ISMS/BarChart";
import { ChartData } from "chart.js";
import { Table, Checkbox } from "@nextui-org/react";
import ClassificationCommentTab from "./ISMS/ClassificationCommentTab";
import SentimentTab from "./ISMS/SentimentTab";
import YTURLInput from "./ISMS/YTURLInput";
import SubmitButton from "./ISMS/SubmitButton";

const ISMS = () => {
  const [ytURL, setYtURL] = useState("");
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [videoSummary, setVideoSummary] = useState();
  const [sentimentSummary, setSentimentSummary] = useState();
  const [commentClassificatios, setCommentClassifications] = useState();
  const [classifiactionComments, setClassificationComments] = useState();
  const [sentimentComments, setSentimentComments] = useState();
  const [loadingVideoSummary, setLoadingVideoSummary] = useState(false);
  const [loadingSentimentAnalysis, setLoadingSentimentAnalysis] =
    useState(false);
  const [loadingCommentClassifications, setLoadingCommentClassifications] =
    useState(false);

  const [chartData, setChartData] = useState<
    ChartData<"bar", number[], string>
  >({
    labels: ["Positive", "Neutral", "Negative", "Unknown"],
    datasets: [
      {
        label: "comments",
        data: [], // Data will be populated from API
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const [classificationChartData, setclassificationChartData] = useState<
    ChartData<"bar", number[], string>
  >({
    // labels: ["Positive", "Neutral", "Negative", "Unknown"],
    labels: [
      "Declarative",
      "Exlamative",
      "Imperative",
      "Interagotive",
      "Unknown",
    ],
    datasets: [
      {
        label: "classifiactions",
        data: [], // Data will be populated from API
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const handleOnChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setYtURL(event.target.value);
    setChartData({
      labels: ["Positive", "Neutral", "Negative", "Unknown"],
      datasets: [
        {
          label: "Comments",
          data: [], // Data will be populated from API
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
    setVideoSummary(undefined);
    setSentimentComments(undefined);
    setCommentClassifications(undefined);
    setSentimentComments(undefined);
  };
  const clear = () => {
    setYtURL("");
    setVideoSummary(undefined);
    setSentimentSummary(undefined);
    setCommentClassifications(undefined);
    setSentimentComments(undefined);
  };

  const updateVideoSummary = async () => {
    setLoadingVideoSummary(true);
    const payload = {
      url: ytURL, // Assuming ytURL is the YouTube URL input by the user
    };

    try {
      // Attempt to fetch video summary from the API
      const response: any = await api.post("/get_video_summary", payload);
      console.log("Video summary response:", response.data);
      setVideoSummary(response.data); // Assuming the API response structure matches your state
      await api.post("/youtube_comment_extract", payload);
    } catch (err: any) {
      console.error("Error fetching video summary:", err);
      // Log detailed error for debugging
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log("Error", err.message);
      }
    } finally {
      setLoadingVideoSummary(false);
    }
  };

  const updateSentimentChartData = async () => {
    setLoadingSentimentAnalysis(true);
    const payload = {
      url: ytURL, // Or a specific URL if needed
    };

    try {
      const apiResponse: any = await api.post(
        "/get_sentiment_analysis",
        payload
      );

      console.log("apiResponse==>", apiResponse);
      // Assuming apiResponse.data contains the necessary data
      const {
        positive_comments,
        neutral_comments,
        negative_comments,
        unknown_comments,
      } = apiResponse.data;

      setSentimentSummary(apiResponse.data);

      setChartData((prevState) => ({
        ...prevState,
        datasets: prevState.datasets.map((dataset) => ({
          ...dataset,
          data: [
            // total_comments,
            positive_comments,
            neutral_comments,
            negative_comments,
            unknown_comments,
          ],
        })),
      }));
    } catch (err) {
      console.error("Error fetching chart data:", err);
      // Use hardcoded values as a fallback
      setChartData((prevState) => ({
        ...prevState,
        datasets: prevState.datasets.map((dataset) => ({
          ...dataset,
          data: [],
        })),
      }));
    } finally {
      setLoadingSentimentAnalysis(false);
    }
  };

  const updateCommentClassificationsChartData = async () => {
    setLoadingCommentClassifications(true);
    const payload = {
      url: ytURL, // Or a specific URL if needed
    };

    try {
      const apiResponse: any = await api.post(
        "/get_sentencetype_advanced",
        payload
      );

      console.log("apiResponse==>", apiResponse);
      // Assuming apiResponse.data contains the necessary data
      const {
        Declarative_comments,
        Exclamative_comments,
        Imperative_comments,
        Interrogative_comments,
        unknown_comments,
      } = apiResponse.data;

      setCommentClassifications(apiResponse.data);

      setclassificationChartData((prevState) => ({
        ...prevState,
        datasets: prevState.datasets.map((dataset) => ({
          ...dataset,
          data: [
            Declarative_comments,
            Exclamative_comments,
            Imperative_comments,
            Interrogative_comments,
            unknown_comments,
          ],
        })),
      }));
    } catch (err) {
      console.error("Error fetching chart data:", err);
      // Use hardcoded values as a fallback
      setChartData((prevState) => ({
        ...prevState,
        datasets: prevState.datasets.map((dataset) => ({
          ...dataset,
          data: [],
        })),
      }));
    } finally {
      setLoadingCommentClassifications(false);
    }
  };

  const fetchAllSentimentAnalysisData = async () => {
    setLoadingSentimentAnalysis(true);
    const payload = {
      url: ytURL, // Or a specific URL if needed
    };
    try {
      // Assuming `api` is your configured Axios instance
      const response: any = await api.post(
        "/fetch_all_sentiment_analysis_data",
        payload
      );
      setSentimentComments(response.data);
      console.log("Fetching sentiment analysis data failed: ", response);
    } catch (error) {
      console.error("Fetching sentiment analysis data failed: ", error);
      // Fallback to local data if API call fails
    } finally {
      setLoadingSentimentAnalysis(false);
    }
  };

  const fetchAllCommentClassificationsData = async () => {
    setLoadingCommentClassifications(true);
    const payload = {
      url: ytURL, // Or a specific URL if needed
    };
    try {
      // Assuming `api` is your configured Axios instance
      const response: any = await api.post(
        "/fetch_all_sentencetype_data_advanced",
        payload
      );
      setClassificationComments(response.data);
      console.log("Fetching sentiment analysis data failed: ", response);
    } catch (error) {
      console.error("Fetching sentiment analysis data failed: ", error);
      // Fallback to local data if API call fails
    } finally {
      setLoadingCommentClassifications(false);
    }
  };

  const handleSubmit = async () => {
    setButtonLoading(true);
    await updateVideoSummary();
    setButtonLoading(false);
  };
  console.log("videoSummary===>", videoSummary);
  const handleSentimentAnalysis = async (key: String) => {
    if (key === "Sentiment") {
      if (sentimentSummary) {
        const {
          positive_comments,
          neutral_comments,
          negative_comments,
          unknown_comments,
        } = sentimentSummary;

        setChartData((prevState) => ({
          ...prevState,
          datasets: prevState.datasets.map((dataset) => ({
            ...dataset,
            data: [
              // total_comments,
              positive_comments,
              neutral_comments,
              negative_comments,
              unknown_comments,
            ],
          })),
        }));
      } else {
        await updateSentimentChartData();
        await fetchAllSentimentAnalysisData();
      }
    } else if (key === "Comment") {
      if (commentClassificatios) {
        const {
          Declarative_comments,
          Exclamative_comments,
          Imperative_comments,
          Interrogative_comments,
          unknown_comments,
        } = commentClassificatios;

        setclassificationChartData((prevState) => ({
          ...prevState,
          datasets: prevState.datasets.map((dataset) => ({
            ...dataset,
            data: [
              Declarative_comments,
              Exclamative_comments,
              Imperative_comments,
              Interrogative_comments,
              unknown_comments,
            ],
          })),
        }));
      } else {
        await updateCommentClassificationsChartData();
        await fetchAllCommentClassificationsData();
      }
    }

    // await fetchAllSentimentAnalysisData();
  };

  return (
    <>
      {GetYtURLComponent(
        handleOnChange,
        clear,
        isButtonLoading,
        handleSubmit,
        videoSummary,
        chartData,
        sentimentComments,
        handleSentimentAnalysis,
        classificationChartData,
        classifiactionComments,
        loadingCommentClassifications,
        loadingSentimentAnalysis,
        loadingVideoSummary
      )}
    </>
  );
};

export default ISMS;

const columns = [
  {
    key: "Query",
    label: "QUERRY",
  },
  {
    key: "user_name",
    label: "USER NAME",
  },
  {
    key: "published_time",
    label: "PUBLISHED TIME",
  },
  {
    key: "updated_time",
    label: "UPDATED TIME",
  },
  {
    key: "Response",
    label: "RESPONSE",
  },
];

function GetYtURLComponent(
  handleOnChange: any,
  clear: () => void,
  isButtonLoading: boolean,
  handleSubmit: () => Promise<void>,
  videoSummary: any,
  chartData: any,
  sentimentComments: any,
  handleSentimentAnalysis: any,
  classificationChartData: any,
  classificationComments: any,
  loadingVideoSummary: any,
  loadingSentimentAnalysis: any,
  loadingCommentClassifications: any
) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["2"]));

  const [rows, setRows] = useState([
    {
      Query: "Any other application is there in pipeline ?",
      Response:
        "Hello! Yes, we plan to expand to other social media platforms in the future. Currently, we are focusing on sentiment analysis of YouTube video comments using ChatGPT.",
      Answered: 1,
      Replied_Response:
        "Yes, we plan to expand to other social media platforms in the future.",
      commentId: "Ugz0iM-8eyanbX4kxgh4AaABAg",
      published_time: "2024-02-28 12:12:04",
      updated_time: "2024-02-28 12:12:04",
      user_name: "@SuccessIsAJourneyNotADes-dd5oz",
    },
    {
      Query:
        "Is there any difference in accuracy while the number of comments gets increased ?",
      Response:
        "Hello! The accuracy remains consistent regardless of the number of comments due to the inference method using Chatgpt. Number of comments doesn't affect accuracy.",
      Answered: 0,
      Replied_Response: null,
      commentId: "UgzOirttKhKx6x4Z0ol4AaABAg",
      published_time: "2024-02-06 08:21:18",
      updated_time: "2024-02-06 08:21:18",
      user_name: "@athiramv2312",
    },
    {
      Query:
        "What improvements are planned for the next version of your analysis tool?",
      Response:
        "We're working on integrating more advanced NLP techniques to improve the sentiment detection accuracy, and planning to support analysis of comments in multiple languages.",
      Answered: 1,
      Replied_Response:
        "Advanced NLP techniques and multilingual support are on our roadmap.",
      commentId: "UgzAdvanc3NLPtech4X4kxgh4AaABAg",
      published_time: "2024-03-05 10:15:30",
      updated_time: "2024-03-05 10:15:30",
      user_name: "@NLPFan123",
    },
    {
      Query: "How does the tool handle spam or irrelevant comments?",
      Response:
        "Our tool uses a combination of keyword filtering and sentiment analysis to identify and disregard spam or irrelevant comments, ensuring the analysis is focused on meaningful feedback.",
      Answered: 1,
      Replied_Response:
        "We filter out spam using keyword and sentiment analysis.",
      commentId: "UgzSpamFilteR0P4l5t6E3Y8Z",
      published_time: "2024-03-01 09:22:47",
      updated_time: "2024-03-01 09:22:47",
      user_name: "@TechModerator",
    },
    {
      Query: "Can the tool detect sarcasm in the comments?",
      Response:
        "Detecting sarcasm is a challenging aspect of sentiment analysis. We are currently researching methods to improve sarcasm detection in our next updates.",
      Answered: 0,
      Replied_Response: null,
      commentId: "UgzSarcasmDetecTor4X3k9l2B",
      published_time: "2024-02-25 14:48:16",
      updated_time: "2024-02-25 14:48:16",
      user_name: "@SarcasticUser",
    },
  ]);
  const newDisabledKeys = rows.reduce((acc: any, item: any, index) => {
    if (item.Answered === 1) {
      acc.push(item.commentId); // NextUI Checkbox expects string[] for disabledKeys
    }
    return acc;
  }, []);

  function handleBirthYearChange(e: any, name: any) {
    console.log("name==>", e, name);
    const newValue = e.target.value;
    setRows((prevItems) => {
      return prevItems.map((item) => {
        return { ...item, Response: newValue };
      });
    });
  }

  console.log("disabledKeys==>", newDisabledKeys);
  return (
    <>
      <YTURLInput onChange={handleOnChange} onClear={clear} />
      <SubmitButton
        isLoading={isButtonLoading}
        onSubmit={handleSubmit}
        buttonText="Save"
      />
      <Table
        aria-label="Controlled table example with dynamic content"
        selectionMode="multiple"
        disabledKeys={newDisabledKeys}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.commentId}>
              {(columnKey) =>
                columnKey === "Response" ? (
                  <TableCell>
                    <input
                      type="text"
                      value={getKeyValue(item, columnKey)}
                      onChange={(e) => handleBirthYearChange(e, item.commentId)}
                    />
                  </TableCell>
                ) : (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )
              }
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Tabs
        onSelectionChange={handleSentimentAnalysis}
        size={"lg"}
        fullWidth={true}
        aria-label="Options"
      >
        <Tab key="Summary" title="Summary">
          {loadingVideoSummary ? (
            "loading"
          ) : (
            <>
              {videoSummary ? (
                <YTSummary videoSummary={videoSummary} />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <p className="text-red-500 font-semibold text-lg font-sans w-full text-center">
                    Add YouTube URL
                  </p>
                </div>
              )}
            </>
          )}
        </Tab>
        <Tab key="Sentiment" title="Sentiment Analysis">
          {loadingSentimentAnalysis ? (
            "loading"
          ) : (
            <>
              {chartData && sentimentComments ? (
                <>
                  {" "}
                  <SentimentTab
                    chartData={chartData}
                    sentimentComments={sentimentComments}
                  />
                </>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <p className="text-red-500 font-semibold text-lg font-sans w-full text-center">
                    Add YouTube URL
                  </p>
                </div>
              )}
            </>
          )}
        </Tab>
        <Tab key="Comment" title="Comment classifications">
          {loadingCommentClassifications ? (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-red-500 font-semibold text-lg font-sans w-full text-center">
                Add YouTube URL
              </p>
            </div>
          ) : (
            <>
              {classificationChartData && classificationComments ? (
                <>
                  {" "}
                  <ClassificationCommentTab
                    classificationChartData={classificationChartData}
                    classificationComments={classificationComments}
                  />
                </>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <p className="text-red-500 font-semibold text-lg font-sans w-full text-center">
                    Add YouTube URL
                  </p>
                </div>
              )}
            </>
          )}
        </Tab>
      </Tabs>
    </>
  );
}
