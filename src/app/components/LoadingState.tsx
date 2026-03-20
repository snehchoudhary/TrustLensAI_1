import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Analyzing content..." }: LoadingStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 gap-4"
    >
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      <p className="text-slate-600 dark:text-slate-400">{message}</p>
    </motion.div>
  );
}
