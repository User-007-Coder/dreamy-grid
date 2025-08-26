import { motion } from "framer-motion";
import { Star, Download, Sparkles, TrendingUp } from "lucide-react";

const HomePage = () => {
  const stats = [
    { icon: Star, label: "Premium Quality", value: "100%", color: "text-yellow-400" },
    { icon: Download, label: "Downloads", value: "50K+", color: "text-green-400" },
    { icon: Sparkles, label: "New Daily", value: "25+", color: "text-purple-400" },
    { icon: TrendingUp, label: "User Rating", value: "4.9", color: "text-blue-400" },
  ];

  const features = [
    {
      title: "Ultra HD Quality",
      description: "Experience wallpapers in stunning 4K and 8K resolution",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "AI Curated",
      description: "Our AI selects the most beautiful and trending wallpapers",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Instant Download",
      description: "Lightning-fast downloads with no registration required",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: "Mobile Optimized",
      description: "Perfect wallpapers for every device and screen size",
      gradient: "from-orange-500/20 to-red-500/20"
    }
  ];

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="font-space text-6xl md:text-8xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{ backgroundSize: "400% 400%" }}
          >
            Welcome Home
          </motion.h1>
          
          <motion.p 
            className="font-poppins text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Discover the world's most beautiful wallpapers, curated for the ultimate visual experience
          </motion.p>

          {/* CTA Button */}
          <motion.button
            className="glass-button px-8 py-4 rounded-full font-space font-semibold text-lg text-primary hover:text-white transition-all duration-500"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 60px hsl(258 89% 66% / 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Start Exploring
          </motion.button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card p-6 rounded-2xl text-center hover-lift"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
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

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h2 className="font-space text-4xl font-bold text-center mb-12 bg-gradient-primary bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className={`glass-card p-8 rounded-2xl bg-gradient-to-br ${feature.gradient} hover-lift`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + index * 0.2 }}
              >
                <h3 className="font-space text-2xl font-bold mb-4 text-primary">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground font-poppins leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;