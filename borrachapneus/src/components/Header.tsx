import React, { useState, useEffect } from 'react';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <div className="logo" onClick={() => scrollToSection('home')}>
          <span className="logo-text">BORRACHA <span>STORE</span></span>
        </div>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Menu">
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </button>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a href="#services" onClick={() => scrollToSection('services')}>Serviços</a></li>
            <li><a href="#testimonials" onClick={() => scrollToSection('testimonials')}>Depoimentos</a></li>
            <li><a href="#plans" onClick={() => scrollToSection('plans')}>Planos</a></li>
            <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contato</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;