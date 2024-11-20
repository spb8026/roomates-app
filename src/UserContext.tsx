import { createContext, ReactNode, useEffect, useState, useContext } from "react";
import { supabase } from "../lib/supabase";
import { getUserHouse } from "./userService";

interface User {
  id: string;
  house_code: string | null; // Allow null if no house is assigned
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.error("Error fetching user:", error);
        return;
      }

      const userID = data.user.id;

      try {
        const houseData = await getUserHouse(userID);
        console.log(houseData)
        
        const house_code = houseData.length > 0 ? houseData[0].house_code : null;

        setUser({ id: userID, house_code });
      } catch (error) {
        console.error("Error fetching house data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};
