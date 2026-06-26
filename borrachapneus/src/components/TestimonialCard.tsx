import React from 'react';
import './TestimonialCard.css';

interface TestimonialCardProps {
  image: string;
  name: string;
  role: string;
  stars: number;
  testimony: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  image,
  name,
  role,
  stars,
  testimony
}) => {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < stars ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="testimonial-card">
      <div className="testimonial-header">
        <div className="testimonial-avatar">
          <img src={image} alt={name} />
        </div>
        <div className="testimonial-info">
          <h4>{name}</h4>
          <p>{role}</p>
          <div className="testimonial-stars">
            {renderStars()}
          </div>
        </div>
      </div>
      <div className="testimonial-body">
        <div className="testimonial-quote">"</div>
        <p>{testimony}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;