<template>
  <SpinnerLoading></SpinnerLoading>
  <button class="open-modal-btn" @click="openModal">Create (Vuetify)</button>
  <Teleport to="#modal">
    <div class="modal-wrap" v-if="isModelOpen">
      <div class="modal">
        <slot>
          <h1>Create (Vuetify)</h1>
          <v-sheet class="mx-auto">
            <v-form @submit.prevent="submitForm" ref="form">
              <template v-for="field in fields" :key="field.model">
                <v-text-field
                  v-if="field.type !== 'textarea'"
                  v-model="formData[field.model]"
                  :rules="field.rules"
                  :label="field.label"
                  :type="field.type"
                  variant="outlined"
                ></v-text-field>
                <v-textarea
                  v-else
                  v-model="formData[field.model]"
                  :rules="field.rules"
                  :label="field.label"
                  variant="outlined"
                ></v-textarea>
              </template>
              <div class="button-wrap">
                <v-btn class="mt-2" type="submit" color="blue">Create</v-btn>
                <v-btn @click="closeModal" color="red">Close</v-btn>
              </div>
            </v-form>
          </v-sheet>
        </slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, reactive } from "vue";

import api from "@/plugins/axios";

import useProducts from "@/composables/products/useProducts";

const { debouncedCheckUniqueTitle } = useProducts();

const formData = reactive({
  title: "",
  description: "",
  category: "",
  price: "",
  brand: "",
});

const fields = [
  {
    model: "title",
    label: "Title",
    type: "text",
    rules: [
      (v) => !!v || "Title is required",
      (v) => (v && v.length <= 50) || "Title must be less than 50 characters",
      async (v) =>
        (await debouncedCheckUniqueTitle(v)) || "Title must be unique",
    ],
  },
  {
    model: "description",
    label: "Description",
    type: "textarea",
    rules: [
      (v) => !!v || "Description is required",
      (v) =>
        (v && v.length <= 200) ||
        "Description must be less than 200 characters",
    ],
  },
  {
    model: "category",
    label: "Category",
    type: "text",
    rules: [(v) => !!v || "Category is required"],
  },
  {
    model: "price",
    label: "Price",
    type: "number",
    rules: [
      (v) => !!v || "Price is required",
      (v) => (v && v > 0) || "Price must be greater than 0",
    ],
  },
  {
    model: "brand",
    label: "Brand",
    type: "text",
    rules: [(v) => !!v || "Brand is required"],
  },
];

// Modal state
const isModelOpen = ref(false);

// Modal methods
const openModal = () => {
  isModelOpen.value = true;
};

const closeModal = () => {
  isModelOpen.value = false;
};

const form = ref(null);

const submitForm = async () => {
  const { valid } = await form.value.validate();

  if (!valid) {
    return;
  }

  try {
    const response = await api.post("/products/add", formData);
    console.log(response.data);
    alert(`Product created successfully with ID: ${response.data.id}!`);
    closeModal();
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
  align-items: center;
}
</style>
