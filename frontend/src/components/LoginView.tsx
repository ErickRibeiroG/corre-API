import React from 'react';
import { ShieldCheck, Zap, BarChart3, ArrowRight } from 'lucide-react';

export const LoginView: React.FC = () => {
  return (
    <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', textAlign: 'center' }}>
      
      {/* Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.4rem 1rem',
        borderRadius: '20px',
        background: 'rgba(252, 76, 2, 0.12)',
        border: '1px solid rgba(252, 76, 2, 0.3)',
        color: 'var(--strava-orange)',
        fontSize: '0.85rem',
        fontWeight: 600,
        marginBottom: '1.5rem'
      }}>
        <Zap size={16} />
        <span>Integração Oficial Strava API v3</span>
      </div>

      {/* Main Title */}
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.15, maxWidth: '800px', marginBottom: '1.25rem' }}>
        Analise sua performance e acompanhe suas atividades com <span style={{ color: 'var(--strava-orange)' }}>precisão total</span>
      </h2>

      {/* Subtitle */}
      <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '2.5rem', lineHeight: 1.6 }}>
        Conecte sua conta do Strava para visualizar gráficos avançados, ritmo médio, ganho de elevação e métricas detalhadas dos seus treinos.
      </p>

      {/* CTA Button / Link */}
      <a 
        href="/api/auth/login"
        className="btn-primary" 
        style={{ fontSize: '1.1rem', padding: '1rem 2.2rem', borderRadius: '14px', textDecoration: 'none' }}
      >
        <span>Conectar com o Strava</span>
        <ArrowRight size={20} />
      </a>

      {/* Feature Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.5rem',
        width: '100%',
        marginTop: '4rem',
        textAlign: 'left'
      }}>
        
        <div className="glass-card" style={{ padding: '1.8rem' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
            <BarChart3 size={24} />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Métricas Detalhadas</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Consulte distância total, tempo em movimento, ganho de altimetria e ritmo por quilômetro.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '1.8rem' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(252, 76, 2, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'var(--strava-orange)' }}>
            <Zap size={24} />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Sincronização Instantânea</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Conecte via OAuth2 seguro com renovação automática de token (Refresh Token).
          </p>
        </div>

        <div className="glass-card" style={{ padding: '1.8rem' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent-emerald)' }}>
            <ShieldCheck size={24} />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Sessão Privada & Segura</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Seus dados são protegidos por cookies de sessão HTTP-Only assinados no servidor.
          </p>
        </div>

      </div>

    </div>
  );
};
