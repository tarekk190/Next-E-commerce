"use client";

import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/features/products/components/ProductCard";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { wishlistProducts, loading } = useWishlist();
  const t = useTranslations("Common");

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-2xl h-[400px] animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
            <Heart size={48} />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Your wishlist is empty
        </h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Keep track of products you love. Add items to your wishlist to view
          them here later.
        </p>
        <Link
          href="/products"
          className="inline-block bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
      <p className="text-gray-500 mb-8">{wishlistProducts.length} items</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
        {wishlistProducts.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
