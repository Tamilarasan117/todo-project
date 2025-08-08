import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8002/api",
  timeout: 5000,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    console.log(response, "response")
    return response;
  },
  async (error) => {
    const request = error.config;

    if (error.response && [401, 403].includes(error.response.status) && !request._retry) {
      request._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          console.log("Redirection to login page");
  
          return Promise.reject(error);
        } else {
          const response = await axiosClient.post("/auth/refresh-token", { refreshToken });

          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;

          localStorage.setItem("access_token", newAccessToken);
          localStorage.setItem("refresh_token", newRefreshToken);

          request.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosClient(request);
        }
      } catch (error) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        console.log("Redirection to login page");

        return Promise.reject(error);
      }
    }
  }
)

export default axiosClient;
