// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GET_ALL_PRODUCT_PATH } from "@/constans";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const requestMethod = req.method;
  switch (requestMethod) {
    case "POST":
      console.log("make a POST call");
      break;
    case "GET":
      try {
        const response = await fetch(
          `${process.env.BASE_URL}/${GET_ALL_PRODUCT_PATH}`
        );
        if (response.status !== 200) {
          throw new Error("failed to fetch");
        }
        const data = await response.json();
        res.status(200).json(data);
      } catch (err) {
        res.status(400);
      }
      break;
  }
}
