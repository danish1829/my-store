import React, { useState, useEffect, useRef } from 'react';

const Slideshow = () => {
  const [showImages, setShowImages] = useState(false);
  const videoRef = useRef(null);
  const slideshowRef = useRef(null);

  const images = [
    'https://image.hm.com/content/dam/global_campaigns/season_01/women/startpage-assets/wk15/NEW-Tops-CE-wk15-2x3.jpg?imwidth=1536',
    'https://image.hm.com/content/dam/global_campaigns/season_01/men/start-page-assets/w15/teasers/MS21E3-4x5-Startpage-Teaser-3-w15.jpg?imwidth=1024',
    'https://static.zara.net/assets/public/504d/a430/0c314af4a3de/c58fcc89ec29/image-landscape-8b2f2c18-549f-4dec-bc58-1367cd4c4286-default_0/image-landscape-8b2f2c18-549f-4dec-bc58-1367cd4c4286-default_0.jpg?ts=1742320487359&w=1920'
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (slideshowRef.current && window.scrollY + window.innerHeight >= slideshowRef.current.offsetTop) {
        setShowImages(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.onended = () => {
        setShowImages(true); 
      };
    }
  }, []);

  return (
    <div>
      {/* Video Background */}
      <div className="video-container">
        <video
          ref={videoRef}
          className="video-background"
          autoPlay
          loop
          muted
        >
          <source src="https://image.hm.com/content/dam/global_campaigns/season_01/women/startpage-assets/wk15/1011B-startpage-women-wk15-16x9.mp4" type="video/mp4" />

        </video>
      </div>

      {/* Show images after user scrolls down */}
      <div ref={slideshowRef}>
        {showImages && (
          <div className="image-slideshow">
            {images.map((src, index) => (
              <img key={index} src={src} alt={`Slideshow ${index}`} className="slideshow-image" />
            ))}
          </div>
        )}
      </div>
      <div className="w-2/3 mx-auto">
        <div className="flex justify-center gap-4 p-4 animate-fade-in">
          <img className="w-1/2 object-cover rounded transition-transform duration-300 hover:scale-105"
          src="https://image.hm.com/content/dam/global_campaigns/season_01/kids/start-page-assets/w-11/young-CE-2x3-week-11-16.jpg?imwidth=1536"
          alt="img"
          />
        <img
        className="w-1/2 object-cover rounded transition-transform duration-300 hover:scale-105"
        src="https://image.hm.com/content/dam/global_campaigns/season_01/kids/start-page-assets/w-11/newborn-CE-2x3-week-11-16.jpg?imwidth=1536"
        alt="bg"
        />
       </div>
     </div>

    </div>
  );
};

export default Slideshow;
