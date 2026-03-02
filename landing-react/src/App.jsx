import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      if (import.meta.env.DEV) {
        await new Promise((r) => setTimeout(r, 500))
        setStatus('success')
        setEmail('')
        return
      }
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email || undefined, source: 'landing-react' }),
      })
      await res.json()
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="landing">
      <header className="hero">
        <h1>Stan</h1>
        <p className="tagline">첫출발, 함께할 준비 되었나요?</p>
      </header>

      <section className="cta-section">
        <form onSubmit={handleSubmit} className="cta-form">
          <input
            type="email"
            placeholder="이메일 (선택)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            aria-label="이메일"
          />
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? '등록 중…' : '출시 알림 받기'}
          </button>
        </form>
        {status === 'success' && <p className="message success">등록되었습니다.</p>}
        {status === 'error' && <p className="message error">잠시 후 다시 시도해 주세요.</p>}
      </section>

      <footer className="footer">
        <a href="https://www.instagram.com/stan_assistant" target="_blank" rel="noopener noreferrer" aria-label="인스타그램">
          Instagram
        </a>
      </footer>
    </div>
  )
}

export default App
