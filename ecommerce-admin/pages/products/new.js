import Layout from "@/components/layout";
import { useState } from "react";
export default function NewProduct() {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
  return (
    <Layout>
        <h1> New Product</h1>
        <label>Product name</label>
      <input type="text" placeholder="product name" value={title}/>
      <label>Description</label>
      <textarea placeholder='description' value={description}></textarea>
      <label>Price (in INR)</label>
      <input type="number" placeholder="price" value={price}/>
      <button className="btn-primary">Save</button>
    </Layout>
  );
}
