import { BASE_URL, GET_ALL_PRODUCT_PATH, INVENTORY_PATH } from "@/constans";
import { InventoryItem } from "@/models";

export const getIventoryList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/${INVENTORY_PATH}`);
    if (response.status !== 200) {
      throw new Error("failed to fetch");
    }
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/${GET_ALL_PRODUCT_PATH}`);
    if (response.status !== 200) {
      throw new Error("failed to fetch");
    }
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const updateInventory = async (body: InventoryItem[]) => {
  try {
    console.log(body);
    const response = await fetch(`${BASE_URL}/${INVENTORY_PATH}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.status !== 200) {
      throw new Error("error occurred while updating");
    }
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};
