import React, { createContext, useState, useContext, ReactNode } from 'react';
import { db } from '../firebaseConfig';
import { serverTimestamp, doc, updateDoc, setDoc } from 'firebase/firestore'; // addDoc, collection 제거

// --- Type 정의 ---
// ... (기존 코드) ...
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
  startGame: (p1Id: string, p1Name: string, p2Id: string, p2Name: string) => Promise<void>;
  updateScore: (points: number) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

interface GameProviderProps {
  children: ReactNode;
}
// ---------------

// 1. Context 생성 (초기값에 타입 적용)
// ... (기존 코드) ...
const GameContext = createContext<GameContextType | undefined>(undefined);

// 2. Context를 사용하기 위한 custom hook
// ... (기존 코드) ...
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

// 3. Context Provider 컴포넌트
export const GameProvider = ({ children }: GameProviderProps) => {
  // ... (기존 상태 관리 코드) ...
  const [player1, setPlayer1] = useState<Player>({ id: '', name: '' });
  const [player2, setPlayer2] = useState<Player>({ id: '', name: '' });
  const [score, setScore] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // 0 = 로그인
  const [gameDocId, setGameDocId] = useState<string | null>(null);

  /**
   * 게임 시작 함수 (Firebase에 새 세션 생성)
   */
  const startGame = async (p1Id: string, p1Name: string, p2Id: string, p2Name: string) => {
    try {
      // 1. 학번(p1Id)을 문서 ID로 사용
      const gameDocRef = doc(db, "gameSessions", p1Id); 
      
      // 2. setDoc (addDoc 대신)으로 문서 생성
      await setDoc(gameDocRef, { 
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
      setGameDocId(p1Id); // 문서 ID를 랜덤 ID가 아닌 p1Id로 저장
      setCurrentPage(1); // 1번 페이지(게임 시작)로 이동

      console.log("게임 시작! Firebase 문서 ID:", p1Id);

    } catch (e) {
      console.error("Firebase 문서 생성 오류: ", e);
      alert("게임 시작에 실패했습니다. 관리자에게 문의하세요.");
      // [수정!] 에러를 다시 throw하여 LoginScreen.tsx가 알 수 있게 함
      throw e; 
    }
  };

  /**
   * 점수 업데이트 함수 (점수 시스템 로직 추가)
   */
// ... (기존 updateScore 함수) ...
  const updateScore = async (points: number) => {
    const newScore = score + points;
    setScore(newScore);

    // Firebase에 점수 업데이트
    if (gameDocId) {
      try {
        const gameDocRef = doc(db, "gameSessions", gameDocId);
        await updateDoc(gameDocRef, {
          score: newScore
        });
        console.log(`점수 ${points}점 변경! (현재 총 ${newScore}점)`);
      } catch (e) {
        console.error("Firebase 점수 업데이트 오류: ", e);
      }
    }
  };

// ... (기존 value 및 return) ...
  const value: GameContextType = {
    player1,
    player2,
    score,
    currentPage,
    gameDocId,
    startGame,
    updateScore,
    setCurrentPage,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};



