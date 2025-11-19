
import React from 'react';
import Hero from './Hero';
import StatsSection from './StatsSection';
import Services from './Services';
import EngagementModels from './EngagementModels';
import Process from './Process';
import Portfolio from './Portfolio';
import Testimonials from './Testimonials';
import Contact from './Contact';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <StatsSection />
      <Services />
      <EngagementModels />
      <Process />
      <Portfolio />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;
