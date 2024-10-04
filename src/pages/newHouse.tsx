import { createHouse } from "@/houseService"; // Ensure the path is correct
import { useState, FormEvent } from "react";

export default function NewHouse() {
  const [houseName, setHouseName] = useState('');
  const [houseCode, setHouseCode] = useState(''); // You might want to use this for joining a house

  async function handleCreateHouse(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault(); // Prevent page reload
    try {
      const newHouse = await createHouse(houseName); // Pass houseName to createHouse, not houseCode
      if (newHouse) {
        console.log("Created House.");
      }
    } catch (error) {
      console.error("Error creating house:", error);
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

      {/* The join house button logic can be handled separately */}
      <button>
        Join House
      </button>
    </>
  );
}
