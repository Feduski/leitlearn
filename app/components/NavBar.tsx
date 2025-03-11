"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-black p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo e Identidad */}
        <div className="flex items-center gap-2">
          <img src="/favicon.ico" alt="Logo" className="h-8 w-auto" />
          <span className="text-white font-bold text-xl">LeitLearn</span>
        </div>
        {/* Enlaces de navegación */}
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
          <Link href="/pricing" className="text-gray-300 hover:text-white">
            Pricing
          </Link>
          {status === "loading" ? null : session ? (
            <>
              <Link href="/profile" className="text-gray-300 hover:text-white">
                Perfil
              </Link>
            </>
          ) : (
            <Link href="/login" className="text-gray-300 hover:text-white">
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
