import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
export default function editProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const { productId } = router.query;
  useEffect(() => {
    if (!productId) return;
    axios.get("/api/products?productId=" + productId).then((response) => {
      console.log(response.data);
      setProduct(response.data);
    });
  }, [productId]);
  return (
    <Layout>
      <h1>Edit product</h1>
      {product && <ProductForm {...product} />}
    </Layout>
  );
}
