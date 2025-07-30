import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:6000",
  timeout: 5000,
});

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      console.log("Unauthorized or Forbidden request");
      console.log("Redirecting to login page...");
    };

    return Promise.reject(error);
  }
);
