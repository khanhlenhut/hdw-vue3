<template>
  <div v-if="loadingStore.isLoading" class="spinner">
    <div class="loading-spinner"></div>
  </div>
  <!-- <h1>Danh sách sản phẩm</h1> -->
  <TestItem msg="DANH SÁCH SẢN PHẨM"></TestItem>
  <div class="filter-contain">
    <label for="searchName">Tìm kiếm theo tên:</label>
    <input type="text" id="searchName" v-model="searchName" />
    <br /><br />

    <label for="expiryDateFrom">Ngày hết hạn từ:</label>
    <input type="date" id="expiryDateFrom" v-model="expiryDateFrom" />
    <br /><br />

    <label for="expiryDateTo">Đến ngày hết hạn:</label>
    <input type="date" id="expiryDateTo" v-model="expiryDateTo" />
  </div>

  <div class="product-container">
    <ProductItem
      v-for="product in filteredProducts"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import axios from "axios";
import TestItem from "../components/TestItem.vue";
import ProductItem from "../components/ProductItem.vue";
import { useLoadingStore } from "../stores/useLoadingStore.js";

export default {
  components: { TestItem, ProductItem },
  setup() {
    const loadingStore = useLoadingStore();

    const searchName = ref("");
    const expiryDateFrom = ref("");
    const expiryDateTo = ref("");

    const products = ref([]);

    const getProducts = () => {
      loadingStore.startLoading();
      axios
        .get("http://localhost:3001/products")
        .then((response) => {
          products.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setTimeout(() => {
            loadingStore.stopLoading();
          }, 10000);
        });
    };

    getProducts();

    const filteredProducts = computed(() => {
      return products.value.filter((product) => {
        const expiryDate = new Date(product.expiryDate);

        const isAfterExpiryFrom =
          !expiryDateFrom.value || expiryDate >= new Date(expiryDateFrom.value);
        const isBeforeExpiryTo =
          !expiryDateTo.value || expiryDate <= new Date(expiryDateTo.value);

        const isNameMatch =
          product.name.toLowerCase().includes(searchName.value.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchName.value.toLowerCase());

        return isAfterExpiryFrom && isBeforeExpiryTo && isNameMatch;
      });
    });

    return {
      products,
      filteredProducts,
      expiryDateFrom,
      expiryDateTo,
      searchName,
      loadingStore,
    };
  },
};
</script>

<style lang="sass">
// Variables
$primary-color: #3498db
$secondary-color: #2ecc71
$text-color: #333333
$background-color: #f5f5f5
$card-background: #ffffff
$border-radius: 4px
$box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)
$transition-duration: 0.2s

// Mixins
@mixin flex-center
  display: flex
  justify-content: center
  align-items: center

// General styles
body
  background-color: $background-color
  color: $text-color
  font-family: Arial, sans-serif
  line-height: 1.6

h1
  color: $primary-color
  text-align: center
  margin-bottom: 20px
  font-size: 2em

// Filter container
.filter-contain
  background-color: $card-background
  padding: 15px
  border-radius: $border-radius
  box-shadow: $box-shadow
  margin-bottom: 20px

  label
    font-weight: bold
    margin-right: 10px

  input
    padding: 8px
    border: 1px solid #ddd
    border-radius: $border-radius
    margin-bottom: 10px
    width: 100%
    box-sizing: border-box

// Product container
.product-container
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))
  gap: 20px

// Product item
.product-item
  background-color: $card-background
  border-radius: $border-radius
  box-shadow: $box-shadow
  overflow: hidden
  transition: transform $transition-duration ease

  &:hover
    transform: translateY(-3px)

  img
    width: 100%
    height: 200px
    object-fit: cover

  .product-name
    color: $primary-color
    font-size: 1.1em
    font-weight: bold
    padding: 10px
    text-decoration: none
    display: block

  p
    padding: 0 10px
    margin-bottom: 8px

  .product-description
    font-style: italic
    color: #666

  .price
    color: $secondary-color
    font-weight: bold

  .dates
    font-size: 0.9em
    color: #888

// Responsive design
@media (max-width: 768px)
  .product-container
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))

.spinner
  position: fixed

  /* Để spinner luôn ở giữa màn hình
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.5)

  /* Phủ mờ nền
  display: flex
  justify-content: center
  align-items: center
  z-index: 9999

  /* Đảm bảo spinner hiển thị trên tất cả các nội dung khác

.loading-spinner
  border: 16px solid #f3f3f3

  /* Light grey
  border-top: 16px solid #3498db

  /* Blue
  border-radius: 50%
  width: 120px
  height: 120px
  animation: spin 2s linear infinite

@keyframes spin
  0%
    transform: rotate(0deg)

  100%
    transform: rotate(360deg)
</style>
