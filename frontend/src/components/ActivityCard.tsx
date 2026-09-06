import React from 'react';
import { Activity } from '../types';
import { Footprints, Bike, Waves, Mountain, Calendar, ThumbsUp } from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const distanceKm = (activity.distance / 1000).toFixed(2);
  
  // Format tempo em movimento
  const minutes = Math.floor(activity.moving_time / 60);
  const seconds = activity.moving_time % 60;
  const timeFormatted = minutes >= 60 
    ? `${Math.floor(minutes / 60)}h ${minutes % 60}m`
    : `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;

  // Format Pace (min/km) para Corrida ou Velocidade Média (km/h) para Ciclismo
  const speedKmh = (activity.average_speed * 3.6).toFixed(1);
  
  // Pace em min/km para Corrida
  let paceFormatted = '';
  if (activity.average_speed > 0) {
    const paceSeconds = 1000 / activity.average_speed;
    const paceMin = Math.floor(paceSeconds / 60);
    const paceSec = Math.floor(paceSeconds % 60);
    paceFormatted = `${paceMin}:${paceSec < 10 ? '0' : ''}${paceSec} /km`;
  }

  // Icon por tipo de esporte
  const renderSportIcon = () => {
    switch (activity.type.toLowerCase()) {
      case 'run':
        return <Footprints size={20} color="#fc4c02" />;
      case 'ride':
        return <Bike size={20} color="#06b6d4" />;
      case 'swim':
        return <Waves size={20} color="#3b82f6" />;
      default:
        return <Footprints size={20} color="#10b981" />;
    }
  };

  // Data formatada
  const dateObj = new Date(activity.start_date_local || activity.start_date);
  const dateFormatted = dateObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
      
      {/* Header do Card */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {renderSportIcon()}
            </div>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: activity.type.toLowerCase() === 'run' ? 'var(--strava-orange)' : 'var(--accent-cyan)'
            }}>
              {activity.type}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <Calendar size={14} />
            <span>{dateFormatted}</span>
          </div>
        </div>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.3, color: 'var(--text-main)' }}>
          {activity.name}
        </h3>
      </div>

      {/* Grid de Estatísticas Principais */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.75rem',
        padding: '0.8rem',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        textAlign: 'center'
      }}>
        
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Distância</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
            {distanceKm} <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>km</span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Tempo</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
            {timeFormatted}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            {activity.type.toLowerCase() === 'run' ? 'Ritmo' : 'Velocidade'}
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
            {activity.type.toLowerCase() === 'run' ? paceFormatted : `${speedKmh} km/h`}
          </div>
        </div>

      </div>

      {/* Footer do Card */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Mountain size={14} color="var(--accent-emerald)" />
          <span>Elevação: <strong>{activity.total_elevation_gain.toFixed(0)}m</strong></span>
        </div>

        {activity.kudos_count !== undefined && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)' }}>
            <ThumbsUp size={14} color="var(--strava-orange)" />
            <span>{activity.kudos_count} kudos</span>
          </div>
        )}
      </div>

    </div>
  );
};
