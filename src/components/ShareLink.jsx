import React, { useState } from 'react'

export default function ShareLink({ valentineId, onCreateNew }) {
  const [copied, setCopied] = useState(false)
  const shareUrl = `${window.location.origin}?id=${valentineId}`

  function copyToClipboard() {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="share-link-container">
      <h2>🎉 Valentine Link Created! 🎉</h2>
      <p>Share this link with your valentine:</p>

      <div className="link-box">
        <input type="text" value={shareUrl} readOnly />
        <button className="btn yes" onClick={copyToClipboard}>
          {copied ? '✓ Copied!' : 'Copy Link'}
        </button>
      </div>

      <div className="share-buttons">
        <button className="share-btn" onClick={() => {
          const text = `Check out my Valentine message! ${shareUrl}`
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`)
        }}>📱 Share on Twitter</button>

        <button className="share-btn" onClick={() => {
          const text = `Check out my Valentine message! ${shareUrl}`
          window.open(`https://wa.me/?text=${encodeURIComponent(text)}`)
        }}>💬 Share on WhatsApp</button>
      </div>

      <button className="btn yes" onClick={onCreateNew} style={{marginTop: '20px'}}>
        Create Another Valentine 💌
      </button>
    </div>
  )
}
