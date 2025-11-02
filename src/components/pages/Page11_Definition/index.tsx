// src/components/pages/Page11_Definition/index.tsx

import { useState } from 'react';
import { useGame } from '../../../context/useGame';
// [삭제] 기존 CSS 의존성 제거
// import './PageStyles.css'; 
// import './PageStyles_v2.css'; 
// [추가] 모듈 CSS 불러오기
import styles from './Page11.module.css'; 

const Page11_Definition = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { setCurrentPage } = useGame();

  // 카드를 클릭하면 뒤집기
  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  // 다음 페이지로 이동
  const handleNext = () => {
    setCurrentPage(12); // 다음 페이지로 (예: Page 12)
  };

  return (
    // [수정] 클래스 이름을 모듈에서 불러온 이름으로 변경합니다.
    <div className={`${styles.pageContainer} ${styles.page11Container}`}>
      
      {/* 3D 플립 카드 */}
      <div 
        className={`${styles.flipCard} ${isFlipped ? styles.flipped : ''}`}
        onClick={handleFlip}
        title="클릭하여 정답 확인"
      >
        <div className={styles.flipCardInner}>
          
          {/* 카드 앞면 (질문) */}
          <div className={styles.flipCardFront}>
            <h2>
              교량이란
              <br/>
              무엇일까? 🧐
            </h2>
            <small>(카드를 클릭하여 정답 확인)</small>
          </div>
          
          {/* 카드 뒷면 (정답) */}
          <div className={styles.flipCardBack}>
            <h2 className={styles.flipCardBackTitle}>
              강, 바다, 계곡 등을
              <br/>
              건널 수 있게 만든
              <br/>
              구조물 🌉
            </h2>
            <small className={styles.definitionNote}>
              📌 학습지에 적으세요!
            </small>
          </div>

        </div>
      </div>
      
      {/* 카드가 뒤집힌 후에만 '다음' 버튼 표시 */}
      {isFlipped && (
        // [수정] 모듈 CSS 클래스 사용
        <button 
          className={styles.nextButtonStyled} 
          onClick={handleNext}
        >
          {'>'} 다음
        </button>
      )}

    </div>
  );
};

export default Page11_Definition;