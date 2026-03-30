export const categoryTranslations: Record<string, string> = {
  Music: "موسيقى",
  "Men's Fashion": "أزياء رجالي",
  "Women's Fashion": "أزياء نسائي",
  SuperMarket: "سوبر ماركت",
  "Baby & Toys": "أطفال وألعاب",
  Home: "المنزل",
  Books: "كتب",
  "Beauty & Health": "جمال وصحة",
  Mobiles: "موبايلات",
  Electronics: "إلكترونيات",
  Computers: "كمبيوتر",
  "Tools & Home Improvement": "أدوات وتحسين المنزل",
  Furniture: "أثاث",
  Kitchen: "مطبخ",
  Sports: "رياضة",
  "Video Games": "ألعاب فيديو"
};

export function getTranslatedCategory(name: string, locale: string): string {
  if (locale === "ar" && categoryTranslations[name]) {
    return categoryTranslations[name];
  }
  return name;
}
