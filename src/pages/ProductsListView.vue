<template>
  <div class="product-page">
    <div class="product-list-container">
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
              class="product-image"
            />
            <span class="product-title">{{ product.title }}</span>
          </router-link>

          <div class="product-actions">
            <router-link
              :to="{ name: 'product-details', params: { id: product.id } }"
              class="action-button view-button"
            >
              <i class="pi pi-eye"></i>
            </router-link>
            <CreateProductWithVuelidateModel :productId="product.id" />
          </div>
        </li>
      </ul>
    </div>

    <div class="product-details-container">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import api from "@/plugins/axios";
import BaseInput from "@/components/BaseInput.vue";
import CreateProductWithVuelidateModel from "@/components/CreateProductWithVuelidateModel.vue";

const products = ref([]);
const searchQueryByFilter = ref("");
const createDateFrom = ref("");
const createDateTo = ref("");

const getProducts = async () => {
  try {
    const response = await api.get("/products");
    products.value = response.data.products;
    console.log("Danh sách sản phẩm: ", response.data.products);
  } catch (error) {
    console.error("Lỗi: ", error);
  }
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

<style lang="scss" scoped>
.product-page {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.product-list-container {
  overflow-y: auto;
  max-height: 100vh;
}

.product-details-container {
  overflow-y: auto;
  max-height: 100vh;
}

.product-list {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.product-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.product-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-title {
  padding: 10px;
  text-align: center;
  background-color: #f8f9fa;
  font-size: 0.9em;
}

.product-actions {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: #f1f3f5;
}

.action-button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8em;
  text-decoration: none;
  text-align: center;

  &.view-button {
    background-color: #007bff;
    color: white;

    &:hover {
      background-color: #0056b3;
    }
  }

  &.edit-button {
    background-color: #28a745;
    color: white;

    &:hover {
      background-color: #218838;
    }
  }
}
</style>
