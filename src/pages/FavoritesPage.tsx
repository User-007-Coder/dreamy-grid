import { motion } from "framer-motion";
import { Heart, Star, Download } from "lucide-react";

const FavoritesPage = () => {
  const handleAddFavorites = () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'gallery' }));
    window.dispatchEvent(new CustomEvent('showToast', { 
      detail: { message: 'Start exploring wallpapers to add favorites!', type: 'info' }
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
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Heart size={48} className="text-primary animate-pulse-glow" />
          </motion.div>

          <h1 className="font-space text-5xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            Favorites
          </h1>
          <p className="font-poppins text-xl text-muted-foreground max-w-2xl mx-auto">
            Your carefully curated collection of favorite wallpapers
          </p>
        </motion.div>

        {/* Empty State */}
        <motion.div
          className="text-center glass-card p-12 rounded-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto mb-8">
              {[Star, Heart, Download].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: index * 0.5 
                  }}
                >
                  <Icon size={24} className="text-white" />
                </motion.div>
              ))}
            </div>

            <h3 className="font-space text-2xl font-bold text-foreground mb-4">
              No favorites yet
            </h3>
            <p className="text-muted-foreground font-poppins mb-8 max-w-md mx-auto">
              Start exploring our gallery and click the heart icon on wallpapers you love to save them here.
            </p>

            <motion.button
              onClick={handleAddFavorites}
              className="glass-button px-8 py-4 rounded-full font-space font-semibold text-lg text-primary hover:text-white transition-all duration-500"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 60px hsl(258 89% 66% / 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Gallery
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FavoritesPage;