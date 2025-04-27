
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference or localStorage
    const isDarkMode = localStorage.getItem("bloomie-theme") === "dark" || 
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDark(isDarkMode);
    updateTheme(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    updateTheme(newIsDark);
    localStorage.setItem("bloomie-theme", newIsDark ? "dark" : "light");
  };

  const updateTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 bg-background/50 backdrop-blur-sm"
    >
      {isDark ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-300 animate-pulse-light" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-primary animate-pulse-light" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
