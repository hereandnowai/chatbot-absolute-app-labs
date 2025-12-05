import React from 'react';
import { Smartphone, Globe, BrainCircuit, Blocks, Cloud, Palette } from 'lucide-react';
import { ServiceItem } from '../types';

const servicesData: ServiceItem[] = [
  {
    id: 1,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android with stunning UI/UX design and high performance.',
    icon: Smartphone
  },
  {
    id: 2,
    title: 'Web Development',
    description: 'Responsive, scalable web applications and websites built with modern frameworks like React, Next.js, and Node.js.',
    icon: Globe
  },
  {
    id: 3,
    title: 'AI & ML Solutions',
    description: 'Intelligent applications powered by artificial intelligence and machine learning algorithms to automate your business.',
    icon: BrainCircuit
  },
  {
    id: 4,
    title: 'Blockchain Development',
    description: 'Secure and decentralized blockchain solutions, smart contracts, and DApps tailored for various industries.',
    icon: Blocks
  },
  {
    id: 5,
    title: 'DevOps & Cloud',
    description: 'Streamlined CI/CD pipelines and robust cloud infrastructure setup on AWS, Azure, or Google Cloud.',
    icon: Cloud
  },
  {
    id: 6,
    title: 'UI/UX Design',
    description: 'User-centered design approaches that create engaging, intuitive, and accessible digital experiences.',
    icon: Palette
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-textDark mb-4">Our Services</h2>
          <p className="text-textLight max-w-2xl mx-auto text-lg">
            Comprehensive IT solutions tailored to your business needs, helping you stay ahead in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div 
              key={service.id} 
              className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <service.icon className="text-primary group-hover:text-white transition-colors duration-300" size={28} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-textDark mb-3">{service.title}</h3>
              <p className="text-textLight leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;