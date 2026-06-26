import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Solutions from './components/Solutions';
import Testimonials from './components/Testimonials';
import Plans from './components/Plans';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Solutions />
        <Testimonials />
        <Plans />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;