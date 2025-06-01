import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/auth/presentation/pages/LoginPage';
import { DashboardPage } from '@/shared/pages/DashboardPage';

export function AppRouter() {
  const isAuthenticated = false; // isso será dinâmico depois

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rota protegida */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />}
        />

        {/* Redirecionar rota raiz */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
