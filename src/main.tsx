import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { PuterProvider, ThemeProvider } from './context';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <PuterProvider>
        <App />
      </PuterProvider>
    </ThemeProvider>
  </StrictMode>
);
