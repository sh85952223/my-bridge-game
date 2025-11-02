// src/components/pages/Page17_BridgeTypeQuiz/index.tsx (전체 코드)

import { useState } from 'react'; // [수정] useEffect 제거
import { useGame } from '../../../context/useGame';
import styles from './Page17.module.css'; 
import Confetti from 'react-confetti'; // [복구] Confetti import

// [유지] public 폴더 기준 안정적인 문자열 경로
const bridgeImage = '/assets/images/suspension_bridge_quiz.jpg'; 

const QUIZ_OPTIONS = [
  { id: '1', name: '단순교', isCorrect: false },
  { id: '2', name: '트러스교', isCorrect: false },
  { id: '3', name: '아치교', isCorrect: false },
  { id: '4', name: '현수교', isCorrect: true }, // 정답
  { id: '5', name: '사장교', isCorrect: false },
];

const Page17_BridgeTypeQuiz = () => {
  const { updateScore, setCurrentPage } = useGame();
  
  const [feedback, setFeedback] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  
  // [유지] Confetti 상태 관리
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOptionClick = (id: string, isCorrect: boolean) => {
    if (isSolved) return;
    setSelectedId(id);

    if (isCorrect) {
      updateScore(10);
      setFeedback('현수교는 주 케이블에 다리 상판을 매단 형태');
      setIsSolved(true);
      setShowConfetti(true); // Confetti 켜기
    } else {
      updateScore(-5);
      setFeedback('오답입니다! 😭 -5점. 다시 시도해보세요.');
    }
  };

  const handleNext = () => {
    setCurrentPage(18); // 다음 퀴즈 페이지(Page 18)로 이동
  };

  // [삭제] Confetti 타이머 useEffect 제거 (recycle={false} 옵션이 자동으로 처리)
  
  return (
    <div className={`${styles.pageContainer} ${styles.quizPage}`}>
      
      {/* [수정] Confetti가 화면 전체를 덮도록 width/height 설정 */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false} // 👈 한 번만 실행하고 멈춤
          numberOfPieces={400}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }} // 전체 화면 보장
        />
      )}

      {/* 1. 이미지 카드 (상단) */}
      <div className={styles.imageCard}>
        <img src={bridgeImage} alt="현수교 퀴즈 이미지" className={styles.quizImage} />
      </div>

      {/* 2. 컨트롤 영역 (하단) */}
      <div className={styles.controlsWrapper}>
        
        <h2 className={styles.quizTitle}>이 교량의 유형은?</h2>
        
        {/* 선택지 그리드 */}
        <div className={styles.optionsGrid}>
          {QUIZ_OPTIONS.map(option => (
            <button
              key={option.id}
              className={`
                ${styles.optionButton}
                ${selectedId === option.id ? styles.selected : ''}
                ${isSolved && option.isCorrect ? styles.correct : ''}
                ${isSolved && selectedId === option.id && !option.isCorrect ? styles.incorrect : ''}
              `}
              onClick={() => handleOptionClick(option.id, option.isCorrect)}
              disabled={isSolved && selectedId !== option.id}
            >
              {option.name}
            </button>
          ))}
        </div>

        {/* 피드백 메시지 */}
        <div className={styles.feedbackArea}>
          {feedback && (
            <p className={isSolved ? styles.feedbackCorrect : styles.feedbackWrong}>
              {feedback}
            </p>
          )}
        </div>

        {/* '다음' 버튼 (정답 맞힐 시 표시) */}
        {isSolved && (
          <button 
            onClick={handleNext} 
            className={styles.nextButtonStyled}
          >
            {'>'} 다음 퀴즈
          </button>
        )}

        {/* 출처 */}
        <p className={styles.attribution}>사진: Unsplash의 Carl Solder</p>
      </div>
      
    </div>
  );
};

export default Page17_BridgeTypeQuiz;