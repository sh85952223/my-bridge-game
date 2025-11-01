import React, { createContext, useState, useContext, type ReactNode, type SetStateAction, type Dispatch } from 'react';
import { db } from '../firebaseConfig';
import { doc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

// --- Type 정의 ---
interface Player {
  id: string;
  name: string;
}

interface GameContextType {
  player1: Player;
  player2: Player;
  score: number;
  currentPage: number;
  gameDocId: string | null;
  viewedHints: Set<number>;
  structureQuizSolved: boolean[]; // Page 13 퀴즈 정답 상태
  startGame: (p1Id: string, p1Name: string, p2Id: string, p2Name: string) => Promise<void>;
  updateScore: (points: number) => void;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  viewHint: (hintId: number) => void;
  setStructureQuizSolved: Dispatch<SetStateAction<boolean[]>>; 
}

interface GameProviderProps {
  children: ReactNode;
}
// ---------------

// 1. Context 생성
const GameContext = createContext<GameContextType | undefined>(undefined);

// 2. custom hook
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

// 3. Context Provider 컴포넌트
export const GameProvider = ({ children }: GameProviderProps) => {
  const [player1, setPlayer1] = useState<Player>({ id: '', name: '' });
  const [player2, setPlayer2] = useState<Player>({ id: '', name: '' });
  const [score, setScore] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // 0 = 로그인
  const [gameDocId, setGameDocId] = useState<string | null>(null);
  const [viewedHints, setViewedHints] = useState<Set<number>>(new Set());
  const [structureQuizSolved, setStructureQuizSolved] = useState([false, false, false, false, false, false]);

  /**
   * 게임 시작 함수
   */
  const startGame = async (p1Id: string, p1Name: string, p2Id: string, p2Name: string) => {
    try {
      const gameSessionRef = doc(db, "gameSessions", p1Id); 
      await setDoc(gameSessionRef, {
        player1Id: p1Id,
        player1Name: p1Name,
        player2Id: p2Id || null,
        player2Name: p2Name || null,
        score: 0,
        createdAt: serverTimestamp(),
      });

      setPlayer1({ id: p1Id, name: p1Name });
      setPlayer2({ id: p2Id, name: p2Name });
      setScore(0);
      setGameDocId(p1Id); 
      setCurrentPage(1); 
      setViewedHints(new Set()); 
      setStructureQuizSolved([false, false, false, false, false, false]); // 퀴즈 상태 초기화

      console.log("게임 시작! Firebase 문서 ID:", p1Id);

    } catch (e) {
      console.error("Firebase 문서 생성 오류: ", e);
      alert("게임 시작에 실패했습니다. 관리자에게 문의하세요.");
      throw e; 
    }
  };

  /**
   * 점수 업데이트 함수
   */
  const updateScore = async (points: number) => {
    const newScore = score + points;
    setScore(newScore); 

    if (gameDocId) {
      try {
        const gameDocRef = doc(db, "gameSessions", gameDocId);
        await updateDoc(gameDocRef, {
          score: newScore
        });
        console.log(`점수 ${points > 0 ? '+' : ''}${points}점! (현재 총 ${newScore}점)`);
      } catch (e) {
        console.error("Firebase 점수 업데이트 오류: ", e);
      }
    }
  };

  /**
   * 힌트 보기 함수
   */
  const viewHint = (hintId: number) => {
    if (!viewedHints.has(hintId)) {
      updateScore(-5); 
      setViewedHints(prevHints => new Set(prevHints).add(hintId)); 
      console.log(`힌트 ${hintId}번 첫 확인! -5점`);
    } else {
      console.log(`힌트 ${hintId}번 다시 확인 (감점 없음)`);
    }
  };


  const value: GameContextType = {
    player1,
    player2,
    score,
    currentPage,
    gameDocId,
    viewedHints,
    structureQuizSolved, 
    startGame,
    updateScore,
    setCurrentPage,
    viewHint,
    setStructureQuizSolved, 
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

