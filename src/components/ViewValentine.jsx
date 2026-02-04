import React, { useEffect, useState } from 'react'
import { ref, get } from 'firebase/database'
import { db } from '../firebase'

export default function ViewValentine({ valentineId, onBack }) {
  const [valentine, setValentine] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [answered, setAnswered] = useState(false)

  useEffect(() => {
    async function fetchValentine() {
      try {
        const valentineRef = ref(db, `valentines/${valentineId}`)
        const snapshot = await get(valentineRef)
        if (snapshot.exists()) {
          setValentine(snapshot.val())
        } else {
          setError('Valentine not found')
        }
      } catch (err) {
        setError('Failed to load valentine: ' + err.message)
      }
      setLoading(false)
    }

    if (valentineId) {
      fetchValentine()
    }
  }, [valentineId])

  if (loading) {
    return (
      <main className="card">
        <h2>Loading valentine... 💌</h2>
      </main>
    )
  }

  if (error) {
    return (
      <main className="card">
        <h2>❌ {error}</h2>
        <button className="btn yes" onClick={onBack} style={{marginTop: '20px'}}>
          Create a Valentine
        </button>
      </main>
    )
  }

  if (!valentine) {
    return (
      <main className="card">
        <h2>Valentine not found</h2>
      </main>
    )
  }

  return (
    <main className="card">
      <h1 className="title">{valentine.name} Says:</h1>

      {valentine.imageUrl && (
        <img className="gif" src={valentine.imageUrl} alt="Valentine" />
      )}

      <div className="valentine-content">
        <p className="day-badge">📅 {valentine.day.toUpperCase()}</p>
        <p className="valentine-message">{valentine.message}</p>
      </div>

      {!answered && (
        <div className="content-wrapper" style={{marginTop: '24px'}}>
          <button
            className="btn yes"
            onClick={() => setAnswered(true)}
            style={{transform: 'scale(1.2)'}}
          >
            Yes! 💘
          </button>
        </div>
      )}

      {answered && (
        <div className="celebration-message">
          <p>🎉 Yay! You said YES! 🎉</p>
          <p className="celebration-emoji">💕✨🎊💖🌹✨💕</p>
        </div>
      )}

      <button className="btn no" onClick={onBack} style={{marginTop: '20px'}}>
        Back
      </button>
    </main>
  )
}
