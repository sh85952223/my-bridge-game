// src/components/pages/Page18_DisadvantageQuiz/index.tsx (전체 코드)

import { useState, useEffect } from 'react'; // [수정] ReactNode가 더 이상 필요 없으므로 제거
import { useGame } from '../../../context/useGame';
import styles from './Page18.module.css'; 
import Confetti from 'react-confetti'; 

// 힌트용 Page 16 이미지
const hintImage = '/assets/images/bridge_types.png'; 
// [유지] 해설 이미지
const explanationImage = '/assets/images/quiz_18_explanation.png'; 

// 퀴즈 데이터
const QUIZ_QUESTION = (
  <>
    이런 단점을 가진 교량은 <br />어떤 유형의 교량일까?
    <br />
    <span className={styles.quizClue}>
      "가장 만들기 간단하지만,
      <br />
      다리 상판 가운데 부분의 처짐이 <br />심할 수 있다."
    </span>
  </>
);
const QUIZ_OPTIONS = [
  { id: '1', name: '단순교', isCorrect: true }, // 정답
  { id: '2', name: '트러스교', isCorrect: false },
  { id: '3', name: '아치교', isCorrect: false },
  { id: '4', name: '현수교', isCorrect: false },
  { id: '5', name: '사장교', isCorrect: false },
];
const HINT_ID = 18; 

const Page18_DisadvantageQuiz = () => {
  const { updateScore, setCurrentPage, viewHint, viewedHints } = useGame();
  
  const [feedback, setFeedback] = useState(''); // [수정] 오답 텍스트 전용
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const [hintModalStep, setHintModalStep] = useState<'closed' | 'confirm' | 'image'>('closed');
  // [추가] 해설 모달 상태
  const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(false);

  const handleOptionClick = (id: string, isCorrect: boolean) => {
    if (isSolved) return;
    setSelectedId(id);

    if (isCorrect) {
      updateScore(10);
      setIsSolved(true);
      setShowConfetti(true);
      
      // [핵심 수정] 피드백 텍스트 대신, 해설 모달을 켭니다.
      setIsExplanationModalOpen(true);
      setFeedback(''); // 혹시 남아있을 오답 피드백 제거

    } else {
      updateScore(-5);
      setFeedback('오답입니다! 😭 -5점. 다시 시도해보세요.');
    }
  };

  const handleNext = () => {
    setCurrentPage(19); 
  };

  // 힌트 버튼 로직 (동일)
  const handleHintClick = () => {
    if (viewedHints.has(HINT_ID)) { setHintModalStep('image'); } 
    else { setHintModalStep('confirm'); }
  };
  const handleConfirmHint = () => {
    viewHint(HINT_ID); 
    setHintModalStep('image');
  };
  const handleCloseHintModal = () => { setHintModalStep('closed'); };

  // [추가] 해설 모달 닫기 함수
  const handleCloseExplanationModal = () => {
    setIsExplanationModalOpen(false);
  };

  // 컨페티 타이머 (동일)
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);


  return (
    <> {/* [수정] 모달을 분리하기 위해 Fragment 사용 */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false} 
          numberOfPieces={400} 
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }}
        />
      )}

      {/* 1. 퀴즈 페이지 본문 */}
      <div className={`${styles.pageContainer} ${styles.quizPage}`}>
        <div className={styles.controlsWrapper}>
          
          <h2 className={styles.quizTitle}>{QUIZ_QUESTION}</h2>
          
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

          {/* [수정] 피드백 영역: 오답일 때만 텍스트 표시 */}
          <div className={styles.feedbackArea}>
            {feedback && (
              <p className={styles.feedbackWrong}>
                {feedback}
              </p>
            )}
          </div>

          {/* 힌트 버튼 (정답 맞히기 전에만 보임) */}
          {!isSolved && (
            <button 
              onClick={handleHintClick} 
              className={styles.hintButton}
            >
              💡 힌트 보기 (-5점)
            </button>
          )}

          {/* '다음' 버튼 (정답 맞힐 시 표시) */}
          {isSolved && (
            <button 
              onClick={handleNext} 
              className={styles.nextButtonStyled}
            >
              {'>'} 다음 퀴즈
            </button>
          )}
        </div>
      </div> 

      {/* 2. 힌트 모달 (페이지 밖으로 분리) */}
      {hintModalStep !== 'closed' && (
        <div className={styles.modalOverlay}>
          {hintModalStep === 'confirm' && (
            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>힌트 확인</h3>
              <p className={styles.modalText}>힌트를 확인하면 5점이 감점됩니다. 정말 확인하시겠습니까?</p>
              <div className={styles.modalButtonContainer}>
                <button onClick={handleCloseHintModal} className={`${styles.modalButton} ${styles.modalButtonSecondary}`}>
                  아니요
                </button>
                <button onClick={handleConfirmHint} className={`${styles.modalButton} ${styles.modalButtonPrimary}`}>
                  예 (-5점)
                </button>
              </div>
            </div>
          )}
          
          {hintModalStep === 'image' && (
            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>교량의 6가지 기본 형태</h3>
              <img src={hintImage} alt="힌트: 교량 6가지 형태" className={styles.modalImage} />
              <button onClick={handleCloseHintModal} className={`${styles.modalButton} ${styles.modalButtonFull}`}>
                퀴즈로 돌아가기
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. [신규] 해설 모달 (페이지 밖으로 분리) */}
      {isExplanationModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>정답입니다!</h3>
            <img src={explanationImage} alt="단순교 처짐 해설" className={styles.modalImage} />
            <p className={styles.modalText}>
              단순교는 중앙에 하중이 가해지면 <br />처질 수 있다.
            </p>
            <button onClick={handleCloseExplanationModal} className={`${styles.modalButton} ${styles.modalButtonFull}`}>
              확인
            </button>
          </div>
        </div>
      )}
      
    </> 
  );
};

export default Page18_DisadvantageQuiz;