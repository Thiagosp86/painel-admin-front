import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/auth/presentation/pages/LoginPage';
import { DashboardPage } from '@/shared/pages/DashboardPage';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import { NotFoundPage } from '@/shared/pages/NotFoundPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
