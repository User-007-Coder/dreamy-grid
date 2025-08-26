import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Image, Grid, Settings, Download, Star } from "lucide-react";

interface NavigationMenuProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const NavigationMenu = ({ currentSection, onSectionChange }: NavigationMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Home", icon: Home, description: "Welcome & Overview" },
    { id: "gallery", label: "Gallery", icon: Grid, description: "Browse Wallpapers" },
    { id: "categories", label: "Categories", icon: Image, description: "Organized Collections" },
    { id: "favorites", label: "Favorites", icon: Star, description: "Your Saved Items" },
    { id: "downloads", label: "Downloads", icon: Download, description: "Download History" },
    { id: "settings", label: "Settings", icon: Settings, description: "Preferences" },
  ];

  return (
    <>
      {/* Menu Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 glass-button p-4 rounded-full"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-80 glass-card z-45 p-8 overflow-y-auto"
          >
            {/* Header */}
            <div className="mb-12 mt-16">
              <motion.h2 
                className="font-space text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Navigation
              </motion.h2>
              <motion.p 
                className="text-muted-foreground mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Explore all features
              </motion.p>
            </div>

            {/* Menu Items */}
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 group ${
                    currentSection === item.id 
                      ? 'bg-gradient-hero text-white shadow-glow' 
                      : 'hover:bg-glass/50 text-foreground'
                  }`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg transition-colors ${
                      currentSection === item.id 
                        ? 'bg-white/20' 
                        : 'bg-primary/10 group-hover:bg-primary/20'
                    }`}>
                      <item.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-poppins font-semibold">
                        {item.label}
                      </div>
                      <div className={`text-sm ${
                        currentSection === item.id 
                          ? 'text-white/70' 
                          : 'text-muted-foreground'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <motion.div 
              className="mt-12 pt-8 border-t border-glass-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-center text-muted-foreground text-sm">
                <p>Fantastic Wallpapers</p>
                <p className="text-xs mt-1">Premium Experience</p>
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationMenu;