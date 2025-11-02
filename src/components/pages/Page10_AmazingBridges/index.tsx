// src/components/pages/Page10_AmazingBridges/index.tsx

import { useGame } from '../../../context/useGame'
// [삭제] 기존 CSS 의존성 제거
// import './PageStyles.css'; 
// import './PageStyles_v2.css'; 
import styles from './Page10.module.css'; 

// [핵심 수정] GIF 파일은 public 폴더 기준의 문자열 경로로 참조 (500 오류 방지)
const bridgeWindingLoop = '/assets/images/bridge_winding_loop.gif'; 

const Page10_AmazingBridges = () => {
    const { setCurrentPage } = useGame();

    const handleNext = () => {
        setCurrentPage(11); 
    };

    return (
        // [수정] 클래스 이름을 모듈에서 불러온 이름으로 변경합니다.
        <div className={`${styles.pageContainer} ${styles.page10Container}`}>
            
            {/* 핀터레스트 스타일 이미지 카드 */}
            <div className={styles.imageCard}>
                {/* [핵심] GIF <img> 태그를 사용 (안정성 확보) */}
                <div className={styles.imageWrapper}>
                    <img src={bridgeWindingLoop} alt="루이 다리 GIF" className={styles.cardGifImage} />
                </div>
                
                {/* 기존의 내용 (텍스트) */}
                <div className={styles.imageCardContent}>
                    <h2>🌍✨</h2>
                    <h1>
                        세계에는
                        <br />
                        신기한 교량들이
                        <br />
                        참 많아요
                    </h1>
                </div>
            </div>

            {/* 카드 하단 설명 텍스트 */}
            <p className={styles.page10Subtext}>
                이 교량은 중국에 있는 '루이 다리'입니다.
                <br />
                정말 독특하죠?
            </p>

            <button 
                onClick={handleNext} 
                className={styles.nextButtonStyled}
            >
                {'>'} 다음
            </button>

        </div>
    );
};

export default Page10_AmazingBridges;