import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  HelpCircle,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  CreditCard,
  Smartphone,
  Wallet,
} from "lucide-react";
import SocialLinks from "@/components/social-links/SocialLinks";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-white border-t border-gray-100 font-sans cursor-default">
      {/* 1. Top Support Bar */}
      <div className="bg-white border-b border-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-start">
            <h3 className="text-lg font-bold text-gray-900">{t("help")}</h3>
            <p className="text-sm text-gray-500 mt-1">{t("reachOut")}</p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 md:gap-12 w-full sm:w-auto">
            <div className="flex items-center gap-3 w-full sm:w-auto justify-start sm:justify-center px-4 sm:px-0">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400 shrink-0">
                <HelpCircle size={20} />
              </div>
              <div className="flex flex-col text-start">
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                  {t("helpCenter")}
                </span>
                <span className="text-sm font-bold text-gray-900 hover:underline cursor-pointer break-all">
                  <Link href="mailto:tarek.helal.div@gmail.com" target="_blank">
                    tarek.helal.div@gmail.com
                  </Link>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-start sm:justify-center px-4 sm:px-0">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400 shrink-0">
                <Mail size={20} />
              </div>
              <div className="flex flex-col text-start">
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                  {t("emailSupport")}
                </span>
                <span className="text-sm font-bold text-gray-900 hover:underline cursor-pointer break-all">
                  <Link href="mailto:muhammadfawzei@gmail.com" target="_blank">
                    tatrkhelal@gmail.com
                  </Link>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-start sm:justify-center px-4 sm:px-0">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400 shrink-0">
                <Phone size={20} />
              </div>
              <div className="flex flex-col text-start">
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                  {t("phoneSupport")}
                </span>
                <span className="text-sm font-bold text-gray-900 hover:underline cursor-pointer">
                  <Link href="tel:+201211188849" target="_blank">
                    01211188849
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Links Grid */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Column 1 */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm">
              {t("electronics")}
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/products?subcategory=6407f2f7b575d3b90bf957c4"
                  className="hover:underline cursor-pointer"
                >
                  Mobiles
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f305b575d3b90bf957c7"
                  className="hover:underline cursor-pointer"
                >
                  Tablets
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f3a8b575d3b90bf957e2"
                  className="hover:underline cursor-pointer"
                >
                  Laptops
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f11eb575d3b90bf9577c"
                  className="hover:underline cursor-pointer"
                >
                  Home Appliances
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f3ccb575d3b90bf957eb"
                  className="hover:underline cursor-pointer"
                >
                  Camera, Photo & Video
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f39bb575d3b90bf957df"
                  className="hover:underline cursor-pointer"
                >
                  Televisions
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f32eb575d3b90bf957d0"
                  className="hover:underline cursor-pointer"
                >
                  Headphones
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f3c0b575d3b90bf957e8"
                  className="hover:underline cursor-pointer"
                >
                  Video Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm">
              {t("fashion")}
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/products?category=6439d58a0049ad0b52b9003f"
                  className="hover:underline cursor-pointer"
                >
                  Women's Fashion
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=6439d5b90049ad0b52b90048"
                  className="hover:underline cursor-pointer"
                >
                  Men's Fashion
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f219b575d3b90bf957a9"
                  className="hover:underline cursor-pointer"
                >
                  Girls' Fashion
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f219b575d3b90bf957a9"
                  className="hover:underline cursor-pointer"
                >
                  Boys' Fashion
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f1e1b575d3b90bf9579d"
                  className="hover:underline cursor-pointer"
                >
                  Watches
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f1ecb575d3b90bf957a0"
                  className="hover:underline cursor-pointer"
                >
                  Jewellery
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f208b575d3b90bf957a6"
                  className="hover:underline cursor-pointer"
                >
                  Women's Handbags
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f1fdb575d3b90bf957a3"
                  className="hover:underline cursor-pointer"
                >
                  Men's Eyewear
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm">
              {t("homeKitchen")}
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/products?subcategory=6407f198b575d3b90bf95794"
                  className="hover:underline cursor-pointer"
                >
                  Kitchen & Dining
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f154b575d3b90bf95788"
                  className="hover:underline cursor-pointer"
                >
                  Bedding
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f154b575d3b90bf95788"
                  className="hover:underline cursor-pointer"
                >
                  Bath
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f188b575d3b90bf95791"
                  className="hover:underline cursor-pointer"
                >
                  Home Decor
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f11eb575d3b90bf9577c"
                  className="hover:underline cursor-pointer"
                >
                  Home Appliances
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f163b575d3b90bf9578b"
                  className="hover:underline cursor-pointer"
                >
                  Tools & Home Improvement
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=6439d3e067d9aa4ca97064c3"
                  className="hover:underline cursor-pointer"
                >
                  Patio, Lawn & Garden
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=6439d3e067d9aa4ca97064c3"
                  className="hover:underline cursor-pointer"
                >
                  Storage
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm">
              {t("beauty")}
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/products?subcategory=6407f08bb575d3b90bf9576a"
                  className="hover:underline cursor-pointer"
                >
                  Fragrance
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f098b575d3b90bf9576d"
                  className="hover:underline cursor-pointer"
                >
                  Make-up
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f0a3b575d3b90bf95770"
                  className="hover:underline cursor-pointer"
                >
                  Haircare
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f0b1b575d3b90bf95773"
                  className="hover:underline cursor-pointer"
                >
                  Skincare
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f0bfb575d3b90bf95776"
                  className="hover:underline cursor-pointer"
                >
                  Personal Care
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=6439d30b67d9aa4ca97064b1"
                  className="hover:underline cursor-pointer"
                >
                  Tools & Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=6439d30b67d9aa4ca97064b1"
                  className="hover:underline cursor-pointer"
                >
                  Men's Grooming
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f0cbb575d3b90bf95779"
                  className="hover:underline cursor-pointer"
                >
                  Health Care Essentials
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5 */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm">
              {t("kidsBaby")}
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/products?subcategory=6407efeab575d3b90bf9575b"
                  className="hover:underline cursor-pointer"
                >
                  Strollers, Prams & Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407efeab575d3b90bf9575b"
                  className="hover:underline cursor-pointer"
                >
                  Car Seats
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=6439d40367d9aa4ca97064cc"
                  className="hover:underline cursor-pointer"
                >
                  Baby Clothing
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407efdab575d3b90bf95758"
                  className="hover:underline cursor-pointer"
                >
                  Feeding
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407efcab575d3b90bf95755"
                  className="hover:underline cursor-pointer"
                >
                  Bathing & Skincare
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f00cb575d3b90bf95761"
                  className="hover:underline cursor-pointer"
                >
                  Diapering
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f019b575d3b90bf95764"
                  className="hover:underline cursor-pointer"
                >
                  Baby & Toddler Toys
                </Link>
              </li>
              <li>
                <Link
                  href="/products?subcategory=6407f019b575d3b90bf95764"
                  className="hover:underline cursor-pointer"
                >
                  Toys & Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 6 (Top Brands & Discover) */}
          <div className="space-y-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm">
                {t("topBrands")}
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link
                    href="/brands"
                    className="hover:underline cursor-pointer"
                  >
                    Apple
                  </Link>
                </li>
                <li>
                  <Link
                    href="/brands"
                    className="hover:underline cursor-pointer"
                  >
                    Samsung
                  </Link>
                </li>
                <li>
                  <Link
                    href="/brands"
                    className="hover:underline cursor-pointer"
                  >
                    Nike
                  </Link>
                </li>
                <li>
                  <Link
                    href="/brands"
                    className="hover:underline cursor-pointer"
                  >
                    Ray-Ban
                  </Link>
                </li>
                <li>
                  <Link
                    href="/brands"
                    className="hover:underline cursor-pointer"
                  >
                    Tefal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/brands"
                    className="hover:underline cursor-pointer"
                  >
                    L'Oreal Paris
                  </Link>
                </li>
                <li>
                  <Link
                    href="/brands"
                    className="hover:underline cursor-pointer"
                  >
                    Skechers
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Connect & App Buttons */}
      <div className="bg-white py-8 px-4 sm:px-6 lg:px-8 border-t border-b border-gray-100">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <span className="font-bold text-gray-900 uppercase text-sm">
              {t("shopOnGo")}
            </span>
            <div className="flex items-center gap-3">
              {/* Mock App Store Buttons */}
              <button className="bg-black text-white px-4 py-1.5 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors cursor-pointer">
                <Smartphone size={20} />
                <div className="text-start flex flex-col leading-none">
                  <span className="text-[10px] uppercase">Download on the</span>
                  <span className="text-sm font-bold">App Store</span>
                </div>
              </button>
              <button className="bg-black text-white px-4 py-1.5 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors cursor-pointer">
                <Smartphone size={20} />
                <div className="text-start flex flex-col leading-none">
                  <span className="text-[10px] uppercase">Get it on</span>
                  <span className="text-sm font-bold">Google Play</span>
                </div>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <span className="font-bold text-gray-900 uppercase text-sm">
              {t("connectWithUs")}
            </span>
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* 4. Bottom Copyright & Payments */}
      <div className="bg-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; 2026 Omnibuy. {t("rightsReserved")}</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded border border-gray-200">
              <CreditCard size={16} className="text-blue-600" />{" "}
              <span className="font-bold text-blue-600">VISA</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded border border-gray-200">
              <CreditCard size={16} className="text-red-500" />{" "}
              <span className="font-bold text-red-600">MasterCard</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded border border-gray-200">
              <span className="font-bold text-green-600 flex items-center gap-2">
                <Wallet size={16} className="text-green-600" /> Cash
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <Link href="#" className="hover:underline">
              {t("careers")}
            </Link>
            <Link href="#" className="hover:underline">
              {t("warranty")}
            </Link>
            <Link href="#" className="hover:underline">
              {t("sellWithUs")}
            </Link>
            <Link href="/conditions-of-use" className="hover:underline">
              {t("conditions")}
            </Link>
            <Link href="/privacy-notice" className="hover:underline">
              {t("privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
