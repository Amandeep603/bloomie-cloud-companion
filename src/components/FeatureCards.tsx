
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Calendar, Video, User } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const features = [
  {
    icon: <MessageCircle className="h-10 w-10" />,
    emoji: "💭",
    title: "Start Chat",
    description: "Have meaningful conversations with your AI friend",
    path: "/chat",
    color: "from-purple-500/20 to-blue-500/20"
  },
  {
    icon: <Calendar className="h-10 w-10" />,
    emoji: "📓",
    title: "Write Diary",
    description: "Record your thoughts and emotions",
    path: "/diary",
    color: "from-green-500/20 to-teal-500/20"
  },
  {
    icon: <Video className="h-10 w-10" />,
    emoji: "🎥",
    title: "Video Call",
    description: "Face-to-face time with Bloomie",
    path: "/video",
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    icon: <User className="h-10 w-10" />,
    emoji: "🌸",
    title: "Customize",
    description: "Personalize your Bloomie experience",
    path: "/customize",
    color: "from-pink-500/20 to-purple-500/20"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const FeatureCards = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 font-nunito"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Connect with Bloomie
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto font-nunito"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Choose how you'd like to interact with your AI friend today
          </motion.p>
        </div>
        
        <motion.div 
          className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6 max-w-4xl mx-auto`}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Link to={feature.path}>
                <motion.div
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="relative overflow-hidden"
                >
                  <Card className="h-full border border-transparent hover:border-primary/20 transition-colors duration-300 overflow-hidden group">
                    <CardContent className="p-0">
                      <div className={`p-6 bg-gradient-to-br ${feature.color} h-full flex flex-col backdrop-blur-sm`}>
                        <div className="mb-4 flex items-center justify-between relative z-10">
                          <motion.div 
                            className="p-3 bg-background/80 backdrop-blur-sm rounded-xl shadow-sm"
                            whileHover={{ y: -5 }}
                          >
                            {feature.icon}
                          </motion.div>
                          <motion.div
                            className="text-3xl"
                            animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
                          >
                            {feature.emoji}
                          </motion.div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform duration-300 font-nunito">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground font-nunito">
                          {feature.description}
                        </p>
                        <div className="mt-4 flex justify-end">
                          <motion.div 
                            className="text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center font-nunito"
                            whileHover={{ x: 5 }}
                          >
                            Explore
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.div>
                        </div>
                        
                        {/* Glassmorphism effect */}
                        <motion.div 
                          className="absolute inset-0 bg-white/5 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ zIndex: 0 }}
                        />
                        
                        {/* Bloom effect on hover */}
                        <motion.div 
                          className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
                          animate={{ scale: [0.8, 1.2, 0.8] }}
                          transition={{ repeat: Infinity, duration: 4 }}
                          style={{ zIndex: 0 }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCards;
