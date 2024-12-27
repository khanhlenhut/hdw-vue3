<template>
  <button
    :class="['base-button', `btn-${typeButton}`]"
    @click="$emit('click')"
    :type="type"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  type: {
    type: String,
    default: "button",
  },
  typeButton: {
    type: String,
    default: "default",
    validator: (value) =>
      ["default", "primary", "success", "info", "warning", "danger"].includes(
        value
      ),
  },
});
</script>

<style scoped>
.base-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-default {
  background-color: #e0e0e0;
  color: #333;
}

.btn-primary {
  background-color: #1e90ff;
  color: white;
}

.btn-success {
  background-color: #38b000;
  color: white;
}

.btn-info {
  background-color: #00b4d8;
  color: white;
}

.btn-warning {
  background-color: #ffb703;
  color: #1c1c1c;
}

.btn-danger {
  background-color: #e63946;
  color: white;
}
</style>
