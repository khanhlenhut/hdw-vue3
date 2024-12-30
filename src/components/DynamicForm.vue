<template>
  <Form @submit="func">
    <div
      class="custom-input"
      v-for="{ as, name, label, children, ...attrs } in schema.fields"
      :key="name"
    >
      <label :for="name">{{ label }}</label>
      <Field :as="as" :id="name" :name="name" v-bind="attrs">
        <template v-if="children && children.length">
          <component
            v-for="({ tag, text, ...childAttrs }, idx) in children"
            :key="idx"
            :is="tag"
            v-bind="childAttrs"
          >
            {{ text }}
          </component>
        </template>
      </Field>
      <ErrorMessage class="error-message" :name="name" />
    </div>
    <BaseButton typeButton="primary" type="submit"
      >Create Product (Veevalidate)</BaseButton
    >
  </Form>
</template>

<script setup>
import defineProps from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import BaseButton from "@/components/BaseButton.vue";

defineProps({
  schema: {
    type: Object,
    required: true,
  },
  func: {
    type: Object,
    required: true,
  },
});
</script>
<style scoped>
.custom-input {
  margin-bottom: 15px;
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
