// axiosConfig.js

import axios from 'axios';

const API = axios.create({
  baseURL: "http://20.244.47.51:8080/v1/"
});

// // Add a request interceptor
// API.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     // e.g., attach authentication token to headers
//     const token = localStorage.getItem('accessToken'); 
//     console.log("token",token) // Get token from localStorage or wherever it's stored
//     if (token) {
//       config.headers['Authorization'] = token
//     }
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// API.interceptors.response.use(
//   function (response) {
//     // Do something with successful response
//     return response;
//   },
//   function (error) {
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

export default API;
