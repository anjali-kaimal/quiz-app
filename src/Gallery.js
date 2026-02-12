import React, { useState } from 'react';
import './Gallery.css';

const photos = [
  { id: 1, src: '/1.jpg', title: 'Photo 1' },
  { id: 2, src: '/2.jpg', title: 'Photo 2' },
  { id: 3, src: '/3.jpg', title: 'Photo 3' },
  { id: 4, src: '/4.jpg', title: 'Photo 4' },
  { id: 5, src: '/5.jpg', title: 'Photo 5' },
  { id: 6, src: '/6.jpg', title: 'Photo 6' },
];

function Gallery() {
  const [openPhoto, setOpenPhoto] = useState(null);

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Our Special Moments ❤️</h1>
      <div className="carousel">
        {photos.map(photo => (
          <div
            key={photo.id}
            className={`carousel-item ${openPhoto === photo.id ? 'open' : ''}`}
            onClick={() => setOpenPhoto(openPhoto === photo.id ? null : photo.id)}
          >
            {openPhoto === photo.id ? (
              <img src={photo.src} alt={photo.title} className="photo" />
            ) : (
              <div className="photo-placeholder">{photo.title}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
