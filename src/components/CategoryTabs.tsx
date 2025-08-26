import { motion, AnimatePresence } from "framer-motion";

interface Category {
  key: string;
  label: string;
}

interface CategoryTabsProps {
  value: string;
  onChange: (category: string) => void;
  categories: Category[];
}

const CategoryTabs = ({ value, onChange, categories }: CategoryTabsProps) => {
  return (
    <motion.div 
      className="w-full max-w-md mx-auto glass-card rounded-2xl p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="flex justify-center items-center space-x-2">
        {categories.map(({ key, label }) => (
          <motion.button
            key={key}
            onClick={() => onChange(key)}
            className={`
              relative px-6 py-3 rounded-full font-poppins font-semibold text-base sm:text-lg
              transition-all duration-300 ease-spring
              ${value === key 
                ? 'text-white shadow-glow' 
                : 'text-primary hover:text-primary-glow'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence>
              {value === key && (
                <motion.div
                  className="absolute inset-0 bg-gradient-hero rounded-full"
                  layoutId="activeTab"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">{label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoryTabs;