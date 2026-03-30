"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  getCart,
  updateCartItemCount,
  removeCartItem,
  clearCart,
  applyCoupon,
} from "@/app/api/cart";
import { Trash2, ShoppingCart, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

interface CartItem {
  _id: string;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    ratingsAverage: number;
    id: string;
  };
  price: number;
  count: number;
}

interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export default function CartClient() {
  const t = useTranslations("Cart");
  const tCommon = useTranslations("Navbar");
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());
  const [coupon, setCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const router = useRouter();
  const { updateCartCount, clearClientCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    const res = await getCart();
    if (res?.status === "success" || res?.data) {
      setCart(res.data);
      updateCartCount();
    } else {
      setCart(null);
      updateCartCount();
    }
    setLoading(false);
  };

  const handleUpdateCount = async (id: string, newCount: number) => {
    if (newCount < 1) return;
    setUpdatingIds((prev) => new Set(prev).add(id));
    const res = await updateCartItemCount(id, newCount);
    if (res?.status === "success") {
      setCart(res.data);
      updateCartCount();
    }
    setUpdatingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleRemoveItem = async (id: string) => {
    setUpdatingIds((prev) => new Set(prev).add(id));
    const res = await removeCartItem(id);
    if (res?.status === "success") {
      setCart(res.data);
      updateCartCount();
    } else {
      fetchCart();
    }
    setUpdatingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const handleClearCart = () => {
    setIsClearModalOpen(true);
  };

  const confirmClearCart = async () => {
    setIsClearModalOpen(false);
    setLoading(true);
    try {
      await clearCart();
      setCart(null);
      await clearClientCart();
      window.location.reload();
    } catch (error) {
      console.error("Failed to clear cart:", error);
      setLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!coupon) return;
    setCouponMessage("Applying...");
    const res = await applyCoupon(coupon);
    console.log(res);
    if (res?.status === "success" || res?.message === "success") {
      setCouponMessage("Coupon applied successfully!");

      fetchCart();
    } else {
      setCouponMessage(res?.message || "Invalid coupon");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
      </div>
    );
  }

  if (!cart || cart.products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <ShoppingCart className="w-16 h-16 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold mb-2">{t("empty")}</h1>
        <Link
          href="/"
          className="text-cyan-700 hover:text-red-700 hover:underline"
        >
          {tCommon("home")}
        </Link>
      </div>
    );
  }

  const { products, totalCartPrice } = cart;
  const itemCount = products.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl bg-white min-h-screen relative">
      {/* Clear Cart Confirmation Modal */}
      {isClearModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 space-y-6 animate-in zoom-in-95 duration-200 border border-gray-100">
            <div className="text-center space-y-2">
              <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {t("clearConfirmTitle")}
              </h3>
              <p className="text-gray-500">{t("clearConfirmMessage")}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsClearModalOpen(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
              >
                {t("cancel")}
              </button>
              <button
                onClick={confirmClearCart}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors"
              >
                {t("confirm")}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Cart Items */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-end border-b border-gray-100 pb-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {t("title")}
            </h1>
            <button
              onClick={handleClearCart}
              className="text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              {t("clear")}
            </button>
          </div>

          <div className="space-y-8">
            {products.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row gap-6 border-b border-gray-100 pb-8 last:border-0 relative"
              >
                {updatingIds.has(item.product.id) && (
                  <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[1px]">
                    <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                  </div>
                )}

                {/* Image */}
                <div className="shrink-0">
                  <Link href={`/products/${item.product.id}`}>
                    <div className="relative w-32 h-32 sm:w-48 sm:h-48 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 group">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        fill
                        className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 128px, 192px"
                      />
                    </div>
                  </Link>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <Link
                        href={`/products/${item.product.id}`}
                        className="text-lg sm:text-xl font-medium text-gray-900 hover:text-amber-600 hover:underline line-clamp-2 transition-colors"
                      >
                        {item.product.title}
                      </Link>
                      <div className="text-green-600 font-medium bg-green-50 w-fit px-2 py-0.5 rounded text-xs uppercase tracking-wide">
                        In Stock
                      </div>
                      {/* Sold by */}
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900 shrink-0 tracking-tight">
                      {item.price.toLocaleString()}{" "}
                      <span className="text-sm font-medium text-gray-500 align-top">
                        {tCommon("currency")}
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-4">
                    {/* Quantity Control */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
                        <button
                          className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors disabled:opacity-50"
                          onClick={() =>
                            handleUpdateCount(item.product.id, item.count - 1)
                          }
                          disabled={item.count <= 1}
                        >
                          -
                        </button>
                        <span className="px-2 py-1.5 text-sm font-semibold w-10 text-center text-gray-900 border-x border-gray-100">
                          {item.count}
                        </span>
                        <button
                          className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                          onClick={() =>
                            handleUpdateCount(item.product.id, item.count + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>
                      <button
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="text-sm text-gray-500 hover:text-red-600 hover:underline transition-colors flex items-center gap-1"
                      >
                        {t("remove")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
            <div className="text-xl text-gray-800">
              {t("subtotal")} ({itemCount} {t("items")}):{" "}
              <span className="font-bold text-gray-900 text-2xl ml-1">
                {totalCartPrice.toLocaleString()} {tCommon("currency")}
              </span>
            </div>
          </div>
        </div>

        {/*  Summary - Sticky */}
        <div className="lg:w-80 shrink-0 space-y-6 lg:self-start lg:sticky lg:top-24">
          {/* Checkout Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            {/* Free shipping */}
            <div className="text-lg mb-6 text-gray-700">
              {t("cartSubtotal", { count: itemCount })}
              <div className="font-bold text-3xl text-gray-900 mt-1">
                {totalCartPrice.toLocaleString()}{" "}
                <span className="text-sm font-medium text-gray-500 align-top">
                  {tCommon("currency")}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full block text-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg py-3 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {t("checkout")}
            </Link>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
              <svg
                className="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
              Secure transaction
            </div>
          </div>

          {/* Coupon Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                ></path>
              </svg>
              {t("applyCoupon")}
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={t("couponPlaceholder")}
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-shadow"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-gray-900 hover:bg-black text-white rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!coupon}
              >
                {t("apply")}
              </button>
            </div>
            {couponMessage && (
              <div
                className={`text-sm mt-3 p-2 rounded-md flex items-center gap-2 ${couponMessage.includes("success") ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50"}`}
              >
                {couponMessage.includes("success") ? (
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                )}
                {couponMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
