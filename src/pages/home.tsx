import Header from '@/layouts/default/header';
import Navbar from '@/layouts/default/navbar';
// import Link from "next/link";

export default function HomePage() {
  return (
    <div className="h-[100%]">
      <div className="flex flex-col flex-1 overflow-y-hidden">
        <Header>
          <Navbar />
        </Header>
      </div>
      <header className='h-[calc(100%-64px)]'>
        <h1 className="text-center flex items-center justify-center h-[100%]">Hello</h1>
      </header>
    </div>
  );
}
