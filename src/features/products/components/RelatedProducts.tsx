import { getProducts } from "@/app/api/getProducts";
import ProductShowcase from "./ProductShowcase";
import { Product } from "@/types/product";
import { getTranslations } from "next-intl/server";

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

export default async function RelatedProducts({
  categoryId,
  currentProductId,
}: RelatedProductsProps) {
  const response = await getProducts({ categoryId });
  const products: Product[] = response.data || [];
  const t = await getTranslations("ProductDetails");

  const relatedProducts = products.filter(
    (p) => p._id !== currentProductId && p.id !== currentProductId,
  );

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-16 border-t border-gray-100 pt-10">
      <ProductShowcase
        products={relatedProducts}
        title={t("relatedProducts")}
        showFilters={false}
        enableGrid={true}
      />
    </div>
  );
}
