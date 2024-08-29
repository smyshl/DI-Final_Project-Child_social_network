import './ImageModal.css'

function ModalWindow({ children, isOpen, onClose}) {

    // console.log("ModalWindow component children, isOpen, setOpen =>", isOpen);

    if (!isOpen) return null;
  
    return (
      <div className="modal">
        <div className="modal-content" >
          <span className="close" onClick={onClose}>&times;</span>
          {children}
        </div>
      </div>
    );
  }


  export default ModalWindow;