"use client";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export const BackgroundRippleEffect = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 h-full w-full",
        // Light mode: white to primary 
        resolvedTheme === 'light' && "bg-gradient-to-b from-white to-primary",
        // Dark mode: background to primary 
        resolvedTheme === 'dark' && "bg-gradient-to-b from-background to-primary",
      )}
    />
  );
};
