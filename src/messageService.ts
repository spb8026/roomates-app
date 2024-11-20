import { supabase } from "../lib/supabase";

export const sendMessage = async (houseCode: string, userId: string, content: string) => {
  const { data, error } = await supabase.from('Messages').insert([
    { house_code: houseCode, user_id: userId, content: content }
  ]);

  if (error) {
    throw error;
  }
  return data;
};
