import React, { useEffect, useRef, useState } from 'react'
import { ref, get } from 'firebase/database'
import { db } from '../firebase'

export default function ViewValentine({ valentineId }) {
  const [valentine, setValentine] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [answered, setAnswered] = useState(false)
  const [yesScale, setYesScale] = useState(1)
  const [noMsgIdx, setNoMsgIdx] = useState(0)
  const noBtnRef = useRef(null)
  const yesBtnRef = useRef(null)

  const noMessages = ['are you sure?', 'fir se soch lo', 'nahi nahi', 'sach mein?', 'pakka pakka?']

  const dayThemes = {
    roseday: { bg: 'linear-gradient(135deg, #ff9ac8 0%, #ff6ea1 100%)', emoji: '🌹', name: 'Rose Day' },
    proposeday: { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', emoji: '🌷', name: 'Propose Day' },
    chocolateday: { bg: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)', emoji: '🍫', name: 'Chocolate Day' },
    teddyday: { bg: 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)', emoji: '🧸', name: 'Teddy Day' },
    promiseday: { bg: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E72 100%)', emoji: '🤝', name: 'Promise Day' },
    hugday: { bg: 'linear-gradient(135deg, #FFD93D 0%, #FFA502 100%)', emoji: '🤗', name: 'Hug Day' },
    kissday: { bg: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)', emoji: '💋', name: 'Kiss Day' },
    valentinesday: { bg: 'linear-gradient(135deg, #ff9ac8 0%, #ff6ea1 100%)', emoji: '💖', name: "Valentine's Day" }
  }

  const dayMessages = {
    roseday: "Sending this red rose to you, [Name], because you bring fragrance and beauty into my life every single day.",
    proposeday: "On this special day, I have just one question for you, [Name]: will you walk this path of life with me forever?",
    chocolateday: "Life is sweeter with you in it, [Name], much sweeter than this chocolate I'm sending your way.",
    teddyday: "Sending this teddy to you, [Name], so you have something soft to hug whenever I'm not there.",
    promiseday: "I promise to stand by your side through all the highs and lows, [Name], today and always.",
    hugday: "Sending you the biggest, warmest hug, [Name], to let you know how much you mean to me.",
    kissday: "Sealed with a kiss for you, [Name]; sending all my love and a gentle kiss.",
    valentinesday: "Happy Valentine's Day, [Name]; you are the reason I believe in love, and I am so incredibly lucky to call you mine."
  }

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

  function handleNoClick(){
    setYesScale(prev => prev + 0.2)
    setNoMsgIdx(prev => (prev + 1) % noMessages.length)
  }

  useEffect(()=>{
    const no = noBtnRef.current
    if(!no) return
    const handlers = ['mouseenter','click']
    const fn = (e)=>{ e.preventDefault?.(); handleNoClick() }
    handlers.forEach(ev=> no.addEventListener(ev, fn))
    return ()=> handlers.forEach(ev=> no.removeEventListener(ev, fn))
  }, [noBtnRef.current])

  useEffect(() => {
    if (!valentine) return
    const theme = dayThemes[valentine.day] || dayThemes.valentinesday
    const previous = document.body.style.background
    const previousEmoji = document.body.dataset.heartEmoji
    document.body.style.background = theme.bg
    // set dataset so background hearts use the day's emoji
    document.body.dataset.heartEmoji = theme.emoji
    return () => {
      document.body.style.background = previous
      if (previousEmoji) {
        document.body.dataset.heartEmoji = previousEmoji
      } else {
        delete document.body.dataset.heartEmoji
      }
    }
  }, [valentine])

  if (loading) {
    return (
      <main className="card">
        <h2>Loading valentine... 💌</h2>
      </main>
    )
  }

  if (error) {
    return (
      <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <main className="card">
          <h2>❌ {error}</h2>
        </main>
      </div>
    )
  }

  if (!valentine) {
    return (
      <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <main className="card">
          <h2>Valentine not found</h2>
        </main>
      </div>
    )
  }

  const theme = dayThemes[valentine.day] || dayThemes.valentinesday
  const templateDayMessage = (dayMessages[valentine.day] || '')

  function renderDayMessageWithHighlight(template, name){
    if(!template) return null
    const parts = template.split('[Name]')
    return (
      <strong>
        {parts.map((part, idx) => (
          <span key={idx}>
            {part}
            {idx === parts.length - 1 ? null : <span className="highlight-name">{name}</span>}
          </span>
        ))}
      </strong>
    )
  }

  return (
    <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <main className="card">
        {templateDayMessage && (
          <p className="day-top-message"><span className="day-top-emoji">{theme.emoji}</span>{renderDayMessageWithHighlight(templateDayMessage, valentine.name)}</p>
        )}

        <h1 className="title"><strong>{valentine.message}</strong></h1>

        {valentine.imageUrl && (
          <img className="gif" src={valentine.imageUrl} alt="Valentine" />
        )}

        {valentine.day === 'valentinesday' && !answered && (
          <div className="content-wrapper" style={{marginTop: '24px'}}>
            <button ref={yesBtnRef} className="btn yes" onClick={() => setAnswered(true)} style={{transform: `scale(${yesScale})`}}>
              Yes 💘
            </button>
            <button ref={noBtnRef} className="btn no">
              {noMessages[noMsgIdx]}
            </button>
          </div>
        )}

        {valentine.day === 'valentinesday' && answered && (
          <div className="celebration-message">
            <p>🎉 Yay! You said YES! 🎉</p>
            <p className="celebration-emoji">💕✨🎊💖{theme.emoji}✨💕</p>
          </div>
        )}
      </main>
    </div>
  )
}
