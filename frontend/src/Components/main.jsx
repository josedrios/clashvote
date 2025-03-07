import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AlertProvider } from '../util/AlertContext.jsx';
import App from './layout/App.jsx';

createRoot(document.getElementById('root')).render(
  <AlertProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AlertProvider>
);
