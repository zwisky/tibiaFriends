import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import App from './App'; // Cambio crítico

// Bootstrap JS (Solución mejorada)
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap; // Hacerlo disponible globalmente si es necesario

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);