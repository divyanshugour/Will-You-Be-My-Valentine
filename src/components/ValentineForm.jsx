import React, { useState } from 'react'
import { ref, set } from 'firebase/database'
import { db } from '../firebase'

export default function ValentineForm({ onLinkGenerated }) {
  const [formData, setFormData] = useState({
    name: '',
    day: 'roseday',
    imageUrl: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const days = [
    { value: 'roseday', label: '🌹 Rose Day', color: 'roseday' },
    { value: 'proposeday', label: '🌷 Propose Day', color: 'proposeday' },
    { value: 'chocolateday', label: '🍫 Chocolate Day', color: 'chocolateday' },
    { value: 'teddyday', label: '🧸 Teddy Day', color: 'teddyday' },
    { value: 'promiseday', label: '🤝 Promise Day', color: 'promiseday' },
    { value: 'hugday', label: '🤗 Hug Day', color: 'hugday' },
    { value: 'kissday', label: '💋 Kiss Day', color: 'kissday' },
    { value: 'valentinesday', label: '💖 Valentine\'s Day', color: 'valentinesday' }
  ]

  function generateId() {
    return 'val_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!formData.name.trim() || !formData.message.trim()) {
      setError('Name and Message are required')
      setLoading(false)
      return
    }

    try {
      const valentineId = generateId()
      const valentineRef = ref(db, `valentines/${valentineId}`)
      await set(valentineRef, {
        ...formData,
        createdAt: new Date().toISOString()
      })
      onLinkGenerated(valentineId)
    } catch (err) {
      setError('Failed to create valentine: ' + err.message)
    }
    setLoading(false)
  }

  return (
    <form className="valentine-form" onSubmit={handleSubmit}>
      <h2>Create Your Valentine 💌</h2>

      <div className="form-group">
        <label>Your Love Name</label>
        <input
          type="text"
          placeholder="Enter your love ❤ name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Day</label>
        <select
          value={formData.day}
          onChange={(e) => setFormData({ ...formData, day: e.target.value })}
        >
          {days.map(d => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Image/GIF URL (optional)</label>
        <input
          type="url"
          placeholder="Paste image or GIF URL"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Personal Message</label>
        <textarea
          placeholder="Write your romantic message..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={5}
          required
        />
      </div>

      {error && <div className="error-msg">{error}</div>}

      <button type="submit" className="btn yes" disabled={loading}>
        {loading ? 'Creating...' : 'Generate Link 💌'}
      </button>
      
      <footer style={{marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.2)', textAlign: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.8)'}}>
        Made with ❤ by <a href="https://www.instagram.com/y0ur_wellwisher" target="_blank" rel="noopener noreferrer" style={{color: 'white', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px'}}>
          <svg style={{width: '18px', height: '18px', verticalAlign: 'middle'}} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          y0ur_wellwisher
        </a>
      </footer>
    </form>
  )
}
