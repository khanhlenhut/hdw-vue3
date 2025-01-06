import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    isLoading: false,
    pendingRequests: 0,
  }),
  actions: {
    showLoading() {
      this.pendingRequests++;
      this.isLoading = true;
    },
    hideLoading() {
      this.pendingRequests--;
      if (this.pendingRequests <= 0) {
        this.isLoading = false;
        this.pendingRequests = 0; // Reset về 0 để tránh số âm
      }
    },
  },
  getters: {
    getIsLoading: (state) => state.isLoading,
  },
});
