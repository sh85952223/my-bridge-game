// src/components/pages/Page16_StudyGuide/index.tsx (전체 코드)

import { useGame } from '../../../context/useGame'; 

// [수정] 1. PageStyles_Common.css import 제거
// import '../PageStyles_Common.css'; // <--- 이 줄은 삭제합니다!

// 2. Page 16 전용 '모듈' 스타일
import styles from './Page16.module.css'; 

// 3. 이미지 경로: public 폴더 기준 절대 경로 (유지)
const bridgeTypesImage = '/assets/images/bridge_types.png'; 

const Page16_StudyGuide = () => {
  const { setCurrentPage } = useGame();

  const handleNext = () => {
    setCurrentPage(17); 
  };

  return (
    // [수정] 공용 클래스(.gs-page-container)를 모듈에서 불러옵니다.
    <div className={`${styles.pageContainer} ${styles.studyContainer}`}>
      
      {/* [수정] 공용 클래스 gs-title도 모듈에서 불러옵니다. */}
      <h2 className={styles.title}>교량의 6가지 기본 형태</h2>

      <img src={bridgeTypesImage} alt="교량 형태 6가지" className={styles.diagramImage} />

      <p className={styles.warningText}>
        ⚠️ 이 페이지는 다시 되돌아올 수 없음
      </p>
      
      {/* [수정] 공용 클래스 gs-subtitle도 모듈에서 불러옵니다. */}
      <p className={styles.subtitle} style={{ marginTop: 0 }}>
        사진을 잘 기억하세요!
        <br />
        이걸 토대로 다음 문제들이 출제됩니다.
      </p>
      
      {/* [수정] 공용 버튼 gs-button-primary도 모듈에서 불러옵니다. */}
      <button 
        onClick={handleNext} 
        className={styles.buttonPrimary}
        style={{ marginTop: 'auto' }} 
      >
        이해했습니다 (다음)
      </button>

    </div>
  );
};

export default Page16_StudyGuide;