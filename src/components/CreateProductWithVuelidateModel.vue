<template>
  <button class="open-modal-btn" @click="openModal">
    Create Product (Vuelidate)
  </button>
  <Teleport to="#modal">
    <div class="modal-wrap" v-if="isModelOpen">
      <div class="modal">
        <slot>
          <h1>Create Product (Vuelidate)</h1>
          <!-- Hiển thị toàn bộ lỗi -->
          <!-- <span v-for="error in v$.$errors" :key="error.$uid" style="color: red"
            >{{ error.$property }} - {{ error.$message }}<br
          /></span> -->
          <form @submit.prevent="submitForm">
            <BaseInput
              label="Title"
              id="title"
              type="text"
              v-model="formData.title"
              :errorMessage="getErrorMessage('title')"
            />
            <BaseInput
              label="Description"
              id="description"
              type="text"
              v-model="formData.description"
              :errorMessage="getErrorMessage('description')"
            />
            <BaseInput
              label="Category"
              id="category"
              type="text"
              v-model="formData.category"
              :errorMessage="getErrorMessage('category')"
            />
            <BaseInput
              label="Price"
              id="price"
              type="number"
              v-model="formData.price"
              :errorMessage="getErrorMessage('price')"
            />
            <BaseInput
              label="Brand"
              id="brand"
              type="text"
              v-model="formData.brand"
              :errorMessage="getErrorMessage('brand')"
            />
            <div class="button-wrap">
              <BaseButton typeButton="primary" type="submit"
                >Create Product (Vuelidate)</BaseButton
              >
              <BaseButton typeButton="danger" @click="closeModal"
                >Close</BaseButton
              >
            </div>
          </form>
        </slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import api from "@/plugins/axios";
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength, minValue, helpers } from "@vuelidate/validators";

// Components
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";

// Modal state
const isModelOpen = ref(false);

// Form data
const formData = reactive({
  title: "",
  description: "",
  category: "",
  price: "",
  brand: "",
});

// Async validation function for unique title
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

// Validation rules
const rules = computed(() => ({
  title: {
    required: helpers.withMessage("Title không được rỗng!", required),
    maxLength: helpers.withMessage("Title không quá 50 ký tự!", maxLength(50)),
    mustBeUnique: helpers.withMessage(
      "Title phải là duy nhất!",
      helpers.withAsync(debouncedCheckUniqueTitle)
    ),
  },
  description: { required, maxLength: maxLength(200) },
  category: { required },
  price: { required, minValue: minValue(1) },
  brand: { required },
}));

// Vuelidate setup
const v$ = useVuelidate(rules, formData);

// Modal methods
const openModal = () => {
  isModelOpen.value = true;
};

const closeModal = () => {
  isModelOpen.value = false;
};

const submitForm = async () => {
  v$.value.$touch(); // Kích hoạt validation
  if (!v$.value.$invalid) {
    try {
      const response = await api.post(
        "https://dummyjson.com/products/add",
        formData
      );
      console.log(response.data);
      alert("Product created successfully!");
      // Xử lý phản hồi thành công ở đây (ví dụ: hiển thị thông báo, đặt lại form, v.v.)
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again later.");
    }
  }
};

// Helper function to get error messages
const getErrorMessage = (field) => {
  const errors = v$.value[field].$errors;
  return errors.length > 0 ? errors.map((e) => e.$message).join("; ") : "";
};
</script>

<style lang="scss" scoped>
.open-modal-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #007bffaf;
  }
}

.modal-wrap {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 90%;

    h1 {
      font-size: 24px;
      margin-bottom: 15px;
    }

    p {
      margin-bottom: 20px;
    }

    .close-modal-btn {
      padding: 8px 16px;
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        background-color: #d32f2f;
      }
    }
  }
}

.button-wrap {
  display: flex;
  justify-content: space-between;
}
</style>
