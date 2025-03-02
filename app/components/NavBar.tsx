"use client";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-black p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo o ícono a la izquierda */}
        <div className="flex items-center gap-2">
          {/* Si tienes un logo en /public/logo.png */}
          <img
            src="/favicon.ico"
            alt="Logo"
            className="h-8 w-auto"
          />
        <span className="text-white font-bold text-xl">LeitLearn</span>
        </div>

        {/* Enlaces a la derecha */}
        <div className="flex items-center space-x-6 font-sans">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home :)
          </Link>
          <Link href="/study" className="text-gray-300 hover:text-white">
            Study, Now!
          </Link>
          <Link href="/howto" className="text-gray-300 hover:text-white">
            How To
          </Link>
        </div>
      </div>
    </nav>
  );
}
