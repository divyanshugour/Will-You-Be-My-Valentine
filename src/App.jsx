import React, { useEffect, useRef, useState } from 'react'

function randomInt(min, max){ return Math.floor(min + Math.random()*(max-min+1)) }

const noMessages = ['are you sure?', 'fir se soch lo', 'nahi nahi', 'sach mein?', 'pakka pakka?']

export default function App(){
  const [hearts, setHearts] = useState([])
  const [yesScale, setYesScale] = useState(1)
  const [noMsgIdx, setNoMsgIdx] = useState(0)
  const heartsRef = useRef([])
  const noBtnRef = useRef(null)
  const yesBtnRef = useRef(null)

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
        next.push({id,size,left,dur,sway,opacity})
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
    spawnHearts(40)
    if(yesBtnRef.current){
      yesBtnRef.current.textContent = 'Yay! 💞'
      yesBtnRef.current.disabled = true
    }
  }

  return (
    <div className="app-root">
      <div className="hearts-layer" aria-hidden="true">
        {hearts.map(h => (
          <span key={h.id}
            className="heart"
            style={{left: `${h.left}vw`, fontSize: `${h.size}px`, animationDuration: `${h.dur}s, ${h.sway}s`, opacity: h.opacity}}
          >{Math.random()>.5? '💖':'❤️'}</span>
        ))}
      </div>

      <main className="card">
        <h1 className="title">Will You Be My Valentine?</h1>
        
        <div className="content-wrapper">
          <button ref={yesBtnRef} className="btn yes" onClick={handleYes} style={{transform: `scale(${yesScale})`}}>Yes 💘</button>
          <img className="gif" src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif" alt="Valentine GIF" />
          <button ref={noBtnRef} className="btn no">
            {noMessages[noMsgIdx]}
          </button>
        </div>
      </main>
    </div>
  )
}
