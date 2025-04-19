import axios from "axios";
import { BASE_URL } from "./ApiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const status = error.response.status;

            if (status === 401) {
                // Just reject - let the component handle it
                console.warn("Unauthorized access (401) - handled by component.");
            } else if (status === 500) {
                console.error("Server error (500). Please try again later.");
            } else if (error.code === "ECONNABORTED") {
                console.error("Request timeout. Please try again later.");
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
