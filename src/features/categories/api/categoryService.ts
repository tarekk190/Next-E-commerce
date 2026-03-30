import { getCategories, getSubCategories } from "@/app/api/getCategories";
import {
  CategoriesResponse,
  SubCategoriesResponse,
  Category,
} from "@/types/category";

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const response = await getCategories();
    return response.data;
  },

  getAllSubCategories: async (): Promise<SubCategoriesResponse["data"]> => {
    const response = await getSubCategories();
    return response.data;
  },

  getWithSubCategories: async (): Promise<Category[]> => {
    // Parallel fetch for efficiency
    const [categories, subCategories] = await Promise.all([
      categoryService.getAll(),
      categoryService.getAllSubCategories(),
    ]);

    // Merge logic
    return categories.map((cat) => ({
      ...cat,
      subcategories: subCategories.filter((sub) => {
        const subCatId =
          typeof sub.category === "object" && sub.category !== null
            ? (sub.category as { _id: string })._id
            : sub.category;
        return subCatId === cat._id;
      }),
    }));
  },
};
