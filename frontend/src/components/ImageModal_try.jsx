import React from 'react';
import { Modal, Box } from '@mui/material';

function ImageModal({ open, onClose, signedUrl }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="fullscreen-image-modal"
      aria-describedby="fullscreen-image-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: '90vw', // Ограничение ширины модального окна
          maxHeight: '90vh', // Ограничение высоты модального окна
          overflow: 'hidden', // Обрезка контента, выходящего за пределы
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // Темный фон
          borderRadius: 2,
          padding: 2,
        }}
      >
        <Box
          component="img"
          src={signedUrl}
          alt="Fullscreen"
          sx={{
            width: 'auto',
            height: '600px',
            objectFit: 'contain',
            borderRadius: 2, // Скругление углов, если нужно
          }}
        />
      </Box>
    </Modal>
  );
}

export default ImageModal;









// import './ImageModal.css'

// function ImageModal({ signedUrl, onClose }) {

//     // console.log("ImageModal. onCloseClickHandle =>", onClose);

//     if (!signedUrl) return null;
  
//     return (
//       <div className="modal" onClick={onClose}>
//         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//           <span className="close" onClick={onClose}>&times;</span>
//           <img src={signedUrl} className="modal-image" />
//         </div>
//       </div>
//     );
//   }


//   export default ImageModal;
  