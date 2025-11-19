import React from 'react';
import { ExternalLink } from 'lucide-react';
import { ProjectItem } from '../types';

const projectsData: ProjectItem[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    image: 'https://picsum.photos/seed/ecommerce/800/600'
  },
  {
    id: 2,
    title: 'FitTrack Mobile App',
    category: 'Mobile App',
    image: 'https://picsum.photos/seed/fitness/800/600'
  },
  {
    id: 3,
    title: 'FinTech Dashboard',
    category: 'SaaS Product',
    image: 'https://picsum.photos/seed/finance/800/600'
  }
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-textDark mb-4">Our Portfolio</h2>
            <p className="text-textLight text-lg">
              Showcasing our successful projects and digital solutions crafted for global clients.
            </p>
          </div>
          <button className="text-primary font-medium hover:text-dark flex items-center gap-2 group">
            View All Projects <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <div key={project.id} className="group rounded-xl overflow-hidden shadow-card bg-white border border-gray-100">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-medium bg-primary px-3 py-1 rounded-full text-sm">View Case Study</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-primary text-sm font-medium mb-2">{project.category}</p>
                <h3 className="font-heading text-xl font-bold text-textDark group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;