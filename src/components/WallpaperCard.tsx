import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

interface WallpaperCardProps {
  src: string;
  alt: string;
  index: number;
  onLoad?: () => void;
}

const WallpaperCard = ({ src, alt, index, onLoad }: WallpaperCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `wallpaper-${index + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback to direct link
      window.open(src, '_blank');
    }
  };

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.03,
        rotate: -1,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-3xl glass-card min-h-[240px] cursor-pointer">
        {/* Loading Skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 image-loading rounded-3xl" />
        )}
        
        {/* Image */}
        <motion.img
          ref={imageRef}
          src={src}
          alt={alt}
          className={`
            w-full h-56 object-cover transition-all duration-500
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          onLoad={handleImageLoad}
          loading="lazy"
          draggable={false}
        />

        {/* Download Button */}
        <motion.div
          className="absolute top-4 right-4"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0.7, 
            scale: isHovered ? 1.1 : 1 
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            onClick={handleDownload}
            className="glass-button rounded-full p-3 text-primary hover:text-white"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            title="Download wallpaper"
          >
            <Download size={20} />
          </motion.button>
        </motion.div>

        {/* Overlay Gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Wallpaper Number */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <motion.h3 
            className="font-space font-semibold text-xl text-primary text-center"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            #{index + 1}
          </motion.h3>
        </div>

        {/* Glow Effect on Hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: "0 0 40px hsla(232 89% 58% / 0.3)",
          }}
        />
      </div>
    </motion.div>
  );
};

export default WallpaperCard;