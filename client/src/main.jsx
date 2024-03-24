import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';

import { CarProvider } from './contexts/CarContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster/>
    <CarProvider>
    <App />
    </CarProvider>
  </React.StrictMode>,
)
