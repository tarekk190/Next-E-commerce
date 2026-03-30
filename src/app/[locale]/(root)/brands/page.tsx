import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getBrands } from "@/app/api/getBrands";
import { Brand } from "@/types/brand";
import SectionTitle from "@/components/common/SectionTitle";

export const metadata = {
  title: "All Brands | E-Commerce",
  description: "Browse all our trusted brands and partners.",
};

export default async function BrandsPage() {
  const brandsResponse = await getBrands();
  const brands: Brand[] = brandsResponse.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionTitle title="All Brands" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`/brands/${brand._id}`}
            className="group flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center p-4">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-contain p-2 mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-amber-500 transition-colors text-center">
              {brand.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
