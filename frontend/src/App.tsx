import React, { useEffect, useState } from 'react';
import { UserProfile, Activity } from './types';
import { Header } from './components/Header';
import { LoginView } from './components/LoginView';
import { DashboardView } from './components/DashboardView';

const API_BASE_URL = '/api';

export const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Verifica o estado de autenticação do usuário ao carregar a página
  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: 'include',
      });

      if (res.ok) {
        const userData: UserProfile = await res.json();
        setUser(userData);
        await fetchActivities();
      } else {
        setUser(null);
        setActivities([]);
      }
    } catch (err) {
      console.error('Erro ao verificar sessão do usuário:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Busca as atividades do usuário logado na sessão
  const fetchActivities = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/activities`, {
        credentials: 'include',
      });

      if (res.ok) {
        const data: Activity[] = await res.json();
        setActivities(data);
      } else if (res.status === 401) {
        setUser(null);
        setActivities([]);
      } else {
        setError('Não foi possível carregar as atividades.');
      }
    } catch (err) {
      console.error('Erro ao buscar atividades:', err);
      setError('Erro de conexão com o servidor FastAPI.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Executa o logout e limpa os estados
  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        credentials: 'include',
      });
      setUser(null);
      setActivities([]);
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Cabeçalho */}
      <Header user={user} onLogout={handleLogout} />

      {/* Conteúdo Principal */}
      <main style={{ flex: 1 }}>
        {error && (
          <div className="container" style={{ marginBottom: '1.5rem' }}>
            <div className="glass-card" style={{ padding: '1rem 1.5rem', borderLeft: '4px solid #ef4444', color: '#f87171', fontWeight: 600 }}>
              ⚠️ {error}
            </div>
          </div>
        )}

        {loading && !user ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(255, 255, 255, 0.1)',
              borderTopColor: 'var(--strava-orange)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }} />
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : user ? (
          <DashboardView
            activities={activities}
            onRefresh={fetchActivities}
            loading={loading}
          />
        ) : (
          <LoginView />
        )}
      </main>

      {/* Rodapé */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem 1rem',
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-muted)',
        fontSize: '0.85rem'
      }}>
        <div className="container">
          Strava Analyzer &copy; {new Date().getFullYear()} — Desenvolvido com FastAPI & React + TypeScript
        </div>
      </footer>

    </div>
  );
};
