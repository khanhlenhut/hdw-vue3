import { ref, watch, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";
import { useRoute } from "vue-router";

export const useProductStore = defineStore("products", () => {
  const products = ref([]);
  const route = useRoute();

  const searchQueryByFilter = ref("");
  const createDateFrom = ref("");
  const createDateTo = ref("");

  const handleChangeSearch = (event) => {
    searchQueryByFilter.value = event.target.value;
  };

  const handleChangeDateFrom = (event) => {
    createDateFrom.value = event.target.value;
  };

  const handleChangeDateTo = (event) => {
    createDateTo.value = event.target.value;
  };

  const currentPage = ref(1);
  const totalPages = ref(1);
  const limit = ref(20);
  const skip = ref(0);

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

  const detailsProduct = computed(() => {
    return products.value.find((product) => product.id == route.params.id);
  });

  return {
    products,
    filteredProducts,
    detailsProduct,
    searchQueryByFilter,
    createDateFrom,
    createDateTo,
    handleChangeSearch,
    handleChangeDateFrom,
    handleChangeDateTo,
    currentPage,
    totalPages,
  };
});
