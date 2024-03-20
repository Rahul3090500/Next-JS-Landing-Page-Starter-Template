import React from "react";

const YTSummary = ({ videoSummary }: any) => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-xl transform transition duration-500">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{videoSummary.video_title}</h2>
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-medium text-gray-600">
          by {videoSummary.channel_name}
        </span>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
          {videoSummary.subsciber_count} subscribers
        </span>
      </div>
      <img
        src={videoSummary.video_thumbnail}
        alt="Video Thumbnail"
        className="w-full h-auto rounded-lg mb-4"
      />
      <div className="text-gray-700 space-y-2">
        <p className="text-sm">
          Duration: {videoSummary.video_duration}
        </p>
        <p className="text-sm">
          Views: {videoSummary.video_views}
        </p>
        <p className="text-sm">
          Likes: {videoSummary.video_likes}
        </p>
        <p className="text-sm">
          Comments: {videoSummary.total_comments}
        </p>
      </div>
      <a
        href={videoSummary.video_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block w-full mt-6 text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg transform transition duration-300 hover:scale-105"
      >
        Watch Video
      </a>
    </div>
  );
};

export default YTSummary;
