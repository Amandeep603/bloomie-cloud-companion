
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ThreeDProps {
  avatarUrl?: string;
  className?: string;
}

const ThreeDAvatar = ({ avatarUrl, className = "" }: ThreeDProps) => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(100);
  
  useEffect(() => {
    if (!isRotating) return;
    
    // Create a more natural rotation animation
    const timer = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 30);
    
    return () => clearInterval(timer);
  }, [isRotating]);

  const handleToggleRotation = () => {
    setIsRotating(prev => !prev);
  };
  
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 150));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 80));
  };

  return (
    <motion.div 
      className={`relative w-full h-full rounded-2xl overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        ref={avatarRef}
        className="w-full h-full"
        style={{ 
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          transform: `rotateY(${rotation}deg)`,
          scale: `${zoom}%`
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-violet-100/80 to-indigo-100/80 dark:from-indigo-900/40 dark:to-violet-900/40 flex items-center justify-center">
          <img 
            src={avatarUrl || "/ai-avatar-face.png"} 
            alt="3D AI Avatar" 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback for missing image
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojODg2NkNDO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGQjdiRkY7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9Ijk1IiBmaWxsPSJ1cmwoI2dyYWQpIiAvPgogIDxjaXJjbGUgY3g9IjcwIiBjeT0iODAiIHI9IjEwIiBmaWxsPSIjMjIyIiAvPgogIDxjaXJjbGUgY3g9IjEzMCIgY3k9IjgwIiByPSIxMCIgZmlsbD0iIzIyMiIgLz4KICA8cGF0aCBkPSJNNzAgMTMwIHE2MCA2MCA2MCAwIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iNiIgZmlsbD0ibm9uZSIgLz4KPC9zdmc+";
            }}
          />
        </div>
      </div>
      
      {/* Improved 3D controls */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 text-xs font-medium opacity-70 hover:opacity-100 transition-opacity">
        <button 
          className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 ${isRotating ? 'text-primary' : ''}`}
          onClick={handleToggleRotation}
        >
          {isRotating ? 'Pause' : 'Rotate'}
        </button>
        <button 
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-3 py-1 rounded-full"
          onClick={handleZoomIn}
        >
          Zoom In
        </button>
        <button 
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-3 py-1 rounded-full"
          onClick={handleZoomOut}
        >
          Zoom Out
        </button>
      </div>
      
      {/* Avatar Name Label */}
      <div className="absolute top-2 left-0 right-0 flex justify-center">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
          Your 3D Avatar
        </div>
      </div>
    </motion.div>
  );
};

export default ThreeDAvatar;
