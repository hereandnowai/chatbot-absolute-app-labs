
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, target: string, hash?: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (target === 'home') {
      onNavigate('home');
      if (hash) {
        // Allow time for view to render before scrolling
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

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'bg-white py-5'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 flex justify-between items-center">
        <a 
          href="#" 
          onClick={(e) => handleNavClick(e, 'home')}
          className="text-2xl font-heading font-bold text-primary"
        >
          Absolute App Labs
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-8">
            <a href="#services" onClick={(e) => handleNavClick(e, 'home', '#services')} className="font-medium text-textDark hover:text-primary transition-colors">Services</a>
            <a href="#case-study" onClick={(e) => handleNavClick(e, 'home', '#portfolio')} className="font-medium text-textDark hover:text-primary transition-colors">Case Study</a>
            <a href="#company" onClick={(e) => handleNavClick(e, 'home', '#contact')} className="font-medium text-textDark hover:text-primary transition-colors">Company</a>
            <a href="#blog" onClick={(e) => handleNavClick(e, 'home')} className="font-medium text-textDark hover:text-primary transition-colors">Blog</a>
          </nav>
          <button 
            onClick={(e) => handleNavClick(e, 'start-project')}
            className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-dark transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/30"
          >
            Get a quote
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-textDark"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg h-screen">
          <div className="flex flex-col p-5 gap-4">
            <a href="#services" onClick={(e) => handleNavClick(e, 'home', '#services')} className="font-medium text-textDark py-2 hover:text-primary">Services</a>
            <a href="#case-study" onClick={(e) => handleNavClick(e, 'home', '#portfolio')} className="font-medium text-textDark py-2 hover:text-primary">Case Study</a>
            <a href="#company" onClick={(e) => handleNavClick(e, 'home', '#contact')} className="font-medium text-textDark py-2 hover:text-primary">Company</a>
            <a href="#blog" onClick={(e) => handleNavClick(e, 'home')} className="font-medium text-textDark py-2 hover:text-primary">Blog</a>
            <button 
              onClick={(e) => handleNavClick(e, 'start-project')}
              className="bg-primary text-white text-center py-3 rounded-lg font-medium mt-2"
            >
              Get a quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
