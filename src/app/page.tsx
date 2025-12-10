import logo from '@/assets/logo.webp';
import popcorn from '@/assets/popcorn.webp';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineLiveTv } from "react-icons/md";

export default function Home() {
  return (
    <main>
      <header className='relative bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url("/img/background_image.jpg")] bg-center bg-cover py-92 h-screen flex flex-col gap-5 items-center justify-center'>
        <Image src={logo} height={320} width={320} alt='logo' />
        <h1 className='text-white text-5xl font-bold max-w-1/2 text-center'>All the movies you love. None of the complexity.</h1>
        <Link href='/popular-movies' className='mt-10 flex items-center gap-2 text-white px-5 py-3 rounded-3xl bg-red-600 text-xl hover:bg-red-700 transition-all duration-100'>
          <span className=''>Explore popular movies</span>
          <Image src={popcorn} height={32} width={32} alt='icon' className='rotate-15' />
        </Link>
        <Link href='/live-trending' className='flex items-center gap-2 text-white px-5 py-3 rounded-3xl bg-green-600 text-xl hover:bg-green-700 transition-all duration-100'>
          <span className=''>Live top 10 trending</span>
          <MdOutlineLiveTv className='text-3xl' />
        </Link>
      </header >
    </main>
  );
}
