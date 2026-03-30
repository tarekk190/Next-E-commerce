"use client";

import { useCartLoading } from "@/components/providers/cart-loading-provider";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface AddToCartButtonProps {
  productId: string;
  className?: string;
  children?: React.ReactNode;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  onClick?: () => void;
  showIcon?: boolean;
}

export default function AddToCartButton({
  productId,
  className = "",
  children,
  variant = "default",
  size = "default",
  onClick,
  showIcon = false,
}: AddToCartButtonProps) {
  const { isAddingToCart, setIsAddingToCart } = useCartLoading();
  const { addToCart } = useCart();
  const router = useRouter();
  const t = useTranslations("ProductCard");

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAddingToCart) return;

    if (onClick) {
      onClick();
      return;
    }

    try {
      setIsAddingToCart(true);
      const res = await addToCart(productId);

      if (res?.status === "success" || res?.message === "success") {
        toast.success(t("successAdd") || "Added to cart");
      } else {
        if (res?.message === "No token found") {
          toast.error("You must login first");
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        } else {
          toast.error(res?.message || "Failed to add product");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleAddToCart}
      disabled={isAddingToCart}
    >
      {isAddingToCart && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children || (showIcon ? t("add") : t("addToCart"))}
    </Button>
  );
}
