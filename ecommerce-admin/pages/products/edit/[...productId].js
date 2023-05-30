import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
export default function editProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState({});
  const { productId } = router.query;
  console.log("asdfasdfasdf", productId);
  useEffect(() => {
    if(!productId) return;
    axios.get('/api/products?productId=' + productId).then((response) => {
      console.log(response.data);
      setProduct(response.data);
    });
  }, [productId]);
  return (
    <Layout>
     <ProductForm pageTitle={"Edit Product"} productInfo={product} />
    </Layout>
  );
}
