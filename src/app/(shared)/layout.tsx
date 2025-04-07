"use client";
import { usePathname } from "next/navigation";

function DynamicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const sharedRoutes = ["/profile"];
  return (
    <>
      <main className={sharedRoutes.includes(pathname) ? "pt-18" : ""}>{children}</main>
    </>
  );
}

export default DynamicLayout;
