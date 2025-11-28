export interface Player {
  id: string;
  name: string;
  number: number;
  position: 'PG' | 'SG' | 'SF' | 'PF' | 'C';
  team?: string;
  photoUrl?: string;
}

export interface Championship {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'finished';
  teams: string[];
  games?: number;
}

export interface GameStats {
  playerId: string;
  points: number;
  assists: number;
  rebounds: number;
  steals: number;
  blocks: number;
  fouls: number;
  turnovers: number;
}

export interface Game {
  id: string;
  championshipId: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  quarter: number;
  timeRemaining: string;
  status: 'scheduled' | 'live' | 'finished';
  date: string;
  stats: GameStats[];
}

export interface Team {
  id: string;
  name: string;
  logo?: string;
  coach?: string;
  foundedYear?: string;
}
