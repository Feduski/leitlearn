import { supabase } from "./supabaseClient";

export async function createProfile(userId: string) {
  const { error } = await supabase
    .from("profiles")
    .insert([{
      id: userId,
    }]);
  return error;
}