import { InventoryItem, Product } from "@/models";
import { getAllProducts, getIventoryList, updateInventory } from "@/utils/api";
import { useEffect, useState } from "react";
import { InventoryList } from "./components/invetory-list";
import { Navigation } from "@/components/navigation";
import { MutatedItem } from "./components/mutated-item";

export const InventoryScreen = () => {
  const [oldInventoryList, setoldInventoryList] = useState<InventoryItem[]>([]);
  const [invetoryListValue, setInventoryListValue] = useState<InventoryItem[]>(
    []
  );
  const [changeItemName, setChangeItemName] = useState("choose product");
  const [changeItemQuant, setChangeItemQuant] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const [inventoryData, productData] = await Promise.all([
        getIventoryList(),
        getAllProducts(),
      ]);
      const productDataToInventory: InventoryItem[] = (
        productData as Product[]
      ).map((el) => {
        return { name: el.name, quantity: 0 };
      });
      //Filter get ALLProducts and add only if Inventory does not have suchName
      //Forbid to update with quontity 0, or if quantity soes not change
      // forbid to sase if name is chose product
      // forbid to add quantity if choose product
      //update on receiving data
      setoldInventoryList(inventoryData);
      setInventoryListValue([...inventoryData, ...productDataToInventory]);
    };
    getData();
  }, []);

  const updateInventoryHandler = async () => {
    const curInventoryWithoutUpdatedItem = oldInventoryList.filter(
      (el) => el.name !== changeItemName
    );
    const updateInventoryList = [
      ...curInventoryWithoutUpdatedItem,
      { name: changeItemName, quantity: changeItemQuant },
    ];
    const response = await updateInventory(updateInventoryList);
    console.log(response);
  };

  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <div className='w-fit m-auto'>
          <MutatedItem
            changeItemName={changeItemName}
            changeItemQuant={changeItemQuant}
            setChangeItemQuant={setChangeItemQuant}
          />
          <div className='flex justify-end py-[10px] w-[500px]'>
            <button
              className='tetx-center cursor-pointer border-blue-400 border-solid border-2 px-[10px]'
              onClick={() => {
                updateInventoryHandler();
              }}
            >
              Save
            </button>
          </div>
        </div>
        <div className='border-8 border-indigo-600 w-fit m-auto p-[20px]'>
          <InventoryList
            setChangeItemName={setChangeItemName}
            setChangeItemQuant={setChangeItemQuant}
            inventoryItemList={invetoryListValue}
          />
        </div>
      </main>
    </>
  );
};
