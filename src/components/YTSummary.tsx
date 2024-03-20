import React from "react";


const YTSummary = ({ videoSummary}:any) => {
 
  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-2">{videoSummary.video_title}</h2>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600">by {videoSummary.channel_name}</span>
        <span className="text-sm text-gray-600">{videoSummary.subsciber_count} subscribers</span>
      </div>
      <img src={videoSummary.video_thumbnail} width={320} height={180} alt="Video Thumbnail" className="rounded" />
      <div className="mt-3">
        <p className="text-gray-700 text-sm mb-2">{videoSummary.video_duration}</p>
        <p className="text-gray-700 text-sm">Views: {videoSummary.video_views}</p>
        <p className="text-gray-700 text-sm">Likes: {videoSummary.video_likes}</p>
        <p className="text-gray-700 text-sm">Comments: {videoSummary.total_comments}</p>
      </div>
      <a href={videoSummary.video_url} target="_blank" rel="noopener noreferrer" className="block mt-4 text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">Watch Video</a>
    </div>
  )
};

export default YTSummary;
