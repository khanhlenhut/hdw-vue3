<template>
  <button v-if="!productId" class="open-modal-btn" @click="openModal">
    <span>Create (Vuelidate)</span>
  </button>
  <button
    v-else
    class="open-modal-btn-edit"
    @click="openModal"
    title="Edit product"
  >
    <i class="pi pi-pencil"></i>
  </button>
  <Teleport to="#modal">
    <div class="modal-wrap" v-if="isModalOpen">
      <div class="modal">
        <slot>
          <h1>
            {{ titleModal }}
          </h1>
          <form @submit.prevent="submitForm">
            <BaseInput
              v-for="formField in formFields"
              :key="formField.name"
              :label="formField.label"
              :id="formField.name"
              :type="formField.type"
              v-model="formData[formField.name]"
              :errorMessage="getErrorMessage(formField.name)"
            />
            <div class="button-wrap">
              <BaseButton typeButton="primary" type="submit">{{
                titleModal
              }}</BaseButton>
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
import { ref, reactive, computed, defineProps, watch } from "vue";

import { useVuelidate } from "@vuelidate/core";
import { required, maxLength, minValue, helpers } from "@vuelidate/validators";

import api from "@/plugins/axios";
import useProducts from "@/composables/products/useProducts";

import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";

const props = defineProps({
  productId: { type: Number, default: 0, required: false },
});

const titleModal = !props.productId ? "Create (Vuelidate)" : "Edit (Vuelidate)";

const formFields = [
  { name: "title", label: "Title", type: "text" },
  { name: "description", label: "Description", type: "text" },
  { name: "category", label: "Category", type: "text" },
  { name: "price", label: "Price", type: "number" },
  { name: "brand", label: "Brand", type: "text" },
];

// Modal state
const isModalOpen = ref(false);

// Form data
const formData = reactive({
  title: "",
  description: "",
  category: "",
  price: 0,
  brand: "",
});

// Function to load product data
const loadProductData = async (id) => {
  if (id === 0) return; // Không load dữ liệu nếu là tạo mới
  try {
    const response = await api.get(`/products/${id}`);
    const product = response.data;

    formData.title = product.title;
    formData.description = product.description;
    formData.category = product.category;
    formData.price = product.price;
    formData.brand = product.brand;
  } catch (error) {
    console.error("Error loading product data:", error);
    alert("Error loading product data. Please try again.");
  }
};

// Watch for changes in productId
watch(
  () => props.productId,
  (newId) => {
    if (newId) {
      loadProductData(newId);
    }
  }
);

const { debouncedCheckUniqueTitle } = useProducts();

// Validation rules
const rules = computed(() => ({
  title: {
    required: helpers.withMessage("Title is required", required),
    maxLength: helpers.withMessage(
      "Title must not exceed 50 characters",
      maxLength(50)
    ),
    mustBeUnique: helpers.withMessage(
      "Title must be unique",
      helpers.withAsync(debouncedCheckUniqueTitle)
    ),
  },
  description: {
    required: helpers.withMessage("Description is required", required),
    maxLength: helpers.withMessage(
      "Description must not exceed 200 characters",
      maxLength(200)
    ),
  },
  category: { required: helpers.withMessage("Category is required", required) },
  price: {
    required: helpers.withMessage("Price is required", required),
    minValue: helpers.withMessage("Price must be at least 1", minValue(1)),
  },
  brand: { required: helpers.withMessage("Brand is required", required) },
}));

// Vuelidate setup
const v$ = useVuelidate(rules, formData);

// Modal methods
const openModal = () => {
  isModalOpen.value = true;

  if (props.productId) {
    loadProductData(props.productId);
  } else {
    formData.title = "";
    formData.description = "";
    formData.category = "";
    formData.price = 0;
    formData.brand = "";
  }
};

const closeModal = () => {
  isModalOpen.value = false;
};

const submitForm = async () => {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    if (props.productId) {
      try {
        const response = await api.put(
          `/products/${props.productId}`,
          formData
        );
        console.log(response.data);
        alert(`Product updated successfully with ID: ${response.data.id}}!`);
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Error updating product. Please try again later.");
      }
    } else {
      try {
        const response = await api.post("/products/add", formData);
        console.log(response.data);
        alert(`Product created successfully ${response.data.id}!`);
      } catch (error) {
        console.error("Error adding product:", error);
        alert("Error adding product. Please try again later.");
      }
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
  margin-right: 10px;
  &:hover {
    background-color: #007bffaf;
  }
}

.open-modal-btn-edit {
  margin-right: 10px;
  color: #ffd700;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    color: #0000df;
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
