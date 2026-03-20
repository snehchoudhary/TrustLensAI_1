import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = "", hover = false }: GlassCardProps) {
  return (
    <div
      className={`
        backdrop-blur-xl bg-white/60 dark:bg-slate-800/60 
        border border-slate-200/50 dark:border-slate-700/50
        rounded-2xl shadow-xl
        ${hover ? "hover:shadow-2xl hover:scale-[1.02] transition-all duration-300" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
