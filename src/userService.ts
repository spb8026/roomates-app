import { supabase } from "../lib/supabase";

export const getUserHouse = async (userID: string) => {
  const { data, error } = await supabase
    .from('inHouse') // Specify the table name
    .select('*') // Define the columns to select; * selects all columns
    .eq('userId', userID); // Query where 'userId' matches the provided userID

  if (error) {
    throw error;
  }
  return data;
};

export const addUserHouse = async (userID: string, houseID: string) => {
  const {data,error} = await supabase
    .from('inHouse')
    .insert([{house_code: houseID, user_id: userID}]).select();
    if (error)
    {

      throw error;
    }
    return data;
}
