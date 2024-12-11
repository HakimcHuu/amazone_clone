import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel's CSS
import { images } from './img/Data'; // Path to your image data
import classes from './Carousel.module.css'; // CSS module for styling

function CarouselEffect() {
  return (
    <div>
      <Carousel 
        autoPlay={true} 
        infiniteLoop={true} 
        showThumbs={false} 
        showIndicators={false} 
        interval={3000} 
        transitionTime={500}
      >
        {images.map((imageitemLink, index) => (
          <img src={imageitemLink} alt={`carousel-slide-${index}`} key={index} />
        ))}
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
}

export default CarouselEffect;

