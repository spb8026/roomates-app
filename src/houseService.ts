import { supabase } from "../lib/supabase";

export const createHouse = async (houseName: string) => {
  const { data, error } = await supabase
    .from('House')
    .insert([{ Name: houseName }]);

  if (error) {
    throw error;
  }

  return data;
};

export const joinHouse = async (houseCode: string) => {
  const { data, error } = await supabase
    .from('houses')
    .select('*')
    .eq('code', houseCode)
    .single();

  if (error) {
    throw error;
  }

  return data;
};
