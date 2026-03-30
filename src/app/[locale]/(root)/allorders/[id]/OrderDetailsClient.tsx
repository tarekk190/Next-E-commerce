"use client";

import { getUserOrders } from "@/services/api/orders";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Loader2,
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Calendar,
} from "lucide-react";
import { notFound } from "next/navigation";

interface OrderItem {
  _id: string;
  count: number;
  product: {
    imageCover: string;
    title: string;
    brand: { name: string };
    category: { name: string };
    ratingsAverage: number;
    id: string;
    price: number;
  };
  price: number;
}

interface Order {
  _id: string;
  createdAt: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  shippingAddress: {
    details: string;
    city: string;
    phone: string;
  };
  cartItems: OrderItem[];
}

export default function OrderDetailsClient({ id }: { id: string }) {
  const t = useTranslations("Cart");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await getUserOrders();

        if (Array.isArray(data)) {
          const foundOrder = data.find((o: Order) => o._id === id);
          if (foundOrder) {
            setOrder(foundOrder);
          } else {
            notFound();
          }
        } else {
          setError(data?.message || "Failed to fetch orders");
        }
      } catch (err) {
        setError("An error occurred while fetching the order");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {error || "Order not found"}
        </h1>
        <Link
          href="/allorders"
          className="text-cyan-700 hover:text-cyan-900 hover:underline flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <Link
            href="/allorders"
            className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            Order Details
            <span className="text-lg font-normal text-gray-500">
              #{order._id.slice(-6).toUpperCase()}
            </span>
          </h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/*  Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-gray-500" />
                Items ({order.cartItems?.length || 0})
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold
                ${order.isDelivered ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
              >
                {order.isDelivered ? "Delivered" : "Processing"}
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {order.cartItems?.map((item) => (
                <div key={item._id} className="p-6 flex gap-4 sm:gap-6">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-4">
                      <div>
                        <Link
                          href={`/products/${item.product.id}`}
                          className="text-lg font-medium text-gray-900 hover:text-amber-600 line-clamp-2 mb-1"
                        >
                          {item.product.title}
                        </Link>
                        <p className="text-sm text-gray-500 mb-1">
                          {item.product.brand?.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.count}
                        </p>
                      </div>
                      <div className="text-lg font-bold text-gray-900 shrink-0">
                        {item.price.toLocaleString()} EGP
                      </div>
                    </div>
                    <div className="mt-auto pt-2">
                      <Link
                        href={`/products/${item.product.id}`}
                        className="text-sm text-cyan-600 hover:underline"
                      >
                        Buy it again
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary & Info */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Items Total</span>
                <span>{order.totalOrderPrice.toLocaleString()} EGP</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>0 EGP</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg text-gray-900">
                <span>Total</span>
                <span>{order.totalOrderPrice.toLocaleString()} EGP</span>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              Shipping Address
            </h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="text-gray-900 font-medium whitespace-pre-wrap">
                {order.shippingAddress?.details}
              </p>
              <p>{order.shippingAddress?.city}</p>
              <p>{order.shippingAddress?.phone}</p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gray-500" />
              Payment Info
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Method</span>
                <span className="font-medium capitalize">
                  {order.paymentMethodType}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Status</span>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-semibold
                            ${order.isPaid ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                >
                  {order.isPaid ? "Paid" : "Unpaid"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Date
                </span>
                <span className="font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
