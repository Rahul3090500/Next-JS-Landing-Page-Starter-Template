import api from "@/api";
import { Button, Input } from "@nextui-org/react";

import React, { useState } from "react";

const ISMS = () => {
  const [ytURL, setYtURL] = useState("");
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [videoSummary, setVideoSummary] = useState({});

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
    }
    setButtonLoading(false);

    // console.log("response==>", response)
  };
  console.log("videoSummary===>", videoSummary);

  return (
    <>
      {GetYtURLComponent(handleOnChange, clear, isButtonLoading, handleSubmit)}
    </>
  );
};

export default ISMS;

function GetYtURLComponent(
  handleOnChange:any,
  clear: () => void,
  isButtonLoading: boolean,
  handleSubmit: () => Promise<void>
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
    </>
  );
}
