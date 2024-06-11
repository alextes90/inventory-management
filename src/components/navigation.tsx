import { HOME_PAGE, PRODUCT_PAGE } from "@/constans";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav className='flex justify-between max-w-[600px] px-[50px] m-auto'>
      <Link
        href={HOME_PAGE}
        className={pathname === HOME_PAGE ? "isActive" : ""}
      >
        Inventory
      </Link>
      <Link
        href={PRODUCT_PAGE}
        className={pathname === PRODUCT_PAGE ? "isActive" : ""}
      >
        Product
      </Link>
    </nav>
  );
};
