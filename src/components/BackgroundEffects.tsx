import { motion } from "framer-motion";

const BackgroundEffects = () => {
  return (
    <>
      {/* Animated Gradient Blobs */}
      <motion.div
        className="fixed top-0 left-0 w-80 h-60 rounded-full opacity-30 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, hsl(208 100% 71% / 0.4), transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ 
          x: [-50, 50, -50],
          y: [-20, 20, -20],
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div
        className="fixed top-1/4 right-0 w-64 h-48 rounded-full opacity-25 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, hsl(232 89% 58% / 0.3), transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ 
          x: [50, -30, 50],
          y: [0, 40, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 5
        }}
      />
      
      <motion.div
        className="fixed bottom-0 left-1/3 w-72 h-56 rounded-full opacity-20 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, hsl(204 100% 63% / 0.3), transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ 
          x: [-30, 60, -30],
          y: [20, -20, 20],
          rotate: [0, 180, 360],
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 10
        }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-2 h-2 bg-primary/20 rounded-full pointer-events-none z-0"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

export default BackgroundEffects;