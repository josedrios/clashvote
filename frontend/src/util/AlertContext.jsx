import { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({ message: '', type: '' });

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });

    setTimeout(() => setAlert({ message: '', type: '' }), 5000);
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
