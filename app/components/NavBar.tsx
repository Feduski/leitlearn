"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";  // Quita la extensión .ts aquí

export default function NavBar() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Define una función async dentro del useEffect
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    
    // Llama a la función
    getSession();
    
    // Configura el listener para cambios en la autenticación
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  return (
    <nav className="bg-black p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/favicon.ico" alt="Logo" className="h-8 w-auto" />
          <span className="text-white font-bold text-xl">LeitLearn</span>
        </div>
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
          {session ? (
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
