import { create } from 'zustand';

interface UserStats {
  xp: number;
  level: number;
  streak: number;
  completedBlueprints: number;
}

interface Blueprint {
  id: string;
  title: string;
  industry: string;
  techStack: string[];
  description: string;
  generatedAt: string;
  readinessScore: number;
  data: any;
  userId: string;
}

interface AppState {
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
  } | null;
  stats: UserStats;
  projects: Blueprint[];
  isLoading: boolean;
  
  // Actions
  setUser: (user: AppState['user']) => void;
  setStats: (stats: UserStats) => void;
  setProjects: (projects: Blueprint[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  stats: {
    xp: 0,
    level: 1,
    streak: 0,
    completedBlueprints: 0,
  },
  projects: [],
  isLoading: false,

  setUser: (user) => set({ user }),
  setStats: (stats) => set({ stats }),
  setProjects: (projects) => set({ projects }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
