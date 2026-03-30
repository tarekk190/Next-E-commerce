import { getBrandById, getBrands } from "@/app/api/getBrands";
import { getProductsByBrand, getProducts } from "@/app/api/getProducts";
import { Product } from "@/types/product";
import BrandClientPage from "@/features/brands/components/BrandClientPage";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  try {
    const brand = await getBrandById(id);
    if (!brand?.data) return { title: "Brand Not Found" };
    return {
      title: `${brand.data.name} | Brands`,
      description: `Shop products from ${brand.data.name}`,
    };
  } catch (error) {
    return { title: "Brand Details" };
  }
}

export async function generateStaticParams() {
  try {
    const brands = await getBrands();
    if (!brands?.data || !Array.isArray(brands.data)) return [];

    return brands.data.map((brand: any) => ({
      id: brand._id,
    }));
  } catch (error) {
    console.error("Error generating static params for brands:", error);
    return [];
  }
}

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export default async function BrandDetailsPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const [brandData, brandProductsData, allProductsData] = await Promise.all([
      getBrandById(id).catch(() => null),
      getProductsByBrand(id).catch(() => ({ data: [] })),
      getProducts().catch(() => ({ data: [] })),
    ]);

    if (!brandData || !brandData.data) {
      notFound();
    }

    const brand = brandData.data;
    const brandProducts: Product[] = brandProductsData?.data || [];
    const allProducts: Product[] = allProductsData?.data || [];

    return (
      <BrandClientPage
        brand={brand}
        brandProducts={brandProducts}
        allProducts={allProducts}
      />
    );
  } catch (error) {
    console.error(`Page Error [brands/${id}]:`, error);
    notFound();
  }
}
