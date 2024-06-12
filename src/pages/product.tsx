import { Loading } from "@/components/loading";
import { Navigation } from "@/components/navigation";
import { createProduct } from "@/utils/api";
import { FormEvent, useState } from "react";

const PRODUCT_NAME = "product name";
const SUCCESS_RESPONSE = "Product name successfully added";

const ProductPage = () => {
  const [responseValue, setReponseValue] = useState("");
  const [loading, setLoading] = useState(false);

  const createProductHandler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      console.log(formData.get(PRODUCT_NAME));
      const value = formData.get(PRODUCT_NAME);
      if (!value) {
        setReponseValue("enter valid name");
        return;
      }
      setLoading(true);
      await createProduct(value);
      setReponseValue(SUCCESS_RESPONSE);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setReponseValue(err.message);
        setLoading(false);
      } else {
        console.error(err);
      }
    }
  };
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <form
          className='p-2 flex flex-col gap-1'
          onSubmit={(e) => {
            createProductHandler(e);
          }}
        >
          <p className='text-center'>Produt name</p>
          <input
            type='text'
            name={PRODUCT_NAME}
            className='border-2'
            onFocus={() => {
              setReponseValue("");
            }}
          />
          <br />
          <div className='flex justify-center'>
            <button className='cursor-pointer border-blue-400 border-solid border-2 p-2 w-[100px]'>
              Submit
            </button>
          </div>
        </form>
        {responseValue && (
          <div
            className={`text-center ${
              responseValue === SUCCESS_RESPONSE ? "success" : "error"
            }`}
          >
            {responseValue}
          </div>
        )}
        {loading && <Loading />}
      </main>
    </>
  );
};

export default ProductPage;
