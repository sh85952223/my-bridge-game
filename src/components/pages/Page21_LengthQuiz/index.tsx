// src/components/pages/Page21_LengthQuiz/index.tsx (전체 코드)

import { useState, useEffect, type ReactNode } from 'react';
import { useGame } from '../../../context/useGame';
import styles from './Page21.module.css'; 
import Confetti from 'react-confetti'; 

// [유지] 퀴즈 이미지 (Page 20과 동일)
const imageCableStayed = '/assets/images/quiz_20_cable_stayed.png'; // 사장교 (오답)
const imageSuspension = '/assets/images/suspension_bridge_quiz.jpg'; // 현수교 (정답)
// [수정] 힌트 이미지 (새 해먹 이미지)
const hintImage = '/assets/images/hint_hammock.png'; 

// [수정] 퀴즈 데이터
const QUIZ_QUESTION = (
  <>
    기둥(교각)을 <br/>많이 쓰지 않고도
    <br/>
    다리를 길게 <br/>만들 수 있는 교량은?
  </>
);
const HINT_ID = 21; // 이 페이지의 고유 힌트 ID

const Page21_LengthQuiz = () => {
  const { updateScore, setCurrentPage, viewHint, viewedHints } = useGame();
  
  const [feedback, setFeedback] = useState<ReactNode>(''); 
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const [hintModalStep, setHintModalStep] = useState<'closed' | 'confirm' | 'image'>('closed');
  const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(false);

  const handleSelect = (option: 'A' | 'B', isCorrect: boolean) => {
    if (isSolved) return;
    setSelectedOption(option);

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

  const handleNext = () => {
    setCurrentPage(22); // 다음 퀴즈 페이지(Page 22)로 이동
  };

  // 힌트 관련 핸들러 (동일)
  const handleHintClick = () => {
    if (viewedHints.has(HINT_ID)) { setHintModalStep('image'); } 
    else { setHintModalStep('confirm'); }
  };
  const handleConfirmHint = () => {
    viewHint(HINT_ID); 
    setHintModalStep('image');
  };
  const handleCloseHintModal = () => { setHintModalStep('closed'); };

  // 해설 모달 닫기 (동일)
  const handleCloseExplanationModal = () => {
    setIsExplanationModalOpen(false);
  };

  // 컨페티 타이머 (400개) (동일)
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000); 
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
        
        <h2 className={styles.quizTitle}>{QUIZ_QUESTION}</h2>
        
        {/* VS 선택지 컨테이너 */}
        <div className={styles.vsQuizContainer}>
          
          {/* 선택지 A (사장교 - 오답) */}
          <div 
            className={`${styles.vsOption} ${selectedOption === 'A' ? styles.selected : ''} ${isSolved && selectedOption === 'A' ? styles.incorrect : ''}`}
            onClick={() => handleSelect('A', false)}
          >
            <img src={imageCableStayed} alt="사장교" className={styles.vsImage} />
            <div className={styles.vsLabel}>사장교</div>
          </div>

          {/* 'VS' 텍스트 */}
          <div className={styles.vsGraphic}>VS</div>

          {/* 선택지 B (현수교 - 정답) */}
          <div 
            className={`${styles.vsOption} ${selectedOption === 'B' ? styles.selected : ''} ${isSolved && selectedOption === 'B' ? styles.correct : ''}`}
            onClick={() => handleSelect('B', true)}
          >
            <img src={imageSuspension} alt="현수교" className={styles.vsImage} />
            <div className={styles.vsLabel}>현수교</div>
          </div>

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

      {/* 2. 힌트 모달 */}
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
          {/* [수정] 힌트 모달 (이미지) */}
          {hintModalStep === 'image' && (
            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>💡 힌트</h3>
              <img src={hintImage} alt="힌트: 해먹" className={styles.modalImage} />
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
            {/* [수정] 해설 텍스트 (<br/> 지원) */}
            <p className={styles.modalText}>
              해먹과 비슷하다.
              <br/>
              해먹도 아래 받침 없이 길게 나무 사이를
              <br/>
              연결할 수 있는 것처럼
              <br/>
              현수교도 마찬가지이다.
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

export default Page21_LengthQuiz;