
import React from 'react';
import { ArrowRight, Code2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-32 pb-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-blue-100 text-primary font-medium rounded-full text-sm">
              🚀 Leading IT Solutions Provider
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-textDark leading-tight">
              You Bring The Vision. <span className="text-primary">We Bring The Expertise.</span>
            </h1>
            <p className="text-lg text-textLight max-w-lg leading-relaxed">
              We, Absolute App Labs, partner with you to turn ideas into market-ready products. From product strategy and user experience to full-stack development and AI integration, our experts build with precision, performance, and quality. You're a startup creating your first product or an enterprise modernizing complex systems, either way, we are the team you can trust to bring technology to life.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#portfolio" 
                className="bg-primary text-white px-8 py-3.5 rounded-lg font-medium hover:bg-dark transition-all flex items-center gap-2 shadow-lg shadow-primary/30"
              >
                View Our Work
                <ArrowRight size={18} />
              </a>
              <a 
                href="#contact" 
                className="border-2 border-primary text-primary px-8 py-3.5 rounded-lg font-medium hover:bg-primary hover:text-white transition-all"
              >
                Get Consultation
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-2xl blur-2xl opacity-30"></div>
            <div className="relative bg-white p-4 rounded-2xl shadow-xl border border-gray-100">
              <img 
                src="https://picsum.photos/seed/techwork/600/500" 
                alt="Digital Innovation" 
                className="rounded-xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-50 hidden lg:flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <Code2 size={24} />
                </div>
                <div>
                  <p className="font-bold text-textDark">Clean Code</p>
                  <p className="text-xs text-textLight">Industry Standards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
