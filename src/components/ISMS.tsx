import api from "@/api";
import { Button, Input, Table } from "@nextui-org/react";
import { Tabs, Tab, Chip, Card, CardBody } from "@nextui-org/react";

import React, { useState } from "react";
import YTSummary from "./YTSummary";
import BarChart from "../components/BarChart";
import { ChartData } from "chart.js";

const ISMS = () => {
  const [ytURL, setYtURL] = useState("");
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [videoSummary, setVideoSummary] = useState();
  const [sentimentSummary, setSentimentSummary] = useState();
  const [commentClassificatios, setCommentClassifications] = useState();
  const [classifiactionComments, setClassificationComments] = useState()
  const [sentimentComments, setSentimentComments] = useState();
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
  const fallbackSentimentComments: any = [
    {
      comment: "Difference between positive and negative sentiments ?",
      commentId: "UgyCFev6W64FhwYubh94AaABAg",
      published_time: "2024-03-02T09:42:00Z",
      sentiment: "Neutral",
      updated_time: "2024-03-02T09:42:00Z",
      user_name: "@SuccessIsAJourneyNotADes-dd5oz",
    },
  ];

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
    setVideoSummary(null);
    setSentimentComments(null);
    setCommentClassifications(null);
  };
  const clear = () => {
    setYtURL("");
    setVideoSummary(null);
    setSentimentSummary(null);
  };

  const updateVideoSummary = async () => {
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
      // Fallback to hardcoded data on error
      // setVideoSummary({
      //   channel_name: "Success Is A Journey Not A Destination",
      //   subscriber_count: 10,
      //   total_comments: 60,
      //   video_duration: "2 Minute 15 Second",
      //   video_likes: 7,
      //   video_thumbnail: "https://i.ytimg.com/vi/f5YdhPYsk3U/default.jpg",
      //   video_title: "YouTube comments Sentimental Analysis using ChatGPT",
      //   video_url: "https://www.youtube.com/watch?v=f5YdhPYsk3U",
      //   video_views: 68,
      // });
    }
  };

  const updateSentimentChartData = async () => {
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
          data: [33, 5, 28, 0, 0],
        })),
      }));
    }
  };

  const updateCommentClassificationsChartData = async () => {
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
          data: [33, 5, 28, 0, 0],
        })),
      }));
    }
  };

  const fetchAllSentimentAnalysisData = async () => {
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
      setSentimentComments(fallbackSentimentComments);
    }
  };

  const fetchAllCommentClassificationsData = async () => {
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
      setClassificationComments(fallbackSentimentComments);
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
        classifiactionComments
      )}
    </>
  );
};

export default ISMS;

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
  classifiactionComments: any
) {
  return (
    <>
      <Input
        onChange={handleOnChange}
        onClear={clear}
        type="url"
        label="Youtube URL"
      />
      <Button
        isLoading={isButtonLoading}
        color="secondary"
        onPressEnd={handleSubmit}
        spinner={
          <svg
            className="animate-spin h-5 w-5 text-current"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
            />
          </svg>
        }
      >
        Submit
      </Button>
      <Tabs
        onSelectionChange={handleSentimentAnalysis}
        size={"lg"}
        fullWidth={true}
        aria-label="Options"
      >
        <Tab key="Summary" title="Summary">
          {/* <Card>
            <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </CardBody>
          </Card>   */}
          {videoSummary && <YTSummary videoSummary={videoSummary} />}
        </Tab>
        <Tab key="Sentiment" title="Sentiment Analysis">
          <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
              <h1 className="text-2xl font-bold">
                YouTube Comments Sentiment Analysis
              </h1>
              <div className="w-full max-w-4xl mt-6">
                <BarChart chartData={chartData} />
              </div>
              <div className="flex flex-col items-center justify-center py-2">
                <div className="w-full max-w-4xl mt-6">
                  <Chip>Comments</Chip>
                  <div className="flex flex-wrap justify-center gap-4">
                    {sentimentComments?.map((comment: any, index: any) => (
                      <Card key={index}>
                        <CardBody>
                          <p>
                            Published:{" "}
                            {new Date(comment.published_time).toLocaleString()}
                          </p>
                          <p>{comment.comment}</p>
                          <p>Sentiment: {comment.sentiment}</p>
                          <p>User: {comment.user_name}</p>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </Tab>
        <Tab key="Comment" title="Comment classifications">
          <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
              <h1 className="text-2xl font-bold">
                YouTube Comments Sentiment Analysis
              </h1>
              <div className="w-full max-w-4xl mt-6">
                <BarChart chartData={classificationChartData} />
              </div>
              <div className="flex flex-col items-center justify-center py-2">
                <div className="w-full max-w-4xl mt-6">
                  <Chip>Comments</Chip>
                  <div className="flex flex-wrap justify-center gap-4">
                    {classifiactionComments?.map((comment: any, index: any) => (
                      <Card key={index}>
                        <CardBody>
                          <p>
                            Published:{" "}
                            {new Date(comment.published_time).toLocaleString()}
                          </p>
                          <p>{comment.comment}</p>
                          <p>Sentiment: {comment.sentiment}</p>
                          <p>User: {comment.user_name}</p>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
