import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  async function saveProduct(ev) {
    // this will prevent the browser from reloading the page when the product is created and updated with the new information in the database
    ev.preventDefault();
    const data = {
      title,
      description,
      price,
    };
    if (_id) {
      //   update product
      console.log("updating the product");
      await axios.put("/api/products", {
        ...data,
        _id,
      });
    } else {
      // create product
      console.log("creating new product");
      const data = {
        title,
        description,
        price,
      };
      await axios.post("/api/products", data);
    }
    // when we create a new product then we need to come back to the add new product page.
    setGoToProducts(true);
  }
  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await fetch('/api/upload',{
      method: 'POST',
      body: data,
      });
      console.log(res);
    }
  }
  if (goToProducts) {
    router.push("/products");
  }
  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => {
          setTitle(ev.target.value);
        }}
      />
      <label>Photos</label>
      <div className="mb-2">
        <label className="w-28 h-28 border items-center text-center flex flex-col justify-center text-gray-500 font-semibold hover:text-white hover:bg-blue-900 rounded-lg bg-gray-300 delay-200 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
        {!images?.length && (
          <div className="text-red-600 font-semibold">
            **No images of this product.
          </div>
        )}
      </div>
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => {
          setDescription(ev.target.value);
        }}
      ></textarea>
      <label>Price (in INR)</label>
      <input
        type="text"
        placeholder="price"
        value={price}
        onChange={(ev) => {
          setPrice(ev.target.value);
        }}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
