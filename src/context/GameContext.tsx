import { createContext, useState, useEffect, type ReactNode, type SetStateAction, type Dispatch } from 'react';
import { db } from '../firebaseConfig'; // [확인] firebaseConfig 경로가 맞는지 확인
import { doc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

// 40분 (초)
const TOTAL_GAME_TIME_SECONDS = 40 * 60; 

// --- Type 정의 ---
export interface GameContextType {
  player1: Player;
  player2: Player;
  score: number;
  currentPage: number;
  gameDocId: string | null;
  viewedHints: Set<number>;
  structureQuizSolved: boolean[]; 
  matchQuizSolved: Set<string>; 
  
  // [신규] 타이머 및 게임 종료 상태
  timeRemaining: number; 
  isTimeUp: boolean;     
  timeTaken: number;     
  startTime: Date | null; 

  startGame: (p1Id: string, p1Name: string, p2Id: string, p2Name: string) => Promise<void>;
  updateScore: (points: number) => void;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  viewHint: (hintId: number) => void;
  setStructureQuizSolved: Dispatch<SetStateAction<boolean[]>>; 
  setMatchQuizSolved: Dispatch<SetStateAction<Set<string>>>; 

  // [신규] 최종 점수 계산 함수 추가
  calculateFinalScore: (quizScore: number, timeTaken: number) => { 
    quizScore: number, 
    timeBonus: number, 
    finalScore: number 
  };
}
interface Player {
  id: string;
  name: string;
}
interface GameProviderProps {
  children: ReactNode;
}
// ---------------

// 1. Context 생성
// eslint-disable-next-line react-refresh/only-export-components
export const GameContext = createContext<GameContextType | undefined>(undefined);

// 3. Context Provider 컴포넌트
export const GameProvider = ({ children }: GameProviderProps) => {
  const [player1, setPlayer1] = useState<Player>({ id: '', name: '' });
  const [player2, setPlayer2] = useState<Player>({ id: '', name: '' });
  const [score, setScore] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // 0 = 로그인
  const [gameDocId, setGameDocId] = useState<string | null>(null);
  const [viewedHints, setViewedHints] = useState<Set<number>>(new Set());
  const [structureQuizSolved, setStructureQuizSolved] = useState(new Array(6).fill(false)); // (0번 인덱스 포함 6개)
  const [matchQuizSolved, setMatchQuizSolved] = useState<Set<string>>(new Set()); 

  // [신규] 타이머 상태
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_GAME_TIME_SECONDS);
  const [timeTaken, setTimeTaken] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);


  // [신규] 타이머 로직
  useEffect(() => {
    if (startTime && currentPage > 0 && !isTimeUp) {
      const timerInterval = setInterval(() => {
        const now = new Date();
        const elapsedSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        const remaining = TOTAL_GAME_TIME_SECONDS - elapsedSeconds;

        setTimeTaken(elapsedSeconds);
        setTimeRemaining(remaining);

        if (remaining <= 0) {
          clearInterval(timerInterval);
          setIsTimeUp(true); // 타임 오버!
          setTimeRemaining(0);
        }
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [startTime, currentPage, isTimeUp]);

  
  // [신규] 최종 점수 계산 로직 (컨텍스트 내부로 이동)
  const calculateFinalScore = (quizScore: number, timeTaken: number) => {
    const totalTime = TOTAL_GAME_TIME_SECONDS; // 2400

    // [핵심 수정] 가중치를 0.1에서 0.05로 대폭 하향 조정
    const timeBonus = Math.max(0, (totalTime - timeTaken) * 0.05);

    const finalScore = quizScore + timeBonus;
    
    return {
      quizScore,
      timeBonus: Math.round(timeBonus),
      finalScore: Math.round(finalScore)
    };
  };


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
      setStructureQuizSolved(new Array(6).fill(false)); 
      setMatchQuizSolved(new Set()); 

      // [신규] 타이머 시작
      setStartTime(new Date());
      setTimeRemaining(TOTAL_GAME_TIME_SECONDS);
      setTimeTaken(0);
      setIsTimeUp(false);

      console.log("게임 시작! Firebase 문서 ID:", p1Id);

    } catch (_e) { 
      console.error("Firebase 문서 생성 오류: ", _e);
      alert("게임 시작에 실패했습니다. 관리자에게 문의하세요.");
      throw _e; 
    }
  };

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
    matchQuizSolved, 
    
    // [신규] 타이머 값 전달
    timeRemaining,
    isTimeUp,
    timeTaken,
    startTime,

    startGame,
    updateScore,
    setCurrentPage,
    viewHint,
    setStructureQuizSolved, 
    setMatchQuizSolved,
    
    // [신규] 점수 계산 함수 전달
    calculateFinalScore,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

