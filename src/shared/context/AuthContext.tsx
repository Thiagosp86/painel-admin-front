import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import axios from 'axios';
import { API_URL } from '@/shared/config/api';

type Permission = 'canAccessDashboard' | 'canManageUsers' | 'canViewReports';

interface User {
  id: number;
  email: string;
  name: string;
  permissions: Permission[];
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  permissions: Permission[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
  loading: boolean;
  initializing: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { access_token, user } = response.data;
      console.log('Login successful:', user);

      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);
      setPermissions(user.permissions || []);
      navigate('/dashboard', { replace: true }); // <-- use replace para evitar duplicação na URL
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // remove usuário
    setUser(null);
    setIsAuthenticated(false);
    setPermissions([]);
    navigate('/login', { replace: true }); // <-- use replace aqui também
  };

  const hasPermission = (permission: Permission) => {
    return permissions.includes(permission);
  };

  // Persistência do login
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true); // <-- sempre true se usuário existe
      setPermissions(parsedUser.permissions || []);
      setInitializing(false);
    } else if (token) {
      axios
        .get(`${API_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
          setUser(response.data);
          setIsAuthenticated(true); // <-- sempre true se usuário existe
          setPermissions(response.data.permissions || []);
          localStorage.setItem('user', JSON.stringify(response.data));
        })
        .catch(() => {
          logout();
        })
        .finally(() => {
          setInitializing(false);
        });
    } else {
      setUser(null); // <-- garanta que user seja null
      setIsAuthenticated(false); // <-- garanta que isAuthenticated seja false
      setPermissions([]);
      setInitializing(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        permissions,
        login,
        logout,
        hasPermission,
        loading,
        initializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
