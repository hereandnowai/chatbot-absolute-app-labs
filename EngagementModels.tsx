
import React from 'react';

const EngagementModels: React.FC = () => {
  return (
    <section className="py-20 bg-bgGray">
      <div className="max-w-[1200px] mx-auto px-5">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-textDark mb-12 text-center">Flexible Engagement Models</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-card border-l-4 border-primary hover:-translate-y-1 transition-transform duration-300">
            <h3 className="font-heading text-xl font-bold text-textDark mb-4">Well Researched Solutions</h3>
            <p className="text-textLight leading-relaxed">Avoid any surprises. This approach involved a deep discovery and scoping which ensures that the budget and delivery are just what you expect.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-card border-l-4 border-primary hover:-translate-y-1 transition-transform duration-300">
            <h3 className="font-heading text-xl font-bold text-textDark mb-4">Pay-as-you-go approach</h3>
            <p className="text-textLight leading-relaxed">You know what you want? And you just need someone who can get it done for you. This approach is just for you and you pay for what you get.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-card border-l-4 border-primary hover:-translate-y-1 transition-transform duration-300">
            <h3 className="font-heading text-xl font-bold text-textDark mb-4">Customer-centric approach</h3>
            <p className="text-textLight leading-relaxed">Want a well-researched solution and the flexibility of pay-as-you-go? This is a sandwich solution where we consult and implement per your needs with zero surprises.</p>
          </div>
        </div>

        <div className="text-center mt-16">
          <span className="text-2xl font-serif font-bold text-gray-400 tracking-widest">FORTUNE</span>
        </div>
      </div>
    </section>
  );
};

export default EngagementModels;
