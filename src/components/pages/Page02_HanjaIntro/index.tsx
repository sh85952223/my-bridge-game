// src/components/pages/Page02_HanjaIntro/index.tsx

import { useGame } from '../../../context/useGame'
// [삭제] 기존 PageStyles.css 의존성 제거
// import './PageStyles.css'; 
// [추가] 모듈 CSS 불러오기
import styles from './Page02_HanjaIntro.module.css'; 

const Page2_HanjaIntro = () => {
  const { setCurrentPage } = useGame();

  const handleNext = () => {
    // PDF 3페이지(첫 번째 한자 퀴즈)로 이동
    setCurrentPage(3); 
  };

  return (
    // [수정] 클래스 이름을 모듈에서 불러온 이름으로 변경합니다.
    <div className={`${styles.pageContainer} ${styles.page2}`}>
      
      {/* 한자 뜻풀이 그룹 */}
      <div className={styles.hanjaDefinitionGroup}>
        <div className={styles.hanjaItem}>
          <h1 className={styles.hanjaChar}>橋</h1>
          <p className={styles.hanjaMeaning}>다리</p>
        </div>
        <div className={styles.hanjaItem}>
          <h1 className={styles.hanjaChar}>梁</h1>
          <p className={styles.hanjaMeaning}>(대)들보</p>
        </div>
      </div>
      
      {/* 공용 스타일 버튼을 모듈에서 가져옵니다. */}
      <button onClick={handleNext} className={styles.nextButtonStyled}>
        &gt; 다음
      </button>
    </div>
  );
};

export default Page2_HanjaIntro;