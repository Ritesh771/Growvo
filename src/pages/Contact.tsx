import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import WhatsAppPopup from "@/components/WhatsAppPopup";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    serviceType: "",
    budget: "",
    message: ""
  });

  const { toast } = useToast();
  const [whatsappPopup, setWhatsappPopup] = useState({
    isOpen: false,
    title: "",
    description: "",
    formType: "basic" as "basic" | "joinTeam" | "demo" | "customQuote",
  });

  const handleWhatsappClick = () => {
    setWhatsappPopup({
      isOpen: true,
      title: "Get in Touch",
      description: "Please provide your details so we can personalize our conversation.",
      formType: "basic",
    });
  };

  const handleWhatsappSubmit = () => {
    // Submission handled internally by WhatsAppPopup
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your inquiry. I'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", serviceType: "", budget: "", message: "" });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24">
        {/* Header */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Let's Work <span className="gradient-text">Together</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Get in touch and let's discuss how I can help 
              bring your ideas to life.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-6 pb-20">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* WhatsApp Card */}
                <Card className="p-8 card-gradient border border-white/20 hover:shadow-hover transition-smooth">
                  <div className="w-16 h-16 rounded-2xl bg-green-500 flex items-center justify-center mb-6">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">WhatsApp Chat</h3>
                  <p className="text-muted-foreground mb-6">
                    Get instant response on WhatsApp for quick queries and discussions.
                  </p>
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                    onClick={handleWhatsappClick}
                  >
                    Chat on WhatsApp
                  </Button>
                </Card>

                {/* Contact Details */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <a 
                        href="mailto:alex@growvo.dev?subject=Project%20Inquiry&body=Hello%20I%20am%20interested%20in%20your%20services.%20Please%20let%20me%20know%20your%20availability%20for%20a%20discussion." 
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        alex@growvo.dev
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Phone</div>
                      <a 
                        href="tel:+919876543210" 
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        +91 98765 43210
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-muted-foreground">India (Remote Available)</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Response Time</div>
                      <div className="text-muted-foreground">Within 24 hours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 card-gradient border border-white/20">
                <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name *</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Service Type</label>
                      <Select onValueChange={(value) => handleChange("serviceType", value)}>
                        <SelectTrigger className="border-primary/20 focus:border-primary">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">Web Development</SelectItem>
                          <SelectItem value="mobile">Mobile App</SelectItem>
                          <SelectItem value="ai">AI/ML Solution</SelectItem>
                          <SelectItem value="career">Career Services</SelectItem>
                          <SelectItem value="custom">Custom Project</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Budget Range</label>
                      <Select onValueChange={(value) => handleChange("budget", value)}>
                        <SelectTrigger className="border-primary/20 focus:border-primary">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">₹10,000 - ₹25,000</SelectItem>
                          <SelectItem value="medium">₹25,000 - ₹50,000</SelectItem>
                          <SelectItem value="large">₹50,000 - ₹1,00,000</SelectItem>
                          <SelectItem value="enterprise">₹1,00,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Tell me about your project requirements, timeline, and any specific needs..."
                      rows={6}
                      required
                      className="border-primary/20 focus:border-primary resize-none"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full btn-gradient hover:shadow-hover transition-smooth text-lg py-6"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: "How long does a typical project take?",
                  answer: "Project timelines vary based on complexity. Small projects take 2-3 weeks, medium projects 4-6 weeks, and large projects 8-12 weeks."
                },
                {
                  question: "Do you work with international clients?",
                  answer: "Yes, I work with clients worldwide. All communication is in English and I'm flexible with time zones."
                },
                {
                  question: "What's included in the project cost?",
                  answer: "All quoted prices include development, testing, deployment, documentation, and post-launch support as specified in each package."
                },
                {
                  question: "Can you maintain my project after completion?",
                  answer: "Yes, I offer ongoing maintenance and support packages. All projects include initial support period as mentioned in the package details."
                }
              ].map((faq, index) => (
                <Card key={index} className="p-6 card-gradient border border-white/20">
                  <h3 className="font-bold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <WhatsAppPopup
        isOpen={whatsappPopup.isOpen}
        onClose={() => setWhatsappPopup(prev => ({ ...prev, isOpen: false }))}
        title={whatsappPopup.title}
        description={whatsappPopup.description}
        formType={whatsappPopup.formType}
      />
    </div>
  );
};

export default Contact;