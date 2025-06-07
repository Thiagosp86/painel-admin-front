import { useAuth } from '@/shared/context/AuthContext';
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, initializing } = useAuth();
  if (initializing) return null; // ou um spinner
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
