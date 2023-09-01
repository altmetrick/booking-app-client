import { createPortal } from 'react-dom';

type ModalPropsT = {
  children: React.ReactNode;
  actionBar?: React.ReactNode;
  onClose?: () => void;
};

export const Modal: React.FunctionComponent<ModalPropsT> = ({ children, onClose }) => {
  return createPortal(
    <div className="fixed inset-0">
      <div className="absolute inset-0 bg-red-200 opacity-80" onClick={onClose}></div>
      <div className="modal-content absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 h-fit w-1/2 p-10 rounded-2xl bg-white shadow-md">
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};
