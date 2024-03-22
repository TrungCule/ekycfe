import Header from "@/layouts/default/header";
import Navbar from "@/layouts/default/navbar";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <div className="flex-1 flex flex-col overflow-y-hidden">
        <Header>
          <Navbar />
        </Header>
      </div>
      <header>
        <h1>Welcome to Our Website</h1>
      </header>
    </div>
  );
}
