"use client";

import { useCart } from "@/context/CartContext";
import { Link, useRouter } from "@/i18n/routing";
import { createCashOrder, createCheckoutSession } from "@/services/api/orders";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CheckoutFormProps {
  cartId: string;
}

interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export default function CheckoutForm({ cartId }: CheckoutFormProps) {
  const t = useTranslations("Cart");
  const { updateCartCount } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddress>();

  const onSubmit = async (data: ShippingAddress) => {
    setIsLoading(true);
    try {
      if (paymentMethod === "cash") {
        const res = await createCashOrder(cartId, data);
        if (res.status === "success") {
          toast.success("Order placed successfully!");
          await updateCartCount();
          router.push("/allorders?success=true");
        } else {
          toast.error(res.message || "Failed to place order");
        }
      } else {
        const res = await createCheckoutSession(cartId, data);
        if (res.status === "success" && res.session?.url) {
          window.open(res.session.url, "_blank");
        } else {
          toast.error(res.message || "Failed to initiate checkout");
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Details (Street, Building)
            </label>
            <input
              type="text"
              {...register("details", {
                required: "Address details are required",
              })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="123 Main St, Apt 4B"
            />
            {errors.details && (
              <p className="text-red-500 text-xs mt-1">
                {errors.details.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^01[0125][0-9]{8}$/,
                  message: "Invalid Egyptian phone number",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="01xxxxxxxxx"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              {...register("city", { required: "City is required" })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Cairo"
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Payment Method</h2>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
              className="h-4 w-4 text-cyan-600 focus:ring-cyan-500"
            />
            <span className="font-medium text-gray-900">Cash on Delivery</span>
          </label>
          <label className="flex items-center space-x-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
              className="h-4 w-4 text-cyan-600 focus:ring-cyan-500"
            />
            <span className="font-medium text-gray-900">
              Credit Card (Online)
            </span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Link
          href="/cart"
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
        >
          Back to Cart
        </Link>
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-md font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Place Order
        </button>
      </div>
    </form>
  );
}
