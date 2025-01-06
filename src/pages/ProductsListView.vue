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
                @input="(e) => productStore.handleChangeSearch(e)"
              />
              <BaseInput
                type="date"
                label="Created form: "
                id="createDateFrom"
                @input="(e) => productStore.handleChangeDateFrom(e)"
              />

              <BaseInput
                type="date"
                label="Created to: "
                id="createDateTo"
                @input="(e) => productStore.handleChangeDateTo(e)"
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
                  v-for="(product, index) in productStore.filteredProducts"
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
              v-model="productStore.currentPage"
              :length="productStore.totalPages"
              @update:model-value="productStore.fetchProducts"
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
import CreateProductWithVuelidateModel from "@/components/CreateProductWithVuelidateModel.vue";
import BaseInput from "@/components/BaseInput.vue";
import moment from "moment";
import { useProductStore } from "@/stores/productStore.js";

const productStore = useProductStore();
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
