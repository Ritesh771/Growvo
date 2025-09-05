import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
import { ArrowRight, Sparkles, Zap, Target, Code, Smartphone, Brain, Briefcase, Award, Users, GraduationCap, Star, Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const SinglePagePortfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

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
      textElements.forEach((element: any) => {
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

      // Color shift background
      gsap.to(".color-shift", {
        background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)",
        ease: "none",
        scrollTrigger: {
          trigger: ".color-shift",
          start: "top top",
          end: "bottom bottom",
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
        <section id="about" className="py-20 parallax-bg">
          <div className="container mx-auto px-6">
            {/* Hero About */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              {/* Profile Image */}
              <ScrollReveal>
                <div className="relative">
                  <div className="w-80 h-80 mx-auto rounded-3xl overflow-hidden shadow-card">
                    <img
                      src="/Ritesh.jpg"
                      alt="Ritesh N"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center animate-float">
                    <Code className="w-12 h-12 text-white" />
                  </div>
                </div>
              </ScrollReveal>

              {/* Content */}
              <ScrollReveal delay={0.3}>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Hi, I'm <span className="gradient-text">Ritesh N</span>
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

            {/* Professional Summary */}
            <div className="mb-20">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Professional <span className="gradient-text">Summary</span>
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                    I bring hands-on experience in backend development using Django and REST APIs, along with a keen eye for building responsive and engaging frontends using React.js and Tailwind CSS. Passionate about building scalable tech solutions with real-world impact, especially in the education and security sectors.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Technical Skills */}
            <div className="mb-20">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Technical <span className="gradient-text">Skills</span>
                  </h2>
                </div>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Languages & Frameworks */}
                <ScrollReveal delay={0.1}>
                  <motion.div
                    className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-bold mb-4">Languages & Frameworks</h3>
                    <div className="space-y-2 text-sm">
                      <div>Python, JavaScript, TypeScript</div>
                      <div>HTML5, CSS3</div>
                      <div>Django, Django REST Framework</div>
                      <div>Flask, TensorFlow</div>
                    </div>
                  </motion.div>
                </ScrollReveal>

                {/* Frontend Technologies */}
                <ScrollReveal delay={0.2}>
                  <motion.div
                    className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-bold mb-4">Frontend Technologies</h3>
                    <div className="space-y-2 text-sm">
                      <div>React.js, Redux Toolkit</div>
                      <div>Tailwind CSS</div>
                    </div>
                  </motion.div>
                </ScrollReveal>

                {/* Databases & DevOps */}
                <ScrollReveal delay={0.3}>
                  <motion.div
                    className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-bold mb-4">Databases & DevOps</h3>
                    <div className="space-y-2 text-sm">
                      <div>PostgreSQL, MySQL, Redis</div>
                      <div>Git, Postman</div>
                    </div>
                  </motion.div>
                </ScrollReveal>

                {/* Tools & Platforms */}
                <ScrollReveal delay={0.4}>
                  <motion.div
                    className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-bold mb-4">Tools & Platforms</h3>
                    <div className="space-y-2 text-sm">
                      <div>Visual Studio Code, GitHub</div>
                      <div>AWS (basic), Android Studio</div>
                    </div>
                  </motion.div>
                </ScrollReveal>

                {/* Soft Skills */}
                <ScrollReveal delay={0.5}>
                  <motion.div
                    className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-bold mb-4">Soft Skills</h3>
                    <div className="space-y-2 text-sm">
                      <div>Team Leadership</div>
                      <div>Agile Collaboration</div>
                      <div>Technical Mentoring</div>
                    </div>
                  </motion.div>
                </ScrollReveal>

                {/* Proficiency Level */}
                <ScrollReveal delay={0.6}>
                  <motion.div
                    className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-bold mb-4">Proficiency Level</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Backend Development</span>
                          <span>75%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{width: '75%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Frontend Development</span>
                          <span>65%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{width: '65%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>DevOps & Deployment</span>
                          <span>60%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{width: '60%'}}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              </div>
            </div>

            {/* Experience & Education */}
            <div className="mb-20">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Experience & <span className="gradient-text">Education</span>
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    My professional journey and educational background
                  </p>
                </div>
              </ScrollReveal>

              <div className="space-y-8">
                {/* Work Experience */}
                <div>
                  <h3 className="text-2xl font-bold mb-6">Work Experience</h3>
                  <div className="space-y-6">
                    {[
                      {
                        period: "Feb 2025 - Present",
                        title: "Technical Intern & Team Lead",
                        company: "Castle Rockin",
                        description: "Promoted to Team Lead within 2 months of joining. Led end-to-end development for a placement guidance platform (under NDA). Collaborated with cross-functional teams using Git, React, and Django stack. Worked on PostgreSQL-based dynamic dashboards and secure backend services.",
                        technologies: ["React.js", "Django", "PostgreSQL", "Git"]
                      },
                      {
                        period: "Feb 2025 - Present",
                        title: "Founder & CEO",
                        company: "Stalight Technology Pvt Ltd",
                        description: "Bootstrapped an AI-based education tech startup. Leading product design and development of an AI-enabled Campus Management System. Developed multiple MVPs including real-time attendance systems, navigation aids for the visually impaired, and women's safety apps.",
                        technologies: ["React.js", "Django", "PostgreSQL", "AWS", "Android"]
                      },
                      {
                        period: "Jan 2023 - Jan 2024",
                        title: "Python Development Intern",
                        company: "Stonx Solutions",
                        description: "Build a kite API connection system to fetch the portfolio values. Designed backend for Brokerage activation and connection (session activation - Zerodha). Implemented Trading dashboard for both Client and Trader. Improved data processing efficiency.",
                        technologies: ["Python", "TensorFlow", "Data Analysis"]
                      },
                      {
                        period: "Feb 2023 – Jun 2023",
                        title: "Bootcamp Trainee (Multiple Tracks)",
                        company: "LetsUpgrade",
                        description: "Completed intensive bootcamps in Figma (UI/UX), Python, React, SQL, and Placement Preparation. Mastered UX/UI design principles and Figma tools for creating interactive prototypes and design systems.",
                        technologies: ["Figma", "Python", "React.js", "SQL", "Data Structures", "Algorithms", "UI/UX"]
                      }
                    ].map((exp, index) => (
                      <ScrollReveal key={index} delay={index * 0.1} direction="up">
                        <motion.div
                          className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <div>
                              <h4 className="text-xl font-bold">{exp.title}</h4>
                              <p className="text-primary font-medium">{exp.company}</p>
                            </div>
                            <div className="text-sm text-muted-foreground mt-2 md:mt-0">
                              {exp.period}
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-4">{exp.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Projects */}
            <div className="mb-20">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Key <span className="gradient-text">Projects</span>
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Showcasing innovative solutions and cutting-edge technology implementations
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Safe Space (Women's Safety App)",
                    period: "Apr 2025 - Present",
                    company: "Stalight Technology",
                    description: "Mobile app with location tracking, panic button, and emergency alerts",
                    technologies: ["React.js", "Django", "PostgreSQL"],
                    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400"
                  },
                  {
                    title: "Slot Booking Platform",
                    period: "Jun 2023 - Aug 2023",
                    company: "Stalight Technology",
                    description: "Online slot booking system for sports with Razorpay integration",
                    technologies: ["React.js", "Django", "PostgreSQL"],
                    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400"
                  },
                  {
                    title: "Crack the Campus (Placement Guidance)",
                    period: "Feb 2025 - Present",
                    company: "Castle Rockin",
                    description: "Confidential platform under NDA – personal role included UI development and backend APIs",
                    technologies: ["HTML5", "CSS3", "React.js"],
                    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400"
                  },
                  {
                    title: "AgriWe (Smart Farming Assistant)",
                    period: "Apr 2024",
                    company: "T. John College of Engineering",
                    description: "Suggests high-yield crops, fertilizers, and pesticides based on seasonal data",
                    technologies: ["Python", "HTML5", "CSS3"],
                    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400"
                  },
                  {
                    title: "Anomaly Detection Surveillance System",
                    period: "Jan 2024 - Mar 2024",
                    company: "AMC College of Engineering",
                    description: "Real-time detection of suspicious activity using Python & Flask",
                    technologies: ["Flask", "MySQL", "Redis"],
                    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400"
                  },
                  {
                    title: "Navigation Guidance for the Visually Impaired",
                    period: "Jan 2025",
                    company: "Stalight Technology",
                    description: "TensorFlow-based navigation system providing audio cues",
                    technologies: ["Python", "Flask", "TensorFlow"],
                    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400"
                  }
                ].map((project, index) => (
                  <ScrollReveal key={index} delay={index * 0.1} direction="up">
                    <motion.div
                      className="group relative overflow-hidden rounded-2xl bg-card shadow-card hover:shadow-hover transition-smooth"
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all">
                          {project.title}
                        </h3>
                        <p className="text-primary font-medium text-sm mb-2">{project.company}</p>
                        <p className="text-muted-foreground text-sm mb-2">{project.period}</p>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Certificates & Achievements */}
            <div className="mb-20">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Certificates & <span className="gradient-text">Achievements</span>
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Continuous learning and professional development milestones
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "AWS Academy Cloud Foundations", issuer: "AWS Academy", date: "October 2024" },
                  { title: "Android Developer Virtual Internship", issuer: "Google for Developers", date: "July - September 2024" },
                  { title: "AI-ML Virtual Internship", issuer: "Google for Developers", date: "April - June 2024" },
                  { title: "Figma Bootcamp", issuer: "LetsUpgrade", date: "September - October 2024" },
                  { title: "Placement Prep Bootcamp", issuer: "LetsUpgrade", date: "October 2024" },
                  { title: "Python Bootcamp", issuer: "LetsUpgrade", date: "November 2024" },
                  { title: "React Bootcamp", issuer: "LetsUpgrade", date: "February 2025" },
                  { title: "SQL Bootcamp", issuer: "LetsUpgrade", date: "January 2025" },
                  { title: "Technical Internship Offer", issuer: "Net Ninja Solutions", date: "February 2025" }
                ].map((cert, index) => (
                  <ScrollReveal key={index} delay={index * 0.05} direction="up">
                    <motion.div
                      className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-card transition-all"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h4 className="font-bold text-sm mb-1">{cert.title}</h4>
                      <p className="text-primary text-xs mb-1">{cert.issuer}</p>
                      <p className="text-muted-foreground text-xs">{cert.date}</p>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* CTA */}
            <ScrollReveal>
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Work <span className="gradient-text">Together?</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Let's discuss your project and create something amazing
                </p>
                <Button
                  size="lg"
                  className="btn-gradient text-lg px-8 py-6 rounded-2xl hover:shadow-hover transition-smooth"
                  onClick={() => {
                    const element = document.getElementById('contact');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Start Your Project
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>        {/* Services Section */}
        <section id="services" className="py-20 bg-secondary/30 parallax-mid">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
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
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <ScrollReveal key={index} delay={index * 0.1} direction="up">
                  <ServiceCard {...service} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 color-shift">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
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
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {["All", "Web Development", "AI/ML", "Mobile Apps", "Career Services"].map((filter) => (
                  <Button
                    key={filter}
                    variant={activeFilter === filter ? "default" : "outline"}
                    onClick={() => setActiveFilter(filter)}
                    className="rounded-full"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ScrollReveal key={index} delay={index * 0.1} direction="up">
                  <motion.div
                    className="group relative overflow-hidden rounded-2xl bg-card shadow-card hover:shadow-hover transition-smooth"
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Ken Burns Effect */}
                    <div className="relative h-48 overflow-hidden">
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
                        <Button size="sm" variant="outline" className="flex-1">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            View Code
                          </a>
                        </Button>
                        <Button size="sm" className="flex-1">
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            Live Demo
                          </a>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Career Section */}
        <section id="career" className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
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
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Resume Design",
                  description: "Professional resume design that highlights your skills and experience.",
                  icon: Briefcase
                },
                {
                  title: "LinkedIn Optimization",
                  description: "Optimize your LinkedIn profile to attract recruiters and opportunities.",
                  icon: Users
                },
                {
                  title: "Interview Coaching",
                  description: "Prepare for technical interviews with mock sessions and feedback.",
                  icon: Star
                }
              ].map((service, index) => (
                <ScrollReveal key={index} delay={index * 0.2} direction="up">
                  <motion.div
                    className="p-8 rounded-2xl bg-card shadow-card hover:shadow-hover transition-smooth group"
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <service.icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <AnimatedText text="Pricing " />
                  <AnimatedText
                    text="Plans"
                    className="gradient-text inline-block"
                    delay={0.2}
                  />
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Choose the perfect package for your project needs.
                </p>
              </div>
            </ScrollReveal>
            <PricingTable />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 relative overflow-hidden">
          {/* Glass Morphism Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple/20 to-primary-light/20 backdrop-blur-3xl" />
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
          
          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <AnimatedText text="Get In " />
                  <AnimatedText
                    text="Touch"
                    className="gradient-text inline-block"
                    delay={0.2}
                  />
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Ready to start your next project? Let's discuss how we can work together.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <ScrollReveal>
                <motion.div
                  className="space-y-8 p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-muted-foreground">ritesh@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-muted-foreground">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Location</h3>
                      <p className="text-muted-foreground">Bengaluru, India</p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <motion.div
                  className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-muted-foreground/50"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-muted-foreground/50"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-muted-foreground/50 resize-none"
                        placeholder="Tell me about your project"
                      />
                    </div>
                    <Button className="w-full btn-gradient">
                      Send Message
                    </Button>
                  </form>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SinglePagePortfolio;
