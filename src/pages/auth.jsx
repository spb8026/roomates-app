import { useState } from "react";
import Router, { useRouter } from 'next/router';  // Import Next.js router
import { supabase } from "../../lib/supabase";

export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
  
    const handleSignUp = async () => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) setError(error.message);
    };
  
    const handleLogin = async () => {
      const { data: user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) {
        setError(error.message);
      } else {
        console.log("LOGGED IN");
  
        // Now check if the user has a house
        try {
          const userID = user?.user?.id; // Get user ID after login
          const userHouse = await getUserHouse(userID);
  
          if (!userHouse || userHouse.length === 0) {
            router.push('/newHouse');
          }
          else
          {
            router.push('/calendarPage')
          }
        } catch (error) {
          console.error("Error checking user house:", error);
          setError("Failed to check if user has a house.");
        }
      }
    };
  

    const Styles = {
        loginBody: {
            width: '100vw-10px',
            height: '100vh-10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    }
  
    return (
      <div style={Styles.loginBody}>
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