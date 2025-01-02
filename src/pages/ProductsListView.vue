<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-row>
          <v-col cols="12">
            <div class="search-box">
              <BaseInput
                type="text"
                label="Search (filter): "
                id="searchQueryByFilter"
                placeholder="Search products by Filter..."
                v-model="searchQueryByFilter"
              />
              <BaseInput
                type="date"
                label="Created form: "
                id="createDateFrom"
                v-model="createDateFrom"
              />

              <BaseInput
                type="date"
                label="Created to: "
                id="createDateTo"
                v-model="createDateTo"
              />
            </div>
          </v-col>
          <v-col cols="12">
            <v-table height="600px" fixed-header>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Images</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Create At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(product, index) in filteredProducts"
                  :key="product.id"
                >
                  <th class="text-center">{{ index + 1 }}</th>
                  <th>
                    <img
                      :src="product.thumbnail"
                      :alt="product.title"
                      class="product-image"
                    />
                  </th>
                  <td class="text-left">{{ product.title }}</td>
                  <td class="text-left">{{ product.category }}</td>
                  <td class="text-right">${{ product.price }}</td>
                  <td class="text-right">
                    {{ moment(product.meta.createdAt).format("DD/MM/YYYY") }}
                  </td>
                  <td>
                    <router-link
                      :to="{
                        name: 'product-details',
                        params: { id: product.id },
                      }"
                      class="action-link view-link"
                      title="View product details"
                    >
                      <i class="pi pi-eye"></i>
                    </router-link>
                    <span class="action-separator"> | </span>
                    <CreateProductWithVuelidateModel :productId="product.id" />
                  </td>
                </tr>
              </tbody> </v-table
          ></v-col>
          <v-col cols="12">
            <v-pagination
              v-model="currentPage"
              :length="totalPages"
              @update:model-value="fetchProducts"
            ></v-pagination
          ></v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <router-view :key="$route.fullPath"></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import api from "@/plugins/axios";
import CreateProductWithVuelidateModel from "@/components/CreateProductWithVuelidateModel.vue";
import BaseInput from "@/components/BaseInput.vue";
import moment from "moment";

const products = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);

const searchQueryByFilter = ref("");
const createDateFrom = ref("");
const createDateTo = ref("");
const limit = ref(20);
const skip = ref(0); // ref((currentPage.value - 1) * limit.value);

const fetchProducts = async () => {
  skip.value = (currentPage.value - 1) * limit.value;

  try {
    const response = await api.get(
      `https://dummyjson.com/products?limit=${limit.value}&skip=${skip.value}`
    );
    products.value = response.data.products;
    totalPages.value = Math.ceil(response.data.total / limit.value);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

watch(currentPage, fetchProducts);

fetchProducts();

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
</script>

<style lang="scss" scoped>
$primary-color: #007bff;
$success-color: #3ab33a;
$border-color: #ddd;
$background-color: #f8f9fa;

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

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

.action-link {
  color: $success-color;
  text-decoration: none;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    text-decoration: underline;
    color: $primary-color;
  }
}

.action-separator {
  margin: 0 5px;
  color: #ccc;
  font-size: 20px;
}
</style>
