
import React from 'react';
import { Check, ArrowLeft, Mail } from 'lucide-react';

interface ProjectSuccessPageProps {
  onNavigate: (view: string) => void;
}

const ProjectSuccessPage: React.FC<ProjectSuccessPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 py-20 text-center text-white px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Project Submitted Successfully!</h1>
          <p className="text-green-100 text-lg md:text-xl">
            Thank you for choosing Absolute App Labs. We've received your details.
          </p>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-5 py-16 text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
          <Check size={48} strokeWidth={3} />
        </div>

        <h2 className="font-heading text-3xl font-bold text-textDark mb-6">We've Received Your Project Details</h2>
        <p className="text-textLight text-lg mb-12 leading-relaxed max-w-2xl mx-auto">
          Our team will review your project requirements and get back to you within 24 hours with a preliminary proposal or to schedule a discovery call.
        </p>

        <div className="bg-gray-50 p-8 rounded-2xl text-left border border-gray-100 max-w-2xl mx-auto mb-12">
          <h3 className="font-heading text-xl font-bold text-primary mb-6 text-center">What Happens Next?</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-primary flex-shrink-0 flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-semibold text-textDark">Initial Review</h4>
                <p className="text-sm text-textLight">Our technical leads analyze your requirements and scope.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-primary flex-shrink-0 flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold text-textDark">Expert Assignment</h4>
                <p className="text-sm text-textLight">We identify the right specialists for your specific needs.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-primary flex-shrink-0 flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold text-textDark">Discovery Call</h4>
                <p className="text-sm text-textLight">We'll reach out to discuss the finer details and next steps.</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-textDark mb-8">
          <strong>Need immediate assistance?</strong><br/>
          <span className="text-textLight">Call us at +1 (555) 123-4567 or email hello@absoluteapplabs.com</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('home')}
            className="bg-primary text-white px-8 py-3.5 rounded-lg font-medium hover:bg-dark transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="border-2 border-primary text-primary px-8 py-3.5 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
          >
            <Mail size={18} />
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectSuccessPage;
