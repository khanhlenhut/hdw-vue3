<template>
  <div v-if="product" class="product-detail">
    <h2 v-rainbow class="product-title">{{ product.title }}</h2>
    <div class="product-content">
      <div class="product-image">
        <div class="main-image">
          <img :src="product.images[0]" :alt="product.title" />
        </div>
        <div class="thumbnail-images">
          <img
            v-for="(image, index) in product.images.slice(1)"
            :key="index"
            :src="image"
            :alt="product.title"
          />
        </div>
      </div>
      <div class="product-info">
        <!-- <p><strong>ID:</strong> {{ product.id }}</p> -->
        <p><strong>Description:</strong> {{ product.description }}</p>
        <p><strong>Category:</strong> {{ product.category }}</p>
        <p>
          <strong>Price:</strong>
          <span v-format-number>{{ product.price }}</span>
        </p>
        <p><strong>Tags:</strong> {{ product.tags.join(", ") }}</p>
        <p><strong>Brand:</strong> {{ product.brand }}</p>
      </div>
    </div>
  </div>
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
