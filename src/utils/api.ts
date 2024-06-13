import {
  BASE_URL,
  GET_ALL_PRODUCT_PATH,
  INVENTORY_PATH,
  PRODUCT_PATH,
  RESET_INVENTIRY_PATH,
} from "@/constans";
import { InventoryItem } from "@/models";

export const getIventoryList = async () => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/${INVENTORY_PATH}`);
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
    const response = await fetch("/api/inventory");
    if (response.status !== 200) {
      throw new Error("failed to fetch");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getAllProductsGSSP = async () => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/${GET_ALL_PRODUCT_PATH}`
    );
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

export const resetInventory = async () => {
  try {
    const response = await fetch(`${BASE_URL}/${RESET_INVENTIRY_PATH}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
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

export const createProduct = async (name: FormDataEntryValue) => {
  try {
    const response = await fetch(`${BASE_URL}/${PRODUCT_PATH}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
    if (response.status !== 200) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.error);
    }
    const data = await response.json();

    return data;
  } catch (err) {
    throw err;
  }
};
