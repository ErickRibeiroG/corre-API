import React from 'react';
import { UserProfile } from '../types';
import { LogOut, Activity as ActivityIcon, User } from 'lucide-react';

interface HeaderProps {
  user: UserProfile | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="glass-card" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0, marginBottom: '2rem' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem' }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: 'var(--strava-gradient)',
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(252, 76, 2, 0.4)'
          }}>
            <ActivityIcon color="#ffffff" size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #ffffff, #d1d5db)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Strava <span style={{ color: 'var(--strava-orange)', WebkitTextFillColor: 'var(--strava-orange)' }}>Analyzer</span>
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Painel de Performance & Métricas</p>
          </div>
        </div>

        {/* Right Action / Profile */}
        <div>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 0.8rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--strava-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  <User size={18} color="#fff" />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{user.athlete_name || `Atleta #${user.strava_athlete_id}`}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ID Strava: {user.strava_athlete_id}</div>
                </div>
              </div>

              <button onClick={onLogout} className="btn-secondary" title="Encerrar Sessão">
                <LogOut size={16} />
                <span>Sair</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
              API Pronta
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
