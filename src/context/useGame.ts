import { useContext } from 'react';
import { GameContext, type GameContextType } from './GameContext';

/**
 * GameContext를 쉽게 사용하기 위한 커스텀 훅
 */
export const useGame = () => {
  const context = useContext<GameContextType | undefined>(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};