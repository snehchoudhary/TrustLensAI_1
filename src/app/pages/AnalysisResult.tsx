import { motion } from "motion/react";
import { TrustScoreCard } from "../components/TrustScoreCard";
import { GlassCard } from "../components/GlassCard";
import { TrustBreakdownChart } from "../components/TrustBreakdownChart";
import { CheckCircle, XCircle, AlertTriangle, ExternalLink, Calendar, User, Globe } from "lucide-react";

export function AnalysisResult() {
  const analysisData = {
    url: "https://example-news-site.com/article/climate-report-2026",
    title: "New Climate Report Shows Significant Temperature Changes in 2026",
    publishDate: "March 18, 2026",
    author: "Dr. Sarah Johnson",
    trustScore: 72,
    sourceVerified: true,
    sections: [
      {
        title: "Source Analysis",
        status: "verified",
        icon: CheckCircle,
        color: "green",
        findings: [
          { text: "Domain registered for 8+ years", verified: true },
          { text: "SSL certificate valid", verified: true },
          { text: "Author credentials verified", verified: true },
          { text: "Published by recognized organization", verified: true },
        ]
      },
      {
        title: "Claim Verification",
        status: "mixed",
        icon: AlertTriangle,
        color: "yellow",
        findings: [
          { text: "Temperature data matches scientific sources", verified: true },
          { text: "Some projections require additional context", verified: false },
          { text: "References credible scientific studies", verified: true },
          { text: "One claim needs fact-checking", verified: false },
        ]
      },
      {
        title: "Context Check",
        status: "verified",
        icon: CheckCircle,
        color: "green",
        findings: [
          { text: "Information is up-to-date", verified: true },
          { text: "No misleading headlines detected", verified: true },
          { text: "Images match article content", verified: true },
        ]
      }
    ],
    suspiciousContent: [
      {
        text: "Global temperatures will rise by 5°C by 2030",
        reason: "This projection exceeds consensus scientific estimates. Most models predict 1.5-2°C increase by 2030.",
        severity: "high"
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Analysis Report</h2>
        <p className="text-slate-600 dark:text-slate-400">Comprehensive trust verification results</p>
      </motion.div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="p-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{analysisData.title}</h3>
            
            <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <a href={analysisData.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 flex items-center gap-1">
                  {analysisData.url.replace('https://', '')}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {analysisData.publishDate}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {analysisData.author}
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Trust Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard className="p-8">
          <div className="flex justify-center">
            <TrustScoreCard score={analysisData.trustScore} size="large" />
          </div>
        </GlassCard>
      </motion.div>

      {/* Analysis Sections */}
      {analysisData.sections.map((section, idx) => {
        const Icon = section.icon;
        const colorClasses = {
          green: {
            border: "border-green-200 dark:border-green-800",
            bg: "bg-green-50 dark:bg-green-900/20",
            text: "text-green-600 dark:text-green-400",
            iconBg: "bg-green-100 dark:bg-green-900/40"
          },
          yellow: {
            border: "border-yellow-200 dark:border-yellow-800",
            bg: "bg-yellow-50 dark:bg-yellow-900/20",
            text: "text-yellow-600 dark:text-yellow-400",
            iconBg: "bg-yellow-100 dark:bg-yellow-900/40"
          },
          red: {
            border: "border-red-200 dark:border-red-800",
            bg: "bg-red-50 dark:bg-red-900/20",
            text: "text-red-600 dark:text-red-400",
            iconBg: "bg-red-100 dark:bg-red-900/40"
          }
        }[section.color];

        return (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${colorClasses.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${colorClasses.text}`} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{section.title}</h3>
                  
                  <div className="space-y-3">
                    {section.findings.map((finding, fidx) => (
                      <div key={fidx} className="flex items-start gap-3">
                        {finding.verified ? (
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        )}
                        <span className="text-slate-700 dark:text-slate-300">{finding.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        );
      })}

      {/* Suspicious Content */}
      {analysisData.suspiciousContent.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GlassCard className="p-6 border-2 border-red-200 dark:border-red-800">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-4">Suspicious Content Detected</h3>
                
                {analysisData.suspiciousContent.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <p className="font-medium text-red-900 dark:text-red-100 mb-2">"{item.text}"</p>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700 dark:text-red-300">{item.reason}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <GlassCard className="p-6 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/40 dark:to-indigo-950/40">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Summary</h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            This article comes from a <span className="font-semibold text-green-600 dark:text-green-400">verified source</span> with 
            established credibility. Most claims are <span className="font-semibold text-green-600 dark:text-green-400">supported by scientific evidence</span>, 
            though one projection appears exaggerated and should be verified with additional sources. The content is 
            current and contextually accurate, but readers should exercise caution with specific numerical predictions.
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}