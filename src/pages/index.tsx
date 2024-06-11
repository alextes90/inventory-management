import Image from "next/image";
import { Inter } from "next/font/google";
import { InventoryScreen } from "@/screens/inventory";

const inter = Inter({ subsets: ["latin"] });

const InvetoryPage = () => {
  return (
    <div>
      <InventoryScreen />
    </div>
  );
};

export default InvetoryPage;
