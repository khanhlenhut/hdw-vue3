import axios from "axios";
// import { useSpinnerStore } from "@/stores/useSpinnerStore.js";

// Function to get the spinner store
// const getSpinnerStore = () => {
//   try {
//     return useSpinnerStore();
//   } catch (error) {
//     console.error("Failed to get spinner store:", error);
//     return null;
//   }
// };

// Create a custom instance of axios with a base configuration
const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    // You can add other default headers here
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config here
    console.log("Request sent:", config.url);
    // For example, you could add an auth token:
    // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

    // const spinnerStore = getSpinnerStore();
    // if (spinnerStore) spinnerStore.showSpinner();

    return config;
  },
  (error) => {
    // Handle request errors here
    console.error("Request error:", error);

    // const spinnerStore = getSpinnerStore();
    // if (spinnerStore) spinnerStore.hideSpinner();

    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response data here
    console.log("Response received:", response.config.url);

    // const spinnerStore = getSpinnerStore();
    // if (spinnerStore) spinnerStore.hideSpinner();

    return response;
  },
  (error) => {
    // Handle response errors here
    console.error("Response error:", error);
    // You could handle specific error codes here, e.g.:
    // if (error.response.status === 401) {
    //   // Redirect to login page
    // }

    // const spinnerStore = getSpinnerStore();
    // if (spinnerStore) spinnerStore.hideSpinner();

    return Promise.reject(error);
  }
);

export default axiosInstance;

// import axios from "axios";
// import { useLoadingStore } from "@/stores/loading";

// const axiosInstance = axios.create({
//   // Cấu hình axios của bạn (ví dụ: baseURL)
//   baseURL: "http://localhost:3001", // Thay thế bằng API base url của bạn
// });

// // Request Interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const loadingStore = useLoadingStore();
//     loadingStore.startLoading();
//     return config;
//   },
//   (error) => {
//     const loadingStore = useLoadingStore();
//     loadingStore.stopLoading();
//     return Promise.reject(error);
//   }
// );

// // Response Interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     const loadingStore = useLoadingStore();
//     loadingStore.stopLoading();
//     return response;
//   },
//   (error) => {
//     const loadingStore = useLoadingStore();
//     loadingStore.stopLoading();
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
