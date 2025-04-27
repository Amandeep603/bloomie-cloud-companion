
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Calendar, Video, User } from "lucide-react";
import { motion } from "framer-motion";

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
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Connect with Bloomie
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose how you'd like to interact with your AI friend today
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Link to={feature.path}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-0">
                    <div className={`p-6 bg-gradient-to-br ${feature.color} h-full flex flex-col`}>
                      <div className="mb-4 flex items-center justify-between">
                        <div className="p-3 bg-background rounded-xl">
                          {feature.icon}
                        </div>
                        <motion.div
                          className="text-3xl"
                          animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
                        >
                          {feature.emoji}
                        </motion.div>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                      <div className="mt-4 flex justify-end">
                        <div className="text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
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
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCards;
