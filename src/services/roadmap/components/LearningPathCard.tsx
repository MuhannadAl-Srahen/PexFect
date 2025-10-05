import React from 'react';
import { Link } from '@tanstack/react-router';
import type { LearningPath } from '../../../types/roadmap';

import { BookOpen, Zap, Trophy } from 'lucide-react';

const ICON_GRADIENTS = {
  beginner: 'from-green-100 to-green-50',
  intermediate: 'from-yellow-100 to-yellow-50',
  advanced: 'from-red-100 to-red-50',
};
const ICON_GRADIENTS_DARK = {
  beginner: 'dark:from-emerald-900/30 dark:to-emerald-900/10',
  intermediate: 'dark:from-amber-900/30 dark:to-amber-900/10',
  advanced: 'dark:from-rose-900/30 dark:to-rose-900/10',
};
const ICONS = {
  beginner: <BookOpen className="w-5 h-5 text-green-500" />,
  intermediate: <Zap className="w-5 h-5 text-yellow-500" />,
  advanced: <Trophy className="w-5 h-5 text-red-500" />,
};
const CTA_COLORS = {
  beginner: 'bg-green-500 hover:bg-green-600 focus:ring-green-200',
  intermediate: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-200',
  advanced: 'bg-red-500 hover:bg-red-600 focus:ring-red-200',
};
const CTA_LABELS = {
  beginner: 'Start Beginner Path →',
  intermediate: 'Start Intermediate Path →',
  advanced: 'Start Advanced Path →',
};
const CTA_LINKS = {
  beginner: '/roadmap/beginner',
  intermediate: '/roadmap/intermediate',
  advanced: '/roadmap/advanced',
};
const FEATURE_LIST = {
  beginner: [
    'HTML & CSS Fundamentals',
    'Responsive Design Basics',
    'JavaScript Introduction',
  ],
  intermediate: [
    'React Components & Hooks',
    'API Integration',
    'State Management',
  ],
  advanced: [
    'TypeScript Mastery',
    'Testing Strategies',
    'Performance Optimization',
  ],
};
const TITLE_COLORS = {
  beginner: 'text-emerald-800 dark:text-emerald-400',
  intermediate: 'text-amber-800 dark:text-amber-400',
  advanced: 'text-rose-800 dark:text-rose-400',
};
const SUBTITLE_COLORS = {
  beginner: 'text-emerald-700 dark:text-emerald-400',
  intermediate: 'text-amber-700 dark:text-amber-400',
  advanced: 'text-rose-700 dark:text-rose-400',
};

interface LearningPathCardProps {
  path: LearningPath;
  totalChallenges: number;
}

const LearningPathCard: React.FC<LearningPathCardProps> = ({ path, totalChallenges }) => {
  const key = path.id as keyof typeof ICONS;
  
  return (
    <Link to={CTA_LINKS[key]} className="w-full h-full">
      {/* outer wrapper: subtle level border; elevation on hover */}
      <div className="rounded-3xl h-full w-full transition-shadow duration-200 group group-hover:shadow-lg">
        <div
          className={`rounded-3xl border border-border/50 bg-card shadow-sm transition-transform duration-200 flex flex-col h-full w-full max-w-full px-6 md:px-8 pt-7 pb-8 relative group-hover:-translate-y-1 active:scale-[0.98]`}
          tabIndex={0}
        >
      {/* Top Row: Icon, Title, Badge/Challenge Count */}
  <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-4">
          <div className={`rounded-xl w-12 h-12 p-2 bg-gradient-to-br ${ICON_GRADIENTS[key]} ${ICON_GRADIENTS_DARK[key]} flex items-center justify-center shadow-sm`}> 
            {ICONS[key]}
          </div>
          <h2 className={`text-xl font-extrabold text-left tracking-tight leading-tight ${TITLE_COLORS[key]}`}>{path.title}</h2>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground bg-muted/50 dark:bg-card rounded px-2 py-0.5">
            {totalChallenges} Challenges
          </span>
        </div>
      </div>
      {/* Subtitle */}
      <div className={`text-sm font-semibold mb-5 text-left ${SUBTITLE_COLORS[key]}`} style={{ marginBottom: 2 }}>
        {key === 'beginner' && <span>Start from Zero</span>}
        {key === 'intermediate' && <span>Level Up Your Skills</span>}
        {key === 'advanced' && <span>Master Professional Development</span>}
      </div>
    {/* Description */}
  <p
    className="mb-7 text-muted-foreground dark:text-gray-300 text-left text-[15px] font-normal leading-snug overflow-hidden text-ellipsis"
    style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
  >
    {path.description}
  </p>
      {/* Feature List with colored dots */}
  <ul className="mb-8 ml-4 text-[13px] text-muted-foreground dark:text-card-foreground space-y-1.5">
        {FEATURE_LIST[key].map((item) => (
          <li key={item} className="flex items-center gap-3">
            <span
              className={`inline-block w-2.5 h-2.5 rounded-full ${
                key === 'beginner' ? 'bg-emerald-500' : key === 'intermediate' ? 'bg-amber-500' : 'bg-rose-500'
              }`}
            />
            {item}
          </li>
        ))}
      </ul>
      {/* Stat Cards Row */}
  <div className="flex items-center gap-3 mb-10">
        <div className="flex-1 bg-card dark:bg-card rounded-xl py-2 flex flex-col items-center justify-center border border-border/50 shadow-sm">
          <span className="text-lg font-bold text-card-foreground leading-none">
            {key === 'beginner' ? '1-2 weeks' : '2-3 weeks'}
          </span>
          <span className="text-xs text-muted-foreground font-semibold mt-0.5">Duration</span>
        </div>
        <div className="flex-1 bg-card dark:bg-card rounded-xl py-2 flex flex-col items-center justify-center border border-border/50 shadow-sm">
          <span className="text-lg font-bold text-card-foreground leading-none">0%</span>
          <span className="text-xs text-muted-foreground font-semibold mt-0.5">Complete</span>
        </div>
      </div>
      {/* CTA Button (visual only; card is clickable via Link) */}
      <div
        role="link"
        aria-label={CTA_LABELS[key]}
        className={`w-full flex items-center justify-center gap-2 text-center text-white text-base font-bold rounded-xl py-3 mt-auto transition-all duration-200 shadow-sm ${CTA_COLORS[key]} group-hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-2`}
      >
        {CTA_LABELS[key]}
      </div>
    </div>
      </div>
    </Link>
  );
};

export default LearningPathCard;
