import { InventoryItem, Product } from "@/models";
import { InventoryScreen } from "@/screens/inventory";
import { getAllProductsGSSP, getIventoryList } from "@/utils/api";
import { dedublicateItems } from "@/utils/helpers";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

type Repo = {
  inventoryData: InventoryItem[];
  productData: Product[];
  allItems: InventoryItem[];
};

export const getServerSideProps = (async () => {
  const [inventoryData, productData] = await Promise.all<
    [Promise<InventoryItem[]>, Promise<Product[]>]
  >([getIventoryList(), getAllProductsGSSP()]);

  const allItems = dedublicateItems(inventoryData, productData);

  const repo = { inventoryData, productData, allItems };

  return { props: { repo } };
}) satisfies GetServerSideProps<{ repo: Repo }>;

const InvetoryPage = ({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <InventoryScreen repo={repo} />
    </div>
  );
};

export default InvetoryPage;
