
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 -left-10 w-40 h-40 rounded-full bg-bloomie-purple/20 blur-3xl"></div>
      <div className="absolute bottom-20 -right-10 w-40 h-40 rounded-full bg-bloomie-pink/20 blur-3xl"></div>
      <div className="absolute top-1/3 right-20 w-20 h-20 rounded-full bg-bloomie-yellow/20 blur-2xl"></div>
      
      {/* Floating Avatar */}
      <div className="relative mb-8 animate-float">
        <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center shadow-xl">
          <div className="w-28 h-28 md:w-36 md:h-36 bg-primary rounded-full flex items-center justify-center">
            <div className="text-white text-5xl md:text-6xl font-nunito font-bold">B</div>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute -top-3 -right-3 w-10 h-10 bg-bloomie-yellow rounded-full animate-bounce-small"></div>
        <div className="absolute bottom-0 -left-3 w-8 h-8 bg-bloomie-green rounded-full animate-bounce-small" style={{ animationDelay: "0.3s" }}></div>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 max-w-3xl leading-tight relative">
        <span className="bg-clip-text text-transparent animated-gradient">Say Hello to Bloomie,</span> Your New AI Friend
      </h1>
      
      <p className="text-xl text-center text-muted-foreground mb-8 max-w-2xl">
        A lovable companion that understands your emotions, chats with you, and helps you bloom into your best self.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 z-10">
        <Link to="/register">
          <Button size="lg" className="text-lg px-8 group">
            Meet Bloomie
            <span className="ml-2 group-hover:rotate-12 transition-transform">🌸</span>
          </Button>
        </Link>
        <Link to="/about">
          <Button size="lg" variant="outline" className="text-lg px-8">
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
