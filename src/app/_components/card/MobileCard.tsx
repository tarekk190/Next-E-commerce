import Image from "next/image";
import StarRating from "./StarRating";
import { Plus } from "lucide-react";

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price?: number;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  [key: string]: any;
}

interface MobileCardProps {
  product: Product;
}

export default function MobileCard({ product }: MobileCardProps) {
  return (
    <div className="flex flex-col gap-2 bg-white rounded-xl overflow-hidden px-1 py-1">
      {/* Image Container */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-50">
        <Image
          src={product.imageCover}
          alt={product.title || "Product"}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-contain p-2 mix-blend-multiply"
          loading="lazy"
        />

        {/* Mobile Add to Cart */}
        <button className="absolute bottom-2 end-2 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-sm active:scale-95 transition-transform z-10">
          <Plus size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-0.5 px-1">
        <h3
          className="text-sm font-bold text-black line-clamp-1"
          title={product.title}
        >
          {product.title?.split(" ").slice(0, 3).join(" ") || "Product"}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-red-500 font-bold text-sm">
            {product.price ? `${product.price} EGP` : "$0"}
          </span>
          <div className="scale-90 origin-right rtl:origin-left">
            <StarRating
              rating={product.ratingsAverage ?? 4.5}
              count={product.ratingsQuantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
