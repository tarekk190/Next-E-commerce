"use client";

import { useCart } from "@/context/CartContext";
import { Link } from "@/i18n/routing";
import {
  Home,
  LayoutGrid,
  ShoppingCart,
  User
} from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

interface MobileBottomNavProps {
  onOpenCategories: () => void;
  onOpenAccount?: () => void;
  token?: string;
}

export default function MobileBottomNav({
  onOpenCategories,
  onOpenAccount,
  token,
}: MobileBottomNavProps) {
  const pathname = usePathname();
  const t = useTranslations("Navbar");
  const { cartCount } = useCart();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 flex h-16 items-center justify-around border-t bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] lg:hidden">
      {/* Home */}
      <Link
        href="/"
        className={`flex flex-col items-center justify-center gap-1 ${
          isActive("/") ? "text-black" : "text-gray-500"
        }`}
      >
        <Home className="h-6 w-6" />
        <span className="text-[10px] font-medium">{t("home")}</span>
      </Link>

      {/* Categories */}
      <button
        onClick={onOpenCategories}
        className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-black"
      >
        <LayoutGrid className="h-6 w-6" />
        <span className="text-[10px] font-medium">{t("categories")}</span>
      </button>

      {/* Cart */}
      <Link
        href="/cart"
        className={`relative flex flex-col items-center justify-center gap-1 ${
          isActive("/cart") ? "text-black" : "text-gray-500"
        }`}
      >
        <div className="relative">
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute -end-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[8px] text-white">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-medium">{t("cart")}</span>
      </Link>

      {/* Login / Account */}
      {!token ? (
        <Link
          href="/login"
          className={`flex flex-col items-center justify-center gap-1 ${
            isActive("/login") ? "text-black" : "text-gray-500"
          }`}
        >
          <User className="h-6 w-6" />
          <span className="text-[10px] font-medium">{t("login")}</span>
        </Link>
      ) : (
        <button
          onClick={onOpenAccount}
          className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-black"
        >
          <User className="h-6 w-6" />
          <span className="text-[10px] font-medium">
            {t("yourAccount") || "Account"}
          </span>
        </button>
      )}
    </div>
  );
}
