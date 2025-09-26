
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
	<div className="flex flex-col items-center text-center px-2 min-w-[220px]">
		<div className={`rounded-2xl p-7 mb-6 flex items-center justify-center ${iconBg}`}>
			{icon}
		</div>
		<h3 className="font-bold text-2xl mb-2 text-gray-900">{title}</h3>
		<p className="text-gray-500 text-base max-w-xs">{desc}</p>
	</div>
);


const WhyFollowSection = () => (
	<section className="w-full flex justify-center mt-2 px-2">
		<div
			className="rounded-3xl bg-white shadow-sm px-4 py-7 md:py-8 md:px-10 w-full max-w-7xl"
			style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}
		>
			<h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">Why Follow Our Roadmap?</h2>
			<p className="text-md md:text-lg text-gray-500 text-center mb-12">
				Unlock your potential with a proven, step-by-step learning journey
			</p>
			<div className="flex flex-col md:flex-row items-stretch justify-center gap-10 md:gap-16">
				<WhyFollowCard
					icon={<Target className="w-12 h-12 text-blue-500" />}
					iconBg="bg-blue-100"
					title="Progressive Learning"
					desc="Each challenge builds on the previous one, ensuring you develop a solid foundation before advancing"
				/>
				<WhyFollowCard
					icon={<Code2 className="w-12 h-12 text-green-500" />}
					iconBg="bg-green-100"
					title="Real Projects"
					desc="Build actual projects you can showcase in your portfolio, not just theoretical exercises"
				/>
				<WhyFollowCard
					icon={<BadgeCheck className="w-12 h-12 text-purple-500" />}
					iconBg="bg-purple-100"
					title="AI Feedback"
					desc="Get instant, detailed feedback on your code quality, design, and best practices"
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
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-7xl mb-12">
				{learningPaths.map((path) => (
					<LearningPathCard key={path.id} path={path} totalChallenges={getChallengeCount(path.difficulty)} />
				))}
			</div>
			<WhyFollowSection />
		</div>
	);
};

export default RoadmapOverview;
