import { getProducts, getProductById } from "@/app/api/getProducts";
import { ProductsResponse, Product } from "@/types/product";

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const response = await getProducts();
    return response.data;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await getProductById(id);
    return response.data;
  },
};
