import { useState } from 'react'
import './App.css'

// Import all photos
import photo1 from './assets/0B2ED63D-98C4-4273-9D36-9789EA3B4D9E_1_102_o.jpeg'
import photo2 from './assets/19EF2AF7-354B-44CD-9758-0AAFD5E47F50_1_102_o.jpeg'
import photo3 from './assets/5BC8722C-3489-4260-88CC-231DAE83B06F_1_102_o.jpeg'
import photo4 from './assets/BD7D4B26-4551-4C57-85E6-613A45023F84_1_105_c.jpeg'
import photo5 from './assets/D5D5F1BA-BC60-42A2-9C40-0110773F4D61_1_102_o.jpeg'
import photo6 from './assets/F7185CDF-353B-4AAD-91DC-81692B856FCA_1_102_o.jpeg'

function App() {
  const photos = [photo1, photo2, photo3, photo4, photo5, photo6]
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const emojis = ['🎂', '🎈', '🎉', '👶', '💕', '🌟']

  return (
    <div className="app">
      <div className="floating-emojis">
        <span className="emoji">🎂</span>
        <span className="emoji">🎈</span>
        <span className="emoji">🎉</span>
        <span className="emoji">💕</span>
        <span className="emoji">🎈</span>
        <span className="emoji">🌟</span>
      </div>

      <header className="header">
        <div className="header-content">
          <h1 className="title">
            <span className="title-emoji">👶</span>
            <span className="title-text">Toğrul</span>
            <span className="title-emoji">👶</span>
          </h1>
          <p className="subtitle">1 Yaşına Girən Əziz Oğlumuzun Gülüşü</p>
          <div className="decorative-line"></div>
        </div>
      </header>

      <main className="gallery-container">
        <div className="gallery-grid">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`photo-card ${hoveredIndex === index ? 'hovered' : ''}`}
              onClick={() => setSelectedPhoto(photo)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="photo-frame">
                <img 
                  src={photo} 
                  alt={`Toğrul ${index + 1}`}
                  className="photo-thumbnail"
                />
              </div>
              <div className="photo-overlay">
                <span className="zoom-icon">🔍</span>
              </div>
              <div className="photo-number">{index + 1}</div>
              <div className="photo-emoji">{emojis[index]}</div>
            </div>
          ))}
        </div>
      </main>

      {selectedPhoto && (
        <div className="modal" onClick={() => setSelectedPhoto(null)}>
          <div className="modal-content">
            <button 
              className="close-button"
              onClick={() => setSelectedPhoto(null)}
            >
              ✕
            </button>
            <img src={selectedPhoto} alt="Full view" className="modal-image" />
          </div>
        </div>
      )}

      <footer className="footer">
        <p className="footer-text">
          <span className="heart">💕</span> Toğrul - 1 Yaş Dönümü <span className="heart">💕</span>
        </p>
        <p className="footer-subtext">Hər gülüşü bizim ən böyük sərvetimizdir</p>
      </footer>
    </div>
  )
}

export default App