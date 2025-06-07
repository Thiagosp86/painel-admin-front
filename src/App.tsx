import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/auth/presentation/pages/LoginPage';
import { DashboardPage } from '@/shared/pages/DashboardPage';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import { useAuth } from '@/shared/context/AuthContext'; // adicionado

export function App() {
  const { isAuthenticated } = useAuth(); // use o contexto

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
    </Routes>
  );
}
