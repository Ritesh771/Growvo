import React from 'react';
import { AnimatedText } from "@/components/AnimatedText";
import { Github, Linkedin, Mail, Send } from 'lucide-react';

// WhatsApp SVG Icon
const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 32 32" fill="none" width={props.width || 24} height={props.height || 24} {...props}>
    <circle cx="16" cy="16" r="16" fill="#25D366" />
    <path d="M23.47 8.53A8.94 8.94 0 0 0 16 6a9 9 0 0 0-7.8 13.5l-1.1 4.02a1 1 0 0 0 1.22 1.22l4.02-1.1A9 9 0 1 0 23.47 8.53Zm-7.47 13.2a7.2 7.2 0 0 1-3.67-1l-.26-.15-2.18.6.58-2.13-.17-.27A7.2 7.2 0 1 1 16 21.73Z" fill="#fff" />
  </svg>
);

const NewContactSection = () => {
  const handleCardClick = (href: string, e: React.MouseEvent) => {
    // No popup for WhatsApp, let it open directly
  };

  /* Reusable Card Components */
  const Card = ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => handleCardClick(href, e)}
      className="group rounded-2xl p-6 bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-2xl transform hover:scale-[1.05] transition-all duration-500 cursor-pointer block hover:-translate-y-2 relative overflow-hidden"
    >
      {children}
    </a>
  );

  const IconBox = ({ children, color }) => (
    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4 shadow-lg hover:scale-110 transition-all duration-300 group-hover:rotate-3 group-hover:shadow-xl`}>
      {children}
    </div>
  );

  const CardTitle = ({ children }) => (
    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
      {children}
    </h3>
  );

  const CardDesc = ({ children }) => (
    <p className="text-muted-foreground mb-4 text-sm group-hover:text-foreground/80 transition-colors duration-300">
      {children}
    </p>
  );

  const CardButton = ({ children }) => (
    <div
      className="inline-flex items-center px-4 py-2 rounded-xl text-primary-foreground font-medium transition-all duration-300 bg-gradient-primary cursor-pointer shadow-md hover:shadow-lg transform group-hover:scale-105 group-hover:-translate-y-1"
    >
      <span className="mr-2">{children}</span>
      <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </div>
  );

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <AnimatedText text="Get In " />
            <AnimatedText text="Touch" className="gradient-text inline-block" delay={0.2} />
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Email */}
          <Card href="mailto:riteshnvisonex@gmail.com?subject=Project%20Inquiry&body=Hello%20I%20am%20interested%20in%20your%20services.%20Please%20let%20me%20know%20your%20availability%20for%20a%20discussion.">
            <IconBox color="bg-gradient-primary">
              <Mail className="text-white w-6 h-6 drop-shadow-sm" />
            </IconBox>
            <CardTitle>Email</CardTitle>
            <CardDesc>Perfect for detailed discussions</CardDesc>
            <CardButton>
              send an email
            </CardButton>
          </Card>

          {/* WhatsApp */}
          <Card href="https://wa.me/918660144040?text=Hi%20Ritesh,%20I'm%20interested%20in%20your%20services.%20Can%20we%20discuss%20a%20project?">
            <IconBox color="bg-green-500">
              <WhatsAppIcon width={24} height={24} />
            </IconBox>
            <CardTitle>WhatsApp</CardTitle>
            <CardDesc>Quick messages</CardDesc>
            <CardButton>
              chat with me
            </CardButton>
          </Card>

          {/* LinkedIn */}
          <Card href="https://linkedin.com/in/ritesh-n-5113b328a">
            <IconBox color="bg-blue-600">
              <Linkedin className="text-white w-6 h-6 drop-shadow-sm" />
            </IconBox>
            <CardTitle>LinkedIn</CardTitle>
            <CardDesc>Professional network</CardDesc>
            <CardButton>
              connect with me
            </CardButton>
          </Card>

          {/* GitHub */}
          <Card href="https://github.com/Ritesh771">
            <IconBox color="bg-gray-800">
              <Github className="text-white w-6 h-6 drop-shadow-sm" />
            </IconBox>
            <CardTitle>GitHub</CardTitle>
            <CardDesc>Explore my projects</CardDesc>
            <CardButton>
              Explore
            </CardButton>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default NewContactSection;