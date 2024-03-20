import api from "@/api";
import { Button, Input } from "@nextui-org/react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import React, { useState } from "react";
import YTSummary from "./YTSummary";
import BarChart from '../components/BarChart';
import { ChartData } from 'chart.js';

const ISMS = () => {
  const [ytURL, setYtURL] = useState("");
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [videoSummary, setVideoSummary] = useState({});
  const [chartData, setChartData] = useState<ChartData<"bar", number[], string>>({
    labels: ['Positive', 'Neutral', 'Negative', 'Unknown'],
    datasets: [
      {
        label: 'Comments',
        data: [], // Data will be populated from API
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const handleOnChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setYtURL(event.target.value);
  };
  const clear = () => {
    setYtURL("");
  };

  const handleSubmit = async () => {
    setButtonLoading(true);
    console.log("YTURL===>", ytURL);
    const payload = {
      url: "https://www.youtube.com/watch?v=f5YdhPYsk3U",
    };
    try {
    
      const response = await api.post("/get_video_summary", payload);
      console.log("response==>", response);
      //@ts-ignore
      setVideoSummary(response);
    } catch (err) {
      console.log("err===>", err);
      setVideoSummary({
        channel_name: "Success Is A Journey Not A Destination",
        subsciber_count: 10,
        total_comments: 60,
        video_duration: "  2 Minute  15 Second",
        video_likes: 7,
        video_thumbnail: "https://i.ytimg.com/vi/f5YdhPYsk3U/default.jpg",
        video_title: "YouTube comments Sentimental Analysis using ChatGPT",
        video_url: "https://www.youtube.com/watch?v=f5YdhPYsk3U",
        video_views: 68,
      });
      const apiResponse = {
        video_url: "https://www.youtube.com/watch?v=f5YdhPYsk3U",
        total_comments: 33,
        negative_comments: 0,
        neutral_comments: 28,
        positive_comments: 5,
        unknown_comments: 0,
      };
      setChartData(prevState => ({
        ...prevState,
        datasets: prevState.datasets.map(dataset => ({
          ...dataset,
          data: [
            // apiResponse.total_comments,
            apiResponse.positive_comments,
            apiResponse.neutral_comments,
            apiResponse.negative_comments,
            apiResponse.unknown_comments,
          ],
        })),
      }));
    }
    setButtonLoading(false);

    // console.log("response==>", response)
  };
  console.log("videoSummary===>", videoSummary);

  return (
    <>
      {GetYtURLComponent(handleOnChange, clear, isButtonLoading, handleSubmit, videoSummary,chartData)}
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
  chartData:any
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
      <Tabs size={"lg"} fullWidth={true} aria-label="Options">
        <Tab key="Summary" title="Summary">
          {/* <Card>
            <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </CardBody>
          </Card>   */}
          <YTSummary videoSummary = {videoSummary} />
        </Tab>
        <Tab key="Sentiment" title="Sentiment Analysis">
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-2xl font-bold">YouTube Comments Sentiment Analysis</h1>
        <div className="w-full max-w-4xl mt-6">
          <BarChart chartData={chartData} />
        </div>
      </main>
    </div>
        </Tab>
        <Tab key="Comment" title="Comment classifications">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
}
