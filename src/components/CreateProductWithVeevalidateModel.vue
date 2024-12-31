<template>
  <button class="open-modal-btn" @click="openModal">
    Create Product (Veevalidate)
  </button>
  <Teleport to="#modal">
    <div class="modal-wrap" v-if="isModelOpen">
      <div class="modal">
        <slot>
          <h1>Create Product (Veevalidate)</h1>
          <DynamicForm :schema="formSchema" :func="submitForm" />

          <div class="button-wrap">
            <!-- <BaseButton typeButton="primary" type="submit"
              >Create Product (Veevalidate)</BaseButton
            > -->
            <BaseButton typeButton="danger" @click="closeModal"
              >Close</BaseButton
            >
          </div>
        </slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from "vue";
import api from "@/plugins/axios";

// Components
import BaseButton from "@/components/BaseButton.vue";
import * as Yup from "yup";
import DynamicForm from "@/components/DynamicForm.vue";

// Modal state
const isModelOpen = ref(false);

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

const formSchema = {
  fields: [
    {
      label: "Title",
      name: "title",
      as: "input",
      rules: Yup.string()
        .max(50, "Title must be at most 50 characters")
        .required("Title is required")
        .test("uniqueTitle", "Title must be unique", debouncedCheckUniqueTitle),
    },
    {
      label: "Description",
      name: "description",
      as: "input",
      rules: Yup.string().required("Description is required"),
    },
    {
      label: "Category",
      name: "category",
      as: "input",
      rules: Yup.string().required("Category is required"),
    },
    {
      label: "Price",
      name: "price",
      as: "input",
      type: "number",
      rules: Yup.number().min(1).required("Price must be at least 1"),
    },
    {
      label: "Brand",
      name: "brand",
      as: "input",
      rules: Yup.string().required("Brand is required"),
    },
  ],
};

// Modal methods
const openModal = () => {
  isModelOpen.value = true;
};

const closeModal = () => {
  isModelOpen.value = false;
};

const submitForm = async (values) => {
  try {
    const response = await api.post("/products/add", values);
    console.log(response.data);
    alert("Product created successfully!");
  } catch (error) {
    console.error("Error adding product:", error);
    alert("Error adding product. Please try again later.");
  }
};
</script>

<style lang="scss" scoped>
.open-modal-btn {
  margin-right: 10px;
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
