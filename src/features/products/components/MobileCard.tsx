import AddToCartButton from "@/components/shared/product/add-to-cart";
import { Product } from "@/types/product";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface MobileCardProps {
  product: Product;
  className?: string;
}

export default function MobileCard({
  product,
  className = "",
}: MobileCardProps) {
  const t = useTranslations("ProductCard");

  return (
    <div
      className={`group relative flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 ${className}`}
    >
      {/* Image Container */}
      <div className="relative h-[180px] w-full bg-white overflow-hidden">
        <Link
          href={`/products/${product._id || product.id}`}
          className="block w-full h-full"
        >
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-contain w-full h-full text-transparent transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </Link>
        {/* Badge */}
        <div
          className={`absolute top-2 start-2 text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${
            product.priceAfterDiscount ? "bg-red-500" : "bg-blue-600"
          }`}
        >
          {product.priceAfterDiscount ? t("sale") : t("new")}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        <Link href={`/products/${product._id || product.id}`}>
          <h3
            className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight min-h-10"
            title={product.title}
          >
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto flex items-end justify-between gap-1 border-t border-gray-100 pt-2">
          {product.priceAfterDiscount ? (
            <div className="flex flex-col items-start">
              <span className="text-base font-bold text-red-600 whitespace-nowrap leading-none">
                {product.priceAfterDiscount.toLocaleString()}{" "}
                <span className="text-xs">{t("currency")}</span>
              </span>
              <span className="text-xs text-gray-400 line-through whitespace-nowrap mt-0.5">
                {product.price?.toLocaleString()} {t("currency")}
              </span>
            </div>
          ) : (
            <span className="text-base font-bold text-gray-900 whitespace-nowrap leading-none">
              {product.price?.toLocaleString()}{" "}
              <span className="text-xs">{t("currency")}</span>
            </span>
          )}

          <div className="flex items-center gap-0.5 mb-0.5">
            <div className="text-yellow-400 text-xs">★</div>
            <span className="text-xs font-medium text-gray-700">
              {product.ratingsAverage ?? 4.5}
            </span>
          </div>
        </div>

        <AddToCartButton
          productId={product._id || product.id!}
          className="w-full mt-2 bg-black active:scale-95 text-white text-xs py-2 rounded-lg font-medium transition-all"
          showIcon
        >
          {t("add")}
        </AddToCartButton>
      </div>
    </div>
  );
}
