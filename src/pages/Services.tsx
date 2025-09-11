import Navbar from "@/components/Navbar";
import ServiceCard from "@/components/ServiceCard";
import PricingTable from "@/components/PricingTable";
import DemoRequestPopup from "@/components/DemoRequestPopup";
import { Code, Smartphone, Brain, Briefcase } from "lucide-react";
import { useState } from "react";

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description: "Full-stack web applications with modern technologies like React, Django, and Node.js.",
      price: "₹7000",
      icon: Code,
      features: [
        "Responsive design",
        "Modern frameworks",
        "Database integration",
        "API development",
        "SEO optimization"
      ],
      href: "/contact",
      color: "#2563eb",
      hoverColor: "#1e40af"
    },
    {
      title: "Mobile Apps", 
      description: "Cross-platform mobile applications with React Native and Flutter.",
      price: "₹15000",
      icon: Smartphone,
      features: [
        "iOS & Android",
        "Native performance",
        "Push notifications",
        "App store deployment (Extra cost)",
        "Backend integration"
      ],
      href: "/contact",
      color: "#059669",
      hoverColor: "#047857"
    },
    {
      title: "AI/ML Solutions",
      description: "Intelligent applications with machine learning and artificial intelligence.",
      price: "₹20000",
      icon: Brain,
      features: [
        "Custom AI models",
        "Data analysis",
        "Automation solutions",
        "API integration",
        "Cloud deployment"
      ],
      href: "/contact",
      color: "#d97706",
      hoverColor: "#b45309"
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
      href: "/career",
      color: "#db2777",
      hoverColor: "#be185d"
    }
  ];

  const [demoRequestPopup, setDemoRequestPopup] = useState({
    isOpen: false,
    title: "",
    description: "",
    defaultDemo: "",
    availableDemos: [] as string[],
  });

  const handleServiceClick = (service: any) => {
    setDemoRequestPopup({
      isOpen: true,
      title: `Service Inquiry: ${service.title}`,
      description: "Please provide your details so we can discuss your service requirements.",
      defaultDemo: service.title,
      availableDemos: services.map(s => s.title),
    });
  };

  const handleDemoSubmit = (data: any) => {
    console.log("Demo request submitted:", data);
    // Handle form submission here
  };

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
                <ServiceCard 
                  key={index} 
                  {...service} 
                  onClick={() => handleServiceClick(service)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <PricingTable />
      </main>

      <DemoRequestPopup
        isOpen={demoRequestPopup.isOpen}
        onClose={() => setDemoRequestPopup(prev => ({ ...prev, isOpen: false }))}
        onSubmit={handleDemoSubmit}
        title={demoRequestPopup.title}
        description={demoRequestPopup.description}
        defaultDemo={demoRequestPopup.defaultDemo}
        availableDemos={demoRequestPopup.availableDemos}
      />
    </div>
  );
};

export default Services;