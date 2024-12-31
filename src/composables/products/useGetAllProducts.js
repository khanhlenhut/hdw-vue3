import { ref, computed } from "vue";
import api from "@/plugins/axios";

export default function (searchQueryByFilter, createDateFrom, createDateTo) {
  const products = ref([]);
  const error = ref(null);

  const getProducts = async () => {
    try {
      const response = await api.get("/products");
      products.value = response.data.products;
      console.log("Danh sách sản phẩm: ", response.data.products);
    } catch (err) {
      error.value = err.message;
      console.error("Lỗi: ", err.message);
    }
  };

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

  const totalProductCount = computed(() => filteredProducts.value.length);

  return { products, error, getProducts, filteredProducts, totalProductCount };
}
