"use client";

import { getUserOrders } from "@/services/api/orders";
import { Loader2, PackageX, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import OrderCard from "@/features/orders/components/OrderCard";
import { Link } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

export default function OrdersClient() {
  const t = useTranslations("AccountPage.orders");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const showSuccess = searchParams.get("success") === "true";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getUserOrders();

        if (Array.isArray(res)) {
          setOrders(res);
        } else if (res?.data && Array.isArray(res.data)) {
          setOrders(res.data);
        } else if (res?.status === "fail") {
          setError(res.message);
        } else {
          console.log("Unexpected orders response:", res);
          setOrders([]);
        }
      } catch (err) {
        setError("Failed to fetch orders");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">
          {t("title") || "Your Orders"}
        </h1>
        <div className="bg-red-50 text-red-600 p-4 rounded-md inline-block">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {showSuccess && (
        <div className="mb-6 bg-green-50 text-green-700 border border-green-200 rounded-xl p-4 flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-lg">
                Order placed successfully
              </h3>
              <p className="text-sm text-green-600/90">
                Your payment has been completed.
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              (e.target as HTMLElement).closest(".bg-green-50")?.remove();
            }}
            className="text-green-500 hover:text-green-700 p-1"
          >
            <span className="sr-only">Dismiss</span>
            &times;
          </button>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <div className="bg-gray-100 p-6 rounded-full">
            <PackageX className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-medium text-gray-900">
            You have no orders yet.
          </h2>
          <p className="text-gray-500 max-w-md">
            Start shopping to place your first order.
          </p>
          <Link
            href="/products"
            className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-8 rounded-md shadow-sm transition-colors"
          >
            Go to Products
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
