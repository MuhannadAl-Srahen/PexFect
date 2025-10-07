export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface LearningPath {
	id: DifficultyLevel;
	title: string;
	description: string;
	difficulty: DifficultyLevel;
	duration: string;
	completedChallenges: number;
	progressPercentage: number;
	technologies: string[];
	estimatedWeeks: number;
	milestones: Array<{
		id: string;
		title: string;
		description?: string;
		completed?: boolean;
	}>;
}
