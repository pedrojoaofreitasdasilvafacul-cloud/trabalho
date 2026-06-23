import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import './Testimonials.css';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      image: 'carlos-mendes.jpg',
      name: 'Carlos Mendes',
      role: 'Motorista Autônomo',
      stars: 5,
      testimony: 'Atendimento rápido e pneus de excelente qualidade. Recomendo.'
    },
    {
      image: 'roberto-silva.jpg',
      name: 'Roberto Silva',
      role: 'Transportadora Sul',
      stars: 5,
      testimony: 'Melhor custo-benefício para manutenção da nossa frota.'
    },
    {
      image: 'marcos-oliveira.jpg',
      name: 'Marcos Oliveira',
      role: 'Caminhoneiro',
      stars: 4,
      testimony: 'Equipe muito profissional e serviço executado com rapidez.'
    },
    {
      image: 'fernando-costa.jpg',
      name: 'Fernando Costa',
      role: 'Logística Nacional',
      stars: 5,
      testimony: 'Suporte excelente e produtos de alta qualidade.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <h2 className="section-title">
          O que nossos <span>clientes</span> dizem
        </h2>
        <p className="section-subtitle">
          Depoimentos reais de quem confia em nosso trabalho
        </p>

        <div className="testimonials-carousel">
          <button className="carousel-btn prev" onClick={prevSlide} aria-label="Anterior">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>

          <div className="carousel-track">
            <div 
              className="carousel-slides"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="carousel-slide">
                  <TestimonialCard
                    image={testimonial.image}
                    name={testimonial.name}
                    role={testimonial.role}
                    stars={testimonial.stars}
                    testimony={testimonial.testimony}
                  />
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-btn next" onClick={nextSlide} aria-label="Próximo">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        </div>

        <div className="carousel-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para depoimento ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
