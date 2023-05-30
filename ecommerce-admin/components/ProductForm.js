import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
export default function ProductForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();
  async function createProduct(ev) {
    // this will prevent the browser from reloading the page when the product is created and updated with the new information in the database
    ev.preventDefault();
    const data = {
      title,
      description,
      price,
    };
    await axios.post("/api/products", data);
    // when we create a new product then we need to come back to the add new product page.
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/products");
  }
  console.log(props.productInfo);
  return (
    <form onSubmit={createProduct}>
      <h1>{props.pageTitle}</h1>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={props.productInfo ? props.productInfo.title : title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Description</label>
      <textarea
        placeholder="description"
        value={props.productInfo ? props.productInfo.description : description}
        onChange={(ev) => setDescription(ev.target.value)}
      ></textarea>
      <label>Price (in INR)</label>
      <input
        type="text"
        placeholder="price"
        value={props.productInfo ? props.productInfo.price : price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
