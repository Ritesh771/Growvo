import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-primary opacity-20 animate-float" />
      <div className="absolute top-40 right-16 w-16 h-16 rounded-full bg-purple/20 animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-40 left-20 w-24 h-24 rounded-full bg-primary-light/20 animate-float" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 animate-glow">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Professional Freelance Solutions</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Affordable{" "}
            <span className="gradient-text">Web, App, AI</span>{" "}
            &{" "}
            <span className="gradient-text">Career</span>{" "}
            Solutions
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Choose from small, medium, and large project packages or request a custom solution. 
            Professional development and career services tailored to your needs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="btn-gradient text-lg px-8 py-6 rounded-2xl hover:shadow-hover transition-smooth hover:scale-105 group"
              asChild
            >
              <Link to="/services" className="flex items-center gap-2">
                View Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 rounded-2xl border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-smooth hover:scale-105"
              asChild
            >
              <Link to="/contact">Contact Me</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">50+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">5+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">24h</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;