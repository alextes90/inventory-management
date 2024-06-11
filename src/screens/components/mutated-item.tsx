import { InventoryItem } from "@/models";
import { useEffect, useState } from "react";

type Props = {
  changeItemName: string;
  changeItemQuant: number;
  setChangeItemQuant: React.Dispatch<React.SetStateAction<number>>;
};

export const MutatedItem = ({
  changeItemName,
  changeItemQuant,
  setChangeItemQuant,
}: Props) => {
  return (
    <div className='flex w-[500px] justify-between py-[30px] items-center'>
      <div className='text-center text-[10px] w-[200px]'>
        product name
        <div className='border-2 border-solid border-blue-400 p-[10px] text-[16px]'>
          {changeItemName}
        </div>
      </div>
      <div className='text-center text-[10px]'>
        quantity
        <div className='border-2 border-solid border-blue-400 w-[100px] p-[10px] text-center text-[16px]'>
          {changeItemQuant}
        </div>
      </div>
      <div>
        <div className='py-[2px] flex w-[100px] justify-around'>
          <button
            className='text-blue-800 text-[20px] font-bold cursor-pointer border-blue-400 border-solid border-2 px-[10px]'
            onClick={() => {
              setChangeItemQuant((prev: number) => prev + 1);
            }}
          >
            +
          </button>
          <button
            className={`text-blue-800 text-[20px] font-bold cursor-pointer border-blue-400 border-solid border-2 px-[10px] ${
              changeItemQuant <= 0 ? "disabled" : ""
            }`}
            onClick={() => {
              setChangeItemQuant((prev: number) => prev - 1);
            }}
            disabled={changeItemQuant <= 0}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};
