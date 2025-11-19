
import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent, target: string, hash?: string) => {
    e.preventDefault();
    if (target === 'home') {
      onNavigate('home');
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      onNavigate(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-textDark text-white pt-20 pb-8 relative">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Company Column */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-6 text-white">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'home')} className="text-gray-400 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="text-gray-400 hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Sitemap</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Other Services Column */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-6 text-white">Other Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Mobile App Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Web Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Ecommerce Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Custom Software Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Reactjs development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">AI Development Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">AWS Support Services</a></li>
            </ul>
          </div>

          {/* Portfolio Column */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-6 text-white">Portfolio</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Manmind</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Legal Buddy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Becker Tools</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Bross App</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Olam</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">GORC</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">ATRSTL</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Soluna</a></li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-6 text-white">Contact Info</h3>
            <div className="mb-6">
              <strong className="block text-white mb-2">India Office:</strong>
              <p className="text-gray-400 leading-relaxed">
                35/22, AI Block 4th Street,<br />
                Shanthi Colony, Anna Nagar,<br />
                Chennai – 600040
              </p>
            </div>
            <div className="mb-6">
              <strong className="block text-white mb-2">US Office:</strong>
              <p className="text-gray-400 leading-relaxed">
                12645 Olive Blvd,<br />
                St Louis, Missouri 63141
              </p>
            </div>
            <div className="text-gray-400 space-y-2">
              <p>QM 4596 7630</p>
              <p>+91 97907 54439</p>
              <p>info@absoluteapplabs.com</p>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm text-center md:text-left mb-4 md:mb-0">
              Copyrights &copy; 2025 All Rights Reserved
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="text-gray-500 text-sm">Follow Us On</span>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Instagram size={16} />
              </a>
            </div>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 text-gray-400 hover:text-white flex items-center gap-2 text-sm transition-colors"
          >
            Back to Top <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
