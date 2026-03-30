"use client";

import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Category } from "@/types/category";
import { getProducts } from "@/app/api/getProducts";
import { Product } from "@/types/product";
import Image from "next/image";

interface SearchBarProps {
  categories?: Category[];
  className?: string;
}

export default function SearchBar({
  categories = [],
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const t = useTranslations("Navbar");
  const tCategories = useTranslations("CategoryNames");

  const [isLoading, setIsLoading] = useState(false);

  // Fetch suggestions
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length > 1) {
        setIsLoading(true);
        setShowSuggestions(true);
        try {
          const params: any = { keyword: query, limit: 5 };
          if (selectedCategory) {
            params.categoryId = selectedCategory;
          }
          const result = await getProducts(params);
          setSuggestions(result?.data?.slice(0, 5) || []);
        } catch (error) {
          console.error("Failed to fetch suggestions:", error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, selectedCategory]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery ?? query;
    if (!finalQuery.trim()) return;

    const params = new URLSearchParams();
    params.set("keyword", finalQuery.trim());
    if (selectedCategory) params.set("category", selectedCategory);

    setShowSuggestions(false);
    router.push(`/products?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  return (
    <div
      ref={wrapperRef}
      className={cn("flex flex-1 max-w-2xl relative z-50 mx-4", className)}
    >
      <div className="flex w-full h-11 items-center rounded-full border border-gray-300 bg-white hover:border-amber-500 focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500 transition-all shadow-sm overflow-hidden">
        {/* Category Dropdown */}
        <div className="relative h-full flex items-center border-e border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors group">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-full pl-4 pr-8 bg-transparent text-sm text-gray-700 outline-none cursor-pointer appearance-none min-w-[120px] max-w-[150px] truncate"
            aria-label={t("selectCategory")}
          >
            <option value="">{t("allCategories") || "All"}</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {tCategories.has(cat.slug) ? tCategories(cat.slug) : cat.name}
              </option>
            ))}
          </select>
          <div className="absolute right-3 pointer-events-none text-gray-500 group-hover:text-gray-700">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Search Input */}
        <div className="flex-1 flex items-center h-full relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (query.trim().length > 1) setShowSuggestions(true);
            }}
            placeholder={t("searchPlaceholder") || "Search Omnibuy..."}
            className="w-full h-full px-4 text-sm text-gray-900 placeholder:text-gray-500 outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={() => handleSearch()}
          className="h-full px-6 bg-amber-400 hover:bg-amber-500 text-gray-900 transition-colors flex items-center justify-center border-l border-amber-500/20"
          aria-label={t("search")}
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Autocomplete Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              Loading...
            </div>
          ) : suggestions.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t("suggestions") || "Suggestions"}
              </div>
              {suggestions.map((product) => (
                <div
                  key={product._id || product.id}
                  onClick={() => {
                    setQuery(product.title);
                    handleSearch(product.title);
                  }}
                  className="flex items-center gap-4 px-4 py-2 hover:bg-amber-50 cursor-pointer transition-colors group"
                >
                  <div className="relative w-10 h-10 shrink-0 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate group-hover:text-amber-700">
                      {product.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.category?.name}
                    </p>
                  </div>
                  {product.price && (
                    <div className="text-sm font-bold text-gray-900 whitespace-nowrap">
                      ${product.price}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-gray-500">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
