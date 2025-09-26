import React from 'react';
import type { LearningPath } from '../../../types/roadmap';

import { BookOpen, Zap, Trophy } from 'lucide-react';

const ICON_GRADIENTS = {
  beginner: 'from-green-100 to-green-50',
  intermediate: 'from-yellow-100 to-yellow-50',
  advanced: 'from-red-100 to-red-50',
};
const ICONS = {
  beginner: <BookOpen className="w-7 h-7 text-green-500" />,
  intermediate: <Zap className="w-7 h-7 text-yellow-500" />,
  advanced: <Trophy className="w-7 h-7 text-red-500" />,
};
const CTA_COLORS = {
  beginner: 'bg-green-500 hover:bg-green-600 focus:ring-green-200',
  intermediate: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-200',
  advanced: 'bg-red-500 hover:bg-red-600 focus:ring-red-200',
};
const BORDER_COLORS = {
  beginner: 'border border-green-200',
  intermediate: 'border border-yellow-200',
  advanced: 'border border-red-200',
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
    <div
      className={`rounded-3xl ${BORDER_COLORS[key]} bg-white shadow-md hover:shadow-lg transition-all duration-200 flex flex-col min-w-[320px] max-w-full px-8 pt-7 pb-8 relative group hover:-translate-y-1 active:scale-[0.98]`}
      tabIndex={0}
      style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.06)', minHeight: 420 }}
    >
      {/* Top Row: Icon, Badge, Challenge Count */}
  <div className="flex items-center justify-between mb-7">
        <div className={`rounded-xl p-2 bg-gradient-to-br ${ICON_GRADIENTS[key]} flex items-center justify-center shadow-sm`}>
          {ICONS[key]}
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-100 rounded px-2 py-0.5">
            {totalChallenges} Challenges
          </span>
        </div>
      </div>
      {/* Title and Subtitle */}
      <h2 className={`text-2xl font-extrabold mb-5 text-left tracking-tight leading-tight ${TITLE_COLORS[key]}`}>{path.title}</h2>
      <div className={`text-sm font-semibold mb-5 text-left ${SUBTITLE_COLORS[key]}`}
        style={{ marginBottom: 2 }}>
        {key === 'beginner' && <span>Start from Zero</span>}
        {key === 'intermediate' && <span>Level Up Your Skills</span>}
        {key === 'advanced' && <span>Master Professional Development</span>}
      </div>
      {/* Description */}
  <p className="mb-7 text-gray-600 text-left text-[15px] font-normal leading-snug">{path.description}</p>
      {/* Feature List with colored dots */}
  <ul className="mb-8 ml-4 text-[13px] text-gray-700 space-y-1.5">
        {FEATURE_LIST[key].map((item) => (
          <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                display: 'inline-block',
                width: 7,
                height: 7,
                borderRadius: '50%',
                marginRight: 8,
                background:
                  key === 'beginner'
                    ? '#22c55e'
                    : key === 'intermediate'
                    ? '#eab308'
                    : '#ef4444',
              }}
            />
            {item}
          </li>
        ))}
      </ul>
      {/* Stat Cards Row */}
  <div className="flex items-center gap-3 mb-10">
        <div className="flex-1 bg-gray-50 rounded-xl py-2 flex flex-col items-center justify-center border border-gray-100">
          <span className="text-lg font-bold text-gray-700 leading-none">
            {key === 'beginner' ? '1-2 weeks' : '2-3 weeks'}
          </span>
          <span className="text-xs text-gray-400 font-semibold mt-0.5">Duration</span>
        </div>
        <div className="flex-1 bg-gray-50 rounded-xl py-2 flex flex-col items-center justify-center border border-gray-100">
          <span className="text-lg font-bold text-gray-700 leading-none">0%</span>
          <span className="text-xs text-gray-400 font-semibold mt-0.5">Complete</span>
        </div>
      </div>
      {/* CTA Button */}
      <a
        href={CTA_LINKS[key]}
        className={`w-full flex items-center justify-center gap-2 text-center text-white text-base font-bold rounded-xl py-3 mt-auto transition-all duration-200 shadow-sm ${CTA_COLORS[key]} group-hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-2`}
        tabIndex={0}
      >
        {CTA_LABELS[key]}
      </a>
    </div>
  );
};

export default LearningPathCard;
