import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Category } from "@/types/category";
import SectionTitle from "@/components/common/SectionTitle";
import { useTranslations } from "next-intl";

interface FeaturedCategoriesProps {
  categories: Category[];
}

import { getTranslatedCategory } from "@/utils/categoryTranslations";
import { useLocale } from "next-intl";

const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  categories,
}) => {
  const t = useTranslations("Home");
  const locale = useLocale();
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <SectionTitle title={t("shopByCategory")} />
          <p className="mt-4 text-lg text-gray-500">
            {t("exploreCollections")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-10 gap-x-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/products?category=${category._id}`}
              className="group flex flex-col items-center cursor-pointer"
            >
              {/* Image Container  */}
              <div className="relative p-1 rounded-full bg-transparent group-hover:bg-linear-to-tr group-hover:from-amber-400 group-hover:to-orange-600 transition-all duration-300">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 overflow-hidden rounded-full border-4 border-gray-100 bg-white group-hover:border-white transition-colors duration-300 shadow-sm group-hover:shadow-lg">
                  <Image
                    width={400}
                    height={400}
                    src={category.image}
                    alt={getTranslatedCategory(category.name, locale)}
                    className="h-full w-full object-cover object-center transition-transform duration-500 will-change-transform group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>

              <h3 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-amber-600 transition-colors text-center">
                {getTranslatedCategory(category.name, locale)}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
