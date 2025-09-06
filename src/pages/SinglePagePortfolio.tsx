import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MultiLayerParallax, ParallaxLayer } from "@/components/MultiLayerParallax";
import ColorShiftBackground from "@/components/ColorShiftBackground";
import TiltCard from "@/components/TiltCard";
import TextScramble from "@/components/TextScramble";
import SplitTextReveal from "@/components/SplitTextReveal";
import ScrollMarquee from "@/components/ScrollMarquee";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import PricingTable from "@/components/PricingTable";
import { Card } from "@/components/ui/card";
import { Code, Smartphone, Brain, Briefcase, Award, Users, GraduationCap, Star, Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const SinglePagePortfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    const ctx = gsap.context(() => {
      // Multi-layer parallax
      gsap.to(".parallax-bg", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-bg",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // 3D tilt on scroll
      gsap.to(".tilt-card", {
        rotationY: 15,
        rotationX: 5,
        ease: "none",
        scrollTrigger: {
          trigger: ".tilt-card",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: "Web Development",
      description: "Full-stack web applications with modern technologies like React, Django, and Node.js.",
      price: "₹15,000",
      icon: Code,
      features: [
        "Responsive design",
        "Modern frameworks",
        "Database integration",
        "API development",
        "SEO optimization"
      ],
      href: "#contact"
    },
    {
      title: "Mobile Apps",
      description: "Cross-platform mobile applications with React Native and Flutter.",
      price: "₹25,000",
      icon: Smartphone,
      features: [
        "iOS & Android",
        "Native performance",
        "Push notifications",
        "App store deployment",
        "Backend integration"
      ],
      href: "#contact"
    },
    {
      title: "AI/ML Solutions",
      description: "Intelligent applications with machine learning and artificial intelligence.",
      price: "₹35,000",
      icon: Brain,
      features: [
        "Custom AI models",
        "Data analysis",
        "Automation solutions",
        "API integration",
        "Cloud deployment"
      ],
      href: "#contact"
    },
    {
      title: "Career Services",
      description: "Professional career development and placement assistance.",
      price: "₹5,000",
      icon: Briefcase,
      features: [
        "Resume design",
        "LinkedIn optimization",
        "Portfolio website",
        "Interview coaching",
        "Placement guidance"
      ],
      href: "#career"
    }
  ];

  const projects = [
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include payment integration, admin dashboard, and inventory management.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.com",
      category: "Web Development"
    },
    {
      title: "AI Task Manager",
      description: "Smart task management app with AI-powered priority suggestions and automated scheduling using machine learning algorithms.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600",
      technologies: ["Python", "TensorFlow", "React", "FastAPI"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.com",
      category: "AI/ML"
    },
    {
      title: "Fitness Tracking App",
      description: "Cross-platform mobile app for fitness tracking with React Native. Includes workout plans, progress tracking, and social features.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
      technologies: ["React Native", "Firebase", "Redux"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.com",
      category: "Mobile Apps"
    },
    {
      title: "Professional Portfolio",
      description: "Modern portfolio website for a software engineer with career services integration and responsive design.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
      technologies: ["React", "Tailwind", "Framer Motion"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.com",
      category: "Career Services"
    },
    {
      title: "Real Estate Platform",
      description: "Property listing and management platform with advanced search, virtual tours, and CRM integration.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600",
      technologies: ["Next.js", "PostgreSQL", "Prisma", "AWS"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.com",
      category: "Web Development"
    }
  ];

  const achievements = [
    {
      icon: GraduationCap,
      title: "College Topper",
      description: "Graduated with top honors in Computer Science"
    },
    {
      icon: Briefcase,
      title: "Startup Founder",
      description: "Founded and scaled multiple tech startups"
    },
    {
      icon: Users,
      title: "Team Lead",
      description: "Led development teams on complex projects"
    },
    {
      icon: Award,
      title: "Industry Experience",
      description: "5+ years in AI/ML and full-stack development"
    }
  ];

  const skills = [
    "React & Next.js",
    "Django & Python",
    "AI/ML & Data Science",
    "Node.js & Express",
    "Mobile Development",
    "Cloud & DevOps",
    "UI/UX Design",
    "Database Design"
  ];

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <div ref={containerRef} className="relative">
      <Navbar />

      <main>
        {/* Hero Section with Multi-Layer Parallax */}
        <section id="home" className="min-h-screen relative overflow-hidden">
          <MultiLayerParallax>
            <ParallaxLayer speed={-0.5} className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/20 to-accent/20" />
            </ParallaxLayer>
            <ParallaxLayer speed={0} className="relative z-10">
              <Hero />
            </ParallaxLayer>
          </MultiLayerParallax>
          {/* Scroll Marquee */}
          <div className="absolute bottom-10 left-0 right-0">
            <ScrollMarquee 
              text="FULL-STACK DEVELOPMENT • AI/ML SOLUTIONS • MOBILE APPS • CAREER SERVICES" 
              speed={0.5}
              className="py-4 border-t border-primary/20"
            />
          </div>
        </section>

        {/* About Section with Color Shift Background */}
        <ColorShiftBackground className="py-20">
          <section id="about" className="container mx-auto px-6">
            {/* Scramble Text Heading */}
            <div className="text-center mb-16">
              <SplitTextReveal 
                text="About Me" 
                className="text-3xl md:text-4xl font-bold mb-6 gradient-text"
              />
            </div>

            {/* Hero About with Tilt Effect */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              {/* Profile Image */}
              <ScrollReveal>
                <TiltCard className="w-80 h-80 mx-auto">
                  <div className="w-full h-full rounded-3xl overflow-hidden shadow-card relative">
                    <img
                      src="/Ritesh.jpg"
                      alt="Ritesh N"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center animate-float">
                      <Code className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>

              {/* Content */}
              <ScrollReveal delay={0.3}>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Hi, I'm <TextScramble text="Ritesh N" className="gradient-text" delay={500} />
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    Full-Stack Developer | AI Innovator | Startup Founder
                  </p>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Enthusiastic and driven Full-Stack Developer with a strong foundation in Artificial Intelligence and Machine Learning, currently pursuing a B.E. in CSE (AI & ML) from A.M.C. Engineering College, Bangalore. Founder and CEO of Stalight Technology, a tech startup focused on campus automation and AI-driven applications.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Button
                      className="btn-gradient hover:shadow-hover transition-smooth"
                      onClick={() => {
                        const element = document.getElementById('portfolio');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      View My Work
                    </Button>
                    <Button
                      variant="outline"
                      className="border border-primary/30 hover:border-primary hover:bg-primary/5"
                      onClick={() => {
                        const element = document.getElementById('contact');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Get In Touch
                    </Button>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text">10+</div>
                      <div className="text-sm text-muted-foreground">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text">100%</div>
                      <div className="text-sm text-muted-foreground">Dedication</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text">2+</div>
                      <div className="text-sm text-muted-foreground">Years Exp</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Trust Badges */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <ScrollReveal key={achievement.title} delay={index * 0.1}>
                  <TiltCard>
                    <Card className="p-8 text-center card-gradient border border-white/20 hover:shadow-hover transition-smooth hover:-translate-y-2">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-6">
                        <achievement.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{achievement.title}</h3>
                      <p className="text-muted-foreground">{achievement.description}</p>
                    </Card>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ColorShiftBackground>

        {/* Services Section with Tilt Cards */}
        <section id="services" className="py-20">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <SplitTextReveal 
                  text="My Services" 
                  className="text-3xl md:text-4xl font-bold mb-6 gradient-text"
                />
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive tech solutions for your business needs
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <ScrollReveal key={service.title} delay={index * 0.1}>
                  <TiltCard>
                    <ServiceCard
                      title={service.title}
                      description={service.description}
                      price={service.price}
                      icon={service.icon}
                      features={service.features}
                      href={service.href}
                    />
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <ColorShiftBackground className="py-20">
          <section id="portfolio" className="container mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <SplitTextReveal 
                  text="My Portfolio" 
                  className="text-3xl md:text-4xl font-bold mb-6 gradient-text"
                />
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Showcasing my best work and achievements
                </p>
              </div>
            </ScrollReveal>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {["All", "Web Development", "Mobile Apps", "AI/ML", "Career Services"].map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  className={activeFilter === filter ? "btn-gradient" : ""}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ScrollReveal key={project.title} delay={index * 0.1}>
                  <TiltCard>
                    <ProjectCard {...project} />
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ColorShiftBackground>

        {/* Pricing Section */}
        <section id="pricing" className="py-20">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <SplitTextReveal 
                  text="Pricing Plans" 
                  className="text-3xl md:text-4xl font-bold mb-6 gradient-text"
                />
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Choose the perfect package for your needs
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <TiltCard>
                <PricingTable />
              </TiltCard>
            </ScrollReveal>
          </div>
        </section>

        {/* Career Services Section */}
        <ColorShiftBackground className="py-20">
          <section id="career" className="container mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <SplitTextReveal 
                  text="Career Services" 
                  className="text-3xl md:text-4xl font-bold mb-6 gradient-text"
                />
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Professional career development and placement assistance
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Resume Design",
                  description: "Professional ATS-friendly resume design",
                  price: "₹1,500",
                  features: ["ATS optimization", "Modern design", "Multiple formats", "Unlimited revisions"]
                },
                {
                  title: "LinkedIn Optimization",
                  description: "Complete LinkedIn profile makeover",
                  price: "₹2,000",
                  features: ["Profile optimization", "Content strategy", "Network building", "SEO optimization"]
                },
                {
                  title: "Portfolio Website",
                  description: "Custom portfolio website development",
                  price: "₹5,000",
                  features: ["Responsive design", "SEO optimized", "Contact forms", "Project showcase"]
                },
                {
                  title: "Interview Coaching",
                  description: "One-on-one interview preparation",
                  price: "₹3,000",
                  features: ["Mock interviews", "Technical prep", "Behavioral questions", "Feedback sessions"]
                }
              ].map((service, index) => (
                <ScrollReveal key={service.title} delay={index * 0.1}>
                  <TiltCard>
                    <Card className="p-6 h-full bg-gradient-card border border-white/20 hover:shadow-card transition-smooth">
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      <div className="text-2xl font-bold gradient-text mb-4">{service.price}</div>
                      <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full btn-gradient">Get Started</Button>
                    </Card>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ColorShiftBackground>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <SplitTextReveal 
                  text="Get In Touch" 
                  className="text-3xl md:text-4xl font-bold mb-6 gradient-text"
                />
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Let's discuss your project and bring your ideas to life
                </p>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <ScrollReveal>
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold">Email</h3>
                      <p className="text-muted-foreground">riteshnaidu@growvo.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold">Phone</h3>
                      <p className="text-muted-foreground">+91 9876543210</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold">Location</h3>
                      <p className="text-muted-foreground">Bangalore, India</p>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-4 pt-6">
                    <a href="#" className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center hover:shadow-hover transition-smooth">
                      <Github className="w-6 h-6 text-white" />
                    </a>
                    <a href="#" className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center hover:shadow-hover transition-smooth">
                      <Linkedin className="w-6 h-6 text-white" />
                    </a>
                    <a href="#" className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center hover:shadow-hover transition-smooth">
                      <Twitter className="w-6 h-6 text-white" />
                    </a>
                  </div>

                  {/* WhatsApp Button */}
                  <Button 
                    className="btn-gradient text-lg px-8 py-6 rounded-2xl hover:shadow-hover transition-smooth w-full"
                    onClick={() => window.open('https://wa.me/9876543210', '_blank')}
                  >
                    Chat on WhatsApp
                  </Button>
                </div>
              </ScrollReveal>

              {/* Contact Form */}
              <ScrollReveal delay={0.3}>
                <TiltCard>
                  <Card className="p-8 bg-gradient-card border border-white/20">
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Name</label>
                          <input 
                            type="text" 
                            className="w-full p-3 rounded-xl bg-background/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email</label>
                          <input 
                            type="email" 
                            className="w-full p-3 rounded-xl bg-background/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Service</label>
                          <select className="w-full p-3 rounded-xl bg-background/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/50">
                            <option>Web Development</option>
                            <option>Mobile Apps</option>
                            <option>AI/ML Solutions</option>
                            <option>Career Services</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Budget</label>
                          <select className="w-full p-3 rounded-xl bg-background/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/50">
                            <option>₹5,000 - ₹15,000</option>
                            <option>₹15,000 - ₹50,000</option>
                            <option>₹50,000+</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Message</label>
                        <textarea 
                          rows={4} 
                          className="w-full p-3 rounded-xl bg-background/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="Tell me about your project..."
                        />
                      </div>

                      <Button className="w-full btn-gradient text-lg py-3 rounded-xl hover:shadow-hover transition-smooth">
                        Send Message
                      </Button>
                    </form>
                  </Card>
                </TiltCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <ColorShiftBackground className="py-20">
          <section className="container mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <SplitTextReveal 
                  text="Client Testimonials" 
                  className="text-3xl md:text-4xl font-bold mb-6 gradient-text"
                />
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  What my clients say about working with me
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "CEO, TechStart",
                  content: "Ritesh delivered an exceptional e-commerce platform that exceeded our expectations. Professional, timely, and innovative.",
                  rating: 5
                },
                {
                  name: "Mike Chen", 
                  role: "Founder, DataFlow",
                  content: "The AI solution Ritesh built for us increased our efficiency by 40%. Highly recommend his expertise.",
                  rating: 5
                },
                {
                  name: "Emma Davis",
                  role: "Marketing Director",
                  content: "Outstanding career services! Ritesh helped me land my dream job with a perfect resume and LinkedIn optimization.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <ScrollReveal key={testimonial.name} delay={index * 0.1}>
                  <TiltCard>
                    <Card className="p-8 card-gradient border border-white/20 hover:shadow-hover transition-smooth">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                      <div>
                        <div className="font-bold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </Card>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ColorShiftBackground>

        {/* Footer Marquee */}
        <div className="py-8 border-t border-primary/20">
          <ScrollMarquee 
            text="GROWVO • FULL-STACK DEVELOPMENT • AI/ML SOLUTIONS • MOBILE APPS • CAREER SERVICES • CONTACT US TODAY" 
            speed={0.3}
            direction="left"
          />
        </div>
      </main>
    </div>
  );
};

export default SinglePagePortfolio;