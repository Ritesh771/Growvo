import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");

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
    },
    {
      title: "Chatbot Assistant",
      description: "Intelligent chatbot with natural language processing for customer service automation and query resolution.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600",
      technologies: ["Python", "NLP", "OpenAI API", "Flask"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.com",
      category: "AI/ML"
    }
  ];

  const categories = ["All", "Web Development", "Mobile Apps", "AI/ML", "Career Services"];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24">
        {/* Header */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              My <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Explore my recent projects showcasing expertise in web development, 
              mobile apps, AI/ML solutions, and career services.
            </p>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeFilter === category ? "default" : "outline"}
                  className={
                    activeFilter === category 
                      ? "btn-gradient" 
                      : "border border-primary/30 hover:border-primary hover:bg-primary/5"
                  }
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">
                  No projects found in this category.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your <span className="gradient-text">Project?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your requirements and create something amazing together.
            </p>
            <Button 
              size="lg"
              className="btn-gradient text-lg px-8 py-6 rounded-2xl hover:shadow-hover transition-smooth"
              asChild
            >
              <a href="/contact">Start Your Project</a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Portfolio;