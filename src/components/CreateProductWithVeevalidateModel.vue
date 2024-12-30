<template>
  <SpinnerLoading></SpinnerLoading>
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

import axios from "axios";

import SpinnerLoading from "@/components/SpinnerLoading.vue";
import { useSpinnerStore } from "@/stores/useSpinnerStore.js";

// Components
// import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import * as Yup from "yup";
import DynamicForm from "@/components/DynamicForm.vue";

// Modal state
const isModelOpen = ref(false);

const checkUniqueTitle = async (value) => {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    const titles = response.data.products.map((p) => p.title);
    return !titles.includes(value);
  } catch (error) {
    console.error("Lỗi khi kiểm tra trùng lặp:", error);
    return false;
  }
};

const formSchema = {
  fields: [
    {
      label: "Title",
      name: "title",
      as: "input",
      rules: Yup.string()
        .max(50, "Title must be at most 50 characters")
        .required("Title is required")
        .test("uniqueTitle", "Title must be unique", checkUniqueTitle),
    },
    {
      label: "Description",
      name: "description",
      as: "input",
      rules: Yup.string().required(),
    },
    {
      label: "Category",
      name: "category",
      as: "input",
      rules: Yup.string().required(),
    },
    {
      label: "Price",
      name: "price",
      as: "input",
      type: "number",
      rules: Yup.number().min(1).required(),
    },
    {
      label: "Brand",
      name: "brand",
      as: "input",
      rules: Yup.string().required(),
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

const spinnerStore = useSpinnerStore();

const submitForm = async (values) => {
  spinnerStore.showSpinner();
  try {
    const response = await axios.post("https://dummyjson.com/products/add", {
      title: values.title,
      description: values.description,
      category: values.category,
      price: values.price,
      brand: values.brand,
    });
    console.log(response.data);
    alert("Product created successfully!");
    // Xử lý phản hồi thành công ở đây (ví dụ: hiển thị thông báo, đặt lại form, v.v.)
  } catch (error) {
    console.error("Error adding product:", error);
    alert("Error adding product. Please try again later.");
    // Xử lý lỗi ở đây (ví dụ: hiển thị thông báo lỗi)
  } finally {
    spinnerStore.hideSpinner();
  }
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
