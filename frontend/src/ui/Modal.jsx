import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

const MODAL_STYLE = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
};

const OVERLAY_STYLE = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0, .88)', //
  zIndex: 1000,
};

// eslint-disable-next-line react/prop-types
function Modal({ children, open, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!open) return null;

  return createPortal(
    <div style={OVERLAY_STYLE}>
      <div ref={modalRef} style={MODAL_STYLE}>
        {children}
      </div>
    </div>,
    document.getElementById('portal')
  );
}

export default Modal;
