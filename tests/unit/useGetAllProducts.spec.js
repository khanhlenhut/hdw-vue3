import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref } from "vue";
import useGetAllProducts from "../../src/composables/products/useGetAllProducts.js";
import api from "../../src/plugins/axios.js";

vi.mock("../../src/plugins/axios.js", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("useGetAllProducts", () => {
  let searchQueryByFilter, createDateFrom, createDateTo;

  beforeEach(() => {
    vi.clearAllMocks();
    searchQueryByFilter = ref("Product");
    createDateFrom = ref("2022-07-01");
    createDateTo = ref("2022-08-01");
  });

  it("should fetch products and filter them correctly", async () => {
    const mockProducts = [
      {
        id: 1,
        title: "Product 1",
        description: "Description 1",
        meta: { createdAt: "2022-06-15T00:00:00.000Z" },
      },
      {
        id: 2,
        title: "Product 2",
        description: "Description 2",
        meta: { createdAt: "2022-07-20T00:00:00.000Z" },
      },
    ];

    const response = {
      data: {
        products: mockProducts,
      },
    };

    vi.mocked(api.get).mockResolvedValue(response);

    const { products, getProducts, filteredProducts, totalProductCount } =
      useGetAllProducts(searchQueryByFilter, createDateFrom, createDateTo);

    await getProducts();

    expect(api.get).toHaveBeenCalledWith("/products");
    expect(products.value).toEqual(mockProducts);

    // Test filtering by search query and date range
    expect(filteredProducts.value).toHaveLength(1);
    expect(filteredProducts.value[0].title).toBe("Product 2");

    // Test total product count
    expect(totalProductCount.value).toBe(1);

    // Test changing search query
    searchQueryByFilter.value = "NonExistent";
    expect(filteredProducts.value).toHaveLength(0);
    expect(totalProductCount.value).toBe(0);

    // Reset search query and test date filtering
    searchQueryByFilter.value = "";
    createDateFrom.value = "2022-06-01";
    createDateTo.value = "2022-07-01";
    expect(filteredProducts.value).toHaveLength(1);
    expect(filteredProducts.value[0].title).toBe("Product 1");
    expect(totalProductCount.value).toBe(1);
  });
});
