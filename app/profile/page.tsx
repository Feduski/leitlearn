"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<{ name: string; tier: string } | null>(null);
  const [isEditingName, setIsEditingName] = useState(false); 
  const [newName, setNewName] = useState(""); 
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      if (!data.session) {
        router.replace("/login");
      }
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        router.replace("/login");
      }
    });

    return () => listener?.subscription.unsubscribe();
  }, [router]);

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("name, tier")
        .eq("id", user.id)
        .single();
      if (!error) {
        setProfile(data);
        setNewName(data.name);
      }
    }
    fetchProfile();
  }, []);

  const handleNameUpdate = async () => {
    if (!newName.trim()) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({ name: newName })
      .eq("id", user.id);

    if (!error) {
      setProfile((prev) => (prev ? { ...prev, name: newName } : null));
      setIsEditingName(false);
    } else {
      alert("Error al actualizar el nombre");
    }
  };

  if (!session) {
    return <p className="text-white text-center mt-8">Cargando...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-950">
      <h1 className="text-2xl text-white mb-4">
        Bienvenido, {isEditingName ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
          />
        ) : (
          profile?.name
        )}
      </h1>
      <h1>Mi perfil - Tier: {profile?.tier}</h1>
      {isEditingName ? (
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleNameUpdate}
            className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
          >
            Guardar
          </button>
          <button
            onClick={() => setIsEditingName(false)}
            className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsEditingName(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded mt-4"
        >
          Editar nombre
        </button>
      )}
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.replace("/login");
        }}
        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded mt-4"
      >
        Cerrar sesión
      </button>
    </div>
  );
}