import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ImageModalSlider({imageList, setSelectedImage}) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true
    //     }
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       initialSlide: 2
    //     }
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1
    //     }
    //   }
    // ]
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        
        {imageList?.map((url, index) => (
          <div key={index}>
              <img
                // key={index}
                src={url}
                style={{ maxWidth: "10vw", maxHeight: '10vh', objectFit: 'cover', cursor: 'pointer'}}
                onClick={(e) => setSelectedImage(e.target.src)}
              />
          </div>    
            ))}
        
      </Slider>
    </div>
  );
}

export default ImageModalSlider;
