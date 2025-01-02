import { describe, it, expect, vi, beforeEach } from "vitest";
// import { ref } from "vue";
import useGetProductById from "../../src/composables/products/useGetProductById.js";
import api from "../../src/plugins/axios.js";

// Mock cho vue-router
vi.mock("vue-router", () => ({
  useRoute: vi.fn(() => ({
    params: {
      id: "1",
    },
  })),
}));

// Mock cho axios
vi.mock("@/plugins/axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("useGetProductById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch product by id", async () => {
    const mockProduct = { id: 1, name: "Test Product" };
    api.get.mockResolvedValue({ data: mockProduct });

    const { product, getProduct } = useGetProductById();

    expect(product.value).toBe(null);

    await getProduct();

    expect(api.get).toHaveBeenCalledWith("/products/1");
    expect(product.value).toEqual(mockProduct);
  });

  it("should handle error when fetching product", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    api.get.mockRejectedValue(new Error("API Error"));

    const { product, getProduct } = useGetProductById();

    await getProduct();

    expect(api.get).toHaveBeenCalledWith("/products/1");
    expect(product.value).toBe(null);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Lỗi: ", expect.any(Error));

    consoleErrorSpy.mockRestore();
  });
});
