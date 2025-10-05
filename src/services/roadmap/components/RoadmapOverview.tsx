
import { learningPaths } from '../data';
import { challenges } from '../../challenges/data';
import LearningPathCard from './LearningPathCard';

import { Target, Code2, BadgeCheck } from 'lucide-react';

interface WhyFollowCardProps {
	icon: React.ReactNode;
	iconBg: string;
	title: string;
	desc: string;
}

const WhyFollowCard: React.FC<WhyFollowCardProps> = ({ icon, iconBg, title, desc }) => (
	<div className="flex-1 flex flex-col items-center text-center px-4 max-w-sm">
		<div className={`rounded-2xl p-5 mb-4 flex items-center justify-center ${iconBg}`}>
			{icon}
		</div>
		<h3 className="font-bold text-xl md:text-2xl mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
		<p className="text-gray-500 dark:text-gray-300 text-sm md:text-base max-w-xs">{desc}</p>
	</div>
);


const WhyFollowSection = () => (
	<section className="w-full flex justify-center mt-2 px-2">
		<div className="rounded-3xl bg-card text-card-foreground border border-border shadow-md px-4 py-7 md:py-8 md:px-10 w-full max-w-7xl">
			<h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3 text-gray-900 dark:text-gray-100">Why Follow Our Roadmap?</h2>
			<p className="text-md md:text-lg text-gray-500 dark:text-gray-300 text-center mb-12">
				Unlock your potential with a proven, step-by-step learning journey
			</p>
 			<div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
				<WhyFollowCard
					icon={<Target className="w-12 h-12 text-blue-500 dark:text-blue-300" />}
					iconBg="bg-muted/50 dark:bg-card"
					title="Progressive Learning"
					desc="Each challenge builds on the previous one, ensuring you develop a solid foundation before advancing. Progress steadily with clear goals and measurable milestones."
				/>
				<WhyFollowCard
					icon={<Code2 className="w-12 h-12 text-green-500 dark:text-emerald-300" />}
					iconBg="bg-muted/50 dark:bg-card"
					title="Real Projects"
					desc="Build actual projects you can showcase in your portfolio, not just theoretical exercises. Gain hands-on experience by shipping features end-to-end."
				/>
				<WhyFollowCard
					icon={<BadgeCheck className="w-12 h-12 text-purple-500 dark:text-purple-300" />}
					iconBg="bg-muted/50 dark:bg-card"
					title="AI Feedback"
					desc="Get instant, detailed feedback on your code quality, design, and best practices. Learn faster with actionable, AI-powered suggestions tailored to your solution."
				/>
			</div>
		</div>
	</section>
);

const getChallengeCount = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
	const map = {
		beginner: 'Beginner',
		intermediate: 'Intermediate',
		advanced: 'Advanced',
	};
	return challenges.filter((c) => c.difficulty === map[difficulty]).length;
};

const RoadmapOverview = () => {
	return (
		<div className="w-full flex flex-col items-center">
			<h1 className="text-4xl font-extrabold text-center mb-2 mt-2">Your Frontend Journey</h1>
			<p className="text-center text-gray-500 mb-14 max-w-2xl">Choose your path and master frontend development through carefully crafted challenges that build real skills</p>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-7xl mb-12 auto-rows-fr">
				{learningPaths.map((path) => (
					<LearningPathCard key={path.id} path={path} totalChallenges={getChallengeCount(path.difficulty)} />
				))}
			</div>
			<WhyFollowSection />
		</div>
	);
};

export default RoadmapOverview;
