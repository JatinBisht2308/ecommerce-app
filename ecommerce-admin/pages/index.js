import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession();
  if(!session) {
     return (
      <div className='bg-blue-700 w-screen h-screen flex items-center'>
        <div className='w-full text-center'>
          <button className='bg-white py-2 px-4 rounded-lg' onClick={() => signIn('google')}>Login with Google</button>
        </div>
        </div>
    );
     }
    return <>
     <div className='bg-blue-900 w-screen h-screen flex items-center'>
        <div className='w-full text-center text-white'>
        Signed in as {session.user.email}
        <button onClick={() => signOut()} className='bg-white py-2 px-3 rounded-lg text-black ml-5'>Sign out</button>
        </div>
        </div>
      
    </>
  }
