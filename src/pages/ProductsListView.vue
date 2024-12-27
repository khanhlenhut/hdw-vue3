<template>
  <SpinnerLoading></SpinnerLoading>
  <div>
    <h2>Product List ({{ totalProductCount }})</h2>

    <div>
      <h5>Normal Input</h5>
      <div>
        <label>Search: </label>
        <input
          v-model="searchQueryByFilter"
          type="text"
          placeholder="Search products by Filter..."
        />
      </div>

      <div>
        <label for="expiryDateFrom">Create from: </label>
        <input type="date" id="createDateFrom" v-model="createDateFrom" />
      </div>

      <div>
        <label for="expiryDateTo">Create to: </label>
        <input type="date" id="createDateTo" v-model="createDateTo" />
      </div>
    </div>

    <div>
      <h5>Custom Input</h5>
      <BaseInput
        type="text"
        label="Search: "
        id="searchQueryByFilter"
        v-model="searchQueryByFilter"
      />
      <BaseInput
        type="date"
        label="Create date form: "
        id="createDateFrom"
        v-model="createDateFrom"
      />

      <BaseInput
        type="date"
        label="Create date to: "
        id="createDateTo"
        v-model="createDateTo"
      />
    </div>
    <ul class="product-list">
      <li
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-item"
      >
        <router-link
          :to="{ name: 'product-details', params: { id: product.id } }"
          class="product-link"
        >
          <img
            :src="product.thumbnail"
            :alt="product.title"
            style="
              height: 50px;
              width: 50px;
              object-fit: cover;
              cursor: pointer;
            "
            class="product-image"
          />
          <span class="product-title">{{ product.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
// import axios from "axios";
import axiosInstance from "@/plugins/axios";
import SpinnerLoading from "@/components/SpinnerLoading.vue";
import { useSpinnerStore } from "@/stores/useSpinnerStore.js";
import BaseInput from "@/components/BaseInput.vue";

const products = ref([]);

const spinnerStore = useSpinnerStore();

const searchQueryByFilter = ref("");
const createDateFrom = ref("");

const createDateTo = ref("");

const getProducts = () => {
  spinnerStore.showSpinner();
  axiosInstance
    .get("/products")
    .then((response) => {
      products.value = response.data.products;
      console.log("Data Products: ", response.data.products);
    })
    .catch((error) => {
      console.log("Error: ", error);
    })
    .finally(() => {
      spinnerStore.hideSpinner();
    });
};

getProducts();

const filteredProducts = computed(() => {
  const filtered = products.value.filter((product) => {
    const createDate = new Date(product.meta.createdAt);

    const isAfterExpiryFrom =
      !createDateFrom.value || createDate >= new Date(createDateFrom.value);
    const isBeforeExpiryTo =
      !createDateTo.value || createDate <= new Date(createDateTo.value);

    const isNameMatch =
      product.title
        .toLowerCase()
        .includes(searchQueryByFilter.value.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(searchQueryByFilter.value.toLowerCase());
    return isAfterExpiryFrom && isBeforeExpiryTo && isNameMatch;
  });

  return filtered;
});

const totalProductCount = computed(() => filteredProducts.value.length);
</script>

<!-- <style lang="scss" scoped>
.product-list {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.product-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.product-link {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
}

.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.product-title {
  padding: 10px;
  text-align: center;
  background-color: #f8f9fa;
}
</style> -->
