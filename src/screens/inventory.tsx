import { InventoryItem, Product } from "@/models";
import { resetInventory, updateInventory } from "@/utils/api";
import { useState } from "react";
import { InventoryList } from "./components/invetory-list";
import { Navigation } from "@/components/navigation";
import { MutatedItem } from "./components/mutated-item";
import { dedublicateItems } from "@/utils/helpers";
import { DEFAULT_PRODUCT_NAME } from "@/constans";
import { Loading } from "@/components/loading";

type Props = {
  repo: Repo;
};

type Repo = {
  inventoryData: InventoryItem[];
  productData: Product[];
  allItems: InventoryItem[];
};

export const InventoryScreen = ({ repo }: Props) => {
  const { productData: productList, inventoryData, allItems } = repo;
  const [oldInventoryList, setoldInventoryList] =
    useState<InventoryItem[]>(inventoryData);
  const [invetoryListValue, setInventoryListValue] =
    useState<InventoryItem[]>(allItems);
  const [changeItemName, setChangeItemName] = useState(DEFAULT_PRODUCT_NAME);
  const [changeItemQuant, setChangeItemQuant] = useState(0);
  const [requestUpdate, setRequestUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateInventoryHandler = async () => {
    let updateInventoryList: InventoryItem[];
    const curInventoryWithoutUpdatedItem = oldInventoryList.filter(
      (el) => el.name !== changeItemName
    );
    const oldQuantity = oldInventoryList.find(
      (el) => el.name === changeItemName
    )?.quantity;

    if ((oldQuantity || 0) === changeItemQuant) {
      setRequestUpdate(true);
      return;
    }
    if (changeItemQuant === 0) {
      updateInventoryList = curInventoryWithoutUpdatedItem;
    } else {
      updateInventoryList = [
        ...curInventoryWithoutUpdatedItem,
        { name: changeItemName, quantity: changeItemQuant },
      ];
    }
    setLoading(true);
    const response: InventoryItem[] = await updateInventory(
      updateInventoryList
    );
    const allItems = dedublicateItems(response, productList);
    setoldInventoryList(response);
    setInventoryListValue(allItems);
    setChangeItemName(DEFAULT_PRODUCT_NAME);
    setChangeItemQuant(0);
    setRequestUpdate(false);
    setLoading(false);
  };

  const resetInventoryHandler = async () => {
    setLoading(true);
    const response: [] = await resetInventory();
    const allItems = dedublicateItems(response, productList);
    setoldInventoryList(response);
    setInventoryListValue(allItems);
    setChangeItemName(DEFAULT_PRODUCT_NAME);
    setChangeItemQuant(0);
    setRequestUpdate(false);
    setLoading(false);
  };

  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className='relative'>
        <div className='w-fit m-auto'>
          <MutatedItem
            changeItemName={changeItemName}
            changeItemQuant={changeItemQuant}
            setChangeItemQuant={setChangeItemQuant}
            setRequestUpdate={setRequestUpdate}
          />
          <div className='flex justify-between py-[10px] w-[500px]'>
            <button
              className='tetx-center cursor-pointer border-blue-400 border-solid border-2 px-[15px]'
              onClick={() => {
                resetInventoryHandler();
              }}
            >
              Reset inventory
            </button>
            <div className='relative'>
              <p className='absolute -top-5 text-[8px] text-red-700'>
                {requestUpdate && "change quantity"}
              </p>
              <button
                className={`tetx-center cursor-pointer border-blue-400 border-solid border-2 px-[15px] ${
                  changeItemName === DEFAULT_PRODUCT_NAME ? "disabled" : ""
                }`}
                onClick={() => {
                  updateInventoryHandler();
                }}
                disabled={changeItemName === DEFAULT_PRODUCT_NAME}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div className='border-8 border-indigo-600 w-fit m-auto p-[20px]'>
          <InventoryList
            setChangeItemName={setChangeItemName}
            setChangeItemQuant={setChangeItemQuant}
            inventoryItemList={invetoryListValue}
            setRequestUpdate={setRequestUpdate}
          />
        </div>
        {loading && <Loading />}
      </main>
    </>
  );
};
