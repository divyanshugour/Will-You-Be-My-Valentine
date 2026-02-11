import React, { useEffect, useRef, useState } from 'react'
import ValentineForm from './components/ValentineForm'
import ShareLink from './components/ShareLink'
import ViewValentine from './components/ViewValentine'

function randomInt(min, max){ return Math.floor(min + Math.random()*(max-min+1)) }

const noMessages = ['Pakka?', 'Soch lia?', 'Mana mat kro na!', 'Achche bachche na nahi bolte.', 'Lock kar diya jaye?', 'Ek baar phir soch lo.', 'Final decision hai?', 'Mere liye bhi nahi?', 'Itni chhoti si toh baat hai.', 'Ek baar "haan" bol ke toh dekho.']

export default function App(){
  const [hearts, setHearts] = useState([])
  const [yesScale, setYesScale] = useState(1)
  const [noMsgIdx, setNoMsgIdx] = useState(0)
  const [celebrateMode, setCelebrateMode] = useState(false)
  const [mode, setMode] = useState('form')
  const [generatedId, setGeneratedId] = useState(null)
  const [viewingId, setViewingId] = useState(null)
  const heartsRef = useRef([])
  const noBtnRef = useRef(null)
  const yesBtnRef = useRef(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    if (id) {
      setMode('view')
      setViewingId(id)
    }
  }, [])

  useEffect(()=>{
    heartsRef.current = []
    spawnHearts(18)
    const t = setInterval(()=> spawnHearts(4), 900)
    return ()=> clearInterval(t)
  }, [])

  function spawnHearts(n){
    setHearts(prev=>{
      const next = [...prev]
      for(let i=0;i<n;i++){
        const id = cryptoRandomId()
        const size = randomInt(18,54)
        const left = Math.random()*100
        const dur = (6 + Math.random()*8).toFixed(2)
        const sway = (2 + Math.random()*4).toFixed(2)
        const opacity = (0.6 + Math.random()*0.5).toFixed(2)
        const emoji = document?.body?.dataset?.heartEmoji || (Math.random()>.5? '💖':'❤️')
        next.push({id,size,left,dur,sway,opacity, emoji})
      }
      return next.slice(-120)
    })
    setTimeout(()=>{
      setHearts(prev=>prev.slice(20))
    },16000)
  }

  function cryptoRandomId(){
    return Math.random().toString(36).slice(2,9)
  }

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
  }, [])

  function handleYes(){
    setCelebrateMode(true)
    for(let i = 0; i < 60; i++){
      setTimeout(() => spawnHearts(8), i * 100)
    }
  }

  function handleCreateValentine(){
    setMode('form')
    setCelebrateMode(false)
    setYesScale(1)
    setNoMsgIdx(0)
  }

  function handleLinkGenerated(id){
    setGeneratedId(id)
    setMode('share')
  }

  return (
    <div className="app-root">
      <div className="hearts-layer" aria-hidden="true">
        {hearts.map(h => (
          <span key={h.id}
            className="heart"
            style={{left: `${h.left}vw`, fontSize: `${h.size}px`, animationDuration: `${h.dur}s, ${h.sway}s`, opacity: h.opacity}}
          >{h.emoji}</span>
        ))}
      </div>

      {mode === 'home' && (
        <main className="card">
          <h1 className="title">
            {celebrateMode ? '🎉 You Said YES! 🎉' : 'Will You Be My Valentine?'}
          </h1>
          
          {!celebrateMode && (
            <>
              <div className="content-wrapper">
                <button ref={yesBtnRef} className="btn yes" onClick={handleYes} style={{transform: `scale(${yesScale})`}}>Yes 💘</button>
                <img className="gif" src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif" alt="Valentine GIF" />
                <button ref={noBtnRef} className="btn no">
                  {noMessages[noMsgIdx]}
                </button>
              </div>
            </>
          )}

          {celebrateMode && (
            <div className="celebration-message">
              <p>💕 I'm the happiest person right now! 💕</p>
              <p className="celebration-emoji">💘✨🎊🎉💖🌹✨💘</p>
              <p>Thank you for making me the luckiest! 🥰</p>
            </div>
          )}

          <button className="btn yes" onClick={handleCreateValentine} style={{marginTop: '24px', width: '100%'}}>
            Create Your Own Valentine 💌
          </button>
        </main>
      )}

      {mode === 'form' && (
        <main className="card">
          <ValentineForm onLinkGenerated={handleLinkGenerated} />
        </main>
      )}

      {mode === 'share' && (
        <main className="card">
          <ShareLink valentineId={generatedId} onCreateNew={handleCreateValentine} />
        </main>
      )}

      {mode === 'view' && viewingId && (
        <ViewValentine valentineId={viewingId} onCreateOwn={handleCreateValentine} />
      )}
    </div>
  )
}
