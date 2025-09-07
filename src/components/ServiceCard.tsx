import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  icon: LucideIcon;
  features: string[];
  href: string;
  color: string; // Added color prop
  hoverColor: string; // Added hoverColor prop
  onClick?: (href: string) => void; // Optional custom click handler
}

const ServiceCard = ({ title, description, price, icon: Icon, features, href, color, hoverColor, onClick }: ServiceCardProps) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClick = (href: string) => {
    if (onClick) {
      onClick(href);
      return;
    }

    if (href.startsWith('https://')) {
      // External link (WhatsApp)
      window.open(href, '_blank');
    } else {
      // Internal section link
      scrollToSection(href);
    }
  };

  return (
    <motion.div
      className={`relative overflow-hidden group shadow-card transition-smooth ${color} ${hoverColor}`}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        boxShadow: "0px 10px 30px rgba(0,0,0,0.2)"
      }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{ pointerEvents: 'auto' }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-smooth pointer-events-none" />
      
      <div className="p-4 md:p-8">
        {/* Icon */}
        <motion.div
          className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6"
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

        {/* Features */}
        <ul className="space-y-2 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-primary mr-3" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Price */}
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <span className="text-3xl font-bold gradient-text">{price}</span>
            <span className="text-muted-foreground ml-2">starting</span>
          </div>
        </div>

        {/* CTA */}
        <Button 
          className="w-full btn-gradient hover:shadow-hover transition-smooth group cursor-pointer"
          onClick={() => handleClick(href)}
        >
          Get Started
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;