// src/components/pages/Page22_TrussQuiz/index.tsx (전체 코드)

import { useState, useEffect, type ReactNode } from 'react';
import { useGame } from '../../../context/useGame';
import styles from './Page22.module.css'; 
import Confetti from 'react-confetti'; 

// 퀴즈 이미지
const quizImage = '/assets/images/quiz_22_truss.png'; 
// [수정] 해설 이미지 변수 삭제
// const explanationImage = '/assets/images/quiz_19_force_explanation.png'; 

// 퀴즈 데이터
const QUIZ_QUESTION = "이 다리는 무슨 다리라고 부를까요?";
// [수정] HINT_ID 변수 삭제
// const HINT_ID = 22; 

const Page22_TrussQuiz = () => {
  const { updateScore, setCurrentPage } = useGame();
  
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<ReactNode>(''); 
  const [isSolved, setIsSolved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSolved) return;

    const answer = inputValue.trim().toLowerCase();
    
    // 유연한 정답 처리
    const isCorrect = 
      answer === '트러스교' || 
      answer === 'truss' || 
      answer.includes('트러스');

    if (isCorrect) {
      updateScore(10);
      setIsSolved(true);
      setShowConfetti(true); 
      setIsExplanationModalOpen(true); 
      setFeedback(''); 
    } else {
      updateScore(-5);
      // 오답 시 초성 힌트
      setFeedback(
        <>
          오답입니다! 😭 -5점.
          <br/>
          힌트: ㅌㄹㅅ
        </>
      );
    }
  };

  const handleNext = () => {
    setCurrentPage(23); // 다음 페이지(Page 23)로 이동
  };

  // 해설 모달 닫기
  const handleCloseExplanationModal = () => {
    setIsExplanationModalOpen(false);
  };

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
        
        {/* 이미지 카드 (Page 17 스타일) */}
        <div className={styles.imageCard}>
          <img src={quizImage} alt="트러스교 퀴즈" className={styles.quizImage} />
        </div>

        {/* 컨트롤 영역 (Page 17 스타일) */}
        <div className={styles.controlsWrapper}>
          
          <h2 className={styles.quizTitle}>{QUIZ_QUESTION}</h2>
          
          {/* 단답형 퀴즈 폼 */}
          <form className={styles.quizForm} onSubmit={handleSubmit}>
            <input
              type="text"
              className={styles.quizInput}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="정답을 입력하세요..."
              disabled={isSolved} 
            />

            {/* 피드백 메시지 (오답 시 힌트 표시) */}
            <div className={styles.feedbackArea}>
              {feedback && (
                <p className={styles.feedbackWrong}>
                  {feedback}
                </p>
              )}
            </div>

            {/* 정답 확인 버튼 (정답 맞히기 전에만 보임) */}
            {!isSolved && (
              <button 
                type="submit" 
                className={styles.submitButton}
              >
                정답 확인
              </button>
            )}
          </form>

          {/* '다음' 버튼 (정답 맞힐 시 표시) */}
          {isSolved && (
            <button 
              onClick={handleNext} 
              className={styles.nextButtonStyled}
            >
              {'>'} 다음
            </button>
          )}

          {/* 힌트 버튼은 이 페이지에 없습니다. */}

          {/* 출처 */}
          <p className={styles.attribution}>
            사진: Unsplash의 Yuval Zukerman
          </p>
        </div>
      </div> 

      {/* 2. 해설 모달 */}
      {isExplanationModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>정답입니다! (트러스교)</h3>
            
            {/* [핵심 수정] 해설 이미지 <img> 태그 삭제 */}
            
            <p className={styles.modalText}>
              **트러스(Truss)**란, 여러 개의 직선 부재들을
              <br/>
              삼각형 형태로 연결하여 하중을 지탱하는
              <br/>
              구조 형식을 말합니다.
              <br/>
              <br/>
              가벼우면서도 <br/>매우 튼튼한 다리를 만들 수 있습니다.
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

export default Page22_TrussQuiz;