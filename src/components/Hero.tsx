import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useParallax } from "@/hooks/useScrollAnimation";
import { AnimatedText } from "@/components/AnimatedText";
import { ScrollReveal } from "@/components/ScrollReveal";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const parallaxY = useParallax(0.3);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: `translateY(${parallaxY}px)`,
        }}
      />
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10 z-10" />
      
      {/* Animated floating elements */}
      <motion.div 
        className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-primary opacity-20 z-10"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute top-40 right-16 w-16 h-16 rounded-full bg-purple/20 z-10"
        animate={{ 
          y: [0, -15, 0],
          x: [0, 10, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div 
        className="absolute bottom-40 left-20 w-24 h-24 rounded-full bg-primary-light/20 z-10"
        animate={{ 
          y: [0, -25, 0],
          rotate: [0, -180, -360],
          scale: [1, 0.9, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="container mx-auto px-6 text-center relative z-20">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <ScrollReveal delay={0.2}>
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                  "0 0 30px rgba(147, 51, 234, 0.4)",
                  "0 0 20px rgba(59, 130, 246, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-sm font-medium">Professional Freelance Solutions</span>
            </motion.div>
          </ScrollReveal>

          {/* Main headline with text reveal animation */}
          <div className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <AnimatedText text="Affordable " />
            <AnimatedText 
              text="Web, App, AI " 
              className="gradient-text inline-block"
              delay={0.3}
            />
            <AnimatedText text="& " delay={0.6} />
            <AnimatedText 
              text="Career " 
              className="gradient-text inline-block"
              delay={0.7}
            />
            <AnimatedText text="Solutions" delay={1} />
          </div>

          {/* Subheading */}
          <ScrollReveal delay={0.8}>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Choose from small, medium, and large project packages or request a custom solution. 
              Professional development and career services tailored to your needs.
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal delay={1.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="btn-gradient text-lg px-8 py-6 rounded-2xl hover:shadow-hover transition-smooth group"
                  asChild
                >
                  <Link to="/services" className="flex items-center gap-2">
                    View Services
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-2xl border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-smooth"
                  asChild
                >
                  <Link to="/contact">Contact Me</Link>
                </Button>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Stats with staggered animation */}
          <ScrollReveal delay={1.6}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-2xl mx-auto">
              {[
                { value: "50+", label: "Projects Completed" },
                { value: "5+", label: "Years Experience" },
                { value: "100%", label: "Client Satisfaction" },
                { value: "24h", label: "Response Time" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  <motion.div 
                    className="text-2xl md:text-3xl font-bold gradient-text"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;