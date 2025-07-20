import React from 'react';
import GameBoySpriteForge from './GameBoySpriteForge';

/**
 * Componente raíz de la aplicación.
 * Aquí podríamos envolver en providers (Theme, i18n, Sentry, etc.) en el futuro.
 */
const App: React.FC = () => {
  return <GameBoySpriteForge />;
};

export default App;
