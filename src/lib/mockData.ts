import { Player, Championship, Game } from '@/types/basketball';

export const mockPlayers: Player[] = [
  { id: '1', name: 'Marcus Silva', number: 23, position: 'PG', team: 'Thunders' },
  { id: '2', name: 'Carlos Santos', number: 10, position: 'SG', team: 'Thunders' },
  { id: '3', name: 'Rafael Lima', number: 7, position: 'SF', team: 'Thunders' },
  { id: '4', name: 'João Costa', number: 15, position: 'PF', team: 'Dragons' },
  { id: '5', name: 'Paulo Rodrigues', number: 33, position: 'C', team: 'Dragons' },
  { id: '6', name: 'Felipe Alves', number: 8, position: 'PG', team: 'Dragons' },
];

export const mockChampionships: Championship[] = [
  {
    id: '1',
    name: 'Liga Nacional 2024',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    status: 'ongoing',
    teams: ['Thunders', 'Dragons', 'Eagles', 'Lions'],
  },
  {
    id: '2',
    name: 'Copa Regional',
    startDate: '2024-07-01',
    endDate: '2024-08-30',
    status: 'upcoming',
    teams: ['Sharks', 'Panthers', 'Wolves'],
  },
];

export const mockGames: Game[] = [
  {
    id: '1',
    championshipId: '1',
    homeTeam: 'Thunders',
    awayTeam: 'Dragons',
    homeScore: 78,
    awayScore: 82,
    quarter: 4,
    timeRemaining: '00:00',
    status: 'finished',
    date: '2024-11-20',
    stats: [],
  },
  {
    id: '2',
    championshipId: '1',
    homeTeam: 'Eagles',
    awayTeam: 'Lions',
    homeScore: 45,
    awayScore: 42,
    quarter: 2,
    timeRemaining: '05:23',
    status: 'live',
    date: '2024-11-26',
    stats: [],
  },
];
