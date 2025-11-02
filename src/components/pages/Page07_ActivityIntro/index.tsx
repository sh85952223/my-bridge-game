// src/components/pages/Page07_ActivityIntro/index.tsx

import { useGame } from '../../../context/useGame'
import styles from './Page07_ActivityIntro.module.css'; // 모듈 CSS 불러오기

const Page7_ActivityIntro = () => {
    const { setCurrentPage } = useGame();

    const handleNext = () => {
        setCurrentPage(8); // Page 8 (첫 번째 사진 퀴즈)로 이동
    };

    return (
        // [수정] 클래스 이름을 모듈에서 불러온 이름으로 변경합니다.
        <div className={`${styles.pageContainer} ${styles.page7}`}>
            
            {/* "핀터레스트 감성" 카드 레이아웃 */}
            <div className={styles.cardContent}>
                <p className={styles.cardDecoration}>🍦 ➡️ 🏗️</p>
                
                <h1 className={styles.cardTitle}>
                    아이스크림 
                    <br />
                    막대로
                    <br />
                    교량 만들기
                </h1>
                
                {/* 배경 영문 텍스트 (스타일로 적용) */}
                <div className={styles.cardBgTextEn}>BUILD</div>
            </div>

            <button onClick={handleNext} className={styles.nextButtonStyled}>
                {'>'} 다음
            </button>
            
        </div>
    );
};

export default Page7_ActivityIntro;