import React, { useState } from "react";
import { Card, CardBody, Tabs, Tab, Pagination } from "@nextui-org/react";
import BarChart from "./BarChart";

interface CommentTabProps {
  classificationChartData: any;
  classificationComments: any[];
}

const ClassificationCommentTab: React.FC<CommentTabProps> = ({
  classificationChartData,
  classificationComments = [],
}) => {
  const [selectedSentenceType, setSelectedSentenceType] = useState<
    string | number
  >("All");
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const handleSelectionChange = (key: React.Key) => {
    if (typeof key === "string" || typeof key === "number") {
      setSelectedSentenceType(key);
      setCurrentPage(1); // Reset to first page when changing filter
    }
  };

  const filteredComments = classificationComments.filter((comment) => {
    return (
      selectedSentenceType === "All" ||
      comment.sentence_type === selectedSentenceType
    );
  });

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = filteredComments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const totalPages = Math.ceil(filteredComments.length / commentsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-2xl font-bold">YouTube Comments Classification</h1>
        <div className="w-full max-w-4xl mt-6">
          <BarChart chartData={classificationChartData} />
        </div>
        <Tabs
          selectedKey={selectedSentenceType}
          onSelectionChange={handleSelectionChange}
          aria-label="Sentence type filter"
        >
          <Tab key="All">All</Tab>
          <Tab key="Interrogative">Interrogative</Tab>
          <Tab key="Declarative">Declarative</Tab>
          <Tab key="Exclamatory">Exclamatory</Tab>{" "}
          {/* Example addition if applicable */}
        </Tabs>
        <div className="commentsMain">
          {currentComments.map((comment, index) => (
            <div className="singleComment" key={index}>
              <p>
                Published: {new Date(comment.published_time).toLocaleString()}
              </p>
              <p>{comment.comment}</p>
              <p>Type: {comment.sentence_type}</p>
              <p>User: {comment.user_name}</p>
            </div>
          ))}
          <Pagination
            total={totalPages}
            initialPage={1}
            page={currentPage}
            onChange={handlePageChange}
            color="secondary"
            className='pagenation'
          />
        </div>
      </main>
    </div>
  );
};

export default ClassificationCommentTab;
