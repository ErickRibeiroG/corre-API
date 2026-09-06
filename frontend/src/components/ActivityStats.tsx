import React from 'react';
import { Activity } from '../types';
import { Trophy, Compass, Mountain, Clock } from 'lucide-react';

interface ActivityStatsProps {
  activities: Activity[];
}

export const ActivityStats: React.FC<ActivityStatsProps> = ({ activities }) => {
  // Calculando estatísticas gerais
  const totalDistanceKm = activities.reduce((acc, act) => acc + act.distance, 0) / 1000;
  const totalElevationM = activities.reduce((acc, act) => acc + (act.total_elevation_gain || 0), 0);
  const totalMovingSeconds = activities.reduce((acc, act) => acc + act.moving_time, 0);

  // Formatação de tempo
  const hours = Math.floor(totalMovingSeconds / 3600);
  const minutes = Math.floor((totalMovingSeconds % 3600) / 60);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.25rem',
      marginBottom: '2rem'
    }}>
      
      {/* Total Distância */}
      <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--strava-orange)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Distância Total</span>
          <Compass size={20} color="var(--strava-orange)" />
        </div>
        <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>
          {totalDistanceKm.toFixed(1)} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>km</span>
        </div>
      </div>

      {/* Total Atividades */}
      <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-cyan)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Atividades</span>
          <Trophy size={20} color="var(--accent-cyan)" />
        </div>
        <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>
          {activities.length} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>treinos</span>
        </div>
      </div>

      {/* Ganho de Elevação */}
      <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-emerald)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Altimetria Total</span>
          <Mountain size={20} color="var(--accent-emerald)" />
        </div>
        <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>
          {totalElevationM.toFixed(0)} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>m</span>
        </div>
      </div>

      {/* Tempo em Movimento */}
      <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-purple)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Tempo em Treino</span>
          <Clock size={20} color="var(--accent-purple)" />
        </div>
        <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>
          {hours}h {minutes}m
        </div>
      </div>

    </div>
  );
};
