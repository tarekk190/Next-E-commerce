interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <h2 className="text-3xl md:text-5xl capitalize font-bold tracking-tight mb-8 text-center bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600 pb-2">
      {title}
    </h2>
  );
}
