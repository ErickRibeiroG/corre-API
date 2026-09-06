export interface UserProfile {
  user_id: number;
  strava_athlete_id: number;
  athlete_name: string | null;
  athlete_email: string | null;
}

export interface StravaMap {
  id?: string;
  summary_polyline?: string;
}

export interface Activity {
  id: number;
  name: string;
  distance: number; // em metros
  moving_time: number; // em segundos
  elapsed_time: number; // em segundos
  total_elevation_gain: number; // em metros
  type: string; // Run, Ride, Swim, Walk, Hike, etc.
  sport_type?: string;
  start_date: string;
  start_date_local: string;
  timezone: string;
  average_speed: number; // em m/s
  max_speed: number; // em m/s
  average_cadence?: number;
  average_heartrate?: number;
  max_heartrate?: number;
  elev_high?: number;
  elev_low?: number;
  kudos_count?: number;
  comment_count?: number;
  map?: StravaMap;
}
