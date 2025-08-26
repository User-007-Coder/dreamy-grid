import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroPage from "@/components/IntroPage";
import NavigationMenu from "@/components/NavigationMenu";
import PremiumBackgroundEffects from "@/components/PremiumBackgroundEffects";
import HomePage from "./HomePage";
import GalleryPage from "./GalleryPage";
import CategoriesPage from "./CategoriesPage";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentSection, setCurrentSection] = useState("home");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if user has seen intro before
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShowIntro(false);
    }
    setIsLoaded(true);
  }, []);

  const handleIntroComplete = () => {
    localStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "home":
        return <HomePage />;
      case "gallery":
        return <GalleryPage />;
      case "categories":
        return <CategoriesPage />;
      case "favorites":
        return (
          <div className="min-h-screen py-20 px-6 flex items-center justify-center">
            <motion.div
              className="text-center glass-card p-12 rounded-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h2 className="font-space text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                Favorites
              </h2>
              <p className="text-muted-foreground font-poppins">
                Your favorite wallpapers will appear here
              </p>
            </motion.div>
          </div>
        );
      case "downloads":
        return (
          <div className="min-h-screen py-20 px-6 flex items-center justify-center">
            <motion.div
              className="text-center glass-card p-12 rounded-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h2 className="font-space text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                Downloads
              </h2>
              <p className="text-muted-foreground font-poppins">
                Your download history will be tracked here
              </p>
            </motion.div>
          </div>
        );
      case "settings":
        return (
          <div className="min-h-screen py-20 px-6 flex items-center justify-center">
            <motion.div
              className="text-center glass-card p-12 rounded-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h2 className="font-space text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                Settings
              </h2>
              <p className="text-muted-foreground font-poppins">
                Customize your experience here
              </p>
            </motion.div>
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <motion.div
          className="flex space-x-2"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-primary rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PremiumBackgroundEffects />
      
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
          >
            <IntroPage onComplete={handleIntroComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <NavigationMenu 
              currentSection={currentSection}
              onSectionChange={setCurrentSection}
            />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {renderCurrentSection()}
              </motion.div>
            </AnimatePresence>

            {/* Footer */}
            <motion.footer 
              className="relative z-10 text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="glass-card mx-auto max-w-md p-6 rounded-2xl">
                <p className="font-poppins text-muted-foreground">
                  Made with{" "}
                  <motion.span 
                    className="text-red-400 inline-block"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                  >
                    ♥
                  </motion.span>{" "}
                  | Premium Experience
                </p>
              </div>
            </motion.footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
