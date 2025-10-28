import { useGame } from '../../context/GameContext';
import './PageStyles.css';      // [유지] 공용 버튼 스타일 import
import './PageStyles_v2.css';   // [수정] Page 10 -> v2로 변경

const Page10_AmazingBridges = () => {
  const { setCurrentPage } = useGame();

  const handleNext = () => {
    setCurrentPage(11); // 다음 페이지로 이동 (예: Page 11)
  };

  return (
    // 'page-container' (공통)와 'page10-container' (전용) 클래스를 모두 사용
    <div className="page-container page10-container">
      
      {/* 핀터레스트 스타일 이미지 카드 */}
      <div className="image-card">
        <div className="image-card-content">
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
      <p className="page10-subtext">
        이 교량은 중국에 있는 '루이 다리'입니다.
        <br />
        정말 독특하죠?
      </p>

      {/* [수정]
        PageStyles.css에 정의된 공용 버튼 스타일을 사용합니다.
      */}
      <button 
        onClick={handleNext} 
        className="next-button-styled"
      >
        {'>'} 다음
      </button>

    </div>
  );
};

export default Page10_AmazingBridges;

