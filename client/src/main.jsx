import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './contexts/AuthContext.jsx';
import { CarProvider } from './contexts/CarContext.jsx';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();

import store from './app/store.js';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <QueryClientProvider client={queryClient}> */}
    <Provider store={store}>
      <AuthProvider>
        <Toaster />
        <CarProvider>
          <App />
        </CarProvider>
      </AuthProvider>
    </Provider>
    {/* </QueryClientProvider> */}
  </React.StrictMode>,
)
