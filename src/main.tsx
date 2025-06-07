import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/shared/context/AuthContext';
import { App } from './App';
import './../src/index.css';

function AuthGate({ children }: { children: React.ReactNode }) {
  const { initializing } = useAuth();
  if (initializing) return null;
  return <>{children}</>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AuthGate>
          <App />
        </AuthGate>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
