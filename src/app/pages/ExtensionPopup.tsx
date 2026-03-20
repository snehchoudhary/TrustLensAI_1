import { motion } from "motion/react";
import { GlassCard } from "../components/GlassCard";
import { TrustScoreCard } from "../components/TrustScoreCard";
import { Shield, ExternalLink, ChevronRight, Globe, Lock, Zap } from "lucide-react";

export function ExtensionPopup() {
  const currentPageData = {
    url: "example-news.com",
    title: "Breaking: Major Scientific Discovery Announced",
    trustScore: 72,
    quickSummary: "Content from verified source with mostly accurate claims",
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Browser Extension Preview</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Compact trust verification that appears while browsing
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Extension Popup Mockup */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Extension Popup</h3>
            
            {/* Popup Container */}
            <div className="relative">
              {/* Browser Chrome Mockup */}
              <div className="bg-slate-200 dark:bg-slate-700 rounded-t-xl p-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-slate-600 dark:text-slate-400">TrustLens AI Extension</span>
                </div>
              </div>

              {/* Popup Content */}
              <GlassCard className="rounded-t-none w-96">
                <div className="p-4 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm">TrustLens AI</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Page Analysis</div>
                      </div>
                    </div>
                  </div>

                  {/* Current Page */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Globe className="w-4 h-4" />
                      <span className="truncate">{currentPageData.url}</span>
                    </div>
                  </div>

                  {/* Trust Score Badge */}
                  <div className="flex justify-center py-2">
                    <TrustScoreCard score={currentPageData.trustScore} size="small" showDetails={false} />
                  </div>

                  {/* Quick Summary */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <p className="text-sm text-slate-700 dark:text-slate-300 text-center">
                      {currentPageData.quickSummary}
                    </p>
                  </div>

                  {/* View Details Button */}
                  <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm">
                    View Full Analysis
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </GlassCard>
            </div>
          </div>
        </motion.div>

        {/* Floating Badge Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Floating Page Badge</h3>
            
            {/* Browser Page Mockup */}
            <GlassCard className="p-6 min-h-96 relative overflow-hidden">
              {/* Simulated Page Content */}
              <div className="space-y-3 opacity-40">
                <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-3/4" />
                <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-full" />
                <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-5/6" />
                <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-full" />
                <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-2/3" />
              </div>

              {/* Floating Trust Badge - Green */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute top-4 right-4"
              >
                <div className="relative group cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-xl hover:shadow-2xl transition-all hover:scale-110">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-xl">
                      Trust Score: 72%
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-slate-900 dark:bg-slate-100 rotate-45" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </GlassCard>

            {/* Badge Color Guide */}
            <GlassCard className="p-4">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Badge Colors</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900 dark:text-white">Trusted (70-100%)</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">High credibility content</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900 dark:text-white">Caution (40-69%)</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Verify before sharing</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900 dark:text-white">Danger (0-39%)</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Low trust, use caution</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard className="p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Extension Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white mb-1">Real-Time Analysis</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Instantly analyzes pages as you browse
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white mb-1">Privacy First</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  No browsing data stored or tracked
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white mb-1">Universal Support</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Works on all websites and platforms
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
