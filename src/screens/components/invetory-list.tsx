import { InventoryItem } from "@/models";

type Props = {
  inventoryItemList: InventoryItem[];
  setChangeItemName: (item: string) => void;
  setChangeItemQuant: (item: number) => void;
  setRequestUpdate: (bool: boolean) => void;
};
export const InventoryList = ({
  inventoryItemList,
  setChangeItemName,
  setChangeItemQuant,
  setRequestUpdate,
}: Props) => {
  return (
    <>
      <div className='flex justify-between min-w-[500px] font-bold'>
        <p>Name</p>
        <p>Quantity</p>
      </div>
      {inventoryItemList.map((el) => (
        <div
          key={el.name}
          className='flex justify-between min-w-[300px] cursor-pointer hover:bg-sky-100 p-[5px]'
          onClick={() => {
            setChangeItemName(el.name);
            setChangeItemQuant(el.quantity);
            setRequestUpdate(false);
          }}
        >
          <p>{el.name}</p>
          <p className='pr-[5px]'>{el.quantity}</p>
        </div>
      ))}
    </>
  );
};
