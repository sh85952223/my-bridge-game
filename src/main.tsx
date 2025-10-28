import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// 1. GameProvider 임포트
import { GameProvider } from './context/GameContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 2. App 컴포넌트를 GameProvider로 감싸기 */}
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>,
);

