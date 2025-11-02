// src/components/pages/Page06_HanjaQuiz2_Result/index.tsx

import { useGame } from '../../../context/useGame'
// PageStyles.css 의존성 제거
import styles from './Page06_HanjaQuiz2_Result.module.css'; 

const Page6_HanjaQuiz2_Result = () => {
    const { setCurrentPage } = useGame();

    const handleNext = () => {
        // 다음 챕터 (Page 7)로 이동
        setCurrentPage(7); 
    };

    return (
        // [수정] 클래스 이름을 모듈에서 불러온 이름으로 변경합니다.
        <div className={`${styles.pageContainer} ${styles.page2}`}>
            
            <div className={styles.hanjaDefinitionGroup}>
                <div className={styles.hanjaItem}>
                    {/* 1. 한자와 뜻 변경 */}
                    <h1 className={styles.hanjaChar}>梁</h1>
                    <p className={styles.hanjaMeaning}>(대)들보 량</p>
                </div>
            </div>
            
            <button onClick={handleNext} className={styles.nextButtonStyled}>
                &gt; 교량 만들기 (다음)
            </button>
        </div>
    );
};

export default Page6_HanjaQuiz2_Result;