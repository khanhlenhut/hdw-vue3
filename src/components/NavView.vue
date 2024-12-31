<template>
  <nav class="nav">
    <router-link v-for="route in routes" :key="route.path" :to="route.path">
      {{ route.name }}
    </router-link>
  </nav>
</template>

<script setup>
const routes = [
  { path: "/", name: "Trang chủ" },
  { path: "/products", name: "Sản phẩm" },
  { path: "/about", name: "Giới thiệu" },
  { path: "/contact", name: "Liên hệ" },
];
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f8f9fa;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #e9ecef;
      color: #007bff;
    }

    &.router-link-active {
      background-color: #007bff;
      color: white;
    }
  }
}

@media (max-width: 768px) {
  .nav {
    flex-direction: column;
    padding: 0.5rem 0;

    a {
      width: 100%;
      text-align: center;
      padding: 0.75rem 0;
      border-bottom: 1px solid #dee2e6;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
