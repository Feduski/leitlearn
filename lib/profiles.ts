import { supabase } from "./supabaseClient";

export async function createProfile(userId: string, name: string) {
  const { error } = await supabase
    .from("profiles")
    .insert([{
      id: userId,
      name,
      tier: "Basic",
      tarjetas_maximas: 5,
      generaciones_maximas: 3,
    }]);
  return error;
}

export async function updateTier(userId: string, newTier: string) {
  let updateData: {
    tier: string;
    tarjetas_maximas?: number;
    generaciones_maximas?: number;
  } = { tier: newTier };

  if (newTier === "Basic") {
    updateData.tarjetas_maximas = 5;
    updateData.generaciones_maximas = 3;
  } else if (newTier === "Pro") {
    updateData.tarjetas_maximas = 10;
    updateData.generaciones_maximas = 5;
  } else if (newTier === "God") {
    updateData.tarjetas_maximas = 20;
    updateData.generaciones_maximas = 10;
  } else {
    throw new Error("Tier no reconocido");
  }

  const { error } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", userId);

  return error;
}

export async function decrementUsage(
  userId: string,
  usageType: "tarjetas" | "generaciones"
) {
  const field = usageType === "tarjetas" ? "tarjetas_maximas" : "generaciones_maximas";
  
  const { data: profile, error: getError } = await supabase
    .from("profiles")
    .select(field)
    .eq("id", userId)
    .single();

  if (getError) return getError;
  const currentCount = (profile as Record<"tarjetas_maximas" | "generaciones_maximas", any>)[field];

  if (currentCount <= 0) {
    return new Error(`No te quedan ${usageType === "tarjetas" ? "tarjetas" : "generaciones"} disponibles.`);
  }

  const updateData = usageType === "tarjetas"
    ? { tarjetas_maximas: currentCount - 1 }
    : { generaciones_maximas: currentCount - 1 };

  const { error } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", userId);

  return error;
}