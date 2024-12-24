import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    isLoading: false,
    activeRequests: 0, // Số lượng request đang chạy
  }),
  actions: {
    startLoading() {
      console.log("Start loading...");
      this.activeRequests++;
      this.isLoading = this.activeRequests > 0;
    },
    stopLoading() {
      console.log("Stop loading...");
      this.activeRequests--;
      this.isLoading = this.activeRequests > 0;
    },
  },
});
