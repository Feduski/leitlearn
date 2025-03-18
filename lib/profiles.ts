import { supabase } from "./supabaseClient";

export async function createProfile(userId: string, name: string) {
  const { error } = await supabase
    .from("profiles")
    .insert([{
      id: userId,
      name,
    }]);
  return error;
}

export async function updateTier(userId: string, newTier: string) {
  const { error } = await supabase
    .from("profiles")
    .update({ tier: newTier })
    .eq("id", userId);

  return error;
}