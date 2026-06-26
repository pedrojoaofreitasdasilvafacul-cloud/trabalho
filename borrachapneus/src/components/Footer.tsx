import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>🚛 BORRACHA <span>STORE</span></h3>
            <p>"Seu caminhão não pode parar."</p>
          </div>

          <div className="footer-links">
            <h4>Navegação</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Serviços</a></li>
              <li><a href="#testimonials">Depoimentos</a></li>
              <li><a href="#plans">Planos</a></li>
              <li><a href="#contact">Contato</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contato</h4>
            <p><strong>Telefone:</strong> (45) 99999-9999</p>
            <p><strong>WhatsApp:</strong> (45) 99999-9999</p>
            <p><strong>Email:</strong> contato@borrachastore.com.br</p>
            <p><strong>Endereço:</strong> Santa Teresa do Oeste - PR</p>
          </div>

          <div className="footer-social">
            <h4>Redes Sociais</h4>
            <div className="social-icons">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="YouTube">▶️</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} Borracha Store - Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;