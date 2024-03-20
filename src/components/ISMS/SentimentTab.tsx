import React, { useState } from 'react';
import { Chip, Card, CardBody ,Tabs, Tab } from '@nextui-org/react';
import BarChart from './BarChart';

interface SentimentTabProps {
  chartData: any; 
  sentimentComments: any[];
}

const SentimentTab: React.FC<SentimentTabProps> = ({ chartData,  sentimentComments = [] }) => {
  const [selectedSentiment, setSelectedSentiment] = useState<string>('All');
  const handleSelectionChange = (key: React.Key | null) => {
    if (typeof key === 'string') {
      setSelectedSentiment(key);
    }
  };

  const filteredComments = sentimentComments ? sentimentComments.filter(comment => {
    return selectedSentiment === 'All' || comment.sentiment === selectedSentiment;
  }) : [];


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
        <Tabs selectedKey={selectedSentiment} onSelectionChange={handleSelectionChange}>
            <Tab key="All">All</Tab>
            <Tab key="Positive">Positive</Tab>
            <Tab key="Neutral">Neutral</Tab>
            <Tab key="Negative">Negative</Tab>
            <Tab key="Unknown">Unknown</Tab>
          </Tabs>
        </div>
        <div className="flex flex-col items-center justify-center py-2">
          <div className="w-full max-w-4xl mt-6">
            <div className="flex flex-wrap justify-center gap-4">
              {filteredComments.map((comment: any, index: number) => (
                <Card key={index}>
                  <CardBody>
                    <p>Published: {new Date(comment.published_time).toLocaleString()}</p>
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
  );
};

export default SentimentTab;
