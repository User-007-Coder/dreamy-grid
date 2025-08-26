import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CategoryTabs from "@/components/CategoryTabs";
import WallpaperCard from "@/components/WallpaperCard";
import { useImagePreloader } from "@/hooks/useImagePreloader";

// Enhanced wallpaper data with more variety
const wallpaperData = {
  desktop: Array.from({ length: 20 }, (_, i) => 
    `https://picsum.photos/1920/1080?random=${i + 1}&category=nature`
  ),
  mobile: Array.from({ length: 24 }, (_, i) => 
    `https://picsum.photos/400/800?random=${i + 25}&category=abstract`
  ),
  abstract: Array.from({ length: 18 }, (_, i) => 
    `https://picsum.photos/1200/800?random=${i + 50}&category=abstract`
  ),
  nature: Array.from({ length: 16 }, (_, i) => 
    `https://picsum.photos/1200/800?random=${i + 70}&category=nature`
  ),
};

const categories = [
  { key: "desktop", label: "Desktop" },
  { key: "mobile", label: "Mobile" },
  { key: "abstract", label: "Abstract" },
  { key: "nature", label: "Nature" },
];

type CategoryKey = keyof typeof wallpaperData;

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("desktop");
  
  const currentImages = useMemo(() => 
    wallpaperData[activeCategory], 
    [activeCategory]
  );

  const { progress, allLoaded } = useImagePreloader({
    images: currentImages,
    priority: 8
  });

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-space text-5xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            Gallery
          </h1>
          <p className="font-poppins text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of premium wallpapers
          </p>
        </motion.div>

        {/* Loading Progress */}
        <AnimatePresence>
          {!allLoaded && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="glass-card p-4 rounded-xl max-w-md mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-poppins text-muted-foreground">Loading Images</span>
                  <span className="text-sm font-space font-bold text-primary">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CategoryTabs
            value={activeCategory}
            onChange={(category) => setActiveCategory(category as CategoryKey)}
            categories={categories}
          />
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8"
          layout
        >
          <AnimatePresence mode="wait">
            {currentImages.map((imageSrc, index) => (
              <motion.div
                key={`${activeCategory}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.03,
                  layout: { duration: 0.3 }
                }}
              >
                <WallpaperCard
                  src={imageSrc}
                  alt={`${activeCategory} wallpaper ${index + 1}`}
                  index={index}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            className="glass-button px-8 py-4 rounded-full font-space font-semibold text-lg text-primary hover:text-white transition-all duration-500"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 60px hsl(258 89% 66% / 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Wallpapers
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default GalleryPage;