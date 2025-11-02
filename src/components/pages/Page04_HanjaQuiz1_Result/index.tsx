// src/components/pages/Page04_HanjaQuiz1_Result/index.tsx

import { useGame } from '../../../context/useGame'
import styles from './Page04_HanjaQuiz1_Result.module.css'; 

const Page4_HanjaQuiz1_Result = () => {
    const { setCurrentPage } = useGame();

    const handleNext = () => {
        // PDF 5페이지 (두 번째 한자 퀴즈)로 이동
        setCurrentPage(5); 
    };

    return (
        // [수정] 클래스 이름을 모듈에서 불러온 이름으로 변경합니다.
        <div className={`${styles.pageContainer} ${styles.page2}`}> 
            
            {/* Page 2와 동일한 hanja-definition-group 레이아웃을 사용합니다. */}
            <div className={styles.hanjaDefinitionGroup}>
                <div className={styles.hanjaItem}>
                    <h1 className={styles.hanjaChar}>橋</h1>
                    {/* [수정] 결과 페이지이므로 음(音)을 명시합니다. */}
                    <p className={styles.hanjaMeaning}>다리 교</p>
                </div>
            </div>
            
            <button onClick={handleNext} className={styles.nextButtonStyled}>
                &gt; 다음 (梁 퀴즈)
            </button>
        </div>
    );
};

export default Page4_HanjaQuiz1_Result;