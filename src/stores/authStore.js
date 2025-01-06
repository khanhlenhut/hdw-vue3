import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    expiresInMins: localStorage.getItem("expiresInMins") || null,
  }),
  actions: {
    setAccessToken(token) {
      this.accessToken = token;
      localStorage.setItem("accessToken", token);
    },
    setRefreshToken(token) {
      this.refreshToken = token;
      localStorage.setItem("refreshToken", token);
    },
    setExpiresInMins(mins) {
      this.expiresInMins = mins;
      localStorage.setItem("expiresInMins", mins);
    },
    removeTokens() {
      this.accessToken = null;
      this.refreshToken = null;
      this.expiresInMins = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("expiresInMins");
    },
  },
  getters: {
    getAccessToken: (state) => state.accessToken,
    getRefreshToken: (state) => state.refreshToken,
    isAuthenticated() {
      return !!this.accessToken;
    },
  },
});
