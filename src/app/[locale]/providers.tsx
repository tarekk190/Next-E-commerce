import { SwiperProvider } from "@/app/context/SwiperContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";
import { CartLoadingProvider } from "@/components/providers/cart-loading-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <CartLoadingProvider>
        <WishlistProvider>
          <SwiperProvider>{children}</SwiperProvider>
        </WishlistProvider>
      </CartLoadingProvider>
    </CartProvider>
  );
}
