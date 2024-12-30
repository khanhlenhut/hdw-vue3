<template>
  <div>
    <h1>Products</h1>
    <CreateProductWithVuelidateModel />
    <CreateProductWithVeevalidateModel />
    <CreateProductWithVuetifyModel />
    <router-view />
  </div>
</template>

<script setup>
import CreateProductWithVuelidateModel from "@/components/CreateProductWithVuelidateModel.vue";
import CreateProductWithVeevalidateModel from "@/components/CreateProductWithVeevalidateModel.vue";
import CreateProductWithVuetifyModel from "@/components/CreateProductWithVuetifyModel.vue";
</script>
