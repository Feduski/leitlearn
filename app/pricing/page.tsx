"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { updateTier } from "../../lib/profiles";

export default function PricingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTier, setCurrentTier] = useState<string | null>(null); // Estado para el tier actual del usuario
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null); // Estado para el plan que está cargando
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);

      if (data.session) {
        const { data: userData } = await supabase.auth.getUser();
        if (userData?.user) {
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("tier")
            .eq("id", userData.user.id)
            .single();

          if (!error && profile) {
            setCurrentTier(profile.tier); // Guardar el tier actual del usuario
          }
        }
      }
    };

    checkSession();
  }, []);

  const handleTierChange = async (newTier: string) => {
    setLoadingPlan(newTier); 
    setSuccessMsg("");

    try {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        alert("Debes iniciar sesión para seleccionar un plan.");
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 5000));

      const error = await updateTier(data.user.id, newTier);
      if (error) {
        alert("Hubo un error al actualizar el plan. Intenta nuevamente.");
      } else {
        setSuccessMsg(`¡Tu plan se actualizó a ${newTier}!`);
        setCurrentTier(newTier);
      }
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error inesperado.");
    } finally {
      setLoadingPlan(null);
    }
  };

  const plans = [
    { name: "Basic", price: "$0 / mes", features: ["Acceso limitado a tarjetas", "Soporte básico", "Acceso a la comunidad"] },
    { name: "Pro", price: "$9.99 / mes", features: ["Acceso ilimitado a tarjetas", "Soporte prioritario", "Acceso a funciones avanzadas"] },
    { name: "God", price: "$19.99 / mes", features: ["Todo en Pro", "Consultas personalizadas", "Acceso anticipado a nuevas funciones"] },
  ];

  return (
    <div className="min-h-screen p-8 flex flex-col items-center text-white">
      <h1 className="text-4xl font-bold text-blue-400 mb-6">Planes y Precios</h1>
      {successMsg && <p className="text-green-400 mb-4">{successMsg}</p>}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.name} className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold text-blue-300 mb-2">{plan.name}</h2>
            <p className="text-gray-200 mb-4">{plan.price}</p>
            <ul className="text-gray-200 mb-4">
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button
              onClick={() => handleTierChange(plan.name)}
              disabled={loadingPlan === plan.name || currentTier === plan.name} // Deshabilitar si está cargando o si ya es el plan activo
              className={`${
                currentTier === plan.name
                  ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                  : "bg-white text-black hover:bg-gray-300"
              } font-medium transition-colors px-4 py-2 rounded-lg`}
            >
              {loadingPlan === plan.name
                ? "Procesando..."
                : currentTier === plan.name
                ? "Este es tu plan activo"
                : "Seleccionar"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}