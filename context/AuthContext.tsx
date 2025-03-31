'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { GET_CURRENT_USER_QUERY } from '@/graphql/queries';
import { LOGOUT_MUTATION } from '@/graphql/mutations';

// Define the User type
interface User {
  id: string;
  email: string;
  username: string;
}

// Define the auth context type
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

// Create authentication context
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  // Fetch the authenticated user
  const { loading } = useQuery(GET_CURRENT_USER_QUERY, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data?.me) {
        setUser(data.me);
      }
    },
    onError: () => {
      setUser(null);
    },
  });

  // Logout mutation
  const [logoutMutation] = useMutation(LOGOUT_MUTATION);

  const logout = async () => {
    try {
      await logoutMutation();
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
