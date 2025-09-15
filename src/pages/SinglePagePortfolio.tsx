import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StickySection } from "@/components/StickySection";
import { AnimatedText } from "@/components/AnimatedText";
import { ImageMaskReveal } from "@/components/ImageMaskReveal";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import PricingTable from "@/components/PricingTable";
import { Card } from "@/components/ui/card";
import NewContactSection from "@/components/NewContactSection";
import { ArrowRight, Sparkles, Zap, Target, Code, Smartphone, Brain, Briefcase, Award, Users, GraduationCap, Star, Mail, Phone, MapPin, Github, Linkedin, Twitter, FileText, Mic, Server, TabletSmartphone, BrainCircuit } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import growvoLogo from "@/assets/growvo-logo.png";
import Footer from "@/components/Footer";
import WhatsAppPopup from "@/components/WhatsAppPopup";
import CareerServicePopup from "@/components/CareerServicePopup";
import DemoRequestPopup from "@/components/DemoRequestPopup";

gsap.registerPlugin(ScrollTrigger);

const SinglePagePortfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [whatsappPopup, setWhatsappPopup] = useState({
    isOpen: false,
    title: "",
    description: "",
    formType: "basic" as "basic" | "joinTeam" | "demo" | "customQuote",
  });

  const [careerServicePopup, setCareerServicePopup] = useState({
    isOpen: false,
    title: "",
    description: "",
    defaultInterest: "",
  });

  const [demoRequestPopup, setDemoRequestPopup] = useState({
    isOpen: false,
    title: "",
    description: "",
    defaultDemo: "",
    availableDemos: [] as string[],
  });

  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

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

      gsap.to(".parallax-mid", {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-mid",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Text scramble effect
      const textElements = gsap.utils.toArray(".scramble-text");
      textElements.forEach((element: Element) => {
        const originalText = element.textContent;
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

        gsap.to(element, {
          duration: 2,
          textContent: originalText,
          ease: "none",
          onUpdate: function() {
            const progress = this.progress();
            let scrambled = "";
            for (let i = 0; i < originalText.length; i++) {
              if (i < progress * originalText.length) {
                scrambled += originalText[i];
              } else {
                scrambled += chars[Math.floor(Math.random() * chars.length)];
              }
            }
            element.textContent = scrambled;
          },
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true
          }
        });
      });

      // SVG line drawing
      gsap.fromTo(".svg-path", {
        drawSVG: "0%"
      }, {
        drawSVG: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".svg-path",
          start: "top center",
          end: "bottom center",
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

      // Scroll progress bar
      gsap.to(".progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });

      // Pinned Scroll Animation for Technical Expertise Cards
      const pinnedContainer = document.querySelector('.sticky-card-container') as HTMLElement;
      const cardWrapper = document.querySelector('.card-wrapper') as HTMLElement;
      const cards = gsap.utils.toArray('.card-item') as HTMLElement[];

      if (pinnedContainer && cardWrapper && cards.length > 0) {
        // Create a timeline for the pinned animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinnedContainer,
            start: "top 100px", // Start when container reaches 100px from top (below navbar)
            end: "+=200%", // Increased scroll distance for all cards to show properly
            pin: true,
            scrub: 0.5, // Smoother scrubbing for better control
            anticipatePin: 1,
            markers: false,
          }
        });

        // Set initial state - first card visible and centered
        tl.set(cards[0], {
          opacity: 1,
          scale: 1,
          zIndex: 10,
          transformOrigin: "center center"
        });

        // Hide all other cards initially
        cards.forEach((card, index) => {
          if (index > 0) {
            tl.set(card, {
              opacity: 0,
              scale: 0.95,
              zIndex: 1
            });
          }
        });

        // Animate through each card with proper timing
        cards.forEach((card, index) => {
          if (index === 0) return; // Skip first card as it's already set

          // Calculate position in timeline (evenly distributed)
          const position = (index / cards.length) * 0.85;

          // First, fade out the previous card completely
          tl.to(cards[index - 1], {
            opacity: 0,
            scale: 0.8,
            zIndex: 1,
            duration: 0.5,
            ease: "power2.inOut"
          }, position)
          // Then fade in the current card
          .to(card, {
            opacity: 1,
            scale: 1,
            zIndex: 10,
            duration: 0.5,
            ease: "power2.inOut"
          }, position + 0.1); // Slight delay to ensure clean transition
        });

                // Keep the last card visible for a bit
        tl.to({}, { duration: 0.3 });
      }

      // Additional scroll animations
      gsap.to(".fade-in-up", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".fade-in-up",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.to(".scale-in", {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".scale-in",
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      });

      // Stagger animations for lists
      gsap.utils.toArray(".stagger-item").forEach((item, index) => {
        gsap.fromTo(item as Element, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item as Element,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Floating animation for decorative elements
      gsap.to(".float", {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        scrollTrigger: {
          trigger: ".float",
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play pause resume pause"
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: "Web Development",
      description: "Full-stack web applications with modern technologies like React, Django, and Node.js.",
      price: "₹3500",
      icon: Server,
      features: [
        "Responsive design",
        "Modern frameworks",
        "Database integration",
        "API development",
        "SEO optimization"
      ],
      href: "https://wa.me/918660144040?text=Hi%20Ritesh,%20I%20am%20interested%20in%20your%20Web%20Development%20services.%20I%20would%20like%20to%20discuss%20a%20project%20that%20requires%20full-stack%20development%20with%20modern%20technologies.%20Could%20we%20schedule%20a%20consultation%20to%20discuss%20the%20requirements%20and%20timeline%20for%20my%20project?",
      color: "bg-gradient-to-br from-blue-50 to-indigo-50",
      hoverColor: "hover:from-blue-100 hover:to-indigo-100"
    },
    {
      title: "Mobile Apps",
      description: "Cross-platform mobile applications with React Native and Flutter.",
      price: "₹5000",
      icon: TabletSmartphone,
      features: [
        "iOS & Android",
        "Native performance",
        "Push notifications",
        "App store deployment",
        "Backend integration"
      ],
      href: "https://wa.me/918660144040?text=Hello%20Ritesh,%20I%20need%20a%20mobile%20application%20developed.%20I%20am%20looking%20for%20cross-platform%20development%20with%20React%20Native%20or%20Flutter.%20The%20app%20should%20work%20seamlessly%20on%20both%20iOS%20and%20Android.%20Can%20we%20discuss%20the%20features,%20timeline,%20and%20cost%20estimation%20for%20my%20mobile%20app%20project?",
      color: "bg-gradient-to-br from-green-50 to-emerald-50",
      hoverColor: "hover:from-green-100 hover:to-emerald-100"
    },
    {
      title: "AI/ML Solutions",
      description: "Intelligent applications with machine learning and artificial intelligence.",
      price: "₹7,000",
      icon: Brain,
      features: [
        "Custom AI models",
        "Data analysis",
        "Automation solutions",
        "API integration",
        "Cloud deployment"
      ],
      href: "https://wa.me/918660144040?text=Hi%20Ritesh,%20I%20am%20interested%20in%20AI/ML%20solutions%20for%20my%20project.%20I%20need%20intelligent%20applications%20with%20machine%20learning%20capabilities.%20This%20could%20include%20custom%20AI%20models,%20data%20analysis,%20or%20automation%20solutions.%20Could%20you%20please%20share%20more%20details%20about%20your%20AI/ML%20services%20and%20how%20we%20can%20collaborate%20on%20this?",
      color: "bg-gradient-to-br from-purple-50 to-violet-50",
      hoverColor: "hover:from-purple-100 hover:to-violet-100"
    },
    {
      title: "Career Services",
      description: "Professional career development and placement assistance.",
      price: "₹2,000",
      icon: Users,
      features: [
        "Resume design",
        "LinkedIn optimization",
        "Portfolio website",
        "Interview coaching",
        "Placement guidance"
      ],
      href: "https://wa.me/918660144040?text=Hello%20Ritesh,%20I%20am%20looking%20for%20career%20development%20services.%20I%20need%20help%20with%20resume%20design,%20LinkedIn%20optimization,%20and%20interview%20preparation.%20I%20would%20also%20like%20guidance%20on%20job%20placement%20and%20career%20advancement.%20Can%20we%20schedule%20a%20session%20to%20discuss%20how%20you%20can%20assist%20me%20with%20my%20career%20goals?",
      color: "bg-gradient-to-br from-orange-50 to-amber-50",
      hoverColor: "hover:from-orange-100 hover:to-amber-100"
    }
  ];

  const projects = [
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with Realtime Chat, Payment Gateway Integration.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.com",
      category: "Web Development"
    },
    
    {
      title: "Real Estate Platform",
      description: "Property listing and management platform with advanced search, virtual tours.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600",
      technologies: ["Next.js", "PostgreSQL", "Prisma", "AWS"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.com",
      category: "Web Development"
    },
    {
      title: "Safe Space (Mobile App)",
      description: "Mobile app with location tracking, panic button, and emergency alerts",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      technologies: ["React.js", "Django", "PostgreSQL"],
      githubUrl: "#",
      demoUrl: "#",
      category: "Mobile Apps"
    },
    {
      title: "Slot Booking Platform",
      description: "Online slot booking system for sports with Razorpay integration",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
      technologies: ["React.js", "Django", "PostgreSQL"],
      githubUrl: "#",
      demoUrl: "#",
      category: "Web Development"
    },
    {
      title: "AI Surveillance System",
      description: "Real-time detection of suspicious activity using Python & Flask",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400",
      technologies: ["Flask", "MySQL", "Redis"],
      githubUrl: "#",
      demoUrl: "#",
      category: "AI/ML"
    },
    {
      title: "VR Navigation for Blind",
      description: "TensorFlow-based navigation system providing audio cues",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400",
      technologies: ["Python", "Flask", "TensorFlow"],
      githubUrl: "#",
      demoUrl: "#",
      category: "AI/ML"
    },
    {
      title: "GitSolveAI",
      description: "AI-powered platform for automated GitHub issue resolution and CI/CD workflows.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
      technologies: ["React", "Node.js", "GitHub API", "CI/CD"],
      githubUrl: "#",
      demoUrl: "#",
      category: "AI/ML"
    },
    {
      title: "Chat2DB",
      description: "Natural language database chat for querying databases in plain English.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      technologies: ["React", "Node.js", "SQL", "NLP"],
      githubUrl: "#",
      demoUrl: "#",
      category: "AI/ML"
    },
    {
      title: "AR-Based Technical Support",
      description: "Augmented reality platform for remote technical support in manufacturing and IoT.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
      technologies: ["React Native", "AR/VR", "IoT", "WebRTC"],
      githubUrl: "#",
      demoUrl: "#",
      category: "AI/ML"
    },
    {
      title: "AI Lawyer",
      description: "AI-powered legal advice chatbot for contracts, agreements, and legal predictions.",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400",
      technologies: ["React", "Node.js", "NLP", "Legal AI"],
      githubUrl: "#",
      demoUrl: "#",
      category: "AI/ML"
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

  const whatsappNumber = "+918660144040";

  const handleCareerServiceSubmit = (userData: any) => {
    const message = `Hello! My name is ${userData.name} and my email is ${userData.email}. My phone number is ${userData.phone}.\n\nI'm interested in: ${userData.interest}\nPreferred contact method: ${userData.preferredContact}\nHow I heard about you: ${userData.howHeard}\n\nI consent to being contacted regarding my inquiry.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleDemoRequestSubmit = (userData: any) => {
    const message = `Hello! My name is ${userData.name} and my email is ${userData.email}. My phone number is ${userData.phone}.\n\nI'm interested in a demo of: ${userData.demo}\nPreferred contact method: ${userData.preferredContact}\nHow I heard about you: ${userData.howHeard}\n\nI consent to being contacted regarding my demo request.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCareerServiceClick = (serviceTitle: string) => {
    // Map service titles to interest values
    const interestMap: { [key: string]: string } = {
      "Resume Design": "Resume Design",
      "LinkedIn Optimization": "LinkedIn Optimization",
      "Interview Coaching": "Interview Coaching",
      "Portfolio Website": "Portfolio Website"
    };

    setCareerServicePopup({
      isOpen: true,
      title: `Interest in ${serviceTitle}`,
      description: "Please provide your details so we can discuss your career service requirements.",
      defaultInterest: interestMap[serviceTitle] || "",
    });
  };

  const careerServices = [
    {
      title: "Resume Design",
      description: "Professional resume design that highlights your skills and experience.",
      icon: FileText,
      buttonText: "Create My Resume",
      color: "bg-sky-100",
      hoverColor: "hover:bg-sky-200"
    },
    {
      title: "LinkedIn Optimization",
      description: "Optimize your LinkedIn profile to attract recruiters and opportunities.",
      icon: Linkedin,
      buttonText: "Optimize My Profile",
      color: "bg-blue-100",
      hoverColor: "hover:bg-blue-200"
    },
    {
      title: "Interview Coaching",
      description: "Prepare for technical interviews with mock sessions and feedback.",
      icon: Mic,
      buttonText: "Start Coaching",
      color: "bg-purple-100",
      hoverColor: "hover:bg-purple-200"
    },
    {
      title: "Portfolio Website",
      description: "A stunning personal portfolio to showcase your projects and skills.",
      icon: Code,
      buttonText: "Build My Portfolio",
      color: "bg-green-100",
      hoverColor: "hover:bg-green-200"
    }
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-primary/20 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-purple-500 origin-left progress-bar"
          style={{ scaleX: scrollYProgress }}
        />
      </div>

      <Navbar />

      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen">
          <Hero />
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="container mx-auto px-6">
            {/* Hero About */}
            <motion.div 
              className="grid lg:grid-cols-5 gap-12 items-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              {/* Company Image/Logo */}
              <ScrollReveal className="lg:col-span-2">
                <motion.div 
                  className="relative"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-3xl overflow-hidden shadow-card bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center scale-in">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-white flex items-center justify-center overflow-hidden">
                        <img
                          src="/stalightlogo.jpeg"
                          alt="Stalight Technology Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="text-2xl font-bold gradient-text mb-2">Stalight Technology</h3>
                      <p className="text-muted-foreground">Innovating the Future</p>
                    </div>
                  </div>
                  
                </motion.div>
              </ScrollReveal>

              {/* Content */}
              <ScrollReveal delay={0.3} className="lg:col-span-3">
                <motion.div 
                  className="flex flex-col items-center lg:items-start text-center lg:text-left"
                  variants={itemVariants}
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    About <span className="gradient-text">Us</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                    Transforming Ideas into Digital Reality
                  </p>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    We are a dynamic tech company specializing in cutting-edge web development, mobile applications, and AI/ML solutions. Our passionate team of innovators is dedicated to creating scalable, user-centric digital experiences that drive real-world impact across education, healthcare, and enterprise sectors.
                  </p>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Founded with a vision to bridge the gap between technology and human needs, we combine technical expertise with creative problem-solving to deliver exceptional results for our clients worldwide. Explore our company website at <a href="https://stalight.tech" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">stalight.tech</a>.
                  </p>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    This platform serves as a freelancing hub where we connect talented developers with exciting projects, much like a modern freelancing website, enabling seamless collaboration and innovation.
                  </p>

                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4 mb-8"
                    variants={itemVariants}
                  >
                    <Button
                      className="btn-gradient hover:shadow-hover transition-smooth"
                      onClick={() => {
                        const element = document.getElementById('services');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Our Services
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
                  </motion.div>

                  
                </motion.div>
              </ScrollReveal>
            </motion.div>

            

            {/* Certificates & Achievements */}
          </div>
        </section>        {/* Services Section */}
        <section id="services" className="bg-secondary/30 pt-10">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <motion.div 
                className="text-center mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInVariants}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <AnimatedText text="Professional " />
                  <AnimatedText
                    text="Services"
                    className="gradient-text inline-block"
                    delay={0.2}
                  />
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  From web development to career services, I provide comprehensive solutions
                  to help you achieve your goals with quality and expertise.
                </p>
              </motion.div>
            </ScrollReveal>

            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {services.map((service, index) => (
                <ScrollReveal key={index} delay={index * 0.1} direction="up">
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.05,
                      boxShadow: "0px 20px 40px rgba(0,0,0,0.15)"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="stagger-item"
                  >
                    <ServiceCard 
                      {...service} 
                      onClick={(href: string) => {
                        setDemoRequestPopup({
                          isOpen: true,
                          title: `Service Inquiry: ${service.title}`,
                          description: "Please provide your details so we can discuss your service requirements.",
                          defaultDemo: service.title,
                          availableDemos: services.map(s => s.title),
                        });
                      }}
                    />
                  </motion.div>
                </ScrollReveal>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Technical Skills Section */}
        <section id="technical-skills" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-gray-50">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <motion.div 
                className="text-center mb-8 sm:mb-12 lg:mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInVariants}
              >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                  <AnimatedText text="Technical " />
                  <AnimatedText
                    text="Skills"
                    className="gradient-text inline-block"
                    delay={0.2}
                  />
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive expertise across modern technologies and frameworks
                </p>
              </motion.div>
            </ScrollReveal>

            {/* Bento Grid Layout */}
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 auto-rows-[minmax(180px,auto)] sm:auto-rows-[minmax(200px,auto)]">
                {/* Languages & Frameworks - Large Card */}
                <ScrollReveal delay={0.1} className="sm:col-span-2 lg:col-span-2">
                  <motion.div
                    className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-card hover:shadow-hover transition-smooth h-full"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center mb-4 sm:mb-6">
                      <Code className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-primary mr-3 sm:mr-4" />
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">Languages & Frameworks</h3>
                    </div>
                    <div className="space-y-2 sm:space-y-3 text-muted-foreground">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">Python</span>
                        <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">JavaScript</span>
                        <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">TypeScript</span>
                        <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">Java</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">HTML5</span>
                        <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">CSS3</span>
                        <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">SASS/SCSS</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">Django</span>
                        <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">Django REST</span>
                        <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">FastAPI</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">Flask</span>
                        <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">TensorFlow</span>
                        <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">PyTorch</span>
                        <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">Node.js</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">Express.js</span>
                        <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">Next.js</span>
                        <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">Vue.js</span>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>

                {/* Frontend Technologies */}
                <ScrollReveal delay={0.2} className="sm:col-span-1 lg:col-span-1">
                  <motion.div
                    className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-card hover:shadow-hover transition-smooth h-full"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center mb-3 sm:mb-4">
                      <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-primary mr-2 sm:mr-3" />
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold">Frontend</h3>
                    </div>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">React.js</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Redux</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Zustand</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Tailwind</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Material-UI</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Bootstrap</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Framer Motion</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Three.js</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Vite</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Webpack</span>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>

                {/* Databases & DevOps */}
                <ScrollReveal delay={0.3} className="sm:col-span-1 lg:col-span-1">
                  <motion.div
                    className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-card hover:shadow-hover transition-smooth h-full"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center mb-3 sm:mb-4">
                      <Server className="w-6 h-6 sm:w-8 sm:h-8 text-primary mr-2 sm:mr-3" />
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold">Databases</h3>
                    </div>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">PostgreSQL</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">MySQL</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">MongoDB</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Redis</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">SQLite</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Git</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Docker</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Kubernetes</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Jenkins</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">GitLab CI</span>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>

                {/* Tools & Platforms */}
                <ScrollReveal delay={0.4} className="sm:col-span-1 lg:col-span-1">
                  <motion.div
                    className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-card hover:shadow-hover transition-smooth h-full"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center mb-3 sm:mb-4">
                      <TabletSmartphone className="w-6 h-6 sm:w-8 sm:h-8 text-primary mr-2 sm:mr-3" />
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold">Tools</h3>
                    </div>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">VS Code</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">GitHub</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">GitLab</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">AWS</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">Android Studio</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">Postman</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">Figma</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">Adobe XD</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">Jira</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">Slack</span>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>

                {/* Soft Skills */}
                <ScrollReveal delay={0.5} className="sm:col-span-1 lg:col-span-1">
                  <motion.div
                    className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-card hover:shadow-hover transition-smooth h-full"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center mb-3 sm:mb-4">
                      <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary mr-2 sm:mr-3" />
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold">Soft Skills</h3>
                    </div>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">Leadership</span>
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">Communication</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">Agile</span>
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">Mentoring</span>
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">Problem Solving</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">Team Collaboration</span>
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">Time Management</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">Adaptability</span>
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">Creativity</span>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>

                {/* Proficiency Level - Large Card */}
                <ScrollReveal delay={0.6} className="sm:col-span-2 lg:col-span-2">
                  <motion.div
                    className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-card hover:shadow-hover transition-smooth h-full"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center mb-4 sm:mb-6">
                      <Target className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-primary mr-3 sm:mr-4" />
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">Proficiency Level</h3>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <div className="flex justify-between text-xs sm:text-sm mb-1 sm:mb-2">
                          <span className="font-medium">Backend Development</span>
                          <span className="text-primary font-bold">75%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                          <div className="bg-gradient-to-r from-primary to-purple-500 h-2 sm:h-3 rounded-full transition-all duration-1000" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs sm:text-sm mb-1 sm:mb-2">
                          <span className="font-medium">Frontend Development</span>
                          <span className="text-primary font-bold">65%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                          <div className="bg-gradient-to-r from-primary to-purple-500 h-2 sm:h-3 rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs sm:text-sm mb-1 sm:mb-2">
                          <span className="font-medium">DevOps & Deployment</span>
                          <span className="text-primary font-bold">60%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                          <div className="bg-gradient-to-r from-primary to-purple-500 h-2 sm:h-3 rounded-full transition-all duration-1000" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs sm:text-sm mb-1 sm:mb-2">
                          <span className="font-medium">Software Engineering</span>
                          <span className="text-primary font-bold">50%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                          <div className="bg-gradient-to-r from-primary to-purple-500 h-2 sm:h-3 rounded-full transition-all duration-1000" style={{ width: '50%' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Join Our Team Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <motion.div 
                className="text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInVariants}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Join Our <span className="gradient-text">Team</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Ready to work on exciting client projects? Join our talented team and build amazing solutions together
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    size="lg"
                    className="btn-gradient text-lg px-8 py-6 rounded-2xl hover:shadow-hover transition-smooth"
                    onClick={() => {
                      setWhatsappPopup({
                        isOpen: true,
                        title: "Join Our Team",
                        description: "Please provide your professional details so we can discuss career opportunities.",
                        formType: "joinTeam",
                      });
                    }}
                  >
                    Join Our Team
                  </Button>
                </motion.div>
              </motion.div>
            </ScrollReveal>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 color-shift">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <motion.div 
                className="text-center mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInVariants}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <AnimatedText text="Featured " />
                  <AnimatedText
                    text="Projects"
                    className="gradient-text inline-block"
                    delay={0.2}
                  />
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Explore my recent work and see how I bring ideas to life through code.
                </p>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <motion.div 
                className="flex flex-wrap justify-center gap-4 mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={containerVariants}
              >
                {["All", "Web Development", "AI/ML", "Mobile Apps", "Career Services"].map((filter, index) => (
                  <motion.div
                    key={filter}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={activeFilter === filter ? "default" : "outline"}
                      onClick={() => setActiveFilter(filter)}
                      className="rounded-full"
                    >
                      {filter}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </ScrollReveal>

            <Carousel plugins={[plugin.current]} className="w-full max-w-6xl mx-auto">
              <CarouselContent className="-ml-4">
                {filteredProjects.map((project, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <motion.div
                        className="group relative overflow-hidden rounded-2xl bg-card shadow-card hover:shadow-hover transition-smooth h-full"
                        whileHover={{ y: -10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="relative h-32 md:h-48 overflow-hidden">
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            initial={{ scale: 1, x: 0, y: 0 }}
                            whileHover={{
                              scale: 1.1,
                              x: index % 2 === 0 ? 10 : -10,
                              y: index % 3 === 0 ? 10 : -10
                            }}
                            transition={{ duration: 0.6 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.slice(0, 3).map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="flex-1"
                              onClick={() => {
                                setDemoRequestPopup({
                                  isOpen: true,
                                  title: `Demo Request: ${project.title}`,
                                  description: "Please provide your details so we can schedule a demo.",
                                  defaultDemo: project.title,
                                  availableDemos: projects.map(p => p.title),
                                });
                              }}
                            >
                              Request Demo
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* Career Section */}
        <section id="career" className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <motion.div 
                className="text-center mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInVariants}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <AnimatedText text="Career " />
                  <AnimatedText
                    text="Services"
                    className="gradient-text inline-block"
                    delay={0.2}
                  />
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Professional career development services to help you stand out in the competitive job market.
                </p>
              </motion.div>
            </ScrollReveal>

            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {careerServices.map((service, index) => (
                <ScrollReveal key={index} delay={index * 0.2} direction="up">
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.05,
                      boxShadow: "0px 20px 40px rgba(0,0,0,0.15)"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="stagger-item"
                  >
                    <motion.div
                      className={`p-8 rounded-2xl shadow-card transition-smooth group flex flex-col h-full ${service.color} ${service.hoverColor}`}
                      whileHover={{ y: -10, scale: 1.05, boxShadow: "0px 20px 40px rgba(0,0,0,0.2)" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex-grow">
                        <service.icon className="w-12 h-12 text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                        <p className="text-muted-foreground">{service.description}</p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          className="mt-6 w-full transition-smooth btn-gradient hover:shadow-hover"
                          onClick={() => handleCareerServiceClick(service.title)}
                        >
                          {service.buttonText}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <motion.div 
                className="text-center mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInVariants}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <AnimatedText text="Tailored " />
                  <AnimatedText
                    text="Packages"
                    className="gradient-text inline-block"
                    delay={0.2}
                  />
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Pricing Plans
                </p>
              </motion.div>
            </ScrollReveal>
            <PricingTable />
          </div>
        </section>

        {/* Contact Section */}
        <NewContactSection />

        <Footer />
      </main>

      <WhatsAppPopup
        isOpen={whatsappPopup.isOpen}
        onClose={() => setWhatsappPopup(prev => ({ ...prev, isOpen: false }))}
        title={whatsappPopup.title}
        description={whatsappPopup.description}
        formType={whatsappPopup.formType}
      />

      <CareerServicePopup
        isOpen={careerServicePopup.isOpen}
        onClose={() => setCareerServicePopup(prev => ({ ...prev, isOpen: false }))}
        onSubmit={handleCareerServiceSubmit}
        title={careerServicePopup.title}
        description={careerServicePopup.description}
        defaultInterest={careerServicePopup.defaultInterest}
      />

      <DemoRequestPopup
        isOpen={demoRequestPopup.isOpen}
        onClose={() => setDemoRequestPopup(prev => ({ ...prev, isOpen: false }))}
        onSubmit={handleDemoRequestSubmit}
        title={demoRequestPopup.title}
        description={demoRequestPopup.description}
        defaultDemo={demoRequestPopup.defaultDemo}
        availableDemos={demoRequestPopup.availableDemos}
      />
    </div>
  );
};

export default SinglePagePortfolio;
