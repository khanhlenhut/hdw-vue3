import axios from "axios";
import { useLoadingStore } from "@/stores/loading";
import { useAuthStore } from "@/stores/authStore";

const api = axios.create({
  baseURL: "https://dummyjson.com/",
  credentials: "include", // Include cookies (e.g., accessToken) in the request
});

let authStore = null;
// Hàm để lấy authStore khi cần
const getAuthStore = () => {
  if (!authStore) {
    authStore = useAuthStore();
  }
  return authStore;
};

api.interceptors.request.use(
  (config) => {
    const loadingStore = useLoadingStore();
    loadingStore.showLoading();

    const accessToken = getAuthStore().getAccessToken;

    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }

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
  async (error) => {
    const loadingStore = useLoadingStore();
    const originalRequest = await error.config;

    console.log("error: ", error);
    console.log("originalConfig: ", originalRequest);

    // Kiểm tra xem lỗi có phải do token hết hạn không (ví dụ: status code 401)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getAuthStore().getRefreshToken;
        if (refreshToken) {
          // Gọi API để làm mới token
          const response = await axios.post(
            "https://dummyjson.com/auth/refresh",
            {
              refreshToken: refreshToken,
              expiresInMins: 2,
            }
          );

          // Lưu token mới
          // localStorage.setItem("accessToken", response.data.accessToken);
          getAuthStore().setAccessToken(response.data.accessToken);
          getAuthStore().setRefreshToken(response.data.refreshToken);

          // Cập nhật token cho request ban đầu
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

          // Gửi lại request ban đầu

          loadingStore.hideLoading();
          return axios(originalRequest);
        }
      } catch (refreshError) {
        // Xử lý lỗi làm mới token (ví dụ: đăng xuất người dùng)
        console.error("Không thể làm mới token:", refreshError);

        loadingStore.hideLoading();
        return Promise.reject(refreshError);
      }
    }

    loadingStore.hideLoading();
    return Promise.reject(error);
  }
);

export default api;
