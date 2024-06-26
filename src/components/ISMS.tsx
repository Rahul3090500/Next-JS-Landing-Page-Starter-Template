import api from "@/api";
import { Tabs, Tab } from "@nextui-org/react";

import React, { useEffect, useState } from "react";
import YTSummary from "./ISMS/YTSummary";
import { ChartData } from "chart.js";
import ClassificationCommentTab from "./ISMS/ClassificationCommentTab";
import SentimentTab from "./ISMS/SentimentTab";
import YTURLInput from "./ISMS/YTURLInput";
import SubmitButton from "./ISMS/SubmitButton";
import PdfUploader from "./table";
import { Button } from "@mui/material";
import FileInputModal from "./file";
import { useYoutubeContext } from "@/hooks/urlcontext";
import API from "@/utils/api.config";
import axios from "axios";
import { useRouter } from "next/router";

const ISMS = () => {
  const { rowData, youtubeUrl, setCredentails, Credentails, setYoutubeUrl } =
    useYoutubeContext();
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

  const router = useRouter();
  const query = router.query;
  console.log(query);
  async function getCredentials() {
    try {
      const payload = await localStorage.getItem("data");
      const data = JSON.parse(payload);
      console.log(data);
      const response = await axios.post("/api/authenticate-and-save", {
        ...data,
        code: query.code,
      });
      const token = response.data.token;
      console.log(token);
      const payloadForFile = {
        token: token?.access_token,
        refresh_token: token?.refresh_token,
        token_uri: "https://oauth2.googleapis.com/token",
        client_id: data.client_id,
        client_secret: data.client_secret,
      };
      console.log(payloadForFile);
      const blob = new Blob([JSON.stringify(payloadForFile)], {
        type: "application/json",
      });
      const formData = new FormData();
      formData.append("filename", blob, "credentials_token.json");
      await fetch(
        `http://20.244.47.51:8080/v1/upload_file?url=${data?.youtubeUrl}`,
        {
          method: "POST",
          body: formData,
        }
      );
      await API.post("/auto_reply_multi_select", {
        url: data?.youtubeUrl,
        model_type: "advanced",
        credential_file: "credentials_token.json",
        reply_list: data?.payload,
      });
    } catch (error) {}
  }
  useEffect(() => {
    console.log("Successfully");
    if (query?.code) getCredentials();
  }, [query]);

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
    setYoutubeUrl(event.target.value);
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
    setYoutubeUrl("");
    setVideoSummary(undefined);
    setSentimentSummary(undefined);
    setCommentClassifications(undefined);
    setSentimentComments(undefined);
  };

  const updateVideoSummary = async () => {
    setLoadingVideoSummary(true);
    const payload = {
      url: youtubeUrl, // Assuming ytURL is the YouTube URL input by the user
    };

    try {
      // Attempt to fetch video summary from the API
      const response: any = await API.post("/get_video_summary", payload);
      console.log("Video summary response:", response.data);
      setVideoSummary(response.data); // Assuming the API response structure matches your state
      await API.post("/youtube_comment_extract", payload);
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
      url: youtubeUrl, // Or a specific URL if needed
    };

    try {
      const apiResponse: any = await API.post(
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
      url: youtubeUrl, // Or a specific URL if needed
    };

    try {
      const apiResponse: any = await API.post(
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
      url: youtubeUrl, // Or a specific URL if needed
    };
    try {
      // Assuming `api` is your configured Axios instance
      const response: any = await API.post(
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
      url: youtubeUrl, // Or a specific URL if needed
    };
    try {
      // Assuming `api` is your configured Axios instance
      const response: any = await API.post(
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
        loadingVideoSummary,
        youtubeUrl
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
  classificationComments: any,
  loadingVideoSummary: any,
  loadingSentimentAnalysis: any,
  loadingCommentClassifications: any,
  youtubeUrl: any
) {
  const { rowData } = useYoutubeContext();
  const [isFileOpener, setIsFileOpener] = useState(false);

  console.log("rowData: " + rowData);

  return (
    <>
      <YTURLInput
        youtubeUrl={youtubeUrl}
        onChange={handleOnChange}
        onClear={clear}
      />
      <div className="flex flex-row justify-around ">
        <SubmitButton
          isLoading={isButtonLoading}
          onSubmit={handleSubmit}
          buttonText="Save"
        />
        <Button
          variant="contained"
          onClick={() => setIsFileOpener(true)}
          component="label"
        >
          Generate AI
        </Button>
      </div>

      {!isFileOpener && (
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
              <>{videoSummary && <YTSummary videoSummary={videoSummary} />}</>
            )}
          </Tab>
          <Tab
            isDisabled={!videoSummary}
            key="Sentiment"
            title="Sentiment Analysis"
          >
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
          <Tab
            isDisabled={!videoSummary}
            key="Comment"
            title="Comment classifications"
          >
            {loadingCommentClassifications ? (
              "loading"
            ) : (
              <>
                <ClassificationCommentTab
                  classificationChartData={classificationChartData}
                  classificationComments={classificationComments}
                />
              </>
            )}
          </Tab>
        </Tabs>
      )}

      {isFileOpener && (
        <FileInputModal IsOpen={isFileOpener} setIsOpen={setIsFileOpener} />
      )}
      {rowData.length > 0 && <PdfUploader />}
    </>
  );
}
