import React from 'react';
import './Solutions.css';

interface SolutionCardProps {
  icon: string;
  title: string;
  description: string;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ icon, title, description }) => {
  return (
    <div className="solution-card">
      <div className="solution-icon">
        <img src={`/src/assets/images/services/${icon}`} alt={title} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const Solutions: React.FC = () => {
  const solutions = [
    {
      icon: 'tire.svg',
      title: 'Venda de Pneus',
      description: 'Trabalhamos com as principais marcas do mercado para garantir segurança e desempenho nas estradas.'
    },
    {
      icon: 'mounting.svg',
      title: 'Montagem Especializada',
      description: 'Instalação profissional realizada por técnicos qualificados.'
    },
    {
      icon: 'balancing.svg',
      title: 'Balanceamento',
      description: 'Maior estabilidade, economia e vida útil dos pneus.'
    },
    {
      icon: 'alignment.svg',
      title: 'Alinhamento',
      description: 'Correção precisa para melhor desempenho e menor desgaste.'
    },
    {
      icon: 'repair.svg',
      title: 'Reparo e Vulcanização',
      description: 'Recuperação profissional para aumentar a durabilidade dos pneus.'
    },
    {
      icon: 'fleet.svg',
      title: 'Atendimento para Frotas',
      description: 'Planos especiais para empresas e transportadoras.'
    }
  ];

  return (
    <section id="services" className="solutions">
      <div className="container">
        <h2 className="section-title">
          Nossas <span>Soluções</span>
        </h2>
        <p className="section-subtitle">
          Serviços especializados para manter sua frota em movimento
        </p>
        <div className="solutions-grid">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              icon={solution.icon}
              title={solution.title}
              description={solution.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
