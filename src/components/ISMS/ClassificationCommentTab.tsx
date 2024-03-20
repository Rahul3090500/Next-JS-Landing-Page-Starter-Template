import React, { useState } from 'react';
import { Chip, Card, CardBody, Tabs, Tab } from '@nextui-org/react';
import BarChart from './BarChart';

interface CommentTabProps {
  classificationChartData: any;
  classificationComments: any[];
}

const ClassificationCommentTab: React.FC<CommentTabProps> = ({ classificationChartData, classificationComments }) => {
  const [selectedSentenceType, setSelectedSentenceType] = useState<string | number>('All');

  const handleSelectionChange = (key: React.Key) => {
    if (typeof key === 'string' || typeof key === 'number') {
      setSelectedSentenceType(key);
    }
  };

  const filteredComments = classificationComments.filter(comment => 
    selectedSentenceType === 'All' || comment.sentence_type === selectedSentenceType
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-2xl font-bold">
          YouTube Comments Classification
        </h1>
        <div className="w-full max-w-4xl mt-6">
          <BarChart chartData={classificationChartData} />
        </div>
        <Tabs 
          selectedKey={selectedSentenceType}
          onSelectionChange={handleSelectionChange}
          aria-label="Sentence type filter">
          <Tab key="All">All</Tab>
          <Tab key="Interrogative">Interrogative</Tab>
          <Tab key="Declarative">Declarative</Tab>
        </Tabs>
        <div className="flex flex-col items-center justify-center py-2">
          <div className="w-full max-w-4xl mt-6">
            <div className="flex flex-wrap justify-center gap-4">
              {filteredComments.map((comment, index) => (
                <Card key={index}>
                  <CardBody>
                    <p>Published: {new Date(comment.published_time).toLocaleString()}</p>
                    <p>{comment.comment}</p>
                    <p>Type: {comment.sentence_type}</p>
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

export default ClassificationCommentTab;
