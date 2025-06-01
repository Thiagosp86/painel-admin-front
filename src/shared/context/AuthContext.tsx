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
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  permissions: Permission[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { access_token, user } = response.data;
      console.log('Login successful:', user);

      localStorage.setItem('token', access_token);
      setUser(user);
      setIsAuthenticated(true);
      setPermissions(['canAccessDashboard']); // ajuste depois baseado em dados reais
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Credenciais inválidas');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setPermissions([]);
    navigate('/login');
  };

  const hasPermission = (permission: Permission) => {
    return permissions.includes(permission);
  };

  // Persistência do login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`${API_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
          setUser(response.data);
          setIsAuthenticated(true);
          setPermissions(['canAccessDashboard']); // simulado
        })
        .catch(() => {
          logout();
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, permissions, login, logout, hasPermission }}
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
