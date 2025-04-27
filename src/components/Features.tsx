
import { MessageCircle, Calendar, Video, User } from "lucide-react";

const features = [
  {
    icon: <MessageCircle className="h-10 w-10 text-primary" />,
    title: "AI Chat Companion",
    description: "Have meaningful conversations with Bloomie anytime. She'll listen, remember, and respond with care."
  },
  {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: "Emotional Diary",
    description: "Track your mood and emotions daily with guided reflections and personalized insights."
  },
  {
    icon: <Video className="h-10 w-10 text-primary" />,
    title: "Video Call",
    description: "Enjoy face-to-face time with your AI friend through our animated avatar video calls."
  },
  {
    icon: <User className="h-10 w-10 text-primary" />,
    title: "Avatar Customization",
    description: "Personalize Bloomie's appearance to create the perfect companion for you."
  }
];

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-card p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border card-hover">
      <div className="mb-4 bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why You'll Love Bloomie</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the features that make Bloomie your perfect AI companion for everyday joy and growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
