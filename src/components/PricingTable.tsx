import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import WhatsAppPopup from "@/components/WhatsAppPopup";
import PricingPlanPopup from "@/components/PricingPlanPopup";

const PricingTable = () => {
  const whatsappNumber = "+918660144040";
  const [whatsappPopup, setWhatsappPopup] = useState({
    isOpen: false,
    message: "",
    title: "",
    description: "",
    formType: "basic" as "basic" | "joinTeam" | "demo" | "customQuote",
  });

  const [pricingPlanPopup, setPricingPlanPopup] = useState({
    isOpen: false,
    title: "",
    description: "",
    defaultPlan: "",
  });

  const handleGetStarted = (planName: string, price: string) => {
    setPricingPlanPopup({
      isOpen: true,
      title: `Interest in ${planName} Plan`,
      description: "Please provide your details so we can discuss your project requirements.",
      defaultPlan: planName,
    });
  };

  const handleCustomQuote = () => {
    const message = "Hi Ritesh, I'm interested in a custom quote for my project. Can we discuss my specific requirements?";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleWhatsappSubmit = (userData: { name: string; email: string }) => {
    const fullMessage = `Hello! My name is ${userData.name} and my email is ${userData.email}.\n\n${whatsappPopup.message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handlePricingPlanSubmit = (userData: any) => {
    // Form data is already submitted to Google Form in PricingPlanPopup
    // No additional WhatsApp message needed
    console.log('Pricing plan form submitted successfully:', userData);
  };

  const plans = [
    {
      name: "Small",
      subtitle: "Perfect for startups",
      price: "₹10,000",
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
      price: "₹27,000",
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
      price: "₹35,000",
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
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            whileHover={{ scale: 1.05, rotateY: 10, boxShadow: "0px 10px 30px rgba(0,0,0,0.2)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card 
              className={`relative overflow-hidden transition-smooth h-full min-h-[500px] md:min-h-[550px] ${
                plan.popular 
                  ? 'border-2 border-primary shadow-card' 
                  : 'border border-white/20 card-gradient'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-primary text-white text-center py-2 md:py-3 font-medium z-10">
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="text-sm md:text-base">Most Popular</span>
                  </div>
                </div>
              )}

              <div className={`p-4 md:p-8 ${plan.popular ? 'pt-16 md:pt-20' : ''}`}>
                <div className="text-center mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-4 md:mb-6">{plan.subtitle}</p>
                  
                  <div className="mb-4">
                    <span className="text-3xl md:text-4xl font-bold gradient-text">{plan.price}</span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-4 md:mb-6">
                    Delivery: {plan.duration}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
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
                  onClick={() => handleGetStarted(plan.name, plan.price)}
                >
                  Get Started
                </Button>
              </div>
            </Card>
          </motion.div>
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
          onClick={handleCustomQuote}
        >
          Request Custom Quote
        </Button>
      </div>

      <WhatsAppPopup
        isOpen={whatsappPopup.isOpen}
        onClose={() => setWhatsappPopup(prev => ({ ...prev, isOpen: false }))}
        onSubmit={handleWhatsappSubmit}
        title={whatsappPopup.title}
        description={whatsappPopup.description}
        formType={whatsappPopup.formType}
      />

      <PricingPlanPopup
        isOpen={pricingPlanPopup.isOpen}
        onClose={() => setPricingPlanPopup(prev => ({ ...prev, isOpen: false }))}
        onSubmit={handlePricingPlanSubmit}
        title={pricingPlanPopup.title}
        description={pricingPlanPopup.description}
        defaultPlan={pricingPlanPopup.defaultPlan}
      />
    </>
  );
};

export default PricingTable;
