import React, { useState } from 'react';
import './PhotoGallery.css';

const photoData = [
  { id: 1, title: 'August 2025', image: '/1.jpeg' },
  { id: 2, title: 'September 2025', image: '/2.jpeg' },
  { id: 3, title: 'November 2025', image: '/3.jpeg' },
  { id: 4, title: 'December 2025', image: '/4.jpeg' },
  { id: 5, title: 'January 2026', image: '/5.jpeg' },
  { id: 6, title: 'February 2026', image: '/6.jpeg' }
];

function PhotoGallery({ onBack }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleTextClick = (index) => {
    setSelectedIndex(index);
    setSelectedPhoto(photoData[index]);
  };

  const handleClosePhoto = () => {
    setSelectedPhoto(null);
    setSelectedIndex(null);
  };

  const handleNext = () => {
    const nextIndex = (selectedIndex + 1) % photoData.length;
    setSelectedIndex(nextIndex);
    setSelectedPhoto(photoData[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (selectedIndex - 1 + photoData.length) % photoData.length;
    setSelectedIndex(prevIndex);
    setSelectedPhoto(photoData[prevIndex]);
  };

  return (
    <div className="photo-gallery-container">
      <div className="gallery-header">
        <h2 className="gallery-title">Happy Valentines day 💕</h2>
        <p className="gallery-subtitle">Heres to a lifetime of beautiful memories together</p>
        <p className="gallery-subtitle">Click on any memory to reveal the photo</p>
      </div>

      <div className="photo-labels">
        {photoData.map((photo, index) => (
          <button
            key={photo.id}
            className="photo-label"
            onClick={() => handleTextClick(index)}
          >
            {photo.title}
          </button>
        ))}
      </div>

      {selectedPhoto && (
        <div className="photo-overlay" onClick={handleClosePhoto}>
          <div className="photo-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleClosePhoto}>
              ✕
            </button>
            <button className="modal-nav prev" onClick={handlePrev}>
              ‹
            </button>
            <button className="modal-nav next" onClick={handleNext}>
              ›
            </button>
            <img 
              src={selectedPhoto.image} 
              alt={selectedPhoto.title}
              className="modal-image"
            />
            <h3 className="modal-title">{selectedPhoto.title}</h3>
            <div className="modal-indicator">
              {selectedIndex + 1} / {photoData.length}
            </div>
          </div>
        </div>
      )}

      {onBack && (
        <button className="back-button" onClick={onBack}>
          ← Back to Start
        </button>
      )}
    </div>
  );
}

export default PhotoGallery;
