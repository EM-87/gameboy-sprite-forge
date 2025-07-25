import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GameBoySpriteForge from './GameBoySpriteForge';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GameBoySpriteForge />
  </React.StrictMode>
);
