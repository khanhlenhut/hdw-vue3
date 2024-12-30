import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BaseInput from "../../src/components/BaseInput.vue";

describe("BaseInput.vue", () => {
  it("renders correctly with required props", () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: "test-input",
        label: "Test Label",
        type: "text",
        modelValue: "",
        placeholder: "Enter value",
        required: true,
      },
    });

    expect(wrapper.find("label").text()).toBe("Test Label");
    expect(wrapper.find("input").attributes("id")).toBe("test-input");
    expect(wrapper.find("input").attributes("placeholder")).toBe("Enter value");
    expect(wrapper.find("input").attributes("required")).toBe("");
  });

  it("emits update:modelValue on input", async () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: "test-input",
        modelValue: "",
      },
    });

    const input = wrapper.find("input");
    await input.setValue("New Value");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")[0]).toEqual(["New Value"]);
  });

  it("renders error message when errorMessage is provided", () => {
    const errorMessage = "This field is required.";
    const wrapper = mount(BaseInput, {
      props: {
        id: "test-input",
        errorMessage,
      },
    });

    expect(wrapper.find(".error-message").text()).toBe(errorMessage);
  });

  it("does not render label if label prop is not provided", () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: "test-input",
      },
    });

    expect(wrapper.find("label").exists()).toBe(false);
  });

  it("renders input with default type 'text' if no type is provided", () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: "test-input",
      },
    });

    expect(wrapper.find("input").attributes("type")).toBe("text");
  });
});
