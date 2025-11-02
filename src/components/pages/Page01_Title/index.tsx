// src/components/pages/Page01_Title/index.tsx

import { useGame } from '../../../context/useGame';
// [삭제] 기존 PageStyles.css 의존성 제거
// import './PageStyles.css'; 
// [추가] 모듈 CSS 불러오기
import styles from './Page01_Title.module.css'; 

const Page1_Title = () => {
    const { setCurrentPage } = useGame();

    const handleNext = () => {
        setCurrentPage(2); 
    };

    return (
        // [수정] 클래스 이름을 모듈에서 불러온 이름으로 변경합니다.
        <div className={`${styles.pageContainer} ${styles.page1}`}>
            
            {/* 橋梁 한자 */}
            <h1 className={styles.hanjaTitle}>
                橋梁
            </h1>
            
            <p className={styles.descriptionText}>
                처음 보는 한자죠?
            </p>
            
            {/* 공용 스타일 버튼 */}
            <button onClick={handleNext} className={styles.nextButtonStyled}>
                &gt; 다음
            </button>

        </div>
    );
};

export default Page1_Title;