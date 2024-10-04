import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // If no user session, redirect to the /auth page
        router.push('/auth');
      } else {
        // If user is signed in, stop loading
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking the session
  }

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>You are signed in!</p>
    </div>
  );
};

export default Home;
