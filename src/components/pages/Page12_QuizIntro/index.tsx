// src/components/pages/Page12_QuizIntro/index.tsx

import { useGame } from '../../../context/useGame';
// [삭제] 기존 CSS 의존성 제거
// import './PageStyles.css'; 
// import './PageStyles_v2.css'; 
// [추가] 모듈 CSS 불러오기
import styles from './Page12.module.css'; 

const Page12_QuizIntro = () => {
  const { setCurrentPage } = useGame();

  const handleNext = () => {
    setCurrentPage(13); // 메인 퀴즈(Page 13)로 이동
  };

  const handlePrev = () => {
    setCurrentPage(11); // Page 11 (핵심 정의)로 돌아가기
  };

  return (
    // [수정] 클래스 이름을 모듈에서 불러온 이름으로 변경합니다.
    <div className={`${styles.pageContainer} ${styles.page12Container}`}>
      
      {/* 퀴즈 제목 */}
      <div className={styles.quizIntroContent}>
        <h1 className={styles.quizIntroTitle}>Quiz!</h1>
        <h2 className={styles.quizIntroSubtitle}>교량의 구조</h2>
      </div>

      {/* 이전/다음 버튼 컨테이너 */}
      <div className={styles.navButtonContainer}>
        <button 
          className={`${styles.navButton} ${styles.prevButton}`} 
          onClick={handlePrev}
        >
          {'<'} 이전
        </button>
        <button 
          className={`${styles.navButton} ${styles.nextButton}`} 
          onClick={handleNext}
        >
          다음 {'>'}
        </button>
      </div>

    </div>
  );
};

export default Page12_QuizIntro;