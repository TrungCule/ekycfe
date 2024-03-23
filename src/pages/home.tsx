import Header from '@/layouts/default/header';
import Navbar from '@/layouts/default/navbar';
// import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <div className="flex flex-col flex-1 overflow-y-hidden">
        <Header>
          <Navbar />
        </Header>
      </div>
      <header>
        <h1 className="text-center">Welcome to Our Website</h1>
      </header>
    </div>
  );
}
