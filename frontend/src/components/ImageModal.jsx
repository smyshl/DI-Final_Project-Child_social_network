import './ImageModal.css'

function ImageModal({ signedUrl, onClose }) {

    // console.log("ImageModal. onCloseClickHandle =>", onClose);

    if (!signedUrl) return null;
  
    return (
      <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={onClose}>&times;</span>
          <img src={signedUrl} className="modal-image" />
        </div>
      </div>
    );
  }


  export default ImageModal;
  