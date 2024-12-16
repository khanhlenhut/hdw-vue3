<template>
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

export default {
  components: { TestItem, ProductItem },
  setup() {
    const searchName = ref("");
    const expiryDateFrom = ref("");
    const expiryDateTo = ref("");

    const products = ref([]);

    const getProducts = () => {
      axios
        .get("http://localhost:3001/products")
        .then((response) => {
          products.value = response.data;
        })
        .catch((error) => {
          console.log(error);
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
</style>
