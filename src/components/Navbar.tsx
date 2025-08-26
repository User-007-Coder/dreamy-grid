import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.header 
      className="relative top-0 left-0 z-50 p-6 border-4 border-foreground/10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1 
        className="font-space font-bold text-center leading-tight tracking-tight text-3xl sm:text-5xl md:text-6xl bg-gradient-primary bg-clip-text text-transparent"
        style={{
          textShadow: "0 4px 24px hsla(232 89% 58% / 0.3)",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
      >
        Fantastic Wallpapers
      </motion.h1>
    </motion.header>
  );
};

export default Navbar;