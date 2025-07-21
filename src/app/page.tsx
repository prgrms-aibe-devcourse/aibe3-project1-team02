
'use client';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import PopularDestinations from '../components/PopularDestinations';
import Features from '../components/Features';
import TravelPlanning from '../components/TravelPlanning';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <PopularDestinations />
      <Features />
      <TravelPlanning />
      <Footer />
    </div>
  );
}
