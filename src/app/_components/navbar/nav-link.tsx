"use client";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface NavLinkProps extends React.ComponentProps<typeof Link> {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

export default function NavLink({
  children,
  className,
  activeClassName,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === props.href;

  return (
    <Link
      {...props}
      className={cn(
        "group relative text-sm font-medium transition-colors hover:text-black",
        isActive ? "text-black" : "text-gray-500",
        className,
        isActive && activeClassName,
      )}
    >
      {children}
      <span
        className={cn(
          "absolute -bottom-1 start-0 h-0.5 w-full bg-black transition-transform duration-300 ease-out origin-left rtl:origin-right",
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
    </Link>
  );
}
