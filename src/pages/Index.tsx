import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import CategoryTabs from "@/components/CategoryTabs";
import WallpaperCard from "@/components/WallpaperCard";
import BackgroundEffects from "@/components/BackgroundEffects";
import { useImagePreloader } from "@/hooks/useImagePreloader";

// Sample wallpaper data - replace with your actual image paths
const wallpaperData = {
  desktop: Array.from({ length: 14 }, (_, i) => 
    `https://picsum.photos/800/600?random=${i + 1}&category=nature`
  ),
  mobile: Array.from({ length: 28 }, (_, i) => 
    `https://picsum.photos/400/800?random=${i + 15}&category=abstract`
  ),
};

const categories = [
  { key: "desktop", label: "Desktop" },
  { key: "mobile", label: "Mobile" },
];

type CategoryKey = keyof typeof wallpaperData;

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("mobile");
  
  const currentImages = useMemo(() => 
    wallpaperData[activeCategory], 
    [activeCategory]
  );

  const { progress, isImageLoaded, allLoaded } = useImagePreloader({
    images: currentImages,
    priority: 6
  });

  return (
    <div className="min-h-screen gradient-background relative overflow-hidden">
      <BackgroundEffects />
      
      {/* Loading Progress Bar */}
      <AnimatePresence>
        {!allLoaded && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="h-1 bg-white/20 backdrop-blur-sm">
              <motion.div
                className="h-full bg-gradient-hero"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <motion.section 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.p 
              className="font-poppins text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Discover & download your favorite aesthetic backgrounds for{" "}
              <span className="font-semibold text-primary">Mobile</span> or{" "}
              <span className="font-semibold text-primary">Desktop</span>.
              <br />
              Always new, always beautiful.{" "}
              <motion.span 
                className="inline-block text-accent"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                ✨
              </motion.span>
            </motion.p>
          </motion.section>

          {/* Category Tabs */}
          <CategoryTabs
            value={activeCategory}
            onChange={(category) => setActiveCategory(category as CategoryKey)}
            categories={categories}
          />

          {/* Wallpapers Grid */}
          <motion.section
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
                    delay: index * 0.05,
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
          </motion.section>

          {/* Footer */}
          <motion.footer 
            className="text-center mt-16 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p className="font-poppins text-foreground/60">
              Made with{" "}
              <motion.span 
                className="text-red-400 inline-block"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                ♥
              </motion.span>{" "}
              | Enjoy your fresh look!
            </p>
          </motion.footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
