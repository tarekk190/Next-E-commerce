"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { Heart, Share2, Star } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "@/context/CartContext";
import AddToCartButton from "@/components/shared/product/add-to-cart";
import { useCartLoading } from "@/components/providers/cart-loading-provider";
import { Loader2 } from "lucide-react";

import { useRouter } from "@/i18n/routing";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const t = useTranslations("ProductDetails");
  const tCard = useTranslations("ProductCard");
  const { addToCart } = useCart();
  const { isAddingToCart, setIsAddingToCart } = useCartLoading();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold tracking-wide text-blue-600 hover:text-blue-700 uppercase cursor-pointer">
            {product?.brand?.name || t("brand")}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-2 rounded-full transition-all cursor-pointer ${isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
            >
              <Heart
                className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
              />
            </button>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
          {product?.title}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-1 rounded-md">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-bold text-yellow-700">
              {product?.ratingsAverage || 0}
            </span>
          </div>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer underline-offset-4 hover:underline">
            {product?.ratingsQuantity || 0} {t("ratings")}
          </span>
        </div>
      </div>

      <div className="h-px w-full bg-gray-100" />

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-3">
          {product?.priceAfterDiscount ? (
            <>
              <span className="text-3xl md:text-4xl font-bold text-red-600">
                {product.priceAfterDiscount.toLocaleString()}{" "}
                <span className="text-lg font-medium text-red-400">
                  {tCard("currency")}
                </span>
              </span>
              <span className="text-lg text-gray-400 line-through decoration-gray-300">
                {product?.price?.toLocaleString()} {tCard("currency")}
              </span>
            </>
          ) : (
            <span className="text-3xl md:text-4xl font-bold text-gray-900">
              {product?.price?.toLocaleString()}{" "}
              <span className="text-lg font-medium text-gray-500">
                {tCard("currency")}
              </span>
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 font-medium tracking-wide">
          {t("vat")}
        </p>
      </div>

      {/* Description */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 text-lg">{t("about")}</h3>
        <p className="text-gray-600 leading-relaxed text-base">
          {product?.description}
        </p>
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
            {t("category")}
          </span>
          <span className="font-medium text-gray-900 bg-gray-50 w-fit px-3 py-1 rounded-full text-sm">
            {product?.category?.name}
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
            {t("availability")}
          </span>
          <span className="font-medium text-green-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {product?.quantity || 0} {t("inStock")}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-2">
        <AddToCartButton
          productId={product._id || product.id!}
          className="w-full h-14 text-lg font-bold bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-black border-none rounded-xl shadow-lg shadow-yellow-400/20 transition-all active:scale-[0.99]"
        >
          {t("addToCart")}
        </AddToCartButton>
        <Button
          variant="outline"
          disabled={isAddingToCart}
          onClick={async () => {
            const id = product._id || product.id;
            if (id && !isAddingToCart) {
              setIsAddingToCart(true);
              try {
                const res = await addToCart(id);
                if (res?.status === "success" || res?.message === "success") {
                  router.push("/checkout");
                }
              } finally {
                setIsAddingToCart(false);
              }
            }
          }}
          className="w-full h-14 text-lg font-bold border-2 cursor-pointer rounded-xl hover:bg-white transition-all active:scale-[0.99]"
        >
          {isAddingToCart ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {t("buyNow")}
        </Button>
      </div>
    </div>
  );
}
