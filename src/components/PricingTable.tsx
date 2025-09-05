import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

const PricingTable = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const plans = [
    {
      name: "Small",
      subtitle: "Perfect for startups",
      price: "₹15,000",
      duration: "2-3 weeks",
      popular: false,
      features: [
        "Single page application",
        "Responsive design",
        "Basic SEO optimization",
        "Contact form integration",
        "2 rounds of revisions",
        "Basic deployment",
        "1 month support"
      ]
    },
    {
      name: "Medium",
      subtitle: "Most popular choice",
      price: "₹35,000",
      duration: "4-6 weeks",
      popular: true,
      features: [
        "Multi-page website/app",
        "Advanced UI/UX design",
        "Database integration",
        "Admin panel",
        "API development",
        "Payment gateway integration",
        "SEO & performance optimization",
        "3 months support"
      ]
    },
    {
      name: "Large",
      subtitle: "Enterprise solution",
      price: "₹75,000",
      duration: "8-12 weeks",
      popular: false,
      features: [
        "Full-stack application",
        "Custom CMS/Dashboard",
        "Advanced features",
        "AI/ML integration",
        "Real-time functionality",
        "Multiple integrations",
        "Performance monitoring",
        "6 months support",
        "Dedicated project manager"
      ]
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="gradient-text">Perfect Package</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing with no hidden costs. All packages include quality code, documentation, and ongoing support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`relative overflow-hidden transition-smooth hover:shadow-hover hover:-translate-y-2 ${
                plan.popular 
                  ? 'border-2 border-primary shadow-card scale-105' 
                  : 'border border-white/20 card-gradient'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-primary text-white text-center py-3 font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`p-8 ${plan.popular ? 'pt-20' : ''}`}>
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-6">{plan.subtitle}</p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-6">
                    Delivery: {plan.duration}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button 
                  className={`w-full transition-smooth ${
                    plan.popular 
                      ? 'btn-gradient hover:shadow-hover' 
                      : 'border-2 border-primary/30 hover:border-primary hover:bg-primary/5'
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => scrollToSection('#contact')}
                >
                  Get Started
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Custom solution CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Need something custom? Let's discuss your unique requirements.
          </p>
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-smooth"
            onClick={() => scrollToSection('#contact')}
          >
            Request Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;