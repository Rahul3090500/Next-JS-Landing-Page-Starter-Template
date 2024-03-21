import React, { useState } from "react";
import {Tabs, Tab, Pagination, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
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
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 6;

  const handleSelectionChange = (key: React.Key) => {
    if (typeof key === "string" || typeof key === "number") {
      setSelectedSentenceType(key);
      setPage(1); // Reset to first page when changing filter
    }
  };

  const filteredComments = classificationComments.filter((comment) => {
    return (
      selectedSentenceType === "All" ||
      comment.sentence_type === selectedSentenceType
    );
  });

  const pages = Math.ceil(filteredComments.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredComments.slice(start, end);
  }, [page, filteredComments]);

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
            {(item) => (
              <TableRow key={item.commentId}>
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

export default ClassificationCommentTab;
