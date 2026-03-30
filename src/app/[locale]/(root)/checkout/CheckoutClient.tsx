"use client";

import CheckoutForm from "@/features/checkout/components/CheckoutForm";
import { useCart } from "@/context/CartContext";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";

export default function CheckoutClient() {
  const t = useTranslations("Cart");
  const { cartItems, totalCartPrice, loading } = useCart();
  const [cartId, setCartId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCartId = async () => {
      try {
        const { getCart } = await import("@/app/api/cart");
        const res = await getCart();
        if (res?.data?._id) {
          setCartId(res.data._id);
        } else if (!loading && cartItems.length === 0) {
          router.push("/cart");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCartId();
  }, [loading, cartItems.length, router]);

  if (loading || !cartId) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-8">{t("checkout") || "Checkout"}</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CheckoutForm cartId={cartId} />
        </div>

        <div>
          <div className="bg-gray-50 p-6 rounded-lg sticky top-24 border border-gray-200">
            <h2 className="text-lg font-bold mb-4">
              {t("total") || "Order Summary"}
            </h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{t("subtotal")}</span>
                <span>
                  {totalCartPrice} {t("currency")}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
              <span>{t("total")}</span>
              <span className="text-red-700">
                {totalCartPrice} {t("currency")}
              </span>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              By placing your order, you agree to Omnibuy's privacy notice and
              conditions of use.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
