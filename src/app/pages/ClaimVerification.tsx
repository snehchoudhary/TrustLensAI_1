import { useState } from "react";
import { motion } from "motion/react";
import { GlassCard } from "../components/GlassCard";
import { CheckCircle, XCircle, AlertTriangle, Search, Lightbulb } from "lucide-react";

export function ClaimVerification() {
  const [claim, setClaim] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleVerify = () => {
    if (claim.trim()) {
      setShowResult(true);
    }
  };

  const exampleClaims = [
    "Electric vehicles produce zero emissions",
    "Coffee is the most consumed beverage worldwide",
    "The Great Wall of China is visible from space",
  ];

  const verdictData = {
    verdict: "Misleading",
    confidence: 78,
    explanation: "While electric vehicles produce zero tailpipe emissions during operation, the complete picture is more nuanced. Manufacturing EVs, especially their batteries, does generate emissions. Additionally, the electricity used to charge them may come from fossil fuel sources. However, over their lifetime, EVs typically produce fewer total emissions than traditional combustion engine vehicles.",
    sources: [
      "Union of Concerned Scientists - EV Emissions Study 2025",
      "International Energy Agency - Global EV Outlook",
      "EPA Environmental Impact Assessment"
    ],
    relatedFacts: [
      { text: "EV batteries require significant energy to manufacture", status: "true" },
      { text: "Charging from renewable energy reduces emissions significantly", status: "true" },
      { text: "Lifetime emissions of EVs are typically 50-70% lower than gas vehicles", status: "true" },
    ]
  };

  const getVerdictStyle = (verdict: string) => {
    if (verdict === "True") return {
      icon: CheckCircle,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      gradient: "from-green-500 to-emerald-600"
    };
    if (verdict === "False") return {
      icon: XCircle,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      gradient: "from-red-500 to-rose-600"
    };
    return {
      icon: AlertTriangle,
      color: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      border: "border-yellow-200 dark:border-yellow-800",
      gradient: "from-yellow-500 to-orange-600"
    };
  };

  const style = getVerdictStyle(verdictData.verdict);
  const VerdictIcon = style.icon;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Claim Verification</h2>
        <p className="text-slate-600 dark:text-slate-400">Enter a statement or claim to verify its accuracy</p>
      </motion.div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={claim}
                onChange={(e) => setClaim(e.target.value)}
                placeholder="Highlight or enter a claim to verify..."
                rows={4}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 resize-none"
              />
            </div>

            <button
              onClick={handleVerify}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Verify Claim
            </button>
          </div>
        </GlassCard>
      </motion.div>

      {/* Example Claims */}
      {!showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400">Try these examples:</h3>
            <div className="grid gap-2">
              {exampleClaims.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setClaim(example);
                    setShowResult(true);
                  }}
                  className="text-left p-4 bg-white/40 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all text-slate-700 dark:text-slate-300"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Results */}
      {showResult && (
        <>
          {/* Verdict Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className={`p-8 border-2 ${style.border}`}>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${style.gradient} flex items-center justify-center`}>
                  <VerdictIcon className="w-10 h-10 text-white" />
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    {verdictData.verdict}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-slate-600 dark:text-slate-400">Confidence:</span>
                    <span className={`text-2xl font-bold ${style.color}`}>{verdictData.confidence}%</span>
                  </div>
                </div>

                {/* Confidence Bar */}
                <div className="w-full max-w-md">
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${verdictData.confidence}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full bg-gradient-to-r ${style.gradient}`}
                    />
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Explanation</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {verdictData.explanation}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Related Facts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Related Facts</h3>
              <div className="space-y-3">
                {verdictData.relatedFacts.map((fact, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">{fact.text}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Sources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Sources</h3>
              <div className="space-y-2">
                {verdictData.sources.map((source, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {source}
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Reset Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center"
          >
            <button
              onClick={() => {
                setClaim("");
                setShowResult(false);
              }}
              className="px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              Verify Another Claim
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
}
