import { useEffect, useState } from 'react';

type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = function ({
  isOpen,
  title,
  onClose,
  children,
  actions,
}) {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 300); // Match the duration of the fade-out animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'fade-in' : 'fade-out'}`}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className={`absolute inset-0 flex items-center justify-center `}>
        <div className={`w-full max-w-[400px] rounded-lg bg-white p-4 `}>
          <header className="flex items-center justify-between">
            <h2 className="text-lg font-bold">{title}</h2>
            <button onClick={onClose}>Close</button>
          </header>
          <main>{children}</main>
          <hr />
          <footer>{actions}</footer>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    width: '400px',
    maxWidth: '90%',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  },
  header: {
    padding: '16px',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
  content: { padding: '16px' },
  footer: {
    padding: '16px',
    borderTop: '1px solid #ddd',
    textAlign: 'right' as 'right',
  },
};
