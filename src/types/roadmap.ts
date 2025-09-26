export interface LearningPath {
	id: 'beginner' | 'intermediate' | 'advanced';
	title: string;
	description: string;
	difficulty: 'beginner' | 'intermediate' | 'advanced';
	duration: string;
	completedChallenges: number;
	progressPercentage: number;
	technologies: string[];
	estimatedWeeks: number;
	milestones: any[]; // To be replaced with a proper type later
}
