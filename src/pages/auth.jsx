import { useState } from "react";
import Router from "next/router";
import { supabase } from "../../lib/supabase";
import { getUserHouse } from "../userService";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      try {
        const userID = data.user?.id;
        const userHouse = await getUserHouse(userID);

        if (!userHouse || userHouse.length === 0) {
          Router.push("/newHouse");
        } else {
          Router.push("/calendarPage");
        }
      } catch (err) {
        Router.push("/newHouse");
        console.error("Error checking user house:", err);
        setError("Failed to verify house membership.");
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
}
