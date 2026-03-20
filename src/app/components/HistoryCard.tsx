import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";
import { Clock, ExternalLink } from "lucide-react";
import { TrustScoreCard } from "./TrustScoreCard";

interface HistoryItem {
  id: number;
  title: string;
  url: string;
  trustScore: number;
  timestamp: string;
  type: "article" | "claim" | "image";
}

interface HistoryCardProps {
  items: HistoryItem[];
}

export function HistoryCard({ items }: HistoryCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "article":
        return "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400";
      case "claim":
        return "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400";
      case "image":
        return "bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
    }
  };

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Analyses</h3>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-slate-400 py-8">
            No analysis history yet. Start by verifying some content!
          </p>
        ) : (
          items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <TrustScoreCard score={item.trustScore} size="small" showDetails={false} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-slate-900 dark:text-white line-clamp-1">
                      {item.title}
                    </h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getTypeColor(item.type)} flex-shrink-0`}
                    >
                      {item.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.timestamp}
                    </span>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-3 h-3" />
                        View source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </GlassCard>
  );
}
