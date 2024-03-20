import React, { useState } from "react";
import { Tabs, Tab, Pagination } from "@nextui-org/react";
import BarChart from "./BarChart";

interface SentimentTabProps {
  chartData: any;
  sentimentComments: any[];
}

const SentimentTab: React.FC<SentimentTabProps> = ({
  chartData,
  sentimentComments = [],
}) => {
  const [selectedSentiment, setSelectedSentiment] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const commentsPerPage = 5;

  const handleSelectionChange = (key: React.Key | null) => {
    if (typeof key === "string") {
      setSelectedSentiment(key);
      setCurrentPage(1); // Reset to the first page upon changing the sentiment filter
    }
  };

  const filteredComments = sentimentComments.filter(
    (comment) =>
      selectedSentiment === "All" || comment.sentiment === selectedSentiment
  );

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = filteredComments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const totalPages = Math.ceil(filteredComments.length / commentsPerPage);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-2xl font-bold">
          YouTube Comments Sentiment Analysis
        </h1>
        <div className="w-full max-w-4xl mt-6">
          <BarChart chartData={chartData} />
        </div>
        <div className="my-6">
          <Tabs
            selectedKey={selectedSentiment}
            onSelectionChange={handleSelectionChange}
          >
            <Tab key="All">All</Tab>
            <Tab key="Positive">Positive</Tab>
            <Tab key="Neutral">Neutral</Tab>
            <Tab key="Negative">Negative</Tab>
            <Tab key="Unknown">Unknown</Tab>
          </Tabs>
        </div>
        <div className="flex flex-col items-center justify-center py-2">
          <div className="w-[100%] items-start flex column mt-6">
            <div className="commentsMain">
              {currentComments.map((comment: any, index: number) => (
                <div className="singleComment" key={index}>
                  <p>
                    Published:{" "}
                    {new Date(comment.published_time).toLocaleString()}
                  </p>
                  <p>{comment.comment}</p>
                  <p>Sentiment: {comment.sentiment}</p>
                  <p>User: {comment.user_name}</p>
                </div>
              ))}
              {totalPages > 1 && (
                <Pagination
                  total={totalPages}
                  initialPage={1}
                  page={currentPage}
                  onChange={(page) => setCurrentPage(page)}
                  color="secondary"
                  className="pagenation"
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SentimentTab;
