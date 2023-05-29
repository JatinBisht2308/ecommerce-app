import Layout from "../components/layout";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  if (!session) return;
  return (
    <Layout>
      <div className="text-blue-900 flex w-100 justify-between">
        {/* below line means if there is something in session then go to user key and if there is something in user then pick the name from it */}
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex gap-2 font-medium bg-gray-300 text-black p-1 pr-2 items-center rounded-lg overflow-hidden">
          <img src={session?.user?.image} className="w-8 h-8 rounded-lg" />
          {session?.user?.name}
        </div>
      </div>
    </Layout>
  );
}
