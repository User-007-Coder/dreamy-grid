import { motion } from "framer-motion";
import { Download, Clock, Image, Folder } from "lucide-react";

const DownloadsPage = () => {
  const handleStartDownloading = () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'gallery' }));
    window.dispatchEvent(new CustomEvent('showToast', { 
      detail: { message: 'Visit the gallery to start downloading wallpapers!', type: 'info' }
    }));
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="w-24 h-24 mx-auto mb-8 glass-card rounded-full flex items-center justify-center"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Download size={48} className="text-primary animate-pulse-glow" />
          </motion.div>

          <h1 className="font-space text-5xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            Downloads
          </h1>
          <p className="font-poppins text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your download history and manage your wallpaper collection
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          className="grid grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { icon: Clock, label: "Recent", value: "0", color: "text-blue-400" },
            { icon: Image, label: "Total", value: "0", color: "text-green-400" },
            { icon: Folder, label: "Categories", value: "0", color: "text-purple-400" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card p-6 rounded-2xl text-center hover-lift"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-primary rounded-full">
                  <stat.icon size={24} className="text-white" />
                </div>
              </div>
              <motion.div 
                className={`text-3xl font-bold ${stat.color} mb-2`}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-muted-foreground font-poppins">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        <motion.div
          className="text-center glass-card p-12 rounded-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="w-32 h-32 mx-auto mb-8 bg-gradient-primary rounded-full flex items-center justify-center"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Download size={64} className="text-white" />
          </motion.div>

          <h3 className="font-space text-2xl font-bold text-foreground mb-4">
            No downloads yet
          </h3>
          <p className="text-muted-foreground font-poppins mb-8 max-w-md mx-auto">
            Your download history will appear here. Start downloading amazing wallpapers from our collection!
          </p>

          <motion.button
            onClick={handleStartDownloading}
            className="glass-button px-8 py-4 rounded-full font-space font-semibold text-lg text-primary hover:text-white transition-all duration-500"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 60px hsl(258 89% 66% / 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Start Downloading
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default DownloadsPage;