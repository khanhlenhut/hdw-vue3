import axios from "axios";
import { useLoadingStore } from "@/stores/loading";

const axiosInstance = axios.create({
  // Cấu hình axios của bạn (ví dụ: baseURL)
  baseURL: "http://localhost:3001", // Thay thế bằng API base url của bạn
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const loadingStore = useLoadingStore();
    loadingStore.startLoading();
    return config;
  },
  (error) => {
    const loadingStore = useLoadingStore();
    loadingStore.stopLoading();
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const loadingStore = useLoadingStore();
    loadingStore.stopLoading();
    return response;
  },
  (error) => {
    const loadingStore = useLoadingStore();
    loadingStore.stopLoading();
    return Promise.reject(error);
  }
);

export default axiosInstance;
