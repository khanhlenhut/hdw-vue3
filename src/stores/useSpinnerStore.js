import { defineStore } from "pinia";

export const useSpinnerStore = defineStore("spinner", {
  state: () => ({
    isLoading: true,
  }),
  actions: {
    showSpinner() {
      this.isLoading = true;
    },
    hideSpinner() {
      this.isLoading = false;
    },
  },
});
