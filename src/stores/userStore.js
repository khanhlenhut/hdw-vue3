import { defineStore } from "pinia";
import api from "@/plugins/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    loading: false,
  }),
  actions: {
    async fetchUser() {
      this.loading = true;
      try {
        const response = await api.get("/auth/me");
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching user:", error);
        this.user = null;
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    getUser: (state) => state.user,
  },
});
