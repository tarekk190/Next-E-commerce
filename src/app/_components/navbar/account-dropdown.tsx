"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useEffect, useState } from "react";
import { getProducts } from "@/app/api/getProducts";
import { Product } from "@/types/product";
import Image from "next/image";
import { Signout } from "@/app/api/auth/signout";
import { ChevronRight } from "lucide-react";
import AddToCartButton from "@/components/shared/product/add-to-cart";

export default function AccountDropdown() {
  const t = useTranslations("Navbar");
  const [buyAgainProducts, setBuyAgainProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts({ limit: 3 });
        if (res?.data) {
          setBuyAgainProducts(res.data.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch buy again products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="absolute top-full end-0 mt-0 w-[800px] bg-white rounded-md shadow-lg border border-gray-200 z-50 overflow-hidden hidden group-hover/account:block animate-in fade-in zoom-in-99 duration-75 ltr:origin-top-right rtl:origin-top-left before:absolute before:-top-6 before:h-6 before:w-full before:block before:content-['']">
      {/*  Manage Profiles */}
      <div className="bg-cyan-50/50 p-3 flex justify-between items-center text-sm border-b border-gray-100">
        <span className="text-gray-600">{t("whoShopping")}</span>
        <Link
          href="/profile"
          className="text-cyan-700 hover:text-red-700 hover:underline flex items-center font-medium"
        >
          {t("manageProfiles")} <ChevronRight className="h-3 w-3 ml-1" />
        </Link>
      </div>

      <div className="flex p-5">
        {/*  Buy it again */}
        <div className="w-[35%] pr-5 border-r border-gray-100">
          <div className="flex justify-between items-baseline mb-3">
            <h3 className="font-bold text-gray-900 text-lg">
              {t("buyItAgain")}
            </h3>
            <Link
              href="/allorders"
              className="text-xs text-cyan-700 hover:text-red-700 hover:underline"
            >
              {t("viewAllManage")}
            </Link>
          </div>
          <div className="space-y-4">
            {buyAgainProducts.length > 0 ? (
              buyAgainProducts.map((product) => (
                <div
                  key={product._id || product.id}
                  className="flex gap-3 group/item"
                >
                  <div className="relative w-16 h-16 shrink-0 border border-gray-200 rounded-md overflow-hidden">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${product._id}`}
                      className="text-cyan-700 hover:text-red-700 hover:underline text-sm line-clamp-2 leading-tight block mb-1"
                    >
                      {product.title}
                    </Link>
                    <div className="font-bold text-red-700 text-sm">
                      {product.price} {t("currency") || "EGP"}
                    </div>
                    <AddToCartButton
                      productId={product._id || product.id!}
                      className="mt-1 text-xs bg-yellow-400 hover:bg-yellow-500 border border-yellow-500 rounded-full px-3 py-0.5 text-gray-900 shadow-sm w-full transition-colors"
                    >
                      {t("addToCart") || "Add to cart"}
                    </AddToCartButton>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 italic">
                {t("loading") || "Loading..."}
              </div>
            )}
          </div>
        </div>

        {/*  Your Lists */}
        <div className="w-[30%] px-5 border-r border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg mb-3">
            {t("yourLists")}
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link
                href="/wishlist"
                className="text-gray-700 hover:text-red-700 hover:underline block"
              >
                {t("yourLists") || "Your Lists"}
              </Link>
            </li>
          </ul>
        </div>

        {/*  Your Account */}
        <div className="w-[35%] pl-5">
          <h3 className="font-bold text-gray-900 text-lg mb-3">
            {t("yourAccount")}
          </h3>
          <ul className="space-y-1.5 text-sm">
            <li>
              <Link
                href="/account"
                className="text-gray-700 hover:text-red-700 hover:underline block"
              >
                {t("yourAccount")}
              </Link>
            </li>
            <li>
              <Link
                href="/allorders"
                className="text-gray-700 hover:text-red-700 hover:underline block"
              >
                {t("yourOrders")}
              </Link>
            </li>
            <li>
              <Link
                href="/wishlist"
                className="text-gray-700 hover:text-red-700 hover:underline block"
              >
                {t("yourLists")}
              </Link>
            </li>
            <li>
              <Link
                href="/recommendations"
                className="text-gray-700 hover:text-red-700 hover:underline block"
              >
                {t("yourRecommendations")}
              </Link>
            </li>
            <li>
              <Link
                href="/returns"
                className="text-gray-700 hover:text-red-700 hover:underline block"
              >
                {t("returns")}
              </Link>
            </li>
            <li>
              <Link
                href="/recalls"
                className="text-gray-700 hover:text-red-700 hover:underline block"
              >
                {t("recalls")}
              </Link>
            </li>
            <li>
              <Link
                href="/subscribe"
                className="text-gray-700 hover:text-red-700 hover:underline block"
              >
                {t("subscribeSave")}
              </Link>
            </li>
            <li>
              <Link
                href="/prime"
                className="text-gray-700 hover:text-red-700 hover:underline block"
              >
                {t("primeMembership")}
              </Link>
            </li>
            <li>
              <Link
                href="/memberships"
                className="text-gray-700 hover:text-red-700 hover:underline block"
              >
                {t("memberships")}
              </Link>
            </li>
            <li>
              <Link
                href="/seller"
                className="text-gray-700 hover:text-red-700 hover:underline block"
              >
                {t("sellerAccount")}
              </Link>
            </li>
            <li>
              <Link
                href="/switch-account"
                className="text-gray-700 hover:text-red-700 hover:underline block"
              >
                {t("switchAccounts")}
              </Link>
            </li>
            <li className="pt-2 mt-2 border-t border-gray-100">
              <button
                onClick={() => Signout()}
                className="text-gray-700 hover:text-red-700 hover:underline block text-left w-full"
              >
                {t("signout")}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
