import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ResponsiveRouter from './components/ResponsiveRouter';
import { ToastProvider } from './components/ui/toast';
import { TooltipProvider } from './components/ui/tooltip';

function App() {
  return (
    <Router>
      <ToastProvider>
        <TooltipProvider>
          <ResponsiveRouter />
        </TooltipProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
