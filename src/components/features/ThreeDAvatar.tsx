
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface ThreeDProps {
  avatarUrl?: string;
  className?: string;
}

const ThreeDAvatar = ({ avatarUrl, className = "" }: ThreeDProps) => {
  const avatarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This is a placeholder for future Avaturn API integration
    // In a real implementation, we would initialize the 3D viewer here
    const timer = setInterval(() => {
      if (avatarRef.current) {
        // Simulate rotation effect
        const currentRotation = avatarRef.current.style.transform || 'rotateY(0deg)';
        const currentAngle = parseInt(currentRotation.replace(/[^0-9]/g, '') || '0');
        const newAngle = (currentAngle + 1) % 360;
        avatarRef.current.style.transform = `rotateY(${newAngle}deg)`;
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      className={`relative w-full h-full rounded-full overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        ref={avatarRef}
        className="w-full h-full"
        style={{ 
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 flex items-center justify-center">
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
      {/* 3D controls placeholder */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 text-xs font-medium opacity-0 hover:opacity-100 transition-opacity">
        <button className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-2 py-1 rounded-full">
          Rotate
        </button>
        <button className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-2 py-1 rounded-full">
          Zoom
        </button>
      </div>
    </motion.div>
  );
};

export default ThreeDAvatar;
