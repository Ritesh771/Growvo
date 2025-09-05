import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StickySection } from "@/components/StickySection";
import { AnimatedText } from "@/components/AnimatedText";
import { ImageMaskReveal } from "@/components/ImageMaskReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Target } from "lucide-react";

const HomeAnimated = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Sticky Introduction Section */}
        <StickySection className="bg-background/95 backdrop-blur-xl" top="80px">
          <section className="py-20">
            <div className="container mx-auto px-6">
              <ScrollReveal>
                <div className="text-center max-w-4xl mx-auto">
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.2)",
                        "0 0 30px rgba(147, 51, 234, 0.3)",
                        "0 0 20px rgba(59, 130, 246, 0.2)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Why Choose Growvo?</span>
                  </motion.div>
                  
                  <div className="text-3xl md:text-5xl font-bold mb-6">
                    <AnimatedText text="Transform Your " />
                    <AnimatedText 
                      text="Digital Presence" 
                      className="gradient-text inline-block"
                      delay={0.3}
                    />
                  </div>
                  
                  <ScrollReveal delay={0.8}>
                    <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                      From concept to deployment, I deliver comprehensive solutions that drive results. 
                      Experience the perfect blend of creativity, technology, and professional service.
                    </p>
                  </ScrollReveal>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </StickySection>

        {/* Features Section with Image Mask Reveals */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <AnimatedText text="Premium " />
                  <AnimatedText 
                    text="Service Features" 
                    className="gradient-text inline-block"
                    delay={0.2}
                  />
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "Rapid development and deployment with cutting-edge technologies",
                  delay: 0
                },
                {
                  icon: Target,
                  title: "Precision Focus",
                  description: "Tailored solutions that meet your exact requirements and goals",
                  delay: 0.2
                },
                {
                  icon: Sparkles,
                  title: "Premium Quality",
                  description: "Enterprise-grade code quality with comprehensive testing",
                  delay: 0.4
                }
              ].map((feature, index) => (
                <ScrollReveal key={index} delay={feature.delay} direction="up">
                  <motion.div 
                    className="bg-card rounded-2xl p-8 shadow-card hover:shadow-hover transition-smooth group"
                    whileHover={{ 
                      y: -10,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-4 group-hover:gradient-text transition-all">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action with Parallax */}
        <section className="py-32 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple/20 to-primary-light/20"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))",
                "linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2))",
                "linear-gradient(225deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))",
                "linear-gradient(315deg, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2))",
                "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          
          <div className="container mx-auto px-6 text-center relative z-10">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto">
                <div className="text-4xl md:text-6xl font-bold mb-6">
                  <AnimatedText text="Ready to " />
                  <AnimatedText 
                    text="Get Started" 
                    className="gradient-text inline-block"
                    delay={0.3}
                  />
                  <AnimatedText text="?" delay={0.5} />
                </div>
                
                <ScrollReveal delay={0.8}>
                  <p className="text-xl text-muted-foreground mb-12">
                    Let's discuss your project and turn your vision into reality with 
                    professional development services.
                  </p>
                </ScrollReveal>
                
                <ScrollReveal delay={1.2}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        size="lg" 
                        className="btn-gradient text-lg px-8 py-6 rounded-2xl group"
                        asChild
                      >
                        <Link to="/services" className="flex items-center gap-2">
                          Explore Services
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
                        className="text-lg px-8 py-6 rounded-2xl border-2 border-primary/30 hover:border-primary hover:bg-primary/5"
                        asChild
                      >
                        <Link to="/contact">Start Project</Link>
                      </Button>
                    </motion.div>
                  </div>
                </ScrollReveal>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomeAnimated;