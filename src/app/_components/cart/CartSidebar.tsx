"use client";

import { useCart } from "@/context/CartContext";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { useEffect, useRef } from "react";

export default function CartSidebar() {
  const {
    isSidebarOpen,
    closeSidebar,
    cartItems,
    totalCartPrice,
    updateItemCount,
    removeItem,
  } = useCart();
  const t = useTranslations("Cart");
  const tCommon = useTranslations("Common");
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isSidebarOpen
      ) {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // when sidebar is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen, closeSidebar]);

  if (!isSidebarOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-out animate-in slide-in-from-right overflow-x-hidden"
      >
        {/* Header */}
        <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              {t("cart")}
              <span className="text-sm font-normal text-gray-500">
                ({cartItems.reduce((acc, item) => acc + item.count, 0)}{" "}
                {t("items")})
              </span>
            </h2>
          </div>
          <button
            onClick={closeSidebar}
            className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-gray-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Subtotal Section  */}
        <div className="p-4 bg-white border-b space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-gray-900">
              {t("subtotal")}
            </span>
            <span className="text-xl font-bold text-red-600">
              {totalCartPrice.toLocaleString()} {t("currency")}
            </span>
          </div>
          <Link
            href="/cart"
            onClick={closeSidebar}
            className="block w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black text-center font-bold rounded-lg shadow-sm transition-colors text-sm"
          >
            {t("goToCart")}
          </Link>
          <Link
            href="/checkout"
            onClick={closeSidebar}
            className="block w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 text-center font-medium rounded-lg transition-colors text-sm"
          >
            {t("checkout")}
          </Link>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 text-gray-400 p-8">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-2 animate-in zoom-in duration-300">
                <ShoppingCart className="w-10 h-10 text-gray-300" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-900">
                  {t("emptyCart") || "Your cart is empty"}
                </p>
                <p className="text-sm text-gray-500 max-w-[200px] mx-auto">
                  Looks like you haven't added anything to your cart yet.
                </p>
              </div>
              <button
                onClick={closeSidebar}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-black font-semibold rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
              >
                {t("startShopping")}
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 p-3 bg-white border rounded-lg hover:border-gray-300 transition-colors"
              >
                {/* Image */}
                <div className="relative w-24 h-24 bg-gray-50 rounded-md overflow-hidden shrink-0">
                  <Image
                    src={item.product?.imageCover}
                    alt={item.product?.title}
                    fill
                    className="object-contain p-2"
                    sizes="96px"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col flex-1 justify-between">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
                      {item.product?.title}
                    </h3>
                    <p className="text-sm font-bold text-gray-900">
                      {item.price.toLocaleString()} {t("currency")}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center bg-gray-100 rounded-lg border border-gray-200 shadow-sm h-8">
                      {item.count <= 1 ? (
                        <button
                          onClick={() => {
                            const id = item.product._id || item.product.id;
                            if (id) removeItem(id);
                          }}
                          className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-white rounded-l-lg transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            const id = item.product._id || item.product.id;
                            if (id) updateItemCount(id, item.count - 1);
                          }}
                          className="w-8 h-full flex items-center justify-center text-gray-600 hover:bg-white rounded-l-lg transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                      )}

                      <span className="w-8 text-center text-sm font-medium text-gray-900 bg-white h-full flex items-center justify-center border-x border-gray-200">
                        {item.count}
                      </span>
                      <button
                        onClick={() => {
                          const id = item.product._id || item.product.id;
                          if (id) updateItemCount(id, item.count + 1);
                        }}
                        className="w-8 h-full flex items-center justify-center text-gray-600 hover:bg-white rounded-r-lg transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        const id = item.product._id || item.product.id;
                        if (id) removeItem(id);
                      }}
                      className="text-xs text-gray-400 hover:text-red-500 underline decoration-gray-300 hover:decoration-red-500"
                    >
                      {t("remove")}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
