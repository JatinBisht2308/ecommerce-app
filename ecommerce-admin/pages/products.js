import Layout from "@/components/layout";
import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";
export default function Products() {
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      console.log(response.data);
    });
  }, []);
  return (
    <Layout>
      <Link
        href={"/products/new"}
        className="bg-blue-900 text-white font-normal py-1 px-2 hover:text-white hover:bg-green-700 rounded-sm"
      >
        Add new product
      </Link>
    </Layout>
  );
}
