import axios from "axios";
import { useLoadingStore } from "@/stores/loading";

const api = axios.create({
  baseURL: "https://dummyjson.com/", // Thay bằng base URL của bạn
});

api.interceptors.request.use(
  (config) => {
    const loadingStore = useLoadingStore();
    loadingStore.showLoading();
    return config;
  },
  (error) => {
    const loadingStore = useLoadingStore();
    loadingStore.hideLoading();
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    const loadingStore = useLoadingStore();
    loadingStore.hideLoading();
    return response;
  },
  (error) => {
    const loadingStore = useLoadingStore();
    loadingStore.hideLoading();
    return Promise.reject(error);
  }
);

export default api;
