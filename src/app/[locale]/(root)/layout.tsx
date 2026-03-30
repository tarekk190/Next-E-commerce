import Footer from "@/app/_components/footer/footer";
import Navbar from "@/app/_components/navbar/Navbar";
import { getCategories, getSubCategories } from "@/app/api/getCategories";
import { cookies } from "next/headers";

import { verifyToken } from "@/lib/auth";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/app/_components/cart/CartSidebar";
import MobileBackButton from "@/app/_components/navigation/MobileBackButton";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categoryData = getCategories();
  const subCategoryData = getSubCategories();

  const [
    { data: categories } = { data: [] },
    { data: subCategories } = { data: [] },
  ] = await Promise.all([categoryData, subCategoryData]);

  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  let userName = null;

  if (token?.value) {
    const decoded = verifyToken(token.value);
    if (decoded) {
      userName = decoded.name;
    }
  }

  return (
    <>
      {/* S Navbar */}
      <CartProvider>
        <MobileBackButton />
        <Navbar
          categories={categories}
          subCategories={subCategories}
          token={token?.value}
          userName={userName || undefined}
        />
        {/* E Navbar */}
        {/* S Children */}
        {children}
        {/* E Children */}
        {/* S Footer */}
        <Footer />
        {/* E Footer */}
        <CartSidebar />
      </CartProvider>
    </>
  );
}
