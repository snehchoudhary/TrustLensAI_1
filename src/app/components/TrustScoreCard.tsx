import { motion } from "motion/react";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface TrustScoreCardProps {
  score: number;
  size?: "small" | "medium" | "large";
  showDetails?: boolean;
}

export function TrustScoreCard({ score, size = "large", showDetails = true }: TrustScoreCardProps) {
  const getColor = () => {
    if (score >= 70) return { bg: "from-green-400 to-emerald-500", text: "text-green-600 dark:text-green-400", icon: CheckCircle };
    if (score >= 40) return { bg: "from-yellow-400 to-orange-500", text: "text-yellow-600 dark:text-yellow-400", icon: AlertTriangle };
    return { bg: "from-red-400 to-rose-500", text: "text-red-600 dark:text-red-400", icon: XCircle };
  };

  const getTrustLevel = () => {
    if (score >= 70) return "Trusted";
    if (score >= 40) return "Caution";
    return "Danger";
  };

  const color = getColor();
  const Icon = color.icon;
  
  const sizes = {
    small: { circle: 80, stroke: 8, text: "text-xl", container: "w-24" },
    medium: { circle: 120, stroke: 10, text: "text-3xl", container: "w-36" },
    large: { circle: 180, stroke: 12, text: "text-5xl", container: "w-52" }
  };

  const { circle, stroke, text, container } = sizes[size];
  const radius = (circle - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`${container} relative`}>
        {/* Background Circle */}
        <svg width={circle} height={circle} className="transform -rotate-90">
          <circle
            cx={circle / 2}
            cy={circle / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-slate-200 dark:text-slate-700"
          />
          {/* Progress Circle */}
          <motion.circle
            cx={circle / 2}
            cy={circle / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            className={`bg-gradient-to-r ${color.bg}`}
            style={{
              stroke: "url(#gradient)",
              strokeDasharray: circumference,
              strokeDashoffset: offset,
            }}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={score >= 70 ? "text-green-400" : score >= 40 ? "text-yellow-400" : "text-red-400"} stopColor="currentColor" />
              <stop offset="100%" className={score >= 70 ? "text-emerald-500" : score >= 40 ? "text-orange-500" : "text-rose-500"} stopColor="currentColor" />
            </linearGradient>
          </defs>
        </svg>

        {/* Score Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className={`${text} font-bold ${color.text}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-sm text-slate-600 dark:text-slate-400">Trust Score</span>
        </div>
      </div>

      {showDetails && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-2"
        >
          <Icon className={`w-5 h-5 ${color.text}`} />
          <span className={`font-semibold ${color.text}`}>{getTrustLevel()}</span>
        </motion.div>
      )}
    </div>
  );
}
