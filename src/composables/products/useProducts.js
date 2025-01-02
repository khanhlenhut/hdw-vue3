import api from "@/plugins/axios";

export default function () {
  // Thêm hàm debounce
  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      return new Promise((resolve) => {
        timeoutId = setTimeout(() => resolve(fn(...args)), delay);
      });
    };
  };

  const checkUniqueTitle = async (value) => {
    if (!value) return true;
    try {
      const response = await api.get("/products");
      const titles = response.data.products.map((p) => p.title);
      return !titles.includes(value);
    } catch (error) {
      console.error("Lỗi khi kiểm tra trùng lặp:", error);
      return false;
    }
  };

  const debouncedCheckUniqueTitle = debounce(checkUniqueTitle, 1000);

  return {
    debouncedCheckUniqueTitle,
  };
}
