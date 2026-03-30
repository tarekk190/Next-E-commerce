import { getProducts } from "@/app/api/getProducts";
import ProductCard from "@/features/products/components/ProductCard";
import { Product } from "@/types/product";

interface ProductsProps {
  searchParams: Promise<{
    category?: string;
    subcategory?: string;
    keyword?: string;
  }>;
}

export default async function Products({ searchParams }: ProductsProps) {
  const { category, subcategory, keyword } = await searchParams;
  const products = await getProducts({
    categoryId: category,
    subCategoryId: subcategory,
    keyword: keyword,
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products?.data?.map((product: Product) => (
          <div key={product._id || product.id} className="h-full">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
