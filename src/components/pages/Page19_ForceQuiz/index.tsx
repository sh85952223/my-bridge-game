// src/components/pages/Page19_ForceQuiz/index.tsx (전체 코드)

import { useState, useEffect, type ReactNode } from 'react';
import { useGame } from '../../../context/useGame';
import styles from './Page19.module.css'; 
import Confetti from 'react-confetti'; 

// 퀴즈 이미지
const quizImage = '/assets/images/quiz_19_force_options.png'; 
const explanationImage = '/assets/images/quiz_19_force_explanation.png'; 

// 퀴즈 데이터
const QUIZ_QUESTION = (
  <>
    이 그림에서 가장 큰 <span className={styles.highlight}>‘힘’</span>이 걸리는 부분은 어디일까요?
  </>
);
const QUIZ_OPTIONS = [
  { id: '1', name: '1번', isCorrect: false },
  { id: '2', name: '2번', isCorrect: false },
  { id: '3', name: '3번', isCorrect: true }, // 정답
];
const HINT_ID = 19; 

const Page19_ForceQuiz = () => {
  const { updateScore, setCurrentPage, viewHint, viewedHints } = useGame();
  
  const [feedback, setFeedback] = useState<ReactNode>(''); 
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const [hintModalStep, setHintModalStep] = useState<'closed' | 'confirm' | 'image'>('closed');
  const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(false);

  // ... (로직은 모두 동일하게 유지) ...
  const handleOptionClick = (id: string, isCorrect: boolean) => {
    if (isSolved) return;
    setSelectedId(id);
    if (isCorrect) {
      updateScore(10);
      setIsSolved(true);
      setShowConfetti(true); 
      setIsExplanationModalOpen(true); 
      setFeedback(''); 
    } else {
      updateScore(-5);
      setFeedback('오답입니다! 😭 -5점. 다시 시도해보세요.');
    }
  };
  const handleNext = () => { setCurrentPage(20); };
  const handleHintClick = () => {
    if (viewedHints.has(HINT_ID)) { setHintModalStep('image'); } 
    else { setHintModalStep('confirm'); }
  };
  const handleConfirmHint = () => {
    viewHint(HINT_ID); 
    setHintModalStep('image');
  };
  const handleCloseHintModal = () => { setHintModalStep('closed'); };
  const handleCloseExplanationModal = () => { setIsExplanationModalOpen(false); };
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => { setShowConfetti(false); }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <>
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
        
        {/* [수정] 이미지 카드: 
            컨트롤 영역과 분리하고, 이미지가 잘리지 않도록 함 */}
        <div className={styles.imageCard}>
          <img src={quizImage} alt="사장교 힘 퀴즈" className={styles.quizImage} />
        </div>

        {/* 컨트롤 영역 */}
        <div className={styles.controlsWrapper}>
          
          <h2 className={styles.quizTitle}>{QUIZ_QUESTION}</h2>
          
          <div className={`${styles.optionsGrid} ${styles.threeOptions}`}>
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

          <div className={styles.feedbackArea}>
            {feedback && ( <p className={styles.feedbackWrong}>{feedback}</p> )}
          </div>

          {!isSolved && (
            <button 
              onClick={handleHintClick} 
              className={styles.hintButton}
            >
              💡 힌트 보기 (-5점)
            </button>
          )}

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

      {/* 2. 힌트 모달 */}
      {hintModalStep !== 'closed' && (
        <div className={styles.modalOverlay}>
          {/* 확인 모달 */}
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
          
          {/* [핵심 수정] 텍스트 힌트 모달 (JSX <br/> 오류 수정) */}
          {hintModalStep === 'image' && (
            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>💡 힌트</h3>
              <p className={styles.modalText}>
                힘이 어디로 모여서 어떻게 땅으로 전달될까요?
                <br/>
                어떤 부분은 다리 상판을 들어주고
                <br/>
                그 힘을 다른 곳으로 전달합니다.
                <br/>
                전달 받은 곳이 핵심이에요.
              </p>
              <button onClick={handleCloseHintModal} className={`${styles.modalButton} ${styles.modalButtonFull}`}>
                퀴즈로 돌아가기
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. 해설 모달 */}
      {isExplanationModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>정답입니다!</h3>
            <img src={explanationImage} alt="사장교 해설" className={styles.modalImage} />
            <p className={styles.modalText}>
              사장교는 주탑이 케이블을 통해 상판의 무게를 직접 지탱합니다.
              <br/>
              따라서 모든 힘이 **주탑(3번)**에 집중됩니다.
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

export default Page19_ForceQuiz;