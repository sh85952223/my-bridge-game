// src/components/pages/Page20_WindQuiz/index.tsx (전체 코드)

import { useState, useEffect, type ReactNode } from 'react';
import { useGame } from '../../../context/useGame';
import styles from './Page20.module.css'; 
import Confetti from 'react-confetti'; 

// 이미지 경로
const imageCableStayed = '/assets/images/quiz_20_cable_stayed.png'; // 사장교 (정답)
const imageSuspension = '/assets/images/suspension_bridge_quiz.jpg'; // 현수교 (오답)
// [삭제] 힌트 이미지 (더 이상 사용하지 않음)
// const hintImage = '/assets/images/bridge_types.png'; 

// 퀴즈 데이터
const QUIZ_QUESTION = "바람에 더 강한 교량은?";
const HINT_ID = 20; 

const Page20_WindQuiz = () => {
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
    setCurrentPage(21); // 다음 퀴즈 페이지(Page 21)로 이동
  };

  // 힌트 관련 핸들러
  const handleHintClick = () => {
    if (viewedHints.has(HINT_ID)) { setHintModalStep('image'); } 
    else { setHintModalStep('confirm'); }
  };
  const handleConfirmHint = () => {
    viewHint(HINT_ID); 
    setHintModalStep('image');
  };
  const handleCloseHintModal = () => { setHintModalStep('closed'); };

  // 해설 모달 닫기
  const handleCloseExplanationModal = () => { setIsExplanationModalOpen(false); };

  // 컨페티 타이머 (400개)
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
        
        {/* VS 선택지 컨테이너 (Page 9 스타일) */}
        <div className={styles.vsQuizContainer}>
          
          {/* 선택지 A (사장교 - 정답) */}
          <div 
            className={`${styles.vsOption} ${selectedOption === 'A' ? styles.selected : ''} ${isSolved && selectedOption === 'A' ? styles.correct : ''}`}
            onClick={() => handleSelect('A', true)}
          >
            <img src={imageCableStayed} alt="사장교" className={styles.vsImage} />
            <div className={styles.vsLabel}>사장교</div>
          </div>

          {/* 'VS' 텍스트 */}
          <div className={styles.vsGraphic}>VS</div>

          {/* 선택지 B (현수교 - 오답) */}
          <div 
            className={`${styles.vsOption} ${selectedOption === 'B' ? styles.selected : ''} ${isSolved && selectedOption === 'B' ? styles.incorrect : ''}`}
            onClick={() => handleSelect('B', false)}
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

        {/* [추가] 사진 출처 */}
        <p className={styles.attribution}>
          사장교 사진: Unsplash의 Eliézer Fernandes
          <br/>
          현수교 사진: Unsplash의 Carl Solder
        </p>
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
          
          {/* [핵심 수정] 힌트 모달 (텍스트 버전) */}
          {hintModalStep === 'image' && (
            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>💡 힌트</h3>
              <p className={styles.modalText}>
                바람이 불면 다리가 흔들리겠죠?
                <br/>
                현수교는 거대한 주 케이블에 상판을 <br/>'매달아' 놓은 방식이고,
                <br/>
                사장교는 케이블을 주탑에 <br/>'직접' 팽팽하게 연결한 방식입니다.
                <br/>
                어느 쪽이 더 단단하게 고정되어 <br/>바람에 잘 버틸까요?
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
            <p className={styles.modalText}>
              사장교는 케이블이 주탑에 <br/>직접 연결되어 있어,
              <br/>
              구조적으로 더 견고하고 <br/>바람의 힘에 대한 저항력이
              <br/>
              현수교보다 뛰어납니다.
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

export default Page20_WindQuiz;