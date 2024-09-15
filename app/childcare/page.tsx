'use client';

import { useEffect, useState } from 'react';
import ChildcareSidebar from './components/sidebar'; // Adjust path if needed
import { createClient } from '@/lib/client/client';

interface User {
  id: string;
  email: string;
  full_name?: string;
  // Add other fields as needed
}

const ChildcarePage = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      
      // Fetch current user
      const { data: { user } } = await supabase.auth.getUser();
      setUserEmail(user?.email || null);

      // Fetch all users from the 'users' table
      const { data: users, error } = await supabase
        .from('users')
        .select('id, full_name');

      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setAllUsers(users as User[]);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Childcare</h1>
      {userEmail && <p>Logged in as: {userEmail}</p>}
      <ChildcareSidebar />
      
      <h2>All Users</h2>
      <ul>
        {allUsers.map(user => (
          <li key={user.id}>{user.full_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChildcarePage;
