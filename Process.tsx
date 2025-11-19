import React from 'react';
import { ProcessStep } from '../types';

const processData: ProcessStep[] = [
  {
    id: 1,
    title: 'Discovery & Planning',
    description: 'We analyze your requirements, define goals, and create detailed project specifications to ensure we build exactly what you need.'
  },
  {
    id: 2,
    title: 'Design & Prototyping',
    description: 'Our designers create intuitive wireframes and high-fidelity prototypes, allowing you to visualize the product before coding begins.'
  },
  {
    id: 3,
    title: 'Agile Development',
    description: 'We follow agile methodology with regular sprints and updates, ensuring transparency and flexibility throughout the coding phase.'
  },
  {
    id: 4,
    title: 'Testing & Deployment',
    description: 'Rigorous QA testing ensures a bug-free experience. We then handle the smooth deployment of your solution to production servers.'
  }
];

const Process: React.FC = () => {
  return (
    <section id="process" className="py-20 bg-bgGray">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-textDark mb-4">Our Process</h2>
          <p className="text-textLight max-w-2xl mx-auto text-lg">
            A transparent and efficient development methodology designed to deliver high-quality results on time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop only) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>

          {processData.map((step) => (
            <div key={step.id} className="relative pt-8 text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 border-4 border-white shadow-lg z-10 relative">
                {step.id}
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
                <h3 className="font-heading text-xl font-semibold text-textDark mb-3">{step.title}</h3>
                <p className="text-textLight text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;