import Layout from "@/components/layout";
import Link from "next/link";
export default function Products() {
  return <Layout>
    <Link href={'/products/new'} className="bg-blue-900 text-white font-normal py-1 px-2 hover:text-white hover:bg-green-700 rounded-sm">
        Add new product 
    </Link>
    </Layout>;
}
