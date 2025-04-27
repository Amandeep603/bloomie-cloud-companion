
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-bold text-white">B</span>
              </div>
              <span className="font-nunito font-bold text-xl bg-clip-text text-transparent animated-gradient">Bloomie</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Your friendly AI companion designed to help you bloom into your best self through meaningful conversations and emotional support.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link to="/chat" className="text-muted-foreground hover:text-primary transition-colors">AI Chat</Link></li>
              <li><Link to="/diary" className="text-muted-foreground hover:text-primary transition-colors">Emotional Diary</Link></li>
              <li><Link to="/video" className="text-muted-foreground hover:text-primary transition-colors">Video Calls</Link></li>
              <li><Link to="/customize" className="text-muted-foreground hover:text-primary transition-colors">Customization</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© {year} Bloomie. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
              Twitter
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
              Instagram
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
