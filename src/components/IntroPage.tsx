import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Play } from "lucide-react";
import PremiumBackgroundEffects from "./PremiumBackgroundEffects";

interface IntroPageProps {
  onComplete: () => void;
}

const IntroPage = ({ onComplete }: IntroPageProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const steps = [
    {
      title: "Welcome to",
      subtitle: "Fantastic Wallpapers",
      description: "The most premium wallpaper experience",
      icon: Sparkles
    },
    {
      title: "Discover",
      subtitle: "Infinite Beauty",
      description: "Curated collections of stunning wallpapers",
      icon: Play
    },
    {
      title: "Ready to",
      subtitle: "Transform Your Screens",
      description: "Let's begin your journey",
      icon: ArrowRight
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsReady(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentStep, steps.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <PremiumBackgroundEffects />
      
      <div className="relative z-10 text-center px-8 max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, y: -50 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              type: "spring",
              stiffness: 100
            }}
            className="space-y-8"
          >
            {/* Icon */}
            <motion.div
              className="mx-auto w-24 h-24 glass-card rounded-full flex items-center justify-center"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              {(() => {
                const IconComponent = steps[currentStep].icon;
                return (
                  <IconComponent 
                    size={48} 
                    className="text-primary animate-pulse-glow" 
                  />
                );
              })()}
            </motion.div>

            {/* Text Content */}
            <div className="space-y-4">
              <motion.h1 
                className="font-space text-2xl md:text-3xl text-muted-foreground font-medium"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {steps[currentStep].title}
              </motion.h1>
              
              <motion.h2 
                className="font-space text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight"
                style={{
                  backgroundSize: "400% 400%",
                }}
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                {steps[currentStep].subtitle}
              </motion.h2>
              
              <motion.p 
                className="font-poppins text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {steps[currentStep].description}
              </motion.p>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center space-x-3 mt-12">
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === currentStep 
                      ? 'w-8 bg-primary' 
                      : index < currentStep 
                        ? 'w-2 bg-primary/60' 
                        : 'w-2 bg-muted'
                  }`}
                  animate={index === currentStep ? { 
                    scale: [1, 1.2, 1],
                    boxShadow: ["0 0 0px hsl(258 89% 66%)", "0 0 20px hsl(258 89% 66%)", "0 0 0px hsl(258 89% 66%)"]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Enter Button */}
        <AnimatePresence>
          {isReady && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.5,
                type: "spring",
                stiffness: 150 
              }}
              className="mt-16"
            >
              <motion.button
                onClick={onComplete}
                className="glass-button px-12 py-4 rounded-full font-space font-semibold text-xl text-primary hover:text-white transition-all duration-500 group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 60px hsl(258 89% 66% / 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center space-x-3">
                  <span>Enter Experience</span>
                  <ArrowRight 
                    size={24} 
                    className="group-hover:translate-x-1 transition-transform" 
                  />
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Loading Animation */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-primary rounded-full"
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
        </div>
      </motion.div>
    </div>
  );
};

export default IntroPage;