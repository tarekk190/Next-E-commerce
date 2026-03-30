import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Category {
  _id: string;
  name: string;
  image: string;
  slug?: string;
}

interface FeaturedCategoriesProps {
  categories: Category[];
}

const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  categories,
}) => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Explore our wide range of collections selected just for you.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-10 gap-x-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/products?category=${category._id}`}
              className="group flex flex-col items-center cursor-pointer"
            >
             
              <div className="relative p-1 rounded-full bg-transparent group-hover:bg-linear-to-tr group-hover:from-amber-400 group-hover:to-orange-600 transition-all duration-300">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 overflow-hidden rounded-full border-4 border-gray-100 bg-white group-hover:border-white transition-colors duration-300 shadow-sm group-hover:shadow-lg">
                  <Image
                    width={400}
                    height={400}
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover object-center transition-transform duration-500 will-change-transform group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>

              <h3 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-amber-600 transition-colors text-center">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
