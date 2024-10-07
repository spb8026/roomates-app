import { createHouse } from "@/houseService"; // Ensure the path is correct
import { addUserHouse } from "@/userService";
import { useState, FormEvent, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import error from "next/error";
import router, { Router } from "next/router";

export default function NewHouse() {
  const [houseName, setHouseName] = useState('');
  const [houseCode, setHouseCode] = useState(''); // For joining a house
  const [userId, setUserId] = useState<string | null>(null); // Store user ID

  // Get the user ID from Supabase session on component mount
  useEffect(() => {
    const fetchUserId = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data?.session?.user;
      console.log("User session data:", data); // Log the entire session data
      if (user) {
        setUserId(user.id);
      } else {
        console.error("User not logged in");
      }
    };
  
    fetchUserId();
  }, []);
  

  async function handleCreateHouse(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault(); // Prevent page reload

    try {
      const newHouse = await createHouse(houseName); // Pass houseName to createHouse

      if (newHouse && userId) {
        await addUserHouse(userId,newHouse[0].house_code ); // Associate the user with the created house
        console.log("Created House and added user to house.");
        router.push('/calendarPage')
      }
    } catch (error) {
      console.error("Error creating house:", error);
    }
  }
  async function  handleJoinHouse(event:FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    try {
      if (userId)
      {
        const joinedHouse = await addUserHouse(userId, houseCode)
        router.push('/calendarPage')
      }
      else
      {
        throw error;
      }
    }
    catch {
      console.error("Error joining house:", error);
    }
  }

  return (
    <>
      <form onSubmit={handleCreateHouse}>
        <input
          type="text"
          placeholder="House Name"
          value={houseName}
          onChange={(e) => setHouseName(e.target.value)}
          required
        />
        <button type="submit">New House</button>
      </form>

      <form onSubmit={handleJoinHouse}>
        <input
          type="text"
          placeholder="House Code"
          value={houseCode}
          onChange={(e) => setHouseCode(e.target.value)}
          required
        />
        <button type="submit">Join House</button>
      </form>
    </>
  );
}
