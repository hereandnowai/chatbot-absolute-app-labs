
import React from 'react';

const StatsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-textDark mb-6">Excellence In Every AI Solution</h2>
          <p className="text-textLight text-lg leading-relaxed max-w-4xl">
            Our approach blends technical precision with user-centric design. Every solution is thoughtfully engineered to integrate seamlessly into your workflows, accelerate adoption, and deliver sustained business value. We don't just deliver systems, we build intelligent capabilities that scale with your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-bgGray p-8 rounded-xl text-center hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <p className="text-textLight font-medium">Years Businesses in Chennai, India</p>
          </div>
          <div className="bg-bgGray p-8 rounded-xl text-center hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <p className="text-textLight font-medium">Clients Across the Globe</p>
          </div>
          <div className="bg-bgGray p-8 rounded-xl text-center hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-primary mb-2">500</div>
            <p className="text-textLight font-medium">Trusted Service Partner</p>
          </div>
          <div className="bg-bgGray p-8 rounded-xl text-center hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-primary mb-2">30+</div>
            <p className="text-textLight font-medium">People team Serving you dedicatedly</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
