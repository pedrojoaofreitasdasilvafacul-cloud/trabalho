import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Pneus de Caminhão com <span>Máxima Segurança</span> e Durabilidade
          </h1>
          <p className="hero-subtitle">
            Venda, montagem e manutenção especializada para caminhões de todos os portes.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">
              Solicitar Orçamento
            </a>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-image-placeholder">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnuPDZFJzYbR_CyahY3FJgAQHE9RaCruc-JmNEnD5bCQ&s=10" 
              alt="Caminhão moderno com pneus em destaque" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;