import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BaseButton from "../../src/components/BaseButton.vue";

describe("BaseButton.vue", () => {
  it("renders default button correctly", () => {
    const wrapper = mount(BaseButton);
    expect(wrapper.classes()).toContain("base-button");
    expect(wrapper.classes()).toContain("btn-default");
    expect(wrapper.attributes("type")).toBe("button");
  });

  it("applies the correct class for typeButton", () => {
    const wrapper = mount(BaseButton, {
      props: { typeButton: "primary" },
    });
    expect(wrapper.classes()).toContain("btn-primary");
  });

  it("renders button with custom type", () => {
    const wrapper = mount(BaseButton, {
      props: { type: "submit" },
    });
    expect(wrapper.attributes("type")).toBe("submit");
  });

  it("emits click event on button click", async () => {
    const wrapper = mount(BaseButton);
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
  });

  it("validates typeButton prop with valid values", () => {
    const validTypes = [
      "default",
      "primary",
      "success",
      "info",
      "warning",
      "danger",
    ];
    validTypes.forEach((type) => {
      const wrapper = mount(BaseButton, {
        props: { typeButton: type },
      });
      expect(wrapper.classes()).toContain(`btn-${type}`);
    });
  });

  // it("fails validation for invalid typeButton value", () => {
  //   const spy = jest.spyOn(console, "error").mockImplementation(() => {});
  //   mount(BaseButton, {
  //     props: { typeButton: "invalid" },
  //   });
  //   expect(spy).toHaveBeenCalled();
  //   spy.mockRestore();
  // });
});
