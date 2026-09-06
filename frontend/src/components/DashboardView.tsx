import React, { useState } from 'react';
import { Activity } from '../types';
import { ActivityCard } from './ActivityCard';
import { ActivityStats } from './ActivityStats';
import { Search, Filter, RefreshCw } from 'lucide-react';

interface DashboardViewProps {
  activities: Activity[];
  onRefresh: () => void;
  loading: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ activities, onRefresh, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Filtrando atividades por busca e tipo
  const filteredActivities = activities.filter((act) => {
    const matchesSearch = act.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || act.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      
      {/* Resumo de Estatísticas Gerais */}
      <ActivityStats activities={activities} />

      {/* Barra de Filtros e Busca */}
      <div className="glass-card" style={{ padding: '1.2rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Campo de Busca */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: '1 1 300px', background: 'rgba(255, 255, 255, 0.05)', padding: '0.6rem 1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Buscar atividade por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-main)',
              fontFamily: 'var(--font-family)',
              fontSize: '0.9rem',
              width: '100%'
            }}
          />
        </div>

        {/* Filtros de Categoria */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Filter size={16} color="var(--text-muted)" />
          {['all', 'run', 'ride', 'swim', 'walk'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              style={{
                padding: '0.4rem 0.9rem',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: selectedType === type ? 'var(--strava-orange)' : 'var(--border-color)',
                background: selectedType === type ? 'rgba(252, 76, 2, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: selectedType === type ? 'var(--strava-orange)' : 'var(--text-muted)',
                fontFamily: 'var(--font-family)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.2s ease'
              }}
            >
              {type === 'all' ? 'Todas' : type}
            </button>
          ))}

          {/* Botão de Recarregar */}
          <button onClick={onRefresh} className="btn-secondary" disabled={loading} title="Atualizar Atividades">
            <RefreshCw size={16} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
            <span>Atualizar</span>
          </button>
        </div>

      </div>

      {/* Seção de Listagem de Atividades */}
      {filteredActivities.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Nenhuma atividade encontrada com os filtros selecionados.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      )}

    </div>
  );
};
