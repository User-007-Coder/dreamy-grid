import { motion } from "framer-motion";

const PremiumBackgroundEffects = () => {
  return (
    <>
      {/* Main Gradient Overlay */}
      <div className="fixed inset-0 gradient-background pointer-events-none z-0" />
      
      {/* Floating Orbs */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, hsl(258 89% 66% / 0.2), transparent 70%)",
          filter: "blur(80px)",
          top: "10%",
          left: "10%",
        }}
        animate={{ 
          x: [0, 100, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div
        className="fixed w-80 h-80 rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, hsl(290 84% 60% / 0.15), transparent 70%)",
          filter: "blur(100px)",
          top: "60%",
          right: "15%",
        }}
        animate={{ 
          x: [0, -80, 60, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 5
        }}
      />
      
      <motion.div
        className="fixed w-64 h-64 rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, hsl(270 100% 75% / 0.1), transparent 70%)",
          filter: "blur(60px)",
          bottom: "20%",
          left: "30%",
        }}
        animate={{ 
          x: [0, 120, -80, 0],
          y: [0, -60, 40, 0],
          rotate: [0, 360],
        }}
        transition={{ 
          duration: 35, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 10
        }}
      />

      {/* Animated Grid Pattern */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(hsl(258 89% 66% / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(258 89% 66% / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
        animate={{
          backgroundPosition: ["0 0", "50px 50px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-1 h-1 bg-primary/30 rounded-full pointer-events-none z-0"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -200, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shimmer Effects */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            linear-gradient(
              90deg, 
              transparent, 
              hsl(258 89% 66% / 0.05), 
              transparent
            )
          `,
        }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
};

export default PremiumBackgroundEffects;