import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
export default function deleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const { productId } = router.query;
  function goBack() {
    router.push("/products");
  }
  // fetch the product name using the productId
  useEffect(() => {
    if (!productId) {
      return;
    }
    axios.get("/api/products?productId=" + productId).then((res) => {
      setProductInfo(res.data);
    });
  }, [productId]);
  async function deleteProduct() {
    await axios.delete("/api/products?productId=" + productId);
    goBack();
  }
  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete the product&nbsp;
        <span className="bg-blue-300 rounded-md px-1 items-center">"{productInfo?.title}"</span>?
      </h1>
      <div className="gap-3 flex justify-center mt-8">
        <button 
        className="btn-delete"
        onClick={deleteProduct}
        >
          Yes
        </button>
        <button
          className="btn-notDelete"
          onClick={goBack}
        >
          No
        </button>
      </div>
    </Layout>
  );
}
