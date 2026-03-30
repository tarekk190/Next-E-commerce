"use client";

import Image from "next/image";
import StarRating from "@/components/common/StarRating";
import Link from "next/link";
import { Product } from "@/types/product";
import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import AddToCartButton from "@/components/shared/product/add-to-cart";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({
  product,
  className = "",
}: ProductCardProps) {
  const t = useTranslations("ProductCard");
  const { isInWishlist, toggleWishlist } = useWishlist();

  return (
    <div
      className={`group relative rounded-xl flex flex-col h-full bg-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 shadow-sm ${className}`}
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full bg-white overflow-hidden p-4">
        <Link
          href={`/products/${product._id || product.id}`}
          className="block w-full h-full relative"
        >
          <Image
            fill
            loading="lazy"
            src={product.imageCover}
            alt={product.title || "product"}
            className="object-contain w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </Link>

        {/* Actions Overlay */}
        <div className="absolute inset-x-0 bottom-4 px-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto z-20">
          <AddToCartButton
            productId={product._id || product.id!}
            className="w-full py-2.5 cursor-pointer bg-black text-white font-medium text-sm rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-200"
          />
        </div>

        {/* Badge*/}
        <div
          className={`absolute top-3 start-3 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide ${
            product.priceAfterDiscount ? "bg-red-500" : " "
          }`}
        >
          {product.priceAfterDiscount ? t("sale") : " "}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-3 end-3 p-2 rounded-full bg-white/80 backdrop-blur-xs hover:bg-white shadow-sm transition-all duration-200 z-10 group/wishlist"
          title={
            isInWishlist(product._id || product.id!)
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <Heart
            size={18}
            className={`transition-colors duration-200 ${
              isInWishlist(product._id || product.id!)
                ? "fill-red-500 text-red-500"
                : "text-gray-400 group-hover/wishlist:text-red-500"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Category */}
        {product.category?.name && (
          <p className="text-xs text-gray-500 mb-1 font-medium tracking-wide">
            {product.category.name}
          </p>
        )}

        <Link href={`/products/${product._id || product.id}`}>
          <h3
            className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight mb-2 group-hover:text-black transition-colors"
            title={product.title}
          >
            {product.title}
          </h3>
        </Link>
        <div className="mt-auto flex flex-col items-start md:items-end md:flex-row justify-between gap-1 border-t border-gray-50 pt-3">
          {product.priceAfterDiscount ? (
            <div className="flex flex-col items-start gap-1">
              <span className="text-sm text-gray-400 line-through whitespace-nowrap">
                {product.price?.toLocaleString()} {t("currency")}
              </span>{" "}
              <span className="text-lg font-bold text-red-600 whitespace-nowrap">
                {product.priceAfterDiscount.toLocaleString()} {t("currency")}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
              {product.price?.toLocaleString()} {t("currency")}
            </span>
          )}
          <div className="flex items-center gap-1 mb-1">
            <div className="text-yellow-400 text-sm">
              <StarRating rating={product.ratingsAverage} />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {product.ratingsAverage}
            </span>
            <span className="text-xs text-gray-400">
              ({product.ratingsQuantity})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
