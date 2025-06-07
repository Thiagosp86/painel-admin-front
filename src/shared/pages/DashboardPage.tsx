import { useAuth } from '@/shared/context/AuthContext';

export const DashboardPage = () => {
  const { user, hasPermission, logout } = useAuth();

  return (
    <div
      style={{
        maxWidth: 480,
        margin: '2rem auto',
        padding: '2rem',
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
        color: '#213547',
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Dashboard</h1>
        <button onClick={logout} style={{ background: '#e74c3c', color: '#fff' }}>
          Sair
        </button>
      </header>
      {user && (
        <p style={{ marginTop: 24, fontSize: 18 }}>
          Olá, <strong>{user.name}</strong>!
        </p>
      )}

      <div style={{ marginTop: 32 }}>
        {hasPermission('canManageUsers') && (
          <button style={{ marginBottom: 16, width: '100%' }}>Gerenciar Usuários</button>
        )}

        {hasPermission('canViewReports') ? (
          <div style={{ color: '#27ae60', marginTop: 16 }}>Acesso a relatórios permitido</div>
        ) : (
          <div style={{ color: '#e67e22', marginTop: 16 }}>
            Você não tem permissão para ver relatórios
          </div>
        )}
      </div>
    </div>
  );
};
