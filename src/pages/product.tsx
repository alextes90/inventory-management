import { Navigation } from "@/components/navigation";
import { getAllProducts } from "@/utils/api";
import { useEffect } from "react";

const ProductPage = () => {
  useEffect(() => {
    const getData = async () => {
      const data = await getAllProducts();
      console.log(data);
    };
    getData();
  }, []);
  return (
    <header>
      <Navigation />
    </header>
  );
};

export default ProductPage;
