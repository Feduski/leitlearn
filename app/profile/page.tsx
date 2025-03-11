"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-white text-center mt-8">Cargando...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900">
      <h1 className="text-2xl text-white mb-4">Bienvenido, {session?.user?.name}!</h1>
      <p className="text-white mb-4">Email: {session?.user?.email}</p>
      <button onClick={() => signOut()} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
        Cerrar sesión
      </button>
    </div>
  );
}