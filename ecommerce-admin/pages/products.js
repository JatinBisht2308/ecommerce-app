import Layout from "@/components/layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
      console.log(products);
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
      <table className="basic">
        <thead>
            <tr>
                <td>Product name</td>
                <td>Description</td>
                <td>Price</td>
            </tr>
        </thead>
        <tbody>
            {products.map((product) => {
                 return(
                    <tr>
                        <td>{product.title}</td>
                        <td>
                            <button>
                                {product.description}
                            </button>
                        </td>
                        <td>&#8377;&nbsp;{product.price}&nbsp;&nbsp;</td>
                    </tr>
                 )
            })}
        </tbody>
      </table>
    </Layout>
  );
}
