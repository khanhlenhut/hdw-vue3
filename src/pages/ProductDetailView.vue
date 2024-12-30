<template>
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
import api from "@/plugins/axios";

const route = useRoute();
const product = ref(null);

const getProduct = async () => {
  try {
    const response = await api.get(`/products/${route.params.id}`);
    product.value = response.data;
    console.log("Sản phẩm: ", response.data);
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

getProduct();
</script>
