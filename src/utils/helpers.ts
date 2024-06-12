import { InventoryItem, Product } from "@/models";

export const dedublicateItems = (
  inventoryData: InventoryItem[],
  productData: Product[]
) => {
  const resultArr = [...inventoryData];
  const inventoryDataNames = inventoryData.map((el) => el.name);

  productData.forEach((el) => {
    if (!inventoryDataNames.includes(el.name)) {
      resultArr.push({
        name: el.name,
        quantity: 0,
      });
    }
  });

  return resultArr;
};
