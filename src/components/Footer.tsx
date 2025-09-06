import { motion } from "framer-motion";
import { Heart, Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from "lucide-react";
import growvoLogo from "@/assets/growvo-logo.png";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "#home" },
    
    { name: "Pricing", path: "#pricing" },
    { name: "Services", path: "#services" },
    

    
  ];

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/Ritesh771" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/ritesh-n-5113b328a" },
    { name: "Email", icon: Mail, href: "mailto:riteshnvisonex@gmail.com" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-12 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img src={growvoLogo} alt="Growvo Logo" className="h-12 w-12 rounded-lg shadow-lg" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Growvo
                </h3>
                <p className="text-gray-400 text-sm">Technology Solutions</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Transforming ideas into digital reality with affordable web development, mobile apps, AI/ML solutions, and career services.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <button
                    onClick={() => scrollToSection(link.path)}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Connect With Us</h4>
            <div className="flex flex-col space-y-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors duration-300 group"
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm">{social.name}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-blue-400" />
                <a 
                  href="mailto:riteshnvisonex@gmail.com" 
                  className="text-sm hover:text-blue-400 transition-colors duration-200"
                >
                  riteshnvisonex@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-green-400" />
                <a 
                  href="tel:+918660144040" 
                  className="text-sm hover:text-green-400 transition-colors duration-200"
                >
                  +91 8660144040
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-red-400" />
                <span className="text-sm">India</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-gray-700 pt-8 mt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Growvo. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Crafted with</span>
              <Heart className="text-red-500 animate-pulse w-4 h-4" />
              <span>by Growvo</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;