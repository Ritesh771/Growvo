import Navbar from "@/components/Navbar";
import ServiceCard from "@/components/ServiceCard";
import PricingTable from "@/components/PricingTable";
import { Code, Smartphone, Brain, Briefcase } from "lucide-react";

const Services = () => {
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
      href: "/contact"
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
      href: "/contact"
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
      href: "/contact"
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
      href: "/career"
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
              Professional <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From web development to career services, I provide comprehensive solutions 
              to help you achieve your goals with quality and expertise.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <PricingTable />
      </main>
    </div>
  );
};

export default Services;