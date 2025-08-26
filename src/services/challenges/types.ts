export interface Challenge {
  id: number;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  technologies: string[];
  description: string;
  estimatedTime: string | null;
  participants: number;
  thumbnail_url: string;

}

export interface ChallengeItemProps {
  challenge: Challenge;
  isSaved: boolean;
  onToggleSave: (challengeId: number) => void;
}

export type ChallengeControlsProps = {
  searchTerm: string;
  selectedDifficulty: string;
  selectedLanguage: string;
  onSearchChange: (value: string) => void;
  onDifficultyChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
};

export type ChallengeCountProps = {
  filteredCount: number;
  totalCount: number;
};

export type ChallengeFiltersProps = {
  selectedDifficulty: string;
  selectedLanguage: string;
  onDifficultyChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
};

export type ChallengeViewProps = {
  challenges: Challenge[];
  savedChallenges: number[];
  onToggleSave: (challengeId: number) => void;
  viewMode: "grid" | "list";
};

export type ChallengeGridProps = {
  challenges: Challenge[];
  savedChallenges: number[];
  onToggleSave: (challengeId: number) => void;
  viewMode: "grid" | "list";
};
