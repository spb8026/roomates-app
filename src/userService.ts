import { supabase } from "../lib/supabase";

// Fetch the house associated with the user
export const getUserHouse = async (userID: string) => {
  const { data, error } = await supabase
    .from("inHouse") // Table storing user-house relationships
    .select("house_code") // Only select the house_code
    .eq("user", userID);

  if (error) {
    throw error;
  }
  return data;
};

// Add a user to a house
export const addUserHouse = async (userID: string, houseID: string) => {
  const { data, error } = await supabase
    .from("inHouse")
    .insert([{ house_code: houseID, user: userID }])
    .select();

  if (error) {
    throw error;
  }
  return data;
};
