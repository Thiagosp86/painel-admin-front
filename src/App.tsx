import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/auth/presentation/pages/LoginPage';
import { DashboardPage } from '@/shared/pages/DashboardPage';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
// ajuste o caminho

export function App() {
  const isAuthenticated = Boolean(localStorage.getItem('token')); // ou seu estado auth real

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
