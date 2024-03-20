import React from 'react';
import { Chip, Card, CardBody } from '@nextui-org/react';
import BarChart from './BarChart';
interface CommentTabProps {
  classificationChartData: any; 
  classificationComments: any[]; 
}

const ClassificationCommentTab: React.FC<CommentTabProps> = ({ classificationChartData, classificationComments }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-2xl font-bold">
          YouTube Comments Classification
        </h1>
        <div className="w-full max-w-4xl mt-6">
          <BarChart chartData={classificationChartData} />
        </div>
        <div className="flex flex-col items-center justify-center py-2">
          <div className="w-full max-w-4xl mt-6">
            <Chip>Comments</Chip>
            <div className="flex flex-wrap justify-center gap-4">
              {classificationComments?.map((comment: any, index: any) => (
                <Card key={index}>
                  <CardBody>
                    <p>Published: {new Date(comment.published_time).toLocaleString()}</p>
                    <p>{comment.comment}</p>
                    <p>Classification: {comment.classification}</p>
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
