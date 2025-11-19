
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE'; // Replace with your deployed script URL

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    budget: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Simulate API call if URL is placeholder, otherwise fetch
      if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
        console.log('Form Data:', formData);
      } else {
        const formBody = new FormData();
        Object.entries(formData).forEach(([key, value]) => formBody.append(key, value));
        await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: formBody });
      }
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '', budget: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 py-20 text-center text-white px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question about our services, pricing, or want to discuss a project, our team is ready to answer all your questions.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 py-16">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-card border border-gray-100 text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin size={32} />
            </div>
            <h3 className="font-heading text-xl font-bold text-textDark mb-2">Visit Our Office</h3>
            <p className="text-textLight">35/22, AI Block 4th Street,<br/>Shanthi Colony, Anna Nagar,<br/>Chennai – 600040</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-card border border-gray-100 text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone size={32} />
            </div>
            <h3 className="font-heading text-xl font-bold text-textDark mb-2">Call Us</h3>
            <p className="text-textLight">+91 97907 54439<br/>Mon - Fri, 9am - 6pm</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-card border border-gray-100 text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail size={32} />
            </div>
            <h3 className="font-heading text-xl font-bold text-textDark mb-2">Email Us</h3>
            <p className="text-textLight">info@absoluteapplabs.com<br/>We reply within 24 hours</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-textDark mb-8 text-center">Send us a Message</h2>

          {status === 'success' && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
              There was an error sending your message. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-textDark mb-2">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-textDark mb-2">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-textDark mb-2">Message *</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-y"
              ></textarea>
            </div>
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-textDark mb-2">Project Budget</label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="">Select Budget Range</option>
                <option value="5k-10k">$5,000 - $10,000</option>
                <option value="10k-25k">$10,000 - $25,000</option>
                <option value="25k-50k">$25,000 - $50,000</option>
                <option value="50k+">$50,000+</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-primary text-white py-4 rounded-lg font-medium hover:bg-dark transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Sending Message...
                </>
              ) : (
                <>
                  Send Message
                  <Send size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
