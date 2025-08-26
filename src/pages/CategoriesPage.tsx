import { motion } from "framer-motion";
import { Image, Monitor, Smartphone, Palette, Camera, Sparkles } from "lucide-react";

const CategoriesPage = () => {
  const categories = [
    {
      id: "desktop",
      name: "Desktop",
      description: "High-resolution wallpapers perfect for your computer",
      icon: Monitor,
      count: "2.5K+",
      gradient: "from-blue-500/20 to-purple-500/20",
      color: "text-blue-400"
    },
    {
      id: "mobile",
      name: "Mobile",
      description: "Optimized wallpapers for smartphones and tablets",
      icon: Smartphone,
      count: "3.2K+",
      gradient: "from-green-500/20 to-teal-500/20",
      color: "text-green-400"
    },
    {
      id: "abstract",
      name: "Abstract",
      description: "Artistic and creative abstract designs",
      icon: Palette,
      count: "1.8K+",
      gradient: "from-purple-500/20 to-pink-500/20",
      color: "text-purple-400"
    },
    {
      id: "nature",
      name: "Nature",
      description: "Beautiful landscapes and natural scenery",
      icon: Camera,
      count: "2.1K+",
      gradient: "from-green-500/20 to-yellow-500/20",
      color: "text-green-400"
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean and simple designs for a clutter-free look",
      icon: Sparkles,
      count: "1.5K+",
      gradient: "from-gray-500/20 to-slate-500/20",
      color: "text-gray-400"
    },
    {
      id: "artistic",
      name: "Artistic",
      description: "Creative artwork and digital art pieces",
      icon: Image,
      count: "1.9K+",
      gradient: "from-orange-500/20 to-red-500/20",
      color: "text-orange-400"
    }
  ];

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-space text-5xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            Categories
          </h1>
          <p className="font-poppins text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse wallpapers by category to find exactly what you're looking for
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className={`glass-card p-8 rounded-2xl bg-gradient-to-br ${category.gradient} hover-lift interactive-card group`}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -10 }}
            >
              {/* Icon */}
              <motion.div
                className="mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                  <category.icon size={32} className="text-white" />
                </div>
              </motion.div>

              {/* Content */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-space text-2xl font-bold text-foreground">
                    {category.name}
                  </h3>
                  <motion.span 
                    className={`font-space font-bold ${category.color}`}
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: index * 0.3 
                    }}
                  >
                    {category.count}
                  </motion.span>
                </div>
                
                <p className="text-muted-foreground font-poppins leading-relaxed">
                  {category.description}
                </p>

                {/* Explore Button */}
                <motion.button
                  className="w-full mt-6 glass-button py-3 rounded-xl font-poppins font-semibold text-primary hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore {category.name}
                </motion.button>
              </div>

              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${category.gradient.split(' ')[1]}, ${category.gradient.split(' ')[3]})`,
                  mixBlendMode: "overlay"
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Featured Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="glass-card p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10">
            <motion.h2 
              className="font-space text-3xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{ backgroundSize: "400% 400%" }}
            >
              Can't find what you're looking for?
            </motion.h2>
            <p className="font-poppins text-muted-foreground mb-6 max-w-2xl mx-auto">
              Request custom categories or suggest new collections. We're always expanding our library!
            </p>
            <motion.button
              className="glass-button px-8 py-4 rounded-full font-space font-semibold text-lg text-primary hover:text-white transition-all duration-500"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 60px hsl(258 89% 66% / 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Request
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CategoriesPage;