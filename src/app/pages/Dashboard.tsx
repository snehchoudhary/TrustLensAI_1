import { useState } from "react";
import { Search, Upload, ChevronDown, ChevronUp, CheckCircle, AlertTriangle, XCircle, Sparkles } from "lucide-react";
import { TrustScoreCard } from "../components/TrustScoreCard";
import { GlassCard } from "../components/GlassCard";
import { HistoryCard } from "../components/HistoryCard";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

export function Dashboard() {
  const [searchInput, setSearchInput] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const navigate = useNavigate();

  const trustBreakdown = [
    { label: "Source Credibility", score: 85, icon: CheckCircle, color: "text-green-500" },
    { label: "Content Authenticity", score: 68, icon: AlertTriangle, color: "text-yellow-500" },
    { label: "Context Accuracy", score: 63, icon: AlertTriangle, color: "text-yellow-500" },
  ];

  const recentHistory = [
    {
      id: 1,
      title: "Climate Report Shows Temperature Changes",
      url: "https://example-news.com/climate-report",
      trustScore: 72,
      timestamp: "2 hours ago",
      type: "article" as const
    },
    {
      id: 2,
      title: "Electric vehicles produce zero emissions",
      url: "",
      trustScore: 45,
      timestamp: "5 hours ago",
      type: "claim" as const
    },
    {
      id: 3,
      title: "NASA Space Launch Image",
      url: "https://nasa.gov/images/launch-2024",
      trustScore: 92,
      timestamp: "Yesterday",
      type: "image" as const
    }
  ];

  const handleAnalyze = () => {
    if (searchInput.trim()) {
      navigate("/analysis");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      navigate("/image");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-blue-500" />
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
            Verify Digital Content Instantly
          </h2>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Analyze URLs, claims, and media with AI-powered trust verification. Get real-time credibility scores and detailed explanations.
        </p>
      </motion.div>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="p-8">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                placeholder="Paste URL or enter claim to verify..."
                className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400"
              />
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleAnalyze}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Analyze Content
              </button>
              
              <label className="flex-1 cursor-pointer">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all">
                  <Upload className="w-5 h-5" />
                  Upload Image/Video
                </div>
              </label>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Trust Score Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard className="p-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Score Circle */}
            <div className="flex-shrink-0">
              <TrustScoreCard score={72} />
            </div>

            {/* Breakdown */}
            <div className="flex-1 w-full space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Trust Breakdown</h3>
              
              {trustBreakdown.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-5 h-5 ${item.color}`} />
                        <span className="font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">{item.score}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.score}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`h-full ${
                          item.score >= 70 ? "bg-gradient-to-r from-green-400 to-emerald-500" :
                          item.score >= 40 ? "bg-gradient-to-r from-yellow-400 to-orange-500" :
                          "bg-gradient-to-r from-red-400 to-rose-500"
                        }`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Why This Score Section */}
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setExpandedSection(expandedSection === "why" ? null : "why")}
              className="w-full flex items-center justify-between text-left group"
            >
              <span className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                Why this score?
              </span>
              {expandedSection === "why" ? (
                <ChevronUp className="w-5 h-5 text-slate-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-500" />
              )}
            </button>

            {expandedSection === "why" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 space-y-3"
              >
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900 dark:text-green-100">Verified Source</p>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                        The domain is recognized and has a strong reputation with verified ownership.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-900 dark:text-yellow-100">Content Requires Verification</p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                        Some claims need additional fact-checking from multiple sources.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900 dark:text-blue-100">Recent Publication</p>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        Content was published within the last 24 hours. Context is current.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </GlassCard>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <GlassCard hover className="p-6 cursor-pointer" onClick={() => navigate("/claim")}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">Verify Claim</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Check specific statements</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard hover className="p-6 cursor-pointer" onClick={() => navigate("/image")}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">Image Analysis</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Reverse search & verify</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard hover className="p-6 cursor-pointer" onClick={() => navigate("/analysis")}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">Full Analysis</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Comprehensive report</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* History Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <HistoryCard items={recentHistory} />
      </motion.div>
    </div>
  );
}