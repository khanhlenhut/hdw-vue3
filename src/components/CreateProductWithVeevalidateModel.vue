<template>
  <button class="open-modal-btn" @click="openModal">
    Create (Veevalidate)
  </button>
  <Teleport to="#modal">
    <div class="modal-wrap" v-if="isModelOpen">
      <div class="modal">
        <slot>
          <h1>Create (Veevalidate)</h1>

          <Form @submit="submitForm">
            <div v-for="form in formSchema.fields" :key="form.name">
              <label :for="form.name">{{ form.label }}</label>
              <Field
                :name="form.name"
                :as="form.as"
                :type="form.type"
                :rules="form.rules"
              />
              <ErrorMessage class="error-message" :name="form.name" />
            </div>

            <div class="button-wrap">
              <BaseButton typeButton="primary" type="submit">Create</BaseButton>
              <BaseButton typeButton="danger" @click="closeModal"
                >Close</BaseButton
              >
            </div>
          </Form>
        </slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from "vue";
import api from "@/plugins/axios";
import useProducts from "@/composables/products/useProducts";

// Components
import BaseButton from "@/components/BaseButton.vue";
import * as Yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

// Modal state
const isModelOpen = ref(false);

const { debouncedCheckUniqueTitle } = useProducts();

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
      rules: Yup.string()
        .max(200, "Description must be at most 200 characters")
        .required("Description is required"),
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
  margin-top: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
