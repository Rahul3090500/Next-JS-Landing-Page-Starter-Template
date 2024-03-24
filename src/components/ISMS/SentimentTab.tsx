import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Pagination,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Table,
} from "@nextui-org/react";
import BarChart from "./BarChart";

interface SentimentTabProps {
  chartData: any;
  sentimentComments: any;
}

const SentimentTab: React.FC<SentimentTabProps> = ({
  chartData,
  sentimentComments = [],
}) => {
  const [selectedSentiment, setSelectedSentiment] = useState<string>("All");
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const commentsPerPage = 6;

  const handleSelectionChange = (key: React.Key | null) => {
    if (typeof key === "string") {
      setSelectedSentiment(key);
      setPage(1); // Reset to the first page upon changing the sentiment filter
    }
  };

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 6;
  const filteredComments = sentimentComments.filter(
    (comment:any) =>
      selectedSentiment === "All" || comment.sentiment === selectedSentiment
  );



  // const currentComments = filteredComments.slice(
  //   indexOfFirstComment,
  //   indexOfLastComment
  // );

  const pages = Math.ceil(filteredComments.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredComments.slice(start, end);
  }, [page, filteredComments]);

  console.log("currentComments===>", filteredComments)



  const columns = [
    
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
      key: "comment",
      label: "COMMENT",
    },
  ];

  

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
            <Tab  key="All">
              All
            </Tab>
            <Tab key="Positive">
              Positive
            </Tab>
            <Tab key="Neutral">
              Neutral
            </Tab>
            <Tab  key="Negative">
              Negative
            </Tab>
            <Tab key="Unknown">
              Unknown
            </Tab>
          </Tabs>
        </div>
        <Table
          aria-label="Example table with client side pagination"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px] flex  justify-cente",
          }}
        >
          <TableHeader columns={columns} >
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={items}>
            {(item:any) => (
              <TableRow className="singleComment" key={item.commentId}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </main>
    </div>
  );
};

export default SentimentTab;
