// src/components/pages/Page09_VSQuiz/index.tsx

import { useState } from 'react';
import { useGame } from '../../../context/useGame'
// [삭제] 기존 PageStyles.css 의존성 제거
// import './PageStyles.css'; 
// [추가] 모듈 CSS 불러오기
import styles from './Page09_VSQuiz.module.css'; 

// 1. 이미지 경로 (public 폴더 기준)
const imageA = '/assets/images/bridge_trampoline_1.jpg';
const imageB = '/assets/images/bridge_trampoline_2.jpg';

const Page9_VSQuiz = () => {
  const { updateScore, setCurrentPage } = useGame();
  
  const [feedback, setFeedback] = useState<React.ReactNode>('');
  const [showNextButton, setShowNextButton] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);

  const handleSelect = (option: 'A' | 'B') => {
    if (showNextButton) return;

    setSelectedOption(option);
    updateScore(10);
    
    // 피드백 메시지 설정 (클래스도 모듈에서 가져옵니다)
    setFeedback(
      <span className={styles.correct}>
        사실 둘 다 정답! 🥳
        <br />
        이것은 파리의 '텀블링 교량'입니다!
      </span>
    );

    setShowNextButton(true);
  };

  const handleNext = () => {
    // 10페이지(Amazing Bridges)로 이동합니다.
    setCurrentPage(10); 
  };

  return (
    // [수정] 클래스 이름을 모듈에서 불러온 이름으로 변경합니다.
    <div className={`${styles.pageContainer} ${styles.page9}`}>
      
      <h2 className={styles.quizQuestion}>이것은 텀블링일까요, <br />교량일까요?</h2>
      
      {/* VS 선택지 컨테이너 */}
      <div className={styles.vsQuizContainer}>
        
        {/* 선택지 A (텀블링) */}
        <div 
          className={`${styles.vsOption} ${selectedOption === 'A' ? styles.selected : ''}`}
          onClick={() => handleSelect('A')}
        >
          <img src={imageA} alt="텀블링" className={styles.vsImage} />
          <div className={styles.vsLabel}>텀블링</div>
        </div>

        {/* 'VS' 텍스트 */}
        <div className={styles.vsGraphic}>VS</div>

        {/* 선택지 B (교량) */}
        <div 
          className={`${styles.vsOption} ${selectedOption === 'B' ? styles.selected : ''}`}
          onClick={() => handleSelect('B')}
        >
          <img src={imageB} alt="교량" className={styles.vsImage} />
          <div className={styles.vsLabel}>교량</div>
        </div>

      </div>

      {/* 피드백 메시지 표시 */}
      {feedback && (
        <div className={styles.feedbackMessage}>
          {feedback}
        </div>
      )}

      {/* '다음' 버튼 (정답 맞힐 시 표시) */}
      {showNextButton && (
        // [수정] 모듈 클래스 사용
        <button onClick={handleNext} className={`${styles.nextButtonStyled} ${styles.quizSubmitButton}`}>
          {'>'} 다음
        </button>
      )}

      {/* '다음' 버튼이 보이기 전, 공간 차지를 위한 빈 div */}
      {!showNextButton && (
        <div style={{ height: '70px', marginTop: '1rem' }} />
      )}
    </div>
  );
};

export default Page9_VSQuiz;