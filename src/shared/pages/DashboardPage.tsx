import { useAuth } from '@/shared/context/AuthContext';

export const DashboardPage = () => {
  const { hasPermission } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>

      {hasPermission('canManageUsers') && <button>Gerenciar Usuários</button>}

      {hasPermission('canViewReports') ? (
        <p>Acesso a relatórios permitido</p>
      ) : (
        <p>Você não tem permissão para ver relatórios</p>
      )}
    </div>
  );
};
