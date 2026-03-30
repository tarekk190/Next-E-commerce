"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface OrderItem {
  _id: string;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    category: {
      name: string;
    };
  };
  price: number;
  count: number;
}

interface Order {
  _id: string;
  createdAt: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  cartItems: OrderItem[];
  shippingAddress?: {
    city: string;
    details: string;
    phone: string;
  };
}

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const t = useTranslations("AccountPage.orders");
  const date = new Date(order.createdAt).toLocaleDateString("en-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap gap-4 justify-between items-center text-sm text-gray-600">
        <div className="flex gap-8">
          <div>
            <span className="block text-xs uppercase font-medium">
              Order Placed
            </span>
            <span className="text-gray-900 font-medium">{date}</span>
          </div>
          <div>
            <span className="block text-xs uppercase font-medium">Total</span>
            <span className="text-gray-900 font-medium">
              {order.totalOrderPrice} EGP
            </span>
          </div>
          <div className="hidden sm:block">
            <span className="block text-xs uppercase font-medium">Ship To</span>
            <span
              className="text-cyan-700 truncate max-w-[150px] block"
              title={order.shippingAddress?.details}
            >
              {order.shippingAddress?.city || "Address"}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="block text-xs uppercase font-medium">
            Order # {order._id.slice(-6).toUpperCase()}
          </span>
          <Link
            href={`/allorders/${order._id}`}
            className="text-cyan-700 hover:underline"
          >
            View Order Details
          </Link>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Status Column */}
          <div className="sm:w-1/4">
            <h3 className="font-bold text-lg mb-1">
              {order.isDelivered ? "Delivered" : "Arriving Soon"}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Payment:{" "}
              <span className="font-medium capitalize">
                {order.paymentMethodType}
              </span>
            </p>
            <span
              className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                order.isPaid
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {order.isPaid ? "Paid" : "Payment Pending"}
            </span>
          </div>

          {/* Items Column */}
          <div className="flex-1 space-y-4">
            {order.cartItems.map((item) => (
              <div key={item._id} className="flex gap-4 items-start">
                <div className="relative w-20 h-20 shrink-0 border border-gray-100 rounded-md overflow-hidden">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-cyan-700 line-clamp-2 hover:underline cursor-pointer">
                    {item.product.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Qty: {item.count}
                  </p>
                  <div className="mt-2">
                    <button className="text-xs bg-yellow-400 hover:bg-yellow-500 border border-yellow-500 rounded-md px-3 py-1 text-gray-900 shadow-sm transition-colors">
                      Buy it again
                    </button>
                  </div>
                </div>
                <div className="font-bold text-gray-900 whitespace-nowrap">
                  {item.price} EGP
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
