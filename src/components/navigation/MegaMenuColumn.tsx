"use client";

import Link from "next/link";
import { SubCategory } from "@/types/category";

interface MegaMenuColumnProps {
  title?: string;
  items: SubCategory[];
  onItemClick?: () => void;
}

export default function MegaMenuColumn({
  title,
  items,
  onItemClick,
}: MegaMenuColumnProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="flex flex-col space-y-2">
      {title && (
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
          {title}
        </h3>
      )}
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item._id}>
            <Link
              href={`/products?subcategory=${item._id}`}
              className="text-sm text-gray-600 hover:text-amber-600 hover:translate-x-1 transition-all duration-200 block py-1"
              onClick={onItemClick}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
