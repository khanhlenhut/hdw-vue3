<template>
  <div class="product-item">
    <img :src="product.image" alt="Product Image" />
    <router-link :to="'/products/' + product.id" class="product-name">{{
      product.name
    }}</router-link>
    <p>{{ formatNumber(product.price) }}</p>
    <p class="product-description">{{ product.description }}</p>
    <p>Ngày sản xuất: {{ product.manufacturingDate }}</p>
    <p>Ngày hết hạn: {{ product.expiryDate }}</p>

    <!-- TODO: Kiểm tra lại chô này -->
    <!-- <p>Ngày sản xuất: {{ formatDate(product.manufacturingDate) }}</p>
    <p>Ngày hết hạn: {{ formatDate(product.expiryDate) }}</p> -->
  </div>
</template>

<script>
import { moment } from "moment";

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const formatDate = (value) => {
      if (!value) return ""; // Xử lý trường hợp giá trị null hoặc undefined
      const date = moment(value, moment.ISO_8601);
      return date.isValid() ? date.format("DD/MM/YYYY") : "Ngày không hợp lệ";
    };

    const formatNumber = (value) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    };
    return {
      formatDate,
      formatNumber,
    };
  },
};
</script>
