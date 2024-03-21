import API from "./api.config";
export const  getSentimentalAnalysis = async (url:any) => await API.post("get_sentiment_analysis",url);
export const  fetchAllSentimentAnalysisData = async (url:any) => await API.post("fetch_all_sentiment_analysis_data",url);

export const  getVideoSummary = async (url:any) => await API.post("get_video_summary",url);