import React from 'react';
import './Plans.css';

interface PlanCardProps {
  title: string;
  price: string;
  benefits: string[];
  isHighlighted?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, price, benefits, isHighlighted = false }) => {
  return (
    <div className={`plan-card ${isHighlighted ? 'highlighted' : ''}`}>
      {isHighlighted && <div className="plan-badge">Mais Popular</div>}
      <h3>{title}</h3>
      <div className="plan-price">
        <span className="price">{price}</span>
        {price !== 'Grátis' && price !== 'Sob Consulta' && (
          <span className="period">/mês</span>
        )}
      </div>
      <ul className="plan-benefits">
        {benefits.map((benefit, index) => (
          <li key={index}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            {benefit}
          </li>
        ))}
      </ul>
      <a href="#contact" className="plan-btn">
        {price === 'Grátis' ? 'Começar Agora' : 'Assinar Plano'}
      </a>
    </div>
  );
};

const Plans: React.FC = () => {
  const plans = [
    {
      title: 'Plano Básico',
      price: 'Grátis',
      benefits: [
        'Inspeção visual',
        'Calibragem',
        'Orçamento gratuito'
      ],
      isHighlighted: false
    },
    {
      title: 'Plano Profissional',
      price: 'R$ 199,90',
      benefits: [
        'Balanceamento',
        'Montagem',
        'Revisão completa'
      ],
      isHighlighted: true
    },
    {
      title: 'Plano Frotista',
      price: 'Sob Consulta',
      benefits: [
        'Atendimento prioritário',
        'Gestão de pneus',
        'Relatórios técnicos',
        'Suporte especializado'
      ],
      isHighlighted: false
    }
  ];

  return (
    <section id="plans" className="plans">
      <div className="container">
        <h2 className="section-title">
          Planos para <span>sua frota</span>
        </h2>
        <p className="section-subtitle">
          Escolha o plano ideal para manter seus caminhões sempre em movimento
        </p>

        <div className="plans-grid">
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              title={plan.title}
              price={plan.price}
              benefits={plan.benefits}
              isHighlighted={plan.isHighlighted}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;
