
import React, { useState } from 'react';
import { Check, Loader2, ChevronRight, ChevronLeft } from 'lucide-react';

const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';

interface StartProjectPageProps {
  onSuccess: () => void;
}

const StartProjectPage: React.FC<StartProjectPageProps> = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    services: [] as string[],
    timeline: '',
    budget: '',
    fullName: '',
    email: '',
    phone: '',
    company: ''
  });

  const servicesList = [
    { id: 'mobile-app', label: 'Mobile App Development' },
    { id: 'web-development', label: 'Web Development' },
    { id: 'ai-ml', label: 'AI & ML Solutions' },
    { id: 'blockchain', label: 'Blockchain' },
    { id: 'devops', label: 'DevOps & Cloud' },
    { id: 'ui-ux', label: 'UI/UX Design' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter(s => s !== id)
        : [...prev.services, id]
    }));
  };

  const validateStep = (currentStep: number) => {
    if (currentStep === 1) {
      return formData.projectName && formData.projectDescription;
    }
    if (currentStep === 2) {
      return formData.services.length > 0 && formData.timeline && formData.budget;
    }
    if (currentStep === 3) {
      return formData.fullName && formData.email;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    
    setLoading(true);
    setError('');

    try {
      // Simulate API call or use Fetch
      if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Project Submitted:', formData);
      } else {
        const formBody = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formBody.append(key, Array.isArray(value) ? value.join(', ') : value);
        });
        await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: formBody });
      }
      onSuccess();
    } catch (err) {
      console.error('Submission error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary to-dark py-16 text-center text-white px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">Start Your Project</h1>
          <p className="text-blue-100 text-lg">Tell us about your vision and we'll help you build it.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-12">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2"></div>
          <div className={`flex flex-col items-center bg-white px-2 z-10`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 border-2 transition-colors ${step >= 1 ? 'bg-primary border-primary text-white' : 'bg-white border-gray-300 text-gray-400'}`}>1</div>
            <span className={`text-xs font-medium ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>Project Info</span>
          </div>
          <div className={`flex flex-col items-center bg-white px-2 z-10`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 border-2 transition-colors ${step >= 2 ? 'bg-primary border-primary text-white' : 'bg-white border-gray-300 text-gray-400'}`}>2</div>
            <span className={`text-xs font-medium ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>Details</span>
          </div>
          <div className={`flex flex-col items-center bg-white px-2 z-10`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 border-2 transition-colors ${step >= 3 ? 'bg-primary border-primary text-white' : 'bg-white border-gray-300 text-gray-400'}`}>3</div>
            <span className={`text-xs font-medium ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>Contact</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-100">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-heading font-bold text-textDark mb-6">Project Information</h2>
                <div>
                  <label htmlFor="projectName" className="block text-sm font-medium text-textDark mb-2">Project Name *</label>
                  <input
                    type="text"
                    id="projectName"
                    name="projectName"
                    required
                    value={formData.projectName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="e.g. E-Commerce Mobile App"
                  />
                </div>
                <div>
                  <label htmlFor="projectDescription" className="block text-sm font-medium text-textDark mb-2">Project Description *</label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    rows={6}
                    required
                    value={formData.projectDescription}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-y"
                    placeholder="Describe your project goals, key features, and target audience..."
                  ></textarea>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-fadeIn">
                <h2 className="text-2xl font-heading font-bold text-textDark mb-6">Services & Scope</h2>
                <div>
                  <label className="block text-sm font-medium text-textDark mb-4">Services Needed *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servicesList.map(service => (
                      <div 
                        key={service.id}
                        onClick={() => handleServiceToggle(service.id)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex items-center gap-3 ${formData.services.includes(service.id) ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-primary/50'}`}
                      >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.services.includes(service.id) ? 'bg-primary border-primary' : 'border-gray-300 bg-white'}`}>
                          {formData.services.includes(service.id) && <Check size={14} className="text-white" />}
                        </div>
                        <span className={`font-medium ${formData.services.includes(service.id) ? 'text-primary' : 'text-textDark'}`}>{service.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-textDark mb-2">Preferred Timeline *</label>
                    <select
                      id="timeline"
                      name="timeline"
                      required
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
                    >
                      <option value="">Select Timeline</option>
                      <option value="1-3 months">1-3 Months</option>
                      <option value="3-6 months">3-6 Months</option>
                      <option value="6-12 months">6-12 Months</option>
                      <option value="12+ months">12+ Months</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-textDark mb-2">Project Budget *</label>
                    <select
                      id="budget"
                      name="budget"
                      required
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
                    >
                      <option value="">Select Budget</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k+">$100,000+</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-heading font-bold text-textDark mb-6">Contact Details</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-textDark mb-2">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-textDark mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-textDark mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-textDark mb-2">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Summary Preview */}
                <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <h3 className="font-semibold text-primary mb-3">Project Summary</h3>
                  <ul className="text-sm text-textDark space-y-2">
                    <li><strong>Project:</strong> {formData.projectName}</li>
                    <li><strong>Services:</strong> {formData.services.map(s => servicesList.find(i => i.id === s)?.label).join(', ')}</li>
                    <li><strong>Timeline:</strong> {formData.timeline}</li>
                    <li><strong>Budget:</strong> {formData.budget}</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 rounded-lg font-medium text-textDark hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <ChevronLeft size={20} />
                  Back
                </button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-dark transition-colors flex items-center gap-2 shadow-lg shadow-primary/25"
                >
                  Next Step
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-dark transition-colors flex items-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Project
                      <Check size={20} />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StartProjectPage;
