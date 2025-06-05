import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ResponsiveRouter from './components/ResponsiveRouter';
import ToastProvider from './components/ui/ToastProvider';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ResponsiveRouter />
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
