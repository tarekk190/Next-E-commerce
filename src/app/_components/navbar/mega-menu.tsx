import { useProductFilter } from "@/features/products/hooks/useProductFilter";
import { Category } from "@/types/category";
import gsap from "gsap";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

export default function MegaMenu({
  isOpen,
  onClose,
  categories,
}: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null,
  );
  const { activeCategory: urlCategory, setCategory } = useProductFilter();
  const router = useRouter();

  // Set initial hovered category
  useEffect(() => {
    if (isOpen && categories.length > 0) {
   
      const match = categories.find((c) => c._id === urlCategory);
      if (match) {
        setHoveredCategoryId(match._id);
      } else {
        const firstWithSubs = categories.find(
          (c) => c.subcategories && c.subcategories.length > 0,
        );
        setHoveredCategoryId(firstWithSubs?._id || categories[0]?._id || null);
      }
    }
  }, [isOpen, categories, urlCategory]);

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        height: "auto",
        duration: 0.3,
        ease: "power2.out",
        visibility: "visible",
      });
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          if (menuRef.current) {
            menuRef.current.style.visibility = "hidden";
          }
        },
      });
    }
  }, [isOpen]);

  const activeCategory = categories.find((c) => c._id === hoveredCategoryId);

  // Find subcategory object if selected in URL
  const selectedSubCategory = activeCategory?.subcategories?.find(
    (sub) => sub._id === urlCategory,
  );

  const displayImage = activeCategory?.image;

  const handleSubCategoryClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setCategory(id);
  };

  const handleShopNow = () => {
    onClose();
    router.push(`/products?category=${urlCategory}`);
  };

  return (
    <div
      ref={menuRef}
      className="absolute start-0 top-full w-full bg-white shadow-xl z-50 border-t h-0 invisible overflow-hidden"
      onMouseLeave={onClose}
    >
      <div className="container mx-auto flex h-[500px]">
        {/* Left Sidebar */}
        <div className="w-1/4 h-full overflow-y-auto border-e border-gray-100 py-4 bg-gray-50/50">
          <ul className="space-y-1 px-4">
            {categories.map((category) => {
              const isActive = hoveredCategoryId === category._id;
              const hasActiveSub = category.subcategories?.some(
                (sub) => sub._id === urlCategory,
              );

              return (
                <li key={category._id}>
                  <button
                    className={`w-full text-start group flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white shadow-sm text-amber-600"
                        : "text-gray-700 hover:bg-gray-100 hover:text-black"
                    } ${hasActiveSub ? "ring-1 ring-amber-200 bg-amber-50" : ""}`}
                    onMouseEnter={() => {
                      setHoveredCategoryId(category._id);
                    }}
                  >
                    <span>{category.name}</span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isActive
                          ? "text-amber-600"
                          : "text-gray-400 group-hover:text-gray-600"
                      } rtl:rotate-180`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Content */}
        <div className="w-3/4 h-full overflow-y-auto p-8 bg-white relative">
          {activeCategory ? (
            activeCategory.subcategories &&
            activeCategory.subcategories.length > 0 ? (
              <div className="flex gap-8 h-full">
                {/* Subcategories Columns */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    {activeCategory.name}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                    {activeCategory.subcategories.map((sub) => {
                      const isSelected = urlCategory === sub._id;
                      return (
                        <button
                          key={sub._id}
                          onClick={(e) => handleSubCategoryClick(sub._id, e)}
                          className={`text-sm text-start transition-all duration-200 py-1 block hover:translate-x-1 rtl:hover:-translate-x-1 ${
                            isSelected
                              ? "font-bold text-black border-s-2 border-amber-500 ps-2"
                              : "text-gray-600 hover:text-amber-600"
                          }`}
                        >
                          {sub.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Featured Department Card */}
                <div className="w-1/3 shrink-0">
                  <div className="relative h-full w-full rounded-2xl overflow-hidden bg-gray-100 group">
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${selectedSubCategory ? "opacity-50" : "opacity-100"}`}
                    >
                      {activeCategory.image ? (
                        <Image
                          src={activeCategory.image}
                          alt={activeCategory.name}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
                          <span>No Image</span>
                        </div>
                      )}
                    </div>

                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                      <span className="text-sm font-medium opacity-80 mb-2 uppercase tracking-wider">
                        {selectedSubCategory
                          ? "Selected Department"
                          : "Featured Collection"}
                      </span>
                      <h4 className="text-2xl font-bold mb-4">
                        {selectedSubCategory
                          ? selectedSubCategory.name
                          : activeCategory.name}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full w-full flex relative rounded-2xl overflow-hidden group">
                {activeCategory.image ? (
                  <Image
                    src={activeCategory.image}
                    alt={activeCategory.name}
                    fill
                    sizes="(min-width: 1024px) 75vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-300 font-bold text-4xl">
                      {activeCategory.name}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-8 text-center">
                  <h3 className="text-4xl font-bold mb-4">
                    {activeCategory.name}
                  </h3>
                  <div className="flex gap-4">
                    {/* Interactive Button to Select in URL */}
                    <button
                      onClick={() => setCategory(activeCategory._id)}
                      className={`px-8 py-3 rounded-full font-bold transition-colors ${
                        urlCategory === activeCategory._id
                          ? "bg-amber-500 text-white"
                          : "bg-white text-black hover:bg-gray-200"
                      }`}
                    >
                      {urlCategory === activeCategory._id
                        ? "Selected"
                        : "Select Category"}
                    </button>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <p>Select a category to view departments</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
