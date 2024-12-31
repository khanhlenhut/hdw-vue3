import { ref } from "vue";
import { useRoute } from "vue-router";
import api from "@/plugins/axios";

export default function () {
  const route = useRoute();
  const product = ref(null);

  const getProduct = async () => {
    try {
      const response = await api.get(`/products/${route.params.id}`);
      product.value = response.data;
      console.log("Sản phẩm: ", response.data);
    } catch (error) {
      console.error("Lỗi: ", error);
    }
  };

  return { product, getProduct };
}
