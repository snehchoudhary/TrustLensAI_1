import { useState } from "react";
import { motion } from "motion/react";
import { GlassCard } from "../components/GlassCard";
import { Upload, Image as ImageIcon, CheckCircle, XCircle, AlertTriangle, ExternalLink, Clock } from "lucide-react";

export function ImageVerification() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setAnalyzing(true);
        setTimeout(() => {
          setAnalyzing(false);
          setShowResults(true);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const analysisResults = {
    status: "verified",
    foundInSources: 12,
    firstAppearance: "January 15, 2024",
    manipulation: "None detected",
    timeline: [
      { date: "Jan 15, 2024", source: "NASA Official Website", verified: true },
      { date: "Jan 18, 2024", source: "Scientific American", verified: true },
      { date: "Feb 2, 2024", source: "Space.com", verified: true },
      { date: "Mar 1, 2024", source: "National Geographic", verified: true },
    ],
    metadata: {
      resolution: "4096 x 3072",
      format: "JPEG",
      camera: "Canon EOS R5",
      location: "Kennedy Space Center, FL",
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Image Verification</h2>
        <p className="text-slate-600 dark:text-slate-400">Upload an image to verify its authenticity and origin</p>
      </motion.div>

      {/* Upload Section */}
      {!uploadedImage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="p-12">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Upload Image
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Click to browse or drag and drop an image file
                  </p>
                </div>
                <div className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Choose File
                </div>
              </div>
            </label>
          </GlassCard>
        </motion.div>
      )}

      {/* Image Preview */}
      {uploadedImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <GlassCard className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Uploaded Image</h3>
                <button
                  onClick={() => {
                    setUploadedImage(null);
                    setShowResults(false);
                    setAnalyzing(false);
                  }}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                  Upload Different Image
                </button>
              </div>
              <div className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={uploadedImage}
                  alt="Uploaded content"
                  className="w-full h-auto max-h-96 object-contain"
                />
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Analyzing State */}
      {analyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard className="p-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Analyzing Image</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Performing reverse image search and authenticity check...
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Results */}
      {showResults && (
        <>
          {/* Status Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="p-6 border-2 border-green-200 dark:border-green-800">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-1">
                    Image Verified
                  </h3>
                  <p className="text-green-700 dark:text-green-300">
                    Found in {analysisResults.foundInSources} verified sources
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <GlassCard className="p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {analysisResults.foundInSources}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Sources Found</div>
              </div>
            </GlassCard>

            <GlassCard className="p-4">
              <div className="text-center">
                <div className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {analysisResults.firstAppearance}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">First Appearance</div>
              </div>
            </GlassCard>

            <GlassCard className="p-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {analysisResults.manipulation}
                  </div>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Manipulation Status</div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Usage Timeline
              </h3>
              <div className="space-y-4">
                {analysisResults.timeline.map((entry, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${entry.verified ? 'bg-green-500' : 'bg-yellow-500'}`} />
                      {idx < analysisResults.timeline.length - 1 && (
                        <div className="w-0.5 h-12 bg-slate-200 dark:bg-slate-700 my-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">{entry.source}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{entry.date}</div>
                        </div>
                        {entry.verified && (
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Image Metadata
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(analysisResults.metadata).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <GlassCard className="p-6 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/40 dark:to-emerald-950/40">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Verification Summary</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                This image has been <span className="font-semibold text-green-600 dark:text-green-400">verified as authentic</span> and 
                appears in multiple credible sources. The metadata is consistent with the claimed origin, and no signs of manipulation 
                were detected. The image was first published by NASA and has been widely shared by reputable news organizations.
              </p>
            </GlassCard>
          </motion.div>
        </>
      )}
    </div>
  );
}
