<template>
  <SpinnerLoading></SpinnerLoading>
  <button class="open-modal-btn" @click="openModal">
    Create Product (Vuetify)
  </button>
  <Teleport to="#modal">
    <div class="modal-wrap" v-if="isModelOpen">
      <div class="modal">
        <slot>
          <h1>Create Product (Vuetify)</h1>
          <v-sheet class="mx-auto" width="300">
            <v-form @submit.prevent="submitForm">
              <v-text-field
                v-model="title"
                :rules="titleRules"
                label="Title"
              ></v-text-field>
              <v-textarea
                v-model="description"
                :rules="descriptionRules"
                label="Description"
              ></v-textarea>
              <v-text-field
                v-model="category"
                :rules="categoryRules"
                label="Category"
              ></v-text-field>
              <v-text-field
                v-model="price"
                :rules="priceRules"
                label="Price"
                type="number"
              ></v-text-field>
              <v-text-field
                v-model="brand"
                :rules="brandRules"
                label="Brand"
              ></v-text-field>
              <v-btn class="mt-2" type="submit" block>Create Product</v-btn>
            </v-form>
          </v-sheet>

          <div class="button-wrap">
            <v-btn @click="closeModal">Close</v-btn>
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

const title = ref("");
const description = ref("");
const category = ref("");
const price = ref("");
const brand = ref("");

const titleRules = [
  (v) => !!v || "Title is required",
  (v) => (v && v.length <= 100) || "Title must be less than 100 characters",
];

const descriptionRules = [
  (v) => !!v || "Description is required",
  (v) =>
    (v && v.length <= 500) || "Description must be less than 500 characters",
];

const categoryRules = [(v) => !!v || "Category is required"];

const priceRules = [
  (v) => !!v || "Price is required",
  (v) => (v && v > 0) || "Price must be greater than 0",
];

const brandRules = [(v) => !!v || "Brand is required"];

// Modal state
const isModelOpen = ref(false);

// Modal methods
const openModal = () => {
  isModelOpen.value = true;
};

const closeModal = () => {
  isModelOpen.value = false;
};

// const form = ref(null); TODO: Xử lý chỗ này thực hiện lưu form

const spinnerStore = useSpinnerStore();

const submitForm = async () => {
  // const { valid } = await form.value.validate();

  // if (!valid) {
  //   alert("Please fill out the form correctly before submitting.");
  //   return;
  // }

  spinnerStore.showSpinner();
  try {
    const response = await axios.post("https://dummyjson.com/products/add", {
      title: title.value,
      description: description.value,
      category: category.value,
      price: Number(price.value),
      brand: brand.value,
    });
    console.log(response.data);
    alert("Product created successfully!");
    closeModal();
  } catch (error) {
    console.error("Error adding product:", error);
    alert("Error adding product. Please try again later.");
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
