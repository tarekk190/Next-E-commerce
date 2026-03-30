"use client";

import { Menu, ShoppingCart, User, LogOut } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";

import CategoriesMegaMenu from "@/components/navigation/CategoriesMegaMenu";
import MobileMenu from "./mobile-menu";
import NavLink from "./nav-link";
import SearchBar from "./search-bar";
import AccountDropdown from "./account-dropdown";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

import MobileBottomNav from "./mobile-bottom-nav";
import MobileCategoriesDrawer from "@/components/navigation/MobileCategoriesDrawer";
import MobileAccountDrawer from "@/components/navigation/MobileAccountDrawer";
import { Category, SubCategory } from "@/types/category";
import { Signout } from "@/app/api/auth/signout";
import { useCart } from "@/context/CartContext";

interface NavbarProps {
  categories: Category[];
  subCategories: SubCategory[];
  token?: string;
  userName?: string;
}

export default function Navbar({
  categories: initialCategories = [],
  subCategories = [],
  token,
  userName,
}: NavbarProps) {
  const t = useTranslations("Navbar");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [isAccountDrawerOpen, setIsAccountDrawerOpen] = useState(false);
  const { cartCount } = useCart();

  // Merge logic
  const categories = useMemo(() => {
    return initialCategories.map((cat) => ({
      ...cat,
      subcategories: subCategories.filter((sub) => sub.category === cat._id),
    }));
  }, [initialCategories, subCategories]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/*  Mobile Menu & Logo */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-md">
                <Image
                  src="/images/logo/logo.webp"
                  alt={t("brand")}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">
                {t("brand")}
              </span>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 h-full">
            <NavLink href="/">{t("home")}</NavLink>
            <NavLink href="/products">{t("products")}</NavLink>
            {/* Mega Menu Trigger */}
            <CategoriesMegaMenu />

            <NavLink href="/brands">{t("brands")}</NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <SearchBar categories={categories} className="hidden lg:flex" />
            <LanguageSwitcher />

            <Link
              href="/cart"
              className="hidden lg:flex relative p-2 text-gray-600 hover:text-black transition-all duration-200 hover:scale-110"
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <h3 className="text-sm font-medium">{t("cart")}</h3>
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-2 -end-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            {!token ? (
              <Link
                href="/login"
                className="hidden lg:flex p-2 text-gray-600 hover:text-black transition-all duration-200 hover:scale-110"
              >
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <div className="flex flex-col items-start leading-none -space-y-0.5">
                    <h3 className="text-sm font-bold">{t("login")}</h3>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="hidden lg:flex relative group/account py-2 cursor-pointer">
                <div className="flex items-center gap-1 text-gray-600 hover:text-black transition-colors">
                  <div className="flex flex-col items-start leading-none -space-y-0.5">
                    <span className="text-[10px] text-gray-500 font-normal">
                      {t("hello", { name: userName || "User" })}
                    </span>
                    <div className="flex items-center gap-0.5">
                      <h3 className="text-sm font-bold">{t("accountLists")}</h3>
                      <LogOut className="h-3 w-3 rotate-90" />{" "}
                    </div>
                  </div>
                </div>
                <AccountDropdown />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden px-4 pb-3 border-t pt-3">
          <SearchBar
            categories={categories}
            className="mx-0 w-full max-w-none"
          />
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          onOpenCategories={() => {
            setIsMobileMenuOpen(false);
            setIsCategoryDrawerOpen(true);
          }}
        />
      </header>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        onOpenCategories={() => setIsCategoryDrawerOpen(true)}
        onOpenAccount={() => setIsAccountDrawerOpen(true)}
        token={token}
      />

      {/* Mobile Categories Drawer */}
      <MobileCategoriesDrawer
        isOpen={isCategoryDrawerOpen}
        onClose={() => setIsCategoryDrawerOpen(false)}
        categories={categories}
      />

      {/* Mobile Account Drawer */}
      <MobileAccountDrawer
        isOpen={isAccountDrawerOpen}
        onClose={() => setIsAccountDrawerOpen(false)}
        userName={userName}
      />
    </>
  );
}
