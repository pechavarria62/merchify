import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import Categories from './Categories';
import LatestArrivals from './LatestArrivals';
import Footer from './Footer';

const Home: React.FC = () => {
  return (
    <div className="font-sans text-gray-800">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <HeroSection />
        <Categories />
        <LatestArrivals />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
