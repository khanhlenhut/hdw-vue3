<template>
  <!-- <v-container>
    <v-row>
      <v-col cols="8">
        <v-table height="550px" fixed-header>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="product.id">
              <th class="text-center">{{ index + 1 }}</th>
              <td class="text-left">{{ product.title }}</td>
              <td class="text-left">{{ product.category }}</td>
              <td class="text-right">{{ product.price }}</td>
              <td>
                <router-link
                  :to="{ name: 'product-details', params: { id: product.id } }"
                  class="action-link view-link"
                  title="View product details"
                >
                  <i class="pi pi-eye"></i>
                </router-link>
                <span class="action-separator"> | </span>
                <CreateProductWithVuelidateModel :productId="product.id" />
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col cols="4">
        <router-view :key="$route.fullPath"></router-view>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-pagination
          v-model="currentPage"
          :length="totalPagess"
          @update:model-value="fetchProducts"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container> -->

  <div class="product-page">
    <div class="product-list-container">
      <h2 v-rainbow>Product List ({{ totalProductCount }})</h2>

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
          placeholder="Search products by Filter..."
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

      <table class="product-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in filteredProducts" :key="product.id">
            <td>{{ index + 1 }}</td>
            <td>
              <img
                :src="product.thumbnail"
                :alt="product.title"
                class="product-image"
              />
            </td>
            <td>{{ product.title }}</td>
            <td>
              <router-link
                :to="{ name: 'product-details', params: { id: product.id } }"
                class="action-link view-link"
                title="View product details"
              >
                <i class="pi pi-eye"></i>
              </router-link>
              <span class="action-separator">|</span>
              <CreateProductWithVuelidateModel :productId="product.id" />
            </td>
          </tr>
        </tbody>
      </table>

      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="totalPages"
          next-icon="mdi-menu-right"
          prev-icon="mdi-menu-left"
          @click="changePage(page)"
        >
        </v-pagination>
      </div>
    </div>

    <div class="product-details-container">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import BaseInput from "@/components/BaseInput.vue";
import CreateProductWithVuelidateModel from "@/components/CreateProductWithVuelidateModel.vue";
import useGetAllProducts from "@/composables/products/useGetAllProducts.js";

const searchQueryByFilter = ref("");
const createDateFrom = ref("");
const createDateTo = ref("");
const limit = ref(30);
const page = ref(1);

const { getProducts, filteredProducts, totalProductCount, totalProduct } =
  useGetAllProducts(searchQueryByFilter, createDateFrom, createDateTo);

const totalPages = computed(() => Math.ceil(totalProduct.value / limit.value));

const skip = computed(() => (page.value - 1) * limit.value);

watch(
  [page, limit],
  () => {
    getProducts(limit.value, skip.value);
  },
  { immediate: true }
);

watch([searchQueryByFilter, createDateFrom, createDateTo], () => {
  page.value = 1;
  getProducts(limit.value, skip.value);
});

const changePage = (newPage) => {
  page.value = newPage;
};

// const products = ref([]);
// const currentPage = ref(1);
// const totalPagess = ref(1);

// const fetchProducts = async () => {
//   const limit = 30;
//   const skip = (currentPage.value - 1) * limit;

//   try {
//     const response = await api.get(
//       `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
//     );
//     products.value = response.data.products;
//     totalPagess.value = Math.ceil(response.data.total / limit);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi cho người dùng)
//   }
// };

// onMounted(fetchProducts);
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

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  background-color: $background-color;
  text-align: left;

  thead {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: $primary-color;
    color: white;
  }

  th,
  td {
    padding: 10px;
    border: 1px solid $border-color;
  }

  th {
    background-color: $primary-color;
    color: white;
  }

  .product-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }

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
