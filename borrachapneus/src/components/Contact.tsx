import React, { useState } from 'react'
import './Contact.css'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setStatusMessage('📤 Enviando mensagem...')

    try {
      const response = await fetch(
        'https://shiny-brioche-95b951.netlify.app/netlify/functions/send-email',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            message: formData.message,
          }),
        }
      )

      console.log('📥 Status:', response.status)

      if (!response.ok) {
        throw new Error(`Erro ${response.status}`)
      }

      const data = await response.json()
      console.log('📦 Dados:', data)

      setStatus('success')
      setStatusMessage('✅ Mensagem enviada com sucesso!')
      setFormData({ email: '', message: '' })
    } catch (error) {
      console.error('❌ Erro:', error)
      setStatus('error')
      setStatusMessage('❌ Erro ao enviar mensagem. Tente novamente.')
    }
  }

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
          <form onSubmit={handleSubmit} className="contact-form-simple">
            <div className="form-group">
              <label htmlFor="email">Seu melhor e-mail *</label>
              <input
                type="email"
                id="email"
                placeholder="seu@email.com"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={status === 'loading'}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Motivo do contato *</label>
              <textarea
                id="message"
                rows={4}
                placeholder="Ex: Gostei muito do produto X, poderia me enviar um orçamento?"
                required
                value={formData.message}
                onChange={handleChange}
                disabled={status === 'loading'}
              />
            </div>

            {statusMessage && (
              <div className={`status-message ${status}`}>{statusMessage}</div>
            )}

            <button
              type="submit"
              className="btn-submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? '⏳ Enviando...' : '📨 Enviar'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
