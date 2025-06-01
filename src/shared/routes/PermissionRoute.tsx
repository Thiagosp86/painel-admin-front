import { Navigate } from 'react-router-dom';
import { useAuth } from '@/shared/context/AuthContext';

interface Props {
  children: React.ReactNode;
  requiredPermission: 'canAccessDashboard' | 'canManageUsers' | 'canViewReports'; // ou tipo `Permission` se você exportar ele
}

export const PermissionRoute = ({ children, requiredPermission }: Props) => {
  const { isAuthenticated, hasPermission } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
