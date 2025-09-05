import Navbar from "@/components/Navbar";
import ServiceCard from "@/components/ServiceCard";
import { FileText, Linkedin, Globe, Users } from "lucide-react";

const Career = () => {
  const careerServices = [
    {
      title: "Resume Creation & Design",
      description: "Professional resume writing and design that gets you noticed by recruiters and hiring managers.",
      price: "₹2,500",
      icon: FileText,
      features: [
        "ATS-optimized format",
        "Professional design",
        "Keyword optimization",
        "Multiple versions",
        "Unlimited revisions"
      ],
      href: "/contact"
    },
    {
      title: "LinkedIn Optimization",
      description: "Complete LinkedIn profile optimization to attract opportunities and build professional network.",
      price: "₹3,500",
      icon: Linkedin,
      features: [
        "Profile optimization",
        "Headline & summary",
        "Skills enhancement",
        "Network building tips",
        "Content strategy"
      ],
      href: "/contact"
    },
    {
      title: "Portfolio Website",
      description: "Custom portfolio website to showcase your work and attract potential employers or clients.",
      price: "₹8,000",
      icon: Globe,
      features: [
        "Custom design",
        "Responsive layout",
        "Project showcase",
        "SEO optimized",
        "Contact integration"
      ],
      href: "/contact"
    },
    {
      title: "Mentorship & Coaching",
      description: "One-on-one mentorship for interview preparation, career guidance, and skill development.",
      price: "₹5,000",
      icon: Users,
      features: [
        "Interview preparation",
        "Mock interviews",
        "Career roadmap",
        "Skill assessment",
        "Industry insights"
      ],
      href: "/contact"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24">
        {/* Header */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Career</span> Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Accelerate your career with professional services designed to help you 
              land your dream job and advance in your field.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {careerServices.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                How It <span className="gradient-text">Works</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Simple 4-step process to transform your career prospects
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Consultation",
                  description: "We discuss your career goals and current situation"
                },
                {
                  step: "02", 
                  title: "Strategy",
                  description: "Create a customized plan tailored to your needs"
                },
                {
                  step: "03",
                  title: "Implementation",
                  description: "Execute the plan with professional guidance"
                },
                {
                  step: "04",
                  title: "Success",
                  description: "Land interviews and achieve your career goals"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary text-white flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Career;