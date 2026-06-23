import React, { useState } from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMessage('Ì≥§ Enviando mensagem...');

    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const response = await fetch('/', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem');
      }

      setStatus('success');
      setStatusMessage('‚úÖ Mensagem enviada com sucesso!');
      form.reset();
    } catch (error) {
      console.error('Erro:', error);
      setStatus('error');
      setStatusMessage('‚ùå Erro ao enviar mensagem. Tente novamente.');
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">
          Entre em <span>contato</span>
        </h2>
        <p className="section-subtitle">
          Envie sua mensagem que responderemos em breve
        </p>

        <div className="contact-simple">
          <form 
            onSubmit={handleSubmit} 
            className="contact-form-simple"
            data-netlify="true"
            name="contact"
            method="POST"
          >
            <input type="hidden" name="form-name" value="contact" />
            
            <div className="form-group">
              <label htmlFor="email">Seu melhor e-mail *</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                placeholder="seu@email.com" 
                required 
                disabled={status === 'loading'}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Motivo do contato *</label>
              <textarea 
                id="message" 
                name="message"
                rows={4} 
                placeholder="Ex: Gostei muito do produto X, poderia me enviar um or√ßamento?" 
                required 
                disabled={status === 'loading'}
              />
            </div>
            
            {statusMessage && (
              <div className={`status-message ${status}`}>
                {statusMessage}
              </div>
            )}
            
            <button 
              type="submit" 
              className="btn-submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? '‚è≥ Enviando...' : 'Ì≥® Enviar'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
