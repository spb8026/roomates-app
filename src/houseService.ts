import { supabase } from "../lib/supabase";

export const createHouse = async (houseName: string) => {
  let { data, error } = await supabase
    .from('House')
    .insert([{ name: houseName }]).select();;
  if (error) {
    throw error;
  }

  return data;
};

