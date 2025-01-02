<template>
  <v-card
    v-if="product"
    :disabled="loading"
    :loading="loading"
    class="mx-auto my-12"
    max-width="auto"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-carousel>
      <v-carousel-item
        v-for="image in product.images"
        :key="image"
        :src="image"
        cover
      ></v-carousel-item>
    </v-carousel>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-item>
      <v-card-title>{{ product.title }}</v-card-title>

      <v-card-subtitle>
        <span class="me-1">{{ product.category }}</span>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <div class="my-4 text-subtitle-1">$ {{ product.price }}</div>

      <div>{{ product.description }}</div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import useGetProductById from "@/composables/products/useGetProductById.js";

const { product, getProduct } = useGetProductById();
getProduct();
</script>

<style lang="scss" scoped>
.product-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .product-title {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }

  .product-content {
    display: flex;
    gap: 30px;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .product-image {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 15px;

      .main-image {
        img {
          width: 100%;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      }

      .thumbnail-images {
        display: flex;
        gap: 10px;
        overflow-x: auto;
        padding-bottom: 10px;

        img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 4px;
          cursor: pointer;
          transition: transform 0.2s ease-in-out;

          &:hover {
            transform: scale(1.05);
          }
        }
      }
    }

    .product-info {
      flex: 1;

      p {
        margin-bottom: 10px;
        line-height: 1.6;

        strong {
          color: #555;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
