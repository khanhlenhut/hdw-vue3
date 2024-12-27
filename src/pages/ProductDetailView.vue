<template>
  <SpinnerLoading></SpinnerLoading>
  <div v-if="product" class="product-detail">
    <h2>{{ product.title }}</h2>
    <div class="product-info">
      <p><strong>ID:</strong> {{ product.id }}</p>
      <p><strong>Description:</strong> {{ product.description }}</p>
      <p><strong>Category:</strong> {{ product.category }}</p>
      <p><strong>Price:</strong> ${{ product.price.toFixed(2) }}</p>
      <p><strong>Tags:</strong> {{ product.tags.join(", ") }}</p>
      <p><strong>Brand:</strong> {{ product.brand }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import SpinnerLoading from "@/components/SpinnerLoading.vue";
import { useSpinnerStore } from "@/stores/useSpinnerStore.js";

const route = useRoute();
const product = ref(null);
var spinnerStore = useSpinnerStore();

const getProduct = () => {
  spinnerStore.showSpinner();
  axios
    .get(`https://dummyjson.com/products/${route.params.id}`)
    .then((response) => {
      product.value = response.data;
      console.log("Data Product: ", response.data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    })
    .finally(() => {
      spinnerStore.hideSpinner();
    });
};

getProduct();
</script>
