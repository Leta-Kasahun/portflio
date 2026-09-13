export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GitHubStats = {
  username: string;
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  activeWeeks: number;
  days: ContributionDay[];
};
