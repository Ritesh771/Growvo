import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import growvoLogo from "@/assets/growvo-logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["home", "about", "services", "portfolio", "career", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: "Home", path: "#home" },
    { name: "About", path: "#about" },
    { name: "Services", path: "#services" },
    { name: "Portfolio", path: "#portfolio" },
    { name: "Pricing", path: "#pricing" },
    { name: "Career", path: "#career" },
    { name: "Contact", path: "#contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => `#${activeSection}` === path;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-xl border-b border-border/40 shadow-lg' 
          : 'bg-background/80 backdrop-blur-md border-b border-border/20'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollToSection('#home')} className="flex items-center gap-3 hover:scale-105 transition-transform">
            <img src={growvoLogo} alt="Ritesh N" className="h-8 w-8 rounded-lg" />
            <span className="text-2xl font-bold gradient-text">Ritesh N</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => scrollToSection(item.path)}
                  className={`relative py-2 px-1 text-sm font-medium transition-smooth ${
                    isActive(item.path)
                      ? "gradient-text"
                      : "text-foreground hover:text-primary"
                  } hover:scale-105`}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="default" 
                className="btn-gradient hover:shadow-hover transition-smooth"
                onClick={() => scrollToSection('#contact')}
              >
                Get Started
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? "auto" : 0 
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          {isMenuOpen && (
            <div className="mt-6 pb-6 border-t border-white/10 pt-6">
              <div className="flex flex-col space-y-4">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.path)}
                      className={`py-2 text-base font-medium transition-smooth text-left ${
                        isActive(item.path)
                          ? "gradient-text"
                          : "text-foreground hover:text-primary"
                      }`}
                    >
                      {item.name}
                    </button>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button 
                    variant="default" 
                    className="btn-gradient w-full mt-4"
                    onClick={() => scrollToSection('#contact')}
                  >
                    Get Started
                  </Button>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;