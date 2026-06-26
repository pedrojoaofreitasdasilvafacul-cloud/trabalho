import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import './Testimonials.css';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk7gkNsCaR-Bj8WGWFlmYgYEtW38ehTO9sSkB93uws7w&s=10',
      name: 'Carlos Mendes',
      role: 'Motorista Autônomo',
      stars: 5,
      testimony: 'Atendimento rápido e pneus de excelente qualidade. Recomendo.'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_m0e2PfiEggV443KjusiFlMCZuvrpxN6TljRCf1WDpg&s=10',
      name: 'Roberto Silva',
      role: 'Transportadora Sul',
      stars: 5,
      testimony: 'Melhor custo-benefício para manutenção da nossa frota.'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLoCMOCePTaHGBEF7mqck1sFCTsQhXN2K8jxvBPNc6eg&s=10',
      name: 'Marcos Oliveira',
      role: 'Caminhoneiro',
      stars: 4,
      testimony: 'Equipe muito profissional e serviço executado com rapidez.'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTxoJOzDhj-8nkfEfAibh9ZBeMDnUplrTgTBnScLo39A&s=10',
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
            ◀
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
            ▶
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