import { createContext, useContext, useState, useRef } from 'react';

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({ message: '', type: '' });
  const timeoutRef = useRef(null);

  const showAlert = (message, type) => {
    setAlert({ message, type });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (message !== '') {
      timeoutRef.current = setTimeout(() => {
        setAlert({ message: '', type: '' });
        timeoutRef.current = null; // Reset reference
      }, 5500);
    }
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}
