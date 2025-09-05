import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  icon: LucideIcon;
  features: string[];
  href: string;
}

const ServiceCard = ({ title, description, price, icon: Icon, features, href }: ServiceCardProps) => {
  return (
    <Card className="relative overflow-hidden group hover:shadow-hover transition-smooth hover:-translate-y-2 card-gradient border border-white/20">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-smooth" />
      
      <div className="p-8">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth">
          <Icon className="w-8 h-8 text-white" />
        </div>

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
          className="w-full btn-gradient hover:shadow-hover transition-smooth group"
          asChild
        >
          <Link to={href} className="flex items-center justify-center gap-2">
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default ServiceCard;