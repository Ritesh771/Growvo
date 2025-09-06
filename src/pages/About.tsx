import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Award, Users, Briefcase, GraduationCap, Star, Code } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
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

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-3xl overflow-hidden shadow-card">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center animate-float">
                  <Code className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Content */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Hi, I'm <span className="gradient-text">Alex Johnson</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  A passionate full-stack developer and AI enthusiast with over 5 years of experience 
                  building innovative solutions. I specialize in creating modern web applications, 
                  mobile apps, and AI-powered systems that solve real-world problems.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    className="btn-gradient hover:shadow-hover transition-smooth"
                    asChild
                  >
                    <Link to="/portfolio">View My Work</Link>
                  </Button>
                  <Button 
                    variant="outline"
                    className="border border-primary/30 hover:border-primary hover:bg-primary/5"
                    asChild
                  >
                    <Link to="/contact">Get In Touch</Link>
                  </Button>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text">50+</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text">100%</div>
                    <div className="text-sm text-muted-foreground">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text">5+</div>
                    <div className="text-sm text-muted-foreground">Years Exp</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why <span className="gradient-text">Trust Me?</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                With a proven track record and extensive experience, I deliver quality solutions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <Card key={index} className="p-8 text-center card-gradient border border-white/20 hover:shadow-hover transition-smooth hover:-translate-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-6">
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{achievement.title}</h3>
                  <p className="text-muted-foreground">{achievement.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Technical <span className="gradient-text">Expertise</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Proficient in modern technologies and frameworks
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-2xl bg-gradient-card border border-white/20 text-center hover:shadow-card transition-smooth hover:scale-105"
                >
                  <div className="font-medium">{skill}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Client <span className="gradient-text">Testimonials</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                What my clients say about working with me
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "CEO, TechStart",
                  content: "Alex delivered an exceptional e-commerce platform that exceeded our expectations. Professional, timely, and innovative.",
                  rating: 5
                },
                {
                  name: "Mike Chen", 
                  role: "Founder, DataFlow",
                  content: "The AI solution Alex built for us increased our efficiency by 40%. Highly recommend his expertise.",
                  rating: 5
                },
                {
                  name: "Emma Davis",
                  role: "Marketing Director",
                  content: "Outstanding career services! Alex helped me land my dream job with a perfect resume and LinkedIn optimization.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <Card key={index} className="p-8 card-gradient border border-white/20 hover:shadow-hover transition-smooth">
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
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Work <span className="gradient-text">Together?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create something amazing
            </p>
            <Button 
              size="lg"
              className="btn-gradient text-lg px-8 py-6 rounded-2xl hover:shadow-hover transition-smooth"
              asChild
            >
              <Link to="/contact">Start Your Project</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;