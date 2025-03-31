'use client';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();
  const user = auth?.user;
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/signup');
    }
  }, [user, router]);

  if (!user) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
