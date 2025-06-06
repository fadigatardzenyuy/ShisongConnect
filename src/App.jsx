import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ResponsiveRouter from './components/ResponsiveRouter';
import ToastProvider from './components/ui/ToastProvider';

function App() {
  return (
    <Router>
      <ToastProvider>
        <ResponsiveRouter />
      </ToastProvider>
    </Router>
  );
}

export default App;
