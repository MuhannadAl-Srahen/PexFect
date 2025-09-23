"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { Challenge } from "@/services/challenges/types";
import { ChallengeGridItem } from "@/services/challenges/components/ChallengeGridItem";
import { useState } from "react";

interface VerticalTickerProps {
  challenges: Challenge[];
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards = ({
  challenges,
  speed = "normal",
  pauseOnHover = true,
  className,
}: VerticalTickerProps) => {
  const [savedChallenges, setSavedChallenges] = useState<Set<number>>(new Set());

  const handleToggleSave = (challengeId: number) => {
    setSavedChallenges((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(challengeId)) {
        newSet.delete(challengeId);
      } else {
        newSet.add(challengeId);
      }
      return newSet;
    });
  };

  const limitedChallenges = challenges.slice(0, 3);
  while (limitedChallenges.length < 3) {
    limitedChallenges.push(...challenges.slice(0, 3 - limitedChallenges.length));
  }

  const column1 = limitedChallenges;
  const column2 = limitedChallenges;
  const column3 = limitedChallenges;

  const ScrollingColumn = ({
    challenges,
    direction,
    columnSpeed,
  }: {
    challenges: Challenge[];
    direction: "up" | "down";
    columnSpeed?: "fast" | "normal" | "slow";
  }) => {
    const duplicatedChallenges = [...challenges, ...challenges, ...challenges, ...challenges];

    const getColumnDuration = () => {
      const speedToUse = columnSpeed || speed;
      switch (speedToUse) {
        case "fast":
          return 20;
        case "slow":
          return 35;
        default:
          return 25;
      }
    };

    return (
      <div className="relative h-full overflow-hidden">
        <motion.div
          className="flex flex-col gap-3"
          animate={{
            y:
              direction === "up"
                ? ["0%", "-50%"]
                : ["-50%", "0%"], 
          }}
          transition={{
            duration: getColumnDuration(),
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
          whileHover={pauseOnHover ? { animationPlayState: "paused" } : {}}
        >
          {duplicatedChallenges.map((challenge, index) => (
            <div
              key={`${challenge.id}-${index}`}
              className="w-full flex-shrink-0 px-2 py-0.5"
            >
              <ChallengeGridItem
                challenge={challenge}
                isSaved={savedChallenges.has(challenge.id)}
                onToggleSave={handleToggleSave}
              />
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        "h-[650px] sm:h-[700px] lg:h-[700px] p-3",
        className
      )}
    >
      {/* Mobile: Single column */}
      <div className="block lg:hidden">
        <div className="flex justify-center h-full px-4">
          <div className="w-full max-w-md">
            <ScrollingColumn challenges={challenges} direction="up" />
          </div>
        </div>
      </div>

      <div className="hidden lg:flex gap-4 h-full px-8">
        <div className="flex-1">
          <ScrollingColumn challenges={column1} direction="up" />
        </div>

        <div className="flex-1">
          <ScrollingColumn
            challenges={column2}
            direction="down"
            columnSpeed="slow"
          />
        </div>

        <div className="flex-1">
          <ScrollingColumn challenges={column3} direction="up" />
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background via-background/80 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
      </div>
    </div>
  );
};
