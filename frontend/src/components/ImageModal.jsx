import { useState, useEffect } from 'react';

import './ImageModal.css'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import ImageModalSlider from './ImageModalSlider.jsx';

function ImageModal({ signedUrl, onClose, imageList, imageSize, setSelectedImage }) {

    const [ shownImage, setShownImage] = useState(null);
    const [ imageDimensions, setImageDimensions ] = useState({});
    const [ modalContentSliderHeight, setModalContentSliderHeight ] = useState('15vh')

    // console.log("ImageModal component, shownImage =>", { signedUrl, onClose, imageList });
    // console.log("ImageModal component, shownImage =>", shownImage);

    // console.log("ImageModal. onCloseClickHandle =>", onClose);

useEffect(() => {
  setShownImage(signedUrl);
  setImageDimensions({ ...imageSize });
  // console.log("ImageModal component, useEffect, shownImage =>", shownImage);

  if (imageList && imageList.length === 1) {
    setModalContentSliderHeight("0");
  } else {
    setModalContentSliderHeight("15vh");
  }
  // console.log("ImageModal component useEffect modalContentSliderHeight =>", modalContentSliderHeight);
  
}, [signedUrl]);



    if (!signedUrl) return null;
  
    return (
      <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={onClose}>&times;</span>
          <img 
          src={shownImage} 
          className="modal-image"
          width={imageDimensions.width}
          height={imageDimensions.height}
          />

          <div className="modal-content-slider" style={{height: modalContentSliderHeight}}>
            
          {imageList && imageList.length > 1 && <ImageModalSlider 
              imageList={imageList} 
              setSelectedImage={setSelectedImage}
              />}

          </div>

        </div>
        
      </div>
    );
  }


  export default ImageModal;
  