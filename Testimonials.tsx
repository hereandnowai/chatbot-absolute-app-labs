import React from 'react';
import { Quote } from 'lucide-react';
import { TestimonialItem } from '../types';

const testimonialData: TestimonialItem[] = [
  {
    id: 1,
    content: "Absolute App Labs delivered exceptional results. Their team was professional, communicative, and delivered ahead of schedule. The app works flawlessly.",
    author: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc."
  },
  {
    id: 2,
    content: "The mobile app they developed exceeded our expectations. User engagement has increased by 45% since launch. Highly recommended partner.",
    author: "Michael Chen",
    role: "Product Manager",
    company: "InnovateCo"
  },
  {
    id: 3,
    content: "Outstanding service and technical expertise. They transformed our complex requirements into a seamless solution that our staff loves using.",
    author: "Emily Rodriguez",
    role: "CTO",
    company: "Global Solutions"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-bgGray">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-textDark mb-4">Client Testimonials</h2>
          <p className="text-textLight max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Here's what our partners have to say about working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialData.map((item) => (
            <div key={item.id} className="bg-white p-8 rounded-2xl shadow-card border border-gray-100 relative">
              <Quote className="text-blue-100 absolute top-6 right-6" size={48} />
              <p className="text-textDark italic mb-8 relative z-10">"{item.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-light rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-textDark">{item.author}</h4>
                  <p className="text-sm text-textLight">{item.role}, {item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;