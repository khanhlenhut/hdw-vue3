<template>
  <div v-if="spinnerStore.isLoading" class="spinner-overlay">
    <div class="spinner"></div>
  </div>
</template>

<script>
import { useSpinnerStore } from "@/stores/useSpinnerStore.js";

export default {
  setup() {
    const spinnerStore = useSpinnerStore();

    return {
      spinnerStore,
    };
  },
};
</script>

<style>
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
