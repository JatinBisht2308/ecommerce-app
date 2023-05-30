import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
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
