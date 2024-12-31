<template>
  <div class="product-page">
    <div class="product-list-container">
      <h2>Product List ({{ totalProductCount }})</h2>

      <h4>Normal Input</h4>
      <div class="search-box">
        <div class="input-w100">
          <label>Search: </label>
          <input
            v-model="searchQueryByFilter"
            type="text"
            placeholder="Search products by Filter..."
          />
        </div>

        <div class="input-w100">
          <label for="expiryDateFrom">Create from: </label>
          <input type="date" id="createDateFrom" v-model="createDateFrom" />
        </div>

        <div class="input-w100">
          <label for="expiryDateTo">Create to: </label>
          <input type="date" id="createDateTo" v-model="createDateTo" />
        </div>
      </div>

      <h4>Custom Input</h4>
      <div class="search-box">
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
          <div class="product-content">
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="product-image"
            />
            <div class="product-info">
              <span class="product-title">{{ product.title }}</span>
              <div class="product-actions">
                <router-link
                  :to="{ name: 'product-details', params: { id: product.id } }"
                  class="action-link view-link"
                  title="View product details"
                >
                  <i class="pi pi-eye"></i>
                </router-link>
                <span class="action-separator">|</span>
                <CreateProductWithVuelidateModel :productId="product.id" />
              </div>
            </div>
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
$primary-color: #007bff;
$success-color: #3ab33a;
$border-color: #ddd;
$background-color: #f8f9fa;

.product-page {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.product-list-container,
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
  border: 1px solid $border-color;
  border-radius: 8px;
  overflow: hidden;

  .product-content {
    display: flex;
    flex-direction: column;
  }

  .product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .product-info {
    padding: 10px;
    background-color: $background-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .product-title {
    font-size: 0.9em;
    font-weight: bold;
  }

  .product-actions {
    display: flex;
    align-items: center;
    font-size: 0.8em;

    .action-link {
      color: $primary-color;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    .action-separator {
      margin: 0 5px;
      color: #ccc;
    }
  }
}

.view-link {
  color: $success-color;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    color: #0000df;
  }
}

.search-box {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: baseline;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.input-w100 {
  width: 100%;
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>
