import { useState } from "react";
import { motion } from "motion/react";
import { GlassCard } from "../components/GlassCard";
import { Settings, Bell, Zap, Shield, Save } from "lucide-react";

export function Preferences() {
  const [accuracyVsSpeed, setAccuracyVsSpeed] = useState(70);
  const [strictness, setStrictnessLevel] = useState(50);
  const [notifications, setNotifications] = useState({
    lowTrust: true,
    mediumTrust: false,
    highTrust: false,
    dailySummary: true,
  });

  const handleSave = () => {
    alert("Preferences saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">User Preferences</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Customize how TrustLens AI analyzes content for you
        </p>
      </motion.div>

      {/* Analysis Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
              <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Analysis Settings</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Configure analysis priorities</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Accuracy vs Speed */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-semibold text-slate-900 dark:text-white">
                    Accuracy vs Speed
                  </label>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Balance between thorough analysis and quick results
                  </p>
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {accuracyVsSpeed}%
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={accuracyVsSpeed}
                  onChange={(e) => setAccuracyVsSpeed(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mt-2">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Speed
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Accuracy
                  </span>
                </div>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {accuracyVsSpeed < 30 
                    ? "⚡ Prioritizing speed - Quick scans with essential checks"
                    : accuracyVsSpeed < 70
                    ? "⚖️ Balanced mode - Good mix of speed and thoroughness"
                    : "🔍 Prioritizing accuracy - Deep analysis with multiple sources"}
                </p>
              </div>
            </div>

            {/* Strictness Level */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-semibold text-slate-900 dark:text-white">
                    Strictness Level
                  </label>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    How strict should the verification be
                  </p>
                </div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {strictness}%
                </div>
              </div>
              
              <input
                type="range"
                min="0"
                max="100"
                value={strictness}
                onChange={(e) => setStrictnessLevel(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>Lenient</span>
                <span>Moderate</span>
                <span>Strict</span>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  {strictness < 30 
                    ? "🟢 Lenient - More content passes verification"
                    : strictness < 70
                    ? "🟡 Moderate - Standard verification criteria"
                    : "🔴 Strict - Only highly verified content scores well"}
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
              <Bell className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Notifications</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Choose when to receive alerts</p>
            </div>
          </div>

          <div className="space-y-4">
            <NotificationToggle
              label="Low Trust Score Alerts"
              description="Get notified when content has a trust score below 40%"
              checked={notifications.lowTrust}
              onChange={(checked) => setNotifications({ ...notifications, lowTrust: checked })}
              color="red"
            />

            <NotificationToggle
              label="Medium Trust Score Alerts"
              description="Get notified when content has a trust score between 40-69%"
              checked={notifications.mediumTrust}
              onChange={(checked) => setNotifications({ ...notifications, mediumTrust: checked })}
              color="yellow"
            />

            <NotificationToggle
              label="High Trust Score Alerts"
              description="Get notified when content has a trust score above 70%"
              checked={notifications.highTrust}
              onChange={(checked) => setNotifications({ ...notifications, highTrust: checked })}
              color="green"
            />

            <NotificationToggle
              label="Daily Summary"
              description="Receive a daily summary of all analyzed content"
              checked={notifications.dailySummary}
              onChange={(checked) => setNotifications({ ...notifications, dailySummary: checked })}
              color="blue"
            />
          </div>
        </GlassCard>
      </motion.div>

      {/* Analysis History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard className="p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Data & Privacy</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">Save Analysis History</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Keep a record of your verified content
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <button className="w-full p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
              Clear All History
            </button>
          </div>
        </GlassCard>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center"
      >
        <button
          onClick={handleSave}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          Save Preferences
        </button>
      </motion.div>
    </div>
  );
}

interface NotificationToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  color: "red" | "yellow" | "green" | "blue";
}

function NotificationToggle({ label, description, checked, onChange, color }: NotificationToggleProps) {
  const colorClasses = {
    red: "peer-checked:bg-red-600",
    yellow: "peer-checked:bg-yellow-600",
    green: "peer-checked:bg-green-600",
    blue: "peer-checked:bg-blue-600",
  };

  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
      <div className="flex-1">
        <div className="font-semibold text-slate-900 dark:text-white">{label}</div>
        <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{description}</div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer ml-4">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className={`w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${color}-300 dark:peer-focus:ring-${color}-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 ${colorClasses[color]}`}></div>
      </label>
    </div>
  );
}
