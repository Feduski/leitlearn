"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-1">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Copyright */}
        <p className="text-sm mb-2 md:mb-0">
          © {new Date().getFullYear()} LeitLearn. Todos los derechos reservados.
        </p>

        {/* Enlaces del Footer */}
        <div className="flex space-x-4">
          <Link href="/privacy" className="hover:text-white text-sm">
            Política de Privacidad
          </Link>
          <Link href="/terms" className="hover:text-white text-sm">
            Términos y Condiciones
          </Link>
        </div>
      </div>
    </footer>
  );
}
