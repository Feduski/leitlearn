"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Función autoejecutable async dentro del useEffect
    const fetchSession = async () => {
      // Obtén la sesión actual
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      if (!data.session) {
        router.replace("/login");
      }
    };

    fetchSession();

    // Opcionalmente, escucha cambios en la sesión
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        router.replace("/login");
      }
    });

    return () => listener?.subscription.unsubscribe();
  }, [router]);

  if (!session) {
    return <p className="text-white text-center mt-8">Cargando...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900">
      <h1 className="text-2xl text-white mb-4">Bienvenido, {session.user.email}!</h1>
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.replace("/login");
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
}