import { categoryService } from "@/features/categories/api/categoryService";
import DepartmentSection from "@/features/categories/components/DepartmentSection";
import FeaturedCategories from "@/features/categories/components/FeaturedCategories";
import { productService } from "@/features/products/api/productService";
import ProductShowcase from "@/features/products/components/ProductShowcase";
import Testimonials from "@/features/home/components/Testimonials";
import { getReviews } from "@/app/api/getReviews";
import MySwiper from "@/app/_components/swiper/MySwiper";

export default async function Home() {
  const productsData = productService.getAll();
  const categoriesData = categoryService.getWithSubCategories();
  const reviewsData = getReviews();

  // fetching
  const [products, categoriesWithSubs, reviewsResponse] = await Promise.all([
    productsData,
    categoriesData,
    reviewsData,
  ]);

  return (
    <>
      <MySwiper />
      <div className="container mx-auto bg-white">
        {/* Featured Categories */}
        <FeaturedCategories categories={categoriesWithSubs} />
        {/* Products Showcase */}
        <ProductShowcase products={products} />
        {/* Featured Departments */}
        {categoriesWithSubs.length > 2 && (
          <DepartmentSection category={categoriesWithSubs[2]} />
        )}
      </div>
    </>
  );
}
